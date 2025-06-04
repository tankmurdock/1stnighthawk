import { useState } from "react";
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
  // Corporate Category
  {
    src: "/gallery/corporate/corporate-collective.mp4",
    title: "Corporate Collective",
    description:
      "Comprehensive corporate branding showcase featuring business cards, letterheads, and professional materials across multiple business types and industries.",
    category: "corporate",
    clientType: "Multi-Industry Showcase",
    services: [
      "Business Cards",
      "Corporate Identity",
      "Brand Materials",
      "Professional Stationery",
    ],
    industry: "Corporate Services",
    timeline: "Showcase Portfolio",
    result: "Demonstrates versatility across corporate sectors",
    type: "video",
  },
  {
    src: "/gallery/corporate/corporate-logo-1.jpg",
    title: "Executive Consulting Group",
    description:
      "Prestigious consulting firm rebrand with timeless elegance. Navy and gold color palette conveys trust and expertise for C-suite clientele.",
    category: "corporate",
    clientType: "Management Consulting",
    services: ["Logo Design", "Corporate Identity", "Executive Stationery"],
    industry: "Professional Services",
    timeline: "14 days",
    result: "40% increase in enterprise client inquiries",
    type: "placeholder",
  },
  {
    src: "/gallery/corporate/sterling-financial-advisors.mp4",
    title: "Sterling Financial Advisors",
    description:
      "Complete brand system for wealth management firm. Conservative design with modern touches appeals to high-net-worth individuals.",
    category: "corporate",
    clientType: "Financial Services",
    services: ["Brand Identity", "Business Cards", "Presentation Templates"],
    industry: "Finance",
    timeline: "18 days",
    result: "25% growth in assets under management",
    type: "video",
  },
  {
    src: "/gallery/corporate/corporate-cards-1.jpg",
    title: "Meridian Law Partners",
    description:
      "Professional law firm branding emphasizing integrity and precision. Deep blue and silver palette reinforces legal authority.",
    category: "corporate",
    clientType: "Law Firm",
    services: ["Logo Redesign", "Letterhead", "Legal Documents"],
    industry: "Legal",
    timeline: "12 days",
    result: "50% increase in corporate client retention",
    type: "placeholder",
  },

  // Creative Category
  {
    src: "/gallery/creative/creative-collective.mp4",
    title: "Creative Collective",
    description:
      "Dynamic creative showcase featuring vibrant geometric design (Prism Studio) and cinematic branding (Maverick Media). Demonstrates versatility from colorful artistic identity to bold film-inspired aesthetics.",
    category: "creative",
    clientType: "Design Studios",
    services: [
      "Creative Identity",
      "Visual Branding",
      "Portfolio Design",
      "Media Production",
    ],
    industry: "Creative & Media Services",
    timeline: "Creative Portfolio",
    result: "Showcases range from vibrant design to cinematic branding",
    type: "video",
  },
  {
    src: "/gallery/creative/creative-logo-1.jpg",
    title: "Prism Design Studio",
    description:
      "Vibrant identity for creative agency specializing in brand experiences. Rainbow gradient system reflects their diverse creative capabilities.",
    category: "creative",
    clientType: "Design Agency",
    services: ["Creative Identity", "Portfolio Design", "Social Media Kit"],
    industry: "Creative Services",
    timeline: "16 days",
    result: "200% increase in project inquiries",
    type: "placeholder",
  },
  {
    src: "/gallery/creative/artisan-collective.mp4",
    title: "Artisan Collective",
    description:
      "Handcrafted brand identity for artist collective. Organic shapes and earthy tones celebrate the handmade aesthetic.",
    category: "creative",
    clientType: "Artist Collective",
    services: ["Visual Identity", "Exhibition Materials", "Online Gallery"],
    industry: "Arts & Culture",
    timeline: "20 days",
    result: "300% growth in artist applications",
    type: "video",
  },
  {
    src: "/gallery/creative/creative-portfolio-1.jpg",
    title: "Maverick Media House",
    description:
      "Bold branding for video production company. Dynamic typography and cinematic color palette capture their storytelling expertise.",
    category: "creative",
    clientType: "Video Production",
    services: ["Brand Strategy", "Motion Graphics", "Client Presentation Kit"],
    industry: "Media Production",
    timeline: "22 days",
    result: "150% increase in corporate video contracts",
    type: "placeholder",
  },

  // Tech Category
  {
    src: "/gallery/tech/quantum-flow-analytics.mp4",
    title: "QuantumFlow Analytics",
    description:
      "Cutting-edge identity for AI startup. Geometric patterns and electric blue gradients convey innovation and data sophistication.",
    category: "tech",
    clientType: "AI Startup",
    services: ["Startup Branding", "App Icon", "Pitch Deck Design"],
    industry: "Artificial Intelligence",
    timeline: "15 days",
    result: "Secured $2M Series A funding",
    type: "video",
  },
  {
    src: "/gallery/tech/tech-app-1.jpg",
    title: "CodeCraft Development",
    description:
      "Modern branding for software development firm. Clean lines and code-inspired elements appeal to technical and business audiences.",
    category: "tech",
    clientType: "Software Company",
    services: [
      "Complete Rebrand",
      "Developer Portal",
      "Technical Documentation",
    ],
    industry: "Software Development",
    timeline: "19 days",
    result: "75% increase in enterprise contracts",
    type: "placeholder",
  },
  {
    src: "/gallery/tech/tech-saas-1.jpg",
    title: "CloudSync Solutions",
    description:
      "Scalable identity for SaaS platform. Interconnected elements and cloud motifs emphasize seamless connectivity and reliability.",
    category: "tech",
    clientType: "SaaS Platform",
    services: ["Brand Identity", "UI Kit", "Marketing Website"],
    industry: "Cloud Computing",
    timeline: "17 days",
    result: "120% growth in monthly subscriptions",
    type: "placeholder",
  },

  // Fitness Category
  {
    src: "/gallery/fitness/apex-performance-training.mp4",
    title: "Apex Performance Training",
    description:
      "High-energy branding for elite fitness center. Bold red and black design motivates athletes to push their limits.",
    category: "fitness",
    clientType: "Premium Gym",
    services: ["Fitness Branding", "Apparel Design", "Facility Signage"],
    industry: "Fitness & Wellness",
    timeline: "13 days",
    result: "60% increase in membership sign-ups",
    type: "video",
  },
  {
    src: "/gallery/fitness/fitness-brand-1.jpg",
    title: "Warrior Mindset Coaching",
    description:
      "Empowering brand for personal training business. Strong typography and motivational messaging inspire transformation.",
    category: "fitness",
    clientType: "Personal Trainer",
    services: ["Personal Brand", "Program Materials", "Social Media Templates"],
    industry: "Personal Training",
    timeline: "11 days",
    result: "300% growth in online coaching clients",
    type: "placeholder",
  },
  {
    src: "/gallery/fitness/fitness-nutrition-1.jpg",
    title: "Pure Fuel Nutrition",
    description:
      "Clean, healthy branding for nutrition consultancy. Fresh greens and natural elements emphasize wholesome living.",
    category: "fitness",
    clientType: "Nutrition Consultant",
    services: [
      "Brand Identity",
      "Meal Plan Templates",
      "Educational Materials",
    ],
    industry: "Health & Nutrition",
    timeline: "14 days",
    result: "180% increase in consultation bookings",
    type: "placeholder",
  },

  // Adventure Category
  {
    src: "/gallery/adventure/summit-quest-adventures.mp4",
    title: "Summit Quest Adventures",
    description:
      "Rugged branding for mountain expedition company. Earth tones and peak imagery inspire outdoor exploration and adventure.",
    category: "adventure",
    clientType: "Adventure Tourism",
    services: ["Adventure Branding", "Gear Design", "Travel Brochures"],
    industry: "Outdoor Recreation",
    timeline: "16 days",
    result: "85% increase in expedition bookings",
    type: "video",
  },
  {
    src: "/gallery/adventure/adventure-brand-1.jpg",
    title: "Wildfire Outdoor Gear",
    description:
      "Dynamic identity for outdoor equipment brand. Flame-inspired elements and rugged typography appeal to serious adventurers.",
    category: "adventure",
    clientType: "Outdoor Retailer",
    services: ["Product Branding", "Packaging Design", "Retail Environment"],
    industry: "Outdoor Equipment",
    timeline: "21 days",
    result: "140% growth in online sales",
    type: "placeholder",
  },
  {
    src: "/gallery/adventure/adventure-camp-1.jpg",
    title: "Basecamp Adventure Lodge",
    description:
      "Welcoming brand for eco-adventure resort. Natural wood textures and forest greens create connection with wilderness setting.",
    category: "adventure",
    clientType: "Eco Resort",
    services: ["Hospitality Branding", "Wayfinding System", "Guest Experience"],
    industry: "Eco Tourism",
    timeline: "25 days",
    result: "70% increase in booking revenue",
    type: "placeholder",
  },
];

export default function HawkGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [filter, setFilter] = useState("all");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

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
    setShowInfoTooltip(false);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
    setShowInfoTooltip(false);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-12 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Floating Background Elements - Reduced size on mobile */}
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
          className="absolute top-20 right-4 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-primary-200/20 rounded-full blur-xl"
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
          className="absolute bottom-20 left-4 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-accent-200/20 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 sm:mb-6 md:mb-8 leading-tight py-2 px-4 sm:px-0">
            Custom Branding & Logo Design
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            We create powerful visual identities that capture your brand's
            essence and connect with your audience. From startups to established
            companies, we design logos and branding that tell your unique story
            and drive results.
          </p>

          {/* Value Proposition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-4 sm:p-6 rounded-xl"
            >
              <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Custom Design
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Unique logos and branding tailored to your vision and business
                goals
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass p-4 sm:p-6 rounded-xl"
            >
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Strategic Approach
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Research-driven design that resonates with your target audience
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass p-4 sm:p-6 rounded-xl sm:col-span-2 md:col-span-1"
            >
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Complete Package
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Full brand guidelines, assets, and implementation support
              </p>
            </motion.div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setFilter(category);
                  setSelectedImage(0);
                  setShowInfoTooltip(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Featured Project */}
          <motion.div className="relative order-2 lg:order-1" layout>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl"
              >
                {filteredImages[selectedImage]?.type === "video" ? (
                  <video
                    src={filteredImages[selectedImage]?.src}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-contain bg-gray-900"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    onPlay={() => {
                      setShowInfoTooltip(true);
                      setTimeout(() => setShowInfoTooltip(false), 4000);
                    }}
                  />
                ) : filteredImages[selectedImage]?.type === "placeholder" ? (
                  <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <pattern
                            id="grid"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 10 0 L 0 0 0 10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="0.5"
                            />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Overlay with project details */}
                    <div className="absolute inset-0">
                      {filteredImages[selectedImage]?.type === "placeholder" ? (
                        // Simple Coming Soon overlay for placeholders
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              Coming Soon
                            </h3>
                            <h4 className="text-xl text-gray-200 mb-4">
                              {filteredImages[selectedImage]?.title}
                            </h4>
                            <div className="flex justify-center gap-2">
                              <span className="px-3 py-1 bg-primary-500/80 text-white text-sm rounded-full">
                                {filteredImages[selectedImage]?.clientType}
                              </span>
                              <span className="px-3 py-1 bg-accent-500/80 text-white text-sm rounded-full">
                                {filteredImages[selectedImage]?.industry}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Simple bottom overlay for completed projects
                        <>
                          {/* Subtle bottom gradient */}
                          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                          {/* Basic project info */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-end justify-between">
                              <div className="flex-1">
                                <div className="flex gap-2 mb-2">
                                  <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
                                    {filteredImages[selectedImage]?.clientType}
                                  </span>
                                  <span className="px-2 py-1 bg-accent-500 text-white text-xs rounded-full">
                                    {filteredImages[selectedImage]?.industry}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-white leading-tight">
                                  {filteredImages[selectedImage]?.title}
                                </h3>
                              </div>

                              <div className="text-right ml-4">
                                <div className="text-xs text-gray-400">
                                  Result
                                </div>
                                <div className="text-sm font-medium text-green-400">
                                  {filteredImages[selectedImage]?.result}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <img
                    src={filteredImages[selectedImage]?.src}
                    alt={filteredImages[selectedImage]?.title}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                  />
                )}

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

                {/* Info Button - Always visible for completed projects */}
                {filteredImages[selectedImage]?.type !== "placeholder" && (
                  <>
                    <motion.button
                      onClick={() => setShowInfoModal(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 left-4 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors z-20"
                      title="View project details"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </motion.button>

                    {/* Info Tooltip */}
                    <AnimatePresence>
                      {showInfoTooltip && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-4 left-20 bg-white rounded-lg shadow-xl p-3 z-30 min-w-[200px]"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-800">
                              Click for project details
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Services, timeline, and results
                          </div>

                          {/* Arrow pointing to button */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white rotate-45 border-l border-b border-gray-200"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {filteredImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setShowInfoTooltip(false);
                  }}
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

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {filteredImages[selectedImage]?.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {filteredImages[selectedImage]?.description}
              </p>

              {/* Project Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                <div className="glass p-4 sm:p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                    Services
                  </h3>
                  <div className="space-y-1">
                    {filteredImages[selectedImage]?.services.map(
                      (service, index) => (
                        <div
                          key={index}
                          className="flex items-center text-xs sm:text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                          {service}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="glass p-4 sm:p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                    Project Info
                  </h3>
                  <div className="space-y-2">
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Industry:</span>
                      <span className="ml-2 text-gray-700">
                        {filteredImages[selectedImage]?.industry}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Timeline:</span>
                      <span className="ml-2 text-gray-700">
                        {filteredImages[selectedImage]?.timeline}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-500">Result:</span>
                      <span className="ml-2 text-primary-600 font-medium">
                        {filteredImages[selectedImage]?.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <motion.button
                  onClick={prevImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 sm:px-6 py-2 sm:py-3 glass rounded-lg font-medium hover:bg-primary-50 transition-colors text-sm sm:text-base"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  Previous
                </motion.button>

                <span className="text-xs sm:text-sm text-gray-500">
                  {selectedImage + 1} of {filteredImages.length}
                </span>

                <motion.button
                  onClick={nextImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 sm:px-6 py-2 sm:py-3 glass rounded-lg font-medium hover:bg-primary-50 transition-colors text-sm sm:text-base"
                >
                  Next
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </motion.button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mb-6 gap-1.5 sm:gap-2">
              {filteredImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setShowInfoTooltip(false);
                  }}
                  whileHover={{ scale: 1.2 }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === selectedImage
                      ? "bg-primary-500 scale-125"
                      : "bg-gray-300 hover:bg-primary-300"
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>

            {/* Project Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {filteredImages.map((project, index) => (
                <motion.div
                  key={project.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  onClick={() => {
                    setSelectedImage(index);
                    setShowInfoTooltip(false);
                  }}
                  className={`relative cursor-pointer overflow-hidden rounded-lg sm:rounded-xl ${
                    index === selectedImage
                      ? "ring-2 sm:ring-4 ring-primary-500 shadow-lg"
                      : "hover:shadow-lg"
                  }`}
                >
                  {project.type === "video" ? (
                    <div className="relative">
                      <video
                        src={project.src}
                        className="w-full h-24 sm:h-32 object-contain bg-gray-800"
                        muted
                        playsInline
                      />
                      {/* Video Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/80 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[4px] sm:border-l-[6px] border-l-primary-600 border-y-[3px] sm:border-y-[4px] border-y-transparent ml-0.5 sm:ml-1"></div>
                        </div>
                      </div>
                    </div>
                  ) : project.type === "placeholder" ? (
                    <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                      {/* Subtle pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-r from-primary-500 to-accent-500"></div>
                      </div>

                      {/* Coming Soon Icon */}
                      <div className="text-center z-10">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 bg-primary-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <div className="text-[10px] sm:text-xs font-medium text-gray-600">
                          Coming Soon
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-24 sm:h-32 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2">
                      <h4 className="text-white text-[10px] sm:text-sm font-semibold truncate">
                        {project.title}
                      </h4>
                      <span className="text-gray-200 text-[9px] sm:text-xs capitalize">
                        {project.clientType}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Project Info Modal */}
        <AnimatePresence>
          {showInfoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowInfoModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex-shrink-0 bg-white border-b p-4 sm:p-6 flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Project Details
                  </h2>
                  <motion.button
                    onClick={() => setShowInfoModal(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Project Title & Description */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {filteredImages[selectedImage]?.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {filteredImages[selectedImage]?.description}
                      </p>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">
                        Services Provided
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredImages[selectedImage]?.services.map(
                          (service, index) => (
                            <div
                              key={index}
                              className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm sm:text-base">
                                {service}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Project Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-primary-50 p-3 sm:p-4 rounded-lg">
                        <h5 className="font-medium text-primary-800 mb-1 text-sm sm:text-base">
                          Industry
                        </h5>
                        <p className="text-primary-700 text-sm sm:text-base">
                          {filteredImages[selectedImage]?.industry}
                        </p>
                      </div>
                      <div className="bg-accent-50 p-3 sm:p-4 rounded-lg">
                        <h5 className="font-medium text-accent-800 mb-1 text-sm sm:text-base">
                          Timeline
                        </h5>
                        <p className="text-accent-700 text-sm sm:text-base">
                          {filteredImages[selectedImage]?.timeline}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 sm:p-6 rounded-lg text-white">
                      <h4 className="font-semibold mb-2 text-base sm:text-lg">
                        Project Results
                      </h4>
                      <p className="text-sm sm:text-base">
                        {filteredImages[selectedImage]?.result}
                      </p>
                    </div>

                    {/* Client Type */}
                    <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-1 text-sm sm:text-base">
                        Client Type
                      </h5>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {filteredImages[selectedImage]?.clientType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex-shrink-0 bg-gray-50 p-4 sm:p-6 border-t">
                  <div className="flex justify-between items-center">
                    <motion.button
                      onClick={prevImage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-3 sm:px-4 py-2 glass rounded-lg font-medium hover:bg-white transition-colors text-sm sm:text-base"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Prev
                    </motion.button>

                    <span className="text-sm text-gray-500">
                      {selectedImage + 1} of {filteredImages.length}
                    </span>

                    <motion.button
                      onClick={nextImage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-3 sm:px-4 py-2 glass rounded-lg font-medium hover:bg-white transition-colors text-sm sm:text-base"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
