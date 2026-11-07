import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

// Move over empty space, then over a button, and read the computed cursor.
await p.mouse.move(200, 400);
await p.waitForTimeout(400);
const overBody = await p.evaluate(() => ({
  htmlClass: document.documentElement.className,
  bodyCursor: getComputedStyle(document.body).cursor,
  anchorCursor: getComputedStyle(document.querySelector("nav a")).cursor,
  inputCursor: (() => {
    const el = document.querySelector('input[type="text"], textarea');
    return el ? getComputedStyle(el).cursor : "n/a (not on this page)";
  })(),
}));
console.log("after 2.5s:", JSON.stringify(overBody, null, 1));

// screenshot with cursor hovering a CTA so we can see the ring
const cta = await p.$("a[href='/work']");
if (cta) {
  const box = await cta.boundingBox();
  await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await p.waitForTimeout(700);
  await p.screenshot({ path: ".shots/cursor-over-cta.png", clip: { x: 880, y: 700, width: 560, height: 200 } });
}

// and over empty space
await p.mouse.move(720, 300);
await p.waitForTimeout(700);
await p.screenshot({ path: ".shots/cursor-over-body.png", clip: { x: 520, y: 160, width: 400, height: 280 } });

// check the contact page keeps a text caret
await p.goto("http://localhost:5173/contact", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
const contact = await p.evaluate(() => {
  const input = document.querySelector("input#your-name");
  const ta = document.querySelector("textarea");
  return {
    htmlClass: document.documentElement.className,
    input: input ? getComputedStyle(input).cursor : "not found",
    textarea: ta ? getComputedStyle(ta).cursor : "not found",
  };
});
console.log("contact form:", JSON.stringify(contact));

await b.close();
