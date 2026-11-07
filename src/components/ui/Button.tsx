import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Magnetic } from "./Interactive";

/* ══════════════════════════════════════════════════════════════════
   Button system — one component, three intents.
   Sodium is reserved for the single primary action on a screen.
   ══════════════════════════════════════════════════════════════════ */

type Variant = "primary" | "ghost" | "quiet";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500";

const styles: Record<Variant, string> = {
  primary: "bg-sodium text-void px-7 py-4 hover:bg-[#ffb055] font-medium",
  ghost:
    "border border-haze text-bone/85 px-7 py-4 hover:border-sodium/60 hover:text-bone",
  quiet: "px-1 py-1 text-mute hover:text-bone",
};

function Inner({ children, icon }: { children: ReactNode; icon?: boolean }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );
}

export function LinkButton({
  to,
  children,
  variant = "primary",
  className,
  icon = true,
  onClick,
}: BaseProps & { to: string; onClick?: () => void }) {
  return (
    <Magnetic className="inline-block" strength={0.22}>
      <Link
        to={to}
        onClick={onClick}
        className={cn(base, styles[variant], className)}
      >
        <Inner icon={icon}>{children}</Inner>
      </Link>
    </Magnetic>
  );
}

export function ActionButton({
  children,
  variant = "primary",
  className,
  icon = true,
  onClick,
  type = "button",
  disabled,
}: BaseProps & {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <Magnetic className="inline-block" strength={0.22}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          base,
          styles[variant],
          className,
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <Inner icon={icon}>{children}</Inner>
      </button>
    </Magnetic>
  );
}

/* Small section eyebrow: index + label + rule */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {index && <span className="label text-sodium/70">{index}</span>}
      <span className="label">{children}</span>
      <span className="hairline hidden flex-1 sm:block" />
    </div>
  );
}
