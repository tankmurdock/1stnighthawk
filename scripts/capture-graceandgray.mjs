import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

/* Re-captures the Grace & Gray site at web-appropriate sizes and writes
   JPEGs directly into public/work/grace-and-gray/. PNG screenshots at
   1440px were 1-2MB each, which is unacceptable for a portfolio. */

const OUT = "public/work/grace-and-gray";
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();

async function shot({ name, url, width, height, full = false, dsf = 2 }) {
  const ctx = await b.newContext({
    viewport: { width, height },
    deviceScaleFactor: dsf,
  });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(2600);
  await p.screenshot({
    path: `${OUT}/${name}.jpg`,
    type: "jpeg",
    quality: 78,
    fullPage: full,
  });
  await ctx.close();
  console.log("wrote", name);
}

// Hero — the money shot, 16:10 landscape
await shot({
  name: "hero",
  url: "https://graceandgraymercantile.com",
  width: 1440,
  height: 900,
});

// Mobile — proves the responsive work
await shot({
  name: "mobile",
  url: "https://graceandgraymercantile.com",
  width: 390,
  height: 844,
  dsf: 3,
});

// About page — the story section
await shot({
  name: "about",
  url: "https://graceandgraymercantile.com/about",
  width: 1440,
  height: 900,
});

// Visit page — local SEO / storefront info
await shot({
  name: "visit",
  url: "https://graceandgraymercantile.com/visit",
  width: 1440,
  height: 900,
});

await b.close();
console.log("done");
