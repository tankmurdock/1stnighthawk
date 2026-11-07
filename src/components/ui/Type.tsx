import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { useInViewOnce, useReducedMotion } from "../../hooks/useMotion";
import { cn } from "../../lib/utils";

/* ══════════════════════════════════════════════════════════════════
   SplitLines — reveals type line by line from behind a mask.
   The house reveal. Used for every heading on the site.
   Pass "\n" in the string to control line breaks.
   ══════════════════════════════════════════════════════════════════ */

interface SplitLinesProps {
  children: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export function SplitLines({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.09,
  duration = 1.05,
  once = true,
}: SplitLinesProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLSpanElement>(0.15, once);
  const lines = children.split("\n");

  return (
    <Tag className={cn(className)}>
      <span ref={ref} className="block">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <span
              className="block will-change-transform"
              style={{
                transform: reduced
                  ? "none"
                  : inView
                    ? "translateY(0)"
                    : "translateY(112%)",
                transition: reduced
                  ? "none"
                  : `transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${
                      delay + i * stagger
                    }s`,
              }}
            >
              {line}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Reveal — generic fade + rise for blocks.
   ══════════════════════════════════════════════════════════════════ */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
  as?: ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.12, once);

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        transform: reduced
          ? "none"
          : inView
            ? "none"
            : `translateY(${distance}px)`,
        opacity: reduced ? 1 : inView ? 1 : 0,
        transition: reduced
          ? "none"
          : `transform 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Stagger — reveals direct children in sequence.
   ══════════════════════════════════════════════════════════════════ */

export function Stagger({
  children,
  className,
  baseDelay = 0,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.1);

  return (
    <div ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                transform: reduced
                  ? "none"
                  : inView
                    ? "none"
                    : "translateY(24px)",
                opacity: reduced ? 1 : inView ? 1 : 0,
                transition: reduced
                  ? "none"
                  : `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${
                      baseDelay + i * step
                    }s, opacity 0.7s ease ${baseDelay + i * step}s`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Counter — animates a number when it enters the viewport.
   Writes to the DOM directly so we never re-render per frame.
   ══════════════════════════════════════════════════════════════════ */

export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLSpanElement>(0.4);
  const numRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el || !inView) return;

    const format = (v: number) => v.toFixed(decimals);

    if (reduced) {
      el.textContent = format(to);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / duration);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = format(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={numRef}>{decimals ? (0).toFixed(decimals) : "0"}</span>
      {suffix}
    </span>
  );
}
