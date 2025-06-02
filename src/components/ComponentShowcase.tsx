import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Code, Heart, Star } from "lucide-react";

export default function ComponentShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("buttons");

  const categories = [
    { id: "buttons", name: "Buttons", icon: "🔘" },
    { id: "cards", name: "Cards", icon: "🃏" },
    { id: "forms", name: "Forms", icon: "📝" },
    { id: "navigation", name: "Navigation", icon: "🧭" },
    { id: "modals", name: "Modals", icon: "🪟" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 relative overflow-hidden">
      {/* Floating Hawks */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingHawk
          src="/hawks1.jpg"
          className="absolute top-40 right-12 md:right-16 lg:right-20 w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20"
          delay={1}
        />
        <FloatingHawk
          src="/hawks2.jpg"
          className="absolute bottom-52 left-12 md:left-16 lg:left-20 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          delay={3}
        />
        <FloatingHawk
          src="/hawks3.jpg"
          className="absolute top-2/3 right-12 md:right-16 lg:right-20 w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18"
          delay={5}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            UI Component Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of UI components across all
            major frameworks. Each element follows best practices for
            accessibility, performance, and user experience.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary-500 text-white shadow-lg"
                  : "glass hover:bg-primary-50"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Component Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {selectedCategory === "buttons" && <ButtonComponents />}
          {selectedCategory === "cards" && <CardComponents />}
          {selectedCategory === "forms" && <FormComponents />}
          {selectedCategory === "navigation" && <NavigationComponents />}
          {selectedCategory === "modals" && <ModalComponents />}
        </motion.div>
      </div>
    </div>
  );
}

function FloatingHawk({
  src,
  className,
  delay,
}: {
  src: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{
        opacity: [0, 0.4, 0.6, 0.4],
        scale: [0.5, 1, 0.8, 1],
        rotate: [-20, 0, 10, -5],
        y: [-10, 10, -5, 5],
      }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.2,
        opacity: 0.8,
        transition: { duration: 0.3 },
      }}
      className={`${className} hidden sm:block`}
    >
      <img
        src={src}
        alt="Nighthawk"
        className="w-full h-full object-cover rounded-full opacity-60 shadow-xl border-2 border-primary-400/40 hover:border-primary-500/60 transition-all duration-300"
        style={{
          filter:
            "sepia(10%) saturate(110%) hue-rotate(190deg) brightness(95%)",
        }}
      />
    </motion.div>
  );
}

function ButtonComponents() {
  return (
    <>
      <ComponentCard title="Primary Button">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          Click Me
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Gradient Button">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium"
        >
          Gradient Magic
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Animated Icon Button">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-4 bg-primary-500 text-white rounded-full shadow-lg"
        >
          <motion.div whileHover={{ rotate: 360 }}>
            <Heart className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Material UI Button">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition-colors font-medium uppercase text-sm tracking-wide"
          style={{
            boxShadow:
              "0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)",
          }}
        >
          Material Design
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Shadcn/ui Button">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary h-10 px-4 py-2 bg-gray-900 text-gray-50 hover:bg-gray-900/90"
        >
          Shadcn/ui Style
        </motion.button>
      </ComponentCard>

      <ComponentCard title="NextUI Button">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none bg-primary-500 text-white rounded-lg px-6 py-3 text-sm font-medium shadow-lg"
          style={{
            background: "linear-gradient(45deg, #006FEE 0%, #0070F3 100%)",
          }}
        >
          NextUI Modern
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Tailwind Utility-First">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
        >
          Tailwind Power
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Bulma CSS">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded transition-colors"
          style={{
            border: "none",
            cursor: "pointer",
          }}
        >
          Bulma Clean
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Bootstrap Component">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded border-0 transition-colors"
          style={{
            fontSize: "1rem",
            lineHeight: "1.5",
          }}
        >
          Bootstrap
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Neon Glow Button">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gray-900 text-green-400 rounded-lg font-medium border-2 border-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300"
          style={{
            textShadow: "0 0 10px rgba(34, 197, 94, 0.8)",
          }}
        >
          Neon Effect
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Glass Morphism">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 glass backdrop-blur-lg bg-white/20 text-gray-800 rounded-lg font-medium border border-white/30 hover:bg-white/30 transition-all"
        >
          Glass Effect
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Neumorphism Button">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium"
          style={{
            boxShadow: "8px 8px 16px #bebebe, -8px -8px 16px #ffffff",
          }}
        >
          Neumorphic
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Outlined Button">
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgb(79, 70, 229)",
            color: "white",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-all"
        >
          Outlined
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Loading Button">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2"
          disabled
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
          Loading...
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Social Login Button">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </motion.button>
      </ComponentCard>

      <ComponentCard title="Floating Action Button">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.button>
      </ComponentCard>
    </>
  );
}

function CardComponents() {
  return (
    <>
      <ComponentCard title="Glass Card">
        <div className="glass p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Glass Effect</h3>
          <p className="text-gray-600">Beautiful glassmorphism design</p>
        </div>
      </ComponentCard>

      <ComponentCard title="Nighthawk Product Card">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover relative">
          <div className="h-32 bg-gradient-to-br from-primary-400 to-accent-500 relative overflow-hidden">
            <img
              src="/animated-hawk-1.jpg"
              alt="Nighthawk Product"
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">Nighthawk Pro</h3>
            <p className="text-sm text-gray-600">Premium web components</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-primary-600 font-bold">$199.99</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Feature Card">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute top-2 right-2 w-8 h-8 opacity-20">
            <img
              src="/hawks3.jpg"
              alt="Nighthawk"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <Star className="w-8 h-8 text-yellow-500 mb-3" />
          <h3 className="font-semibold mb-2">Premium Feature</h3>
          <p className="text-sm text-gray-600">Access exclusive content</p>
        </div>
      </ComponentCard>

      <ComponentCard title="Material UI Card">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Material Design
            </h3>
            <p className="text-gray-600 text-sm">Elevation and shadow system</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium uppercase tracking-wide"
            >
              Action
            </motion.button>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Tailwind Glass Card">
        <div className="glass p-6 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Glassmorphism
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Modern glass effect with Tailwind
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Profile Card">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              JD
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600 text-sm">Senior UI/UX Designer</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Passionate about creating beautiful and functional user experiences.
          </p>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              Follow
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium"
            >
              Message
            </motion.button>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Pricing Card">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
            <div className="text-3xl font-bold">
              $29<span className="text-lg font-normal">/month</span>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Unlimited projects
              </li>
              <li className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Priority support
              </li>
              <li className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Advanced analytics
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Stats Card">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 text-white max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
          </div>
          <div className="text-3xl font-bold mb-2">$12,459</div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-green-200 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-200 text-sm">+12% from last month</span>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Blog Post Card">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm">
          <div className="h-48 bg-gradient-to-r from-pink-400 to-red-500"></div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>Dec 15, 2024</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Building Better User Interfaces
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn the essential principles of creating intuitive and engaging
              user interfaces that delight users.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
            >
              Read More →
            </motion.button>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Notification Card">
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 p-6 max-w-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                New Update Available
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Version 2.1.0 includes new features and bug fixes.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Update Now
              </motion.button>
            </div>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Skeleton Card">
        <div className="w-full max-w-sm bg-white rounded-lg p-4 border border-gray-200">
          {/* Avatar skeleton */}
          <div className="flex items-start space-x-4 mb-4">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"
            />
            <div className="flex-1 space-y-2">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="h-4 bg-gray-300 rounded animate-pulse w-3/4"
              />
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="h-3 bg-gray-300 rounded animate-pulse w-1/2"
              />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-3">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="h-4 bg-gray-300 rounded animate-pulse w-full"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              className="h-4 bg-gray-300 rounded animate-pulse w-5/6"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.0,
              }}
              className="h-4 bg-gray-300 rounded animate-pulse w-2/3"
            />
          </div>

          {/* Button skeleton */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="mt-4 h-10 bg-gray-300 rounded animate-pulse w-24"
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Weather Card">
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-6 text-white max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">San Francisco</h3>
              <p className="text-blue-100 text-sm">Partly Cloudy</p>
            </div>
            <svg
              className="w-12 h-12 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-4xl font-bold mb-4">72°F</div>
          <div className="flex justify-between text-sm text-blue-100">
            <span>High: 75°</span>
            <span>Low: 65°</span>
            <span>Humidity: 68%</span>
          </div>
        </div>
      </ComponentCard>
    </>
  );
}

function FormComponents() {
  return (
    <>
      <ComponentCard title="Modern Input">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Toggle Switch">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span className="sr-only">Toggle switch</span>
        </label>
      </ComponentCard>

      <ComponentCard title="Search Bar">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500"
          />
          <Eye className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </ComponentCard>

      <ComponentCard title="Floating Label Input">
        <div className="relative w-full">
          <input
            type="text"
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Username
          </label>
        </div>
      </ComponentCard>

      <ComponentCard title="Input with Validation">
        <div className="w-full space-y-2">
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Enter your email"
              defaultValue="invalid-email"
            />
            <div className="absolute right-3 top-3">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-red-600 text-sm">
            Please enter a valid email address
          </p>
        </div>
      </ComponentCard>

      <ComponentCard title="Success Input State">
        <div className="w-full space-y-2">
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="Enter your email"
              defaultValue="user@example.com"
            />
            <div className="absolute right-3 top-3">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-green-600 text-sm">Email format is valid</p>
        </div>
      </ComponentCard>

      <ComponentCard title="Select Dropdown">
        <div className="relative w-full">
          <label htmlFor="framework-select" className="sr-only">
            Choose a framework
          </label>
          <select
            id="framework-select"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white"
          >
            <option>Choose a framework</option>
            <option>React</option>
            <option>Vue.js</option>
            <option>Angular</option>
            <option>Svelte</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Multi-Select Tags">
        <div className="w-full space-y-2">
          <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-[46px] focus-within:ring-2 focus-within:ring-primary-500">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              React
              <button
                className="ml-1 text-primary-600 hover:text-primary-800"
                aria-label="Remove React tag"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              TypeScript
              <button
                className="ml-1 text-primary-600 hover:text-primary-800"
                aria-label="Remove TypeScript tag"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
            <input
              type="text"
              className="flex-1 outline-none text-sm"
              placeholder="Add skills..."
              aria-label="Add new skill tag"
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Password Input">
        <div className="relative w-full">
          <input
            type="password"
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Enter password"
            defaultValue="secretpassword"
          />
          <button
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            aria-label="Toggle password visibility"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </ComponentCard>

      <ComponentCard title="File Upload">
        <div className="w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
      </ComponentCard>

      <ComponentCard title="Range Slider">
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Price Range</span>
            <span>$25 - $75</span>
          </div>
          <div className="relative">
            <label htmlFor="price-range" className="sr-only">
              Price Range
            </label>
            <input
              id="price-range"
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background:
                  "linear-gradient(to right, #126b9f 0%, #126b9f 50%, #e5e7eb 50%, #e5e7eb 100%)",
              }}
              aria-label="Price range slider"
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Checkbox Group">
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              defaultChecked
            />
            <span className="ml-2 text-sm text-gray-700">React</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Vue.js</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              defaultChecked
            />
            <span className="ml-2 text-sm text-gray-700">Angular</span>
          </label>
        </div>
      </ComponentCard>

      <ComponentCard title="Radio Button Group">
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="framework"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
              defaultChecked
            />
            <span className="ml-2 text-sm text-gray-700">Beginner</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="framework"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Intermediate</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="framework"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Advanced</span>
          </label>
        </div>
      </ComponentCard>

      <ComponentCard title="Textarea">
        <div className="w-full">
          <textarea
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your project..."
            defaultValue="I'm looking for a modern UI design system that works across multiple frameworks..."
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Date Picker">
        <div className="relative w-full">
          <label htmlFor="date-picker" className="sr-only">
            Select Date
          </label>
          <input
            id="date-picker"
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            defaultValue="2024-12-15"
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Time Picker">
        <div className="relative w-full">
          <label htmlFor="time-picker" className="sr-only">
            Select Time
          </label>
          <input
            id="time-picker"
            type="time"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            defaultValue="14:30"
          />
        </div>
      </ComponentCard>
    </>
  );
}

function NavigationComponents() {
  return (
    <>
      <ComponentCard title="Tab Navigation">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium">
            Home
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600">
            About
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600">
            Contact
          </button>
        </div>
      </ComponentCard>

      <ComponentCard title="Breadcrumb">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="#" className="text-primary-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <a href="#" className="text-primary-600">
                Products
              </a>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-600">Details</span>
            </li>
          </ol>
        </nav>
      </ComponentCard>

      <ComponentCard title="Progress Bar">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="bg-primary-500 h-2 rounded-full"
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Underlined Tabs">
        <div className="flex space-x-8 border-b border-gray-200">
          <button className="pb-2 text-sm font-medium text-primary-600 border-b-2 border-primary-600">
            Dashboard
          </button>
          <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Analytics
          </button>
          <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Reports
          </button>
          <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Settings
          </button>
        </div>
      </ComponentCard>

      <ComponentCard title="Pill Tabs">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium">
            Overview
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">
            Details
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">
            Reviews
          </button>
        </div>
      </ComponentCard>

      <ComponentCard title="Vertical Navigation">
        <div className="space-y-1 w-48">
          <a
            href="#"
            className="bg-primary-100 text-primary-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            <svg
              className="text-primary-500 mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            <svg
              className="text-gray-400 mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            Team
          </a>
          <a
            href="#"
            className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            <svg
              className="text-gray-400 mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Projects
          </a>
        </div>
      </ComponentCard>

      <ComponentCard title="Pagination">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md">
              1
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              3
            </button>
            <span className="px-3 py-1 text-sm font-medium text-gray-700">
              ...
            </span>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              8
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </nav>
      </ComponentCard>

      <ComponentCard title="Step Progress">
        <div className="flex items-center">
          <div className="flex items-center text-teal-600 relative">
            <div className="rounded-full h-8 w-8 flex items-center justify-center bg-teal-500 text-white text-sm font-bold">
              1
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-teal-600">
              Personal Info
            </div>
          </div>
          <div className="flex-auto border-t-2 border-teal-500"></div>
          <div className="flex items-center text-teal-600 relative">
            <div className="rounded-full h-8 w-8 flex items-center justify-center bg-teal-500 text-white text-sm font-bold">
              2
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-teal-600">
              Address
            </div>
          </div>
          <div className="flex-auto border-t-2 border-gray-300"></div>
          <div className="flex items-center text-gray-500 relative">
            <div className="rounded-full h-8 w-8 flex items-center justify-center bg-white border-2 border-gray-300 text-sm font-bold">
              3
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-gray-500">
              Payment
            </div>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Mobile Menu Button">
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
          <span className="text-sm text-gray-600">Hamburger Menu</span>
        </div>
      </ComponentCard>

      <ComponentCard title="Dropdown Menu">
        <div className="relative inline-block text-left">
          <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            Options
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Account settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Support
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                License
              </a>
              <div className="border-t border-gray-100"></div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Breadcrumb with Icons">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414L11.414 10l4.293 4.293a1 1 0 010 1.414L10 11.414 5.707 7.121a1 1 0 010-1.414z" />
                </svg>
                <span className="sr-only">Home</span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <a href="#" className="text-primary-600 hover:text-primary-800">
                  Projects
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-500">Project Neptune</span>
              </div>
            </li>
          </ol>
        </nav>
      </ComponentCard>

      <ComponentCard title="Mini Pagination">
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"
            aria-label="Previous page"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-sm text-gray-700">Page 1 of 10</span>
          <button
            className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"
            aria-label="Next page"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </ComponentCard>

      <ComponentCard title="Segmented Control">
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button className="flex-1 py-2 px-4 rounded-md bg-white text-sm font-medium text-gray-900 shadow-sm">
            List
          </button>
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
            Grid
          </button>
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
            Card
          </button>
        </div>
      </ComponentCard>

      <ComponentCard title="Progress Steps">
        <div className="w-full">
          <div className="flex items-center">
            <div className="flex items-center text-teal-600 relative">
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-teal-500 text-white text-sm font-bold">
                1
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-teal-600">
                Personal Info
              </div>
            </div>
            <div className="flex-auto border-t-2 border-teal-500"></div>
            <div className="flex items-center text-teal-600 relative">
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-teal-500 text-white text-sm font-bold">
                2
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-teal-600">
                Address
              </div>
            </div>
            <div className="flex-auto border-t-2 border-gray-300"></div>
            <div className="flex items-center text-gray-500 relative">
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-white border-2 border-gray-300 text-sm font-bold">
                3
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-gray-500">
                Payment
              </div>
            </div>
          </div>
        </div>
      </ComponentCard>
    </>
  );
}

function ModalComponents() {
  return (
    <>
      <ComponentCard title="Alert Modal">
        <div className="bg-white p-6 rounded-lg shadow-xl border">
          <h3 className="text-lg font-semibold mb-2">Confirm Action</h3>
          <p className="text-gray-600 mb-4">
            Are you sure you want to proceed?
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-500 text-white rounded">
              Yes
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Notification Toast">
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-green-800">Success! Changes saved.</span>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Loading Spinner">
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
          />
        </div>
      </ComponentCard>
    </>
  );
}

function ComponentCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
            title="Preview component"
            aria-label="Preview component"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
            title="View code"
            aria-label="View code"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[100px] border border-gray-100 rounded-lg bg-gray-50">
        {children}
      </div>
    </motion.div>
  );
}
