import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("public", { recursive: true });

/* Builds a 1200×630 Open Graph card as a standalone page, rather than
   screenshotting the live site — that way the composition is exact and
   none of the site chrome leaks in. */

const html = `<!doctype html>
<html><head><meta charset="utf-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px; overflow:hidden;
    background:#04050a; position:relative;
    font-family:'Bricolage Grotesque',system-ui,sans-serif;
  }
  .mark {
    position:absolute; top:-58px; left:50%; transform:translateX(-50%);
    width:430px; height:430px; object-fit:contain;
    filter:contrast(1.25) saturate(0.62) brightness(0.95);
    -webkit-mask-image:radial-gradient(ellipse 60% 56% at 50% 46%, #000 20%, transparent 76%);
    mask-image:radial-gradient(ellipse 60% 56% at 50% 46%, #000 20%, transparent 76%);
  }
  .sodium-glow {
    position:absolute; left:50%; top:210px; transform:translateX(-50%);
    width:760px; height:420px;
    background:radial-gradient(ellipse, rgba(255,160,58,0.26) 0%, rgba(255,106,44,0.08) 40%, transparent 70%);
    filter:blur(30px);
  }
  .vignette {
    position:absolute; inset:0;
    background:radial-gradient(ellipse 72% 66% at 50% 40%, transparent 26%, rgba(4,5,10,0.72) 70%, #04050a 100%);
  }
  .content {
    position:absolute; inset:0;
    display:flex; flex-direction:column;
    align-items:center; justify-content:flex-end;
    padding:0 64px 54px; text-align:center;
  }
  .brand {
    font-family:'JetBrains Mono',monospace;
    font-size:12px; letter-spacing:0.44em; text-transform:uppercase;
    color:#ffa03a; margin-bottom:20px;
  }
  h1 {
    font-size:74px; font-weight:600; letter-spacing:-0.035em;
    line-height:0.92; color:#f4f1ea;
  }
  h1 .accent { color:#ffa03a; }
  .rule {
    width:66px; height:1px; background:rgba(255,160,58,0.5);
    margin:26px 0 20px;
  }
  .meta {
    font-family:'JetBrains Mono',monospace;
    font-size:11px; letter-spacing:0.26em; text-transform:uppercase;
    color:#6d7c92;
  }
  .grain {
    position:absolute; inset:0; opacity:0.05; mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix type='saturate' values='0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>");
  }
</style></head>
<body>
  <div class="sodium-glow"></div>
  <img class="mark" src="http://localhost:5173/nighthawk.jpeg" alt=""/>
  <div class="vignette"></div>
  <div class="grain"></div>
  <div class="content">
    <div class="brand">1st Nighthawk Innovations</div>
    <h1>Design that holds up<br/>in <span class="accent">the dark.</span></h1>
    <div class="rule"></div>
    <div class="meta">Product design · Front-end engineering · Jacksonville, FL</div>
  </div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: "networkidle" });
await p.waitForTimeout(1600);

await p.screenshot({
  path: "public/og-image.jpg",
  type: "jpeg",
  quality: 90,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});

await b.close();
console.log("wrote public/og-image.jpg");
