import React from "react";

/**
 * Miniature styled "website screenshot" previews for the Featured Work section.
 * Each one renders a unique fictional site design as actual HTML/CSS,
 * giving the appearance of a real portfolio thumbnail.
 */

function CorporateRebrand() {
  return (
    <div className="w-full h-full bg-[#0a0f1a] text-white p-5 flex flex-col overflow-hidden select-none">
      {/* Nav */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-orange-500" />
          <span className="font-display text-[9px] tracking-[3px] uppercase text-gray-300">Axiom Corp</span>
        </div>
        <div className="flex gap-4">
          {["About", "Services", "Team"].map((t) => (
            <span key={t} className="text-[7px] tracking-[2px] uppercase text-gray-600">{t}</span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-[7px] tracking-[4px] uppercase text-amber-400/70 mb-3">Reimagined Identity</span>
        <div className="font-display text-2xl sm:text-3xl font-bold leading-[1.1] mb-4 tracking-wide">
          <span className="text-white">Building</span>{" "}
          <span className="text-amber-400">Tomorrow's</span>
          <br />
          <span className="text-gray-400">Legacy Today</span>
        </div>
        <div className="w-20 h-[1px] bg-gradient-to-r from-amber-400 to-transparent mb-4" />
        <p className="text-[8px] text-gray-600 leading-relaxed max-w-[70%]">
          A complete brand transformation for a Fortune 500 enterprise,
          unifying 12 sub-brands under one cohesive visual system.
        </p>
      </div>

      {/* Bottom stats */}
      <div className="flex gap-6 mt-auto pt-4 border-t border-white/5">
        {[
          { label: "Sub-brands", val: "12" },
          { label: "Touchpoints", val: "240+" },
          { label: "Markets", val: "Global" },
        ].map((s) => (
          <div key={s.label}>
            <div className="font-display text-sm text-amber-400">{s.val}</div>
            <div className="text-[6px] tracking-[2px] uppercase text-gray-700">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStartup() {
  return (
    <div className="w-full h-full bg-[#030712] text-white p-5 flex flex-col overflow-hidden select-none">
      {/* Nav */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-emerald-400/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-display text-[9px] tracking-[3px] uppercase text-gray-400">Nexus</span>
        </div>
        <div className="w-14 h-5 rounded border border-emerald-500/30 flex items-center justify-center">
          <span className="text-[6px] tracking-[2px] uppercase text-emerald-400">Launch</span>
        </div>
      </div>

      {/* Dashboard mock */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="text-[7px] tracking-[3px] uppercase text-gray-600 mb-1">Analytics Dashboard</div>

        {/* Chart area */}
        <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 relative overflow-hidden">
          <div className="flex items-end gap-[3px] h-full pb-4">
            {[35, 52, 41, 68, 55, 72, 48, 85, 62, 78, 90, 70, 82, 95, 88, 75, 92, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, rgba(52,211,153,${0.6 + (h / 200)}) 0%, rgba(52,211,153,0.1) 100%)`,
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-3 right-3 h-[1px] bg-white/5" />
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Users", val: "24.8K", change: "+12%" },
            { label: "Revenue", val: "$1.2M", change: "+28%" },
            { label: "Growth", val: "340%", change: "+89%" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="text-[6px] text-gray-600 tracking-wider uppercase">{m.label}</div>
              <div className="font-display text-xs text-white mt-0.5">{m.val}</div>
              <div className="text-[7px] text-emerald-400 mt-0.5">{m.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CreativePortfolio() {
  return (
    <div className="w-full h-full bg-[#f5f0eb] text-[#1a1a1a] p-5 flex flex-col overflow-hidden select-none">
      {/* Nav */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-display text-[10px] tracking-[4px] uppercase text-[#1a1a1a]">Studio Miro</span>
        <div className="w-5 h-5 flex flex-col gap-[3px] items-end">
          <div className="w-5 h-[1.5px] bg-[#1a1a1a]" />
          <div className="w-3 h-[1.5px] bg-[#1a1a1a]" />
        </div>
      </div>

      {/* Grid layout */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#c9a87c] to-[#8b6f47] relative row-span-2">
          <div className="absolute inset-0 flex items-end p-3">
            <div>
              <div className="text-[6px] tracking-[3px] uppercase text-white/60">Photography</div>
              <div className="text-[10px] font-bold text-white">Quiet Spaces</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] relative">
          <div className="absolute inset-0 flex items-end p-3">
            <div>
              <div className="text-[6px] tracking-[3px] uppercase text-white/40">Motion</div>
              <div className="text-[10px] font-bold text-white">Fluid Forms</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#d4a574] to-[#b8845a] relative">
          <div className="absolute inset-0 flex items-end p-3">
            <div>
              <div className="text-[6px] tracking-[3px] uppercase text-white/60">Branding</div>
              <div className="text-[10px] font-bold text-white">Raw Earth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[7px] tracking-[3px] uppercase text-[#999]">Selected Works 2024</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-[#1a1a1a]" : "bg-[#ccc]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FitnessApp() {
  return (
    <div className="w-full h-full bg-[#0f0f0f] text-white p-5 flex flex-col overflow-hidden select-none">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[7px] text-gray-500">9:41</span>
        <div className="flex gap-1">
          <div className="w-3 h-1.5 rounded-sm bg-gray-600" />
          <div className="w-3 h-1.5 rounded-sm bg-gray-600" />
          <div className="w-4 h-1.5 rounded-sm bg-green-400" />
        </div>
      </div>

      {/* App header */}
      <div className="mb-4">
        <div className="text-[7px] tracking-[3px] uppercase text-gray-600 mb-1">Today's Progress</div>
        <div className="font-display text-xl font-bold tracking-wide">
          <span className="text-white">Your </span>
          <span className="text-violet-400">Workout</span>
        </div>
      </div>

      {/* Ring progress */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#1a1a2e" strokeWidth="5" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="#a78bfa" strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 34 * 0.72} ${2 * Math.PI * 34}`}
              strokeLinecap="round" />
            <circle cx="40" cy="40" r="26" fill="none" stroke="#1a1a2e" strokeWidth="5" />
            <circle cx="40" cy="40" r="26" fill="none" stroke="#f472b6" strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 26 * 0.58} ${2 * Math.PI * 26}`}
              strokeLinecap="round" />
            <circle cx="40" cy="40" r="18" fill="none" stroke="#1a1a2e" strokeWidth="5" />
            <circle cx="40" cy="40" r="18" fill="none" stroke="#34d399" strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 18 * 0.85} ${2 * Math.PI * 18}`}
              strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-xs text-white">72%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { color: "bg-violet-400", label: "Move", val: "420 cal" },
            { color: "bg-pink-400", label: "Exercise", val: "32 min" },
            { color: "bg-emerald-400", label: "Stand", val: "10 hrs" },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${r.color}`} />
              <span className="text-[7px] text-gray-500 w-10">{r.label}</span>
              <span className="text-[8px] text-white font-medium">{r.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Workout cards */}
      <div className="flex-1 flex flex-col gap-2">
        {[
          { name: "HIIT Training", dur: "45 min", cal: "380 cal", color: "from-violet-500/20 to-violet-500/5" },
          { name: "Yoga Flow", dur: "30 min", cal: "150 cal", color: "from-pink-500/20 to-pink-500/5" },
        ].map((w) => (
          <div key={w.name} className={`rounded-xl bg-gradient-to-r ${w.color} border border-white/[0.06] p-3 flex items-center justify-between`}>
            <div>
              <div className="text-[9px] font-bold text-white">{w.name}</div>
              <div className="text-[7px] text-gray-500">{w.dur}</div>
            </div>
            <span className="text-[8px] text-gray-400">{w.cal}</span>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around mt-3 pt-3 border-t border-white/[0.06]">
        {["Home", "Workouts", "Stats", "Profile"].map((t, i) => (
          <span key={t} className={`text-[6px] tracking-wider uppercase ${i === 0 ? "text-violet-400" : "text-gray-700"}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function AdventureBrand() {
  return (
    <div className="w-full h-full bg-[#0c1a0c] text-white p-5 flex flex-col overflow-hidden select-none relative">
      {/* Topographic pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300ff88' stroke-width='0.5'%3E%3Cpath d='M30 5c14 0 25 11 25 25s-11 25-25 25S5 44 5 30 16 5 30 5z'/%3E%3Cpath d='M30 12c10 0 18 8 18 18s-8 18-18 18-18-8-18-18 8-18 18-18z'/%3E%3Cpath d='M30 20c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Nav */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
            <path d="M12 2L2 19h20L12 2z" />
          </svg>
          <span className="font-display text-[9px] tracking-[4px] uppercase text-gray-400">Basecamp Co</span>
        </div>
        <span className="text-[7px] tracking-[2px] uppercase text-green-400/60">Explore</span>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="text-[7px] tracking-[5px] uppercase text-green-500/50 mb-3">Adventure Awaits</div>
        <div className="font-display text-2xl sm:text-3xl font-bold leading-[1.1] mb-4 tracking-wide">
          <span className="text-white">Find Your</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Wild Side</span>
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-r from-green-500 to-transparent mb-4" />
        <p className="text-[8px] text-gray-600 leading-relaxed max-w-[65%]">
          Crafted for the bold. An outdoor brand identity that captures
          the spirit of untamed exploration.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 relative z-10">
        {["Logo Design", "Brand Guide", "Packaging", "Digital"].map((tag) => (
          <span key={tag} className="text-[6px] tracking-[2px] uppercase text-green-500/40 border border-green-500/10 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export const projectPreviews: Record<number, () => React.ReactNode> = {
  1: CorporateRebrand,
  2: TechStartup,
  3: CreativePortfolio,
  4: FitnessApp,
  5: AdventureBrand,
};
