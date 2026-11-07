import { chromium } from "playwright";

const b = await chromium.launch();
const routes = ["/", "/work", "/work/grace-and-gray", "/work/gg-intake", "/lab", "/contact", "/nope"];

console.log("═══ ACCESSIBILITY & STRUCTURE ═══\n");

for (const route of routes) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:5173" + route, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2200);

  const audit = await p.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img"));
    const noAlt = imgs.filter((i) => i.getAttribute("alt") === null).length;

    const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4")).map((h) => ({
      level: +h.tagName[1],
      text: (h.textContent || "").trim().slice(0, 40),
    }));

    // heading order check
    let skipped = [];
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level - headings[i - 1].level > 1) {
        skipped.push(`h${headings[i - 1].level} -> h${headings[i].level}`);
      }
    }

    const buttons = Array.from(document.querySelectorAll("button"));
    const namelessButtons = buttons.filter(
      (btn) => !(btn.textContent || "").trim() && !btn.getAttribute("aria-label") && !btn.getAttribute("title")
    ).length;

    const links = Array.from(document.querySelectorAll("a"));
    const namelessLinks = links.filter((a) => {
      const t = (a.textContent || "").trim();
      return !t && !a.getAttribute("aria-label");
    }).length;

    const inputs = Array.from(document.querySelectorAll("input, textarea, select"));
    const unlabeled = inputs.filter((i) => {
      if (i.type === "hidden") return false;
      const id = i.getAttribute("id");
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      return !hasLabel && !i.getAttribute("aria-label") && !i.getAttribute("aria-labelledby");
    }).length;

    return {
      h1Count: document.querySelectorAll("h1").length,
      h1Text: document.querySelector("h1")?.textContent?.trim().slice(0, 50),
      headings: headings.length,
      skipped,
      imgs: imgs.length,
      noAlt,
      namelessButtons,
      namelessLinks,
      unlabeled,
      lang: document.documentElement.lang,
      title: document.title.slice(0, 60),
      jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
    };
  });

  console.log(`\n${route}`);
  console.log(`  title: ${audit.title}`);
  console.log(`  h1: ${audit.h1Count} (${audit.h1Text || "none"})  headings: ${audit.headings}`);
  console.log(`  skipped levels: ${audit.skipped.length ? audit.skipped.join(", ") : "none"}`);
  console.log(`  imgs: ${audit.imgs} (missing alt: ${audit.noAlt})`);
  console.log(`  nameless buttons: ${audit.namelessButtons}  nameless links: ${audit.namelessLinks}`);
  console.log(`  unlabeled inputs: ${audit.unlabeled}`);
  console.log(`  lang: ${audit.lang}  JSON-LD blocks: ${audit.jsonLd}`);

  await p.close();
}

await b.close();
