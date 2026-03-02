# 1st Nighthawk Innovations

A dark, cinematic portfolio website featuring a 3D WebGL hero, GSAP scroll-linked animations, Lenis smooth scrolling, and immersive page transitions. Built to showcase premium UI/UX design services.

## Tech Stack

- **React 19** with TypeScript
- **Vite 6** -- Build tool and dev server
- **Three.js** + React Three Fiber + Drei -- 3D particle hero scene
- **GSAP** + ScrollTrigger -- Scroll-linked animations, horizontal scroll pinning
- **Lenis** -- Smooth scroll engine
- **Framer Motion** -- Page transitions, micro-interactions
- **Tailwind CSS 4** -- Utility-first styling with custom dark theme tokens
- **Lucide React** -- Icons
- **React Router** -- Client-side routing

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Immersive scroll: 3D Hero -> Services -> Featured Work (horizontal scroll) -> Testimonials Marquee -> CTA |
| `/work` | Portfolio | Project grid with category filtering, clip-path reveals, case study modals |
| `/contact` | Contact | Animated form with floating labels, budget selector |

## Project Structure

```
src/
  components/
    layout/         -- Navbar, Footer, SmoothScroll, CustomCursor, PageTransition, Preloader
    home/           -- Hero3D, HeroContent, Services, FeaturedWork, TestimonialsMarquee, HomeCTA
    work/           -- (future: extracted project components)
    contact/        -- (future: extracted form components)
    shared/         -- TextReveal, MagneticButton, ScrollProgress, NoiseOverlay
  hooks/            -- useMousePosition, useScrollProgress, useMagnetic
  pages/            -- HomePage, WorkPage, ContactPage
  lib/              -- Utility functions (cn)
  App.tsx           -- Root with 3-route structure + AnimatePresence
  index.css         -- Dark theme tokens, typography, component classes
  main.tsx          -- Entry point
```

## Design System

- **Theme**: Dark cinematic (`#070a20` navy base)
- **Typography**: Syne (display headings) + Inter (body)
- **Colors**: Brand navy, primary blue (`#126b9f`), accent teal
- **Effects**: Glass morphism, noise overlay, gradient text, glow effects
- **Animations**: Text reveals, clip-path reveals, scroll-triggered, parallax

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Key Features

- **3D Particle Hero** -- React Three Fiber particle cloud that reacts to mouse movement
- **GSAP Horizontal Scroll** -- Featured work section pins and scrolls horizontally
- **Custom Cursor** -- Dot + ring cursor with hover scaling, hidden on touch devices
- **Lenis Smooth Scroll** -- Integrated with GSAP ScrollTrigger for buttery scroll
- **Text Reveal Animations** -- Word-by-word and character reveal on scroll
- **Testimonials Marquee** -- Infinite horizontal scroll with pause on hover
- **Preloader** -- Branded loading screen with progress indicator
- **Page Transitions** -- Framer Motion enter/exit between routes
- **Noise Overlay** -- SVG film grain for cinematic texture
- **Scroll Progress** -- Gradient progress bar at viewport top

---

(c) 2024 1st Nighthawk Innovations. All rights reserved.
