import { Link } from "react-router-dom";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { Eyebrow } from "../ui/Button";
import { Reveal, SplitLines } from "../ui/Type";
import { experiments } from "../../lib/content";

export default function LabPreview() {
  return (
    <section className="relative overflow-hidden border-t border-haze/40 bg-abyss py-24 sm:py-32">
      {/* faint measurement grid — reads as an instrument panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(38,49,63,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(38,49,63,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 40%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 40%, #000 20%, transparent 78%)",
        }}
      />

      <div className="container-x relative">
        <Eyebrow index="04">The lab</Eyebrow>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
          <SplitLines
            as="h2"
            className="display max-w-[15ch] text-[clamp(1.9rem,4.4vw,3.5rem)] text-bone"
          >
            {"Six things you can\nactually touch."}
          </SplitLines>

          <Reveal delay={0.2}>
            <p className="max-w-lg font-sans text-[15px] leading-[1.8] text-bone/50">
              Portfolio pages show screenshots. These are live, running in your
              browser right now. Shaders, springs, variable-font interpolation —
              the techniques that make an interface feel expensive rather than
              decorated.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px bg-haze/30 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp, i) => (
            <Reveal key={exp.id} delay={0.06 * i}>
              <Link
                to={`/lab#${exp.id}`}
                data-cursor="open"
                className="group relative flex h-full flex-col justify-between gap-8 bg-abyss p-7 transition-colors duration-500 hover:bg-dusk"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-sodium/60">
                    {exp.n}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-mute transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sodium" />
                </div>

                <div>
                  <h3 className="font-display text-lg font-medium tracking-tight text-bone">
                    {exp.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-bone/40">
                    {exp.description.split(".")[0]}.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-haze/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-mute/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* hover accent line */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-sodium transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <Link
            to="/lab"
            className="group inline-flex items-center gap-3 border border-haze px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80 transition-colors duration-500 hover:border-sodium/60 hover:text-bone"
          >
            <FlaskConical className="h-3.5 w-3.5 text-sodium" />
            Open all six
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
