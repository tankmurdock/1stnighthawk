import { useEffect, useRef, type ReactNode } from "react";

/* ══════════════════════════════════════════════════════════════════
   Page transition — deliberately tiny.

   AnimatePresence forces the router to keep both trees mounted and
   delays the new page until the old one has finished exiting. That
   makes every click feel slower than the network actually is, and it
   drags framer-motion into the critical bundle.

   Instead: new route renders immediately, then fades itself in. Same
   perceived polish, none of the delay, ~120KB lighter.
   ══════════════════════════════════════════════════════════════════ */

export default function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";

    // one frame so the browser has the initial state, then animate in
    const id = requestAnimationFrame(() => {
      el.style.transition =
        "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "none";
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return <div ref={ref}>{children}</div>;
}
