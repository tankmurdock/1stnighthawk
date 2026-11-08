import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/copy", { recursive: true });

const VIEWPORTS = [
  { name: "phone-se", w: 320, h: 568 },
  { name: "phone-13", w: 390, h: 664 },
  { name: "phone-15promax", w: 430, h: 739 },
  { name: "phone-landscape", w: 844, h: 390 },
  { name: "phone-13-landscape", w: 664, h: 390 },
  { name: "tablet-portrait", w: 768, h: 1024 },
  { name: "laptop-1280", w: 1280, h: 800 },
  { name: "desktop-1440", w: 1440, h: 900 },
];

const b = await chromium.launch();
const rows = [];

for (const v of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 2,
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
        h: Math.round(b.height),
      };
    };
    const h1 = hero.querySelector("h1");
    const lede = Array.from(hero.querySelectorAll("p")).find((p) =>
      p.textContent.includes("I design interfaces") ||
      p.textContent.includes("handoff"),
    );
    const ctas = Array.from(
      hero.querySelectorAll("a[href='/work'], a[href='/lab']"),
    );
    // line count of the lede
    const cs = lede ? getComputedStyle(lede) : null;
    const lh = cs ? parseFloat(cs.lineHeight) : 0;
    return {
      vh: window.innerHeight,
      h1: rr(h1),
      ledeText: lede?.textContent.trim(),
      lede: rr(lede),
      ledeLines: lede && lh ? Math.round(lede.getBoundingClientRect().height / lh) : null,
      ctas: ctas.map((c) => ({ t: c.textContent.trim(), ...rr(c) })),
      footerRole: document
        .querySelector("footer")
        ?.textContent?.match(/DESIGN ENGINEER[^·]*/i)?.[0] ?? null,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      overflowY: document.documentElement.scrollHeight > window.innerHeight + 1,
    };
  });

  rows.push({
    viewport: v.name,
    ledeLines: m.ledeLines ?? "?",
    ledeH: m.lede ? m.lede.h : "?",
    ctas: m.ctas.map((c) => (c.bottom <= m.vh + 1 ? "ok" : "BELOW")).join("/"),
    ox: m.overflowX ? "OVERFLOW" : "no",
  });

  if (v.name === "phone-se" || v.name === "phone-13") {
    console.log(`\n${v.name} lede: "${m.ledeText}"`);
  }
  await p.screenshot({ path: `.shots/copy/${v.name}.png` });
  await ctx.close();
}

await b.close();

console.log("\n");
const W = { viewport: 20, ledeLines: 11, ledeH: 8, ctas: 8, ox: 10 };
const head = Object.keys(W);
const line = (c) => c.map((x, i) => String(x).padEnd(W[head[i]])).join(" ");
console.log(line(head));
console.log("-".repeat(Object.values(W).reduce((a, b) => a + b + 1, 0)));
for (const r of rows) console.log(line(head.map((k) => r[k])));
