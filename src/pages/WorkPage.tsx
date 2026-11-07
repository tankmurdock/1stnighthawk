import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "../components/ui/Button";
import { SplitLines, Reveal } from "../components/ui/Type";
import { projects, disciplines } from "../lib/content";
import { cn } from "../lib/utils";
import Mock from "../components/work/Mock";
import { usePageTitle } from "../hooks/usePageTitle";

export default function WorkPage() {
  usePageTitle("Concept Work — 1st Nighthawk Innovations");
  const [filter, setFilter] = useState<string>("All");

  const shown =
    filter === "All"
      ? projects
      : projects.filter((p) => p.discipline === filter);

  return (
    <main className="pt-28 sm:pt-32">
      <section className="container-x pb-14">
        <Eyebrow>Concept studies</Eyebrow>

        <SplitLines
          as="h1"
          className="display mt-10 max-w-[17ch] text-[clamp(2.4rem,7vw,5.2rem)] text-bone"
        >
          {"Work made to\nanswer a question."}
        </SplitLines>

        <Reveal delay={0.3} className="mt-8 max-w-2xl space-y-4">
          <p className="font-sans text-[15px] leading-[1.8] text-bone/55">
            These are self-directed concepts. No client briefs, no invented
            logos, no metrics I can&rsquo;t prove. Each one starts from a
            specific problem and is judged on whether the design actually solves
            it.
          </p>
          <p className="font-sans text-[14px] leading-[1.8] text-bone/35">
            Client work is available on request — some of it is under NDA, which
            is its own kind of proof.
          </p>
        </Reveal>
      </section>

      {/* Filters */}
      <section className="container-x pb-10">
        <div className="flex flex-wrap gap-2 border-t border-haze/50 pt-6">
          {disciplines.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={cn(
                "border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-400",
                filter === d
                  ? "border-sodium/70 bg-sodium/10 text-sodium"
                  : "border-haze/70 text-mute hover:border-haze hover:text-bone/70",
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-x pb-28">
        <div className="grid gap-px bg-haze/30 sm:grid-cols-2">
          {shown.map((p, i) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              data-cursor="open"
              className="group relative bg-void p-px transition-colors duration-500 hover:bg-dusk"
              style={{
                animation: `fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-abyss">
                <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
                  <Mock id={p.preview} />
                </div>

                <div className="absolute inset-0 bg-void/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="flex items-center gap-2 border border-bone/25 bg-void/70 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                    Open study
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-5 p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-medium tracking-tight text-bone">
                      {p.title}
                    </h2>
                    <span className="border border-haze/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-mute">
                      {p.kind}
                    </span>
                  </div>
                  <p className="mt-2 max-w-md font-sans text-[13px] leading-relaxed text-bone/40">
                    {p.summary}
                  </p>
                </div>
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: p.accent }}
                />
              </div>
            </Link>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="py-20 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Nothing in this discipline yet
          </p>
        )}
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
