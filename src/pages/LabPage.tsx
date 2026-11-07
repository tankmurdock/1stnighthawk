import { lazy, Suspense } from "react";
import { Eyebrow } from "../components/ui/Button";
import { SplitLines, Reveal } from "../components/ui/Type";
import { experiments } from "../lib/content";
import { useInViewOnce } from "../hooks/useMotion";
import { usePageTitle } from "../hooks/usePageTitle";

const ShaderButton = lazy(() =>
  import("../components/lab/ShaderButton").then((m) => ({
    default: m.ShaderButton,
  })),
);
const MagneticGrid = lazy(() =>
  import("../components/lab/MagneticGrid").then((m) => ({
    default: m.MagneticGrid,
  })),
);
const MorphBlob = lazy(() =>
  import("../components/lab/MorphBlob").then((m) => ({
    default: m.MorphBlob,
  })),
);
const TokenDial = lazy(() =>
  import("../components/lab/TokenDial").then((m) => ({ default: m.TokenDial })),
);
const KineticType = lazy(() =>
  import("../components/lab/KineticType").then((m) => ({
    default: m.KineticType,
  })),
);
const FluidField = lazy(() =>
  import("../components/lab/FluidField").then((m) => ({
    default: m.FluidField,
  })),
);

const registry: Record<string, React.ComponentType> = {
  "shader-button": ShaderButton,
  "magnetic-grid": MagneticGrid,
  "morph-blob": MorphBlob,
  "token-dial": TokenDial,
  "kinetic-type": KineticType,
  "fluid-field": FluidField,
};

export default function LabPage() {
  usePageTitle("The Lab — 1st Nighthawk Innovations");

  return (
    <main className="pt-28 sm:pt-32">
      <section className="container-x pb-16">
        <Eyebrow>Interactive</Eyebrow>

        <SplitLines
          as="h1"
          className="display mt-10 max-w-[16ch] text-[clamp(2.4rem,7vw,5.2rem)] text-bone"
        >
          {"The lab.\nEverything is live."}
        </SplitLines>

        <Reveal delay={0.3} className="mt-8 max-w-2xl">
          <p className="font-sans text-[15px] leading-[1.8] text-bone/55">
            No videos, no GIFs, no screenshots. Each study below is running in
            your browser as you read this. Move your pointer, drag, scroll,
            click &mdash; they all respond.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-28">
        <div className="grid gap-px bg-haze/30 md:grid-cols-2">
          {experiments.map((exp, i) => (
            <ExperimentCell
              key={exp.id}
              id={exp.id}
              n={exp.n}
              title={exp.title}
              description={exp.description}
              tech={exp.tech}
              index={i}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ExperimentCell({
  id,
  n,
  title,
  description,
  tech,
  index,
}: {
  id: string;
  n: string;
  title: string;
  description: string;
  tech: string[];
  index: number;
}) {
  // Mount the live experiment once it first enters the viewport, then keep
  // it mounted. Toggling on scroll-out would tear down and rebuild WebGL
  // contexts every time the user scrolls past, which is both wasteful and
  // visibly slow.
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.05, true);
  const Comp = registry[id];

  return (
    <div
      id={id}
      ref={ref}
      className="group relative flex flex-col bg-void transition-colors duration-500 hover:bg-dusk/30"
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-sodium/60">
              {n}
            </span>
            <h2 className="font-display text-lg font-medium tracking-tight text-bone">
              {title}
            </h2>
          </div>
          <p className="mt-2 max-w-sm font-sans text-[13px] leading-relaxed text-bone/40">
            {description}
          </p>
        </div>
      </div>

      {/* Live stage */}
      <div className="relative mt-4 min-h-[300px] flex-1 overflow-hidden sm:min-h-[360px]">
        {inView && Comp ? (
          <Suspense fallback={<Stage />}>
            <Comp />
          </Suspense>
        ) : (
          <Stage />
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-haze/40 px-6 py-4 sm:px-8">
        {tech.map((t) => (
          <span
            key={t}
            className="border border-haze/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-mute/80"
          >
            {t}
          </span>
        ))}
        <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.14em] text-mute/40">
          0{index + 1} / 06
        </span>
      </div>
    </div>
  );
}

function Stage() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-px w-24 overflow-hidden bg-haze/60">
        <div
          className="h-full w-1/3 bg-sodium"
          style={{ animation: "stageLoad 1.4s ease-in-out infinite" }}
        />
      </div>
      <style>{`
        @keyframes stageLoad {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </div>
  );
}
