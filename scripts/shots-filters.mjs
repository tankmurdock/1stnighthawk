import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/filters", { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5173/work", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);

for (const label of ["All", "SaaS Product", "Editorial", "Interactive"]) {
  // The accessible name now includes the count, e.g. "All 6" — use a prefix match.
  await p.getByRole("button", { name: new RegExp("^" + label + "\\b", "i") }).click();
  await p.waitForTimeout(1300);

  // scroll so the grid is in frame
  const grid = await p.$('a[href^="/work/"]');
  if (grid) await grid.scrollIntoViewIfNeeded();
  await p.evaluate(() => window.scrollBy(0, -180));
  await p.waitForTimeout(900);

  const safe = label.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  await p.screenshot({ path: `.shots/filters/${safe}.png` });
  console.log("shot:", label);
}

await b.close();
