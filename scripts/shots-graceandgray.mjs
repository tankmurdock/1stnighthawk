import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/gag", { recursive: true });

const b = await chromium.launch();

// Desktop full page
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));

await p.goto("https://graceandgraymercantile.com", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(3000);

const info = await p.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.textContent?.trim(),
  nav: Array.from(document.querySelectorAll("header nav a")).map((a) => a.textContent?.trim()),
  hasStore: /shop|cart|checkout/i.test(document.body.innerText),
  bodyStart: document.body.innerText.replace(/\n{2,}/g, "\n").slice(0, 400),
  fonts: getComputedStyle(document.querySelector("h1") || document.body).fontFamily,
}));
console.log(JSON.stringify(info, null, 1));
console.log("errors:", errs.length ? errs : "none");

await p.screenshot({ path: ".shots/gag/desktop-hero.png" });
await p.screenshot({ path: ".shots/gag/desktop-full.png", fullPage: true });

// mobile
const ctx = await b.newContext({ ...devices["iPhone 13"] });
const m = await ctx.newPage();
await m.goto("https://graceandgraymercantile.com", { waitUntil: "networkidle", timeout: 60000 });
await m.waitForTimeout(2500);
await m.screenshot({ path: ".shots/gag/mobile-hero.png" });
await m.screenshot({ path: ".shots/gag/mobile-full.png", fullPage: true });
await ctx.close();

await b.close();
