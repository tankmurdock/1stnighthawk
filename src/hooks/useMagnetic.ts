import { useRef, useEffect, useCallback, type RefObject } from "react";

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagnetic<T extends HTMLElement>(
  options: MagneticOptions = {}
): RefObject<T | null> {
  const { strength = 0.3, ease = 0.15 } = options;
  const ref = useRef<T>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const animate = useCallback(() => {
    position.current.x += (target.current.x - position.current.x) * ease;
    position.current.y += (target.current.y - position.current.y) * ease;

    if (ref.current) {
      ref.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [ease]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      target.current = {
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      };
    };

    const handleMouseLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [strength, animate]);

  return ref;
}
