import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Type,
  Grid,
  Eye,
  Zap,
  Target,
  CheckCircle,
  Copy,
  Box,
  Sparkles,
} from "lucide-react";

export default function DesignSystem() {
  const [activeTab, setActiveTab] = useState("colors");
  const [copiedCode, setCopiedCode] = useState("");

  const tabs = [
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "components", label: "Components", icon: Grid },
    { id: "layout", label: "Layout", icon: Grid },
    { id: "animations", label: "Animations", icon: Zap },
    { id: "patterns", label: "Patterns", icon: Grid },
  ];

  const copyToClipboard = async (code: string, label: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-primary-200/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-accent-200/20 rounded-full blur-xl"
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
            Nighthawk Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            A comprehensive design system built for modern web applications.
            Consistent, accessible, and beautiful components that scale with
            your business.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-gray-600">Components</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary-600">8</div>
              <div className="text-sm text-gray-600">Color Scales</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary-600">12</div>
              <div className="text-sm text-gray-600">Animations</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary-600">WCAG</div>
              <div className="text-sm text-gray-600">AA Compliant</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary-500 text-white shadow-lg"
                    : "glass hover:bg-primary-50"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "colors" && (
            <ColorsTab
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          )}
          {activeTab === "typography" && (
            <TypographyTab
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          )}
          {activeTab === "components" && <ComponentsTab />}
          {activeTab === "layout" && <LayoutTab />}
          {activeTab === "animations" && <AnimationsTab />}
          {activeTab === "patterns" && <PatternsTab />}
        </motion.div>
      </div>
    </div>
  );
}

// Colors Tab Component
function ColorsTab({
  copyToClipboard,
  copiedCode,
}: {
  copyToClipboard: (code: string, label: string) => void;
  copiedCode: string;
}) {
  const colorScales = [
    {
      name: "Primary",
      scale: "primary",
      colors: [
        { name: "50", value: "#f0f8ff", hex: "#f0f8ff" },
        { name: "100", value: "#e0f2fe", hex: "#e0f2fe" },
        { name: "200", value: "#bae6fd", hex: "#bae6fd" },
        { name: "300", value: "#7dd3fc", hex: "#7dd3fc" },
        { name: "400", value: "#38bdf8", hex: "#38bdf8" },
        { name: "500", value: "#126b9f", hex: "#126b9f" },
        { name: "600", value: "#0f5a87", hex: "#0f5a87" },
        { name: "700", value: "#0d4a6f", hex: "#0d4a6f" },
        { name: "800", value: "#0a3957", hex: "#0a3957" },
        { name: "900", value: "#070a20", hex: "#070a20" },
      ],
    },
    {
      name: "Accent",
      scale: "accent",
      colors: [
        { name: "50", value: "#f8f9fa", hex: "#f8f9fa" },
        { name: "100", value: "#f1f3f4", hex: "#f1f3f4" },
        { name: "200", value: "#e8eaed", hex: "#e8eaed" },
        { name: "300", value: "#dadce0", hex: "#dadce0" },
        { name: "400", value: "#bdc1c6", hex: "#bdc1c6" },
        { name: "500", value: "#9aa3af", hex: "#9aa3af" },
        { name: "600", value: "#80868b", hex: "#80868b" },
        { name: "700", value: "#5f6368", hex: "#5f6368" },
        { name: "800", value: "#595e6b", hex: "#595e6b" },
        { name: "900", value: "#3c4043", hex: "#3c4043" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {colorScales.map((scale) => (
        <motion.div
          key={scale.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass p-8 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {scale.name} Colors
            </h3>
            <motion.button
              onClick={() =>
                copyToClipboard(
                  scale.colors
                    .map((c) => `--color-${scale.scale}-${c.name}: ${c.hex};`)
                    .join("\n"),
                  `${scale.name} Scale`
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {copiedCode === `${scale.name} Scale` ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copiedCode === `${scale.name} Scale` ? "Copied!" : "Copy CSS"}
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {scale.colors.map((color) => (
              <motion.div
                key={color.name}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center cursor-pointer"
                onClick={() =>
                  copyToClipboard(color.hex, `${scale.name}-${color.name}`)
                }
              >
                <div
                  className="w-full h-20 rounded-lg mb-2 shadow-lg ring-2 ring-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-sm font-medium text-gray-900">
                  {color.name}
                </div>
                <div className="text-xs text-gray-600">{color.hex}</div>
                {copiedCode === `${scale.name}-${color.name}` && (
                  <div className="text-xs text-primary-600 font-medium">
                    Copied!
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Typography Tab Component
function TypographyTab({
  copyToClipboard,
  copiedCode,
}: {
  copyToClipboard: (code: string, label: string) => void;
  copiedCode: string;
}) {
  const typeScale = [
    { name: "Display", class: "text-6xl", sample: "Display" },
    { name: "Heading 1", class: "text-5xl", sample: "Heading 1" },
    { name: "Heading 2", class: "text-4xl", sample: "Heading 2" },
    { name: "Heading 3", class: "text-3xl", sample: "Heading 3" },
    { name: "Heading 4", class: "text-2xl", sample: "Heading 4" },
    { name: "Heading 5", class: "text-xl", sample: "Heading 5" },
    { name: "Body Large", class: "text-lg", sample: "Body Large Text" },
    { name: "Body", class: "text-base", sample: "Body Text" },
    { name: "Small", class: "text-sm", sample: "Small Text" },
    { name: "Caption", class: "text-xs", sample: "Caption Text" },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Typography Scale</h3>
          <motion.button
            onClick={() =>
              copyToClipboard(
                typeScale
                  .map(
                    (t) =>
                      `.${t.name.toLowerCase().replace(" ", "-")} { @apply ${
                        t.class
                      } font-inter; }`
                  )
                  .join("\n"),
                "Typography CSS"
              )
            }
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {copiedCode === "Typography CSS" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copiedCode === "Typography CSS" ? "Copied!" : "Copy CSS"}
          </motion.button>
        </div>

        <div className="space-y-6">
          {typeScale.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex-1">
                <div className={`${type.class} font-bold text-gray-900 mb-1`}>
                  {type.sample}
                </div>
                <div className="text-sm text-gray-600">
                  {type.name} • {type.class}
                </div>
              </div>
              <motion.button
                onClick={() => copyToClipboard(type.class, type.name)}
                whileHover={{ scale: 1.1 }}
                className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
              >
                {copiedCode === type.name ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Components Tab
function ComponentsTab() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary-500" />
          Buttons
        </h4>
        <div className="space-y-3">
          <button className="btn-primary w-full">Primary Button</button>
          <button className="btn-secondary w-full">Secondary Button</button>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Outline Button
          </button>
        </div>
      </motion.div>

      {/* Form Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-6 rounded-xl"
      >
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Type className="w-5 h-5 mr-2 text-primary-500" />
          Forms
        </h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Text Input"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Sample text input"
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            aria-label="Sample select dropdown"
          >
            <option>Select Option</option>
          </select>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded text-primary-500"
              aria-label="Sample checkbox"
            />
            <label className="text-sm">Checkbox</label>
          </div>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6 rounded-xl"
      >
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Box className="w-5 h-5 mr-2 text-primary-500" />
          Cards
        </h4>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h5 className="font-semibold mb-2">Card Title</h5>
          <p className="text-gray-600 text-sm mb-3">
            Card description text goes here.
          </p>
          <button className="text-primary-500 text-sm font-medium">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Layout Tab
function LayoutTab() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl"
      >
        <h3 className="text-2xl font-bold mb-6">Grid System</h3>
        <div className="grid grid-cols-12 gap-4 mb-6">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="bg-primary-100 p-2 rounded text-center text-xs"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-primary-500 text-white p-4 rounded-lg text-center">
            1/3
          </div>
          <div className="bg-accent-500 text-white p-4 rounded-lg text-center">
            1/3
          </div>
          <div className="bg-gray-500 text-white p-4 rounded-lg text-center">
            1/3
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Animations Tab
function AnimationsTab() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="glass p-6 rounded-xl text-center cursor-pointer"
      >
        <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary-500" />
        <h4 className="font-semibold mb-2">Hover Scale</h4>
        <p className="text-sm text-gray-600">Hover to see effect</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10 }}
        className="glass p-6 rounded-xl text-center cursor-pointer"
      >
        <Zap className="w-8 h-8 mx-auto mb-3 text-primary-500" />
        <h4 className="font-semibold mb-2">Hover Lift</h4>
        <p className="text-sm text-gray-600">Hover to see effect</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        whileHover={{ rotate: 5 }}
        className="glass p-6 rounded-xl text-center cursor-pointer"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Eye className="w-8 h-8 mx-auto mb-3 text-primary-500" />
        </motion.div>
        <h4 className="font-semibold mb-2">Continuous Spin</h4>
        <p className="text-sm text-gray-600">Always spinning</p>
      </motion.div>
    </div>
  );
}

// Patterns Tab
function PatternsTab() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl"
      >
        <h3 className="text-2xl font-bold mb-6">Design Patterns</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="font-semibold mb-3">Glass Morphism</h4>
            <div className="glass p-4 rounded-lg">
              <p className="text-sm">Frosted glass effect with backdrop blur</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-6 rounded-xl text-white">
            <h4 className="font-semibold mb-3">Gradient Cards</h4>
            <p className="text-sm opacity-90">Beautiful gradient backgrounds</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
