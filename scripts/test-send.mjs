import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));

await p.goto("http://localhost:5173/contact", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2000);

await p.fill("#your-name", "Nighthawk Form Test");
await p.fill("#email", "delivered@resend.dev");
await p.getByRole("button", { name: /^\$10k/i }).click();
await p.fill(
  "#message",
  "This is an automated end-to-end test of the contact form, sent from the local build. If you are reading this, EmailJS delivery is working correctly."
);
await p.waitForTimeout(300);

await p.getByRole("button", { name: /send message/i }).click();

// wait for either terminal state
let outcome = "pending";
for (let i = 0; i < 30; i++) {
  await p.waitForTimeout(1000);
  outcome = await p.evaluate(() => {
    if (document.body.innerText.includes("Message sent")) return "sent";
    if (document.querySelector(".border-sodium\\/25")) return "failed";
    return "pending";
  });
  if (outcome !== "pending") break;
}

console.log("outcome:", outcome);
console.log("page errors:", errs.length ? errs : "none");

const detail = await p.evaluate(() => {
  const banner = document.querySelector(".border-sodium\\/25");
  const ok = document.body.innerText.includes("Message sent");
  return {
    sentPanel: ok,
    failureText: banner ? banner.innerText.replace(/\n+/g, " | ").slice(0, 200) : null,
  };
});
console.log("ui detail:", JSON.stringify(detail, null, 1));

await p.screenshot({ path: ".shots/contact-result.png" });
await b.close();
