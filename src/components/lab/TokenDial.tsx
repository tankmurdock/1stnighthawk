import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════
   04 · TOKEN DIAL
   A live theme engine. Sliders write CSS custom properties on the
   host element, and a real component tree re-skins instantly. No
   React re-render on drag, no reflow of layout — only composited
   property changes.
   ══════════════════════════════════════════════════════════════════ */

export function TokenDial() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const controls =
      host.querySelectorAll<HTMLInputElement>("input[data-token]");
    const outputs = host.querySelectorAll<HTMLElement>("[data-readout]");

    const apply = () => {
      controls.forEach((input) => {
        const token = input.dataset.token!;
        const value = input.dataset.unit
          ? `${input.value}${input.dataset.unit}`
          : input.value;

        host.style.setProperty(token, value);

        const readout = host.querySelector<HTMLElement>(
          `[data-readout="${token}"]`,
        );
        if (readout) readout.textContent = value;
      });
    };

    controls.forEach((input) => input.addEventListener("input", apply));
    apply();

    void outputs;
    return () => {
      controls.forEach((input) => input.removeEventListener("input", apply));
    };
  }, []);

  return (
    <div ref={hostRef} className="flex h-full flex-col">
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 sm:grid-cols-[1fr_1.1fr] sm:p-8">
        {/* controls */}
        <div className="flex flex-col justify-center gap-5">
          <Dial
            token="--td-radius"
            label="Radius"
            min={0}
            max={24}
            defaultValue={6}
            unit="px"
          />
          <Dial
            token="--td-density"
            label="Density"
            min={8}
            max={24}
            defaultValue={14}
            unit="px"
          />
          <Dial
            token="--td-hue"
            label="Accent hue"
            min={0}
            max={360}
            defaultValue={32}
            unit=""
          />
        </div>

        {/* live specimen */}
        <div
          className="flex flex-col justify-center gap-3 border border-haze/60 p-5"
          style={{ borderRadius: "calc(var(--td-radius, 6px) + 4px)" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">
              Specimen
            </span>
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "hsl(var(--td-hue, 32) 92% 58%)" }}
            />
          </div>

          <div className="font-display text-xl leading-tight text-bone">
            Rebrand in real time
          </div>

          <p className="font-sans text-[12px] leading-relaxed text-bone/45">
            Every surface here reads the same token layer.
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            <button
              className="px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-void transition-transform duration-300 hover:scale-[1.03]"
              style={{
                borderRadius: "var(--td-radius, 6px)",
                paddingBlock: "var(--td-density, 14px)",
                background: "hsl(var(--td-hue, 32) 92% 58%)",
              }}
            >
              Primary
            </button>
            <button
              className="border px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/80 transition-colors duration-300 hover:border-bone/40"
              style={{
                borderRadius: "var(--td-radius, 6px)",
                paddingBlock: "var(--td-density, 14px)",
                borderColor: "hsl(var(--td-hue, 32) 60% 40% / 0.55)",
              }}
            >
              Secondary
            </button>
          </div>

          <div
            className="mt-2 flex items-center gap-3 border p-3"
            style={{
              borderRadius: "var(--td-radius, 6px)",
              borderColor: "hsl(var(--td-hue, 32) 40% 30% / 0.5)",
              background: "hsl(var(--td-hue, 32) 30% 12% / 0.6)",
            }}
          >
            <span
              className="grid h-7 w-7 shrink-0 place-items-center text-[11px] text-void"
              style={{
                borderRadius: "var(--td-radius, 6px)",
                background: "hsl(var(--td-hue, 32) 92% 58%)",
              }}
            >
              ✓
            </span>
            <span className="flex-1 font-sans text-[11px] text-bone/60">
              Nested surface inherits the layer
            </span>
          </div>
        </div>
      </div>

      <p className="px-8 pb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        Three custom properties · zero re-renders
      </p>

      <style>{`
        [data-token] {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          border-radius: 2px;
          background: rgba(244,241,234,0.14);
          outline: none;
          cursor: pointer;
        }
        [data-token]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #ffa03a;
          border: 2px solid #04050a;
          cursor: grab;
        }
        [data-token]::-moz-range-thumb {
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: #ffa03a;
          border: 2px solid #04050a;
          cursor: grab;
        }
      `}</style>
    </div>
  );
}

function Dial({
  token,
  label,
  min,
  max,
  defaultValue,
  unit,
}: {
  token: string;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">
          {label}
        </span>
        <span
          data-readout={token}
          className="font-mono text-[9px] tracking-[0.1em] text-sodium"
        >
          {defaultValue}
          {unit}
        </span>
      </span>
      <input
        type="range"
        data-token={token}
        data-unit={unit}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="w-full"
        aria-label={label}
      />
    </label>
  );
}
