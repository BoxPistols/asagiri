import { chromium } from "@playwright/test";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 1800 } });
const p = await ctx.newPage();
await p.goto("http://localhost:8899/showcase.html", { waitUntil: "networkidle" });

async function shot(label, selector) {
  const el = await p.$(selector);
  if (!el) { console.log(`skip ${label}: not found`); return; }
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(250);
  await el.screenshot({ path: `/tmp/after-${label}.png` });
}

// Light mode
await shot("avatar-light", ".section:has(h2.section-title:text('Avatar Component'))");
await shot("tabs-light", ".section:has(h2.section-title:text('Tabs Component'))");

// Dark mode
await p.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
await p.waitForTimeout(300);
await shot("avatar-dark", ".section:has(h2.section-title:text('Avatar Component'))");
await shot("tabs-dark", ".section:has(h2.section-title:text('Tabs Component'))");

await b.close();
console.log("captured");
