import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { site } from "../../lib/content";
import { Magnetic } from "../ui/Interactive";
import { useReducedMotion } from "../../hooks/useMotion";

// The 3D scene is the heaviest thing on the site — load it after paint.
const HawkScene = lazy(() => import("../../three/HawkScene"));

/* requestIdleCallback isn't in lib.dom yet, so describe just what we use. */
type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function Hero() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  // Hold the 3D until the browser is idle so first paint is instant.
  useEffect(() => {
    const go = () => setMounted(true);
    const w = window as IdleWindow;

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(go, { timeout: 900 });
      return () => w.cancelIdleCallback?.(id);
    }

    const t = setTimeout(go, 120);
    return () => clearTimeout(t);
  }, []);

  /* Scroll-linked recession, applied straight to the DOM.

     This used to call setScrollY on every scroll frame. That re-rendered
     the whole Hero — including the WebGL Suspense subtree — up to 60 times
     a second, while Lenis was already running its own rAF loop and the
     three.js loop was rendering on top of both. Desktop had the headroom to
     hide it; phones did not, and the result was a jerky first scroll, which
     is exactly where this effect is visible.

     Writing transforms to refs instead means scrolling costs one style write
     per frame and zero React work.

     The mark gets special handling. It wraps a full-viewport WebGL canvas,
     so animating its opacity or transform forces the compositor to re-blend
     a screen-sized alpha layer on top of a canvas that is *already*
     repainting every frame — the two costs stack. On touch devices the mark
     therefore stays static and only the text recedes; the visual difference
     is negligible because the hero is leaving the viewport anyway, and it
     removes the most expensive thing on the frame. */
  const markRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;

    // Coarse pointer means a touch device, where compositing headroom is
    // thinnest and the canvas is the largest layer on screen.
    const coarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    const FADE_DISTANCE = 560;
    let frame = 0;
    let last = -1;

    const apply = () => {
      frame = 0;
      const y = window.scrollY;

      // Past the fade distance every value is pinned; skip the writes.
      const clamped = Math.min(y, FADE_DISTANCE);
      if (clamped === last) return;
      last = clamped;

      const fade = clamped / FADE_DISTANCE;
      const lift = clamped * 0.22;

      if (!coarse && markRef.current) {
        markRef.current.style.transform = `translate3d(0, ${(lift * 0.35).toFixed(1)}px, 0)`;
        markRef.current.style.opacity = (1 - fade * 0.55).toFixed(3);
      }
      if (metaRef.current) {
        metaRef.current.style.opacity = Math.max(0, 1 - fade * 1.6).toFixed(3);
      }
      if (contentRef.current) {
        // Opacity only on touch: a moving transform on a big text block
        // forces it to be re-rastered, and at these sizes that shows up as
        // shimmer on the glyph edges.
        if (coarse) {
          contentRef.current.style.opacity = (1 - fade).toFixed(3);
        } else {
          contentRef.current.style.transform = `translate3d(0, ${(-lift).toFixed(1)}px, 0)`;
          contentRef.current.style.opacity = (1 - fade).toFixed(3);
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // local time in the studio — a small, human detail
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/New_York",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void">
      {/* ── 3D layer ─────────────────────────────────────────────────
          Full-bleed at every size — same composition as desktop. On
          phones the mark bleeds behind the type and is dimmed to darkness
          by the scrim below, so the headline sits on its dark lower half
          instead of being pushed into a bright hotspot. */}
      <div
        ref={markRef}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {mounted ? (
          <Suspense fallback={<SceneFallback />}>
            <HawkScene className="absolute inset-0" />
          </Suspense>
        ) : (
          <SceneFallback />
        )}
      </div>

      {/* ── Atmosphere: horizon glow at the floor ─────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45vh]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 118%, rgba(255,160,58,0.20) 0%, rgba(255,106,44,0.07) 38%, transparent 72%)",
        }}
      />

      {/* ── Legibility scrim ──────────────────────────────────────────
          Landscape phones are the only case the content wash can't cover:
          there the text sits on the left while the mark fills the right,
          so a horizontal falloff does the work. Everything else is handled
          by the wash anchored to the text block below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 hidden short:block"
        style={{
          background:
            "linear-gradient(to right, rgba(4,5,10,0.96) 0%, rgba(4,5,10,0.88) 34%, rgba(4,5,10,0.35) 58%, rgba(4,5,10,0) 78%)",
        }}
      />

      {/* ── HUD frame ─────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        {[
          "left-5 top-20 border-l border-t sm:left-8",
          "right-5 top-20 border-r border-t sm:right-8",
          "bottom-6 left-5 border-b border-l sm:left-8",
          "bottom-6 right-5 border-b border-r sm:right-8",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute h-7 w-7 border-haze/50 ${pos}`}
            style={{
              opacity: mounted ? 1 : 0,
              transition: `opacity 1.4s ease ${0.5 + i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* ── Top meta rails ───────────────────────────────────────── */}
      <div
        ref={metaRef}
        className="pointer-events-none absolute inset-x-0 top-[84px] z-20 hidden justify-between px-8 sm:flex lg:px-12"
      >
        <div className="flex items-center gap-2.5">
          {site.available && (
            <span
              className="h-1.5 w-1.5 rounded-full bg-sodium"
              style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
          )}
          <span className="label text-[9px]">
            {site.available
              ? `Available · ${site.availability}`
              : "Currently booked"}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="label text-[9px] text-ice/45">JAX {time}</span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-1 flex-col justify-end px-6 pb-10 md:px-8 md:pb-20 lg:px-12 short:pb-5"
      >
        {/* Backdrop that travels with the text. A viewport-anchored scrim
            can't guarantee coverage because the block's height changes with
            the headline, the paragraph and the viewport — on a short phone
            the type lands much higher in the frame, right on the mark's
            brightest band. This wash is anchored to the content box and
            bleeds past its top edge, so it always sits behind the words. */}
        <div className="container-x relative !px-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -top-[70%] -bottom-6 -z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(4,5,10,0) 0%, rgba(4,5,10,0.35) 28%, rgba(4,5,10,0.8) 52%, rgba(4,5,10,0.96) 70%, #04050a 84%)",
            }}
          />
          <div className="max-w-3xl">
            <h1
              className="display text-[clamp(2.15rem,8.2vw,7.2rem)] text-bone short:text-[clamp(1.6rem,3.6vw,2.4rem)]"
              style={{
                // Mobile sits the type close to the glowing mark, so the
                // sodium line needs separation to stay legible.
                textShadow:
                  "0 1px 18px rgba(4,5,10,0.85), 0 0 44px rgba(4,5,10,0.6)",
              }}
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <span
                  className="block"
                  style={{
                    transform: mounted ? "none" : "translateY(112%)",
                    transition:
                      "transform 1.3s cubic-bezier(0.16,1,0.3,1) 0.15s",
                  }}
                >
                  Design that
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span
                  className="block"
                  style={{
                    transform: mounted ? "none" : "translateY(112%)",
                    transition:
                      "transform 1.3s cubic-bezier(0.16,1,0.3,1) 0.27s",
                  }}
                >
                  holds up in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span
                  className="block text-sodium"
                  style={{
                    transform: mounted ? "none" : "translateY(112%)",
                    transition:
                      "transform 1.3s cubic-bezier(0.16,1,0.3,1) 0.39s",
                  }}
                >
                  the dark.
                </span>
              </span>
            </h1>
          </div>

          <div
            className="mt-7 flex flex-col gap-5 border-t border-haze/50 pt-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-8 md:pt-8 short:mt-3 short:flex-row short:items-center short:justify-between short:gap-6 short:pt-3"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(20px)",
              transition:
                "opacity 1.1s ease 0.75s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.75s",
            }}
          >
            <p className="max-w-md font-sans text-[14px] leading-relaxed text-bone/55 sm:text-[15px] short:max-w-xs short:text-[11px] short:leading-snug">
              {site.intro}{" "}
              <span className="text-bone/40">{site.location}.</span>
            </p>

            <div className="flex flex-wrap items-center gap-2 min-[380px]:gap-3">
              <Magnetic strength={0.2}>
                <Link
                  to="/work"
                  data-cursor="view"
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-bone px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-void min-[380px]:px-6 min-[380px]:tracking-[0.2em] sm:px-7 sm:py-4 sm:text-[11px] short:px-4 short:py-2 short:text-[9px]"
                >
                  <span className="relative z-10">See the work</span>
                  <span className="absolute inset-0 -translate-x-full bg-sodium transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  to="/lab"
                  data-cursor="view"
                  className="group inline-flex items-center gap-2 border border-haze px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/80 transition-colors duration-500 hover:border-sodium/60 hover:text-bone min-[380px]:px-6 min-[380px]:tracking-[0.2em] sm:px-7 sm:py-4 sm:text-[11px] short:px-4 short:py-2 short:text-[9px]"
                >
                  Enter the lab
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* scroll cue — hidden on short screens where it competes with the
            CTAs for the fold, and pointless at heights where the buttons
            already sit at the bottom edge. */}
        <div
          className="mt-10 items-center gap-3 max-[700px]:hidden md:absolute md:bottom-9 md:right-12 md:mt-0 md:flex"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1s ease 1.4s",
          }}
        >
          <span className="label text-[9px]">Scroll</span>
          <ArrowDown
            className="h-3 w-3 text-mute"
            style={{ animation: "float-slow 2.6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

/* Static scene while the WebGL chunk loads — same composition,
   same grade, so nothing shifts when the 3D arrives. */
function SceneFallback() {
  return (
    <div className="absolute inset-0">
      <img
        src="/nighthawk.jpeg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          filter: "contrast(1.2) saturate(0.55) brightness(0.9)",
          maskImage:
            "radial-gradient(ellipse 58% 54% at 50% 44%, #000 22%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 58% 54% at 50% 44%, #000 22%, transparent 74%)",
        }}
      />
    </div>
  );
}
