import { chromium } from "playwright";

/**
 * Confirms the WebGL render loop actually stops when the hero leaves the
 * viewport, and resumes when it returns.
 *
 * We count real GL draw calls via a wrapped drawArrays/drawElements, which is
 * the only trustworthy signal — React state alone proves nothing.
 */
const URL = process.argv[2] || "http://localhost:5173/";

const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 390, height: 664 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const p = await ctx.newPage();

await p.addInitScript(() => {
  window.__draws = 0;
  for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
    for (const fn of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]) {
      const orig = proto[fn];
      if (!orig) continue;
      proto[fn] = function (...args) {
        window.__draws++;
        return orig.apply(this, args);
      };
    }
  }
});

await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForFunction(() => !!document.querySelector("section canvas"), { timeout: 20000 });
await p.waitForTimeout(3000);

const sample = async (label) => {
  const a = await p.evaluate(() => window.__draws);
  await p.waitForTimeout(1000);
  const b = await p.evaluate(() => window.__draws);
  return { label, perSecond: b - a };
};

const atTop = await sample("hero visible (at top)");

await p.evaluate(() => window.scrollTo(0, window.innerHeight * 2.5));
await p.waitForTimeout(1200);
const away = await sample("hero off screen");

await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(1200);
const back = await sample("scrolled back to top");

await b.close();

console.log("\nGL draw calls per second:\n");
for (const r of [atTop, away, back]) {
  console.log(`  ${r.label.padEnd(26)} ${r.perSecond}`);
}
console.log(
  `\nHero off screen should be ~0. Hero visible should be high.\n` +
    `Pause working: ${away.perSecond === 0 ? "YES" : "NO — still drawing"}`,
);
