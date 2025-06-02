import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Palette,
  Zap,
  Target,
} from "lucide-react";

const brandingProjects = [
  {
    src: "/hawks1.jpg",
    title: "Majestic Hunter Brand",
    description:
      "A powerful brand identity capturing strength and focus for a consulting firm. Clean, professional, commanding attention.",
    category: "corporate",
    clientType: "Consulting Firm",
    services: ["Logo Design", "Brand Guidelines", "Color Palette"],
  },
  {
    src: "/hawks2.jpg",
    title: "Silent Predator Studios",
    description:
      "Minimalist brand for a creative agency. Precision and elegance translated into memorable visual identity.",
    category: "creative",
    clientType: "Creative Agency",
    services: ["Visual Identity", "Typography", "Brand Strategy"],
  },
  {
    src: "/hawks3.jpg",
    title: "Guardian Spirit Security",
    description:
      "Trust and reliability embodied in a security company's rebrand. Professional yet approachable design language.",
    category: "security",
    clientType: "Security Company",
    services: ["Logo Redesign", "Business Cards", "Signage Design"],
  },
  {
    src: "/animated-hawk-1.jpg",
    title: "Aerial Mastery Logistics",
    description:
      "Dynamic brand capturing movement and efficiency for a logistics company. Speed and precision in every element.",
    category: "logistics",
    clientType: "Logistics Company",
    services: ["Complete Rebrand", "Fleet Graphics", "Digital Assets"],
  },
  {
    src: "/animated-hawk-2.jpg",
    title: "Focused Vision Analytics",
    description:
      "Sharp, data-driven brand identity for a tech startup. Modern aesthetics meeting analytical precision.",
    category: "tech",
    clientType: "Tech Startup",
    services: ["Startup Branding", "App Icons", "Pitch Deck Design"],
  },
  {
    src: "/animated-hawk-3.jpg",
    title: "Wind Rider Adventures",
    description:
      "Adventure tourism brand with natural elegance. Freedom and exploration captured in organic design.",
    category: "adventure",
    clientType: "Tourism Company",
    services: ["Adventure Branding", "Merchandise Design", "Website Graphics"],
  },
  {
    src: "/animated-hawk-4.jpg",
    title: "Noble Warrior Fitness",
    description:
      "Strength and determination for a premium fitness brand. Motivational design that inspires action.",
    category: "fitness",
    clientType: "Fitness Brand",
    services: ["Fitness Branding", "Apparel Design", "Social Media Kit"],
  },
];

export default function HawkGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [filter, setFilter] = useState("all");

  const categories = [
    "all",
    "corporate",
    "creative",
    "tech",
    "fitness",
    "adventure",
  ];

  const filteredImages =
    filter === "all"
      ? brandingProjects
      : brandingProjects.filter((img) => img.category === filter);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-40 h-40 bg-primary-200/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-32 h-32 bg-accent-200/20 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-8 leading-relaxed py-2">
            Custom Branding & Logo Design
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We create powerful visual identities that capture your brand's
            essence and connect with your audience. From startups to established
            companies, we design logos and branding that tell your unique story
            and drive results.
          </p>

          {/* Value Proposition */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <Palette className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Custom Design
              </h3>
              <p className="text-sm text-gray-600">
                Unique logos and branding tailored to your vision and business
                goals
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass p-6 rounded-xl"
            >
              <Target className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Strategic Approach
              </h3>
              <p className="text-sm text-gray-600">
                Research-driven design that resonates with your target audience
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass p-6 rounded-xl"
            >
              <Zap className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Complete Package
              </h3>
              <p className="text-sm text-gray-600">
                Full brand guidelines, assets, and implementation support
              </p>
            </motion.div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setFilter(category);
                  setSelectedImage(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-primary-500 text-white shadow-lg"
                    : "glass hover:bg-primary-50"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Gallery */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Featured Project */}
          <motion.div className="relative" layout>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img
                  src={filteredImages[selectedImage]?.src}
                  alt={filteredImages[selectedImage]?.title}
                  className="w-full h-96 md:h-[500px] object-cover"
                />

                {/* Overlay with project details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full mb-2">
                        {filteredImages[selectedImage]?.clientType}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {filteredImages[selectedImage]?.title}
                    </h3>
                    <p className="text-gray-200 mb-3">
                      {filteredImages[selectedImage]?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {filteredImages[selectedImage]?.services.map(
                        (service, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs"
                          >
                            {service}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <motion.button
                    onClick={prevImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    onClick={nextImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      title="View Full Project"
                      aria-label="View full project details"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      title="Download Case Study"
                      aria-label="Download case study"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {filteredImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedImage
                      ? "bg-primary-500 scale-125"
                      : "bg-gray-300 hover:bg-primary-300"
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Project Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredImages.map((project, index) => (
              <motion.div
                key={project.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                onClick={() => setSelectedImage(index)}
                className={`relative cursor-pointer overflow-hidden rounded-xl ${
                  index === selectedImage
                    ? "ring-4 ring-primary-500 shadow-lg"
                    : "hover:shadow-lg"
                }`}
              >
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white text-sm font-semibold truncate">
                      {project.title}
                    </h4>
                    <span className="text-gray-200 text-xs capitalize">
                      {project.clientType}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services & Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          {/* Call to Action */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Create Your Brand Identity?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's work together to design a logo and brand that perfectly
              represents your vision and resonates with your audience.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Your Branding Project
              </motion.button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="glass p-8 rounded-2xl">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl font-bold text-primary-600 mb-2"
              >
                50+
              </motion.div>
              <p className="text-gray-600">Brands Created</p>
            </div>
            <div className="glass p-8 rounded-2xl">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl font-bold text-primary-600 mb-2"
              >
                100%
              </motion.div>
              <p className="text-gray-600">Custom Design</p>
            </div>
            <div className="glass p-8 rounded-2xl">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-3xl font-bold text-primary-600 mb-2"
              >
                48hr
              </motion.div>
              <p className="text-gray-600">Initial Concepts</p>
            </div>
            <div className="glass p-8 rounded-2xl">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-3xl font-bold text-primary-600 mb-2"
              >
                ∞
              </motion.div>
              <p className="text-gray-600">Creative Possibilities</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
