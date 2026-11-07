import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 150)));

await p.goto("http://localhost:5173/work", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2800);
await p.screenshot({ path: ".shots/w-work.png" });

const cards = await p.$$eval('a[href^="/work/"]', (els) =>
  els.map((a) => ({
    title: a.querySelector("h2")?.textContent?.trim(),
    badges: (a.innerText.match(/CLIENT|CONCEPT|LIVE|WORKING PROTOTYPE/g) || []).join("+"),
    img: !!a.querySelector("img"),
  }))
);
console.log("cards:", JSON.stringify(cards, null, 1));

await p.goto("http://localhost:5173/work/gg-intake", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2600);
await p.screenshot({ path: ".shots/w-intake-top.png" });

const detail = await p.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  badges: (document.body.innerText.match(/CLIENT WORK|WORKING PROTOTYPE/g) || []).join(" + "),
  sections: Array.from(document.querySelectorAll("p.label"))
    .map((e) => e.textContent?.trim())
    .slice(0, 10),
  images: Array.from(document.querySelectorAll("main img")).map((i) => ({
    src: i.getAttribute("src"),
    loaded: i.complete && i.naturalWidth > 0,
  })),
}));
console.log("detail:", JSON.stringify(detail, null, 1));

await p.evaluate(() => window.scrollTo(0, 1100));
await p.waitForTimeout(1400);
await p.screenshot({ path: ".shots/w-intake-mid.png" });

console.log("errors:", errs.length ? errs : "none");
await b.close();
