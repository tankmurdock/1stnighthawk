import { chromium } from "playwright";
import { PNG } from "pngjs";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/prod", { recursive: true });

const srgbToLin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const relLum = (r, g, b) =>
  0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const URL = process.argv[2] || "https://www.1stnighthawk.com/";

const VIEWPORTS = [
  { name: "iphone-se", w: 320, h: 568 },
  { name: "iphone-13", w: 390, h: 664 },
  { name: "iphone-13-landscape", w: 664, h: 390 },
  { name: "desktop-1440", w: 1440, h: 900 },
];

const b = await chromium.launch();
const rows = [];

for (const v of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 3,
    isMobile: v.w < 900,
    hasTouch: v.w < 900,
  });
  const p = await ctx.newPage();
  const t0 = Date.now();
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(6000);

  const m = await p.evaluate(() => {
    const hero = document.querySelector("section");
    const h1 = hero?.querySelector("h1");
    const ctas = Array.from(
      hero?.querySelectorAll("a[href='/work'], a[href='/lab']") || [],
    );
    const rr = (el) => {
      const b = el.getBoundingClientRect();
      return { top: Math.round(b.top), bottom: Math.round(b.bottom) };
    };
    return {
      vh: window.innerHeight,
      title: document.title,
      h1Text: h1?.innerText.replace(/\n/g, " | "),
      h1: h1 ? rr(h1) : null,
      ctas: ctas.map((c) => ({ t: c.textContent.trim(), ...rr(c) })),
      canvas: !!hero?.querySelector("canvas"),
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  // hide glyphs and measure backdrop contrast
  await p.evaluate(() => {
    const h1 = document.querySelector("section h1");
    if (h1) h1.style.visibility = "hidden";
  });
  const box = await p.evaluate(() => {
    const h1 = document.querySelector("section h1");
    const r = h1.getBoundingClientRect();
    return {
      x: Math.max(0, Math.floor(r.left)),
      y: Math.max(0, Math.floor(r.top)),
      w: Math.min(window.innerWidth - Math.floor(r.left), Math.ceil(r.width)),
      h: Math.min(window.innerHeight - Math.floor(r.top), Math.ceil(r.height)),
    };
  });
  const buf = await p.screenshot();
  const png = PNG.sync.read(buf);
  const lums = [];
  for (let y = box.y; y < box.y + box.h; y++) {
    for (let x = box.x; x < box.x + box.w; x++) {
      const i = (y * png.width + x) * 4;
      lums.push(relLum(png.data[i], png.data[i + 1], png.data[i + 2]));
    }
  }
  lums.sort((a, b) => a - b);
  const p95 = lums[Math.floor(lums.length * 0.95)];
  const boneC = contrast(relLum(244, 241, 234), p95);
  const sodiumC = contrast(relLum(255, 160, 58), p95);

  rows.push({
    viewport: v.name,
    h1: m.h1 ? `${m.h1.top}–${m.h1.bottom}` : "n/a",
    h1InView: m.h1 && m.h1.top >= 0 && m.h1.bottom <= m.vh ? "yes" : "NO",
    ctas: m.ctas
      .map((c) => (c.bottom <= m.vh + 1 ? "ok" : "BELOW"))
      .join("/"),
    bone: boneC.toFixed(1),
    sodium: sodiumC.toFixed(1),
    canvas: m.canvas ? "yes" : "NO",
    ox: m.overflowX ? "OVERFLOW" : "no",
  });

  await p.screenshot({ path: `.shots/prod/${v.name}.png` });
  await ctx.close();
}

await b.close();

console.log(`\nProduction: ${URL}\n`);
const W = { viewport: 20, h1: 12, h1InView: 9, ctas: 7, bone: 6, sodium: 8, canvas: 7, ox: 10 };
const head = Object.keys(W);
const line = (c) => c.map((x, i) => String(x).padEnd(W[head[i]])).join(" ");
console.log(line(head));
console.log("-".repeat(Object.values(W).reduce((a, b) => a + b + 1, 0)));
for (const r of rows) console.log(line(head.map((k) => r[k])));
console.log("\nbone/sodium = WCAG contrast vs brightest 5% of backdrop (need 3.0 for large type).");
