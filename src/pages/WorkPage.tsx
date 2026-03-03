import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import TextReveal, { FadeReveal } from "../components/shared/TextReveal";
import { workPreviews } from "../components/work/WorkPagePreviews";

const categories = ["All", "Brand Identity", "Web Development", "UI/UX Design", "App Design"];

const projects = [
  {
    id: 1,
    title: "TechVault Platform",
    category: "Web Development",
    description:
      "Complete platform redesign for a leading developer tools company. Increased user engagement by 65% through intuitive navigation, modern UI patterns, and a streamlined onboarding flow.",
    color: "#3b82f6",
    size: "large" as const,
    year: "2024",
    services: ["UI/UX Design", "Frontend Development", "Design System"],
    challenge: "TechVault's legacy platform suffered from fragmented navigation and inconsistent patterns across 12 product areas, leading to a 42% drop-off during onboarding.",
    solution: "We unified the entire experience under a single design system with 80+ components, redesigned the dashboard with real-time metrics, and introduced AI-powered workflow suggestions.",
    results: [
      { metric: "65%", label: "Increase in engagement" },
      { metric: "3.2x", label: "Faster onboarding" },
      { metric: "40%", label: "Reduction in support tickets" },
      { metric: "10K+", label: "Teams migrated" },
    ],
    testimonial: {
      quote: "The redesign didn't just look better — it fundamentally changed how our customers interact with our platform.",
      author: "James Park",
      role: "VP of Product, TechVault",
    },
  },
  {
    id: 2,
    title: "Nextera Rebrand",
    category: "Brand Identity",
    description:
      "End-to-end brand identity refresh for a digital-first agency. From logo redesign to comprehensive digital guidelines that unified 12 product lines under one cohesive visual system.",
    color: "#a855f7",
    size: "medium" as const,
    year: "2024",
    services: ["Brand Strategy", "Logo Design", "Brand Guidelines", "Art Direction"],
    challenge: "After rapid growth through acquisitions, Nextera had 12 sub-brands with no visual cohesion — creating confusion in the market and diluting brand equity.",
    solution: "We developed a modular identity system with a dynamic logo mark, a refined purple-to-fuchsia palette, and a 240-page brand guideline covering everything from digital to physical touchpoints.",
    results: [
      { metric: "12", label: "Sub-brands unified" },
      { metric: "240+", label: "Page brand guide" },
      { metric: "92%", label: "Brand recognition lift" },
      { metric: "3x", label: "Social engagement" },
    ],
    testimonial: {
      quote: "They didn't just design a logo — they gave us a complete visual language that scales.",
      author: "Maria Santos",
      role: "CEO, Nextera Group",
    },
  },
  {
    id: 3,
    title: "GrowthLab Dashboard",
    category: "UI/UX Design",
    description:
      "Analytics dashboard with real-time data visualization. Reduced average task completion time by 40% through streamlined workflows and information architecture overhaul.",
    color: "#f59e0b",
    size: "medium" as const,
    year: "2024",
    services: ["User Research", "UI Design", "Data Visualization", "Prototyping"],
    challenge: "GrowthLab users were drowning in data but starving for insights. The existing dashboard required 8+ clicks to surface actionable metrics, and key reports took 15 minutes to build.",
    solution: "We redesigned the entire analytics experience with drag-and-drop report builders, AI-generated insight summaries, and a customizable dashboard that surfaces the metrics that matter most.",
    results: [
      { metric: "40%", label: "Faster task completion" },
      { metric: "156K", label: "Active users" },
      { metric: "4.28%", label: "Conversion rate" },
      { metric: "8m 42s", label: "Avg. session time" },
    ],
    testimonial: {
      quote: "Our users now spend time acting on data instead of hunting for it.",
      author: "Alex Kim",
      role: "Head of Product, GrowthLab",
    },
  },
  {
    id: 4,
    title: "FitSync Mobile App",
    category: "App Design",
    description:
      "Fitness tracking app with social features and AI coaching. 4.8-star rating on both app stores with over 50K downloads in the first month of launch.",
    color: "#f43f5e",
    size: "large" as const,
    year: "2023",
    services: ["App Design", "Interaction Design", "Icon System", "Motion Design"],
    challenge: "The fitness app market is brutally competitive. FitSync needed a design that was both deeply functional for power users and instantly intuitive for beginners — with a social layer that drives retention.",
    solution: "We crafted a dark, immersive UI with signature activity rings, real-time workout tracking with heart rate zones, and a social challenge system. Every animation serves a purpose — from celebration confetti to recovery indicators.",
    results: [
      { metric: "50K+", label: "First month downloads" },
      { metric: "4.8★", label: "App Store rating" },
      { metric: "72%", label: "Day-30 retention" },
      { metric: "#1", label: "Health & Fitness charts" },
    ],
    testimonial: {
      quote: "The app doesn't just track fitness — it makes you want to work out.",
      author: "Sarah Chen",
      role: "Founder, FitSync",
    },
  },
  {
    id: 5,
    title: "WildTrail Adventure",
    category: "Brand Identity",
    description:
      "Adventure tourism brand built from scratch. Visual identity that captures the thrill of exploration, sustainable values, and the beauty of the world's wildest destinations.",
    color: "#22c55e",
    size: "medium" as const,
    year: "2023",
    services: ["Brand Identity", "Web Design", "Marketing Collateral", "Photography Direction"],
    challenge: "WildTrail was launching into a market dominated by established players. They needed a brand that felt premium and adventurous — while communicating their commitment to sustainable, responsible tourism.",
    solution: "We built a complete brand ecosystem centered around an iconic mountain mark, a nature-inspired green palette, and topographic textures. The website features immersive full-bleed photography and a booking flow designed to inspire action.",
    results: [
      { metric: "200+", label: "Expeditions launched" },
      { metric: "12K", label: "Adventurers served" },
      { metric: "48", label: "Countries reached" },
      { metric: "4.9★", label: "Customer rating" },
    ],
    testimonial: {
      quote: "They captured the spirit of what we do. The brand sells the adventure before we even speak.",
      author: "Tom Baker",
      role: "Co-Founder, WildTrail",
    },
  },
  {
    id: 6,
    title: "DataFlow Design System",
    category: "Web Development",
    description:
      "Enterprise-grade design system serving 200+ developers across 8 product teams. Built with accessibility, scalability, and developer experience at its core.",
    color: "#06b6d4",
    size: "medium" as const,
    year: "2023",
    services: ["Design System", "Component Library", "Documentation", "Developer Tools"],
    challenge: "DataFlow's 8 product teams were rebuilding the same components from scratch, leading to visual inconsistency, accessibility gaps, and an average 3-week delay per feature due to design debt.",
    solution: "We built a comprehensive component library with 80+ accessible components, a token-based theming system, interactive documentation with live playgrounds, and a CLI tool for scaffolding new features in minutes.",
    results: [
      { metric: "80+", label: "Components shipped" },
      { metric: "200+", label: "Developers onboarded" },
      { metric: "60%", label: "Faster feature delivery" },
      { metric: "100%", label: "WCAG AA compliance" },
    ],
    testimonial: {
      quote: "The system pays for itself every sprint. Our teams ship faster and our products finally look like they belong together.",
      author: "David Liu",
      role: "Engineering Director, DataFlow",
    },
  },
];

type Project = (typeof projects)[number];

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
            A curated collection of projects where design meets purpose.
            Each one a story of transformation.
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
  const Preview = workPreviews[project.id];

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
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="absolute inset-0"
        >
          {Preview && <Preview />}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-[3px] text-gray-300 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.category}
            </span>
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </motion.div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm max-w-md line-clamp-2">
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
  const Preview = workPreviews[project.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-2xl flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-[#0c0c14] border border-white/[0.08] rounded-2xl max-w-5xl w-full my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero preview */}
        <div className="relative">
          <div className="aspect-[16/9] overflow-hidden rounded-t-2xl border-b border-white/[0.06]">
            {Preview && <Preview />}
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-xs uppercase tracking-[3px] font-medium" style={{ color: project.color }}>
              {project.category}
            </span>
            <span className="text-xs text-gray-700">/</span>
            <span className="text-xs text-gray-500">{project.year}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            {project.description}
          </p>

          {/* Services */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[3px] text-gray-600 mb-4 font-medium">Services Provided</h3>
            <div className="flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="px-4 py-2 rounded-full text-xs border border-white/[0.08] bg-white/[0.02] text-gray-300"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Challenge / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6">
              <h3 className="text-xs uppercase tracking-[3px] text-gray-600 mb-4 font-medium">The Challenge</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.challenge}</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6">
              <h3 className="text-xs uppercase tracking-[3px] mb-4 font-medium" style={{ color: project.color }}>Our Solution</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Results */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[3px] text-gray-600 mb-6 font-medium">Key Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.results.map((r) => (
                <div key={r.label} className="text-center rounded-xl border border-white/[0.06] bg-white/[0.01] py-6 px-4">
                  <div className="font-display text-2xl sm:text-3xl font-bold mb-1" style={{ color: project.color }}>
                    {r.metric}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-8 mb-8">
            <span className="text-4xl leading-none block mb-3" style={{ color: project.color, opacity: 0.3 }}>"</span>
            <p className="text-gray-300 text-base sm:text-lg italic leading-relaxed mb-4">
              {project.testimonial.quote}
            </p>
            <div>
              <span className="text-white text-sm font-bold block">{project.testimonial.author}</span>
              <span className="text-gray-600 text-xs">{project.testimonial.role}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full text-sm font-medium border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              ← Back to Work
            </button>
            <a
              href="/contact"
              className="px-6 py-3 rounded-full text-sm font-medium text-white flex items-center gap-2 transition-all"
              style={{ background: project.color }}
            >
              Start a Project <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
