import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/prod", { recursive: true });

const URL = process.argv[2] || "https://www.1stnighthawk.com/";

const VIEWPORTS = [
  { name: "clean-iphone-se", w: 320, h: 568 },
  { name: "clean-iphone-13", w: 390, h: 664 },
  { name: "clean-iphone-13-landscape", w: 664, h: 390 },
];

const b = await chromium.launch();

for (const v of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 3,
    isMobile: v.w < 900,
    hasTouch: v.w < 900,
  });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(6000);
  // make sure the entrance animation has settled
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `.shots/prod/${v.name}.png` });
  console.log(`captured ${v.name}`);
  await ctx.close();
}

await b.close();
