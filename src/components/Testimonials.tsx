import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO, TechFlow Solutions",
    company: "TechFlow Solutions",
    image: "/animated-hawk-1.jpg", // Using hawk images as placeholder avatars
    rating: 5,
    text: "1st Nighthawk Innovations transformed our entire brand identity. Their hawk-inspired design philosophy captured our company's precision and vision perfectly. The logo they created increased our brand recognition by 300%.",
    project: "Complete Brand Identity",
    result: "300% increase in brand recognition",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Founder, Apex Consulting",
    company: "Apex Consulting",
    image: "/hawks1.jpg",
    rating: 5,
    text: "Working with Nighthawk was a game-changer. They delivered a professional, commanding brand that immediately elevated our consulting firm's credibility. Client inquiries doubled after the rebrand.",
    project: "Logo & Brand Guidelines",
    result: "100% increase in client inquiries",
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "Marketing Director, SecureVault",
    company: "SecureVault Security",
    image: "/hawks2.jpg",
    rating: 5,
    text: "The team at Nighthawk understood our security industry perfectly. They created a trustworthy yet approachable brand that resonated with both enterprise and consumer markets. Exceptional work!",
    project: "Security Company Rebrand",
    result: "Expanded to enterprise market",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Co-founder, Velocity Logistics",
    company: "Velocity Logistics",
    image: "/hawks3.jpg",
    rating: 5,
    text: "Dynamic, fast, efficient - they captured everything our logistics company represents. The brand identity shows movement and precision. Our client satisfaction scores improved significantly.",
    project: "Complete Brand Package",
    result: "25% improvement in client satisfaction",
  },
  {
    id: 5,
    name: "Jessica Martinez",
    title: "Founder, DataVision Analytics",
    company: "DataVision Analytics",
    image: "/animated-hawk-2.jpg",
    rating: 5,
    text: "Sharp, modern, analytical - exactly what we needed for our tech startup. The branding helped us secure Series A funding. Investors were impressed by our professional presentation.",
    project: "Startup Branding & Pitch Deck",
    result: "Secured Series A funding",
  },
  {
    id: 6,
    name: "Robert Thompson",
    title: "Owner, Mountain Peak Adventures",
    company: "Mountain Peak Adventures",
    image: "/animated-hawk-3.jpg",
    rating: 5,
    text: "They brought our adventure tourism brand to life with natural elegance and excitement. Bookings increased 40% in the first quarter after launch. The brand truly captures the spirit of adventure.",
    project: "Tourism Brand & Website",
    result: "40% increase in bookings",
  },
];

const stats = [
  { number: "50+", label: "Happy Clients", icon: "😊" },
  { number: "98%", label: "Client Satisfaction", icon: "⭐" },
  { number: "24hr", label: "Average Response", icon: "⚡" },
  { number: "100%", label: "Custom Design", icon: "🎨" },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
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
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses soar to new heights with powerful
            branding and design that drives real results.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass p-8 md:p-12 rounded-2xl mx-auto max-w-4xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Client Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-200 shadow-lg">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                      style={{
                        filter:
                          "sepia(10%) saturate(110%) hue-rotate(190deg) brightness(95%)",
                      }}
                    />
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-primary-400 mb-4 mx-auto md:mx-0" />

                  <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  <div className="mb-4">
                    <div className="flex justify-center md:justify-start mb-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        )
                      )}
                    </div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-primary-600 font-medium">
                      {testimonials[currentTestimonial].title}
                    </div>
                    <div className="text-gray-500">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="bg-primary-50 px-4 py-2 rounded-full">
                      <span className="font-medium text-primary-700">
                        Project:{" "}
                      </span>
                      <span className="text-gray-700">
                        {testimonials[currentTestimonial].project}
                      </span>
                    </div>
                    <div className="bg-green-50 px-4 py-2 rounded-full">
                      <span className="font-medium text-green-700">
                        Result:{" "}
                      </span>
                      <span className="text-gray-700">
                        {testimonials[currentTestimonial].result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-primary-500 scale-125"
                      : "bg-gray-300 hover:bg-primary-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Client Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-xl cursor-pointer"
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-200 mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter:
                        "sepia(10%) saturate(110%) hue-rotate(190deg) brightness(95%)",
                    }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-700 text-sm line-clamp-3">
                "{testimonial.text.substring(0, 120)}..."
              </p>

              <div className="mt-4 text-xs text-primary-600 font-medium">
                {testimonial.result}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center glass p-6 rounded-xl"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
