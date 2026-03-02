import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TextReveal, { FadeReveal } from "../shared/TextReveal";

const services = [
  {
    number: "01",
    title: "UI/UX Design",
    description:
      "User-centered design that balances aesthetics with functionality. Research-driven interfaces that convert visitors into loyal customers.",
  },
  {
    number: "02",
    title: "Design Systems",
    description:
      "Scalable component libraries and design tokens across Material UI, Tailwind, Shadcn/ui, and more. Consistency at every touchpoint.",
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "High-performance React applications with fluid animations, 3D experiences, and pixel-perfect implementations that push boundaries.",
  },
  {
    number: "04",
    title: "Brand Identity",
    description:
      "Complete visual identities from logo design to digital presence. We craft brands that resonate and stand apart in crowded markets.",
  },
];

export default function Services() {
  return (
    <section className="py-32 sm:py-40 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-20 sm:mb-28">
        <TextReveal
          as="h2"
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          stagger={0.05}
        >
          What we do
        </TextReveal>
        <FadeReveal delay={0.3} className="mt-6">
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl">
            Comprehensive digital design and development, from first pixel to final deploy.
          </p>
        </FadeReveal>
      </div>

      <div className="space-y-0">
        {services.map((service, i) => (
          <ServiceItem key={service.number} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceItem({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border-t border-white/[0.06] py-10 sm:py-14"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          className="font-mono text-sm text-[#00c8ff] tracking-wider"
        >
          {service.number}
        </motion.span>

        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#00c8ff] transition-colors duration-500"
          >
            {service.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.25 + index * 0.1 }}
            className="text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {service.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
