import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));

await p.goto("http://localhost:5173/contact", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2000);

// 1. Did the keys actually inline into the bundle?
const configured = await p.evaluate(async () => {
  const mod = await import("/src/lib/emailjs.ts");
  return mod.isEmailConfigured;
});
console.log("isEmailConfigured:", configured);

// 2. Inspect what the module sees (lengths only — never print key values)
const lens = await p.evaluate(async () => {
  const env = import.meta.env || {};
  const pick = (k) => {
    const v = env[k];
    return v ? `${v.length} chars, starts "${v.slice(0, 4)}…"` : "MISSING";
  };
  return {
    service: pick("VITE_EMAILJS_SERVICE_ID"),
    template: pick("VITE_EMAILJS_TEMPLATE_ID"),
    publicKey: pick("VITE_EMAILJS_PUBLIC_KEY"),
  };
});
console.log("inlined env:", JSON.stringify(lens, null, 1));

console.log("page errors:", errs.length ? errs : "none");
await b.close();
