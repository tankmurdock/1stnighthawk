import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "char";
  once?: boolean;
  animate?: "onMount" | "inView";
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
  stagger = 0.03,
  splitBy = "word",
  once = true,
  animate = "inView",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  const shouldAnimate = animate === "onMount" ? true : isInView;

  const elements =
    splitBy === "word"
      ? children.split(" ").map((word, i, arr) => (i < arr.length - 1 ? word + "\u00A0" : word))
      : children.split("");

  return (
    <Tag className={className} ref={ref as never}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="inline">
        {elements.map((el, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={shouldAnimate ? { y: 0 } : { y: "110%" }}
              transition={{
                duration: 0.6,
                delay: delay + i * stagger,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {el}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

interface FadeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  distance?: number;
}

export function FadeReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  distance = 40,
}: FadeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-5%" });

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
