/**
 * Single source of truth for all site copy.
 *
 * RULE: every portfolio piece here is CONCEPT WORK. We never invent clients,
 * logos, metrics, or testimonials. If it isn't true, it isn't on the site.
 */

export const site = {
  name: "1st Nighthawk Innovations",
  short: "Nighthawk",
  domain: "1stnighthawkinnovations.com",
  email: "1stnighthawkllc@gmail.com",
  phone: "+1 (904) 338-3032",
  phoneHref: "+19043383032",
  location: "Jacksonville, Florida",
  role: "Product Designer & Front-End Engineer",
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
    body: "React and TypeScript, built to keep the design intact after handoff. Accessibility and performance treated as features, not cleanup.",
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
  kind: "Concept";
  discipline: string;
  year: string;
  summary: string;
  premise: string;
  approach: string[];
  craft: { label: string; value: string }[];
  accent: string;
  preview: 1 | 2 | 3 | 4 | 5 | 6;
};

export const projects: Project[] = [
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
