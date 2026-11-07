import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "../ui/Button";
import { Reveal, SplitLines } from "../ui/Type";
import { projects } from "../../lib/content";
import Mock from "../work/Mock";

export default function WorkPreview() {
  // Lead with real client work, then fill with concepts.
  const client = projects.filter((p) => p.kind === "Client");
  const featured = [
    ...client,
    ...projects.filter((p) => p.kind === "Concept"),
  ].slice(0, 3);

  return (
    <section className="relative border-t border-haze/40 bg-void py-24 sm:py-32">
      <div className="container-x">
        <Eyebrow index="03">Concept work</Eyebrow>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitLines
            as="h2"
            className="display max-w-[16ch] text-[clamp(1.9rem,4.4vw,3.5rem)] text-bone"
          >
            {"Built to solve\none specific problem."}
          </SplitLines>

          <Reveal delay={0.25}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 border-b border-haze pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60 transition-colors duration-300 hover:border-sodium/60 hover:text-bone"
            >
              All concepts
              <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-8">
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-bone/40">
            Real client work sits alongside self-directed studies. Concept
            pieces are labelled as such — I&rsquo;d rather show the thinking
            honestly than dress up a mockup as a case study.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden bg-haze/40 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={0.1 + i * 0.1}>
              <Link
                to={`/work/${p.slug}`}
                data-cursor="open"
                className="group relative block bg-void p-1 transition-colors duration-500 hover:bg-dusk"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-abyss">
                  {p.media?.length ? (
                    <img
                      src={p.media[0].src}
                      alt={p.media[0].alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                      <Mock id={p.preview} />
                    </div>
                  )}

                  {/* real-client badge, top-left of the image */}
                  {p.kind === "Client" && (
                    <span className="absolute left-3 top-3 border border-sodium/60 bg-void/80 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-sodium backdrop-blur-sm">
                      Client
                    </span>
                  )}

                  {/* hover veil */}
                  <div className="absolute inset-0 bg-void/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-2 border border-bone/30 bg-void/60 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                      {p.kind === "Client" ? "View project" : "Open study"}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-lg font-medium tracking-tight text-bone">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mute">
                      {p.discipline}
                    </p>
                  </div>
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: p.accent }}
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
