import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    for (let i = 0; i < 35; i++) {
      const p = document.createElement("div");
      p.style.position = "absolute";
      p.style.background = "rgba(0, 200, 255, 0.4)";
      p.style.borderRadius = "50%";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationName = "drift";
      p.style.animationTimingFunction = "linear";
      p.style.animationIterationCount = "infinite";
      p.style.animationDuration = `${10 + Math.random() * 15}s`;
      p.style.animationDelay = `${Math.random() * 12}s`;
      const size = 1 + Math.random() * 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.opacity = `${0.1 + Math.random() * 0.25}`;
      container.appendChild(p);
    }
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

function HoloNoise({ size }: { size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let intervalId: number;
    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 15;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const timer = setTimeout(() => {
      drawNoise();
      intervalId = window.setInterval(drawNoise, 120);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="absolute inset-0 z-[7] opacity-0 mix-blend-overlay pointer-events-none"
      style={{ animation: "fadeIn 1s ease forwards 2.5s" }}
    />
  );
}

export default function BrandIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const overallOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
  const overallScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const overallY = useTransform(scrollYProgress, [0, 0.6], [0, -150]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const c = logoContainerRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / 50;
    const dy = (e.clientY - cy) / 50;
    c.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const hawkSize = 280;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] flex items-center justify-center"
    >
      {/* Background vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, #000 100%)" }}
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 200, 255, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.012) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "fadeIn 2s ease forwards 3s",
        }}
      />

      <Particles />

      {/* Corner decorations */}
      <div className="fixed top-6 left-6 w-[50px] h-[50px] z-[1] opacity-0 border-t border-l border-[#00c8ff22]" style={{ animation: "fadeIn 0.6s ease forwards 3.4s" }} />
      <div className="fixed top-6 right-6 w-[50px] h-[50px] z-[1] opacity-0 border-t border-r border-[#00c8ff22]" style={{ animation: "fadeIn 0.6s ease forwards 3.4s" }} />
      <div className="fixed bottom-6 left-6 w-[50px] h-[50px] z-[1] opacity-0 border-b border-l border-[#00c8ff22]" style={{ animation: "fadeIn 0.6s ease forwards 3.4s" }} />
      <div className="fixed bottom-6 right-6 w-[50px] h-[50px] z-[1] opacity-0 border-b border-r border-[#00c8ff22]" style={{ animation: "fadeIn 0.6s ease forwards 3.4s" }} />

      {/* HUD labels */}
      <span className="fixed top-7 left-[84px] font-sans text-[10px] tracking-[3px] uppercase text-[#27272a] z-[1] opacity-0" style={{ animation: "fadeIn 0.5s ease forwards 3.6s" }}>
        sys:online
      </span>
      <span className="fixed top-7 right-[84px] font-sans text-[10px] tracking-[3px] uppercase text-[#27272a] z-[1] opacity-0" style={{ animation: "fadeIn 0.5s ease forwards 3.6s" }}>
        ui/ux · dev
      </span>
      <span className="fixed bottom-7 left-[84px] font-sans text-[10px] tracking-[3px] uppercase text-[#27272a] z-[1] opacity-0" style={{ animation: "fadeIn 0.5s ease forwards 3.6s" }}>
        v1.0.0
      </span>

      {/* Main centered brand + hawk */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-[90] flex flex-col items-center pointer-events-none"
        style={{
          x: "-50%",
          y: "-50%",
          opacity: overallOpacity,
          scale: overallScale,
          translateY: overallY,
        }}
      >
        <div ref={logoContainerRef} className="flex flex-col items-center gap-9">
          {/* Hawk stage */}
          <div className="relative" style={{ width: hawkSize, height: hawkSize }}>
            {/* Energy rings */}
            {[30, 55, 80].map((inset, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-[rgba(0,200,255,0.05)]"
                style={{
                  inset: `-${inset}px`,
                  opacity: 0,
                  animation: `ringPulse 4s ease-in-out infinite ${2.8 + i * 0.4}s`,
                }}
              />
            ))}

            {/* Deep glow behind hawk */}
            <div
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{
                width: 200,
                height: 200,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(0, 200, 255, 0.12) 0%, transparent 70%)",
                filter: "blur(60px)",
                opacity: 0,
                animation: "fadeIn 2s ease forwards 1.8s, ambientPulse 4s ease-in-out infinite 3.5s",
              }}
            />

            {/* Hawk image */}
            <img
              src="/nighthawk.jpeg"
              alt="Nighthawk"
              className="absolute inset-0 w-full h-full object-contain z-[4]"
              style={{
                opacity: 0,
                transform: "scale(1.08)",
                filter: "brightness(0) saturate(0)",
                animation: "hawkReveal 2s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.5s",
              }}
            />

            {/* Edge highlight layer */}
            <img
              src="/nighthawk.jpeg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain z-[5] mix-blend-screen pointer-events-none"
              style={{
                opacity: 0,
                filter: "contrast(2) brightness(0.4)",
                animation: "fadeIn 1.5s ease forwards 2s",
              }}
            />

            {/* Eye glows */}
            <div
              className="absolute z-[5]"
              style={{
                width: 40, height: 20,
                top: "42.5%", left: "28%",
                transform: "rotate(-5deg)",
                background: "radial-gradient(ellipse, rgba(0, 200, 255, 0.9) 0%, rgba(0, 120, 255, 0.4) 40%, transparent 70%)",
                filter: "blur(12px)",
                opacity: 0,
                animation: "eyeFlash 0.6s ease forwards 2.2s, eyeBreathe 3s ease-in-out infinite 2.8s",
              }}
            />
            <div
              className="absolute z-[5]"
              style={{
                width: 40, height: 20,
                top: "42.5%", left: "55%",
                transform: "rotate(5deg)",
                background: "radial-gradient(ellipse, rgba(0, 200, 255, 0.9) 0%, rgba(0, 120, 255, 0.4) 40%, transparent 70%)",
                filter: "blur(12px)",
                opacity: 0,
                animation: "eyeFlash 0.6s ease forwards 2.2s, eyeBreathe 3s ease-in-out infinite 2.8s",
              }}
            />

            {/* Eye flares */}
            <div
              className="absolute z-[5]"
              style={{
                width: 80, height: 3,
                top: "43.5%", left: "18%",
                background: "linear-gradient(90deg, transparent, rgba(0, 200, 255, 0.7), transparent)",
                filter: "blur(2px)",
                opacity: 0,
                animation: "flareIn 0.8s ease forwards 2.4s",
              }}
            />
            <div
              className="absolute z-[5]"
              style={{
                width: 80, height: 3,
                top: "43.5%", left: "50%",
                background: "linear-gradient(90deg, transparent, rgba(0, 200, 255, 0.7), transparent)",
                filter: "blur(2px)",
                opacity: 0,
                animation: "flareIn 0.8s ease forwards 2.4s",
              }}
            />

            {/* Scan line */}
            <div
              className="absolute left-[5%] right-[5%] z-[6] pointer-events-none"
              style={{
                height: 2,
                top: "5%",
                background: "linear-gradient(90deg, transparent, rgba(0, 200, 255, 0.5), rgba(0, 200, 255, 0.7), rgba(0, 200, 255, 0.5), transparent)",
                boxShadow: "0 0 15px rgba(0, 200, 255, 0.3)",
                opacity: 0,
                animation: "scanDown 5s ease-in-out infinite 3.5s",
              }}
            />

            {/* Holographic noise */}
            <HoloNoise size={hawkSize} />
          </div>

          {/* Brand text */}
          <div className="text-center relative z-[2]">
            <div
              className="font-display font-normal text-[15px] tracking-[18px] uppercase mb-1.5 text-shadow-cyan"
              style={{
                color: "#00c8ff",
                opacity: 0,
                transform: "translateY(12px)",
                animation: "textUp 0.8s ease forwards 2.6s",
              }}
            >
              1 s t
            </div>

            <div
              className="font-display font-black text-4xl tracking-[10px] uppercase"
              style={{
                background: "linear-gradient(135deg, #e4e4e7 0%, #71717a 35%, #00c8ff 55%, #a1a1aa 75%, #e4e4e7 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0,
                transform: "translateY(12px)",
                animation: "textUp 1s ease forwards 2.8s, shimmer 8s linear infinite 3.8s",
              }}
            >
              Nighthawk
            </div>

            <div
              className="mx-auto my-2"
              style={{
                width: 0,
                height: 1,
                background: "linear-gradient(90deg, transparent, #00c8ff, transparent)",
                animation: "lineExpand 1.2s ease forwards 3.0s",
              }}
            />

            <div
              className="font-sans font-light text-sm tracking-[14px] uppercase mt-1.5"
              style={{
                color: "#52525b",
                opacity: 0,
                transform: "translateY(12px)",
                animation: "textUp 0.8s ease forwards 3.2s",
              }}
            >
              Innovations
            </div>

            <div
              className="font-sans font-medium text-[11px] tracking-[6px] uppercase mt-4"
              style={{
                color: "#3f3f46",
                opacity: 0,
                transform: "translateY(12px)",
                animation: "textUp 0.8s ease forwards 3.5s",
              }}
            >
              Precision UI · Fearless UX
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#3f3f46]">
              Scroll
            </span>
          </motion.div>
          <div className="w-px h-6 bg-gradient-to-b from-[#3f3f46] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
