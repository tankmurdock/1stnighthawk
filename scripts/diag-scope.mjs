import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const state = async (label) => {
  await p.mouse.move(300, 400);
  await p.waitForTimeout(500);
  const s = await p.evaluate(() => ({
    htmlClass: document.documentElement.className,
    body: getComputedStyle(document.body).cursor,
    link: (() => {
      const a = document.querySelector("nav a");
      return a ? getComputedStyle(a).cursor : "n/a";
    })(),
  }));
  console.log(label.padEnd(22), JSON.stringify(s));
};

await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
await state("home");

await p.goto("http://localhost:5173/work", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await state("work");

await p.goto("http://localhost:5173/contact", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await state("contact");

await p.goto("http://localhost:5173/lab", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
await state("lab");

// navigate back out via the nav and confirm the class is cleaned up
await p.click('nav a[href="/"]');
await p.waitForTimeout(2000);
await state("back to home (SPA)");

// magnetic travel check: how far does the hero CTA move?
const travel = await p.evaluate(() => {
  const btn = document.querySelector("a[href='/work']");
  const wrap = btn?.parentElement;
  if (!wrap) return "not found";
  return { before: getComputedStyle(wrap).transform };
});
console.log("hero CTA wrapper transform before hover:", JSON.stringify(travel));

const cta = await p.$("a[href='/work']");
const box = await cta.boundingBox();
// hover just outside the button — should NOT move it now
await p.mouse.move(box.x + box.width + 60, box.y + box.height / 2);
await p.waitForTimeout(600);
const outside = await p.evaluate(() => {
  const btn = document.querySelector("a[href='/work']");
  return getComputedStyle(btn.parentElement).transform;
});
console.log("transform 60px AWAY from button:", outside);

// hover dead centre — should be ~0 offset
await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await p.waitForTimeout(600);
const centre = await p.evaluate(() => {
  const btn = document.querySelector("a[href='/work']");
  return getComputedStyle(btn.parentElement).transform;
});
console.log("transform at button centre:  ", centre);

// hover the very edge — should be a small pull
await p.mouse.move(box.x + box.width - 3, box.y + box.height / 2);
await p.waitForTimeout(600);
const edge = await p.evaluate(() => {
  const btn = document.querySelector("a[href='/work']");
  return getComputedStyle(btn.parentElement).transform;
});
console.log("transform at button edge:    ", edge);

await b.close();
