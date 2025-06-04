import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle Background Hawks */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 100, opacity: 0.3 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-16 w-24 h-24"
        >
          <img
            src="/hawks1.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ x: 800, opacity: 0 }}
          animate={{ x: -100, opacity: 0.2 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
          className="absolute bottom-20 w-20 h-20"
        >
          <img
            src="/hawks3.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex items-center relative"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-12 md:h-16 w-auto brightness-0 invert"
                  style={{ filter: "brightness(0) invert(1)" }}
                >
                  <source src="/1st-nighthawk-animated.mp4" type="video/mp4" />
                  {/* Fallback for browsers that don't support video */}
                  <img
                    src="/1st-Nighthawk-logo.png"
                    alt="1st Nighthawk Innovations Logo"
                    className="h-12 md:h-16 w-auto brightness-0 invert"
                  />
                </video>
                {/* Subtle hawk silhouette behind logo */}
                <div className="absolute -right-6 md:-right-8 top-1 md:top-2 w-6 md:w-8 h-6 md:h-8 opacity-20">
                  <img
                    src="/animated-hawk-4.jpg"
                    alt=""
                    className="w-full h-full object-cover rounded-full brightness-0 invert"
                  />
                </div>
              </motion.div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
              Transforming visionary ideas into cutting-edge web applications
              and digital experiences. We specialize in creating stunning,
              interactive components that captivate audiences and drive
              engagement.
            </p>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base break-all">
                  1stnighthawkllc@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">
                  +1 (904) 338-3032
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">
                  Jacksonville, Florida
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative hawk silhouette */}
            <div className="absolute -top-4 -right-2 w-6 h-6 opacity-10">
              <img
                src="/hawks2.jpg"
                alt=""
                className="w-full h-full object-cover rounded-full brightness-0 invert"
              />
            </div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm md:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/components"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm md:text-base"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  to="/animations"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm md:text-base"
                >
                  Animations
                </Link>
              </li>
              <li>
                <Link
                  to="/configurator"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm md:text-base"
                >
                  Configurator
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm md:text-base"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm md:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300 text-sm md:text-base">
                  Web Development
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">
                  App Development
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">
                  UI/UX Design
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">
                  Animation & Interactions
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">
                  Component Libraries
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">
                  Custom Solutions
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center relative space-y-4 md:space-y-0"
        >
          {/* Decorative corner hawks */}
          <div className="absolute left-0 top-4 w-4 h-4 opacity-10">
            <img
              src="/animated-hawk-3.jpg"
              alt=""
              className="w-full h-full object-cover rounded-full brightness-0 invert"
            />
          </div>
          <div className="absolute right-0 top-4 w-4 h-4 opacity-10">
            <img
              src="/animated-hawk-1.jpg"
              alt=""
              className="w-full h-full object-cover rounded-full brightness-0 invert"
            />
          </div>

          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © 2024 1st Nighthawk Innovations. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <motion.a
              href="https://github.com/tankmurdock"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
