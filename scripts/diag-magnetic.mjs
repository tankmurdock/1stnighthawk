import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

const btn = await p.$("a[href='/work']");

/** Read the translate applied by Magnetic, walking up the tree. */
const read = () =>
  p.evaluate(() => {
    const btn = document.querySelector("a[href='/work']");
    let el = btn;
    while (el && el !== document.body) {
      const t = getComputedStyle(el).transform;
      if (t && t !== "none" && t.startsWith("matrix")) {
        const m = new DOMMatrix(t);
        return {
          tag: el.tagName,
          cls: (el.className || "").toString().slice(0, 40),
          x: +m.m41.toFixed(2),
          y: +m.m42.toFixed(2),
        };
      }
      el = el.parentElement;
    }
    return null;
  });

const box = await btn.boundingBox();
const cy = box.y + box.height / 2;
const cx = box.x + box.width / 2;

for (const [label, x] of [
  ["200px away", box.x - 200],
  ["60px away", box.x - 60],
  ["just inside left", box.x + 2],
  ["dead centre", cx],
  ["just inside right", box.x + box.width - 2],
]) {
  await p.mouse.move(x, cy);
  await p.waitForTimeout(500);
  console.log(label.padEnd(18), JSON.stringify(await read()));
}

await b.close();
