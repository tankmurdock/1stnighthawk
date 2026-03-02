import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] z-[9995] origin-left"
      style={{ background: "linear-gradient(90deg, transparent, #00c8ff, transparent)" }}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
