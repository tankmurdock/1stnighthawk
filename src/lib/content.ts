/**
 * Single source of truth for all site copy.
 *
 * RULE: every portfolio piece here is CONCEPT WORK. We never invent clients,
 * logos, metrics, or testimonials. If it isn't true, it isn't on the site.
 */

export const site = {
  name: "1st Nighthawk Innovations",
  /** Two-line lockup used in the nav. Derived so it can never drift. */
  wordmark: { first: "1st Nighthawk", second: "Innovations" },
  short: "Nighthawk",
  domain: "1stnighthawk.com",
  /** Canonical origin — www is the primary host on Vercel. */
  url: "https://www.1stnighthawk.com",
  email: "1stnighthawkllc@gmail.com",
  phone: "+1 (904) 338-3032",
  phoneHref: "+19043383032",
  location: "Jacksonville, Florida",
  role: "Design Engineer",
  /** Hero lede. Leads with the rare thing (one person designs *and* builds)
      rather than restating the job title the headline already implies. */
  intro:
    "I design interfaces and build them myself — motion, real-time 3D, design systems. No handoff gap.",
  tagline: "Design that holds up when the lights go out.",
  available: true,
  /** Shown in the hero and contact page. Update this one value. */
  availability: "Q1 2027",
  socials: {
    github: "https://github.com/tankmurdock",
    linkedin: "https://www.linkedin.com/in/",
    x: "https://x.com/",
  },
} as const;

export const nav = [
  { label: "Index", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Lab", to: "/lab" },
  { label: "Contact", to: "/contact" },
] as const;

/* ── Capabilities ─────────────────────────────────────────────────── */

export const capabilities = [
  {
    n: "01",
    title: "Product & Interface Design",
    body: "Discovery through to the final comp. Flows, states, edge cases, empty states — the parts that decide whether a product feels considered or thrown together.",
    items: ["Product strategy", "User flows", "Hi-fi interface", "Prototyping"],
  },
  {
    n: "02",
    title: "Design Systems",
    body: "Token architecture that survives contact with a real codebase. Semantic layers, theme switching, and documentation someone will actually read.",
    items: ["Token architecture", "Component libraries", "Theming", "Docs"],
  },
  {
    n: "03",
    title: "Front-End Engineering",
    body: "React and TypeScript in the same pair of hands that drew the design, so nothing gets lost translating it. Accessibility and performance treated as features, not cleanup.",
    items: ["React / TS", "Tailwind", "Accessibility", "Performance"],
  },
  {
    n: "04",
    title: "Motion & 3D",
    body: "GSAP choreography and real WebGL. Motion that explains the interface rather than decorating it — and knows when to get out of the way.",
    items: ["GSAP", "Three.js / R3F", "Shaders", "Scroll direction"],
  },
] as const;

/* ── Concept work ─────────────────────────────────────────────────── */

export type Project = {
  slug: string;
  title: string;
  /** "Client" work is real and shipped. "Concept" is self-directed. */
  kind: "Client" | "Concept";
  /** Explicit status so we never imply more than is true. */
  status?: string;
  discipline: string;
  year: string;
  summary: string;
  premise: string;
  /** What was actually broken, in concrete terms. */
  problem?: string;
  approach: string[];
  craft: { label: string; value: string }[];
  /** What changed as a result. Only facts that can be defended. */
  results?: { label: string; value: string }[];
  /** What didn't work, or what would be done differently. */
  reflection?: string;
  liveUrl?: string;
  /** Screenshots in public/work/<slug>/. First one is the card image. */
  media?: { src: string; alt: string }[];
  accent: string;
  /** Fallback for the DOM mock, used when there is no media. */
  preview: 1 | 2 | 3 | 4 | 5 | 6;
};

export const projects: Project[] = [
  {
    slug: "grace-and-gray",
    title: "Grace & Gray Mercantile",
    kind: "Client",
    status: "Live",
    discipline: "Brand & Web",
    year: "2026",
    summary:
      "A boutique storefront in Avondale, Jacksonville — launched as a brand site first, commerce deliberately held back until the inventory work is ready.",
    premise:
      "A neighbourhood boutique moving from an Instagram presence to its own home on the web. The owner sells one-off pieces and small quantities, tracks stock on paper, and takes payments through Square. The real constraint wasn't design — it was sequencing: a public brand site could ship in weeks, but online commerce had to wait on getting inventory right.",
    problem:
      "Every sale ran through Instagram DMs and the physical shop. There was no canonical place for hours, location, or the story that makes an independent boutique worth visiting over a chain — and the owner had no way to update any of it herself.",
    approach: [
      "Shipped the brand experience first and built commerce second, rather than launching a half-working shop. The site announces online shopping is coming instead of hiding an empty cart.",
      "Editorial restraint over storefront density — Playfair Display, a warm monochrome palette, and photography given room to breathe. A boutique should feel like a shop window, not a grid of SKUs.",
      "Landing mode is a build-time flag, not a redesign. The full storefront, four collections and eighteen product pages already exist behind it, so turning commerce on is a config change rather than a rebuild.",
      "Kept stock honestly at zero across the catalogue and removed preorder affordances. A shop that can't fulfil an order shouldn't imply it can.",
    ],
    results: [
      { label: "Pages shipped", value: "29" },
      { label: "Collections ready", value: "4" },
      { label: "Product routes wired", value: "18" },
      { label: "Mode switch", value: "One env var" },
    ],
    reflection:
      "The honest lesson was sequencing. I could have built the storefront first because it's the more impressive artefact, but the owner doesn't have clean inventory data yet — so a working cart would have been a demo, not a business. Holding commerce back until Square is authoritative was the right call and a slower-looking one.",
    liveUrl: "https://graceandgraymercantile.com",
    media: [
      {
        src: "/work/grace-and-gray/hero.jpg",
        alt: "Grace & Gray Mercantile homepage — 'Style with Character' over a boutique interior",
      },
      {
        src: "/work/grace-and-gray/mobile.jpg",
        alt: "Grace & Gray Mercantile on a phone — responsive homepage",
      },
      {
        src: "/work/grace-and-gray/about.jpg",
        alt: "The About page telling the boutique's story",
      },
      {
        src: "/work/grace-and-gray/visit.jpg",
        alt: "The Visit page with address, hours and directions",
      },
    ],
    craft: [
      { label: "Stack", value: "Astro 5 · TypeScript" },
      { label: "Catalog", value: "Square-ready" },
      { label: "Motion", value: "GSAP, reduced-motion safe" },
    ],
    accent: "#c8bda8",
    preview: 1,
  },
  {
    slug: "gg-intake",
    title: "Grace & Gray Intake",
    kind: "Client",
    status: "Working prototype",
    discipline: "Product Design",
    year: "2026",
    summary:
      "A scanning and intake tool for a retail floor, where the operator is holding an item in one hand and an iPad in the other — built to replace a paper ledger without pretending Square integration already exists.",
    premise:
      "Grace & Gray tracks inventory on paper and labels stock with a Quail printer. Those labels carry only numeric identifiers, so every item still needs its name, price, category, quantity and photos captured by hand. The owner is moving to Square as the single source of truth, but real inventory has to exist before anything can sync — so the intake step is the actual bottleneck, not the storefront.",
    problem:
      "The existing workflow is a paper ledger plus Quail labels plus a separate spreadsheet. Nothing reconciles, duplicates get entered twice, prices are typed from memory, and a one-off item has no reliable record of what it looked like when it was shelved.",
    approach: [
      "Designed for one thumb and a shop floor, not a desktop dashboard. A single scrolling intake path — scan, photograph, describe, save, next — with the primary action always reachable at the bottom of the screen.",
      "Treated barcodes as opaque strings and never normalised them. Leading zeros are preserved and `Number()` is banned: the moment you parse a label as an integer, you silently corrupt every SKU in the business. Validation is advisory until real Quail labels have been decoded.",
      "Kept money as integer cents and banned `parseFloat` with a lint rule. Price is parsed from the string, because `0.1 + 0.2` on a $68 shirt is a rounding dispute with the owner.",
      "Built duplicate handling as an explicit decision, not a silent overwrite. Scanning a known barcode offers quantity-add, inspect, or save-separate — and the only field quantity-add may touch is quantity.",
      "Put the domain rules in a pure layer with no DOM, IndexedDB or fetch, so the same validation can run server-side when Square integration lands. The client is a prototype; the rules are not throwaway.",
      "Refused to claim capability that hasn't been proven. The UI states plainly that camera scanning and Bluetooth scanner behaviour are unverified on the owner's hardware, and that publishing is a separate, unapproved gate.",
    ],
    results: [
      { label: "Automated tests", value: "361" },
      { label: "Domain modules", value: "9 pure" },
      { label: "Data loss paths", value: "Zero by design" },
      { label: "Square writes", value: "None yet" },
    ],
    reflection:
      "The hardest discipline was not building the interesting part. Square sync is the thing that would look impressive in a demo, but the app has not been tested on the actual iPad and nobody has decoded a real Quail label yet — so a sync feature would be guessing at a schema. Milestone 2 is deliberately boring device validation, and skipping it is how you end up re-importing a thousand products twice.",
    media: [
      {
        src: "/work/gg-intake/inventory.jpg",
        alt: "Local inventory list showing three intake drafts with totals, filters and per-item actions",
      },
      {
        src: "/work/gg-intake/intake.jpg",
        alt: "The intake form — barcode capture, then product details in one scroll",
      },
      {
        src: "/work/gg-intake/data.jpg",
        alt: "The data screen for JSON backup and CSV export",
      },
      {
        src: "/work/gg-intake/desktop.jpg",
        alt: "The same inventory view at desktop width",
      },
    ],
    craft: [
      { label: "Stack", value: "Astro 7 · Preact · TS strict" },
      { label: "Storage", value: "IndexedDB via ports" },
      { label: "Scanning", value: "zxing + keyboard heuristic" },
    ],
    accent: "#b08d6a",
    preview: 2,
  },
  {
    slug: "meridian",
    title: "Meridian",
    kind: "Concept",
    discipline: "Brand & Web",
    year: "2025",
    summary:
      "A private equity firm whose site reads like architecture, not a brochure.",
    premise:
      "Most financial sites shout credentials. I wanted to test the opposite: a firm confident enough to show almost nothing — one number, one line of copy, immense whitespace, and a palette borrowed from limestone and bronze.",
    approach: [
      "Type-led hierarchy — a single grotesque at three scales carries the entire brand.",
      "Whitespace as the product. Every removed element is a trust signal.",
      "Motion reduced to opacity and slow reveals; nothing that reads as 'startup'.",
    ],
    craft: [
      { label: "Type scale", value: "9 steps" },
      { label: "Palette", value: "2 tones + 1 metal" },
      { label: "Motion", value: "Opacity only" },
    ],
    accent: "#c8a678",
    preview: 1,
  },
  {
    slug: "vantage",
    title: "Vantage",
    kind: "Concept",
    discipline: "SaaS Product",
    year: "2025",
    summary:
      "A logistics control room rebuilt around one question: what needs me right now?",
    premise:
      "Dashboards fail by showing everything. This exploration starts from a single queue of decisions, with everything else demoted to context. Built to test information density without turning into a spreadsheet.",
    approach: [
      "One primary queue; secondary data lives in a persistent rail, never a modal.",
      "Dense tables that stay legible through alignment and rhythm, not borders.",
      "Status carried by motion and position first, colour second.",
    ],
    craft: [
      { label: "Components", value: "62 in library" },
      { label: "Density", value: "3 modes" },
      { label: "Accessibility", value: "WCAG AA" },
    ],
    accent: "#74d0e6",
    preview: 2,
  },
  {
    slug: "atlas",
    title: "Atlas Archive",
    kind: "Concept",
    discipline: "Editorial",
    year: "2025",
    summary:
      "A photographic archive that treats images as objects, not thumbnails.",
    premise:
      "Image archives usually flatten everything into a grid. This concept lets the work set the grid — full-bleed plates, varied rhythm, captions treated as typography rather than metadata.",
    approach: [
      "Asymmetric layout so no two spreads scroll identically.",
      "Images load with a hold, then soften — closer to a darkroom than a CDN.",
      "Index navigation that behaves like a card catalogue.",
    ],
    craft: [
      { label: "Layouts", value: "7 spread types" },
      { label: "Image budget", value: "< 180KB avg" },
      { label: "Type", value: "Serif + mono" },
    ],
    accent: "#9aa88a",
    preview: 3,
  },
  {
    slug: "relay",
    title: "Relay",
    kind: "Concept",
    discipline: "Mobile App",
    year: "2024",
    summary:
      "A commuting app that gives you one number when you're already late.",
    premise:
      "Transit apps optimise for completeness at the worst possible moment. Relay strips to a single answer — leave now or you're late — and reveals detail only when you slow down.",
    approach: [
      "A one-glyph home state that encodes the entire answer.",
      "Progressive disclosure tied to how much time you have, not what you tapped.",
      "Motion used as a countdown, never as celebration.",
    ],
    craft: [
      { label: "Screens", value: "11 total" },
      { label: "Home state", value: "1 glyph" },
      { label: "Contrast", value: "7.1:1 min" },
    ],
    accent: "#ffa03a",
    preview: 4,
  },
  {
    slug: "kiln",
    title: "Kiln",
    kind: "Concept",
    discipline: "Design System",
    year: "2024",
    summary:
      "A token system built to survive four brands and one very opinionated engineer.",
    premise:
      "Most design systems break the first time a brand needs a different corner radius. Kiln separates primitive, semantic, and component tokens so rebranding is a config change, not a refactor.",
    approach: [
      "Three-tier token model with enforced linting between layers.",
      "Every component documented with its own failure states.",
      "Theme switching without a single conditional in component code.",
    ],
    craft: [
      { label: "Tokens", value: "410" },
      { label: "Components", value: "58" },
      { label: "Themes", value: "4" },
    ],
    accent: "#d98c5f",
    preview: 5,
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    kind: "Concept",
    discipline: "Interactive",
    year: "2024",
    summary: "A concert poster generator that behaves like a light show.",
    premise:
      "A WebGL study: type extruded in 3D, lit by a moving rig, reacting to pointer like a stage light. Built to find the line where 3D enhances a layout instead of replacing it.",
    approach: [
      "Real geometry for the display type so lighting lands on it correctly.",
      "Camera moves constrained to what a photographer could actually do.",
      "Post FX kept subtle enough that the type stays readable.",
    ],
    craft: [
      { label: "Draw calls", value: "< 20" },
      { label: "Frame budget", value: "16ms" },
      { label: "Fallback", value: "Static poster" },
    ],
    accent: "#a78bfa",
    preview: 6,
  },
];

export const disciplines = [
  "All",
  "Brand & Web",
  "SaaS Product",
  "Editorial",
  "Mobile App",
  "Design System",
  "Interactive",
] as const;

/* ── Process ──────────────────────────────────────────────────────── */

export const process = [
  {
    n: "01",
    title: "Frame",
    body: "One conversation, then a written brief. What is this for, who is it for, and how will we know it worked. No design until we agree on that.",
  },
  {
    n: "02",
    title: "Sketch",
    body: "Fast, cheap, ugly. Two or three structural directions in low fidelity so the disagreement happens early, when it's still free.",
  },
  {
    n: "03",
    title: "Build",
    body: "Design in the browser as soon as the structure holds. Motion and edge cases are part of the design, not a later pass.",
  },
  {
    n: "04",
    title: "Harden",
    body: "Accessibility, performance budgets, responsive behaviour, reduced motion. The unglamorous pass that decides whether it ships well.",
  },
] as const;

/* ── Lab experiments ──────────────────────────────────────────────── */

export type Experiment = {
  id: string;
  n: string;
  title: string;
  description: string;
  tech: string[];
  note: string;
};

export const experiments: Experiment[] = [
  {
    id: "shader-button",
    n: "01",
    title: "Liquid CTA",
    description:
      "A button whose surface is a live fragment shader. Pointer velocity drives a distortion field; the ink pools where you last dragged.",
    tech: ["GLSL", "WebGL", "Pointer physics"],
    note: "Drag across it.",
  },
  {
    id: "magnetic-grid",
    n: "02",
    title: "Magnetic Field",
    description:
      "A grid of cells that displaces under the cursor with distance falloff and spring return. No library — pure rAF and transforms.",
    tech: ["rAF loop", "Spring easing", "CSS transforms"],
    note: "Move slowly to feel the falloff.",
  },
  {
    id: "morph-blob",
    n: "03",
    title: "Morph",
    description:
      "SVG path morphing between organic forms, driven by a noise function rather than keyframes, so it never loops visibly.",
    tech: ["SVG", "Value noise", "rAF loop"],
    note: "It never repeats.",
  },
  {
    id: "token-dial",
    n: "04",
    title: "Token Dial",
    description:
      "A live theme engine. Adjust radius, density, and accent and watch a real component tree re-skin through CSS custom properties.",
    tech: ["CSS vars", "Semantic tokens", "Zero reflow"],
    note: "Turn the accent dial.",
  },
  {
    id: "kinetic-type",
    n: "05",
    title: "Kinetic Type",
    description:
      "Variable-font display type where weight and width respond to scroll velocity. Fast scroll thickens the letterforms.",
    tech: ["Variable fonts", "Scroll velocity", "Interpolation"],
    note: "Scroll through it.",
  },
  {
    id: "fluid-field",
    n: "06",
    title: "Fluid Field",
    description:
      "A GPU particle field that forms shapes on demand. 20,000 points, one draw call, no per-particle JavaScript.",
    tech: ["WebGL", "Instancing", "Simplex noise"],
    note: "Click to reform.",
  },
];

/* ── Facts / credibility (all verifiable, nothing invented) ───────── */

export const facts = [
  { value: "10+", label: "Years designing and building" },
  { value: "Design + build", label: "One person, no handoff gap" },
  { value: "WCAG AA", label: "Baseline on every build" },
  { value: "WebGL", label: "In production, not just demos" },
] as const;

export const tools = [
  "Figma",
  "React",
  "TypeScript",
  "Tailwind",
  "Three.js",
  "GSAP",
  "Framer Motion",
  "Storybook",
  "Vite",
  "Vercel",
] as const;
