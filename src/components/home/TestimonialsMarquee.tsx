import { motion } from "framer-motion";
import TextReveal from "../shared/TextReveal";

const testimonials = [
  {
    quote: "Nighthawk transformed our entire digital presence. The attention to detail is unmatched.",
    author: "Sarah Chen",
    role: "CEO, TechVault",
  },
  {
    quote: "The design system they built saved us hundreds of engineering hours. Pure craftmanship.",
    author: "Marcus Rivera",
    role: "CTO, DataFlow",
  },
  {
    quote: "Working with them felt like having an in-house design team that truly gets our brand.",
    author: "Emily Watson",
    role: "VP Design, Nextera",
  },
  {
    quote: "Our conversion rates jumped 40% after the redesign. The ROI speaks for itself.",
    author: "James Park",
    role: "Founder, GrowthLab",
  },
  {
    quote: "They don't just design interfaces — they craft experiences that users remember.",
    author: "Olivia Martinez",
    role: "Product Lead, Cosmos",
  },
  {
    quote: "From concept to launch in 6 weeks. Fastest turnaround without sacrificing quality.",
    author: "Daniel Kim",
    role: "Director, SwiftScale",
  },
];

const doubledTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsMarquee() {
  return (
    <section className="py-32 sm:py-40 overflow-hidden">
      <div className="px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <TextReveal
          as="h2"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          stagger={0.05}
        >
          What they say
        </TextReveal>
      </div>

      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-navy to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 group-hover:[animation-play-state:paused]"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {doubledTestimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[350px] sm:w-[400px] glass rounded-2xl p-8 transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="text-white text-sm font-semibold">{t.author}</p>
                <p className="text-gray-500 text-xs mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative group mt-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-navy to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 group-hover:[animation-play-state:paused]"
          style={{ animation: "marquee-reverse 45s linear infinite" }}
        >
          {[...doubledTestimonials].reverse().map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[350px] sm:w-[400px] glass rounded-2xl p-8 transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="text-white text-sm font-semibold">{t.author}</p>
                <p className="text-gray-500 text-xs mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
