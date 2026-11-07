// Screenshot harness — verifies the real rendered output at several
// viewports and scroll positions. Run with: node scripts/shots.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:5173";
const OUT = process.env.OUT || ".shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shoot(name, { path = "/", w = 1440, h = 900, scroll = 0, wait = 2200, full = false } = {}) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(wait);

  if (scroll > 0) {
    await page.evaluate((y) => {
      window.scrollTo(0, y);
      // nudge Lenis if it's listening
      window.dispatchEvent(new Event("scroll"));
    }, scroll);
    await page.waitForTimeout(1200);
  }

  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log(`${name}: ok${errors.length ? `  ⚠ ${errors.length} console errors` : ""}`);
  if (errors.length) errors.slice(0, 6).forEach((e) => console.log("   · " + e.slice(0, 200)));
  await page.close();
}

const which = process.argv[2] || "all";

if (which === "all" || which === "hero") {
  await shoot("01-hero", { wait: 3500 });
  await shoot("02-position", { scroll: 950, wait: 3000 });
}

if (which === "all" || which === "home") {
  await shoot("03-capabilities", { scroll: 2000, wait: 2500 });
  await shoot("04-work", { scroll: 3100, wait: 2500 });
  await shoot("05-lab-preview", { scroll: 4300, wait: 2500 });
}

if (which === "all" || which === "work") {
  await shoot("06-work-index", { path: "/work", wait: 2500 });
  await shoot("07-work-detail", { path: "/work/vantage", wait: 2500 });
}

if (which === "all" || which === "lab") {
  await shoot("08-lab", { path: "/lab", wait: 3500 });
  await shoot("09-lab-lower", { path: "/lab", scroll: 900, wait: 3500 });
}

if (which === "all" || which === "contact") {
  await shoot("10-contact", { path: "/contact", wait: 2200 });
}

if (which === "all" || which === "mobile") {
  await shoot("11-mobile-hero", { w: 390, h: 844, wait: 3200 });
  await shoot("12-mobile-work", { path: "/work", w: 390, h: 844, wait: 2200 });
  await shoot("13-mobile-lab", { path: "/lab", w: 390, h: 844, wait: 3000 });
}

await browser.close();
console.log("done");
