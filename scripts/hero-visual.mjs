import { chromium } from "playwright";
import { PNG } from "pngjs";
import { mkdirSync } from "node:fs";

const OUT = ".shots/hero";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "phone-se", w: 320, h: 568, dsf: 2 },
  { name: "phone-13", w: 390, h: 664, dsf: 3 },
  { name: "phone-15promax", w: 430, h: 739, dsf: 3 },
  { name: "phone-landscape", w: 844, h: 390, dsf: 3 },
  { name: "phone-13-landscape", w: 664, h: 390, dsf: 3 },
  { name: "tablet-portrait", w: 768, h: 1024, dsf: 2 },
  { name: "tablet-landscape", w: 1024, h: 768, dsf: 2 },
  { name: "laptop-1280", w: 1280, h: 800, dsf: 1 },
  { name: "desktop-1440", w: 1440, h: 900, dsf: 1 },
];

/** Bounding box of pixels brighter than `thresh`, in image coords. */
function brightBox(buf, thresh = 40) {
  const png = PNG.sync.read(buf);
  const { width, height, data } = png;
  let minX = width, minY = height, maxX = -1, maxY = -1, hits = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      if (lum > thresh) {
        hits++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return hits < 30 ? null : { minX, minY, maxX, maxY, hits, width, height };
}

const b = await chromium.launch();
const rows = [];

for (const v of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: v.dsf,
    isMobile: v.w < 900,
    hasTouch: v.w < 900,
  });
  const p = await ctx.newPage();
  await p.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(5000);

  const m = await p.evaluate(() => {
    const hero = document.querySelector("section");
    const rr = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return {
        top: Math.round(b.top),
        bottom: Math.round(b.bottom),
        left: Math.round(b.left),
        right: Math.round(b.right),
        h: Math.round(b.height),
        w: Math.round(b.width),
      };
    };
    const h1 = hero.querySelector("h1");
    const sceneWrap = hero.querySelector(":scope > div");
    const ctas = Array.from(hero.querySelectorAll("a[href='/work'], a[href='/lab']"));
    return {
      vh: window.innerHeight,
      vw: window.innerWidth,
      hero: rr(hero),
      h1: rr(h1),
      h1Lines: h1
        ? Array.from(h1.children).map((c) => ({
            text: c.textContent.trim(),
            ...rr(c),
          }))
        : [],
      scene: rr(sceneWrap),
      ctas: ctas.map((a) => ({ text: a.textContent.trim(), ...rr(a) })),
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  // Screenshot just the 3D layer and find where the actual mark sits.
  const sceneEl = await p.$("section > div");
  let mark = null;
  if (sceneEl) {
    const buf = await sceneEl.screenshot();
    const box = brightBox(buf);
    if (box) {
      const boxEl = await sceneEl.boundingBox();
      const sx = boxEl.width / box.width;
      const sy = boxEl.height / box.height;
      mark = {
        top: Math.round(boxEl.y + box.minY * sy),
        bottom: Math.round(boxEl.y + box.maxY * sy),
        left: Math.round(boxEl.x + box.minX * sx),
        right: Math.round(boxEl.x + box.maxX * sx),
      };
    }
  }

  const gap = m.h1 && mark ? m.h1.top - mark.bottom : null;
  const sodiumLine = m.h1Lines[2];
  const sodiumOnMark =
    sodiumLine && mark
      ? sodiumLine.top < mark.bottom && sodiumLine.bottom > mark.top
      : null;

  rows.push({
    viewport: v.name,
    size: `${v.w}x${v.h}`,
    h1: `${m.h1.top}–${m.h1.bottom}`,
    mark: mark ? `${mark.top}–${mark.bottom}` : "n/a",
    gap: gap === null ? "n/a" : gap,
    sodium: sodiumOnMark === null ? "n/a" : sodiumOnMark ? "ON MARK" : "clear",
    ctas: m.ctas.map((c) => (c.bottom <= m.vh + 1 ? "ok" : "BELOW")).join("/"),
    ox: m.overflowX ? "OVERFLOW" : "no",
  });

  await p.screenshot({ path: `${OUT}/${v.name}.png` });
  await ctx.close();
}

await b.close();

const W = { viewport: 19, size: 10, h1: 12, mark: 13, gap: 6, sodium: 9, ctas: 8, ox: 10 };
const head = Object.keys(W);
const line = (cells) => cells.map((c, i) => String(c).padEnd(W[head[i]])).join(" ");
console.log("\n" + line(head));
console.log("-".repeat(Object.values(W).reduce((a, b) => a + b + 1, 0)));
for (const r of rows) console.log(line(head.map((k) => r[k])));
