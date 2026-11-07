import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/cs", { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));

// networkidle never settles here because the WebGL canvas renders continuously.
const go = (url) => p.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

await go("http://localhost:5173/work");
await p.waitForTimeout(2800);
await p.screenshot({ path: ".shots/cs/work.png" });

const cards = await p.$$eval('a[href^="/work/"]', (els) =>
  els.map((a) => ({
    href: a.getAttribute("href"),
    title: a.querySelector("h2")?.textContent?.trim(),
    hasImg: !!a.querySelector("img"),
    imgSrc: a.querySelector("img")?.getAttribute("src"),
    badge: a.innerText.match(/CLIENT|CONCEPT/i)?.[0],
  }))
);
console.log("work cards:", JSON.stringify(cards, null, 1));

await go("http://localhost:5173/work/grace-and-gray");
await p.waitForTimeout(2600);
await p.screenshot({ path: ".shots/cs/detail-top.png" });

const detail = await p.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  h2s: Array.from(document.querySelectorAll("h2, p.label")).map((e) => e.textContent?.trim()).slice(0, 14),
  images: Array.from(document.querySelectorAll("main img")).map((i) => ({
    src: i.getAttribute("src"),
    loaded: i.complete && i.naturalWidth > 0,
    w: i.naturalWidth,
  })),
  liveLink: document.querySelector('a[href*="graceandgraymercantile"]')?.getAttribute("href"),
}));
console.log("detail:", JSON.stringify(detail, null, 1));

await p.evaluate(() => window.scrollTo(0, 1000));
await p.waitForTimeout(1400);
await p.screenshot({ path: ".shots/cs/detail-mid.png" });

await p.evaluate(() => window.scrollTo(0, 2100));
await p.waitForTimeout(1400);
await p.screenshot({ path: ".shots/cs/detail-gallery.png" });

console.log("errors:", errs.length ? errs : "none");
await b.close();
