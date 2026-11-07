import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/nav", { recursive: true });
const b = await chromium.launch();

const sizes = [
  ["mobile-390", 390, 844],
  ["sm-640", 640, 800],
  ["md-768", 768, 800],
  ["desktop-1440", 1440, 900],
];

for (const [name, w, h] of sizes) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);

  const info = await p.evaluate(() => {
    const link = document.querySelector('header a[aria-label*="home"]');
    if (!link) return { found: false };
    const r = link.getBoundingClientRect();
    const text = link.innerText.replace(/\s+/g, " ").trim();
    // does it overlap the nav or the burger/CTA?
    const nav = document.querySelector("header nav");
    const navRect = nav ? nav.getBoundingClientRect() : null;
    const overlapsNav = navRect ? r.right > navRect.left : false;
    const overflow = r.right > window.innerWidth;
    return {
      text,
      width: Math.round(r.width),
      right: Math.round(r.right),
      overlapsNav,
      overflow,
      viewport: window.innerWidth,
    };
  });

  console.log(
    `${name.padEnd(13)} ${JSON.stringify(info)}`
  );

  // crop the header
  await p.screenshot({
    path: `.shots/nav/${name}.png`,
    clip: { x: 0, y: 0, width: w, height: 90 },
  });
  await p.close();
}

// phone at narrowest realistic width to stress the lockup
const p2 = await b.newPage({ viewport: { width: 320, height: 700 } });
await p2.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p2.waitForTimeout(2000);
await p2.screenshot({ path: ".shots/nav/mobile-320.png", clip: { x: 0, y: 0, width: 320, height: 90 } });
const w320 = await p2.evaluate(() => {
  const l = document.querySelector('header a[aria-label*="home"]');
  const r = l.getBoundingClientRect();
  return { text: l.innerText.replace(/\s+/g, " ").trim(), right: Math.round(r.right), vw: window.innerWidth };
});
console.log("mobile-320    " + JSON.stringify(w320));
await p2.close();

await b.close();
