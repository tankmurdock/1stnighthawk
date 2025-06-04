import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Download, Share } from "lucide-react";

interface ConfigType {
  primaryColor: string;
  secondaryColor: string;
  borderRadius: number;
  padding: number;
  fontSize: number;
  shadow: string;
  animation: string;
}

export default function StyleConfigurator() {
  const [selectedComponent, setSelectedComponent] = useState("button");
  const [config, setConfig] = useState<ConfigType>({
    primaryColor: "#0ea5e9",
    secondaryColor: "#d946ef",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    shadow: "medium",
    animation: "hover-scale",
  });

  const components = [
    { id: "button", name: "Button", icon: "🔘" },
    { id: "card", name: "Card", icon: "🃏" },
    { id: "input", name: "Input", icon: "📝" },
    { id: "modal", name: "Modal", icon: "🪟" },
  ];

  const handleConfigChange = (
    key: keyof ConfigType,
    value: string | number
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-8 leading-relaxed py-2">
            Style Configurator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Customize components in real-time. Adjust colors, animations, and
            styling to match your vision perfectly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass p-6 rounded-xl sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-primary-500" />
                Customize
              </h2>

              {/* Component Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Component Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {components.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => setSelectedComponent(component.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedComponent === component.id
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span className="mr-2">{component.icon}</span>
                      {component.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Controls */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) =>
                      handleConfigChange("primaryColor", e.target.value)
                    }
                    className="w-12 h-12 rounded-lg border-2 border-gray-200"
                    aria-label="Primary color picker"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) =>
                      handleConfigChange("primaryColor", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    aria-label="Primary color hex value"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Secondary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.secondaryColor}
                    onChange={(e) =>
                      handleConfigChange("secondaryColor", e.target.value)
                    }
                    className="w-12 h-12 rounded-lg border-2 border-gray-200"
                    aria-label="Secondary color picker"
                  />
                  <input
                    type="text"
                    value={config.secondaryColor}
                    onChange={(e) =>
                      handleConfigChange("secondaryColor", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    aria-label="Secondary color hex value"
                  />
                </div>
              </div>

              {/* Border Radius */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Border Radius: {config.borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={config.borderRadius}
                  onChange={(e) =>
                    handleConfigChange("borderRadius", parseInt(e.target.value))
                  }
                  className="w-full"
                  aria-label={`Border radius: ${config.borderRadius} pixels`}
                />
              </div>

              {/* Padding */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Padding: {config.padding}px
                </label>
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={config.padding}
                  onChange={(e) =>
                    handleConfigChange("padding", parseInt(e.target.value))
                  }
                  className="w-full"
                  aria-label={`Padding: ${config.padding} pixels`}
                />
              </div>

              {/* Font Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Font Size: {config.fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={config.fontSize}
                  onChange={(e) =>
                    handleConfigChange("fontSize", parseInt(e.target.value))
                  }
                  className="w-full"
                  aria-label={`Font size: ${config.fontSize} pixels`}
                />
              </div>

              {/* Shadow */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Shadow
                </label>
                <select
                  value={config.shadow}
                  onChange={(e) => handleConfigChange("shadow", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  aria-label="Shadow style selection"
                >
                  <option value="none">None</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="colored">Colored</option>
                </select>
              </div>

              {/* Animation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hover Animation
                </label>
                <select
                  value={config.animation}
                  onChange={(e) =>
                    handleConfigChange("animation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  aria-label="Hover animation selection"
                >
                  <option value="none">None</option>
                  <option value="hover-scale">Scale</option>
                  <option value="hover-lift">Lift</option>
                  <option value="hover-glow">Glow</option>
                  <option value="hover-rotate">Rotate</option>
                </select>
              </div>

              {/* Export Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 btn-primary flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSS
                </button>
                <button
                  className="btn-secondary"
                  title="Share configuration"
                  aria-label="Share configuration"
                >
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-8">Live Preview</h2>

              <div className="grid gap-8">
                {/* Component Preview */}
                <div className="flex items-center justify-center min-h-[200px] border-2 border-dashed border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-white">
                  <ComponentPreview
                    selectedComponent={selectedComponent}
                    config={config}
                  />
                </div>

                {/* Code Preview */}
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <h3 className="text-white text-lg font-semibold mb-4">
                    Generated CSS
                  </h3>
                  <pre className="text-green-400 text-sm">
                    <code>{generateCSS(selectedComponent, config)}</code>
                  </pre>
                </div>

                {/* Usage Examples */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold mb-4">Light Theme</h3>
                    <div className="bg-white p-4 rounded border">
                      <ComponentPreview
                        selectedComponent={selectedComponent}
                        config={config}
                      />
                    </div>
                  </div>
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold mb-4">Dark Theme</h3>
                    <div className="bg-gray-800 p-4 rounded border">
                      <ComponentPreview
                        selectedComponent={selectedComponent}
                        config={config}
                        isDark
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ComponentPreview({
  selectedComponent,
  config,
  isDark = false,
}: {
  selectedComponent: string;
  config: ConfigType;
  isDark?: boolean;
}) {
  const baseStyles = {
    borderRadius: `${config.borderRadius}px`,
    padding: `${config.padding}px`,
    fontSize: `${config.fontSize}px`,
    backgroundColor: config.primaryColor,
    color: isDark ? "#000" : "#fff",
  };

  const getShadow = () => {
    switch (config.shadow) {
      case "small":
        return "0 1px 3px rgba(0,0,0,0.1)";
      case "medium":
        return "0 4px 6px rgba(0,0,0,0.1)";
      case "large":
        return "0 10px 15px rgba(0,0,0,0.1)";
      case "colored":
        return `0 4px 15px ${config.primaryColor}30`;
      default:
        return "none";
    }
  };

  const getAnimation = () => {
    switch (config.animation) {
      case "hover-scale":
        return { scale: 1.05 };
      case "hover-lift":
        return { y: -4, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" };
      case "hover-glow":
        return { boxShadow: `0 0 20px ${config.primaryColor}50` };
      case "hover-rotate":
        return { rotate: 5 };
      default:
        return {};
    }
  };

  const componentStyles = {
    ...baseStyles,
    boxShadow: getShadow(),
  };

  if (selectedComponent === "button") {
    return (
      <motion.button
        style={componentStyles}
        whileHover={config.animation !== "none" ? getAnimation() : {}}
        className="font-medium cursor-pointer"
      >
        Click Me
      </motion.button>
    );
  }

  if (selectedComponent === "card") {
    return (
      <motion.div
        style={componentStyles}
        whileHover={config.animation !== "none" ? getAnimation() : {}}
        className="min-w-[200px] cursor-pointer"
      >
        <h3
          className="font-semibold mb-2"
          style={{ color: isDark ? "#fff" : "#1f2937" }}
        >
          Card Title
        </h3>
        <p className="text-sm opacity-80">
          This is a sample card component with customizable styling.
        </p>
      </motion.div>
    );
  }

  if (selectedComponent === "input") {
    return (
      <motion.input
        style={{
          ...componentStyles,
          backgroundColor: isDark ? "#374151" : "#fff",
          border: `2px solid ${config.primaryColor}`,
          color: isDark ? "#fff" : "#1f2937",
        }}
        whileHover={config.animation !== "none" ? getAnimation() : {}}
        placeholder="Enter text here..."
        className="min-w-[200px]"
      />
    );
  }

  if (selectedComponent === "modal") {
    return (
      <motion.div
        style={{
          ...componentStyles,
          backgroundColor: isDark ? "#1f2937" : "#fff",
          border: `1px solid ${config.primaryColor}`,
          color: isDark ? "#fff" : "#1f2937",
        }}
        whileHover={config.animation !== "none" ? getAnimation() : {}}
        className="min-w-[250px] cursor-pointer"
      >
        <h3 className="font-semibold mb-3">Modal Title</h3>
        <p className="text-sm opacity-80 mb-4">
          This is a sample modal component.
        </p>
        <div className="flex gap-2">
          <button
            style={{
              backgroundColor: config.primaryColor,
              borderRadius: `${config.borderRadius}px`,
              padding: "8px 16px",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "#6b7280",
              borderRadius: `${config.borderRadius}px`,
              padding: "8px 16px",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return null;
}

function generateCSS(component: string, config: ConfigType) {
  const shadow = () => {
    switch (config.shadow) {
      case "small":
        return "box-shadow: 0 1px 3px rgba(0,0,0,0.1);";
      case "medium":
        return "box-shadow: 0 4px 6px rgba(0,0,0,0.1);";
      case "large":
        return "box-shadow: 0 10px 15px rgba(0,0,0,0.1);";
      case "colored":
        return `box-shadow: 0 4px 15px ${config.primaryColor}30;`;
      default:
        return "";
    }
  };

  const hover = () => {
    switch (config.animation) {
      case "hover-scale":
        return "\n  transform: scale(1.05);";
      case "hover-lift":
        return "\n  transform: translateY(-4px);\n  box-shadow: 0 8px 25px rgba(0,0,0,0.15);";
      case "hover-glow":
        return `\n  box-shadow: 0 0 20px ${config.primaryColor}50;`;
      case "hover-rotate":
        return "\n  transform: rotate(5deg);";
      default:
        return "";
    }
  };

  return `.${component} {
  background-color: ${config.primaryColor};
  border-radius: ${config.borderRadius}px;
  padding: ${config.padding}px;
  font-size: ${config.fontSize}px;
  color: white;
  ${shadow()}
  transition: all 0.2s ease;
}

.${component}:hover {${hover()}
}`;
}
