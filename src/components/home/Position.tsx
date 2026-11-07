import { Eyebrow } from "../ui/Button";
import { Reveal, SplitLines } from "../ui/Type";
import { facts } from "../../lib/content";

export default function Position() {
  return (
    <section className="relative border-t border-haze/40 bg-void py-24 sm:py-32">
      <div className="container-x">
        <Eyebrow index="01">Position</Eyebrow>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          <div>
            <SplitLines
              as="h2"
              className="display text-[clamp(1.9rem,4.4vw,3.5rem)] text-bone"
              delay={0.05}
            >
              {
                "Most sites look fine.\nThen the lights go out\nand nothing holds."
              }
            </SplitLines>

            <Reveal delay={0.35} className="mt-9 space-y-5">
              <p className="max-w-xl font-sans text-[15px] leading-[1.75] text-bone/55">
                Anyone can assemble a page that survives a screenshot. The
                difference shows up later — at 1200px, on a slow phone, with a
                keyboard, with motion turned off, six months in when the brand
                shifts and someone has to change every corner radius by hand.
              </p>
              <p className="max-w-xl font-sans text-[15px] leading-[1.75] text-bone/55">
                I work both sides of that line. Design the thing, then build the
                thing, so the intent survives implementation instead of getting
                negotiated away in a handoff document.
              </p>
            </Reveal>
          </div>

          {/* Fact rail — every claim here is verifiable, none invented */}
          <div className="lg:pt-2">
            <div className="border-t border-haze/60">
              {facts.map((f, i) => (
                <Reveal
                  key={f.label}
                  delay={0.1 + i * 0.08}
                  className="flex items-baseline justify-between gap-6 border-b border-haze/60 py-6"
                >
                  <span className="font-display text-lg font-medium tracking-tight text-bone sm:text-xl">
                    {f.value}
                  </span>
                  <span className="max-w-[15ch] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-mute">
                    {f.label}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.45} className="mt-8">
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-mute/60">
                No stock template. No page-builder theme.
                <br />
                This site is hand-built, and you&rsquo;re looking at it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
