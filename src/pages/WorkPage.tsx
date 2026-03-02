import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import TextReveal, { FadeReveal } from "../components/shared/TextReveal";

const categories = ["All", "Brand Identity", "Web Development", "UI/UX Design", "App Design"];

const projects = [
  {
    id: 1,
    title: "TechVault Platform",
    category: "Web Development",
    description:
      "Complete platform redesign for a leading tech company. Increased user engagement by 65% through intuitive navigation and modern UI patterns.",
    image: "/gallery/tech-1.jpg",
    color: "#126b9f",
    size: "large",
    year: "2024",
    services: ["UI/UX Design", "Frontend Development", "Design System"],
  },
  {
    id: 2,
    title: "Nextera Rebrand",
    category: "Brand Identity",
    description:
      "End-to-end brand identity refresh. From logo redesign to comprehensive digital guidelines that unified 12 product lines.",
    image: "/gallery/corporate-1.jpg",
    color: "#14b8a6",
    size: "medium",
    year: "2024",
    services: ["Brand Strategy", "Logo Design", "Brand Guidelines"],
  },
  {
    id: 3,
    title: "GrowthLab Dashboard",
    category: "UI/UX Design",
    description:
      "Analytics dashboard with real-time data visualization. Reduced average task completion time by 40% through streamlined workflows.",
    image: "/gallery/creative-1.jpg",
    color: "#38bdf8",
    size: "medium",
    year: "2024",
    services: ["User Research", "UI Design", "Prototyping"],
  },
  {
    id: 4,
    title: "FitSync Mobile App",
    category: "App Design",
    description:
      "Fitness tracking app with social features. 4.8-star rating on both app stores with over 50K downloads in the first month.",
    image: "/gallery/fitness-1.jpg",
    color: "#0d9488",
    size: "large",
    year: "2023",
    services: ["App Design", "Interaction Design", "Icon System"],
  },
  {
    id: 5,
    title: "WildTrail Adventure",
    category: "Brand Identity",
    description:
      "Adventure tourism brand built from scratch. Visual identity that captures the thrill of exploration and the beauty of nature.",
    image: "/gallery/adventure-1.jpg",
    color: "#126b9f",
    size: "medium",
    year: "2023",
    services: ["Brand Identity", "Web Design", "Marketing Collateral"],
  },
  {
    id: 6,
    title: "DataFlow Design System",
    category: "Web Development",
    description:
      "Enterprise-grade design system serving 200+ developers across 8 product teams. Built with accessibility and scalability at its core.",
    image: "/gallery/tech-1.jpg",
    color: "#14b8a6",
    size: "medium",
    year: "2023",
    services: ["Design System", "Component Library", "Documentation"],
  },
];

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  size: string;
  year: string;
  services: string[];
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-32 pb-20">
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <TextReveal
          as="h1"
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6"
          stagger={0.06}
          animate="onMount"
        >
          Selected Work
        </TextReveal>
        <FadeReveal delay={0.4}>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl">
            A curated collection of projects where design meets purpose. Each one a story of transformation.
          </p>
        </FadeReveal>
      </section>

      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-white text-brand-navy"
                  : "glass text-gray-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group cursor-pointer ${
        project.size === "large" ? "md:col-span-2" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.color}30, ${project.color}08)`,
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs uppercase tracking-wider text-gray-300 glass px-3 py-1.5 rounded-full">
              {project.category}
            </span>
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </motion.div>
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-brand-navy/90 backdrop-blur-2xl flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="aspect-[16/9] rounded-t-3xl overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)`,
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 sm:p-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs uppercase tracking-wider text-primary-400">
              {project.category}
            </span>
            <span className="text-xs text-gray-600">/</span>
            <span className="text-xs text-gray-500">{project.year}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
            {project.title}
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">
              Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="glass px-4 py-2 rounded-full text-xs text-gray-300"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
