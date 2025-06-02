import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ComponentShowcase from "./components/ComponentShowcase";
import AnimationGallery from "./components/AnimationGallery";
import StyleConfigurator from "./components/StyleConfigurator";
import HawkGallery from "./components/HawkGallery";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-accent-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentShowcase />} />
          <Route path="/animations" element={<AnimationGallery />} />
          <Route path="/configurator" element={<StyleConfigurator />} />
          <Route path="/gallery" element={<HawkGallery />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Hero />

      {/* Features Preview Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Design Systems That Scale
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Expert UI/UX design and development across all major frameworks. We
            create consistent, accessible, and beautiful user experiences that
            drive engagement and conversion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Component Libraries"
            description="Custom components built with Material UI, Shadcn/ui, NextUI, and more"
            icon="🎨"
            delay={0.2}
          />
          <FeatureCard
            title="Design Systems"
            description="Comprehensive design tokens, patterns, and guidelines for scalable UX"
            icon="📐"
            delay={0.4}
          />
          <FeatureCard
            title="User Research"
            description="Data-driven UX decisions backed by user testing and analytics"
            icon="🔍"
            delay={0.6}
          />
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="py-20 gradient-brand text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mastery Across{" "}
              <span className="text-accent-200">All Frameworks</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              From enterprise Material Design to modern Tailwind utilities, we
              speak every UI framework fluently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            <TechCard name="Material UI" icon="⚛️" />
            <TechCard name="Tailwind CSS" icon="🎨" />
            <TechCard name="Shadcn/ui" icon="🔧" />
            <TechCard name="Next UI" icon="🚀" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <TechCard name="Bootstrap" icon="🅱️" />
            <TechCard name="Bulma" icon="💎" />
            <TechCard name="Skeleton" icon="💀" />
          </div>
        </div>
      </section>
    </motion.main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  delay,
}: {
  title: string;
  description: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="glass p-8 rounded-2xl card-hover brand-shadow"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function TechCard({ name, icon }: { name: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-dark p-6 rounded-xl text-center backdrop-blur-lg bg-white/10"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-semibold text-white">{name}</h4>
    </motion.div>
  );
}

export default App;
