import { chromium } from "playwright";

/**
 * The first scroll from the top is when the user feels the jitter. The 3D
 * scene is deliberately deferred (requestIdleCallback / rAF), which means its
 * expensive setup — CPU height-field build, PMREM, shader compilation — can
 * land *during* that first scroll.
 *
 * This records long tasks from load onward and timestamps them, so we can see
 * whether anything heavy coincides with the moment of first scroll.
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
const cdp = await ctx.newCDPSession(p);

// Throttle CPU first, before any script runs, so setup costs are phone-like.
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

await p.addInitScript(() => {
  window.__marks = [];
  window.__longs = [];
  window.__t0 = performance.now();
  const mark = (n) => window.__marks.push({ n, t: Math.round(performance.now() - window.__t0) });
  window.__mark = mark;

  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        window.__longs.push({
          start: Math.round(e.startTime),
          dur: Math.round(e.duration),
        });
      }
    }).observe({ entryTypes: ["longtask"] });
  } catch {}
});

await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.evaluate(() => window.__mark("domcontentloaded"));

// Wait for the scene to appear, then scroll immediately (worst case: the
// user scrolls the moment the page looks ready).
await p.waitForFunction(() => !!document.querySelector("section canvas"), {
  timeout: 20000,
});
await p.evaluate(() => window.__mark("canvas-present"));

await p.waitForTimeout(120);
await p.evaluate(() => window.__mark("first-scroll"));
for (let i = 0; i < 40; i++) {
  await p.mouse.wheel(0, 24).catch(() => {});
  await p.waitForTimeout(16);
}
await p.evaluate(() => window.__mark("scroll-done"));
await p.waitForTimeout(1500);

const out = await p.evaluate(() => ({
  marks: window.__marks,
  longs: window.__longs,
  frames: window.__frames,
}));

await b.close();

console.log("\nTimeline (ms from document start), CPU throttled 4x\n");
for (const m of out.marks) console.log(`  ${String(m.t).padStart(6)}ms  ${m.n}`);

const scrollStart = out.marks.find((m) => m.n === "first-scroll")?.t ?? 0;
const scrollEnd = out.marks.find((m) => m.n === "scroll-done")?.t ?? 0;

console.log("\nLong tasks (>50ms) — the ones a user feels as stutter:\n");
if (!out.longs.length) console.log("  none");
for (const l of out.longs) {
  const during =
    l.start >= scrollStart && l.start <= scrollEnd
      ? "  <-- DURING FIRST SCROLL"
      : "";
  console.log(
    `  start ${String(l.start).padStart(6)}ms  dur ${String(l.dur).padStart(5)}ms${during}`,
  );
}

const during = out.longs.filter(
  (l) => l.start >= scrollStart && l.start <= scrollEnd,
);
const totalDuring = during.reduce((a, b) => a + b.dur, 0);
console.log(
  `\nLong tasks overlapping the first scroll: ${during.length} (${totalDuring}ms blocked)`,
);
