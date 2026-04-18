import { chromium } from "@playwright/test";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 1800 } });
const p = await ctx.newPage();
await p.goto("http://localhost:8899/showcase.html", { waitUntil: "networkidle" });

await p.evaluate(() => {
  const h = [...document.querySelectorAll("h2")].find(h => h.textContent.includes("Tabs Component"));
  h?.scrollIntoView({ block: "start" });
});
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/after-tabs.png", clip: { x: 0, y: 0, width: 1280, height: 700 } });

await p.evaluate(() => {
  const h = [...document.querySelectorAll("h2")].find(h => h.textContent.includes("Avatar"));
  h?.scrollIntoView({ block: "start" });
});
await p.waitForTimeout(400);
await p.screenshot({ path: "/tmp/after-avatars.png", clip: { x: 0, y: 0, width: 1280, height: 900 } });

await b.close();
console.log("captured");
