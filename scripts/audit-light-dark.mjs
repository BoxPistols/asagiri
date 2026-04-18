#!/usr/bin/env node
/**
 * Playwright-based light/dark contrast audit.
 *
 * Walks a fixed list of URLs under the local dev server, toggles
 * data-theme between "light" and "dark", and for each mode:
 *   1. Captures a full-page PNG screenshot.
 *   2. Walks every visible text-bearing element and computes its WCAG
 *      contrast ratio against the effective background colour.
 *   3. Reports any elements below WCAG AA thresholds (4.5:1 normal, 3:1 large).
 *
 * Output: /tmp/asagiri-audit/{png,report.json,report.md}
 *
 * Usage (server must be reachable):
 *   npx serve . -p 8899 &
 *   node scripts/audit-light-dark.mjs
 */
import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const ORIGIN = process.env.AUDIT_ORIGIN ?? "http://localhost:8899";
const OUT = "/tmp/asagiri-audit";

const PAGES = [
  "/docs/design-system/index.html",
  ...Array.from({ length: 26 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const names = [
      "logo", "primary-palette", "semantic-colors", "semantic-variants",
      "neutrals", "dark-theme", "type-scale", "body-type", "design-font-en",
      "mono-type", "spacing", "radii", "elevation", "buttons-filled",
      "buttons-variants", "button-sizes", "alerts", "badges", "form-inputs",
      "cards", "avatars", "progress", "nav", "tabs", "icons", "voice",
    ];
    return `/docs/design-system/preview/${n}-${names[i]}.html`;
  }),
  "/docs/guides/dark-mode.html",
  "/docs/guides/theming.html",
  "/docs/guides/developer-guide.html",
  "/docs/guides/testing-architecture.html",
  "/docs/index.html",
  "/showcase.html",
];

/* ----- contrast math (WCAG) ----- */
function parseCSSColor(str) {
  if (!str) return null;
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map(s => s.trim());
  const [r, g, b] = parts.slice(0, 3).map(Number);
  const a = parts[3] !== undefined ? Number(parts[3]) : 1;
  return { r, g, b, a };
}

function blend(fg, bg) {
  if (!fg || !bg) return fg ?? bg;
  const a = fg.a + bg.a * (1 - fg.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  return {
    r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
    g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
    b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
    a,
  };
}

function relLuminance({ r, g, b }) {
  const f = c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(c1, c2) {
  const l1 = relLuminance(c1);
  const l2 = relLuminance(c2);
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

async function auditPage(context, path, mode) {
  const page = await context.newPage();
  const url = ORIGIN + path;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate((m) => {
    document.documentElement.setAttribute("data-theme", m);
  }, mode);
  await page.waitForTimeout(200);

  // Also propagate theme to same-origin iframes (preview index embeds them).
  const frames = page.frames().filter(f => f !== page.mainFrame());
  for (const f of frames) {
    try {
      await f.evaluate((m) => {
        document.documentElement.setAttribute("data-theme", m);
      }, mode);
    } catch { /* cross-origin — skip */ }
  }
  await page.waitForTimeout(200);

  const safeName = path.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "");
  const pngPath = resolve(OUT, "png", `${safeName}__${mode}.png`);
  await mkdir(resolve(OUT, "png"), { recursive: true });
  await page.screenshot({ path: pngPath, fullPage: true });

  const findings = await page.evaluate(() => {
    function getEffectiveBg(el) {
      let cur = el;
      while (cur && cur !== document.body.parentElement) {
        const cs = window.getComputedStyle(cur);
        const bg = cs.backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
        cur = cur.parentElement;
      }
      const body = window.getComputedStyle(document.body);
      return body.backgroundColor || "rgb(255,255,255)";
    }
    const out = [];
    const all = document.querySelectorAll(
      "p, li, span, a, button, h1, h2, h3, h4, h5, h6, th, td, code, strong, em, label, input, textarea, select, dd, dt"
    );
    for (const el of all) {
      const text = (el.textContent || "").trim();
      if (!text || text.length > 200) continue;
      if (!el.offsetParent && el.tagName !== "HTML" && el.tagName !== "BODY") {
        // Skip hidden elements
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
      }
      const cs = window.getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0) continue;
      const fs = parseFloat(cs.fontSize);
      const fw = parseInt(cs.fontWeight, 10) || 400;
      const large = fs >= 24 || (fs >= 18.66 && fw >= 700);
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: el.className && typeof el.className === "string" ? el.className.slice(0, 60) : "",
        text: text.slice(0, 60),
        fg: cs.color,
        bg: getEffectiveBg(el),
        fontSize: fs,
        large,
      });
    }
    return out;
  });

  await page.close();
  return { url, mode, findings };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 1024 } });

  const results = [];
  for (const path of PAGES) {
    for (const mode of ["light", "dark"]) {
      try {
        const r = await auditPage(context, path, mode);
        results.push(r);
        process.stdout.write(`  ✓ ${mode.padEnd(5)} ${path}\n`);
      } catch (e) {
        process.stdout.write(`  ✗ ${mode.padEnd(5)} ${path}: ${e.message}\n`);
      }
    }
  }

  await browser.close();

  // Compute contrast and produce a findings report
  const lowContrast = [];
  for (const r of results) {
    for (const f of r.findings) {
      const fg = parseCSSColor(f.fg);
      const bgRaw = parseCSSColor(f.bg);
      if (!fg || !bgRaw) continue;
      // If background is semi-transparent, blend it against white (light mode) or near-black (dark mode)
      const base = r.mode === "dark" ? { r: 10, g: 10, b: 11, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
      const bg = bgRaw.a < 1 ? blend(bgRaw, base) : bgRaw;
      const ratio = contrast(fg, bg);
      const threshold = f.large ? 3 : 4.5;
      if (ratio < threshold) {
        lowContrast.push({
          url: r.url.replace(ORIGIN, ""),
          mode: r.mode,
          tag: f.tag,
          cls: f.cls,
          text: f.text,
          fontSize: f.fontSize,
          ratio: Number(ratio.toFixed(2)),
          threshold,
          fg: f.fg,
          bg: f.bg,
        });
      }
    }
  }

  lowContrast.sort((a, b) => a.ratio - b.ratio);
  await writeFile(resolve(OUT, "report.json"), JSON.stringify(lowContrast, null, 2));

  // Markdown summary
  const byPage = {};
  for (const f of lowContrast) {
    const key = `${f.url} [${f.mode}]`;
    (byPage[key] ||= []).push(f);
  }
  let md = `# Light/Dark Contrast Audit — ${new Date().toISOString()}\n\n`;
  md += `Total low-contrast text/bg pairs: **${lowContrast.length}**\n\n`;
  md += `WCAG AA thresholds: 4.5:1 for normal text, 3:1 for large (≥24px or ≥18.66px & ≥700).\n\n`;
  for (const [key, items] of Object.entries(byPage)) {
    md += `## ${key} (${items.length})\n\n`;
    md += `| ratio | tag | font | class | text | fg | bg |\n|---|---|---|---|---|---|---|\n`;
    for (const f of items.slice(0, 20)) {
      md += `| **${f.ratio}** | ${f.tag} | ${f.fontSize}px | ${f.cls || "—"} | ${f.text.replace(/\|/g, "\\|")} | ${f.fg} | ${f.bg} |\n`;
    }
    if (items.length > 20) md += `\n…and ${items.length - 20} more.\n`;
    md += `\n`;
  }
  await writeFile(resolve(OUT, "report.md"), md);

  process.stdout.write(`\nLow-contrast pairs: ${lowContrast.length}\n`);
  process.stdout.write(`Screenshots: ${OUT}/png/\n`);
  process.stdout.write(`Report: ${OUT}/report.md + report.json\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
