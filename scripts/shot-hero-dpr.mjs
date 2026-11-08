import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/dpr", { recursive: true });

const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 390, height: 664 },
  deviceScaleFactor: 3, // a real iPhone
  isMobile: true,
  hasTouch: true,
});
const p = await ctx.newPage();
await p.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(6500);
await p.screenshot({ path: ".shots/dpr/iphone-13-hero.png" });
console.log("captured");
await b.close();
