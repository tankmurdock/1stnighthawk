import { Eyebrow } from "../ui/Button";
import { Reveal, SplitLines } from "../ui/Type";
import { process } from "../../lib/content";

export default function ProcessSection() {
  return (
    <section className="relative border-t border-haze/40 bg-void py-24 sm:py-32">
      <div className="container-x">
        <Eyebrow index="05">How it runs</Eyebrow>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <SplitLines
              as="h2"
              className="display max-w-[14ch] text-[clamp(1.9rem,4.4vw,3.5rem)] text-bone"
            >
              {"Four steps.\nNo mystery."}
            </SplitLines>

            <Reveal delay={0.25} className="mt-7">
              <p className="max-w-sm font-sans text-[15px] leading-[1.8] text-bone/50">
                Most of the risk in a design project comes from unclear scope
                and late surprises. This is the sequence that removes both.
              </p>
            </Reveal>
          </div>

          <div>
            {process.map((step, i) => (
              <Reveal
                key={step.n}
                delay={0.08 * i}
                className="group grid grid-cols-[auto_1fr] gap-6 border-t border-haze/60 py-7 last:border-b"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-sodium/60">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-bone">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-md font-sans text-[14px] leading-[1.8] text-bone/45">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
