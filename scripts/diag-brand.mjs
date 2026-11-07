import { chromium } from "playwright";

const b = await chromium.launch();
const routes = ["/", "/work", "/work/vantage", "/lab", "/contact"];

for (const route of routes) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:5173" + route, { waitUntil: "networkidle" });
  await p.waitForTimeout(1800);

  const data = await p.evaluate(() => {
    const brandNodes = Array.from(document.querySelectorAll("header, footer, h1, h2, p, span, a"))
      .filter((el) => /nighthawk/i.test(el.textContent || ""))
      // keep only the innermost matches to avoid duplicates from wrappers
      .filter((el) => !Array.from(el.children).some((c) => /nighthawk/i.test(c.textContent || "")))
      .map((el) => el.textContent.replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 0 && t.length < 80);

    return {
      title: document.title,
      brandText: [...new Set(brandNodes)],
      imgs: Array.from(document.querySelectorAll("img")).map((i) => i.alt).filter(Boolean),
    };
  });

  console.log(`\n=== ${route} ===`);
  console.log("title:", data.title);
  console.log("brand text:", JSON.stringify(data.brandText));
  console.log("img alts:", JSON.stringify(data.imgs));
  await p.close();
}

// mobile menu open
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(1800);
await p.click('button[aria-label="Open menu"]');
await p.waitForTimeout(900);
const menu = await p.evaluate(() => {
  const overlay = document.querySelector('div[class*="z-\\[190\\]"]');
  return overlay ? overlay.innerText.replace(/\n+/g, " | ") : "not found";
});
console.log("\n=== mobile menu overlay ===");
console.log(menu);
await p.screenshot({ path: ".shots/nav/mobile-menu.png" });
await p.close();

await b.close();
