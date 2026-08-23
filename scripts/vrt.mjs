#!/usr/bin/env node
/**
 * Visual regression test for the Asagiri design system.
 *
 * Captures every design-system preview fixture plus the live component
 * showcase, in BOTH themes, and pixel-diffs them against a committed
 * baseline. Token changes that alter rendering therefore show up as an
 * explicit, reviewable image diff instead of silently shipping.
 *
 * Serves the repo itself over a throwaway localhost server, so no dev
 * server needs to be running. Diffing uses sharp (already a devDependency).
 *
 * Usage:
 *   node scripts/vrt.mjs                 compare against baseline
 *   node scripts/vrt.mjs --update        (re)write the baseline
 *   node scripts/vrt.mjs --filter=badge  only targets matching a substring
 *
 * Env:
 *   CHROMIUM_PATH=/path/to/chrome        use a preinstalled browser
 *
 * Exit: non-zero if any target differs from baseline beyond THRESHOLD.
 */
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { createServer } from "node:http";
import { readFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VRT = join(ROOT, ".vrt");
const UPDATE = process.argv.includes("--update");
const FILTER = (process.argv.find(a => a.startsWith("--filter=")) ?? "").split("=")[1] ?? "";

/* A capture fails if EITHER bound is exceeded.

   The fraction alone is not enough: recolouring the text inside a progress
   bar moved only 0.03% of that specimen's pixels and slipped through, because
   a few hundred glyph pixels are nothing next to a full section. So a small
   absolute count is checked too — that catches a localised change however
   large the surrounding capture is, while still absorbing the handful of
   pixels anti-aliasing can shift between runs. */
const THRESHOLD = 0.001;
const MIN_CHANGED_PIXELS = 60;
const THEMES = ["light", "dark"];

/* ---------- static server (no dependency on `serve`) ---------- */
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png",
  ".json": "application/json", ".webmanifest": "application/manifest+json" };

const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(req.url.split("?")[0]);
    const file = join(ROOT, path.endsWith("/") ? path + "index.html" : path);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404).end("not found"); }
});
await new Promise(r => server.listen(0, r));
const ORIGIN = `http://localhost:${server.address().port}`;

/* ---------- targets ---------- */
const previewDir = join(ROOT, "docs/design-system/preview");
const previews = (await readdir(previewDir))
  .filter(f => f.endsWith(".html"))
  .sort()
  .map(f => ({ name: `preview-${f.replace(/\.html$/, "")}`, url: `/docs/design-system/preview/${f}` }));

/* Live component sections: the preview fixtures restyle components inline,
   so these capture the real shipped classes. Sections carry no ids, so they
   are addressed by their heading — section-level crops keep a single
   component's change from being diluted below threshold by a full-page shot. */
const showcaseSections = [
  "Alert", "Badge", "Tabs", "Accordion", "Progress", "Loading", "Card",
  "Avatar", "Pagination", "Breadcrumb", "Dropdown", "Skeleton",
].map(n => [n.toLowerCase(), `section.section:has(h2.section-title:text-is("${n} Component"))`]);
showcaseSections.push(["form-validation", `section.section:has(h2.section-title:text-is("Form Validation"))`]);

/* Deliberately no full-page captures: at ~450KB each they dominated the
   committed baseline, and a single recoloured badge is far below THRESHOLD
   once averaged over a whole page. Section-level crops keep every diff
   legible and the baseline small. */
/* Component specimens that showcase.html does not render. The preview cards
   import css/tokens.css only, so without this fixture a component-level
   change has nowhere to show up. */
const componentSpecimens = [
  "badge-base", "chip", "buttons-state", "buttons-variants", "fab", "snackbar",
  "form-feedback", "card-overlay",
  "pattern-admin", "pattern-cardgrid", "scroll-to-top", "avatar",
].map(n => ({
  name: `component-${n}`,
  url: "/docs/design-system/vrt-components.html",
  selector: `section[data-vrt="${n}"]`,
}));

const TARGETS = [
  ...previews,
  ...componentSpecimens,
  ...showcaseSections.map(([n, sel]) => ({ name: `showcase-${n}`, url: "/showcase.html", selector: sel })),
].filter(t => !FILTER || t.name.includes(FILTER));

/* Freeze anything non-deterministic before capture. */
const FREEZE = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
  html { scroll-behavior: auto !important; }
`;

const outDir = join(VRT, UPDATE ? "baseline" : "current");
await mkdir(outDir, { recursive: true });
if (!UPDATE) await mkdir(join(VRT, "diff"), { recursive: true });

const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOpts);
const ctx = await browser.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1 });

/* Hermetic capture: abort every request that is not served by our own
   throwaway server. The fixtures link Google Fonts, and waiting on (or
   worse, intermittently receiving) a remote webfont makes captures both
   slow and non-deterministic. Local fallback fonts render identically on
   every run. */
await ctx.route("**", route => {
  route.request().url().startsWith(ORIGIN) ? route.continue() : route.abort();
});

const captured = [];
/* A capture that never happened is not a passing capture: a typo'd selector,
   a renamed section or a page that fails to load would otherwise leave the
   comparison set silently smaller and still exit 0. */
const captureFailures = [];
for (const t of TARGETS) {
  // One navigation per target; the theme is a runtime attribute flip.
  const page = await ctx.newPage();
  try {
    await page.goto(ORIGIN + t.url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.addStyleTag({ content: FREEZE });
    // NB: return a serialisable value — document.fonts.ready resolves to the
    // FontFaceSet itself, which Playwright cannot transfer.
    await page.evaluate(() => document.fonts.ready.then(() => true));

    for (const theme of THEMES) {
      await page.evaluate(th => document.documentElement.setAttribute("data-theme", th), theme);
      await page.waitForTimeout(80);
      const name = `${t.name}--${theme}.png`;
      const dest = join(outDir, name);
      if (t.selector) {
        const el = await page.$(t.selector);
        if (!el) {
          console.log(`  MISS ${name} (selector ${t.selector} not found)`);
          captureFailures.push(`${name}: selector not found (${t.selector})`);
          continue;
        }
        await el.screenshot({ path: dest });
      } else {
        await page.screenshot({ path: dest, fullPage: !!t.fullPage });
      }
      captured.push(name);
    }
  } catch (e) {
    const reason = e.message.split("\n")[0];
    console.log(`  !! ${t.name}: ${reason}`);
    captureFailures.push(`${t.name}: ${reason}`);
  }
  await page.close();
}
await browser.close();
server.close();

console.log(`Captured ${captured.length} screenshots -> ${outDir}`);

if (captureFailures.length) {
  console.error(`\n${captureFailures.length} capture(s) failed:`);
  for (const f of captureFailures) console.error(`  ${f}`);
  // Fail even in --update mode: a baseline written from an incomplete run
  // bakes the gap in permanently.
  process.exit(1);
}

if (UPDATE) {
  console.log("Baseline updated.");
  process.exit(0);
}

/* ---------- diff ---------- */
const baseDir = join(VRT, "baseline");
if (!existsSync(baseDir)) {
  console.error(`No baseline at ${baseDir}. Run: node scripts/vrt.mjs --update`);
  process.exit(1);
}

async function raw(p) {
  const img = sharp(p).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height, ch: info.channels };
}

const changed = [], missing = [], unchanged = [];
for (const name of captured) {
  const basePath = join(baseDir, name);
  if (!existsSync(basePath)) { missing.push(name); continue; }
  const a = await raw(basePath), b = await raw(join(outDir, name));

  if (a.w !== b.w || a.h !== b.h) {
    changed.push({ name, pct: 1, note: `size ${a.w}x${a.h} -> ${b.w}x${b.h}` });
    continue;
  }

  const total = a.w * a.h;
  const diffBuf = Buffer.alloc(total * 3);
  let differing = 0;
  for (let i = 0, p = 0; i < total; i++, p += 3) {
    const o = i * a.ch;
    const dr = Math.abs(a.data[o] - b.data[o]);
    const dg = Math.abs(a.data[o + 1] - b.data[o + 1]);
    const db = Math.abs(a.data[o + 2] - b.data[o + 2]);
    if (dr + dg + db > 12) {
      differing++;
      diffBuf[p] = 255; diffBuf[p + 1] = 0; diffBuf[p + 2] = 0;   // highlight
    } else {
      // dim the unchanged pixels so the highlight reads clearly
      const grey = 220 - Math.round((a.data[o] + a.data[o + 1] + a.data[o + 2]) / 3 * 0.35);
      diffBuf[p] = grey; diffBuf[p + 1] = grey; diffBuf[p + 2] = grey;
    }
  }
  const pct = differing / total;
  if (pct > THRESHOLD || differing > MIN_CHANGED_PIXELS) {
    const dp = join(VRT, "diff", name);
    await sharp(diffBuf, { raw: { width: a.w, height: a.h, channels: 3 } }).png().toFile(dp);
    changed.push({ name, pct, px: differing });
  } else {
    unchanged.push(name);
  }
}

const report = { generated: captured.length, unchanged: unchanged.length, changed, missing };
await writeFile(join(VRT, "report.json"), JSON.stringify(report, null, 2) + "\n");

console.log(`\nunchanged: ${unchanged.length}`);
if (changed.length) {
  console.log(`\nCHANGED (${changed.length})  — diff images in .vrt/diff/`);
  for (const c of changed.sort((x, y) => y.pct - x.pct)) {
    console.log(`  ${(c.pct * 100).toFixed(3).padStart(7)}%  ${String(c.px ?? "?").padStart(7)}px  ${c.name}${c.note ? `  (${c.note})` : ""}`);
  }
}
if (missing.length) {
  // A specimen with no baseline was compared against nothing. Report it as a
  // failure so it has to be reviewed and committed, rather than passing
  // silently on every run until someone notices.
  console.error(`\nNO BASELINE (${missing.length}) — review these, then run: npm run test:vrt:update`);
  for (const m of missing) console.error(`  + ${m}`);
}
if (changed.length || missing.length) process.exit(1);
console.log("\nNo visual changes vs baseline.");
