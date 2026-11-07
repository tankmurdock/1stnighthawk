import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

for (const route of ["/", "/work"]) {
  await p.goto("http://localhost:5173" + route, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2500);

  const h1s = await p.evaluate(() =>
    Array.from(document.querySelectorAll("h1")).map((h) => ({
      text: (h.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
      cls: h.className.slice(0, 50),
      visible: h.offsetParent !== null,
      rect: (({ width, height }) => ({ w: Math.round(width), h: Math.round(height) }))(
        h.getBoundingClientRect()
      ),
      inFooter: !!h.closest("footer"),
      inHeader: !!h.closest("header"),
      parentTag: h.parentElement?.tagName,
    }))
  );
  console.log(`\n${route}`);
  console.log(JSON.stringify(h1s, null, 1));
}

// heading outline on home
await p.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2500);
const outline = await p.evaluate(() =>
  Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
    (h) => `${"  ".repeat(+h.tagName[1] - 1)}h${h.tagName[1]}: ${(h.textContent || "").replace(/\s+/g, " ").trim().slice(0, 44)}`
  )
);
console.log("\nHOME OUTLINE:");
console.log(outline.join("\n"));

await b.close();
