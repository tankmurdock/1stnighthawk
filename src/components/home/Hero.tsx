import { Suspense, lazy, useEffect, useState } from "react";
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
  const [scrollY, setScrollY] = useState(0);
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

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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

  // content recedes as you scroll — the camera "leaves" the mark behind
  const fade = reduced ? 0 : Math.min(1, scrollY / 560);
  const lift = reduced ? 0 : scrollY * 0.22;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-void">
      {/* ── 3D layer ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${lift * 0.35}px)`,
          opacity: 1 - fade * 0.55,
        }}
      >
        {/* On phones the mark sits high and small so the headline owns the
            lower two thirds; on desktop it can be the full centrepiece. */}
        <div className="absolute inset-x-0 top-0 h-[62%] origin-top scale-[0.86] sm:inset-0 sm:h-full sm:scale-100">
          {mounted ? (
            <Suspense fallback={<SceneFallback />}>
              <HawkScene className="absolute inset-0" />
            </Suspense>
          ) : (
            <SceneFallback />
          )}
        </div>
      </div>

      {/* ── Atmosphere: horizon glow at the floor ─────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 118%, rgba(255,160,58,0.20) 0%, rgba(255,106,44,0.07) 38%, transparent 72%)",
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
        className="pointer-events-none absolute inset-x-0 top-[84px] z-20 hidden justify-between px-8 sm:flex lg:px-12"
        style={{
          opacity: Math.max(0, 1 - fade * 1.6),
          transition: "opacity 0.2s linear",
        }}
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
        className="relative z-20 flex min-h-[100svh] flex-col justify-end px-6 pb-16 sm:px-8 sm:pb-20 lg:px-12"
        style={{
          transform: `translateY(${-lift}px)`,
          opacity: 1 - fade,
        }}
      >
        <div className="container-x !px-0">
          <div className="max-w-3xl">
            <h1 className="display text-[clamp(2.9rem,8.2vw,7.2rem)] text-bone">
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
            className="mt-10 flex flex-col gap-8 border-t border-haze/50 pt-8 sm:flex-row sm:items-end sm:justify-between"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(20px)",
              transition:
                "opacity 1.1s ease 0.75s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.75s",
            }}
          >
            <p className="max-w-md font-sans text-[15px] leading-relaxed text-bone/55">
              {site.role} in {site.location}. I design the interface and then
              build it — motion, 3D and design system included. No handoff gap.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <Link
                  to="/work"
                  data-cursor="view"
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-bone px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-void"
                >
                  <span className="relative z-10">See the work</span>
                  <span className="absolute inset-0 -translate-x-full bg-sodium transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  to="/lab"
                  data-cursor="view"
                  className="group inline-flex items-center gap-2 border border-haze px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80 transition-colors duration-500 hover:border-sodium/60 hover:text-bone"
                >
                  Enter the lab
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div
          className="mt-12 flex items-center gap-3 sm:absolute sm:bottom-9 sm:right-12 sm:mt-0"
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
