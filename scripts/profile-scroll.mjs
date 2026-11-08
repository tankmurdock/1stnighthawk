import { chromium } from "playwright";

/**
 * CPU-profile the scroll, then aggregate self-time by function so we can see
 * exactly who is burning main-thread time. Guessing at this has already been
 * wrong once.
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

await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(6500);

await cdp.send("Profiler.enable");
await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
await cdp.send("Profiler.start");

for (let i = 0; i < 60; i++) {
  await p.mouse.wheel(0, 20).catch(() => {});
  await p.waitForTimeout(16);
}
await p.waitForTimeout(300);

const { profile } = await cdp.send("Profiler.stop");
await b.close();

// Aggregate self time per function.
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const self = new Map();
const total = profile.samples.length;

for (const id of profile.samples) {
  const n = byId.get(id);
  if (!n) continue;
  const cf = n.callFrame;
  const key = `${cf.functionName || "(anonymous)"}  ${(cf.url || "").split("/").slice(-2).join("/")}:${cf.lineNumber + 1}`;
  self.set(key, (self.get(key) || 0) + 1);
}

const rows = [...self.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 28)
  .map(([k, v]) => ({ fn: k, samples: v, pct: ((v / total) * 100).toFixed(1) }));

console.log(`\nCPU profile during scroll — ${total} samples\n`);
for (const r of rows) {
  console.log(`${String(r.pct).padStart(6)}%  ${String(r.samples).padStart(5)}  ${r.fn}`);
}
