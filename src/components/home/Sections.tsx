import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Position from "./Position";
import CapabilitiesSection from "./CapabilitiesSection";
import LabPreview from "./LabPreview";
import WorkPreview from "./WorkPreview";
import ProcessSection from "./ProcessSection";

export default function Sections() {
  return (
    <>
      <Position />
      <CapabilitiesSection />
      <WorkPreview />
      <LabPreview />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-haze/40 bg-void py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #ffa03a 0%, transparent 68%)",
        }}
      />

      <div className="container-x relative text-center">
        <p className="label mb-7 text-sodium/70">06 / Contact</p>

        <h2 className="display mx-auto max-w-[19ch] text-[clamp(2.2rem,6.4vw,5rem)] text-bone">
          Let&rsquo;s make your next build
          <span className="text-sodium"> worth the visit.</span>
        </h2>

        <p className="mx-auto mt-7 max-w-lg font-sans text-[15px] leading-relaxed text-bone/50">
          Send me what you&rsquo;re working on. I answer every message myself,
          usually within a day.
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            data-cursor="write"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-sodium px-9 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-void"
          >
            <span className="relative z-10">Start a project</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute inset-0 -translate-y-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
          </Link>

          <a
            href="mailto:1stnighthawkllc@gmail.com"
            className="wipe font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60 transition-colors duration-300 hover:text-bone"
          >
            1stnighthawkllc@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
