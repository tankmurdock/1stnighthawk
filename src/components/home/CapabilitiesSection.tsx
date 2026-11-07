import { useState } from "react";
import { Eyebrow } from "../ui/Button";
import { SplitLines } from "../ui/Type";
import { capabilities } from "../../lib/content";
import { cn } from "../../lib/utils";

export default function CapabilitiesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative border-t border-haze/40 bg-abyss py-24 sm:py-32">
      <div className="container-x">
        <Eyebrow index="02">What I do</Eyebrow>

        <SplitLines
          as="h2"
          className="display mt-12 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.5rem)] text-bone"
        >
          Four things, done properly.
        </SplitLines>

        {/* Interactive ledger — hover/tap swaps the detail panel.
            Rows stay visible so the whole offer is scannable at once. */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="border-t border-haze/60">
            {capabilities.map((cap, i) => (
              <button
                key={cap.n}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex w-full items-start gap-5 border-b border-haze/60 py-7 text-left transition-colors duration-500",
                  active === i
                    ? "text-bone"
                    : "text-bone/45 hover:text-bone/70",
                )}
                aria-pressed={active === i}
              >
                {/* active indicator bar */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-0 h-full w-px bg-sodium transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active === i ? "scale-y-100" : "scale-y-0",
                  )}
                  style={{ transformOrigin: "top" }}
                />
                <span className="ml-4 font-mono text-[10px] tracking-[0.2em] text-sodium/60">
                  {cap.n}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl font-medium tracking-tight sm:text-2xl">
                    {cap.title}
                  </span>
                  {/* on mobile, show the body inline since there's no hover */}
                  <span className="mt-3 block font-sans text-sm leading-relaxed text-bone/45 lg:hidden">
                    {cap.body}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Desktop detail panel */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div key={active} className="animate-[fadeIn_0.5s_ease]">
                <p className="label mb-5 text-sodium/60">
                  {capabilities[active].n} / Detail
                </p>
                <p className="font-sans text-[15px] leading-[1.8] text-bone/60">
                  {capabilities[active].body}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {capabilities[active].items.map((item) => (
                    <span
                      key={item}
                      className="border border-haze/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-mute"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
