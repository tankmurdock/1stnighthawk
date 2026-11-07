import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });

// capture the console error our code logs, and the network response
const logs = [];
p.on("console", (m) => logs.push(`[${m.type()}] ${m.text().slice(0, 500)}`));

const calls = [];
p.on("response", async (r) => {
  const u = r.url();
  if (u.includes("emailjs") || u.includes("api.emailjs")) {
    let body = "";
    try {
      body = (await r.text()).slice(0, 500);
    } catch {
      body = "(unreadable)";
    }
    calls.push({ status: r.status(), url: u, body });
  }
});

await p.goto("http://localhost:5173/contact", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2000);

await p.fill("#your-name", "Nighthawk Form Test");
await p.fill("#email", "delivered@resend.dev");
await p.fill("#message", "Automated end-to-end delivery test from the local build.");
await p.waitForTimeout(200);

await p.getByRole("button", { name: /send message/i }).click();
await p.waitForTimeout(9000);

console.log("=== console ===");
console.log(logs.length ? logs.join("\n") : "(none)");
console.log("\n=== emailjs network calls ===");
console.log(calls.length ? JSON.stringify(calls, null, 1) : "(none captured)");

await b.close();
