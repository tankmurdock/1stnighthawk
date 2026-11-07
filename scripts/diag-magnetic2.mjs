import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

// 1. Does the wrapper element even exist, and what is it?
const tree = await p.evaluate(() => {
  const btn = document.querySelector("a[href='/work']");
  const chain = [];
  let el = btn;
  for (let i = 0; i < 4 && el; i++) {
    chain.push({
      tag: el.tagName,
      cls: (el.className || "").toString().slice(0, 60),
      inlineTransform: el.style.transform || "(none set inline)",
      computed: getComputedStyle(el).transform,
      rect: (({ x, y, width, height }) => ({
        x: Math.round(x),
        y: Math.round(y),
        w: Math.round(width),
        h: Math.round(height),
      }))(el.getBoundingClientRect()),
    });
    el = el.parentElement;
  }
  return chain;
});
console.log("DOM chain from CTA upward:");
console.log(JSON.stringify(tree, null, 1));

// 2. Do the media queries Magnetic bails on match?
const mq = await p.evaluate(() => ({
  coarse: window.matchMedia("(pointer: coarse)").matches,
  fine: window.matchMedia("(pointer: fine)").matches,
  reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  hasPointerEvent: typeof PointerEvent !== "undefined",
}));
console.log("media queries:", JSON.stringify(mq));

// 3. Fire a synthetic pointermove right on the button and see if anything reacts
const box = await (await p.$("a[href='/work']")).boundingBox();
await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await p.waitForTimeout(400);
await p.mouse.move(box.x + box.width - 4, box.y + box.height / 2);
await p.waitForTimeout(600);

const after = await p.evaluate(() => {
  const btn = document.querySelector("a[href='/work']");
  const parent = btn.parentElement;
  return {
    parentInline: parent.style.transform || "(none)",
    parentComputed: getComputedStyle(parent).transform,
  };
});
console.log("after pointermove on button:", JSON.stringify(after));

await b.close();
