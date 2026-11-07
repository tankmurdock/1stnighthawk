import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useMotion";

/* ══════════════════════════════════════════════════════════════════
   02 · MAGNETIC FIELD
   A grid that displaces under the pointer with real distance falloff
   and a spring return. DOM + rAF only — no library, no per-cell React
   state. 400 cells, one loop.
   ══════════════════════════════════════════════════════════════════ */

const COLS = 20;
const ROWS = 11;
const INFLUENCE = 150; // px

export function MagneticGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (reduced) return;

    const cells = Array.from(grid.children) as HTMLElement[];
    const state = cells.map(() => ({ x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 }));

    let mx = -9999;
    let my = -9999;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = grid.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;

      cells.forEach((cell, i) => {
        const cx = cell.offsetLeft + cell.offsetWidth / 2;
        const cy = cell.offsetTop + cell.offsetHeight / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.hypot(dx, dy);

        if (dist < INFLUENCE) {
          // cubic falloff — sharp near the pointer, soft at the edge
          const f = Math.pow(1 - dist / INFLUENCE, 2);
          state[i].tx = (dx / (dist || 1)) * f * 16;
          state[i].ty = (dy / (dist || 1)) * f * 16;
          state[i].ts = f * 0.85;
        } else {
          state[i].tx = 0;
          state[i].ty = 0;
          state[i].ts = 0;
        }
      });
    };

    const onLeave = () => {
      mx = -9999;
      my = -9999;
      state.forEach((st) => {
        st.tx = 0;
        st.ty = 0;
        st.ts = 0;
      });
    };

    const tick = () => {
      for (let i = 0; i < cells.length; i++) {
        const st = state[i];
        // spring with slight overshoot on return
        st.x += (st.tx - st.x) * 0.14;
        st.y += (st.ty - st.y) * 0.14;
        st.s += (st.ts - st.s) * 0.1;

        if (Math.abs(st.x) > 0.01 || Math.abs(st.y) > 0.01 || st.s > 0.001) {
          cells[i].style.transform =
            `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(
              2,
            )}px, 0) scale(${(1 + st.s * 0.28).toFixed(3)})`;
          cells[i].style.backgroundColor =
            `rgba(255,160,58,${(st.s * 0.5).toFixed(3)})`;
        } else if (st.x !== 0 || st.y !== 0) {
          cells[i].style.transform = "";
          cells[i].style.backgroundColor = "";
          st.x = st.y = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    grid.addEventListener("pointermove", onMove);
    grid.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
        <div className="relative w-full max-w-md">
          <div
            ref={gridRef}
            className="relative grid w-full"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gap: "5px",
            }}
            data-cursor="hover"
          >
            {Array.from({ length: COLS * ROWS }).map((_, i) => (
              <span
                key={i}
                className="aspect-square rounded-[1px] bg-bone/[0.08]"
                style={{
                  willChange: "transform",
                  transition: "background-color 0.4s ease",
                }}
              />
            ))}
          </div>
          {/* soft vignette so the field fades at the edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, #0c121d 100%)",
            }}
          />
        </div>
      </div>
      <p className="px-8 pb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        Move slowly to feel the falloff
      </p>
    </div>
  );
}
