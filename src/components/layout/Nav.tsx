import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { nav, site } from "../../lib/content";
import { cn } from "../../lib/utils";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      // only hide when moving down, and never near the top
      setHidden(y > last && y > 320);
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[200] transition-[transform,background-color,backdrop-filter,border-color] duration-700",
          "border-b",
          scrolled
            ? "border-haze/60 bg-void/78 backdrop-blur-xl"
            : "border-transparent bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="container-x flex h-[68px] items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <img
              src="/nighthawk.jpeg"
              alt=""
              className="h-8 w-8 rounded-sm object-cover opacity-90 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[13px] font-semibold tracking-tight text-bone">
                Nighthawk
              </span>
              <span className="label mt-1 text-[8px] tracking-[0.22em]">
                Innovations
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300",
                    active ? "text-bone" : "text-mute hover:text-bone",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-sodium transition-all duration-500",
                      active ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="group relative hidden overflow-hidden border border-sodium/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-sodium transition-colors duration-500 hover:border-sodium hover:text-void md:inline-block"
            >
              <span className="relative z-10">Start a project</span>
              <span className="absolute inset-0 -translate-y-full bg-sodium transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 text-bone md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[190] bg-void transition-opacity duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="container-x flex h-full flex-col justify-center gap-2 pb-20">
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-baseline gap-4 border-b border-haze/50 py-5"
              style={{
                transform: open ? "none" : "translateY(18px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, opacity 0.5s ease ${i * 0.06}s`,
              }}
            >
              <span className="label text-[9px] text-sodium/60">0{i + 1}</span>
              <span className="display text-4xl text-bone">{item.label}</span>
            </Link>
          ))}

          <div className="mt-10 space-y-2">
            <a
              href={`mailto:${site.email}`}
              className="block font-mono text-sm text-mute"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="block font-mono text-sm text-mute"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
