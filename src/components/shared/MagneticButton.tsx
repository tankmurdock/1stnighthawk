import type { ReactNode } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>({ strength });

  return (
    <button ref={ref} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
