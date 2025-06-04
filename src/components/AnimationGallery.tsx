import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

export default function AnimationGallery() {
  const [selectedAnimation, setSelectedAnimation] = useState("entrance");

  const animationCategories = [
    { id: "entrance", name: "Entrance", icon: "🎭" },
    { id: "hover", name: "Hover Effects", icon: "👆" },
    { id: "scroll", name: "Scroll Triggered", icon: "📜" },
    { id: "loading", name: "Loading", icon: "⏳" },
    { id: "transitions", name: "Transitions", icon: "🔄" },
    { id: "hawks", name: "Nighthawk Specials", icon: "🦅" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 relative overflow-hidden">
      {/* Animated Background Hawks */}
      <div className="absolute inset-0 pointer-events-none">
        <SoaringHawk
          src="/animated-hawk-1.jpg"
          className="absolute top-32 left-8 md:left-12 lg:left-16"
          delay={0}
          path="curved"
        />
        <SoaringHawk
          src="/animated-hawk-2.jpg"
          className="absolute bottom-40 right-8 md:right-12 lg:right-16"
          delay={2}
          path="spiral"
        />
        <SoaringHawk
          src="/hawks1.jpg"
          className="absolute top-2/3 left-8 md:left-12 lg:left-16"
          delay={4}
          path="figure8"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-8 leading-relaxed py-2">
            Animation Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore smooth, engaging animations that bring your interfaces to
            life. From subtle micro-interactions to eye-catching transitions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {animationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedAnimation(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedAnimation === category.id
                  ? "bg-primary-500 text-white shadow-lg"
                  : "glass hover:bg-primary-50"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Animation Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAnimation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {selectedAnimation === "entrance" && <EntranceAnimations />}
            {selectedAnimation === "hover" && <HoverAnimations />}
            {selectedAnimation === "scroll" && <ScrollAnimations />}
            {selectedAnimation === "loading" && <LoadingAnimations />}
            {selectedAnimation === "transitions" && <TransitionAnimations />}
            {selectedAnimation === "hawks" && <NighthawkAnimations />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SoaringHawk({
  src,
  className,
  delay,
  path,
}: {
  src: string;
  className: string;
  delay: number;
  path: "curved" | "spiral" | "figure8";
}) {
  const getPathAnimation = () => {
    switch (path) {
      case "curved":
        return {
          x: [-50, 100, 200, 300],
          y: [0, -30, 30, -15],
          rotate: [0, 15, -10, 5],
        };
      case "spiral":
        return {
          x: [0, 60, 0, -60, 0],
          y: [0, -30, -60, -30, 0],
          rotate: [0, 90, 180, 270, 360],
        };
      case "figure8":
        return {
          x: [-30, 0, 30, 0, -30],
          y: [0, -20, 0, 20, 0],
          rotate: [0, 45, 0, -45, 0],
        };
      default:
        return { x: 0, y: 0, rotate: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{
        opacity: [0, 0.6, 0.4, 0.6],
        scale: [0.3, 1, 0.8, 1],
        ...getPathAnimation(),
      }}
      transition={{
        duration: 15,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`${className} w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 hidden sm:block`}
    >
      <img
        src={src}
        alt="Soaring Nighthawk"
        className="w-full h-full object-cover rounded-full opacity-70 shadow-lg"
        style={{
          filter:
            "sepia(15%) saturate(120%) hue-rotate(200deg) brightness(85%)",
        }}
      />
    </motion.div>
  );
}

function EntranceAnimations() {
  return (
    <>
      <AnimationCard title="Fade In">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          className="w-16 h-16 bg-primary-500 rounded-lg"
        />
      </AnimationCard>

      <AnimationCard title="Slide Up">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
          className="w-16 h-16 bg-accent-500 rounded-lg"
        />
      </AnimationCard>

      <AnimationCard title="Scale In">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
          className="w-16 h-16 bg-blue-500 rounded-lg"
        />
      </AnimationCard>

      <AnimationCard title="Bounce In">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            damping: 5,
            stiffness: 300,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          className="w-16 h-16 bg-green-500 rounded-lg"
        />
      </AnimationCard>

      <AnimationCard title="Rotate In">
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
          className="w-16 h-16 bg-purple-500 rounded-lg"
        />
      </AnimationCard>

      <AnimationCard title="Flip In">
        <motion.div
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
          className="w-16 h-16 bg-pink-500 rounded-lg"
        />
      </AnimationCard>
    </>
  );
}

function HoverAnimations() {
  return (
    <>
      <AnimationCard title="Scale Hover">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-16 h-16 bg-primary-500 rounded-lg cursor-pointer"
        />
      </AnimationCard>

      <AnimationCard title="Rotate Hover">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 bg-accent-500 rounded-lg cursor-pointer"
        />
      </AnimationCard>

      <AnimationCard title="Glow Effect">
        <motion.div
          whileHover={{
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)",
            scale: 1.05,
          }}
          className="w-16 h-16 bg-blue-500 rounded-lg cursor-pointer"
        />
      </AnimationCard>

      <AnimationCard title="Bounce Hover">
        <motion.div
          whileHover={{
            y: [-5, 0, -5],
            transition: { duration: 0.3, repeat: Infinity },
          }}
          className="w-16 h-16 bg-green-500 rounded-lg cursor-pointer"
        />
      </AnimationCard>

      <AnimationCard title="Skew Effect">
        <motion.div
          whileHover={{ skewY: 5, scale: 1.1 }}
          className="w-16 h-16 bg-purple-500 rounded-lg cursor-pointer"
        />
      </AnimationCard>

      <AnimationCard title="Color Shift">
        <motion.div
          whileHover={{ backgroundColor: "#f59e0b" }}
          className="w-16 h-16 bg-pink-500 rounded-lg cursor-pointer"
        />
      </AnimationCard>
    </>
  );
}

function ScrollAnimations() {
  return (
    <>
      <AnimationCard title="Scroll Fade">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="w-16 h-16 bg-primary-500 rounded-lg"
        />
      </AnimationCard>

      <AnimationCard title="Stagger Effect">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: false }}
              className="w-4 h-16 bg-accent-500 rounded"
            />
          ))}
        </div>
      </AnimationCard>

      <AnimationCard title="Progress Bar">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 2 }}
            viewport={{ once: false }}
            className="bg-blue-500 h-2 rounded-full"
          />
        </div>
      </AnimationCard>
    </>
  );
}

function LoadingAnimations() {
  return (
    <>
      <AnimationCard title="Spinner">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </AnimationCard>

      <AnimationCard title="Pulse">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-16 h-16 bg-accent-500 rounded-full"
        />
      </AnimationCard>

      <AnimationCard title="Dots">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [-5, 0, -5] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-blue-500 rounded-full"
            />
          ))}
        </div>
      </AnimationCard>

      <AnimationCard title="Wave">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-2 h-8 bg-green-500 rounded"
            />
          ))}
        </div>
      </AnimationCard>
    </>
  );
}

function TransitionAnimations() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <AnimationCard title="Layout Animation">
        <motion.div
          layout
          onClick={() => setIsToggled(!isToggled)}
          className={`bg-primary-500 rounded-lg cursor-pointer ${
            isToggled ? "w-20 h-8" : "w-16 h-16"
          }`}
        />
      </AnimationCard>

      <AnimationCard title="Morphing Shape">
        <motion.div
          animate={{
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-accent-500"
        />
      </AnimationCard>

      <AnimationCard title="Path Animation">
        <motion.div
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, -20, 0, -20, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-8 h-8 bg-blue-500 rounded-full"
        />
      </AnimationCard>
    </>
  );
}

function NighthawkAnimations() {
  return (
    <>
      <AnimationCard title="Soaring Entry">
        <motion.div
          initial={{ x: -100, y: 50, rotate: -45, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            type: "spring",
            stiffness: 100,
          }}
          className="w-12 h-12"
        >
          <img
            src="/animated-hawk-1.jpg"
            alt="Soaring Hawk"
            className="w-full h-full object-cover rounded-full border-2 border-primary-500"
          />
        </motion.div>
      </AnimationCard>

      <AnimationCard title="Diving Attack">
        <motion.div
          initial={{ y: -50, scale: 0.5, rotate: 180 }}
          animate={{ y: 0, scale: 1, rotate: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeOut",
          }}
          className="w-12 h-12"
        >
          <img
            src="/animated-hawk-2.jpg"
            alt="Diving Hawk"
            className="w-full h-full object-cover rounded-full border-2 border-accent-500"
          />
        </motion.div>
      </AnimationCard>

      <AnimationCard title="Circular Hunt">
        <motion.div
          animate={{
            rotate: 360,
            x: [0, 20, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-12 h-12"
        >
          <img
            src="/hawks2.jpg"
            alt="Hunting Hawk"
            className="w-full h-full object-cover rounded-full border-2 border-gray-600"
          />
        </motion.div>
      </AnimationCard>

      <AnimationCard title="Formation Flight">
        <div className="flex space-x-2">
          {["/hawks1.jpg", "/hawks3.jpg", "/animated-hawk-3.jpg"].map(
            (src, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: [20, 0, -10, 0],
                  opacity: [0, 1, 1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
                className="w-8 h-8"
              >
                <img
                  src={src}
                  alt={`Formation Hawk ${index + 1}`}
                  className="w-full h-full object-cover rounded-full border border-primary-400"
                />
              </motion.div>
            )
          )}
        </div>
      </AnimationCard>

      <AnimationCard title="Predator Focus">
        <motion.div
          whileHover={{
            scale: [1, 1.3, 1.1],
            rotate: [0, 10, -5, 0],
            boxShadow: [
              "0 0 0 rgba(18, 107, 159, 0)",
              "0 0 20px rgba(18, 107, 159, 0.6)",
              "0 0 40px rgba(18, 107, 159, 0.4)",
            ],
          }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 cursor-pointer"
        >
          <img
            src="/animated-hawk-4.jpg"
            alt="Focused Hawk"
            className="w-full h-full object-cover rounded-full border-2 border-primary-500"
          />
        </motion.div>
      </AnimationCard>

      <AnimationCard title="Wind Rider">
        <motion.div
          animate={{
            x: [-20, 20, -10, 15, 0],
            y: [-10, 5, -15, 10, 0],
            rotate: [-5, 5, -3, 3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-14 h-14"
        >
          <img
            src="/hawks3.jpg"
            alt="Wind Riding Hawk"
            className="w-full h-full object-cover rounded-full border-2 border-accent-500 shadow-lg"
          />
        </motion.div>
      </AnimationCard>
    </>
  );
}

function AnimationCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
            title="Play animation"
            aria-label="Play animation"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
            title="Reset animation"
            aria-label="Reset animation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[120px] border border-gray-100 rounded-lg bg-gray-50">
        {children}
      </div>
    </motion.div>
  );
}
