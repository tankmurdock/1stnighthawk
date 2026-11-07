import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const errs = [];
p.on("console", (m) => {
  if (m.type() === "error") errs.push(m.text().slice(0, 200));
});
p.on("pageerror", (e) => errs.push("PAGEERROR: " + String(e).slice(0, 200)));

await p.goto("http://localhost:5173/lab", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await p.evaluate(() => window.scrollTo(0, 700));
await p.waitForTimeout(3500);
await p.evaluate(() => window.scrollTo(0, 1500));
await p.waitForTimeout(2500);

const cells = await p.$$eval("[id]", (els) =>
  els
    .filter((e) => e.querySelector("h2"))
    .map((e) => ({
      id: e.id,
      title: e.querySelector("h2")?.textContent,
      canvases: e.querySelectorAll("canvas").length,
      inputs: e.querySelectorAll("input").length,
      height: Math.round(e.getBoundingClientRect().height),
      preview: e.innerText.slice(0, 90).replace(/\n+/g, " | "),
    }))
);

console.log(JSON.stringify(cells, null, 1));
console.log("CONSOLE ERRORS:", errs.length ? errs : "none");

await b.close();
