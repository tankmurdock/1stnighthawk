import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useMotion";
import { cn } from "../../lib/utils";

/* ══════════════════════════════════════════════════════════════════
   Cursor — a precision ring that replaces the OS arrow, on the Lab
   only.

   Reasoning: customers arrive to read. A cursor that doesn't look like
   a cursor is charming for ten seconds and then it's friction. The Lab
   is the one place where the visitor has explicitly asked to poke at
   things, so an unfamiliar pointer there reads as part of the exhibit
   rather than an obstacle.

   Everywhere else the native arrow stays — which is why this component
   is mounted inside LabPage and not in the app shell.
   ══════════════════════════════════════════════════════════════════ */

const INTERACTIVE =
  "a,button,input,textarea,select,label,[role='button'],[data-cursor]";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Tracked in state so we can skip rendering the elements entirely on
  // touch devices rather than mounting invisible, unused nodes.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Scoped to the Lab only — see the note above.
    document.documentElement.classList.add("cursor-lab");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      const el = (e.target as HTMLElement)?.closest?.(
        INTERACTIVE,
      ) as HTMLElement | null;
      // 1 = resting, 1.55 = over something you can act on
      targetScale = el ? 1.55 : 1;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => {
      targetScale *= 0.86;
    };
    const onUp = () => {
      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      targetScale = el?.closest?.(INTERACTIVE) ? 1.55 : 1;
    };

    const tick = () => {
      // dot is welded to the pointer — it must feel 1:1
      dot.style.transform = `translate3d(${mx - 2}px, ${my - 2}px, 0)`;

      // ring trails with a soft spring so movement has weight
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      scale += (targetScale - scale) * 0.16;

      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${scale.toFixed(3)})`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-lab");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] hidden md:block"
    >
      {/* hard centre dot — the precise bit */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-bone opacity-0 transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
      {/* ring — large enough to actually track with your eye */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-bone/55 opacity-0 transition-[opacity,border-color] duration-300 ease-out"
        style={{
          willChange: "transform",
          boxShadow:
            "0 0 0 3px rgba(4,5,10,0.45), 0 0 14px rgba(255,160,58,0.18)",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Magnetic — a small, deliberate pull toward the pointer.

   This is intentionally subtle. The previous version engaged from 1.5×
   the element's own width away, which meant buttons drifted before you
   were anywhere near them — it read as a twitch, not as magnetism.
   Now the field is a thin margin around the element itself, and the
   travel is capped so a control never leaves its own footprint.
   ══════════════════════════════════════════════════════════════════ */

/** How far outside the element the pull is felt, in px. */
const PAD = 14;
/** Maximum travel, in px. Keeps small controls feeling anchored. */
const MAX_TRAVEL = 5;

export function Magnetic({
  children,
  className,
  strength = 0.28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const midX = r.left + r.width / 2;
      const midY = r.top + r.height / 2;
      const dx = e.clientX - midX;
      const dy = e.clientY - midY;

      const inside =
        Math.abs(dx) < r.width / 2 + PAD && Math.abs(dy) < r.height / 2 + PAD;

      if (inside) {
        tx = Math.max(-MAX_TRAVEL, Math.min(MAX_TRAVEL, dx * strength));
        ty = Math.max(-MAX_TRAVEL, Math.min(MAX_TRAVEL, dy * strength));
      } else {
        tx = 0;
        ty = 0;
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      // skip the write when we're effectively at rest
      if (Math.abs(cx) > 0.01 || Math.abs(cy) > 0.01) {
        el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, reduced]);

  const Tag = as;

  return (
    <Tag ref={ref as never} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  );
}
