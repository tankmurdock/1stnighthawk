import { chromium } from "playwright";

/**
 * Verifies the scroll fade still works after the rewrite, on both touch and
 * desktop profiles, and that the mobile path skips the expensive full-screen
 * canvas compositing while still fading the text out.
 */
const URL = process.argv[2] || "http://localhost:5173/";

const PROFILES = [
  { name: "iphone-13 (touch)", w: 390, h: 664, touch: true },
  { name: "desktop-1440", w: 1440, h: 900, touch: false },
];

const b = await chromium.launch();
const rows = [];

for (const v of PROFILES) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 2,
    isMobile: v.touch,
    hasTouch: v.touch,
  });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(6000);

  const read = () =>
    p.evaluate(() => {
      const hero = document.querySelector("section");
      const mark = hero.querySelector(":scope > div");
      const content = hero.querySelector("[class*='justify-end']");
      const meta = hero.querySelector("[class*='top-\\[84px\\]']");
      const cs = (el) => (el ? getComputedStyle(el) : null);
      const m = cs(mark), c = cs(content), mt = cs(meta);
      return {
        scrollY: Math.round(window.scrollY),
        markOpacity: m ? +m.opacity : null,
        markTransform: m ? m.transform : null,
        contentOpacity: c ? +c.opacity : null,
        contentTransform: c ? c.transform : null,
        metaOpacity: mt ? +mt.opacity : null,
        coarse: window.matchMedia("(pointer: coarse)").matches,
        canvasDpr: (() => {
          const cv = hero.querySelector("canvas");
          if (!cv) return null;
          const r = cv.getBoundingClientRect();
          return cv.width && r.width ? +(cv.width / r.width).toFixed(2) : null;
        })(),
      };
    });

  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(350);
  const top = await read();

  await p.evaluate(() => window.scrollTo(0, 280));
  await p.waitForTimeout(350);
  const mid = await read();

  await p.evaluate(() => window.scrollTo(0, 900));
  await p.waitForTimeout(350);
  const far = await read();

  rows.push({ name: v.name, top, mid, far });
  await ctx.close();
}

await b.close();

for (const r of rows) {
  console.log(`\n=== ${r.name} (pointer coarse: ${r.top.coarse}) ===`);
  console.log(`  canvas DPR: ${r.top.canvasDpr}`);
  for (const [label, s] of [
    ["top (0)", r.top],
    ["mid (280)", r.mid],
    ["far (900)", r.far],
  ]) {
    console.log(
      `  ${label.padEnd(10)} y=${String(s.scrollY).padStart(4)}  ` +
        `text=${String(s.contentOpacity).padEnd(5)}  ` +
        `mark=${String(s.markOpacity).padEnd(5)}  ` +
        `meta=${String(s.metaOpacity).padEnd(5)}  ` +
        `textTf=${s.contentTransform === "none" ? "none" : "yes"}`,
    );
  }
}
