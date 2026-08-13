#!/usr/bin/env node
/**
 * Token-level WCAG contrast matrix.
 *
 * Resolves every semantic colour token in a real browser (so var(), hsla()
 * and color-mix() are computed exactly as they ship), then checks each
 * foreground/background pair the design system promises, in BOTH themes.
 *
 * Unlike scripts/audit-light-dark.mjs this needs no dev server and no
 * screenshots, so it runs in seconds and is suitable as a CI regression gate.
 *
 * Usage:  node scripts/audit-token-contrast.mjs
 * Env:    CHROMIUM_PATH=/path/to/chrome   (optional, for preinstalled browsers)
 * Exit:   non-zero if any pair regresses below its WCAG threshold.
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(ROOT, "css/main.css"), "utf8");

// Foreground/background pairs that the design system semantically promises.
// [label, fgToken, bgToken, minRatio, note]
const PAIRS = [
  // --- body text on surfaces ---
  ["text-primary / bg",            "--color-text-primary",   "--color-bg",            4.5],
  ["text-primary / surface",       "--color-text-primary",   "--color-surface",       4.5],
  ["text-secondary / bg",          "--color-text-secondary", "--color-bg",            4.5],
  ["text-secondary / surface",     "--color-text-secondary", "--color-surface",       4.5],
  ["text-tertiary / bg",           "--color-text-tertiary",  "--color-bg",            4.5],
  ["text-tertiary / surface",      "--color-text-tertiary",  "--color-surface",       4.5],
  ["text-primary / surface-1",     "--color-text-primary",   "--color-surface-1",     4.5],
  ["text-primary / surface-3",     "--color-text-primary",   "--color-surface-3",     4.5],
  ["text-primary / surface-5",     "--color-text-primary",   "--color-surface-5",     4.5],
  ["text-secondary / surface-3",   "--color-text-secondary", "--color-surface-3",     4.5],
  ["text-tertiary / surface-3",    "--color-text-tertiary",  "--color-surface-3",     4.5],
  ["text-primary / surface-variant","--color-text-primary",  "--color-surface-variant",4.5],
  ["text-secondary / surface-variant","--color-text-secondary","--color-surface-variant",4.5],
  ["on-surface-inverse / surface-inverse","--color-on-surface-inverse","--color-surface-inverse",4.5],
  ["text-code / bg-code",          "--color-text-code",      "--color-bg-code",       4.5],

  // --- links ---
  ["link / bg",                    "--color-text-link",      "--color-bg",            4.5],
  ["link / surface",               "--color-text-link",      "--color-surface",       4.5],
  ["link-hover / surface",         "--color-text-link-hover","--color-surface",       4.5],
  ["link-visited / surface",       "--color-text-link-visited","--color-surface",     4.5],
  ["link / surface-3",             "--color-text-link",      "--color-surface-3",     4.5],

  // --- "on-" pairs: text on filled brand/functional colors ---
  ["on-primary / primary",         "--color-on-primary",     "--color-primary",       4.5],
  ["on-secondary / secondary",     "--color-on-secondary",   "--color-secondary",     4.5],
  ["on-accent / accent",           "--color-on-accent",      "--color-accent",        4.5],
  ["on-success / success",         "--color-on-success",     "--color-success",       4.5],
  ["on-warning / warning",         "--color-on-warning",     "--color-warning",       4.5],
  ["on-danger / danger",           "--color-on-danger",      "--color-danger",        4.5],
  ["on-info / info",               "--color-on-info",        "--color-info",          4.5],
  ["on-elegant / elegant",         "--color-on-elegant",     "--color-elegant",       4.5],
  ["on-primary-container / primary-container","--color-on-primary-container","--color-primary-container",4.5],

  // --- concrete component call sites that pair a foreground with a fill ---
  ["badge/chip base: text-primary / surface-variant","--color-text-primary","--color-surface-variant",4.5],
  ["cancel button: on-scrim / bg-cancel","--color-on-scrim","--color-bg-cancel",4.5],
  ["brand chrome: on-surface-brand / surface-brand","--color-on-surface-brand","--color-surface-brand",4.5],
  ["brand chrome: on-surface-brand / surface-brand-alt","--color-on-surface-brand","--color-surface-brand-alt",4.5],
  ["overlay: on-scrim / scrim-strong","--color-on-scrim","--color-scrim-strong",4.5],

  // --- filled *-dark / *-light variants (documented as usable fills) ---
  ["on-primary / primary-dark",    "--color-on-primary",     "--color-primary-dark",  4.5],
  ["on-primary / primary-light",   "--color-on-primary",     "--color-primary-light", 4.5],
  ["text-on-brand / success-dark", "--color-text-on-brand",  "--color-success-dark",  4.5],
  ["text-on-brand / danger-dark",  "--color-text-on-brand",  "--color-danger-dark",   4.5],
  ["text-on-brand / warning-dark", "--color-text-on-brand",  "--color-warning-dark",  4.5],
  ["text-on-brand / info-dark",    "--color-text-on-brand",  "--color-info-dark",     4.5],

  // --- semantic text colours used as FOREGROUND on plain surfaces (alerts, icons) ---
  ["success / surface",            "--color-success",        "--color-surface",       4.5],
  ["warning / surface",            "--color-warning",        "--color-surface",       4.5],
  ["danger / surface",             "--color-danger",         "--color-surface",       4.5],
  ["info / surface",               "--color-info",           "--color-surface",       4.5],
  ["success / bg",                 "--color-success",        "--color-bg",            4.5],
  ["warning / bg",                 "--color-warning",        "--color-bg",            4.5],
  ["danger / bg",                  "--color-danger",         "--color-bg",            4.5],
  ["info / bg",                    "--color-info",           "--color-bg",            4.5],

  // --- NON-TEXT contrast (WCAG 2.1 SC 1.4.11) : 3:1 ---
  ["FOCUS RING border-focus / bg",   "--color-border-focus", "--color-bg",            3.0],
  ["FOCUS RING border-focus / surface","--color-border-focus","--color-surface",      3.0],
  ["FOCUS RING border-focus / surface-3","--color-border-focus","--color-surface-3",  3.0],
  ["border-strong / surface",      "--color-border-strong",  "--color-surface",       3.0],
  ["border / surface",             "--color-border",         "--color-surface",       3.0],
  ["primary (UI fill) / surface",  "--color-primary",        "--color-surface",       3.0],
  ["primary (UI fill) / bg",       "--color-primary",        "--color-bg",            3.0],
  ["secondary (UI fill) / surface","--color-secondary",      "--color-surface",       3.0],
  ["success (UI) / surface",       "--color-success",        "--color-surface",       3.0],
  ["warning (UI) / surface",       "--color-warning",        "--color-surface",       3.0],
  ["danger (UI) / surface",        "--color-danger",         "--color-surface",       3.0],
  ["info (UI) / surface",          "--color-info",           "--color-surface",       3.0],

  // --- disabled text (informational; WCAG exempts disabled, but track it) ---
  ["text-disabled / surface",      "--color-text-disabled",  "--color-surface",       4.5],
];

const TOKENS = [...new Set(PAIRS.flatMap(p => [p[1], p[2]]))];

const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage();
await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body></body></html>`);

async function resolve(theme) {
  return await page.evaluate(({ tokens, theme }) => {
    document.documentElement.setAttribute("data-theme", theme);
    const probe = document.createElement("div");
    document.body.appendChild(probe);
    const out = {};
    for (const t of tokens) {
      // Force the browser to fully resolve var()/color-mix()/hsla() to rgb()
      probe.style.color = "";
      probe.style.color = `var(${t})`;
      out[t] = getComputedStyle(probe).color;
    }
    probe.remove();
    return out;
  }, { tokens: TOKENS, theme });
}

function parse(s) {
  if (!s) return null;
  let m = s.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  }
  // Chromium returns color-mix() results as color(srgb r g b / a) with 0..1 channels
  m = s.match(/color\(srgb\s+([^)]+)\)/);
  if (m) {
    const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
    return { r: p[0] * 255, g: p[1] * 255, b: p[2] * 255, a: p[3] === undefined ? 1 : p[3] };
  }
  if (s.trim() === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  return null;
}
function over(fg, bg) { // alpha-composite fg over opaque bg
  const a = fg.a;
  return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
}
function lum(c) {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
function ratio(fg, bg) {
  const L1 = lum(fg), L2 = lum(bg);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

/* Pairs WCAG does not actually require to meet the threshold. Reported for
   visibility, never gated:
   - disabled text is explicitly exempt from SC 1.4.3 / 1.4.11
   - --color-border / --color-border-strong are decorative dividers, not the
     sole visual indicator of a control boundary */
const EXEMPT = new Set([
  "text-disabled / surface",
  "border / surface",
  "border-strong / surface",
]);

const results = {};
for (const theme of ["light", "dark"]) {
  const vals = await resolve(theme);
  // page background used to composite semi-transparent backgrounds
  const pageBg = parse(vals["--color-bg"]) ?? { r: 255, g: 255, b: 255, a: 1 };
  results[theme] = PAIRS.map(([label, fgT, bgT, min]) => {
    const exempt = EXEMPT.has(label);
    const fgRaw = parse(vals[fgT]), bgRaw = parse(vals[bgT]);
    if (!fgRaw || !bgRaw) return { label, min, exempt, error: `unresolved ${!fgRaw ? fgT : bgT}` };
    const bg = bgRaw.a < 1 ? over(bgRaw, pageBg) : bgRaw;
    const fg = fgRaw.a < 1 ? over(fgRaw, bg) : fgRaw;
    const r = ratio(fg, bg);
    return { label, min, exempt, ratio: +r.toFixed(2), pass: r >= min, fg: vals[fgT], bg: vals[bgT] };
  });
}
await browser.close();

/* ---------------------------------------------------------------------------
   Baseline gate.

   contrast-baseline.json records the ratio every pair had when the baseline
   was last accepted. The gate then enforces two rules:

     1. a pair that passed in the baseline must still pass  (no new failures)
     2. no pair may drop more than TOLERANCE below its baseline  (no erosion)

   Known-but-unfixed pairs therefore do not block CI, but they can never get
   worse — and once they are fixed, regenerating the baseline locks the win in.

   Regenerate after an intentional palette change:
       node scripts/audit-token-contrast.mjs --update-baseline
   --------------------------------------------------------------------------- */
const TOLERANCE = 0.05;
const BASELINE_PATH = join(ROOT, "scripts/contrast-baseline.json");
const UPDATE = process.argv.includes("--update-baseline");

for (const theme of ["light", "dark"]) {
  const rows = results[theme];
  const fails = rows.filter(r => r.error || (!r.pass && !r.exempt));
  const info = rows.filter(r => r.exempt && !r.pass);
  console.log(`\n${"=".repeat(78)}\n${theme.toUpperCase()}  —  ${rows.filter(r => r.pass).length}/${rows.length} pass\n${"=".repeat(78)}`);
  for (const r of fails) {
    if (r.error) { console.log(`  ERR  ${r.label}: ${r.error}`); continue; }
    console.log(`  FAIL ${r.ratio.toFixed(2).padStart(6)}:1 (need ${r.min})  ${r.label.padEnd(42)} fg=${r.fg} bg=${r.bg}`);
  }
  if (!fails.length) console.log("  (no non-exempt failures)");
  for (const r of info) {
    console.log(`  info ${r.ratio.toFixed(2).padStart(6)}:1 (WCAG-exempt)   ${r.label}`);
  }
}

// marginal passes worth knowing about
console.log(`\n${"=".repeat(78)}\nMARGINAL (pass but < min + 0.5)\n${"=".repeat(78)}`);
for (const theme of ["light", "dark"]) {
  for (const r of results[theme]) {
    if (!r.error && r.pass && r.ratio < r.min + 0.5) {
      console.log(`  ${theme.padEnd(5)} ${r.ratio.toFixed(2).padStart(6)}:1 (need ${r.min})  ${r.label}`);
    }
  }
}

const current = {};
for (const theme of ["light", "dark"]) {
  current[theme] = Object.fromEntries(
    results[theme].filter(r => !r.error).map(r => [r.label, r.ratio])
  );
}

if (UPDATE || !existsSync(BASELINE_PATH)) {
  writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 2) + "\n");
  console.log(`\nBaseline written to ${BASELINE_PATH}`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
const regressions = [];
for (const theme of ["light", "dark"]) {
  for (const r of results[theme]) {
    if (r.error) { regressions.push(`${theme} ${r.label}: ${r.error}`); continue; }
    if (r.exempt) continue;
    const base = baseline[theme]?.[r.label];
    if (base === undefined) continue; // new pair — captured on next baseline update
    if (base >= r.min && !r.pass) {
      regressions.push(`${theme} ${r.label}: was passing at ${base}:1, now ${r.ratio}:1 (need ${r.min})`);
    } else if (r.ratio < base - TOLERANCE) {
      regressions.push(`${theme} ${r.label}: eroded ${base}:1 -> ${r.ratio}:1`);
    }
  }
}

if (regressions.length) {
  console.error(`\n${"=".repeat(78)}\nREGRESSIONS vs baseline (${regressions.length})\n${"=".repeat(78)}`);
  for (const r of regressions) console.error(`  ${r}`);
  console.error("\nFix the regression, or accept it with --update-baseline.");
  process.exit(1);
}

const open = ["light", "dark"].flatMap(t => results[t].filter(r => !r.pass && !r.exempt).map(r => `${t} ${r.label}`));
console.log(`\nNo regressions vs baseline.${open.length ? ` ${open.length} known issue(s) still open.` : ""}`);
