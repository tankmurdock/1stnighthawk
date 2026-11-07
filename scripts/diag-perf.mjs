import { chromium } from "playwright";

const b = await chromium.launch();

for (const route of ["/", "/work", "/lab", "/contact"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const loaded = [];
  p.on("request", (r) => {
    const u = r.url();
    if (/three|HawkScene|FluidField|ShaderButton/.test(u)) loaded.push(u.split("/").pop());
  });
  await p.goto("http://localhost:5173" + route, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  console.log(`${route.padEnd(9)} heavy chunks: ${loaded.length ? loaded.join(", ") : "none"}`);
  await p.close();
}

// reduced-motion sanity check
const p = await b.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
await p.screenshot({ path: ".shots/reduced-motion.png" });
const cursorPresent = await p.evaluate(() => !!document.querySelector("[aria-hidden].fixed.z-\\[300\\]"));
console.log("reduced-motion: errors =", errs.length ? errs : "none", "| custom cursor hidden =", !cursorPresent);
await p.close();

await b.close();
