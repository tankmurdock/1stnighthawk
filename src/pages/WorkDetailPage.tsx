import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, site } from "../lib/content";
import { Reveal, SplitLines } from "../components/ui/Type";
import Mock from "../components/work/Mock";
import { usePageTitle } from "../hooks/usePageTitle";

export default function WorkDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const index = projects.findIndex((p) => p.slug === slug);

  usePageTitle(
    project
      ? `${project.title} — ${project.kind === "Client" ? "Client Work" : "Concept Study"} — ${site.name}`
      : `Concept Work — ${site.name}`,
  );

  if (!project) return <Navigate to="/work" replace />;

  const next = projects[(index + 1) % projects.length];
  const isClient = project.kind === "Client";
  const gallery = project.media?.slice(1) ?? [];

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
          <span
            className={
              isClient
                ? "border border-sodium/60 bg-sodium/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-sodium"
                : "border border-haze/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mute"
            }
          >
            {project.kind === "Client" ? "Client work" : "Concept"}
          </span>
          {/* Status keeps us honest about what is actually shipped. */}
          {project.status && (
            <span className="border border-ice/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ice/80">
              {project.status}
            </span>
          )}
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

        {project.liveUrl && (
          <Reveal delay={0.35} className="mt-8">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 border-b border-sodium/30 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sodium transition-colors duration-300 hover:border-sodium"
            >
              Visit the live site
              <ExternalLink className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        )}
      </section>

      {/* Hero — real screenshot for client work, DOM mock for concepts */}
      <section className="container-x">
        <Reveal className="overflow-hidden border border-haze/50">
          {project.media?.length ? (
            <div className="relative aspect-[16/10] bg-abyss">
              <img
                src={project.media[0].src}
                alt={project.media[0].alt}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="relative aspect-[16/10] bg-abyss">
              <Mock id={project.preview} />
            </div>
          )}
        </Reveal>
      </section>

      {/* Premise / problem / approach */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <p className="label mb-5 text-sodium/60">
              {isClient ? "The situation" : "The premise"}
            </p>
            <p className="font-sans text-[15px] leading-[1.85] text-bone/60">
              {project.premise}
            </p>

            {project.problem && (
              <>
                <p className="label mb-4 mt-10 text-sodium/60">The problem</p>
                <p className="border-l border-sodium/30 pl-5 font-sans text-[15px] leading-[1.85] text-bone/55">
                  {project.problem}
                </p>
              </>
            )}

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
                  delay={0.06 * i}
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

            {project.results && (
              <Reveal delay={0.2} className="mt-12">
                <p className="label mb-5 text-sodium/60">
                  {project.status === "Working prototype"
                    ? "What's built"
                    : "What shipped"}
                </p>
                <div className="grid grid-cols-2 gap-px overflow-hidden border border-haze/50 bg-haze/40">
                  {project.results.map((r) => (
                    <div key={r.label} className="bg-abyss px-5 py-6">
                      <div className="font-display text-2xl font-medium text-bone">
                        {r.value}
                      </div>
                      <div className="mt-1.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-mute">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {project.reflection && (
              <Reveal
                delay={0.28}
                className="mt-10 border border-haze/60 bg-dusk/40 p-6"
              >
                <p className="label mb-4 text-mute">
                  What I&rsquo;d do differently
                </p>
                <p className="font-sans text-[14px] leading-[1.8] text-bone/50">
                  {project.reflection}
                </p>
              </Reveal>
            )}

            {!project.reflection && !isClient && (
              <Reveal
                delay={0.3}
                className="mt-12 border border-haze/60 bg-dusk/40 p-6"
              >
                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-mute">
                  Concept work — no client engagement, no invented metrics.
                  Built to demonstrate the thinking and the execution.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Gallery — only for real work */}
      {gallery.length > 0 && (
        <section className="container-x pb-20 sm:pb-28">
          <p className="label mb-8">In detail</p>
          <div className="grid gap-6 sm:grid-cols-2">
            {gallery.map((m, i) => (
              <Reveal
                key={m.src}
                delay={0.06 * i}
                className={
                  i === 0
                    ? "overflow-hidden border border-haze/50 sm:col-span-2"
                    : "overflow-hidden border border-haze/50"
                }
              >
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Next */}
      <section className="border-t border-haze/40">
        <Link
          to={`/work/${next.slug}`}
          data-cursor="open"
          className="group container-x flex items-center justify-between gap-8 py-16"
        >
          <div>
            <p className="label mb-3">
              Next {next.kind === "Client" ? "project" : "study"}
            </p>
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
