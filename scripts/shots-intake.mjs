import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/intake", { recursive: true });

const b = await chromium.launch();

// Mobile first — this app is built for a hand-held device in a shop.
const ctx = await b.newContext({ ...devices["iPhone 13"] });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));

await p.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(2500);

const info = await p.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.textContent?.trim(),
  body: document.body.innerText.replace(/\n{2,}/g, "\n").slice(0, 600),
  inputs: Array.from(document.querySelectorAll("input, select, textarea")).map((i) => ({
    name: i.getAttribute("name") || i.getAttribute("id") || i.getAttribute("type"),
    type: i.getAttribute("type"),
  })),
}));
console.log("MOBILE /:", JSON.stringify(info, null, 1));
console.log("errors:", errs.length ? errs : "none");

await p.screenshot({ path: ".shots/intake/m-intake.png" });

// inventory page
await p.goto("http://localhost:4321/inventory", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(2000);
await p.screenshot({ path: ".shots/intake/m-inventory.png" });

// data page
await p.goto("http://localhost:4321/data", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(2000);
await p.screenshot({ path: ".shots/intake/m-data.png" });

await ctx.close();

// Desktop view too
const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await d.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 40000 });
await d.waitForTimeout(2500);
await d.screenshot({ path: ".shots/intake/d-intake.png" });
await d.close();

await b.close();
console.log("done");
