import { chromium } from "playwright";
import { spawn } from "node:child_process";

/* Verifies the SPA rewrite behaves like Vercel will: direct loads of deep
   links must return 200 and render the real page, not a 404. */

const PORT = 4173;
const preview = spawn("npx", ["vite", "preview", "--port", String(PORT)], {
  cwd: process.cwd(),
  shell: true,
  stdio: "ignore",
});

await new Promise((r) => setTimeout(r, 4000));

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const failed = [];
p.on("response", (r) => {
  if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
});

const routes = ["/", "/work", "/work/vantage", "/lab", "/contact", "/nope-does-not-exist"];

for (const route of routes) {
  const res = await p.goto(`http://localhost:${PORT}${route}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await p.waitForTimeout(1400);
  const h1 = await p.evaluate(
    () => document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() || "(none)"
  );
  console.log(`${route.padEnd(24)} HTTP ${res.status()}  h1="${h1.slice(0, 46)}"`);
}

console.log("failed requests:", failed.length ? failed.slice(0, 5) : "none");
await b.close();
preview.kill();
process.exit(0);
