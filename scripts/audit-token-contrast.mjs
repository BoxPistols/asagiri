#!/usr/bin/env node
/**
 * Token-level WCAG contrast matrix.
 *
 * Resolves every semantic colour token in a real browser (so var(), hsla()
 * and color-mix() are computed exactly as they ship), then checks each
 * foreground/background pair the design system promises, in BOTH themes.
 *
 * It then does the same for one case tokens alone cannot cover: the
 * .btn-loading spinner, whose colour comes from --btn-on rather than from the
 * variant's own `color`. That is measured on real rendered elements, because
 * the failure mode is a *call site* that overrode `background` and forgot
 * --btn-on — which a token-pair matrix cannot see.
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
  /* An emphasis fill that carries a label (pill tabs, the progress bar's own
     percentage) needs the 4.5:1 text threshold, not emphasis's own 3:1. */
  ["label on emphasis: on-primary-emphasis / primary-emphasis","--color-on-primary-emphasis","--color-primary-emphasis",4.5],
  ["scroll-to-top hover: on-accent / accent","--color-on-accent","--color-accent",4.5],
  /* Brand chrome is a dark island in BOTH themes, so the ordinary focus ring
     (tuned for the page's own surfaces) does not apply there. */
  ["FOCUS RING on brand: focus-ring-on-brand / surface-brand","--color-focus-ring-on-brand","--color-surface-brand",3.0],
  ["FOCUS RING on brand: focus-ring-on-brand / surface-brand-alt","--color-focus-ring-on-brand","--color-surface-brand-alt",3.0],
  /* Snackbars/tooltips sit on surface-inverse, which flips with the theme. */
  ["FOCUS RING on inverse: focus-ring-on-inverse / surface-inverse","--color-focus-ring-on-inverse","--color-surface-inverse",3.0],

  /* --- hover fills ---
     Buttons, chips and FABs all keep the variant's --color-on-X foreground
     while swapping the fill to --color-X-hover, so every one of these pairs
     is a real rendered state. Nothing may hover to --color-X-dark: in dark
     mode that maps back to the light-mode tone, putting a near-black
     foreground on a dark fill. */
  ["hover: on-primary-dark / primary-dark","--color-on-primary-dark","--color-primary-dark",4.5],
  ["hover: on-primary / primary-hover",  "--color-on-primary",  "--color-primary-hover",  4.5],
  ["hover: on-secondary / secondary-hover","--color-on-secondary","--color-secondary-hover",4.5],
  ["hover: on-success / success-hover",  "--color-on-success",  "--color-success-hover",  4.5],
  ["hover: on-warning / warning-hover",  "--color-on-warning",  "--color-warning-hover",  4.5],
  ["hover: on-danger / danger-hover",    "--color-on-danger",   "--color-danger-hover",   4.5],
  ["hover: on-info / info-hover",        "--color-on-info",     "--color-info-hover",     4.5],
  ["hover: on-accent / accent-hover",    "--color-on-accent",   "--color-accent-hover",   4.5],
  ["hover: on-elegant / elegant-hover",  "--color-on-elegant",  "--color-elegant-hover",  4.5],
  ["on-primary / primary-light",   "--color-on-primary",     "--color-primary-light", 4.5],

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
  /* Indicator fills: the fill IS the state, with no label beside it
     (checked boxes, radio dots, switch tracks, range thumbs, progress fills,
     tab indicators), so 1.4.11 applies squarely. */
  ["indicator: primary-emphasis / surface","--color-primary-emphasis","--color-surface",3.0],
  ["indicator: primary-emphasis / bg","--color-primary-emphasis","--color-bg",         3.0],
  ["indicator: primary-emphasis / surface-variant","--color-primary-emphasis","--color-surface-variant",3.0],
  /* Labelled-button fill — see EXEMPT below. */
  ["primary (labelled fill) / surface","--color-primary",     "--color-surface",       3.0],
  ["primary (labelled fill) / bg", "--color-primary",         "--color-bg",            3.0],
  ["secondary (UI fill) / surface","--color-secondary",      "--color-surface",       3.0],
  ["success (UI) / surface",       "--color-success",        "--color-surface",       3.0],
  ["warning (UI) / surface",       "--color-warning",        "--color-surface",       3.0],
  ["danger (UI) / surface",        "--color-danger",         "--color-surface",       3.0],
  ["info (UI) / surface",          "--color-info",           "--color-surface",       3.0],

  // --- disabled text (informational; WCAG exempts disabled, but track it) ---
  ["text-disabled / surface",      "--color-text-disabled",  "--color-surface",       4.5],
];

const TOKENS = [...new Set(PAIRS.flatMap(p => [p[1], p[2]]))];

/* Every distinct fill a button variant paints, checked against the foreground
   the variant actually renders.
   [label, button classes, ancestor markup ("%s" marks the button slot)]

   Measured via the .btn-loading spinner, because that is the one place the
   foreground is readable programmatically: .btn-loading blanks the label to
   transparent (so the button keeps its width), which means the spinner cannot
   use currentColor and reads --btn-on instead. By the invariant in
   _Button.scss, --btn-on always equals the variant's own `color` — so each row
   audits the LABEL as much as the spinner, and is held to the 4.5:1 text
   threshold rather than the spinner's own 3:1.

   This is what a token-pair matrix cannot see: a <button> inherits --btn-on
   (and, visually, nothing else) from the global button rule, so a component
   that re-fills the button without re-pointing its foreground renders the
   *primary* foreground on a non-primary fill and no token pair is wrong. */
const SLOT = "%s";
const LOADING = [
  ["button (bare)",        "button",                       SLOT],
  ["btn-secondary",        "button btn-secondary",         SLOT],
  ["btn-accent",           "button btn-accent",            SLOT],
  ["btn-success",          "button btn-success",           SLOT],
  ["btn-warning",          "button btn-warning",           SLOT],
  ["btn-danger",           "button btn-danger",            SLOT],
  ["btn-info",             "button btn-info",              SLOT],
  ["btn-elegant",          "button btn-elegant",           SLOT],
  ["button-outline",       "button button-outline",        SLOT],
  ["button-cancel",        "button button-cancel",         SLOT],
  ["button-clear",         "button button-clear",          SLOT],
  ["btn-outline-secondary","button btn-outline-secondary", SLOT],
  ["btn-outline-success",  "button btn-outline-success",   SLOT],
  ["btn-outline-warning",  "button btn-outline-warning",   SLOT],
  ["btn-outline-danger",   "button btn-outline-danger",    SLOT],
  ["btn-outline-info",     "button btn-outline-info",      SLOT],
  ["btn-outline-elegant",  "button btn-outline-elegant",   SLOT],
  // outline-light is for dark/photo backdrops in BOTH themes, so it is audited
  // on the scrim rather than on surface-inverse (which is light in dark mode).
  ["btn-outline-light",    "button btn-outline-light",
    `<div style="background:var(--color-scrim-strong)">${SLOT}</div>`],
  ["btn-tonal",            "button btn-tonal",             SLOT],
  ["btn-tonal-secondary",  "button btn-tonal-secondary",   SLOT],
  ["btn-tonal-success",    "button btn-tonal-success",     SLOT],
  ["btn-tonal-warning",    "button btn-tonal-warning",     SLOT],
  ["btn-tonal-danger",     "button btn-tonal-danger",      SLOT],
  ["btn-tonal-info",       "button btn-tonal-info",        SLOT],
  ["btn-tonal-accent",     "button btn-tonal-accent",      SLOT],
  ["btn-outline-accent",   "button btn-outline-accent",    SLOT],
  ["btn-text",             "button btn-text",              SLOT],
  ["btn-text-secondary",   "button btn-text-secondary",    SLOT],
  ["btn-text-success",     "button btn-text-success",      SLOT],
  ["btn-text-warning",     "button btn-text-warning",      SLOT],
  ["btn-text-danger",      "button btn-text-danger",       SLOT],
  ["btn-text-info",        "button btn-text-info",         SLOT],
  ["fab",                  "fab",                          SLOT],
  ["fab-primary",          "fab fab-primary",              SLOT],
  ["fab-secondary",        "fab fab-secondary",            SLOT],
  ["fab-success",          "fab fab-success",              SLOT],
  ["fab-warning",          "fab fab-warning",              SLOT],
  ["fab-danger",           "fab fab-danger",               SLOT],
  ["fab-info",             "fab fab-info",                 SLOT],
  ["fab-surface",          "fab fab-surface",              SLOT],
  ["fab-tertiary",         "fab fab-tertiary",             SLOT],
  ["copy-button",          "copy-button",         `<div class="code-block">${SLOT}</div>`],
  ["copy-button copied",   "copy-button copied",  `<div class="code-block">${SLOT}</div>`],
  ["snackbar-btn",         "snackbar-btn",      `<div class="snackbar">${SLOT}</div>`],
  ["snackbar-success btn", "snackbar-btn",      `<div class="snackbar snackbar-success">${SLOT}</div>`],
  ["snackbar-warning btn", "snackbar-btn",      `<div class="snackbar snackbar-warning">${SLOT}</div>`],
  ["snackbar-danger btn",  "snackbar-btn",      `<div class="snackbar snackbar-danger">${SLOT}</div>`],
  ["snackbar-info btn",    "snackbar-btn",      `<div class="snackbar snackbar-info">${SLOT}</div>`],
  ["snackbar-surface btn", "snackbar-btn",      `<div class="snackbar snackbar-surface">${SLOT}</div>`],
  ["scroll-top",           "scroll-top show",              SLOT],
  ["modal-close",          "modal-close",       `<div class="modal"><div class="modal-header">${SLOT}</div></div>`],
];

/* Coverage gate for the table above.

   The recurring defect in this area was never a wrong ratio — it was a variant
   nobody audited (.snackbar-surface, .fab-*). So rather than trusting the list
   to stay complete, derive the required set from the CSS: every rule that
   declares --btn-on names a variant whose foreground is call-site specific, and
   each of those must be exercised by a LOADING row. */
function btnOnClasses(sheet) {
  const out = new Set();
  for (const m of sheet.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/--btn-on\s*:/.test(m[2])) continue;
    for (const sel of m[1].split(",")) {
      // the last class in the selector is the variant being re-pointed
      const classes = sel.trim().replace(/::?[a-z-]+(\([^)]*\))?/g, "").match(/\.[A-Za-z0-9_-]+/g);
      if (classes) out.add(classes[classes.length - 1].slice(1));
    }
  }
  return out;
}
{
  const required = btnOnClasses(css);
  const covered = new Set(LOADING.flatMap(([, cls, wrap]) =>
    [...cls.split(/\s+/), ...(wrap.match(/class="([^"]*)"/g) ?? [])
      .flatMap(a => a.slice(7, -1).split(/\s+/))]).filter(Boolean));
  // A bare <button> carries the base rule; `button` is not a class.
  const missing = [...required].filter(c => !covered.has(c)).sort();
  if (missing.length) {
    console.error(`\n${missing.length} variant(s) declare --btn-on but are not audited:`);
    for (const c of missing) console.error(`  .${c}`);
    console.error("Add a LOADING row for each, or the variant's foreground goes unchecked.");
    process.exit(1);
  }
}

const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage();
const loadingMarkup = LOADING.map(([, cls, wrap], i) =>
  wrap.replace(SLOT, `<button id="ld${i}" class="${cls} btn-loading">Loading</button>`)).join("\n");
/* Transitions make getComputedStyle return the mid-flight value right after a
   theme flip, which would silently report the *previous* theme's colours. */
const NO_MOTION = "*,*::before,*::after{transition:none!important;animation:none!important}";
await page.setContent(
  `<!doctype html><html><head><style>${css}</style><style>${NO_MOTION}</style></head>` +
  `<body style="background:var(--color-bg)">${loadingMarkup}</body></html>`);

async function resolve(theme) {
  return await page.evaluate(({ tokens, theme }) => {
    document.documentElement.setAttribute("data-theme", theme);
    const probe = document.createElement("div");
    document.body.appendChild(probe);
    const rootStyle = getComputedStyle(document.documentElement);
    const out = {};
    for (const t of tokens) {
      // An undefined custom property makes `color: var(--x)` invalid at
      // computed-value time, and `color` then *inherits* rather than erroring.
      // Probing alone would therefore silently audit the body text colour, so
      // confirm the token actually exists on the root first.
      if (rootStyle.getPropertyValue(t).trim() === "") { out[t] = null; continue; }
      // Force the browser to fully resolve var()/color-mix()/hsla() to rgb()
      probe.style.color = "";
      probe.style.color = `var(${t})`;
      out[t] = getComputedStyle(probe).color;
    }
    probe.remove();
    return out;
  }, { tokens: TOKENS, theme });
}

/* Reads the rendered .btn-loading spinner colour and the stack of background
   colours behind it, innermost first, so a semi-transparent fill can be
   composited over whatever actually sits underneath it. */
async function resolveLoading(theme) {
  return await page.evaluate(({ n, theme }) => {
    document.documentElement.setAttribute("data-theme", theme);
    const out = [];
    for (let i = 0; i < n; i++) {
      const el = document.getElementById("ld" + i);
      const stack = [];
      for (let node = el; node; node = node.parentElement) {
        stack.push(getComputedStyle(node).backgroundColor);
      }
      out.push({ spinner: getComputedStyle(el, "::after").borderTopColor, stack });
    }
    return out;
  }, { n: LOADING.length, theme });
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
  // ...and as oklab() when the mix is in a polar/perceptual space
  m = s.match(/^\s*oklab\(([^)]+)\)\s*$/);
  if (m) {
    const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
    const [L, A, B] = p;
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const mm = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const ss = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    const [r, g, b] = [
      4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * ss,
      -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * ss,
      -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * ss,
    ].map(v => {
      const c = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
      return Math.min(255, Math.max(0, c * 255));
    });
    return { r, g, b, a: p[3] === undefined ? 1 : p[3] };
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
  /* A filled button carries its own label at >= 4.5:1, so the control is
     identifiable without relying on its boundary — 1.4.11 does not require
     3:1 for the fill itself. Tracked here so the number stays visible; any
     fill that has NO label is audited above as an "indicator" instead. */
  "primary (labelled fill) / surface",
  "primary (labelled fill) / bg",
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

  // Each variant's foreground vs. its own fill — measured, not derived.
  const loading = await resolveLoading(theme);
  results[theme].push(...loading.map(({ spinner, stack }, i) => {
    const label = `variant foreground / ${LOADING[i][0]}`;
    const sp = parse(spinner);
    if (!sp) return { label, min: 4.5, exempt: false, error: `unresolved foreground ${spinner}` };
    // Composite the ancestor backgrounds outermost-inward into one opaque colour.
    let bg = pageBg;
    for (let k = stack.length - 1; k >= 0; k--) {
      const layer = parse(stack[k]);
      if (layer && layer.a > 0) bg = layer.a < 1 ? over(layer, bg) : layer;
    }
    const r = ratio(over(sp, bg), bg);
    return { label, min: 4.5, exempt: false, ratio: +r.toFixed(2), pass: r >= 4.5, fg: spinner, bg: `stack:${stack[0]}` };
  }));
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

if (UPDATE) {
  writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 2) + "\n");
  console.log(`\nBaseline written to ${BASELINE_PATH}`);
  process.exit(0);
}

if (!existsSync(BASELINE_PATH)) {
  // Deliberately not auto-created: silently writing a baseline here would turn
  // a lost or unmerged file into a green run that records whatever the current
  // (possibly regressed) ratios are.
  console.error(`No baseline at ${BASELINE_PATH}.`);
  console.error("Run: node scripts/audit-token-contrast.mjs --update-baseline");
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
const regressions = [];
for (const theme of ["light", "dark"]) {
  for (const r of results[theme]) {
    if (r.error) { regressions.push(`${theme} ${r.label}: ${r.error}`); continue; }
    if (r.exempt) continue;
    const base = baseline[theme]?.[r.label];
    if (base === undefined) {
      // A pair added since the baseline was written has nothing to compare
      // against, but it must still meet its threshold — otherwise a newly
      // audited failure would exit 0 until someone regenerated the baseline.
      if (!r.pass) {
        regressions.push(`${theme} ${r.label}: new pair fails at ${r.ratio}:1 (need ${r.min})`);
      }
      continue;
    }
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
