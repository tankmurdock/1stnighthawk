import { chromium } from "playwright";

/**
 * Measures main-thread work during scroll, which is the thing the fix
 * actually changes and which is valid even without a GPU.
 *
 * Headless Chromium renders WebGL in software, so frame-interval numbers are
 * meaningless here. Script duration is not: if the hero re-renders React 60x
 * a second, script time during a scroll is dominated by reconciliation. If it
 * writes styles directly, script time should be a rounding error.
 */

const URL = process.argv[2] || "http://localhost:5173/";

const VIEWPORTS = [
  { name: "iphone-13", w: 390, h: 664 },
  { name: "desktop-1440", w: 1440, h: 900 },
];

const b = await chromium.launch();
const rows = [];

const readMetrics = async (cdp) => {
  const { metrics } = await cdp.send("Performance.getMetrics");
  return Object.fromEntries(metrics.map((m) => [m.name, m.value]));
};

for (const v of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 2,
    isMobile: v.w < 900,
    hasTouch: v.w < 900,
  });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);

  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(6500); // scene mounted and idle
  await cdp.send("Performance.enable");

  // Baseline: sit still for the same wall-clock time as the scroll.
  const idleA = await readMetrics(cdp);
  await p.waitForTimeout(1400);
  const idleB = await readMetrics(cdp);

  // Now scroll through the fade zone.
  const scrollA = await readMetrics(cdp);
  for (let i = 0; i < 40; i++) {
    await p.mouse.wheel(0, 24).catch(() => {});
    await p.waitForTimeout(16);
  }
  await p.waitForTimeout(400);
  const scrollB = await readMetrics(cdp);

  // Count style mutations on the hero to prove the fade is DOM-driven.
  const mutated = await p.evaluate(async () => {
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
    const hero = document.querySelector("section");
    const targets = [
      hero.querySelector("[class*='justify-end']"),
      hero.querySelector(":scope > div"),
    ].filter(Boolean);
    let count = 0;
    const mo = new MutationObserver((recs) => {
      for (const r of recs) {
        if (r.type === "attributes" && r.attributeName === "style") count++;
      }
    });
    targets.forEach((t) =>
      mo.observe(t, { attributes: true, attributeFilter: ["style"] }),
    );
    for (let i = 1; i <= 12; i++) {
      window.scrollTo(0, i * 30);
      await new Promise((r) => requestAnimationFrame(r));
    }
    await new Promise((r) => setTimeout(r, 200));
    mo.disconnect();
    return count;
  });

  const d = (a, b, k) => Math.round(((b[k] ?? 0) - (a[k] ?? 0)) * 1000);

  rows.push({
    viewport: v.name,
    idleScriptMs: d(idleA, idleB, "ScriptDuration"),
    scrollScriptMs: d(scrollA, scrollB, "ScriptDuration"),
    scrollStyleMs: d(scrollA, scrollB, "RecalcStyleDuration"),
    scrollLayoutMs: d(scrollA, scrollB, "LayoutDuration"),
    styleMutations: mutated,
  });

  await ctx.close();
}

await b.close();

const W = { viewport: 14, idleScriptMs: 14, scrollScriptMs: 16, scrollStyleMs: 16, scrollLayoutMs: 16, styleMutations: 15 };
const head = Object.keys(W);
const line = (c) => c.map((x, i) => String(x).padEnd(W[head[i]])).join(" ");
console.log("\nMain-thread work during a scripted scroll\n");
console.log(line(head));
console.log("-".repeat(Object.values(W).reduce((a, b) => a + b + 1, 0)));
for (const r of rows) console.log(line(head.map((k) => r[k])));
console.log("\nScript ~ idle = scrolling does no React work.");
console.log("styleMutations > 0 = the fade is writing to the DOM directly.");
