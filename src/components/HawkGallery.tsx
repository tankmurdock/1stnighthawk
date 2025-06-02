import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Download } from "lucide-react";

const hawkImages = [
  {
    src: "/hawks1.jpg",
    title: "Majestic Hunter",
    description:
      "A powerful nighthawk surveying its territory with piercing focus.",
    category: "nature",
  },
  {
    src: "/hawks2.jpg",
    title: "Silent Predator",
    description: "Poised and ready to strike with unmatched precision.",
    category: "action",
  },
  {
    src: "/hawks3.jpg",
    title: "Guardian Spirit",
    description: "The embodiment of strength and vigilance in nature.",
    category: "portrait",
  },
  {
    src: "/animated-hawk-1.jpg",
    title: "Aerial Mastery",
    description: "Demonstrating the grace and power of flight.",
    category: "flight",
  },
  {
    src: "/animated-hawk-2.jpg",
    title: "Focused Vision",
    description: "Eyes that see every detail, missing nothing.",
    category: "portrait",
  },
  {
    src: "/animated-hawk-3.jpg",
    title: "Wind Rider",
    description: "Riding the currents with effortless elegance.",
    category: "flight",
  },
  {
    src: "/animated-hawk-4.jpg",
    title: "Noble Warrior",
    description: "A symbol of courage and determination.",
    category: "nature",
  },
];

export default function HawkGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [filter, setFilter] = useState("all");

  const categories = ["all", "nature", "flight", "portrait", "action"];

  const filteredImages =
    filter === "all"
      ? hawkImages
      : hawkImages.filter((img) => img.category === filter);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
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
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Nighthawk Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore the inspiration behind our brand - the magnificent
            nighthawk. Each image captures the essence of precision, power, and
            elegance.
          </p>

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
          {/* Featured Image */}
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

                {/* Overlay with controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {filteredImages[selectedImage]?.title}
                    </h3>
                    <p className="text-gray-200">
                      {filteredImages[selectedImage]?.description}
                    </p>
                  </div>

                  {/* Navigation Controls */}
                  <motion.button
                    onClick={prevImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    onClick={nextImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      title="Full View"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      title="Download"
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
                />
              ))}
            </div>
          </motion.div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
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
                  src={image.src}
                  alt={image.title}
                  className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2">
                    <h4 className="text-white text-sm font-semibold">
                      {image.title}
                    </h4>
                    <span className="text-gray-200 text-xs capitalize">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="glass p-8 rounded-2xl">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold text-primary-600 mb-2"
            >
              7
            </motion.div>
            <p className="text-gray-600">Unique Hawk Images</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-bold text-primary-600 mb-2"
            >
              4K
            </motion.div>
            <p className="text-gray-600">Ultra High Quality</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-3xl font-bold text-primary-600 mb-2"
            >
              ∞
            </motion.div>
            <p className="text-gray-600">Endless Inspiration</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
