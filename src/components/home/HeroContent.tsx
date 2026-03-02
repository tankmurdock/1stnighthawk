import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TextReveal from "../shared/TextReveal";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <span className="inline-flex items-center px-4 py-2 glass text-xs sm:text-sm font-medium text-[#00c8ff] tracking-[3px] uppercase font-sans">
          UI/UX Design Studio
        </span>
      </motion.div>

      <TextReveal
        as="h1"
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-4"
        delay={0.1}
        stagger={0.06}
        splitBy="word"
      >
        Craft Perfect
      </TextReveal>

      <TextReveal
        as="h1"
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold gradient-text leading-[0.9] tracking-tight mb-8 sm:mb-12"
        delay={0.3}
        stagger={0.06}
        splitBy="word"
      >
        Experiences
      </TextReveal>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
      >
        We design and build immersive digital experiences that captivate
        audiences and elevate brands. Expert UI/UX from concept to code.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link to="/work">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-base sm:text-lg group"
          >
            <span className="flex items-center gap-2">
              View Our Work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        </Link>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline text-base sm:text-lg"
          >
            Start a Project
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
