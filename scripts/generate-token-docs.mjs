#!/usr/bin/env node
/**
 * Regenerate the colour tables in DARK_MODE.md from the built CSS.
 *
 * These tables drifted badly once before: they still documented the v2
 * palette (--color-bg: #f9f9f9, --color-danger: #e1323c, …) long after the
 * v3 token refactor replaced every one of those values, and quoted contrast
 * ratios for colours that no longer existed. Hand-maintained tables of
 * generated values will always drift, so they are generated instead.
 *
 * Values are resolved in a real browser, so var(), hsla() and color-mix()
 * are reported exactly as they ship — including the per-theme remaps.
 *
 * Usage:  node scripts/generate-token-docs.mjs [--check]
 *         --check exits non-zero if the file is out of date (for CI).
 * Env:    CHROMIUM_PATH=/path/to/chrome
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOC = join(ROOT, "DARK_MODE.md");
const CHECK = process.argv.includes("--check");
const START = "<!-- BEGIN GENERATED: color-tokens -->";
const END = "<!-- END GENERATED: color-tokens -->";

/** [heading, [[token, purpose], …]] */
const GROUPS = [
  ["背景・サーフェス / Surfaces", [
    ["--color-bg", "ページ背景"],
    ["--color-surface", "カード・シート"],
    ["--color-surface-1", "標高1（最も低い）"],
    ["--color-surface-3", "標高3"],
    ["--color-surface-5", "標高5（最も高い）"],
    ["--color-surface-variant", "控えめな面（バッジ基底など）"],
    ["--color-surface-inverse", "反転面（ツールチップ）"],
    ["--color-surface-brand", "ブランド外装（テーマ不変）"],
  ]],
  ["テキスト / Text", [
    ["--color-text-primary", "本文"],
    ["--color-text-secondary", "補助テキスト"],
    ["--color-text-tertiary", "三次テキスト"],
    ["--color-text-link", "リンク"],
    ["--color-on-scrim", "スクリム上の前景（両モード共通）"],
  ]],
  ["ブランド / Brand", [
    ["--color-primary", "ブランド主色（ラベル付き塗り）"],
    ["--color-primary-emphasis", "インジケータ塗り・フォーカスリング"],
    ["--color-primary-hover", "ホバー時の塗り"],
    ["--color-on-primary", "primary 上の前景"],
    ["--color-secondary", "ブランド副色"],
    ["--color-on-secondary", "secondary 上の前景"],
  ]],
  ["機能カラー / Functional", [
    ["--color-success", "成功"],
    ["--color-warning", "警告"],
    ["--color-danger", "エラー"],
    ["--color-info", "情報"],
    ["--color-accent", "アクセント"],
  ]],
  ["境界・フォーカス / Borders", [
    ["--color-border", "標準の境界"],
    ["--color-border-strong", "強い境界"],
    ["--color-focus-ring", "フォーカスリング"],
  ]],
];

const TOKENS = GROUPS.flatMap(([, rows]) => rows.map(r => r[0]));

const css = readFileSync(join(ROOT, "css/main.css"), "utf8");
const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage();
await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body></body></html>`);

async function resolve(theme) {
  return page.evaluate(({ tokens, theme }) => {
    document.documentElement.setAttribute("data-theme", theme);
    const probe = document.createElement("div");
    document.body.appendChild(probe);
    const out = {};
    for (const t of tokens) {
      probe.style.color = "";
      probe.style.color = `var(${t})`;
      out[t] = getComputedStyle(probe).color;
    }
    probe.remove();
    return out;
  }, { tokens: TOKENS, theme });
}

const light = await resolve("light");
const dark = await resolve("dark");
await browser.close();

/** rgb()/color(srgb) -> #rrggbb, keeping alpha visible when present */
function pretty(v) {
  if (!v) return "—";
  let m = v.match(/rgba?\(([^)]+)\)/);
  let r, g, b, a = 1;
  if (m) {
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    [r, g, b] = p; a = p[3] ?? 1;
  } else {
    m = v.match(/color\(srgb\s+([^)]+)\)/);
    if (!m) return `\`${v}\``;
    const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
    [r, g, b] = p.slice(0, 3).map(x => Math.round(x * 255)); a = p[3] ?? 1;
  }
  const hex = "#" + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, "0")).join("");
  return a < 1 ? `\`${hex}\` (α${a.toFixed(2)})` : `\`${hex}\``;
}

let out = [START,
  "",
  "<!-- このセクションは scripts/generate-token-docs.mjs が css/main.css から",
  "     生成します。手で編集しても次回の生成で上書きされます。",
  "     再生成: npm run docs:tokens -->",
  ""];

for (const [heading, rows] of GROUPS) {
  out.push(`#### ${heading}`, "", "| 変数名 | ライト | ダーク | 用途 |", "|---|---|---|---|");
  for (const [token, purpose] of rows) {
    out.push(`| \`${token}\` | ${pretty(light[token])} | ${pretty(dark[token])} | ${purpose} |`);
  }
  out.push("");
}

out.push(
  "コントラスト比は `npm run test:contrast` が全ペアについて実ブラウザで検証し、",
  "`scripts/contrast-baseline.json` を基準に退行を検出します。",
  "",
  END);

const generated = out.join("\n");
const doc = readFileSync(DOC, "utf8");
const s = doc.indexOf(START), e = doc.indexOf(END);
if (s === -1 || e === -1) {
  console.error(`Markers not found in ${DOC}. Add:\n${START}\n${END}`);
  process.exit(1);
}
const next = doc.slice(0, s) + generated + doc.slice(e + END.length);

if (CHECK) {
  if (next !== doc) {
    console.error("DARK_MODE.md colour tables are out of date. Run: npm run docs:tokens");
    process.exit(1);
  }
  console.log("DARK_MODE.md colour tables are up to date.");
  process.exit(0);
}

writeFileSync(DOC, next);
console.log(`Regenerated colour tables in ${DOC}`);
