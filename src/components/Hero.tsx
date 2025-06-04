import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements with Brand Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gray-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Floating Animated Hawks */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatedHawk
          src="/animated-hawk-1.jpg"
          className="absolute top-32 left-16 md:left-24 lg:left-32 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
          delay={0}
          direction="left"
        />
        <AnimatedHawk
          src="/animated-hawk-2.jpg"
          className="absolute top-48 right-16 md:right-24 lg:right-32 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"
          delay={1.5}
          direction="right"
        />
        <AnimatedHawk
          src="/animated-hawk-4.jpg"
          className="absolute bottom-56 left-8 md:left-12 lg:left-20 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36"
          delay={3}
          direction="left"
        />
        <AnimatedHawk
          src="/animated-hawk-5.jpg"
          className="absolute bottom-32 right-20 md:right-28 lg:right-36 w-18 h-18 md:w-26 md:h-26 lg:w-30 lg:h-30"
          delay={4.5}
          direction="right"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated Logo Centerpiece - Large Display */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
            }}
            className="flex justify-center mb-8 md:mb-12"
          >
            <div className="relative">
              <motion.video
                autoPlay
                loop={false}
                muted
                playsInline
                className="h-32 sm:h-40 md:h-56 lg:h-72 xl:h-80 w-auto max-w-none"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onEnded={(e) => {
                  const video = e.target as HTMLVideoElement;
                  let playCount = parseInt(video.dataset.playCount || "0");
                  playCount++;
                  video.dataset.playCount = playCount.toString();
                  if (playCount < 3) {
                    video.play();
                  }
                }}
              >
                <source src="/1st-nighthawk-animated.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                <img
                  src="/1st-Nighthawk-logo.png"
                  alt="1st Nighthawk Innovations Logo"
                  className="h-32 sm:h-40 md:h-56 lg:h-72 xl:h-80 w-auto"
                />
              </motion.video>
              {/* Enhanced glow effect behind animated logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/40 to-accent-500/40 rounded-full blur-3xl -z-10 scale-125"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-2xl -z-10 scale-150 animate-pulse-slow"></div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8 glass rounded-full text-sm md:text-base font-medium text-primary-700 brand-shadow"
          >
            <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Expert UI/UX Design Systems
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 text-shadow"
          >
            <span className="gradient-text">Craft</span>
            <br />
            <span className="text-gray-900">Perfect UX</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-12 md:mb-16 max-w-5xl mx-auto leading-relaxed px-4"
          >
            Specializing in enterprise-grade UI components and design systems.
            From Material UI to Tailwind CSS, we build cohesive, accessible
            experiences that users love.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16 md:mb-20 px-4"
          >
            <Link to="/components">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(18, 107, 159, 0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 flex items-center brand-glow w-full sm:w-auto"
              >
                View UI Library
                <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" />
              </motion.button>
            </Link>

            <Link to="/design-system">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 md:px-10 py-4 md:py-5 rounded-lg font-medium text-lg md:text-xl text-gray-700 hover:text-primary-600 transition-colors brand-shadow w-full sm:w-auto"
              >
                Design System
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center items-center gap-8 md:gap-12 lg:gap-20 px-4"
          >
            <FeatureIcon icon={Code} label="Component Systems" />
            <FeatureIcon icon={Palette} label="Design Tokens" />
            <FeatureIcon icon={Zap} label="User-Centered" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements with Brand Colors */}
      <FloatingElement
        className="absolute top-1/4 left-12 md:left-16 lg:left-20 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl brand-shadow"
        delay={0}
      />
      <FloatingElement
        className="absolute top-1/3 right-12 md:right-16 lg:right-20 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full brand-shadow"
        delay={1}
      />
      <FloatingElement
        className="absolute bottom-1/3 left-32 md:left-40 lg:left-48 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-3xl brand-shadow"
        delay={2}
      />
      <FloatingElement
        className="absolute bottom-1/3 right-16 md:right-20 lg:right-24 w-16 h-16 md:w-18 md:h-18 bg-gradient-to-br from-primary-600 to-gray-800 rounded-xl brand-shadow"
        delay={0.5}
      />
    </section>
  );
}

function AnimatedHawk({
  src,
  className,
  delay,
  direction,
}: {
  src: string;
  className: string;
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.3,
        x: direction === "left" ? -50 : 50,
        rotate: direction === "left" ? -15 : 15,
      }}
      animate={{
        opacity: [0, 0.7, 0.5],
        scale: [0.3, 1, 0.8],
        x: [
          direction === "left" ? -50 : 50,
          0,
          direction === "left" ? 10 : -10,
        ],
        rotate: [
          direction === "left" ? -15 : 15,
          0,
          direction === "left" ? 5 : -5,
        ],
        y: [-20, 0, -10, 0],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.1,
        rotate: direction === "left" ? -10 : 10,
        transition: { duration: 0.3 },
      }}
      className={`${className} hidden sm:block`}
    >
      <img
        src={src}
        alt="Nighthawk"
        className="w-full h-full object-cover rounded-full opacity-80 shadow-2xl border-2 border-primary-500/30"
        style={{
          filter:
            "sepia(20%) saturate(120%) hue-rotate(200deg) brightness(90%)",
        }}
      />
    </motion.div>
  );
}

function FeatureIcon({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.05 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <div className="glass p-4 md:p-6 rounded-xl md:rounded-2xl mb-2 md:mb-3 group-hover:bg-primary-50 transition-colors brand-shadow">
        <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary-600" />
      </div>
      <span className="text-sm md:text-base font-medium text-gray-700 text-center">
        {label}
      </span>
    </motion.div>
  );
}

function FloatingElement({
  className,
  delay,
}: {
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-15, 15, -15] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      className={`${className} hidden md:block`}
    />
  );
}
