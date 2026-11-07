import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "public/work/gg-intake";
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 3 });
const p = await ctx.newPage();

async function seed() {
  await p.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 40000 });
  await p.waitForTimeout(3000);

  const items = [
    {
      bc: "0012345678905",
      name: "Linen camp shirt",
      desc: "Washed oatmeal linen, relaxed fit, shell buttons.",
      price: "68.00",
      qty: "2",
      size: "M",
      color: "Oatmeal",
    },
    {
      bc: "0045891236708",
      name: "Brass hoop earrings",
      desc: "Hand-forged brass hoops, 40mm. Leased vendor consignment.",
      price: "42.00",
      qty: "1",
      size: "",
      color: "Aged brass",
    },
    {
      bc: "0077889900112",
      name: "Ceramic bud vase",
      desc: "Speckled stoneware, matte glaze, made locally.",
      price: "34.00",
      qty: "3",
      size: "",
      color: "Chalk",
    },
  ];

  for (const it of items) {
    const bc = p.locator("input[type='text']").first();
    await bc.fill(it.bc);
    await p.fill("#product-name", it.name);
    await p.fill("#product-description", it.desc);
    await p.fill("#product-price", it.price);
    await p.fill("#product-quantity", it.qty);
    if (it.size) await p.fill("#product-size", it.size);
    if (it.color) await p.fill("#product-color", it.color);
    await p.waitForTimeout(400);

    const save = p.getByRole("button", { name: /save & scan next/i });
    if (await save.count()) {
      await save.first().click();
      await p.waitForTimeout(1400);
    }
  }
}

await seed();

// 1. Intake form, filled and focused on barcode (the hero shot)
await p.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(2500);
const bc = p.locator("input[type='text']").first();
await bc.fill("0045891236708");
await p.fill("#product-name", "Brass hoop earrings");
await p.fill("#product-price", "42.00");
await p.fill("#product-quantity", "1");
await p.waitForTimeout(700);
await p.screenshot({ path: `${OUT}/intake.jpg`, type: "jpeg", quality: 80 });

// 2. Inventory list with real data
await p.goto("http://localhost:4321/inventory", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(2500);
await p.screenshot({ path: `${OUT}/inventory.jpg`, type: "jpeg", quality: 80 });

// 3. Data / export screen
await p.goto("http://localhost:4321/data", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(2200);
await p.screenshot({ path: `${OUT}/data.jpg`, type: "jpeg", quality: 80 });

await ctx.close();

// 4. Desktop — proves it isn't phone-only
const d = await b.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 });
const dp = await d.newPage();
await dp.goto("http://localhost:4321/inventory", { waitUntil: "networkidle", timeout: 40000 });
await dp.waitForTimeout(2500);
await dp.screenshot({ path: `${OUT}/desktop.jpg`, type: "jpeg", quality: 80 });
await d.close();

await b.close();
console.log("done");
