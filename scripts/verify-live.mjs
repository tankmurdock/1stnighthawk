import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const failed = [];
p.on("response", (r) => {
  if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
});

await p.goto("https://www.1stnighthawk.com/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(5000);

const info = await p.evaluate(() => ({
  title: document.title,
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
  canvas: !!document.querySelector("canvas"),
  h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
  navName: document.querySelector('header a[aria-label*="home"]')?.textContent?.replace(/\s+/g, " ").trim(),
}));
console.log(JSON.stringify(info, null, 1));
console.log("failed requests:", failed.length ? failed.slice(0, 6) : "none");

await p.screenshot({ path: ".shots/live-home.png" });

// also check the routes exist
for (const route of ["/work", "/lab", "/contact", "/work/vantage"]) {
  const r = await p.goto("https://www.1stnighthawk.com" + route, { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(1200);
  const t = await p.title();
  console.log(`${route.padEnd(15)} HTTP ${r.status()}  "${t}"`);
}

await b.close();
