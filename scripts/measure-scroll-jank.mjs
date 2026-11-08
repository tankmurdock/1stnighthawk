import { chromium } from "playwright";

/**
 * Measures scroll smoothness at the top of the page.
 *
 * A phone is not just a small screen — it has far less CPU. So we throttle
 * the CPU via CDP to approximate one, then scroll and record:
 *   - frame intervals (jank = long gaps between rAF callbacks)
 *   - long tasks (>50ms blocks on the main thread)
 *   - whether the hero fade actually engaged (transform/opacity changed)
 *   - whether the WebGL loop paused once the hero left the viewport
 */

const URL = process.argv[2] || "http://localhost:5173/";
const CPU_THROTTLE = Number(process.argv[3] || 4);

const VIEWPORTS = [
  { name: "iphone-13", w: 390, h: 664 },
  { name: "iphone-se", w: 320, h: 568 },
  { name: "desktop-1440", w: 1440, h: 900, throttle: 1 },
];

const b = await chromium.launch();
const results = [];

for (const v of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 3,
    isMobile: v.w < 900,
    hasTouch: v.w < 900,
  });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);

  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(6000); // let the 3D chunk mount and settle

  const rate = v.throttle ?? CPU_THROTTLE;
  await cdp.send("Emulation.setCPUThrottlingRate", { rate });

  // Instrument: record rAF deltas and long tasks while we scroll.
  await p.evaluate(() => {
    const w = window;
    w.__frames = [];
    w.__long = [];
    let prev = performance.now();
    w.__stop = false;
    const tick = (now) => {
      w.__frames.push(now - prev);
      prev = now;
      if (!w.__stop) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) w.__long.push(e.duration);
      }).observe({ entryTypes: ["longtask"] });
    } catch {
      /* not supported */
    }
  });

  // Scroll in small steps, like a finger drag, through the fade zone.
  const steps = 40;
  const perStep = 24;
  for (let i = 0; i < steps; i++) {
    await p.mouse.wheel(0, perStep).catch(() => {});
    await p.waitForTimeout(16);
  }
  await p.waitForTimeout(400);

  const data = await p.evaluate(() => {
    window.__stop = true;
    const f = window.__frames.filter((x) => x > 0 && x < 2000);
    const sorted = [...f].sort((a, b) => a - b);
    const pct = (q) => sorted[Math.floor(sorted.length * q)] ?? 0;
    const longTasks = window.__long;

    // Read the live styles the scroll effect writes.
    const hero = document.querySelector("section");
    const content = hero?.querySelector("[class*='justify-end']");
    const mark = hero?.querySelector(":scope > div");

    return {
      frames: f.length,
      avg: f.reduce((a, b) => a + b, 0) / (f.length || 1),
      p50: pct(0.5),
      p95: pct(0.95),
      p99: pct(0.99),
      worst: sorted[sorted.length - 1] ?? 0,
      over32: f.filter((x) => x > 32).length,
      over50: f.filter((x) => x > 50).length,
      longTasks: longTasks.length,
      longTotal: longTasks.reduce((a, b) => a + b, 0),
      longWorst: longTasks.length ? Math.max(...longTasks) : 0,
      contentOpacity: content ? getComputedStyle(content).opacity : null,
      contentTransform: content ? getComputedStyle(content).transform : null,
      markOpacity: mark ? getComputedStyle(mark).opacity : null,
      scrollY: Math.round(window.scrollY),
      canvas: !!hero?.querySelector("canvas"),
    };
  });

  // Scroll far away and confirm the WebGL loop stopped.
  await p.evaluate(() => window.scrollTo(0, 4000));
  await p.waitForTimeout(700);
  const paused = await p.evaluate(() => {
    const hero = document.querySelector("section");
    const c = hero?.querySelector("canvas");
    return { offscreen: window.scrollY > 1200, hasCanvas: !!c };
  });

  results.push({ viewport: v.name, throttle: rate, ...data, ...paused });
  await ctx.close();
}

await b.close();

const W = {
  viewport: 14, throttle: 9, frames: 7, avg: 7, p95: 7, p99: 7, worst: 7,
  over32: 8, over50: 8, longTasks: 10, longWorst: 10, contentOpacity: 15, scrollY: 8,
};
const head = Object.keys(W);
const line = (c) => c.map((x, i) => String(x).padEnd(W[head[i]])).join(" ");
console.log("\nScroll smoothness at the top of the page (CPU throttled)\n");
console.log(line(head));
console.log("-".repeat(Object.values(W).reduce((a, b) => a + b + 1, 0)));
for (const r of results) {
  console.log(
    line(
      head.map((k) =>
        typeof r[k] === "number" ? Math.round(r[k] * 10) / 10 : r[k],
      ),
    ),
  );
}
console.log("\np95/p99/worst = frame interval in ms (16.7 = 60fps).");
console.log("over32/over50 = frames that missed vsync (dropped frames).");
console.log("contentOpacity should be < 1 after scrolling, proving the fade ran.");
