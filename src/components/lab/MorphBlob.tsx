import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useMotion";

/* ══════════════════════════════════════════════════════════════════
   03 · MORPH
   Organic forms that never repeat. Rather than animating between
   hand-drawn keyframes (which visibly loops), we sample a continuous
   noise field around a circle each frame — radius, warp and twist all
   drift on independent noise channels.

   240 points at 60fps is cheap enough to run on the main thread.
   ══════════════════════════════════════════════════════════════════ */

const POINTS = 240;

/* 1D value noise — smooth, deterministic, no library */
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

function noise1(x: number) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
}

function fbm1(x: number, octaves = 3) {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < octaves; o++) {
    v += amp * noise1(x * freq);
    freq *= 2;
    amp *= 0.5;
  }
  return v;
}

export function MorphBlob() {
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let raf = 0;
    const start = performance.now();

    const build = (t: number) => {
      const pts: string[] = [];

      for (let i = 0; i < POINTS; i++) {
        const angle = (i / POINTS) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // independent noise channels, slowly drifting
        const r1 = fbm1(t * 0.22 + cos * 1.1 + 10);
        const r2 = fbm1(t * 0.16 + sin * 1.4 + 40);
        const twist = (fbm1(t * 0.12 + angle * 0.6 + 70) - 0.5) * 0.6;

        const radius = 76 + r1 * 32 + r2 * 14;
        const a = angle + twist;

        const x = 140 + Math.cos(a) * radius;
        const y = 140 + Math.sin(a) * radius * (0.92 + r1 * 0.14);

        pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
      }

      path.setAttribute("d", pts.join(" ") + " Z");
    };

    if (reduced) {
      build(0);
      return;
    }

    const tick = (now: number) => {
      build((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
        <div className="relative">
          {/* warm bloom behind the form */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 scale-125 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,160,58,0.30) 0%, transparent 62%)",
            }}
          />
          <svg
            viewBox="0 0 280 280"
            className="relative h-[210px] w-[210px] sm:h-[240px] sm:w-[240px]"
            aria-label="Continuously morphing organic shape"
            role="img"
          >
            <defs>
              <linearGradient id="morph-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffe0b0" />
                <stop offset="45%" stopColor="#ffa03a" />
                <stop offset="100%" stopColor="#ff6a2c" />
              </linearGradient>
            </defs>

            <path ref={pathRef} fill="url(#morph-grad)" opacity="0.9" />
          </svg>
        </div>
      </div>

      <p className="px-8 pb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        It never repeats
      </p>
    </div>
  );
}
