import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 150)));

// work index
let res = await p.goto("https://www.1stnighthawk.com/work", {
  waitUntil: "domcontentloaded",
  timeout: 45000,
});
await p.waitForTimeout(2600);

const cards = await p.$$eval('a[href^="/work/"]', (els) =>
  els.map((a) => ({
    title: a.querySelector("h2")?.textContent?.trim(),
    badges: Array.from(a.querySelectorAll("span"))
      .filter((s) => /^(Client|Concept|Live|Working prototype)$/i.test(s.textContent?.trim() || ""))
      .map((s) => s.textContent?.trim())
      .join(" + "),
  }))
);
console.log(`/work HTTP ${res.status()}`);
console.log(JSON.stringify(cards, null, 1));

// intake case study
res = await p.goto("https://www.1stnighthawk.com/work/gg-intake", {
  waitUntil: "domcontentloaded",
  timeout: 45000,
});
await p.waitForTimeout(2800);

const detail = await p.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  sections: Array.from(document.querySelectorAll("p.label"))
    .map((e) => e.textContent?.trim())
    .slice(0, 6),
  images: Array.from(document.querySelectorAll("main img")).filter(
    (i) => i.complete && i.naturalWidth > 0
  ).length,
}));
console.log(`/work/gg-intake HTTP ${res.status()}`);
console.log(JSON.stringify(detail, null, 1));

await p.screenshot({ path: ".shots/live-intake.png" });
console.log("errors:", errs.length ? errs : "none");
await b.close();
