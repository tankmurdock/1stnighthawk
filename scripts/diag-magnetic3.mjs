import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

// The hero CTA specifically — there are two /work links (nav + hero).
const cta = p.getByRole("link", { name: /see the work/i });
console.log("hero CTA count:", await cta.count());

const read = () =>
  p.evaluate(() => {
    const link = Array.from(document.querySelectorAll("a")).find((a) =>
      /see the work/i.test(a.textContent || "")
    );
    if (!link) return "CTA not found";
    let el = link;
    while (el && el !== document.body) {
      const t = el.style.transform;
      if (t) {
        const m = new DOMMatrix(t);
        return { tag: el.tagName, x: +m.m41.toFixed(2), y: +m.m42.toFixed(2) };
      }
      el = el.parentElement;
    }
    return { tag: "none", x: 0, y: 0 };
  });

const box = await cta.first().boundingBox();
const cy = box.y + box.height / 2;

const probes = [
  ["200px away (left)", box.x - 200],
  ["60px away (left)", box.x - 60],
  ["edge -20px inside", box.x + box.width - 20],
  ["dead centre", box.x + box.width / 2],
  ["just outside right", box.x + box.width + 6],
];

for (const [label, x] of probes) {
  await p.mouse.move(x, cy);
  await p.waitForTimeout(500);
  console.log(label.padEnd(22), JSON.stringify(await read()));
}

await b.close();
