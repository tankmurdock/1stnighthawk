import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../lib/content";
import { Reveal, SplitLines } from "../components/ui/Type";
import Mock from "../components/work/Mock";
import { usePageTitle } from "../hooks/usePageTitle";

export default function WorkDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const index = projects.findIndex((p) => p.slug === slug);

  usePageTitle(
    project
      ? `${project.title} — Concept Study — 1st Nighthawk Innovations`
      : "Concept Work — 1st Nighthawk Innovations",
  );

  if (!project) return <Navigate to="/work" replace />;

  const next = projects[(index + 1) % projects.length];

  return (
    <main className="pt-24 sm:pt-28">
      {/* Header */}
      <section className="container-x pb-12">
        <Link
          to="/work"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute transition-colors duration-300 hover:text-bone"
        >
          <ArrowLeft className="h-3 w-3 transition-transform duration-500 group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="border border-haze/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-sodium/80">
            {project.kind}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
            {project.discipline}
          </span>
          <span className="text-haze">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
            {project.year}
          </span>
        </div>

        <SplitLines
          as="h1"
          className="display mt-6 text-[clamp(2.6rem,8vw,6rem)] text-bone"
        >
          {project.title}
        </SplitLines>

        <Reveal delay={0.25} className="mt-6 max-w-2xl">
          <p className="font-sans text-lg leading-[1.7] text-bone/60">
            {project.summary}
          </p>
        </Reveal>
      </section>

      {/* Hero mock */}
      <section className="container-x">
        <Reveal className="overflow-hidden border border-haze/50">
          <div className="relative aspect-[16/10] bg-abyss">
            <Mock id={project.preview} />
          </div>
        </Reveal>
      </section>

      {/* Premise + approach */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <p className="label mb-5 text-sodium/60">The premise</p>
            <p className="font-sans text-[15px] leading-[1.85] text-bone/60">
              {project.premise}
            </p>

            <div className="mt-10 border-t border-haze/60">
              {project.craft.map((c) => (
                <div
                  key={c.label}
                  className="flex items-baseline justify-between border-b border-haze/60 py-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                    {c.label}
                  </span>
                  <span className="font-display text-sm font-medium text-bone">
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-5 text-sodium/60">The approach</p>
            <ol className="space-y-6">
              {project.approach.map((point, i) => (
                <Reveal
                  key={i}
                  delay={0.08 * i}
                  className="grid grid-cols-[auto_1fr] gap-5"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-mute/60">
                    0{i + 1}
                  </span>
                  <p className="font-sans text-[15px] leading-[1.8] text-bone/55">
                    {point}
                  </p>
                </Reveal>
              ))}
            </ol>

            <Reveal
              delay={0.3}
              className="mt-12 border border-haze/60 bg-dusk/40 p-6"
            >
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-mute">
                Concept work — no client engagement, no invented metrics. Built
                to demonstrate the thinking and the execution.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-haze/40">
        <Link
          to={`/work/${next.slug}`}
          data-cursor="open"
          className="group container-x flex items-center justify-between gap-8 py-16"
        >
          <div>
            <p className="label mb-3">Next study</p>
            <p className="display text-[clamp(1.6rem,4.5vw,3rem)] text-bone/80 transition-colors duration-500 group-hover:text-bone">
              {next.title}
            </p>
          </div>
          <ArrowUpRight className="h-7 w-7 shrink-0 text-mute transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sodium" />
        </Link>
      </section>
    </main>
  );
}
