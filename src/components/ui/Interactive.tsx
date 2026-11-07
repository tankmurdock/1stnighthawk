import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useMotion";
import { cn } from "../../lib/utils";

/* ══════════════════════════════════════════════════════════════════
   Cursor — one element, driven entirely by rAF + direct transform
   writes. It reads intent from the DOM (data-cursor="label") rather
   than guessing from tags, so any element can declare what it is.

   Never uses React state for position: no re-render per frame.
   ══════════════════════════════════════════════════════════════════ */

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // touch / coarse pointer devices get the native cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const setLabel = (text: string) => {
      label.textContent = text;
      label.style.opacity = text ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ring.style.borderColor = "rgba(244,241,234,0.28)";
      }

      // read intent from the element under the pointer
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor],a,button,input,textarea,select,[role='button']",
      ) as HTMLElement | null;

      const declared = el?.dataset?.cursor;

      if (declared && declared !== "hover") {
        setLabel(declared);
        targetScale = 2.15;
        ring.style.background = "rgba(255,160,58,0.10)";
        ring.style.borderColor = "rgba(255,160,58,0.55)";
      } else if (el) {
        setLabel("");
        targetScale = 1.7;
        ring.style.background = "rgba(255,160,58,0.06)";
        ring.style.borderColor = "rgba(255,160,58,0.45)";
      } else {
        setLabel("");
        targetScale = 1;
        ring.style.background = "transparent";
        ring.style.borderColor = "rgba(244,241,234,0.28)";
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => {
      targetScale *= 0.82;
    };
    const onUp = () => {
      // re-resolve intent on release
      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      const interactive = el?.closest?.(
        "[data-cursor],a,button,input,textarea,select,[role='button']",
      );
      targetScale = interactive ? 1.7 : 1;
    };

    const tick = () => {
      // dot tracks nearly 1:1 — it should feel welded to the pointer
      dot.style.transform = `translate3d(${mx - 2}px, ${my - 2}px, 0)`;

      // ring lags with a soft spring
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;

      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${scale})`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] hidden md:block"
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-sodium opacity-0 transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border opacity-0 transition-[opacity,background-color,border-color] duration-300 ease-out"
        style={{
          borderColor: "rgba(244,241,234,0.28)",
          willChange: "transform",
          backdropFilter: "blur(1px)",
        }}
      >
        <span
          ref={labelRef}
          className="select-none font-mono text-[5px] uppercase tracking-[0.18em] text-sodium opacity-0 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Magnetic — pulls an element toward the pointer, releasing with a
   spring. Strength is measured against the element's own size so it
   feels identical on a 40px chip and a 300px card.
   ══════════════════════════════════════════════════════════════════ */

export function Magnetic({
  children,
  className,
  strength = 0.38,
  radius = 1.5,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  /** how far outside the bounds the field extends, in element-widths */
  radius?: number;
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

      const reachX = r.width * radius;
      const reachY = r.height * radius;

      if (Math.abs(dx) < reachX && Math.abs(dy) < reachY) {
        tx = dx * strength;
        ty = dy * strength;
      } else {
        tx = 0;
        ty = 0;
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, radius, reduced]);

  const Tag = as;

  return (
    <Tag ref={ref as never} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  );
}
