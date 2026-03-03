import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import TextReveal from "../shared/TextReveal";
import { projectPreviews } from "./ProjectPreviews";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Corporate Rebrand",
    category: "Brand Identity",
    color: "#d97706",
  },
  {
    id: 2,
    title: "Tech Startup Platform",
    category: "Web Development",
    color: "#34d399",
  },
  {
    id: 3,
    title: "Creative Portfolio",
    category: "UI/UX Design",
    color: "#c9a87c",
  },
  {
    id: 4,
    title: "Fitness App",
    category: "App Design",
    color: "#a78bfa",
  },
  {
    id: 5,
    title: "Adventure Brand",
    category: "Brand Identity",
    color: "#22c55e",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex flex-col justify-center overflow-hidden">
      <div className="px-6 lg:px-8 max-w-7xl mx-auto mb-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <TextReveal
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            stagger={0.05}
          >
            Featured Work
          </TextReveal>
          <Link
            to="/work"
            className="font-sans text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-[3px] link-underline w-fit flex items-center gap-2"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div ref={trackRef} className="flex gap-6 pl-6 lg:pl-8 pr-[30vw] items-start">
        {projects.map((project, i) => (
          <ProjectSlide key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectSlide({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const Preview = projectPreviews[project.id];

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[38vw] lg:w-[30vw] group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          {Preview && <Preview />}
        </motion.div>

        {/* Hover overlay with project info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-sans text-[10px] uppercase tracking-[3px] text-gray-400 mb-1.5 block">
            {project.category}
          </span>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
