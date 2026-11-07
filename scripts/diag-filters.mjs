import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
p.on("console", (m) => {
  if (m.type() === "error") errs.push("console: " + m.text().slice(0, 160));
});

await p.goto("http://localhost:5173/work", { waitUntil: "networkidle" });
await p.waitForTimeout(1800);

const labels = await p.$$eval("button", (bs) =>
  bs
    .filter((x) => /All|web|SaaS|Editorial|Mobile|System|Interactive/i.test(x.textContent || ""))
    .map((x) => x.textContent?.trim())
);
console.log("filter buttons:", JSON.stringify(labels));

for (const label of labels) {
  await p.getByRole("button", { name: label, exact: true }).click();
  await p.waitForTimeout(1400);

  const state = await p.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('a[href^="/work/"]'));
    return {
      dataCursorCards: cards.length,
      details: cards.map((a) => {
        const cs = getComputedStyle(a);
        const r = a.getBoundingClientRect();
        return {
          slug: a.getAttribute("href"),
          title: a.querySelector("h2")?.textContent,
          opacity: cs.opacity,
          visibility: cs.visibility,
          height: Math.round(r.height),
          animName: cs.animationName,
        };
      }),
      emptyMsg: document.body.innerText.includes("Nothing in this discipline"),
    };
  });

  console.log(
    `\n${label.padEnd(15)} cards=${state.dataCursorCards} empty=${state.emptyMsg}`
  );
  for (const d of state.details) {
    console.log(
      `   ${String(d.title).padEnd(12)} op=${d.opacity} vis=${d.visibility} h=${d.height} anim=${d.animName}`
    );
  }
}

console.log("\nerrors:", errs.length ? errs : "none");
await b.close();
