import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pricingTiers = [
  {
    id: "starter",
    name: "Logo Design",
    icon: Zap,
    price: 499,
    originalPrice: 699,
    duration: "5-7 days",
    description: "Perfect for new businesses needing a professional logo",
    features: [
      "Custom logo design",
      "3 initial concepts",
      "2 rounds of revisions",
      "High-resolution files (PNG, JPG)",
      "Vector files (AI, EPS)",
      "Basic brand guidelines",
      "Commercial usage rights",
      "48hr initial concepts",
    ],
    notIncluded: [
      "Full brand identity package",
      "Website design",
      "Business card design",
      "Social media templates",
    ],
    popular: false,
    cta: "Start Your Logo",
    color: "blue",
  },
  {
    id: "professional",
    name: "Brand Identity",
    icon: Crown,
    price: 1299,
    originalPrice: 1799,
    duration: "10-14 days",
    description: "Complete brand package for established businesses",
    features: [
      "Everything in Logo Design",
      "Complete brand identity system",
      "5 initial logo concepts",
      "Unlimited revisions",
      "Color palette & typography",
      "Business card design",
      "Letterhead design",
      "Social media templates",
      "Brand guidelines document",
      "Style guide with usage rules",
      "File organization system",
      "1 year of brand support",
    ],
    notIncluded: [
      "Website design & development",
      "Marketing materials beyond basics",
    ],
    popular: true,
    cta: "Build Your Brand",
    color: "primary",
  },
  {
    id: "enterprise",
    name: "Complete Package",
    icon: Rocket,
    price: 2999,
    originalPrice: 4299,
    duration: "3-4 weeks",
    description: "Full-service branding and digital presence",
    features: [
      "Everything in Brand Identity",
      "Website design (up to 5 pages)",
      "Responsive mobile design",
      "SEO optimization",
      "Complete marketing kit",
      "Social media brand package",
      "Email signature design",
      "Presentation template",
      "Advanced brand guidelines",
      "Brand strategy consultation",
      "Competitive analysis",
      "Brand positioning document",
      "Launch strategy",
      "3 months of support",
    ],
    notIncluded: [],
    popular: false,
    cta: "Go Full Service",
    color: "purple",
  },
];

const addOns = [
  {
    name: "Website Development",
    price: 799,
    description: "Full website coding & deployment",
  },
  {
    name: "E-commerce Setup",
    price: 999,
    description: "Online store with payment processing",
  },
  { name: "SEO Package", price: 499, description: "3-month SEO optimization" },
  {
    name: "Social Media Management",
    price: 599,
    description: "1 month of content creation",
  },
  {
    name: "Rush Delivery (48hr)",
    price: 299,
    description: "Priority fast-track service",
  },
  {
    name: "Additional Revisions",
    price: 99,
    description: "Beyond included revisions",
  },
];

const faqs = [
  {
    question: "What's included in the revision process?",
    answer:
      "We include multiple rounds of revisions to ensure your complete satisfaction. You can request changes to colors, fonts, layouts, and overall design direction.",
  },
  {
    question: "Do I own the rights to my logo and brand?",
    answer:
      "Yes! Once the project is complete and payment is received, you own full commercial rights to your logo and brand materials.",
  },
  {
    question: "How long does the design process take?",
    answer:
      "Logo design typically takes 5-7 days, complete brand identity 10-14 days, and full packages 3-4 weeks. Rush delivery options are available.",
  },
  {
    question: "What file formats will I receive?",
    answer:
      "You'll receive your logo in all necessary formats: high-resolution PNG/JPG for digital use, vector files (AI/EPS) for printing, and web-optimized versions.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Absolutely! You can upgrade to a higher tier at any time and we'll credit what you've already paid toward the new package.",
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("project");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-8 leading-relaxed py-2">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect package for your business. All prices include
            unlimited revisions until you're 100% satisfied.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`font-medium ${
                billingPeriod === "project"
                  ? "text-primary-600"
                  : "text-gray-500"
              }`}
            >
              Per Project
            </span>
            <button
              onClick={() =>
                setBillingPeriod(
                  billingPeriod === "project" ? "retainer" : "project"
                )
              }
              className="relative w-14 h-7 bg-gray-200 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                animate={{
                  x: billingPeriod === "project" ? 2 : 32,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
            <span
              className={`font-medium ${
                billingPeriod === "retainer"
                  ? "text-primary-600"
                  : "text-gray-500"
              }`}
            >
              Monthly Retainer
              <span className="text-xs text-green-600 block">Save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative glass p-8 rounded-2xl ${
                tier.popular
                  ? "ring-2 ring-primary-500 scale-105 shadow-2xl"
                  : "hover:shadow-xl transition-shadow"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <tier.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      $
                      {billingPeriod === "project"
                        ? tier.price
                        : Math.round(tier.price * 0.8)}
                    </span>
                    {billingPeriod === "project" && (
                      <span className="text-lg text-gray-500 line-through">
                        ${tier.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {billingPeriod === "project"
                      ? `Delivered in ${tier.duration}`
                      : "Per month"}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.notIncluded.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Not included:
                    </h4>
                    <ul className="space-y-2">
                      {tier.notIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5">
                            ×
                          </span>
                          <span className="text-sm text-gray-500">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {tier.cta} <ArrowRight className="w-4 h-4 inline ml-2" />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Add-On Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your package with additional services to maximize your
              brand's impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                  <span className="text-lg font-bold text-primary-600">
                    ${addon.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our pricing and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl mb-4"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left flex justify-between items-center"
                >
                  <h3 className="font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center glass p-12 rounded-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get started with a free consultation. We'll discuss your vision and
            recommend the perfect package for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Free Consultation
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4"
            >
              View Portfolio
            </motion.button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              No upfront costs
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              100% satisfaction guarantee
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Unlimited revisions
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
