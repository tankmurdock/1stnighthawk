import { chromium, devices } from "playwright";

const b = await chromium.launch();

// Touch phone — should get the native cursor and no ring at all.
const touch = await b.newContext({ ...devices["iPhone 13"] });
const tp = await touch.newPage();
await tp.goto("http://localhost:5173/lab", { waitUntil: "networkidle" });
await tp.waitForTimeout(2500);

const touchState = await tp.evaluate(() => {
  const marked = document.documentElement.classList.contains("cursor-lab");
  // the cursor root is the aria-hidden fixed layer at z-300
  const nodes = Array.from(document.querySelectorAll("div[aria-hidden]"));
  const hasRing = nodes.some((n) => getComputedStyle(n).zIndex === "300");
  return {
    htmlClass: document.documentElement.className,
    labClassApplied: marked,
    ringMounted: hasRing,
    coarse: window.matchMedia("(pointer: coarse)").matches,
    bodyCursor: getComputedStyle(document.body).cursor,
  };
});
console.log("iPhone 13  /lab:", JSON.stringify(touchState));
await touch.close();

// Desktop — ring should be present and native arrow hidden.
const desk = await b.newContext({ viewport: { width: 1440, height: 900 } });
const dp = await desk.newPage();
await dp.goto("http://localhost:5173/lab", { waitUntil: "networkidle" });
await dp.waitForTimeout(2500);
const deskState = await dp.evaluate(() => {
  const nodes = Array.from(document.querySelectorAll("div[aria-hidden]"));
  return {
    labClassApplied: document.documentElement.classList.contains("cursor-lab"),
    ringMounted: nodes.some((n) => getComputedStyle(n).zIndex === "300"),
    bodyCursor: getComputedStyle(document.body).cursor,
  };
});
console.log("desktop    /lab:", JSON.stringify(deskState));
await desk.close();

await b.close();
