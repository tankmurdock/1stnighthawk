import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.random() * 18 + 8;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [progress, phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
        >
          <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{
                background: "linear-gradient(90deg, transparent, #00c8ff, transparent)",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-sans text-[10px] text-[#27272a] tracking-[4px] uppercase"
          >
            initializing
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
