import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5173/contact", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);

const result = await p.evaluate(async () => {
  const mod = await import("/src/lib/emailjs.ts");
  const data = {
    name: "Dana Reyes",
    email: "dana@acme.co",
    budget: "$10k – $25k",
    message: "We need a storefront rebuild before Q1.\nHard launch date.",
  };
  const url = mod.buildFallbackMailto("1stnighthawkllc@gmail.com", data);

  // decode it so we can assert the content survived
  const [head, query] = url.split("?");
  const params = new URLSearchParams(query);

  return {
    head,
    subject: params.get("subject"),
    body: params.get("body"),
    encodedLength: url.length,
    isValidScheme: url.startsWith("mailto:1stnighthawkllc@gmail.com?"),
  };
});

console.log(JSON.stringify(result, null, 1));

await b.close();
