import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-[#00c8ff]/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="mb-20">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-8 tracking-wide uppercase"
          >
            Let's build something
            <br />
            <span className="text-[#00c8ff]">extraordinary.</span>
          </motion.h2>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="font-sans text-base font-medium tracking-[2px] uppercase text-[#00c8ff] border border-[#00c8ff33] px-8 py-4 transition-all duration-300 hover:bg-[#00c8ff]/5 hover:border-[#00c8ff66] hover:shadow-[0_0_25px_rgba(0,200,255,0.08)] group flex items-center gap-2"
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 pb-16 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/nighthawk.jpeg"
                alt="1st Nighthawk Innovations"
                className="h-10 w-auto"
              />
              <span className="font-display font-bold text-xs tracking-[2px] uppercase text-white whitespace-nowrap">
                1st Nighthawk Innovations
              </span>
            </div>
            <p className="text-gray-600 font-sans text-sm leading-relaxed max-w-xs">
              Crafting premium digital experiences through expert UI/UX design
              and cutting-edge development.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[4px] text-gray-600 mb-6">
              Navigation
            </h3>
            <div className="flex flex-col gap-3">
              <Link to="/" className="font-sans text-gray-400 hover:text-white transition-colors text-sm tracking-wide link-underline w-fit">
                Home
              </Link>
              <Link to="/work" className="font-sans text-gray-400 hover:text-white transition-colors text-sm tracking-wide link-underline w-fit">
                Work
              </Link>
              <Link to="/contact" className="font-sans text-gray-400 hover:text-white transition-colors text-sm tracking-wide link-underline w-fit">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[4px] text-gray-600 mb-6">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:1stnighthawkllc@gmail.com"
                className="font-sans text-gray-400 hover:text-white transition-colors text-sm tracking-wide link-underline w-fit"
              >
                1stnighthawkllc@gmail.com
              </a>
              <a
                href="tel:+19043383032"
                className="font-sans text-gray-400 hover:text-white transition-colors text-sm tracking-wide link-underline w-fit"
              >
                +1 (904) 338-3032
              </a>
              <span className="font-sans text-gray-600 text-sm">
                Jacksonville, Florida
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <p className="font-sans text-gray-700 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} 1st Nighthawk Innovations. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href="https://github.com/tankmurdock"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-[#00c8ff] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-[#00c8ff] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-[#00c8ff] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
