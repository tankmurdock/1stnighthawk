import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto("http://localhost:5173/work", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2600);

// Read only the badge spans, not the whole card's text.
const badges = await p.$$eval('a[href^="/work/"]', (els) =>
  els.map((a) => {
    const title = a.querySelector("h2")?.textContent?.trim();
    const spans = Array.from(a.querySelectorAll("span")).filter((s) =>
      /^(CLIENT|CONCEPT|LIVE|WORKING PROTOTYPE)$/i.test(s.textContent?.trim() || "")
    );
    return { title, badgeSpans: spans.map((s) => s.textContent?.trim()) };
  })
);
console.log(JSON.stringify(badges, null, 1));

await b.close();
