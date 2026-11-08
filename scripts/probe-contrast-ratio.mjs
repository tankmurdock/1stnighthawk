import { chromium } from "playwright";
import { PNG } from "pngjs";

/**
 * For each headline line, compare the pixel colours of the glyphs themselves
 * with the backdrop immediately around them, then report WCAG contrast.
 * Text-on-background legibility is a ratio, not an opinion.
 */
const srgbToLin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const relLum = (r, g, b) =>
  0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const contrast = (l1, l2) => {
  const a = Math.max(l1, l2);
  const b = Math.min(l1, l2);
  return (a + 0.05) / (b + 0.05);
};

const VIEWPORTS = [
  { name: "phone-se", w: 320, h: 568 },
  { name: "phone-13", w: 390, h: 664 },
  { name: "phone-15promax", w: 430, h: 739 },
  { name: "phone-landscape", w: 844, h: 390 },
  { name: "tablet-portrait", w: 768, h: 1024 },
  { name: "desktop-1440", w: 1440, h: 900 },
];

const b = await chromium.launch();
const rows = [];

for (const v of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 1,
    isMobile: v.w < 900,
    hasTouch: v.w < 900,
  });
  const p = await ctx.newPage();
  await p.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(5200);

  const box = await p.evaluate(() => {
    const h1 = document.querySelector("section h1");
    const r = h1.getBoundingClientRect();
    h1.style.visibility = "hidden";
    return {
      x: Math.max(0, Math.floor(r.left)),
      y: Math.max(0, Math.floor(r.top)),
      w: Math.min(window.innerWidth - Math.floor(r.left), Math.ceil(r.width)),
      h: Math.min(window.innerHeight - Math.floor(r.top), Math.ceil(r.height)),
    };
  });

  const buf = await p.screenshot();
  const png = PNG.sync.read(buf);

  // Sample the backdrop inside the headline box; find the brightest 5% band,
  // which is the worst case any glyph stroke has to sit on.
  const lums = [];
  for (let y = box.y; y < box.y + box.h; y++) {
    for (let x = box.x; x < box.x + box.w; x++) {
      const i = (y * png.width + x) * 4;
      lums.push(relLum(png.data[i], png.data[i + 1], png.data[i + 2]));
    }
  }
  lums.sort((a, b) => a - b);
  const pct = (q) => lums[Math.min(lums.length - 1, Math.floor(lums.length * q))];
  const median = pct(0.5);
  const p95 = pct(0.95);
  const p99 = pct(0.99);

  // bone #f4f1ea and sodium #ffa03a
  const boneL = relLum(244, 241, 234);
  const sodiumL = relLum(255, 160, 58);

  const minBone = contrast(boneL, p95); // worst-case for white lines
  const minSodium = contrast(sodiumL, p95); // worst-case for the amber line
  const medBone = contrast(boneL, median);
  const medSodium = contrast(sodiumL, median);

  rows.push({
    viewport: v.name,
    median: median.toFixed(3),
    p95: p95.toFixed(3),
    boneP95: minBone.toFixed(2),
    sodiumP95: minSodium.toFixed(2),
    boneMed: medBone.toFixed(1),
    sodiumMed: medSodium.toFixed(1),
  });

  await ctx.close();
}

await b.close();

const W = { viewport: 19, median: 8, p95: 8, boneP95: 9, sodiumP95: 11, boneMed: 9, sodiumMed: 11 };
const head = Object.keys(W);
const line = (c) => c.map((x, i) => String(x).padEnd(W[head[i]])).join(" ");
console.log("\nBackdrop contrast (text hidden). WCAG: 4.5 AA body, 3.0 AA large.\n");
console.log(line(head));
console.log("-".repeat(Object.values(W).reduce((a, b) => a + b + 1, 0)));
for (const r of rows) console.log(line(head.map((k) => r[k])));
console.log("\nP95 = the brightest 5% of backdrop under the text (worst case).");
console.log("Largest display type is 'large text' — 3.0 is the floor.");
