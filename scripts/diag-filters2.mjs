import { chromium, devices } from "playwright";

const b = await chromium.launch();

// 1. Do the badge counts match reality for every filter?
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto("http://localhost:5173/work", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);

const labels = ["All", "Brand & Web", "SaaS Product", "Editorial", "Mobile App", "Design System", "Interactive"];
let ok = true;

for (const label of labels) {
  const btn = p.getByRole("button", { name: new RegExp("^" + label + "\\b", "i") });
  const raw = (await btn.innerText()).trim();
  const badge = (raw.match(/\d+$/) || [""])[0];
  await btn.click();
  await p.waitForTimeout(1000);
  const cards = await p.$$eval('a[href^="/work/"]', (a) => a.length);
  const match = String(cards) === badge;
  if (!match) ok = false;
  console.log(`${label.padEnd(15)} badge=${badge}  rendered=${cards}  ${match ? "OK" : "MISMATCH"}`);
}
console.log("counts consistent:", ok);

// 2. Mobile: solo layout should stack, not leave a hole
const ctx = await b.newContext({ ...devices["iPhone 13"] });
const m = await ctx.newPage();
await m.goto("http://localhost:5173/work", { waitUntil: "networkidle" });
await m.waitForTimeout(1500);
await m.getByRole("button", { name: /^Editorial\b/i }).click();
await m.waitForTimeout(1200);
const card = await m.$('a[href^="/work/"]');
if (card) await card.scrollIntoViewIfNeeded();
await m.waitForTimeout(800);
await m.screenshot({ path: ".shots/filters/mobile-editorial.png" });

const mobileLayout = await m.evaluate(() => {
  const a = document.querySelector('a[href^="/work/"]');
  if (!a) return "no card";
  const r = a.getBoundingClientRect();
  const cs = getComputedStyle(a);
  return {
    display: cs.display,
    cols: cs.gridTemplateColumns,
    width: Math.round(r.width),
    height: Math.round(r.height),
    viewportW: window.innerWidth,
  };
});
console.log("mobile solo card:", JSON.stringify(mobileLayout));

await ctx.close();
await b.close();
