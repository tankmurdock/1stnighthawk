import React from "react";

/**
 * Landscape-oriented (16:10) site preview components for the Work page grid.
 * Base fontSize: 2px with em units — every em = 2px, filling frames densely.
 */

/* ═══════════════════════════════════════════════════════════
   1. TechVault — SaaS Platform Redesign
   ═══════════════════════════════════════════════════════════ */
export function TechVaultPreview() {
  return (
    <div className="w-full h-full bg-[#06080f] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "2px" }}>
      <div className="absolute top-0 right-[20%] w-[40%] h-[50%] bg-blue-500/[0.06] rounded-full blur-[40px]" />

      {/* Nav */}
      <div className="flex items-center justify-between px-[8em] py-[4em] border-b border-white/[0.04] relative z-10">
        <div className="flex items-center gap-[12em]">
          <div className="flex items-center gap-[2em]">
            <div className="w-[5em] h-[5em] rounded-[1.5em] bg-gradient-to-br from-blue-400 to-blue-600" />
            <span className="font-display text-[4.5em] tracking-[0.2em] font-bold">TechVault</span>
          </div>
          <div className="flex gap-[6em]">
            {["Platform", "Solutions", "Developers", "Pricing", "Resources"].map((t) => (
              <span key={t} className="text-[3em] text-gray-500">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[4em]">
          <span className="text-[3em] text-gray-400">Log In</span>
          <div className="bg-blue-500 px-[5em] py-[2em] rounded-[1.5em]">
            <span className="text-[3em] font-bold text-white">Start Free Trial</span>
          </div>
        </div>
      </div>

      {/* Hero — split */}
      <div className="flex flex-1 min-h-0 relative z-10">
        <div className="w-[44%] flex flex-col justify-center px-[8em] py-[4em]">
          <div className="inline-flex items-center gap-[2em] bg-blue-500/10 rounded-full px-[4em] py-[1.5em] mb-[3em] w-fit">
            <div className="w-[2em] h-[2em] rounded-full bg-blue-400" />
            <span className="text-[2.5em] text-blue-400">New: AI-Powered Workflows</span>
          </div>
          <div className="font-display text-[10em] font-bold leading-[1.05] mb-[3em]">
            <span className="text-white">Build </span>
            <span style={{ background: "linear-gradient(135deg, #3b82f6, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>faster.</span>
            <br />
            <span className="text-gray-500">Ship smarter.</span>
          </div>
          <p className="text-[3em] text-gray-600 leading-[1.5] mb-[4em] max-w-[95%]">
            The developer platform that brings your entire stack together. Deploy, monitor, and scale with confidence.
          </p>
          <div className="flex gap-[3em] mb-[4em]">
            <div className="bg-blue-500 px-[5em] py-[2.5em] rounded-[1.5em]">
              <span className="text-[3em] font-bold text-white">Get Started →</span>
            </div>
            <div className="border border-white/10 px-[5em] py-[2.5em] rounded-[1.5em]">
              <span className="text-[3em] text-gray-400">View Demo</span>
            </div>
          </div>
          <div className="flex items-center gap-[2em]">
            <div className="flex -space-x-[1.5em]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[4em] h-[4em] rounded-full border-[0.5em] border-[#06080f]"
                  style={{ background: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][i] }} />
              ))}
            </div>
            <span className="text-[2.5em] text-gray-500">Trusted by 10,000+ teams</span>
          </div>
        </div>

        {/* Product screenshot */}
        <div className="w-[56%] flex items-center pr-[6em] py-[4em]">
          <div className="w-full rounded-[3em] border border-white/[0.08] bg-[#0a0f1a] overflow-hidden shadow-2xl shadow-blue-500/5">
            <div className="flex items-center justify-between px-[3em] py-[2em] border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-[1.5em]">
                <div className="w-[2em] h-[2em] rounded-full bg-red-400/60" />
                <div className="w-[2em] h-[2em] rounded-full bg-yellow-400/60" />
                <div className="w-[2em] h-[2em] rounded-full bg-green-400/60" />
              </div>
              <div className="w-[40%] h-[2em] rounded-[0.8em] bg-white/[0.04]" />
              <div className="w-[4em]" />
            </div>
            <div className="flex">
              <div className="w-[14%] border-r border-white/[0.04] py-[3em] px-[2em]">
                <div className="w-[4em] h-[4em] rounded-[1em] bg-blue-500/20 mb-[3em] mx-auto" />
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`h-[2em] rounded-[0.8em] mb-[2em] mx-[0.5em] ${i === 1 ? "bg-blue-500/20" : "bg-white/[0.03]"}`}
                    style={{ width: `${50 + Math.random() * 40}%` }} />
                ))}
              </div>
              <div className="flex-1 p-[3em]">
                <div className="flex items-center justify-between mb-[3em]">
                  <span className="text-[3em] font-bold text-white">Dashboard</span>
                  <div className="flex gap-[2em]">
                    {["1D", "7D", "30D"].map((p, i) => (
                      <span key={p} className={`text-[2em] px-[2em] py-[1em] rounded-[0.8em] ${i === 1 ? "bg-blue-500/20 text-blue-400" : "text-gray-600"}`}>{p}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-[2em] mb-[3em]">
                  {[
                    { l: "API Calls", v: "2.4M", c: "+18%" },
                    { l: "Latency", v: "42ms", c: "-12%" },
                    { l: "Uptime", v: "99.99%", c: "stable" },
                    { l: "Users", v: "10.2K", c: "+24%" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-[1.5em] border border-white/[0.06] p-[2em] bg-white/[0.01]">
                      <span className="text-[2em] text-gray-600 block">{m.l}</span>
                      <span className="font-display text-[4em] font-bold text-white block">{m.v}</span>
                      <span className="text-[2em] text-blue-400">{m.c}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-[1.5em] border border-white/[0.06] p-[2em] bg-white/[0.01]">
                  <div className="flex items-end gap-[0.8em] h-[14em]">
                    {[30, 45, 38, 62, 52, 70, 44, 82, 58, 75, 88, 65, 78, 92, 85, 72, 90, 76, 84, 95, 80, 68, 86, 74, 88, 70, 82, 90].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-[0.5em]"
                        style={{ height: `${h}%`, background: `linear-gradient(180deg, rgba(59,130,246,${0.4 + h / 250}) 0%, rgba(59,130,246,0.05) 100%)` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="px-[8em] py-[3.5em] border-t border-white/[0.04] flex items-center justify-between relative z-10">
        <span className="text-[2.5em] text-gray-700 tracking-[0.2em] uppercase">Powering the best teams</span>
        <div className="flex gap-[10em]">
          {["VERCEL", "STRIPE", "GITHUB", "SHOPIFY", "NOTION", "LINEAR"].map((l) => (
            <span key={l} className="font-display text-[3em] tracking-[0.2em] text-gray-700/40 font-bold">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. Nextera — Corporate Rebrand
   ═══════════════════════════════════════════════════════════ */
export function NexteraPreview() {
  return (
    <div className="w-full h-full bg-[#0c0a14] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "2px" }}>
      <div className="absolute top-[10%] left-[40%] w-[35%] h-[50%] bg-purple-500/[0.05] rounded-full blur-[30px]" />

      {/* Nav */}
      <div className="flex items-center justify-between px-[8em] py-[4em] relative z-10">
        <div className="flex items-center gap-[3em]">
          <div className="w-[5em] h-[5em] rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center">
            <span className="font-display text-[3.5em] font-bold text-white">N</span>
          </div>
          <span className="font-display text-[4.5em] tracking-[0.15em] font-bold">Nextera</span>
        </div>
        <div className="flex gap-[6em]">
          {["About", "Services", "Case Studies", "Careers", "Contact"].map((t) => (
            <span key={t} className="text-[3em] text-gray-500">{t}</span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-1 min-h-0 relative z-10">
        <div className="w-[50%] flex flex-col justify-center px-[8em]">
          <span className="text-[3em] tracking-[0.4em] uppercase text-purple-400/60 mb-[3em]">Digital-First Brand Agency</span>
          <div className="font-display text-[11em] font-bold leading-[1.0] mb-[4em] tracking-[-0.01em]">
            <span className="text-white">Brands that</span>
            <br />
            <span className="italic text-purple-400">resonate</span>
            <span className="text-gray-500"> &</span>
            <br />
            <span className="text-gray-500">endure</span>
          </div>
          <div className="w-[20em] h-[0.5em] bg-gradient-to-r from-purple-400 to-transparent mb-[4em]" />
          <p className="text-[3em] text-gray-600 leading-[1.6] max-w-[90%]">
            We craft brand identities that unify vision across every touchpoint —
            from digital to physical, from boardroom to billboard.
          </p>
        </div>
        {/* Brand showcase */}
        <div className="w-[50%] flex items-center justify-center p-[5em]">
          <div className="w-full grid grid-cols-2 gap-[3em]">
            <div className="rounded-[3em] bg-gradient-to-br from-purple-900/40 to-purple-900/10 border border-purple-500/10 p-[4em] flex flex-col justify-between aspect-square">
              <span className="font-display text-[14em] font-bold text-purple-400/30 leading-none">N</span>
              <div>
                <span className="text-[3em] text-purple-300 block">Logo System</span>
                <span className="text-[2.5em] text-gray-600">12 variants</span>
              </div>
            </div>
            <div className="rounded-[3em] bg-white overflow-hidden flex flex-col aspect-square">
              <div className="flex-1 bg-gradient-to-br from-purple-400 to-fuchsia-500" />
              <div className="p-[3em]">
                <span className="text-[3em] text-gray-900 font-bold block">Color Palette</span>
                <div className="flex gap-[1em] mt-[1.5em]">
                  {["#a855f7", "#d946ef", "#0c0a14", "#f5f0ff", "#6b21a8"].map((c) => (
                    <div key={c} className="w-[3em] h-[3em] rounded-full border border-gray-200/50" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-[3em] border border-white/[0.06] bg-white/[0.02] p-[4em] flex flex-col justify-between aspect-square">
              <div>
                <span className="font-display text-[8em] font-bold text-white tracking-tight leading-none">Aa</span>
                <span className="text-[2.5em] text-gray-500 block mt-[1em]">Söhne / Inter</span>
              </div>
              <div>
                <span className="text-[3em] text-gray-300 block">Typography</span>
                <span className="text-[2.5em] text-gray-600">2 families, 8 weights</span>
              </div>
            </div>
            <div className="rounded-[3em] bg-gradient-to-br from-[#1a1528] to-[#0c0a14] border border-purple-500/10 p-[4em] flex flex-col justify-end aspect-square relative overflow-hidden">
              <div className="absolute top-[15%] left-[15%] w-[70%] h-[60%] rounded-full bg-purple-500/10 blur-[10px]" />
              <span className="text-[3em] text-purple-300 block relative z-10">Brand Guidelines</span>
              <span className="text-[2.5em] text-gray-600 relative z-10">240+ pages</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clients */}
      <div className="px-[8em] py-[3.5em] border-t border-white/[0.04] flex items-center gap-[12em] relative z-10">
        <span className="text-[2.5em] text-gray-700 tracking-[0.2em] uppercase whitespace-nowrap">Brand Clients</span>
        {["SOHO HOUSE", "STRIPE", "AIRBNB", "SPOTIFY", "NOTION"].map((l) => (
          <span key={l} className="font-display text-[3em] tracking-[0.2em] text-gray-700/40 font-bold">{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. GrowthLab — Analytics Dashboard
   ═══════════════════════════════════════════════════════════ */
export function GrowthLabPreview() {
  return (
    <div className="w-full h-full bg-[#080b12] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "1.8px" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-[5em] py-[3em] border-b border-white/[0.06] bg-[#0c1019] relative z-10">
        <div className="flex items-center gap-[8em]">
          <div className="flex items-center gap-[2em]">
            <svg viewBox="0 0 20 20" className="w-[5em] h-[5em]">
              <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#f59e0b" />
              <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#f59e0b" opacity="0.5" />
              <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#f59e0b" opacity="0.5" />
              <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#f59e0b" opacity="0.25" />
            </svg>
            <span className="font-display text-[5em] font-bold tracking-[0.1em]">GrowthLab</span>
          </div>
          <div className="flex gap-[4em]">
            {["Overview", "Analytics", "Funnels", "Cohorts", "Reports"].map((t, i) => (
              <span key={t} className={`text-[3em] px-[3em] py-[1.5em] rounded-[1em] ${i === 1 ? "bg-amber-500/10 text-amber-400" : "text-gray-500"}`}>{t}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[3em]">
          <div className="w-[22em] h-[4em] rounded-[1.5em] bg-white/[0.04] border border-white/[0.06]" />
          <div className="w-[5em] h-[5em] rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
        </div>
      </div>

      <div className="flex flex-1 min-h-0 relative z-10">
        {/* Sidebar */}
        <div className="w-[12%] border-r border-white/[0.04] py-[4em] px-[2em] bg-[#0a0e16] flex flex-col gap-[3em]">
          {["Dashboard", "Events", "Users", "Segments", "Experiments", "Settings"].map((item, i) => (
            <div key={item} className={`flex items-center gap-[1.5em] px-[2em] py-[1.5em] rounded-[1em] ${i === 0 ? "bg-amber-500/10" : ""}`}>
              <div className={`w-[2.5em] h-[2.5em] rounded-[0.6em] ${i === 0 ? "bg-amber-500/30" : "bg-white/[0.06]"}`} />
              <span className={`text-[2.5em] ${i === 0 ? "text-amber-400" : "text-gray-600"}`}>{item}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-[4em] overflow-hidden">
          <div className="flex items-center justify-between mb-[3em]">
            <div>
              <span className="font-display text-[5em] font-bold text-white block">Analytics Overview</span>
              <span className="text-[2.5em] text-gray-600">Last 30 days · Compared to previous period</span>
            </div>
            <div className="flex gap-[2em]">
              <div className="border border-white/[0.08] px-[4em] py-[2em] rounded-[1.5em]">
                <span className="text-[2.5em] text-gray-400">Export</span>
              </div>
              <div className="bg-amber-500 px-[4em] py-[2em] rounded-[1.5em]">
                <span className="text-[2.5em] font-bold text-[#080b12]">Create Report</span>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-5 gap-[2em] mb-[3em]">
            {[
              { l: "Total Revenue", v: "$842,491", c: "+23.1%", up: true },
              { l: "Active Users", v: "156,847", c: "+12.8%", up: true },
              { l: "Conversion", v: "4.28%", c: "+0.64%", up: true },
              { l: "Avg. Session", v: "8m 42s", c: "+18%", up: true },
              { l: "Bounce Rate", v: "24.1%", c: "-3.2%", up: false },
            ].map((m) => (
              <div key={m.l} className="rounded-[1.5em] border border-white/[0.06] p-[3em] bg-white/[0.01]">
                <span className="text-[2.2em] text-gray-600 block mb-[1em]">{m.l}</span>
                <span className="font-display text-[5em] font-bold text-white block">{m.v}</span>
                <span className={`text-[2.2em] ${m.up ? "text-emerald-400" : "text-red-400"}`}>{m.c}</span>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-3 gap-[2em] mb-[3em]">
            <div className="col-span-2 rounded-[1.5em] border border-white/[0.06] p-[3em] bg-white/[0.01]">
              <div className="flex justify-between items-center mb-[2em]">
                <span className="text-[3em] text-gray-300 font-bold">Revenue Trend</span>
                <div className="flex gap-[3em]">
                  <div className="flex items-center gap-[1.5em]"><div className="w-[2em] h-[0.8em] rounded bg-amber-400" /><span className="text-[2em] text-gray-500">Revenue</span></div>
                  <div className="flex items-center gap-[1.5em]"><div className="w-[2em] h-[0.8em] rounded bg-amber-400/30" /><span className="text-[2em] text-gray-500">Previous</span></div>
                </div>
              </div>
              <svg viewBox="0 0 400 60" className="w-full" preserveAspectRatio="none">
                <path d="M0 45 Q40 42 80 30 T160 22 T240 15 T320 18 T400 8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <path d="M0 45 Q40 42 80 30 T160 22 T240 15 T320 18 T400 8 L400 60 L0 60Z" fill="url(#amberGrad)" />
                <path d="M0 50 Q40 47 80 42 T160 36 T240 30 T320 34 T400 28" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
                <defs>
                  <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="rounded-[1.5em] border border-white/[0.06] p-[3em] bg-white/[0.01]">
              <span className="text-[3em] text-gray-300 font-bold block mb-[2em]">Traffic Sources</span>
              <div className="flex items-center justify-center mb-[2em]">
                <svg viewBox="0 0 80 80" className="w-[22em] h-[22em]">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#1a1a2e" strokeWidth="8" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#f59e0b" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 30 * 0.42} ${2 * Math.PI * 30}`} strokeLinecap="round" className="-rotate-90 origin-center" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#a855f7" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 30 * 0.28} ${2 * Math.PI * 30}`}
                    strokeDashoffset={`${-2 * Math.PI * 30 * 0.42}`} strokeLinecap="round" className="-rotate-90 origin-center" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#3b82f6" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 30 * 0.18} ${2 * Math.PI * 30}`}
                    strokeDashoffset={`${-2 * Math.PI * 30 * 0.70}`} strokeLinecap="round" className="-rotate-90 origin-center" />
                </svg>
              </div>
              <div className="flex flex-col gap-[1.5em]">
                {[
                  { c: "bg-amber-400", l: "Organic", v: "42%" },
                  { c: "bg-purple-400", l: "Paid", v: "28%" },
                  { c: "bg-blue-400", l: "Referral", v: "18%" },
                  { c: "bg-gray-600", l: "Direct", v: "12%" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center justify-between">
                    <div className="flex items-center gap-[1.5em]">
                      <div className={`w-[2em] h-[2em] rounded-full ${s.c}`} />
                      <span className="text-[2.2em] text-gray-500">{s.l}</span>
                    </div>
                    <span className="text-[2.2em] text-white font-bold">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-[1.5em] border border-white/[0.06] overflow-hidden">
            <div className="grid grid-cols-6 px-[3em] py-[2em] bg-white/[0.02] border-b border-white/[0.04]">
              {["Page", "Views", "Unique", "Bounce", "Avg. Time", "Conv."].map((h) => (
                <span key={h} className="text-[2.2em] text-gray-600 font-bold">{h}</span>
              ))}
            </div>
            {[
              { p: "/homepage", v: "84,291", u: "62,104", b: "22%", t: "4:32", c: "5.1%" },
              { p: "/pricing", v: "31,847", u: "28,941", b: "18%", t: "6:18", c: "12.4%" },
              { p: "/features", v: "24,103", u: "19,282", b: "31%", t: "3:47", c: "3.8%" },
              { p: "/blog/ai-tools", v: "18,492", u: "16,744", b: "42%", t: "5:55", c: "2.1%" },
            ].map((r) => (
              <div key={r.p} className="grid grid-cols-6 px-[3em] py-[1.8em] border-b border-white/[0.03]">
                <span className="text-[2.2em] text-blue-400">{r.p}</span>
                <span className="text-[2.2em] text-white">{r.v}</span>
                <span className="text-[2.2em] text-gray-400">{r.u}</span>
                <span className="text-[2.2em] text-gray-400">{r.b}</span>
                <span className="text-[2.2em] text-gray-400">{r.t}</span>
                <span className="text-[2.2em] text-amber-400">{r.c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. FitSync — Mobile Fitness App
   ═══════════════════════════════════════════════════════════ */
export function FitSyncPreview() {
  return (
    <div className="w-full h-full bg-[#080510] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "2px" }}>
      <div className="absolute top-0 left-[25%] w-[50%] h-[60%] bg-rose-500/[0.06] rounded-full blur-[40px]" />

      {/* Nav */}
      <div className="flex items-center justify-between px-[8em] py-[4em] relative z-10">
        <div className="flex items-center gap-[2em]">
          <svg viewBox="0 0 24 24" className="w-[6em] h-[6em]" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#f43f5e" strokeWidth="1.5" />
            <path d="M7 12h2l2-4 2 8 2-4h2" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-[4.5em] tracking-[0.15em] font-bold">FitSync</span>
        </div>
        <div className="flex items-center gap-[6em]">
          {["Features", "Pricing", "Stories", "Download"].map((t) => (
            <span key={t} className="text-[3em] text-gray-500">{t}</span>
          ))}
          <div className="bg-rose-500 px-[5em] py-[2em] rounded-[1.5em]">
            <span className="text-[3em] font-bold text-white">Try Free</span>
          </div>
        </div>
      </div>

      {/* Hero with phones */}
      <div className="flex flex-1 min-h-0 relative z-10 px-[8em]">
        <div className="w-[40%] flex flex-col justify-center">
          <div className="inline-flex items-center gap-[2em] bg-rose-500/10 border border-rose-500/20 rounded-full px-[4em] py-[1.5em] mb-[3em] w-fit">
            <span className="text-[2.5em] text-rose-400">★★★★★</span>
            <span className="text-[2.5em] text-gray-400">4.8 on App Store</span>
          </div>
          <div className="font-display text-[10em] font-bold leading-[1.05] mb-[3em]">
            <span className="text-white">Your fitness,</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>reimagined</span>
          </div>
          <p className="text-[3em] text-gray-600 leading-[1.5] mb-[4em] max-w-[95%]">
            AI coaching. Real-time tracking. Social challenges. The only fitness app that adapts as fast as you do.
          </p>
          <div className="flex gap-[3em] mb-[4em]">
            <div className="flex items-center gap-[1.5em] bg-white/[0.06] rounded-[2em] px-[4em] py-[2em] border border-white/[0.08]">
              <span className="text-[4em]">🍎</span>
              <div>
                <span className="text-[2em] text-gray-500 block">Download on</span>
                <span className="text-[3em] font-bold text-white">App Store</span>
              </div>
            </div>
            <div className="flex items-center gap-[1.5em] bg-white/[0.06] rounded-[2em] px-[4em] py-[2em] border border-white/[0.08]">
              <span className="text-[4em]">▶</span>
              <div>
                <span className="text-[2em] text-gray-500 block">Get it on</span>
                <span className="text-[3em] font-bold text-white">Google Play</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[2em]">
            <div className="flex -space-x-[1.5em]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[4em] h-[4em] rounded-full border-[0.5em] border-[#080510]"
                  style={{ background: ["#f43f5e", "#a78bfa", "#34d399", "#f59e0b", "#3b82f6"][i] }} />
              ))}
            </div>
            <span className="text-[2.5em] text-gray-500">50K+ downloads</span>
          </div>
        </div>

        {/* Phones */}
        <div className="w-[60%] flex items-center justify-center gap-[3em] py-[2em]">
          {/* Phone 1 */}
          <div className="w-[32%] rounded-[4em] border-[1em] border-gray-800 bg-[#0f0f15] overflow-hidden shadow-2xl shadow-rose-500/10 -rotate-3 translate-y-[3%]">
            <div className="p-[3em]">
              <div className="flex justify-between items-center mb-[3em]">
                <span className="font-display text-[4em] font-bold">Dashboard</span>
                <div className="w-[5em] h-[5em] rounded-full bg-gradient-to-br from-rose-400 to-pink-500" />
              </div>
              <div className="relative w-[20em] h-[20em] mx-auto mb-[3em]">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#f43f5e" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 34 * 0.75} ${2 * Math.PI * 34}`} strokeLinecap="round" />
                  <circle cx="40" cy="40" r="26" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                  <circle cx="40" cy="40" r="26" fill="none" stroke="#a78bfa" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 26 * 0.62} ${2 * Math.PI * 26}`} strokeLinecap="round" />
                  <circle cx="40" cy="40" r="18" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                  <circle cx="40" cy="40" r="18" fill="none" stroke="#34d399" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 18 * 0.85} ${2 * Math.PI * 18}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[5em] font-bold">75%</span>
                </div>
              </div>
              {[
                { n: "Morning Run", t: "5.2km", g: "from-rose-500/20 to-rose-500/5" },
                { n: "Strength", t: "45min", g: "from-violet-500/20 to-violet-500/5" },
                { n: "Yoga", t: "30min", g: "from-emerald-500/20 to-emerald-500/5" },
              ].map((w) => (
                <div key={w.n} className={`rounded-[2em] bg-gradient-to-r ${w.g} border border-white/[0.06] p-[2em] mb-[1.5em] flex justify-between items-center`}>
                  <span className="text-[3em] font-bold text-white">{w.n}</span>
                  <span className="text-[2.5em] text-gray-500">{w.t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Phone 2 */}
          <div className="w-[32%] rounded-[4em] border-[1em] border-gray-800 bg-[#0f0f15] overflow-hidden shadow-2xl shadow-rose-500/10 rotate-3 -translate-y-[3%]">
            <div className="p-[3em]">
              <span className="text-[2.5em] text-gray-500 block mb-[1em]">Active Workout</span>
              <span className="font-display text-[4.5em] font-bold text-rose-400 block mb-[2em]">HIIT Session</span>
              <div className="text-center mb-[3em]">
                <span className="font-display text-[14em] font-bold text-white block leading-none">24:38</span>
                <span className="text-[2.5em] text-gray-500">Elapsed Time</span>
              </div>
              <div className="grid grid-cols-3 gap-[1.5em] mb-[3em]">
                {[
                  { l: "Calories", v: "284" },
                  { l: "BPM", v: "142" },
                  { l: "Sets", v: "8/12" },
                ].map((m) => (
                  <div key={m.l} className="text-center rounded-[1.5em] bg-white/[0.03] border border-white/[0.06] p-[1.5em]">
                    <span className="text-[2em] text-gray-600 block">{m.l}</span>
                    <span className="font-display text-[4em] font-bold text-white">{m.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-[1.5em] bg-white/[0.02] border border-white/[0.06] p-[2em]">
                <span className="text-[2em] text-gray-500 block mb-[1em]">Heart Rate Zone</span>
                <svg viewBox="0 0 200 35" className="w-full" preserveAspectRatio="none">
                  <path d="M0 25 Q10 23 20 20 T40 16 T60 18 T80 12 T100 14 T120 9 T140 12 T160 8 T180 11 T200 6"
                    fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                  <path d="M0 25 Q10 23 20 20 T40 16 T60 18 T80 12 T100 14 T120 9 T140 12 T160 8 T180 11 T200 6 L200 35 L0 35Z"
                    fill="url(#roseGrad)" />
                  <defs>
                    <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-[8em] py-[3em] border-t border-white/[0.04] flex items-center justify-between relative z-10">
        <span className="text-[2.5em] text-gray-700">© 2024 FitSync Inc.</span>
        <div className="flex items-center gap-[3em]">
          <span className="text-[2.5em] text-gray-600">Featured in</span>
          {["WIRED", "TECHCRUNCH", "MEN'S HEALTH"].map((p) => (
            <span key={p} className="font-display text-[2.5em] tracking-[0.15em] text-gray-700/50 font-bold">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. WildTrail — Adventure Tourism Brand
   ═══════════════════════════════════════════════════════════ */
export function WildTrailPreview() {
  return (
    <div className="w-full h-full bg-[#060d06] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "2px" }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322c55e' stroke-width='0.4'%3E%3Cpath d='M30 5c14 0 25 11 25 25s-11 25-25 25S5 44 5 30 16 5 30 5z'/%3E%3Cpath d='M30 15c8 0 15 7 15 15s-7 15-15 15-15-7-15-15 7-15 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Nav */}
      <div className="flex items-center justify-between px-[8em] py-[4em] relative z-10 border-b border-green-500/[0.06]">
        <div className="flex items-center gap-[3em]">
          <svg viewBox="0 0 24 24" className="w-[6em] h-[6em]" fill="none" stroke="#22c55e" strokeWidth="1.5">
            <path d="M12 2L2 19h20L12 2z" />
          </svg>
          <span className="font-display text-[4.5em] tracking-[0.25em] uppercase font-bold">WildTrail</span>
        </div>
        <div className="flex items-center gap-[6em]">
          {["Expeditions", "Gear", "Stories", "About"].map((t) => (
            <span key={t} className="text-[3em] text-gray-500">{t}</span>
          ))}
          <div className="bg-green-500 text-[#060d06] px-[5em] py-[2em] rounded-[1.5em]">
            <span className="text-[3em] font-bold">Book Now</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex-shrink-0" style={{ height: "42%" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a1a] via-[#0a2010] to-[#0a1a0a]" />
        <svg viewBox="0 0 600 120" className="absolute bottom-0 left-0 right-0 w-full" preserveAspectRatio="none" style={{ height: "45%" }}>
          <path d="M0 120 L50 60 L100 85 L180 30 L260 70 L340 40 L400 55 L460 25 L520 50 L600 20 L600 120Z" fill="#060d06" fillOpacity="0.9" />
          <path d="M0 120 L80 70 L150 90 L250 50 L350 75 L450 45 L550 60 L600 40 L600 120Z" fill="#060d06" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <div>
            <span className="text-[3em] tracking-[0.5em] uppercase text-green-400/50 block mb-[3em]">Adventure Tourism · Est. 2018</span>
            <div className="font-display text-[14em] font-bold leading-[0.95] mb-[3em]">
              <span className="text-white">EXPLORE</span>
              <br />
              <span style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BEYOND</span>
            </div>
            <p className="text-[3em] text-gray-400 max-w-[55%] mx-auto mb-[4em]">
              Curated expeditions to the world's most breathtaking destinations.
            </p>
            <div className="flex gap-[3em] justify-center">
              <div className="bg-green-500 text-[#060d06] px-[7em] py-[2.5em] rounded-[1.5em]">
                <span className="text-[3em] font-bold">View Expeditions</span>
              </div>
              <div className="border border-white/10 px-[7em] py-[2.5em] rounded-[1.5em]">
                <span className="text-[3em] text-gray-300">Watch Film →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip cards */}
      <div className="px-[8em] py-[5em] relative z-10 flex-1">
        <div className="flex justify-between items-center mb-[3em]">
          <span className="text-[3em] tracking-[0.3em] uppercase text-gray-600">Upcoming Expeditions</span>
          <span className="text-[3em] text-green-400">View All →</span>
        </div>
        <div className="grid grid-cols-4 gap-[3em]">
          {[
            { name: "Patagonia", when: "Mar 2025", dur: "12 days", price: "$4,200", color: "from-[#1a3a2a] to-[#0d1f15]" },
            { name: "Iceland", when: "Jun 2025", dur: "8 days", price: "$3,800", color: "from-[#1a2a3a] to-[#0d1a2a]" },
            { name: "Nepal", when: "Sep 2025", dur: "14 days", price: "$5,100", color: "from-[#2a2a1a] to-[#1a1a0d]" },
            { name: "Norway", when: "Jul 2025", dur: "10 days", price: "$4,500", color: "from-[#1a3a3a] to-[#0d2a2a]" },
          ].map((t) => (
            <div key={t.name} className="rounded-[2em] border border-white/[0.06] overflow-hidden">
              <div className={`aspect-[3/2] bg-gradient-to-br ${t.color} relative`}>
                <div className="absolute top-[2em] right-[2em] bg-green-500/20 border border-green-500/20 rounded-[1em] px-[2em] py-[0.8em]">
                  <span className="text-[2em] text-green-400">{t.dur}</span>
                </div>
              </div>
              <div className="p-[3em] bg-white/[0.02]">
                <span className="text-[3.5em] font-bold text-white block">{t.name}</span>
                <div className="flex justify-between items-center mt-[1em]">
                  <span className="text-[2.5em] text-gray-500">{t.when}</span>
                  <span className="text-[3em] text-green-400 font-bold">{t.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats + footer */}
      <div className="px-[8em] py-[3.5em] bg-green-500/[0.03] border-t border-green-500/[0.06] flex justify-around relative z-10">
        {[
          { v: "200+", l: "Expeditions" },
          { v: "12K", l: "Adventurers" },
          { v: "48", l: "Countries" },
          { v: "4.9★", l: "Rating" },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <span className="font-display text-[6em] font-bold text-green-400 block">{s.v}</span>
            <span className="text-[2.5em] tracking-[0.2em] uppercase text-gray-600">{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. DataFlow — Design System Docs
   ═══════════════════════════════════════════════════════════ */
export function DataFlowPreview() {
  return (
    <div className="w-full h-full bg-[#0c0c10] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "1.8px" }}>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-[16%] border-r border-white/[0.06] bg-[#08080c] py-[4em] px-[3em] flex flex-col">
          <div className="flex items-center gap-[2em] mb-[5em] px-[1em]">
            <div className="w-[5em] h-[5em] rounded-[1.5em] bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-[3.5em] font-bold text-white">D</span>
            </div>
            <span className="font-display text-[4em] font-bold tracking-[0.1em]">DataFlow</span>
          </div>

          <div className="w-full h-[4em] rounded-[1em] bg-white/[0.04] border border-white/[0.06] mb-[4em] px-[2em] flex items-center">
            <span className="text-[2.2em] text-gray-600">⌘K Search...</span>
          </div>

          <span className="text-[2.2em] tracking-[0.2em] uppercase text-gray-600 font-bold px-[1em] mb-[2em]">Getting Started</span>
          {["Introduction", "Installation", "Theming", "Changelog"].map((item, i) => (
            <div key={item} className={`px-[2em] py-[1.5em] rounded-[1em] mb-[0.8em] ${i === 0 ? "bg-cyan-500/10 text-cyan-400" : "text-gray-500"}`}>
              <span className="text-[2.5em]">{item}</span>
            </div>
          ))}

          <span className="text-[2.2em] tracking-[0.2em] uppercase text-gray-600 font-bold px-[1em] mt-[3em] mb-[2em]">Components</span>
          {["Button", "Input", "Card", "Modal", "Table", "Toast", "Dropdown", "Tabs"].map((item, i) => (
            <div key={item} className={`px-[2em] py-[1.5em] rounded-[1em] mb-[0.8em] ${i === 0 ? "bg-cyan-500/10 text-cyan-400" : "text-gray-500"}`}>
              <span className="text-[2.5em]">{item}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between px-[5em] py-[3em] border-b border-white/[0.06]">
            <div className="flex gap-[5em]">
              {["Components", "Patterns", "Tokens", "Icons", "Playground"].map((t, i) => (
                <span key={t} className={`text-[3em] ${i === 0 ? "text-cyan-400 font-bold" : "text-gray-500"}`}>{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-[3em]">
              <span className="text-[2.5em] text-gray-500">v2.4.1</span>
              <div className="px-[3.5em] py-[1.5em] rounded-[1em] bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-[2.5em] text-cyan-400">GitHub</span>
              </div>
            </div>
          </div>

          <div className="p-[5em] overflow-hidden">
            <div className="mb-[4em]">
              <div className="flex items-center gap-[2em] mb-[2em]">
                <span className="text-[2.5em] text-gray-600">Components /</span>
                <span className="text-[2.5em] text-cyan-400">Button</span>
              </div>
              <span className="font-display text-[8em] font-bold text-white block mb-[2em]">Button</span>
              <p className="text-[3em] text-gray-500 leading-[1.4] max-w-[75%]">
                Trigger actions and events. Supports multiple variants, sizes, states, and icon placements.
              </p>
            </div>

            {/* Preview */}
            <div className="rounded-[2em] border border-white/[0.08] overflow-hidden mb-[4em]">
              <div className="p-[5em] bg-[#12121a] flex items-center justify-center gap-[3em]">
                <div className="bg-cyan-500 px-[4em] py-[2em] rounded-[1.5em]">
                  <span className="text-[3em] font-bold text-[#0c0c10]">Primary</span>
                </div>
                <div className="border border-white/20 px-[4em] py-[2em] rounded-[1.5em]">
                  <span className="text-[3em] text-white">Secondary</span>
                </div>
                <div className="px-[4em] py-[2em] rounded-[1.5em]">
                  <span className="text-[3em] text-cyan-400">Ghost</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 px-[4em] py-[2em] rounded-[1.5em]">
                  <span className="text-[3em] text-red-400">Destructive</span>
                </div>
              </div>
              <div className="bg-[#0a0a0e] px-[4em] py-[3em] border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-[1.5em]">
                  <span className="text-[2.2em] text-gray-500">tsx</span>
                  <span className="text-[2.2em] text-gray-600">Copy</span>
                </div>
                <div className="font-mono">
                  <span className="text-[2.5em] text-purple-400">import </span>
                  <span className="text-[2.5em] text-gray-300">{"{ Button }"} </span>
                  <span className="text-[2.5em] text-purple-400">from </span>
                  <span className="text-[2.5em] text-green-400">'@dataflow/ui'</span>
                  <br /><br />
                  <span className="text-[2.5em] text-gray-300">{"<"}</span>
                  <span className="text-[2.5em] text-cyan-400">Button</span>
                  <span className="text-[2.5em] text-purple-300"> variant</span>
                  <span className="text-[2.5em] text-gray-400">=</span>
                  <span className="text-[2.5em] text-green-400">"primary"</span>
                  <span className="text-[2.5em] text-gray-300">{">"}</span>
                  <span className="text-[2.5em] text-white">Click me</span>
                  <span className="text-[2.5em] text-gray-300">{"</"}</span>
                  <span className="text-[2.5em] text-cyan-400">Button</span>
                  <span className="text-[2.5em] text-gray-300">{">"}</span>
                </div>
              </div>
            </div>

            {/* Props */}
            <span className="font-display text-[5em] font-bold text-white block mb-[3em]">Props</span>
            <div className="rounded-[1.5em] border border-white/[0.06] overflow-hidden">
              <div className="grid grid-cols-4 px-[3em] py-[2em] bg-white/[0.03] border-b border-white/[0.06]">
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <span key={h} className="text-[2.5em] text-gray-500 font-bold">{h}</span>
                ))}
              </div>
              {[
                { p: "variant", t: "string", d: "'primary'", desc: "Visual style variant" },
                { p: "size", t: "'sm' | 'md' | 'lg'", d: "'md'", desc: "Button size" },
                { p: "disabled", t: "boolean", d: "false", desc: "Disable interactions" },
                { p: "loading", t: "boolean", d: "false", desc: "Show loading spinner" },
                { p: "icon", t: "ReactNode", d: "—", desc: "Leading icon element" },
              ].map((r) => (
                <div key={r.p} className="grid grid-cols-4 px-[3em] py-[1.8em] border-b border-white/[0.03]">
                  <span className="text-[2.5em] text-cyan-400 font-mono">{r.p}</span>
                  <span className="text-[2.5em] text-purple-300 font-mono">{r.t}</span>
                  <span className="text-[2.5em] text-gray-400 font-mono">{r.d}</span>
                  <span className="text-[2.5em] text-gray-500">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const workPreviews: Record<number, () => React.ReactNode> = {
  1: TechVaultPreview,
  2: NexteraPreview,
  3: GrowthLabPreview,
  4: FitSyncPreview,
  5: WildTrailPreview,
  6: DataFlowPreview,
};
