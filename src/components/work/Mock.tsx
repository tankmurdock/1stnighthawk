import { useEffect, useRef, useState } from "react";

/**
 * Mock — miniature product UIs rendered as real DOM.
 *
 * Each mock is authored on a fixed 1200×900 design canvas and scaled to
 * fit its container with a transform. That means type stays crisp at any
 * card size, nothing is downloaded, and each mock can be a genuinely
 * different design language instead of a recolour.
 */

const W = 1200;
const H = 900;

function Frame({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0) setScale(r.width / W);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    /* These are decorative miniatures of products, not real UI. Hiding the
       whole tree stops screen readers announcing a fake page structure
       (navs, mains, headings) inside a thumbnail. */
    <div
      ref={wrapRef}
      className="relative h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute left-0 top-0 select-none"
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Mock({ id }: { id: number }) {
  return (
    <Frame>
      {id === 1 && <Meridian />}
      {id === 2 && <Vantage />}
      {id === 3 && <Atlas />}
      {id === 4 && <Relay />}
      {id === 5 && <Kiln />}
      {id === 6 && <Nocturne />}
    </Frame>
  );
}

/* ══ 01 · MERIDIAN — editorial restraint, limestone + bronze ═══════ */
function Meridian() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0d0b09]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 72% -10%, rgba(200,166,120,0.13) 0%, transparent 62%)",
        }}
      />

      <header className="relative flex items-center justify-between px-16 pt-12">
        <span className="font-display text-[19px] uppercase tracking-[0.42em] text-[#e8ddc9]">
          Meridian
        </span>
        <nav className="flex gap-9">
          {["Firm", "Work", "Insight", "Contact"].map((t) => (
            <span
              key={t}
              className="text-[12px] uppercase tracking-[0.18em] text-[#7a6f5f]"
            >
              {t}
            </span>
          ))}
        </nav>
      </header>

      <div className="relative flex-1 px-16 pt-24">
        <div className="h-px w-full bg-[#c8a678]/25" />

        <div className="mt-16 max-w-[78%]">
          <div className="font-display text-[84px] font-light leading-[1.02] tracking-[-0.025em] text-[#f2ece1]">
            Long horizon
            <br />
            capital.
          </div>
          <p className="mt-9 max-w-[62%] text-[17px] leading-[1.85] text-[#8b8070]">
            Patient investment in businesses that compound quietly, over decades
            rather than quarters.
          </p>
        </div>

        <div className="absolute bottom-16 left-16 right-16 flex items-end justify-between">
          <span className="border-b border-[#c8a678]/45 pb-2 text-[12px] uppercase tracking-[0.24em] text-[#c8a678]">
            Read the annual letter
          </span>
          <div className="text-right">
            <div className="font-display text-[64px] font-light leading-none text-[#c8a678]">
              $4.2B
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.26em] text-[#5d5445]">
              Under management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══ 02 · VANTAGE — dense ops console ═════════════════════════════ */
function Vantage() {
  const rows = [
    {
      id: "LD-4471",
      route: "SAV → JAX",
      state: "Delayed",
      tone: "#ffa03a",
      pct: 62,
    },
    {
      id: "LD-4490",
      route: "TAM → ATL",
      state: "On time",
      tone: "#74d0e6",
      pct: 88,
    },
    {
      id: "LD-4512",
      route: "MIA → ORL",
      state: "At risk",
      tone: "#ff6a2c",
      pct: 34,
    },
    {
      id: "LD-4523",
      route: "JAX → CHS",
      state: "On time",
      tone: "#74d0e6",
      pct: 96,
    },
    {
      id: "LD-4540",
      route: "ORL → SAV",
      state: "On time",
      tone: "#74d0e6",
      pct: 74,
    },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#070d12]">
      <aside className="flex w-[196px] flex-col gap-6 border-r border-[#12202b] bg-[#060b10] p-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-ice" />
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#8ba3b5]">
            Vantage
          </span>
        </div>
        <div className="mt-4 space-y-1.5">
          {["Queue", "Fleet", "Routes", "Reports", "Settings"].map((t, i) => (
            <div
              key={t}
              className="rounded-md px-3 py-2 text-[12px]"
              style={{
                background: i === 0 ? "rgba(116,208,230,0.12)" : "transparent",
                color: i === 0 ? "#74d0e6" : "#4a6478",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-9">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#456072]">
              Operations
            </div>
            <div className="mt-2 font-display text-[26px] font-medium text-[#d6e5ef]">
              Dispatch queue
            </div>
          </div>
          <span className="rounded-md bg-ice/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-ice">
            4 need attention
          </span>
        </div>

        <div className="mt-7 space-y-2">
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-6 rounded-lg border border-[#12202b] bg-[#0a141b] px-5 py-4"
            >
              <span className="w-20 font-mono text-[11px] text-[#456072]">
                {r.id}
              </span>
              <span className="w-32 text-[13px] text-[#c2d6e2]">{r.route}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#12202b]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${r.pct}%`, background: r.tone }}
                />
              </div>
              <span
                className="w-20 text-right text-[11px] uppercase tracking-[0.12em]"
                style={{ color: r.tone }}
              >
                {r.state}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {[
            { k: "On time", v: "94.2%", c: "#c2d6e2" },
            { k: "Idle units", v: "08", c: "#74d0e6" },
            { k: "Avg dwell", v: "41m", c: "#c2d6e2" },
          ].map((m) => (
            <div
              key={m.k}
              className="rounded-lg border border-[#12202b] bg-[#081118] px-5 py-4"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#456072]">
                {m.k}
              </div>
              <div
                className="mt-2 font-display text-[28px] leading-none"
                style={{ color: m.c }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ══ 03 · ATLAS — asymmetric photographic archive ════════════════ */
function Atlas() {
  return (
    <div className="h-full w-full overflow-hidden bg-[#0b0c0a] p-12">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[30px] tracking-[-0.02em] text-[#e2e3d8]">
          Atlas
        </span>
        <span className="text-[11px] uppercase tracking-[0.26em] text-[#6b7160]">
          Plate 014 · Valley fog
        </span>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 aspect-[4/3] overflow-hidden">
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(158deg, #4d5740 0%, #2c3326 44%, #12150e 100%)",
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="aspect-square overflow-hidden">
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(205deg, #757b66 0%, #20241a 72%)",
              }}
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(118deg, #3d4534 0%, #0f1109 92%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-10 border-t border-[#262c20] pt-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9aa88a]">
          001 / 240
        </span>
        <p className="max-w-[56%] text-[14px] leading-[1.8] text-[#707a63]">
          Silver gelatin, 16 × 20 inches. Exposed at first light, seconds before
          the valley fog broke apart under the sun.
        </p>
      </div>
    </div>
  );
}

/* ══ 04 · RELAY — single-glyph mobile answer ═════════════════════ */
function Relay() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0a0806]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 46% at 50% 40%, rgba(255,160,58,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="relative h-[700px] w-[340px] rounded-[42px] border border-[#2a241d] bg-[#0d0a07] p-6">
        <div className="mx-auto h-1.5 w-24 rounded-full bg-[#2a241d]" />

        <div className="mt-14 flex flex-col items-center">
          <div className="font-display text-[150px] font-light leading-none text-sodium">
            7
          </div>
          <div className="mt-1 text-[13px] uppercase tracking-[0.34em] text-[#736550]">
            minutes
          </div>

          <div className="mt-10 h-px w-[68%] bg-[#2a241d]" />

          <div className="mt-10 text-center text-[15px] leading-[1.7] text-[#a8977f]">
            Leave now,
            <br />
            arrive at 08:42
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-9">
          <div className="rounded-full bg-sodium py-4 text-center text-[13px] font-medium uppercase tracking-[0.22em] text-[#0d0a07]">
            Go
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: i === 0 ? "#ffa03a" : "#2a241d" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══ 05 · KILN — token layers made visible ══════════════════════ */
function Kiln() {
  const tokens = [
    { name: "radius.sm", val: "4px", bg: "#d98c5f" },
    { name: "radius.md", val: "8px", bg: "#c07a52" },
    { name: "radius.lg", val: "16px", bg: "#a3663f" },
    { name: "surface.raised", val: "#1a1512", bg: "#3a2a22" },
    { name: "accent.primary", val: "#d98c5f", bg: "#d98c5f" },
    { name: "text.muted", val: "#8a7263", bg: "#8a7263" },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#100d0b]">
      <aside className="w-[300px] border-r border-[#2a201a] p-8">
        <span className="text-[11px] uppercase tracking-[0.26em] text-[#7a6250]">
          Token layers
        </span>
        <div className="mt-7 space-y-5">
          {["primitive", "semantic", "component"].map((t, i) => (
            <div
              key={t}
              className="flex items-center gap-3 text-[13px] uppercase tracking-[0.14em]"
              style={{ color: i === 1 ? "#d98c5f" : "#5c4a3d" }}
            >
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: i === 1 ? "#d98c5f" : "#2a201a" }}
              />
              {t}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-[#2a201a] p-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#5c4a3d]">
            Theme
          </div>
          <div className="mt-2 font-display text-[20px] text-[#c9b5a4]">
            Ember
          </div>
        </div>
      </aside>

      <main className="flex-1 p-9">
        <div className="flex items-center justify-between">
          <div className="font-display text-[24px] font-medium text-[#e4d3c4]">
            Tokens
          </div>
          <span className="font-mono text-[11px] text-[#5c4a3d]">
            410 total
          </span>
        </div>

        <div className="mt-6 divide-y divide-[#211913]">
          {tokens.map((t) => (
            <div key={t.name} className="flex items-center gap-4 py-3">
              <span
                className="h-7 w-7 shrink-0 rounded-md border border-white/10"
                style={{ background: t.bg }}
              />
              <span className="flex-1 font-mono text-[12px] text-[#c9b5a4]">
                {t.name}
              </span>
              <span className="font-mono text-[11px] text-[#5c4a3d]">
                {t.val}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex gap-3">
          <div className="rounded-lg bg-[#d98c5f] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#100d0b]">
            Primary
          </div>
          <div className="rounded-lg border border-[#3a2a22] px-6 py-3 text-[12px] uppercase tracking-[0.14em] text-[#c9b5a4]">
            Secondary
          </div>
        </div>
      </main>
    </div>
  );
}

/* ══ 06 · NOCTURNE — extruded type under a moving rig ═══════════ */
function Nocturne() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[#08070d]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 44% at 50% 60%, rgba(167,139,250,0.26) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute -top-[25%] left-[28%] h-[110%] w-[130px] origin-top"
        style={{
          background:
            "linear-gradient(180deg, rgba(167,139,250,0.32), transparent 76%)",
          transform: "rotate(15deg)",
          filter: "blur(16px)",
        }}
      />
      <div
        className="absolute -top-[25%] right-[26%] h-[110%] w-[130px] origin-top"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,160,58,0.24), transparent 76%)",
          transform: "rotate(-17deg)",
          filter: "blur(16px)",
        }}
      />

      <div className="relative px-16">
        <div className="text-[11px] uppercase tracking-[0.42em] text-[#6c5f92]">
          Live · Fri 15 Nov · 20:00
        </div>

        <div
          className="mt-6 font-display text-[112px] font-semibold uppercase leading-[0.84] tracking-[-0.035em]"
          style={{
            color: "#efeaff",
            textShadow:
              "2px 2px 0 #a78bfa, 5px 5px 0 #4a3a7a, 11px 11px 26px rgba(0,0,0,0.85)",
          }}
        >
          Nocturne
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-[#2a2440] pt-6">
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#a78bfa]">
            Doors 20:00 · All ages
          </span>
          <div className="flex items-end gap-1.5">
            {[38, 26, 52, 30, 64, 22, 44, 34].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-full bg-[#a78bfa]/70"
                style={{ height: h }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
