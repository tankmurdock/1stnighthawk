# 1st Nighthawk Innovations — Project Doc

Personal studio site for a solo UX/UI designer + front-end engineer.
Positioning: one person who does both the design and the build, with unusually
high craft in motion and 3D.

**Concept: "Night Operations."** A hawk hunts in darkness. The site is graded
like a night aerial — near-black, sodium-amber light, cool instrument glow.
Cinematic restraint over gamer-cyan.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 (`@theme` tokens, no config file) |
| 3D | three.js + @react-three/fiber + @react-three/drei |
| Post | @react-three/postprocessing + postprocessing |
| Motion | GSAP + ScrollTrigger (scroll choreography) |
| Smooth scroll | Lenis (synced to GSAP ticker) |
| Route transitions | Hand-rolled CSS (framer-motion removed — see changelog) |
| Forms | EmailJS |
| Screenshots | Playwright (dev-only, `scripts/`) |

---

## Design System

### Palette (`src/index.css` → `@theme`)

| Token | Hex | Use |
|---|---|---|
| `void` | `#04050a` | page base |
| `abyss` | `#080b13` | section base |
| `dusk` | `#0c121d` | raised surface |
| `graphite` | `#151d2b` | cards, borders |
| `haze` | `#26313f` | hairlines, dividers |
| `mute` | `#6d7c92` | secondary text |
| `bone` | `#f4f1ea` | primary text (warm white, never `#fff`) |
| `sodium` | `#ffa03a` | **primary accent** — sodium streetlight amber |
| `ember` | `#ff6a2c` | hot accent, sparing |
| `ice` | `#74d0e6` | technical detail only — data, mono labels, HUD |

Rule: **cyan is a detail, not a theme.** If a screen reads as "cyan", it's wrong.

### Type

- Display: **Bricolage Grotesque** (variable — `wght`, `wdth`, `opsz` used live)
- Body: **Inter Tight**
- Mono/UI labels: **JetBrains Mono**

Labels use `font-mono`, `text-[10px]`, `tracking-[0.28em]`, `uppercase`, `text-mute`.

### Motion

- Long, weighted easings: `cubic-bezier(0.16, 1, 0.3, 1)`
- Nothing bounces. Nothing spins for the sake of spinning.
- Every animation must survive `prefers-reduced-motion` (see `useReducedMotion`).

### The custom cursor is Lab-only

This is a deliberate product decision, not a technical one.

Customers arrive to read a page. A pointer that doesn't look like a pointer
is charming for ten seconds and then it is friction — and friction on the
first page is what a prospect remembers. The Lab is the one route where the
visitor has explicitly opted into poking at things, so an unfamiliar cursor
there reads as part of the exhibit.

Implementation notes:
- `Cursor` is mounted in `LabPage`, **not** the app shell.
- It adds `cursor-lab` to `<html>`; `index.css` hides the native arrow under
  that class only, and keeps a real `text` caret in inputs/textareas.
- Touch devices (`pointer: coarse`) render nothing at all — no invisible DOM.
- Reduced motion renders nothing.
- No word labels. The shape is just a dot and a ring.

### Magnetism is a lean, not a twitch

`Magnetic` in `Interactive.tsx` engages within 14px of the element's own
bounds and caps travel at 5px. An earlier version engaged from 1.5× the
element's width away, so buttons drifted before the pointer was anywhere
near them — measured at ~0px movement from 60px away now, versus visible
drift before.

---

## Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero → Position → Capabilities → Lab preview → Work → Process → CTA |
| `/work` | Work index | Concept work, filterable |
| `/work/:slug` | Case study | Per-project detail |
| `/lab` | The Lab | 6 live interactive components |
| `/contact` | Contact | EmailJS form |

---

## Structure

```
src/
  three/            HawkScene (procedural relief + post chain)
  components/
    layout/         Nav, Footer, SmoothScroll, Grain, PageTransition
    ui/             Type (SplitLines/Reveal/Stagger/Counter), Interactive
                    (Cursor/Magnetic), Button (LinkButton/ActionButton/Eyebrow)
    home/           Hero, Sections, Position, CapabilitiesSection, WorkPreview,
                    LabPreview, ProcessSection
    lab/            ShaderButton, MagneticGrid, MorphBlob, TokenDial,
                    KineticType, FluidField
    work/           Mock (six mini product UIs on a 1200×900 canvas)
  pages/            Home, Work, WorkDetail, Lab, Contact
  lib/              content.ts (single copy source), emailjs, utils
  hooks/            useMotion (reducedMotion/mouse/inView/progress),
                    usePageTitle
scripts/            Playwright screenshot + diagnostic harnesses
```

---

## Content Rules (important)

- All portfolio pieces are **concept work** and are labelled as such (`kind: "Concept"`).
- **No invented client names, logos, metrics, or testimonials.** Ever.
  Fake proof destroys trust faster than no proof.
- Copy is first person singular — this is one person's studio.
- Tools the site names (React, Three.js, Figma, GSAP…) are *tools*, not clients.
- Availability is `site.availability` in `content.ts` — the only place to edit it.

## Accessibility & Performance Notes

- `prefers-reduced-motion` is honoured by: Lenis (doesn't initialise), the
  custom cursor (returns null), the 3D scene (static pose, no pointer rig),
  every reveal, and the global CSS override in `index.css`.
- Route bundles: home pulls three.js (698KB raw / 180KB gzip) but `/work`,
  `/contact` and `/lab` do not. Verified with `scripts/diag-perf.mjs`.
- All motion uses `transform` / `opacity` only. No layout-animated properties.
- Cursor and magnetic effects write transforms in rAF and never use React state.

---

## The Hero Effect (how it works)

`src/three/HawkScene.tsx`

1. `public/nighthawk.jpeg` is sampled on the CPU into a 240×240 grid.
2. Height comes from luminance at **two scales**, which is the whole trick:
   - **Silhouette** — a wide box blur (radius 7, 3 passes). This is the hawk's
     actual volume: beak, crown, cheek plates. Smooth, so normals stay clean
     under a moving light.
   - **Detail** — the high-frequency remainder (raw minus a light blur), scaled
     to `DETAIL_GAIN` 0.55 so it textures the form instead of shattering it.
3. A procedurally painted 128×64 equirectangular gradient (cool sky above,
   sodium floor below, warm key panel one side, cool bounce the other) is run
   through `PMREMGenerator` and set as `scene.environment`. Without this, a
   metal has nothing to reflect and reads as flat black.
4. Lighting: cool directional key, minimal fill, animated sodium point rim,
   one low cyan instrument glow.
5. Post chain: bloom (threshold 0.62) → chromatic aberration (0.00022) →
   vignette → film grain.
6. Camera rig responds to pointer with damped springs plus a slow handheld
   drift, so it never looks machine-perfect.
7. The scene is `lazy()`-loaded and only mounted after `requestIdleCallback`,
   so it never blocks first paint. No WebGL / reduced motion → graded static
   image fallback.

This is why no `.glb` is needed, and why it still reads as 3D.

### Framing is aspect-aware (`frameFor` in the `Rig`)

The mark has to **bleed** at every size. That is what makes the composition
work: the hawk is large and slightly cropped, and the headline lands on its
dark lower half. An earlier version pulled the camera far back on phones
(`dist` 6.2) to "fit" the mark; the result was a tidy postcard floating above
the text, which read as a separate panel rather than one layered image — the
exact complaint that started the mobile hero work.

So narrower screens move *closer*, not further, and aim lower:

| Aspect | Distance | Aim Y | Used by |
|---|---|---|---|
| ≥ 1.4 | 4.05 | 0.02 | desktop, landscape |
| ≥ 1.0 | 4.3 | 0.0 | square-ish |
| ≥ 0.75 | 3.95 | −0.10 | large phones |
| < 0.75 | 3.5 | −0.42 | tall narrow phones |

The dolly is eased (`delta * 3`) so an orientation change glides instead of
snapping.

### Type legibility over the mark

Because the mark sits behind the text, the backdrop under the headline is
measured, not eyeballed. A scrim anchored to the *viewport* cannot guarantee
coverage — the content block's height changes with the headline, the
paragraph, and the viewport, so on a short phone the type lands much higher
and right on the mark's brightest band.

The wash is therefore anchored to the **content box** (`-top-[70%]`, bleeding
above it), so it always sits behind the words. Landscape phones are the one
case that needs something different: there the text is on the left and the
mark fills the right, so a horizontal falloff handles it.

Verified with `scripts/probe-contrast-ratio.mjs`, which hides the glyphs and
measures WCAG contrast against the brightest 5% of backdrop under each line:

| Viewport | Bone (worst case) | Sodium (worst case) |
|---|---|---|
| phone SE | 12.0:1 | 6.7:1 |
| phone 13 | 14.2:1 | 7.9:1 |
| phone landscape | 16.1:1 | 8.9:1 |
| tablet portrait | 14.5:1 | 8.0:1 |
| desktop 1440 | 13.6:1 | 7.6:1 |

Large display type needs 3.0:1, so there is roughly double the headroom
everywhere.

### The `short` variant

Width alone cannot describe a phone in landscape. `844×390` is desktop-wide by
media query but shorter than any laptop, so `sm:`/`md:` alone produce a
desktop layout in 390px of height and the CTAs fall below the fold.

`src/index.css` defines a height variant:

```css
@custom-variant short (@media (max-height: 460px));
```

Used in `Hero.tsx` to shrink the headline clamp, tighten the spacing, and drop
the CTA padding. Both buttons stay in the fold down to 320×568.

### Scroll performance (why the first scroll used to judder)

The hero's recession used to be React state: a scroll listener called
`setScrollY`, which re-rendered the whole `Hero` — including the WebGL
`Suspense` subtree — on every scroll frame. Lenis was already running an rAF
loop and three.js was rendering on top of both, so the main thread had three
consumers competing. Desktop had the headroom to absorb it; phones did not.

Four changes, each measured:

1. **The fade writes to the DOM, not to state.** `markRef` / `metaRef` /
   `contentRef` get their `transform` and `opacity` set directly inside a
   single rAF callback. Scrolling now costs style writes and zero React
   renders. Values are clamped to the fade distance, and writes are skipped
   entirely once the scroll position stops changing.
2. **The WebGL loop stops off screen.** R3F's `frameloop` flips to `"never"`
   via an `IntersectionObserver` with a 200px `rootMargin` (so the scene is
   warm before you scroll back). Verified with wrapped GL calls:
   `114 draws/sec` visible → `0` off screen → `114` again on return.
3. **The mark stays static on touch devices.** It wraps a full-viewport
   canvas, so animating its opacity or transform makes the compositor
   re-blend a screen-sized alpha layer *on top of* a canvas that is already
   repainting every frame — the two costs stack. `(pointer: coarse)` skips
   both; the text still fades, and the hero is leaving the viewport anyway so
   the difference is not visible.
4. **DPR is capped lower on touch.** The relief is a soft, low-frequency form
   and survives a lower cap than text. `[1, 1.25]` on `(pointer: coarse)`
   instead of `[1, 1.75]` — more than halves pixels per frame through the
   mipmap-blur bloom chain, with no visible loss at this scale.

`Nav` was doing the same thing: `setScrolled`/`setHidden` fired on every
scroll event even when the boolean was unchanged. It now throttles to rAF and
only calls `setState` when a value actually flips.

Harnesses: `scripts/measure-scroll-script.mjs` (main-thread work during a
scripted scroll), `scripts/profile-scroll.mjs` (self-time by function),
`scripts/verify-frameloop-pause.mjs` (GL calls/s on and off screen), and
`scripts/verify-fade-behavior.mjs` (fade still correct on touch and desktop).

Note: headless Chromium rasterises WebGL in software, so frame-interval and
`(program)` samples from these harnesses are **not** indicative of a real
device. Trust script time, GL call counts, and computed styles instead.

---

## Database Schema

None. This site has no database, no auth, and no server. The only outbound
integration is EmailJS (client-side POST, keys in `VITE_EMAILJS_*`).
There are no migrations.

---

## Build / Run

```bash
npm install
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run preview
```

PowerShell note: chain with `;` not `&&` (see `POWERSHELL-PROJECT-RULES`).

## Deployment

- Host: **Vercel**, project `1st-nighthawk-innovations`
- Trigger: push to `master` → auto-deploy (GitHub integration)
- Primary domain: **https://www.1stnighthawk.com**
  (`1stnighthawk.com` 307-redirects to the www host)
- No `vercel.json` needed; Vite defaults are correct.

⚠️ The canonical/OG URLs in `index.html` must stay on `www.1stnighthawk.com`.
An earlier build pointed them at `1stnighthawkinnovations.com`, which does not
resolve — that breaks SEO and social previews.

### Asset policy

`public/` is **111 KB + case study screenshots** and should stay lean. It holds
the favicon, `nighthawk.jpeg` (hero source), and `work/<slug>/` screenshots for
real client work. 68.7 MB of orphaned gallery video and stills was archived to
`.archive/` (gitignored, not deployed). Before adding media, check that
something in `src/` actually references it — unreferenced `public/` files are
billed as bandwidth and never seen.

### Contact form delivery

`VITE_EMAILJS_*` keys live in `.env` locally and in **Vercel → Settings →
Environment Variables** (all three targets). Vite inlines them at build time, so
changing them requires a rebuild — an existing deployment keeps the old values.

Behaviour: configured + success → confirmation. Configured + failure → yellow
panel with "Open in email" / "Copy message". Not configured → mailto fallback
opens immediately. **The enquiry is never lost in any state.**

Known provider-side failure: `412 Gmail_API: Invalid grant` means the Gmail
connection inside EmailJS expired. Fix in the EmailJS dashboard, not in code.
Full walkthrough and troubleshooting in `EMAILJS-SETUP.md`.

## Case studies

`CASE-STUDY-TEMPLATE.md` defines the exact schema a real client project needs
before it ships. Projects are `kind: "Client" | "Concept"` plus an optional
`status` string. Client work renders real screenshots from
`public/work/<slug>/` and shows the problem / results / reflection sections;
concepts keep the DOM mock and are labelled as concepts.

Two client studies live today:

1. **Grace & Gray Mercantile** (`/work/grace-and-gray`, status *Live*) —
   Astro 5 + Wix/Cloudflare storefront, 29 pages, commerce held behind an env
   flag pending Square inventory. Source: `C:\sourceCode\graceandgray`.
2. **Grace & Gray Intake** (`/work/gg-intake`, status *Working prototype*) —
   mobile-first scanning/intake app. Source:
   `C:\sourceCode\square-inventory-intake`.

### Honesty rules for client studies

- `status` must reflect reality. A prototype is labelled *Working prototype*,
  never "live", and the results heading switches from "What shipped" to
  "What's built" when it isn't shipped.
- Never claim a capability the source project documents as unverified.
  The intake app explicitly has not been tested on the owner's hardware or
  against real Quail labels, and the case study says so.
- Metrics come from the repo (test counts, module counts), not from invention.

---

## Changelog

- **Revamp v2 — "Night Operations."** Full rebuild.
  - New palette (sodium/ember on void, cyan demoted to instrument-only) and a
    new type system (Bricolage Grotesque + Inter Tight + JetBrains Mono).
  - Procedural 3D hero: logo sampled into a 240² height field, blurred at two
    scales (silhouette + detail), displaced into a relief, lit with a
    procedural PMREM environment and a cool-key/warm-rim rig.
  - Honest content model: all six portfolio pieces relabelled `Concept`. Every
    invented client name, logo, metric and testimonial removed. Copy is first
    person singular.
  - New `/lab` section — six live interactive experiments (GPU shader button,
    magnetic grid, noise-driven SVG morph, CSS-variable theme dial, variable
    font kinetic type, 20k-point fluid field). Replaces the orphaned
    `ComponentShowcase` / `HawkGallery` / `DesignSystem` / `StyleConfigurator`
    files, which were never imported and contained mojibake emoji.
  - Work index + per-project case study routes (`/work/:slug`).
  - `Mock` previews rewritten on a fixed 1200×900 canvas scaled by
    ResizeObserver, so type is crisp at any card size with zero images.
  - Route-level code splitting. three.js (698KB) now loads **only** on `/`.
  - framer-motion removed entirely (was pulling ~120KB for one page
    transition). Bundle 531KB → 416KB; transitions now run instantly.
  - Reduced-motion support throughout; WebGL falls back to a graded still.
  - Custom cursor rewritten to read `data-cursor` intent from the DOM instead
    of guessing from tags, with zero per-frame React state.
  - Build, lint and typecheck all clean.

### Fixed after review

- **Filtered work looked like it wasn't rendering.** The filter logic was
  correct — every discipline returns its card at opacity 1. The problem was
  layout: each discipline has exactly one project, and a single card in a
  two-column grid left a hole that was filled by the grid's own `bg-haze`
  panel, so it read as a failed load. Now a single result renders as a
  full-width feature card, filters show their counts, and a "1 study in X"
  label sets the expectation before you click.
- **The custom cursor never hid the native one.** There was no `cursor: none`
  anywhere, so desktop visitors saw the OS arrow *plus* a dot *plus* a lagging
  ring — three cursors at once. The real fix was scoping: the cursor now lives
  only in the Lab, and only there is the native arrow suppressed.
- **Magnetic pull engaged from 1.5× the element's width away**, so buttons
  drifted before you were near them. Now a 14px margin with 5px max travel.
- Relief initially read as crystalline shrapnel — per-pixel luminance was
  mapped straight to Z, so every specular edge became a spike. Resolved with
  separable box blur at two scales.
- Chromatic aberration was heavy enough to look broken; bloom threshold was so
  low the whole mark glowed. Both dialled back.
- Metal had nothing to reflect, so it read as flat black. Added a procedural
  equirectangular environment through PMREM.
- Lab experiments were unmounting on scroll-out, tearing down and rebuilding
  WebGL contexts. Now mount once and stay mounted.
- `morph-blob` was listed in content but had no component. Written.
- Fluid field was overexposed (additive blending + 20k points + large sprites).
- Availability text said "Q1 2026" in a November 2026 codebase; now a single
  `site.availability` value.
- **Mobile hero was the weakest screen on the site.** The content block was
  `justify-end` inside `min-h-[100svh]` and taller than the space available, so
  the headline was pushed up *into* the 3D mark — on an iPhone SE `h1` sat at
  `y=0`, off the top of the screen. Three separate faults compounded:
  1. The mark was pulled back to `dist` 6.2 on narrow screens, shrinking it
     into a postcard above the type instead of bleeding behind it. Now the
     camera moves *closer* and aims lower (`frameFor`), matching the desktop
     composition.
  2. The scrim was viewport-anchored, so it missed the type whenever the
     content block grew or shrank. It is now anchored to the content box and
     bleeds above it, guaranteeing coverage at any viewport height.
  3. Landscape phones (`844×390`) got a desktop layout in 390px of height,
     pushing both CTAs below the fold. Fixed with the `short` height variant.

  Verified across nine viewports from 320×568 to 1440×900: no horizontal
  overflow, both CTAs in the fold everywhere, and worst-case measured contrast
  of 6.7:1 on the sodium line (needs 3.0:1).
