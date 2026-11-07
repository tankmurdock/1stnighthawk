import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { site, nav } from "../../lib/content";
import { SplitLines } from "../ui/Type";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-haze/40 bg-abyss">
      {/* warm floor light — the sodium spill from the hero, carried through */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[70%] -translate-x-1/2 rounded-[100%] opacity-40 blur-[100px]"
        style={{
          background: "radial-gradient(ellipse, #ffa03a 0%, transparent 70%)",
        }}
      />

      <div className="container-x relative py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="label mb-5 text-sodium/70">Next step</p>
            <SplitLines
              as="h2"
              className="display max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)] text-bone"
            >
              {"Have something\nworth building?"}
            </SplitLines>

            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-3 border-b border-sodium/30 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sodium transition-colors duration-500 hover:border-sodium"
              data-cursor="write"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div>
            <p className="label mb-5">Sitemap</p>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="wipe font-sans text-sm text-bone/60 transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-5">Direct</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="wipe font-sans text-sm text-bone/60 transition-colors duration-300 hover:text-bone"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="wipe font-sans text-sm text-bone/60 transition-colors duration-300 hover:text-bone"
                >
                  {site.phone}
                </a>
              </li>
              <li className="font-sans text-sm text-mute">{site.location}</li>
            </ul>

            <div className="mt-7 flex items-center gap-4">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-mute transition-colors duration-300 hover:text-sodium"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-mute transition-colors duration-300 hover:text-sodium"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-haze/40 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute/70">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute/50">
            {site.role} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
