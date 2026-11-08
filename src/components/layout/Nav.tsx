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
    let raf = 0;
    // Mirrors of the state so we can skip renders when nothing changed.
    // Without this, setScrolled/setHidden fire on every scroll event even
    // when the boolean is identical, re-rendering the header continuously
    // during the hero fade — the exact moment that feels jerky.
    let curScrolled = false;
    let curHidden = false;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const nextScrolled = y > 32;
        // only hide when moving down, and never near the top
        const nextHidden = y > last && y > 320;
        last = y;

        if (nextScrolled !== curScrolled) {
          curScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
        if (nextHidden !== curHidden) {
          curHidden = nextHidden;
          setHidden(nextHidden);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
            {/* Stacked lockup at every size — the business name is always
                fully visible. Type steps down on phones instead of the
                name being truncated to "1st Nighthawk". */}
            <span className="flex flex-col leading-none">
              <span className="font-display text-[11px] font-semibold tracking-tight text-bone sm:text-[13px]">
                {site.wordmark.first}
              </span>
              <span className="label mt-1 text-[7px] tracking-[0.18em] sm:text-[8px] sm:tracking-[0.22em]">
                {site.wordmark.second}
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
            {/* Full business name in the menu overlay — this is often the
                first place a phone visitor confirms whose site they're on. */}
            <p className="mb-6 font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-bone">
              {site.name}
            </p>
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
