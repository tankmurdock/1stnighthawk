import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

interface NavbarProps {
  introComplete?: boolean;
}

export default function Navbar({ introComplete = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      setIsHidden(currentY > lastScrollY && currentY > 400);
      setShowBrand(currentY > window.innerHeight * 0.5);
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: !introComplete ? -100 : isHidden ? -100 : 0,
        opacity: introComplete ? 1 : 0,
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-[#00c8ff]/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <motion.img
                src="/nighthawk.jpeg"
                alt="1st Nighthawk Innovations"
                className="h-11 w-auto shrink-0"
                animate={{
                  opacity: isHome && !showBrand ? 0 : 1,
                  scale: isHome && !showBrand ? 0.8 : 1,
                }}
                transition={{ duration: 0.4 }}
              />
              <motion.span
                className="hidden sm:block font-display font-bold text-xs tracking-[3px] uppercase text-gray-200 whitespace-nowrap"
                animate={{
                  opacity: isHome && !showBrand ? 0 : 1,
                  x: isHome && !showBrand ? -10 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                1st Nighthawk Innovations
              </motion.span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-sans text-sm font-medium tracking-[3px] uppercase transition-colors duration-300 link-underline ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="font-sans text-sm font-medium tracking-[2px] uppercase text-[#00c8ff] border border-[#00c8ff33] px-6 py-3 rounded-none transition-all duration-300 hover:bg-[#00c8ff]/5 hover:border-[#00c8ff66] hover:shadow-[0_0_25px_rgba(0,200,255,0.08)]"
              >
                Let's Talk
              </motion.button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-10 p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              <Link to="/">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-display font-bold tracking-[4px] uppercase text-white"
                >
                  Home
                </motion.span>
              </Link>
              {navItems.map((item, i) => (
                <Link key={item.path} to={item.path}>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="text-2xl font-display font-bold tracking-[4px] uppercase text-white"
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/contact">
                  <span className="font-sans text-lg font-medium tracking-[2px] uppercase text-[#00c8ff] border border-[#00c8ff33] px-8 py-3 mt-4 inline-block transition-all duration-300 hover:bg-[#00c8ff]/5">
                    Let's Talk
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
