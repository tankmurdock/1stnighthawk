import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import TextReveal from "../shared/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Corporate Rebrand",
    category: "Brand Identity",
    image: "/gallery/corporate-1.jpg",
    color: "#126b9f",
  },
  {
    id: 2,
    title: "Tech Startup Platform",
    category: "Web Development",
    image: "/gallery/tech-1.jpg",
    color: "#14b8a6",
  },
  {
    id: 3,
    title: "Creative Portfolio",
    category: "UI/UX Design",
    image: "/gallery/creative-1.jpg",
    color: "#38bdf8",
  },
  {
    id: 4,
    title: "Fitness App",
    category: "App Design",
    image: "/gallery/fitness-1.jpg",
    color: "#0d9488",
  },
  {
    id: 5,
    title: "Adventure Brand",
    category: "Brand Identity",
    image: "/gallery/adventure-1.jpg",
    color: "#126b9f",
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
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="py-20 px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <TextReveal
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
            stagger={0.05}
          >
            Featured Work
          </TextReveal>
          <Link
            to="/work"
            className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider link-underline w-fit flex items-center gap-2"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div ref={trackRef} className="flex gap-6 pl-6 lg:pl-8 pr-[30vw]">
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

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-40"
            style={{
              background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)`,
            }}
          />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.color}60, transparent 60%)`,
            }}
          />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <span className="text-xs uppercase tracking-wider text-gray-300 mb-2 block">
              {project.category}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h3>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
