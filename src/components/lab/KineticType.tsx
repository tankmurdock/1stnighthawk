import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useMotion";

/* ══════════════════════════════════════════════════════════════════
   05 · KINETIC TYPE
   Variable-font display type where weight and width respond to scroll
   velocity. Scroll fast and the letterforms thicken and compress.

   Uses Bricolage Grotesque's wght + wdth axes directly — no second
   font file, just axis interpolation.
   ══════════════════════════════════════════════════════════════════ */

export function KineticType() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!("fontVariationSettings" in document.documentElement.style)) {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !supported) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let smooth = 0;
    let raf = 0;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        velocity = Math.min(1, Math.abs(y - lastY) / 45);
        lastY = y;
        frame = 0;
      });
    };

    const tick = () => {
      // decay so it settles when you stop
      velocity *= 0.94;
      smooth += (velocity - smooth) * 0.18;

      const weight = 300 + smooth * 500; // 300 → 800
      const width = 100 - smooth * 22; // 100 → 78
      const skew = smooth * -4;

      el.style.fontVariationSettings = `"wght" ${weight.toFixed(0)}, "wdth" ${width.toFixed(
        1,
      )}`;
      el.style.transform = `skewX(${skew.toFixed(2)}deg)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, supported]);

  return (
    <div className="flex h-full flex-col justify-center overflow-hidden">
      <div className="px-6 sm:px-8">
        <div
          ref={ref}
          className="origin-left font-display leading-[0.85] tracking-[-0.04em] text-bone will-change-transform"
          style={{
            fontSize: "clamp(2rem, 9vw, 4.6rem)",
            fontVariationSettings: '"wght" 380, "wdth" 100',
            transition: reduced ? "none" : undefined,
          }}
        >
          MOMENTUM
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="hairline flex-1" />
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-mute">
            {supported ? "wght 300–800 · wdth 78–100" : "Static fallback"}
          </span>
        </div>
      </div>

      <p className="px-8 pb-8 pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        Scroll the page to load the letters
      </p>
    </div>
  );
}
