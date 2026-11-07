import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 430, height: 932 } });

const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERROR: " + String(e).slice(0, 200)));
p.on("console", (m) => {
  if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200));
});

await p.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(4000);

const dom = await p.evaluate(() => ({
  inputCount: document.querySelectorAll("input").length,
  names: Array.from(document.querySelectorAll("input, textarea, select")).map(
    (i) => `${i.tagName.toLowerCase()}[name=${i.getAttribute("name")}]`
  ),
  firstHeading: document.querySelector("h1")?.textContent?.trim(),
  bodyLen: document.body.innerText.length,
  bodyStart: document.body.innerText.replace(/\n{2,}/g, "\n").slice(0, 400),
  // is the Preact island hydrated? look for our boot gate
  bootGate: !!document.querySelector("[data-boot-gate]"),
  scripts: Array.from(document.querySelectorAll("script[type=module]")).length,
}));

console.log(JSON.stringify(dom, null, 1));
console.log("\nerrors:", errs.length ? errs : "none");
await p.screenshot({ path: ".shots/intake/debug.png" });

await b.close();
