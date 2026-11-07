import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/intake", { recursive: true });

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 3 });
const p = await ctx.newPage();

await p.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(3200);

// BarcodeField renders its own control — find the visible text input near "Barcode".
const barcode = p.locator("input[type='text']").first();
await barcode.waitFor({ timeout: 20000 });
await barcode.fill("0012345678905");

await p.fill("#product-name", "Linen camp shirt");
await p.fill(
  "#product-description",
  "Washed oatmeal linen, relaxed fit, shell buttons. One of two in stock."
);
await p.fill("#product-price", "68.00");
await p.fill("#product-quantity", "2");
await p.fill("#product-size", "M");
await p.fill("#product-color", "Oatmeal");
await p.waitForTimeout(700);

await p.screenshot({ path: ".shots/intake/m-filled-top.png" });

await p.evaluate(() => window.scrollTo(0, 620));
await p.waitForTimeout(900);
await p.screenshot({ path: ".shots/intake/m-filled-mid.png" });

await p.evaluate(() => window.scrollTo(0, 1200));
await p.waitForTimeout(900);
await p.screenshot({ path: ".shots/intake/m-filled-low.png" });

// Save it, then view the inventory list with real data.
const save = p.getByRole("button", { name: /save & scan next/i });
if (await save.count()) {
  await save.first().click();
  await p.waitForTimeout(2000);
}

await p.goto("http://localhost:4321/inventory", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(2500);
await p.screenshot({ path: ".shots/intake/m-inventory-filled.png" });

const inv = await p.evaluate(() =>
  document.body.innerText.replace(/\n{2,}/g, "\n").slice(0, 600)
);
console.log("inventory:", inv);

await b.close();
console.log("done");
