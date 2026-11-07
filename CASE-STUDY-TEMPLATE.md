# Case Study Template — `1st Nighthawk Innovations`

This file has two jobs:

1. **Tell you what to write** for a real client project.
2. **Be the exact shape** the site expects, so adding a project is a data entry
   job, not a coding job.

Fill in a copy of the block below, hand it back, and it goes live. Anything
in `[square brackets]` is a prompt — delete the brackets, keep the answer.

---

## Why this structure

Every case study answers five questions in this order, because that's the order
a buyer actually asks them:

| Section | The question in the buyer's head |
|---|---|
| **Context** | Who was this for, and what were the constraints? |
| **Problem** | What was actually broken, in concrete terms? |
| **Decision** | What did you change, and why *that* over the alternatives? |
| **Result** | Did it work? |
| **Honesty** | What didn't work, or what would you do differently? |

That last one is the section most portfolios skip, and it is the single
strongest trust signal on a page. A designer who can name a trade-off reads as
someone who has actually shipped. A designer who says everything went perfectly
reads as someone who hasn't.

---

## The block

```ts
{
  // ── Identity ────────────────────────────────────────────────────────
  slug: "grace-and-gray",              // URL: /work/grace-and-gray (lowercase, hyphens)
  title: "Grace & Gray Mercantile",    // Client's name. Their real name.
  kind: "Client",                      // "Client" or "Concept" — this drives the badge
  discipline: "Brand & Web",           // must match one of disciplines in content.ts
  year: "2025",
  liveUrl: "https://graceandgraymercantile.com",  // omit if none

  // ── One-line summary (shows on cards) ───────────────────────────────
  // One sentence. What the site does for them, not what you did.
  // Bad:  "A full website redesign with a new brand system."
  // Good: "A storefront that lets a two-person shop take orders without
  //        answering the phone."
  summary: "[one sentence]",

  // ── Context (2–3 sentences) ─────────────────────────────────────────
  // Who they are, scale, deadline, budget reality, whatever constrained you.
  premise:
    "[Who the client is and what the situation was. Include the constraint " +
    "that made it hard — timeline, budget, no CMS, only phone photos, a " +
    "stakeholder who wanted three fonts.]",

  // ── The problem (1–2 sentences, ideally with a number) ──────────────
  // What was measurably wrong. If you have no number, describe the
  // concrete friction instead.
  problem:
    "[What was actually broken. 'They were losing X per month to Y.' " +
    "Or: 'Every product update required emailing a developer.']",

  // ── Decisions (3–4 bullets) ─────────────────────────────────────────
  // This is the section that proves you're a designer and not a decorator.
  // Each bullet should name a choice AND the alternative you rejected.
  approach: [
    "[Choice made — and the thing you deliberately didn't do instead.]",
    "[Choice made — and why the obvious approach was wrong here.]",
    "[A constraint you designed around rather than fought.]",
  ],

  // ── Result (2–3 rows) ───────────────────────────────────────────────
  // Only facts you can defend. If you have real numbers, use them.
  // If you don't, use verifiable facts — not vanity metrics.
  // NEVER invent a percentage.
  results: [
    { label: "[what changed]", value: "[number or verifiable fact]" },
    { label: "[what changed]", value: "[number or verifiable fact]" },
  ],

  // ── Honesty (1–2 sentences) ─────────────────────────────────────────
  // What you'd do differently, or what's still imperfect.
  reflection:
    "[Something true and slightly unflattering. This is the most valuable " +
    "paragraph on the page.]",

  // ── Craft facts (optional, 2–3 rows) ────────────────────────────────
  // Technical proof. Stack, performance, accessibility. All checkable.
  craft: [
    { label: "Stack", value: "React · Tailwind · Vite" },
    { label: "Lighthouse", value: "[score]" },
    { label: "Accessibility", value: "WCAG AA" },
  ],

  // ── Media ───────────────────────────────────────────────────────────
  // 3–5 images minimum: hero, one detail shot, one mobile, before/after.
  media: [
    { src: "/work/grace-and-gray/hero.jpg", alt: "[what's in the shot]" },
    { src: "/work/grace-and-gray/detail.jpg", alt: "[what's in the shot]" },
  ],

  // ── Optional testimonial ────────────────────────────────────────────
  // Only with the client's written permission. Their real words, unedited.
  // Omit entirely if you don't have one — a blank space beats a fake quote.
  testimonial: {
    quote: "[real quote]",
    author: "[real name]",
    role: "[real title, Company]",
  },
}
```

---

## What NOT to write

These are the specific failure modes to avoid, based on what was on the site
before this rebuild:

- ❌ **Invented metrics.** "Increased engagement by 65%." If a client didn't
  hand you that number, it isn't yours to publish.
- ❌ **Invented logos.** A "trusted by" wall of companies you haven't worked
  with is the fastest way to lose a deal, because the prospect checks.
- ❌ **Fake testimonials.** Same reason, worse.
- ❌ **"We" when it's you.** Buyers hire people. Say "I."
- ❌ **Process theatre.** Nobody cares that you had a discovery workshop.
  They care what you decided and what happened.
- ❌ **Screenshots with no reasoning.** A pretty mockup is a portfolio piece.
  A mockup plus "here's why it's like this" is a case study.

---

## The minimum viable case study

If you're short on time, a real project with only these five fields still beats
any concept piece on the site:

```
title · summary · problem · approach (1 bullet) · results (1 row)
```

Plus one real screenshot. That's it. Ship that, then deepen it later.

---

## Writing guide for the honest bits

The two hardest sections are **problem** and **reflection**. Some starters:

**Problem:**
- "The old site was built on [platform] and every text change cost $X."
- "Customers couldn't tell what they sold in the first five seconds."
- "It took 11 seconds to load on mobile, and 70% of traffic was mobile."

**Reflection:**
- "If I did it again I'd have built the menu system first — we rebuilt it twice."
- "The photo budget was too small and it shows on the product pages."
- "I over-designed the homepage. The homepage isn't where they buy."
- "Handoff would have gone better with a component library from day one."

Notice none of those make you look weak. They make you look experienced.

---

## Candidate order (my recommendation)

1. **Grace & Gray Mercantile** — live, real, local, and you can screenshot it
   today. Start here.
2. **Any other live build** — even a small one. Live beats impressive.
3. Then deepen the six concepts with real decisions and rejected directions.

Two real case studies will do more for your close rate than twelve concepts.
