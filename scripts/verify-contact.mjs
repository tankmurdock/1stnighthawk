import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots/contact", { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });

// capture where the mailto navigation would go, without actually leaving
let mailto = null;
await p.route("mailto:*", async (route) => {
  mailto = route.request().url();
  await route.abort();
});

// block the actual mailto navigation attempt
p.on("framenavigated", () => {});

const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));

await p.goto("http://localhost:5173/contact", { waitUntil: "networkidle" });
await p.waitForTimeout(1800);

// is EmailJS reporting configured?
const configured = await p.evaluate(async () => {
  const mod = await import("/src/lib/emailjs.ts");
  return { configured: mod.isEmailConfigured };
});
console.log("email configured:", JSON.stringify(configured));

// fill and submit
await p.fill("#your-name", "Dana Reyes");
await p.fill("#email", "dana@acme.co");
await p.getByRole("button", { name: /^Not sure yet$/i }).click();
await p.fill("#message", "We need a storefront rebuild before Q1 and we have a hard launch date.");
await p.waitForTimeout(300);

await p.getByRole("button", { name: /send message/i }).click();
await p.waitForTimeout(2500);

const ui = await p.evaluate(() => {
  const banner = document.querySelector(".border-sodium\\/25");
  return {
    bannerShown: !!banner,
    text: banner ? banner.innerText.replace(/\n+/g, " | ").slice(0, 220) : "(none)",
    stillOnForm: !!document.querySelector("#your-name"),
  };
});
console.log("after submit:", JSON.stringify(ui, null, 1));
console.log("mailto fired:", mailto ? mailto.slice(0, 160) + "..." : "(not captured)");
console.log("page errors:", errs.length ? errs : "none");

await p.screenshot({ path: ".shots/contact/fallback.png" });
await b.close();
