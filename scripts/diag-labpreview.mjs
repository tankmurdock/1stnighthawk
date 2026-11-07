import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

// find the lab preview section
const info = await p.evaluate(() => {
  const links = Array.from(document.querySelectorAll('a[href^="/lab#"]'));
  return links.map((a) => {
    const r = a.getBoundingClientRect();
    return {
      href: a.getAttribute("href"),
      text: a.innerText.slice(0, 30).replace(/\n/g, " | "),
      w: Math.round(r.width),
      h: Math.round(r.height),
      opacity: getComputedStyle(a.parentElement).opacity,
    };
  });
});
console.log(JSON.stringify(info, null, 1));

// scroll until they're in view and shoot
const labLink = await p.$('a[href^="/lab#"]');
if (labLink) {
  await labLink.scrollIntoViewIfNeeded();
  await p.evaluate(() => window.scrollBy(0, -250));
  await p.waitForTimeout(2000);
  await p.screenshot({ path: ".shots/lab-preview-verify.png" });
}

await b.close();
