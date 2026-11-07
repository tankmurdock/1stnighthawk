import { chromium } from "playwright";

/* Verifies the LIVE production contact form actually delivers.
   Uses a real EmailJS request — check 1stnighthawkllc@gmail.com after. */

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));

const emailjs = [];
p.on("response", async (r) => {
  if (r.url().includes("api.emailjs.com")) {
    let body = "";
    try {
      body = (await r.text()).slice(0, 200);
    } catch {}
    emailjs.push({ status: r.status(), body });
  }
});

await p.goto("https://www.1stnighthawk.com/contact", {
  waitUntil: "domcontentloaded",
  timeout: 45000,
});
await p.waitForTimeout(3000);

const configured = await p.evaluate(async () => {
  const mod = await import("/assets/" + "").catch(() => null);
  // simpler: read the success/failure path by checking the DOM later
  return "checked-via-submit";
});

await p.fill("#your-name", "Production Delivery Test");
await p.fill("#email", "delivered@resend.dev");
await p.getByRole("button", { name: /^\$10k/i }).click();
await p.fill(
  "#message",
  "Automated production verification of the live contact form at www.1stnighthawk.com. Confirms EmailJS delivery is working in the deployed build."
);
await p.waitForTimeout(300);

await p.getByRole("button", { name: /send message/i }).click();

let outcome = "pending";
for (let i = 0; i < 35; i++) {
  await p.waitForTimeout(1000);
  outcome = await p.evaluate(() => {
    if (document.body.innerText.includes("Message sent")) return "sent";
    if (document.querySelector(".border-sodium\\/25")) return "failed";
    return "pending";
  });
  if (outcome !== "pending") break;
}

console.log("PRODUCTION outcome:", outcome);
console.log("emailjs calls:", JSON.stringify(emailjs, null, 1));
console.log("page errors:", errs.length ? errs : "none");

// also confirm the Grace & Gray case study is live
await p.goto("https://www.1stnighthawk.com/work/grace-and-gray", {
  waitUntil: "domcontentloaded",
  timeout: 45000,
});
await p.waitForTimeout(2500);
const cs = await p.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  images: document.querySelectorAll("main img").length,
  badges: document.body.innerText.includes("CLIENT WORK"),
}));
console.log("case study live:", JSON.stringify(cs));

await b.close();
