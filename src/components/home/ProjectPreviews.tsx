import React from "react";

/**
 * High-fidelity miniature "landing page" previews for the Featured Work section.
 * Each renders a realistic multi-section site layout as pure styled HTML,
 * designed to read as an actual zoomed-out production website at thumbnail scale.
 */

/* ═══════════════════════════════════════════════════════════
   1. AXIOM CORP — Corporate Rebrand
   Premium enterprise consulting / SaaS landing page
   ═══════════════════════════════════════════════════════════ */
function CorporateRebrand() {
  return (
    <div className="w-full h-full bg-[#08090e] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "1px" }}>
      {/* Subtle radial glow */}
      <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-amber-500/[0.04] rounded-full blur-[40px]" />

      {/* ── Nav ── */}
      <div className="flex items-center justify-between px-[14em] py-[8em] relative z-10">
        <div className="flex items-center gap-[4em]">
          <div className="w-[10em] h-[10em] rounded-[2em] bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
            <div className="w-[4em] h-[4em] bg-[#08090e] rounded-[1em]" />
          </div>
          <span className="font-display text-[7em] tracking-[0.3em] uppercase font-bold text-white">Axiom</span>
        </div>
        <div className="flex items-center gap-[12em]">
          {["Solutions", "Industries", "About", "Insights"].map((t) => (
            <span key={t} className="text-[5em] tracking-[0.15em] text-gray-500">{t}</span>
          ))}
          <div className="bg-amber-500 text-[#08090e] px-[8em] py-[3em] rounded-[2em]">
            <span className="text-[5em] font-bold tracking-[0.15em] uppercase">Get Started</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="px-[14em] pt-[12em] pb-[16em] relative z-10">
        <div className="flex gap-[14em]">
          <div className="flex-1">
            <span className="text-[5em] tracking-[0.4em] uppercase text-amber-400/70 block mb-[6em]">Enterprise Solutions</span>
            <div className="font-display text-[18em] font-bold leading-[1.05] tracking-[0.02em] mb-[8em]">
              <span className="text-white">Accelerate </span>
              <span className="text-amber-400">Growth</span>
              <br />
              <span className="text-gray-500">At Scale</span>
            </div>
            <p className="text-[5.5em] text-gray-600 leading-[1.6] mb-[10em] max-w-[85%]">
              Transform your enterprise with data-driven strategies. We partner with Fortune 500
              companies to deliver measurable outcomes across every touchpoint.
            </p>
            <div className="flex gap-[6em]">
              <div className="bg-amber-500 text-[#08090e] px-[10em] py-[5em] rounded-[2em]">
                <span className="text-[5em] font-bold tracking-[0.1em]">Schedule a Demo</span>
              </div>
              <div className="border border-white/10 px-[10em] py-[5em] rounded-[2em]">
                <span className="text-[5em] text-gray-400 tracking-[0.1em]">Watch Reel →</span>
              </div>
            </div>
          </div>
          {/* Hero visual — abstract 3D-ish shape */}
          <div className="w-[40%] relative">
            <div className="absolute inset-[8em] rounded-[6em] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/10 overflow-hidden">
              <div className="absolute top-[15%] left-[20%] w-[60%] h-[50%] rounded-full bg-gradient-to-br from-amber-400/30 to-transparent blur-[8px]" />
              <div className="absolute bottom-[10%] right-[15%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-orange-500/20 to-transparent blur-[6px]" />
              {/* Grid lines inside */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="absolute left-0 right-0 border-t border-amber-500/[0.06]" style={{ top: `${(i + 1) * 16}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Trusted By logos ── */}
      <div className="px-[14em] py-[10em] border-t border-white/[0.04] relative z-10">
        <span className="text-[4.5em] tracking-[0.3em] uppercase text-gray-700 block mb-[6em]">Trusted by industry leaders</span>
        <div className="flex items-center gap-[16em]">
          {["ORACLE", "DELOITTE", "ADOBE", "STRIPE", "NOTION"].map((logo) => (
            <span key={logo} className="font-display text-[6em] tracking-[0.25em] text-gray-600/50 font-bold">{logo}</span>
          ))}
        </div>
      </div>

      {/* ── Features Grid ── */}
      <div className="px-[14em] py-[14em] relative z-10">
        <div className="flex items-end justify-between mb-[10em]">
          <div>
            <span className="text-[5em] tracking-[0.4em] uppercase text-amber-400/60 block mb-[4em]">What We Deliver</span>
            <span className="font-display text-[11em] font-bold text-white">Core Capabilities</span>
          </div>
          <span className="text-[5em] text-gray-600 tracking-[0.1em]">Explore All →</span>
        </div>
        <div className="grid grid-cols-3 gap-[6em]">
          {[
            { icon: "◆", title: "Brand Strategy", desc: "Identity systems built for scale across 240+ touchpoints" },
            { icon: "◇", title: "Digital Experience", desc: "Immersive web & mobile products with measurable ROI" },
            { icon: "○", title: "Data Analytics", desc: "Insights that drive decisions across every business unit" },
          ].map((f) => (
            <div key={f.title} className="border border-white/[0.06] rounded-[4em] p-[8em] bg-white/[0.01] hover:bg-white/[0.02]">
              <div className="w-[12em] h-[12em] rounded-[3em] bg-amber-500/10 flex items-center justify-center mb-[6em]">
                <span className="text-[7em] text-amber-400">{f.icon}</span>
              </div>
              <span className="font-display text-[6.5em] font-bold text-white block mb-[3em]">{f.title}</span>
              <span className="text-[4.5em] text-gray-600 leading-[1.5]">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="px-[14em] py-[10em] bg-amber-500/[0.03] border-y border-amber-500/[0.06] relative z-10">
        <div className="flex justify-between">
          {[
            { val: "12", label: "Sub-brands Unified" },
            { val: "240+", label: "Brand Touchpoints" },
            { val: "98%", label: "Client Retention" },
            { val: "4.9", label: "Avg. Rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-[12em] font-bold text-amber-400">{s.val}</div>
              <div className="text-[4.5em] tracking-[0.2em] uppercase text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div className="px-[14em] py-[12em] relative z-10">
        <div className="max-w-[70%]">
          <span className="text-[16em] text-amber-500/20 font-serif leading-none block">"</span>
          <p className="text-[6em] text-gray-400 leading-[1.6] italic -mt-[8em] mb-[6em]">
            Axiom transformed our entire brand ecosystem. The results
            exceeded every metric we set.
          </p>
          <div className="flex items-center gap-[4em]">
            <div className="w-[10em] h-[10em] rounded-full bg-gradient-to-br from-gray-600 to-gray-800" />
            <div>
              <span className="text-[5em] text-white font-bold block">Sarah Chen</span>
              <span className="text-[4em] text-gray-600">CMO, TechVault Inc.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-[14em] py-[10em] border-t border-white/[0.04] flex items-center justify-between relative z-10">
        <span className="font-display text-[5em] tracking-[0.3em] text-gray-700 uppercase">© 2024 Axiom Corp</span>
        <div className="flex gap-[10em]">
          {["Privacy", "Terms", "Careers", "Contact"].map((l) => (
            <span key={l} className="text-[4.5em] text-gray-700">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. NEXUS — Tech Startup SaaS Platform
   Modern analytics/dashboard product marketing page
   ═══════════════════════════════════════════════════════════ */
function TechStartup() {
  const bars = [28, 45, 38, 62, 52, 70, 44, 82, 58, 75, 88, 65, 78, 92, 85, 72, 90, 76, 84, 95, 80, 68, 86, 74];
  return (
    <div className="w-full h-full bg-[#030712] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "1px" }}>
      {/* BG glow */}
      <div className="absolute top-[20%] left-[30%] w-[40%] h-[30%] bg-emerald-500/[0.03] rounded-full blur-[40px]" />

      {/* ── Nav ── */}
      <div className="flex items-center justify-between px-[14em] py-[8em] border-b border-white/[0.04] relative z-10">
        <div className="flex items-center gap-[20em]">
          <div className="flex items-center gap-[4em]">
            <div className="w-[8em] h-[8em] rounded-full bg-emerald-400" />
            <span className="font-display text-[7em] tracking-[0.2em] font-bold">Nexus</span>
          </div>
          <div className="flex gap-[10em]">
            {["Product", "Pricing", "Docs", "Blog"].map((t) => (
              <span key={t} className="text-[5em] text-gray-500">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[8em]">
          <span className="text-[5em] text-gray-400">Sign In</span>
          <div className="bg-emerald-500 px-[8em] py-[3.5em] rounded-[2em]">
            <span className="text-[5em] font-bold text-[#030712]">Start Free</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="px-[14em] pt-[16em] pb-[10em] text-center relative z-10">
        <div className="inline-flex items-center gap-[4em] border border-emerald-500/20 rounded-full px-[8em] py-[3em] mb-[8em]">
          <div className="w-[4em] h-[4em] rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[4.5em] text-emerald-400 tracking-[0.1em]">Now in Public Beta</span>
        </div>
        <div className="font-display text-[18em] font-bold leading-[1.05] mb-[6em]">
          <span className="text-white">Analytics that</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #34d399, #10b981, #059669)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>move the needle</span>
        </div>
        <p className="text-[5.5em] text-gray-500 leading-[1.5] max-w-[65%] mx-auto mb-[10em]">
          Real-time insights, predictive models, and automated reporting — all in one
          platform. Built for teams that ship fast.
        </p>
        <div className="flex justify-center gap-[6em] mb-[14em]">
          <div className="bg-emerald-500 px-[12em] py-[5em] rounded-[2em]">
            <span className="text-[5.5em] font-bold text-[#030712]">Get Started Free →</span>
          </div>
          <div className="border border-white/10 px-[12em] py-[5em] rounded-[2em]">
            <span className="text-[5.5em] text-gray-400">Live Demo</span>
          </div>
        </div>
      </div>

      {/* ── Product Screenshot (dashboard) ── */}
      <div className="mx-[14em] rounded-[6em] border border-white/[0.08] bg-[#0a0f1a] overflow-hidden relative z-10">
        {/* Dashboard toolbar */}
        <div className="flex items-center justify-between px-[8em] py-[4em] border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-[3em]">
            <div className="w-[3em] h-[3em] rounded-full bg-red-400/60" />
            <div className="w-[3em] h-[3em] rounded-full bg-yellow-400/60" />
            <div className="w-[3em] h-[3em] rounded-full bg-green-400/60" />
          </div>
          <div className="w-[40%] h-[4em] rounded-[1em] bg-white/[0.04]" />
          <div className="flex gap-[4em]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[4em] h-[4em] rounded bg-white/[0.06]" />
            ))}
          </div>
        </div>
        {/* Dashboard body */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[14%] border-r border-white/[0.04] py-[6em] px-[4em] flex flex-col gap-[5em]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-[4em] rounded-[1em] ${i === 0 ? "bg-emerald-500/20" : "bg-white/[0.03]"}`} style={{ width: `${60 + Math.random() * 30}%` }} />
            ))}
          </div>
          {/* Main content */}
          <div className="flex-1 p-[6em]">
            {/* Metric row */}
            <div className="grid grid-cols-4 gap-[4em] mb-[6em]">
              {[
                { label: "Total Users", val: "24,847", pct: "+12.3%", up: true },
                { label: "Revenue", val: "$1.24M", pct: "+28.1%", up: true },
                { label: "Conversion", val: "3.42%", pct: "+0.8%", up: true },
                { label: "Churn", val: "1.2%", pct: "-0.3%", up: false },
              ].map((m) => (
                <div key={m.label} className="rounded-[3em] border border-white/[0.06] p-[4em] bg-white/[0.01]">
                  <span className="text-[3.5em] text-gray-600 block mb-[2em]">{m.label}</span>
                  <span className="font-display text-[7em] font-bold text-white block">{m.val}</span>
                  <span className={`text-[3.5em] ${m.up ? "text-emerald-400" : "text-red-400"}`}>{m.pct}</span>
                </div>
              ))}
            </div>
            {/* Chart */}
            <div className="rounded-[3em] border border-white/[0.06] p-[5em] bg-white/[0.01] mb-[6em]">
              <div className="flex items-center justify-between mb-[4em]">
                <span className="text-[4em] text-gray-400 font-bold">Revenue Trend</span>
                <div className="flex gap-[4em]">
                  {["7D", "30D", "90D", "1Y"].map((p, i) => (
                    <span key={p} className={`text-[3.5em] px-[3em] py-[1.5em] rounded-[1em] ${i === 2 ? "bg-emerald-500/20 text-emerald-400" : "text-gray-600"}`}>{p}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-[1.5em] h-[30em]">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[1em]"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(180deg, rgba(52,211,153,${0.5 + h / 250}) 0%, rgba(52,211,153,0.05) 100%)`,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Table rows */}
            <div className="rounded-[3em] border border-white/[0.06] overflow-hidden">
              <div className="grid grid-cols-5 gap-[2em] px-[4em] py-[3em] bg-white/[0.02] border-b border-white/[0.04]">
                {["User", "Plan", "MRR", "Usage", "Status"].map((h) => (
                  <span key={h} className="text-[3.5em] text-gray-600 font-bold">{h}</span>
                ))}
              </div>
              {[
                { user: "Acme Inc.", plan: "Enterprise", mrr: "$2,400", usage: "94%", status: "Active" },
                { user: "Globex", plan: "Pro", mrr: "$800", usage: "78%", status: "Active" },
                { user: "Initech", plan: "Starter", mrr: "$200", usage: "45%", status: "Trial" },
              ].map((r) => (
                <div key={r.user} className="grid grid-cols-5 gap-[2em] px-[4em] py-[3em] border-b border-white/[0.03]">
                  <span className="text-[3.5em] text-white">{r.user}</span>
                  <span className="text-[3.5em] text-gray-500">{r.plan}</span>
                  <span className="text-[3.5em] text-white">{r.mrr}</span>
                  <span className="text-[3.5em] text-emerald-400">{r.usage}</span>
                  <span className="text-[3.5em] text-gray-500">{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Social Proof ── */}
      <div className="px-[14em] py-[10em] relative z-10">
        <div className="flex items-center justify-center gap-[16em]">
          {["Y COMBINATOR", "TECHCRUNCH", "PRODUCTHUNT", "FORBES"].map((n) => (
            <span key={n} className="font-display text-[5em] tracking-[0.2em] text-gray-700/50 font-bold">{n}</span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-[14em] py-[8em] border-t border-white/[0.04] flex items-center justify-between relative z-10">
        <span className="text-[4.5em] text-gray-700">© 2024 Nexus Technologies</span>
        <div className="flex gap-[8em]">
          {["Docs", "Status", "Security", "GitHub"].map((l) => (
            <span key={l} className="text-[4em] text-gray-700">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. STUDIO MIRO — Creative Portfolio
   Elegant designer/agency portfolio with warm aesthetic
   ═══════════════════════════════════════════════════════════ */
function CreativePortfolio() {
  return (
    <div className="w-full h-full bg-[#f5f0ea] text-[#1a1a1a] flex flex-col overflow-hidden select-none" style={{ fontSize: "1px" }}>
      {/* ── Nav ── */}
      <div className="flex items-center justify-between px-[14em] py-[8em] border-b border-[#1a1a1a]/[0.06]">
        <span className="font-display text-[8em] tracking-[0.35em] uppercase font-bold text-[#1a1a1a]">Studio Miro</span>
        <div className="flex items-center gap-[12em]">
          {["Work", "About", "Journal", "Contact"].map((t) => (
            <span key={t} className="text-[5em] text-[#999] tracking-[0.1em]">{t}</span>
          ))}
          <div className="w-[10em] h-[8em] flex flex-col gap-[2em] items-end justify-center">
            <div className="w-[10em] h-[1em] bg-[#1a1a1a]" />
            <div className="w-[6em] h-[1em] bg-[#1a1a1a]" />
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="px-[14em] pt-[18em] pb-[12em]">
        <div className="flex items-end justify-between mb-[10em]">
          <div>
            <span className="text-[5em] tracking-[0.4em] uppercase text-[#999] block mb-[5em]">Creative Studio — Est. 2019</span>
            <div className="font-display text-[22em] font-bold leading-[1.0] tracking-[-0.02em]">
              <span className="text-[#1a1a1a]">We craft</span>
              <br />
              <span className="italic text-[#c9a87c]">timeless</span>
              <span className="text-[#1a1a1a]"> brands</span>
            </div>
          </div>
          <div className="text-right pb-[4em]">
            <span className="text-[5em] text-[#999] block leading-[1.6]">Based in Portland, OR</span>
            <span className="text-[5em] text-[#999] block leading-[1.6]">Available for projects</span>
          </div>
        </div>
        <div className="w-full h-[1em] bg-[#1a1a1a]/10" />
      </div>

      {/* ── Featured Projects Grid ── */}
      <div className="px-[14em] pb-[12em]">
        <div className="flex items-center justify-between mb-[8em]">
          <span className="text-[5em] tracking-[0.3em] uppercase text-[#999]">Selected Work</span>
          <span className="text-[5em] text-[#c9a87c] tracking-[0.1em]">View Archive →</span>
        </div>
        <div className="grid grid-cols-2 gap-[6em]">
          {/* Large featured image */}
          <div className="rounded-[4em] overflow-hidden bg-gradient-to-br from-[#c9a87c] via-[#b8945f] to-[#8b6f47] relative row-span-2">
            <div className="absolute inset-0 bg-[#1a1a1a]/10" />
            <div className="absolute top-[8em] left-[8em]">
              <span className="text-[4.5em] tracking-[0.3em] uppercase text-white/50">01</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-[8em] bg-gradient-to-t from-[#1a1a1a]/60 to-transparent">
              <span className="text-[4em] tracking-[0.3em] uppercase text-white/60 block mb-[2em]">Photography</span>
              <span className="text-[7em] font-bold text-white block">Quiet Spaces</span>
              <span className="text-[4em] text-white/50">Editorial · Print · Digital</span>
            </div>
          </div>
          <div className="rounded-[4em] overflow-hidden bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] relative">
            <div className="absolute top-[8em] left-[8em]">
              <span className="text-[4.5em] tracking-[0.3em] uppercase text-white/30">02</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-[8em] bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-[4em] tracking-[0.3em] uppercase text-white/40 block mb-[2em]">Motion Design</span>
              <span className="text-[7em] font-bold text-white">Fluid Forms</span>
            </div>
          </div>
          <div className="rounded-[4em] overflow-hidden bg-gradient-to-br from-[#d4a574] to-[#b8845a] relative">
            <div className="absolute top-[8em] left-[8em]">
              <span className="text-[4.5em] tracking-[0.3em] uppercase text-white/40">03</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-[8em] bg-gradient-to-t from-[#1a1a1a]/60 to-transparent">
              <span className="text-[4em] tracking-[0.3em] uppercase text-white/60 block mb-[2em]">Branding</span>
              <span className="text-[7em] font-bold text-white">Raw Earth</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── About Strip ── */}
      <div className="px-[14em] py-[12em] bg-[#1a1a1a]">
        <div className="flex items-start gap-[14em]">
          <div className="flex-1">
            <span className="text-[5em] tracking-[0.3em] uppercase text-[#c9a87c] block mb-[6em]">About the Studio</span>
            <p className="text-[5.5em] text-gray-400 leading-[1.6]">
              We are a multidisciplinary design studio specializing in brand identity,
              art direction, and digital experiences for culture-forward brands.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-[12em] gap-y-[6em]">
            {[
              { val: "80+", label: "Projects" },
              { val: "24", label: "Awards" },
              { val: "6", label: "Years" },
              { val: "12", label: "Team" },
            ].map((s) => (
              <div key={s.label}>
                <span className="font-display text-[10em] font-bold text-white block">{s.val}</span>
                <span className="text-[4em] tracking-[0.2em] uppercase text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div className="px-[14em] py-[10em]">
        <p className="text-[6.5em] italic text-[#666] leading-[1.5] mb-[6em]">
          "Miro brought a level of craft and intentionality that elevated our entire brand presence."
        </p>
        <span className="text-[4.5em] tracking-[0.2em] uppercase text-[#999]">— Alex Rivera, Founder of Kinfolk</span>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-[14em] py-[8em] border-t border-[#1a1a1a]/[0.08] flex items-center justify-between">
        <span className="text-[4.5em] text-[#bbb] tracking-[0.2em]">© Studio Miro 2024</span>
        <div className="flex gap-[8em]">
          {["Instagram", "Behance", "Dribbble", "LinkedIn"].map((s) => (
            <span key={s} className="text-[4em] text-[#bbb]">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. PULSE — Fitness App
   Mobile app marketing / landing page
   ═══════════════════════════════════════════════════════════ */
function FitnessApp() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "1px" }}>
      {/* BG gradient */}
      <div className="absolute top-[10%] left-[40%] w-[50%] h-[40%] bg-violet-600/[0.06] rounded-full blur-[40px]" />

      {/* ── Nav ── */}
      <div className="flex items-center justify-between px-[14em] py-[8em] relative z-10">
        <div className="flex items-center gap-[4em]">
          <svg viewBox="0 0 24 24" className="w-[10em] h-[10em]" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="1.5" />
            <path d="M7 12h2l2-4 2 8 2-4h2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-[7em] tracking-[0.15em] font-bold">Pulse</span>
        </div>
        <div className="flex items-center gap-[10em]">
          {["Features", "Pricing", "Reviews"].map((t) => (
            <span key={t} className="text-[5em] text-gray-500">{t}</span>
          ))}
          <div className="bg-violet-500 px-[8em] py-[3em] rounded-[2em]">
            <span className="text-[5em] font-bold text-white">Download</span>
          </div>
        </div>
      </div>

      {/* ── Hero with phone mockup ── */}
      <div className="px-[14em] pt-[10em] flex gap-[12em] relative z-10">
        <div className="flex-1 pt-[8em]">
          <div className="inline-flex items-center gap-[3em] bg-violet-500/10 rounded-full px-[6em] py-[2.5em] mb-[8em]">
            <span className="text-[4.5em] text-violet-400">★ #1 Fitness App 2024</span>
          </div>
          <div className="font-display text-[16em] font-bold leading-[1.05] mb-[6em]">
            <span className="text-white">Train</span>
            <br />
            <span className="text-violet-400">Smarter,</span>
            <br />
            <span className="text-gray-500">Not Harder</span>
          </div>
          <p className="text-[5em] text-gray-600 leading-[1.6] mb-[10em] max-w-[90%]">
            AI-powered workouts that adapt to your body. Track progress, crush goals,
            and transform your fitness journey.
          </p>
          <div className="flex gap-[4em] mb-[10em]">
            {/* App store badges */}
            <div className="flex items-center gap-[3em] bg-white/[0.06] rounded-[3em] px-[6em] py-[3.5em] border border-white/[0.08]">
              <div className="text-[8em]">🍎</div>
              <div>
                <span className="text-[3.5em] text-gray-500 block">Download on</span>
                <span className="text-[5em] font-bold text-white block">App Store</span>
              </div>
            </div>
            <div className="flex items-center gap-[3em] bg-white/[0.06] rounded-[3em] px-[6em] py-[3.5em] border border-white/[0.08]">
              <div className="text-[8em]">▶</div>
              <div>
                <span className="text-[3.5em] text-gray-500 block">Get it on</span>
                <span className="text-[5em] font-bold text-white block">Google Play</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[4em]">
            <div className="flex -space-x-[3em]">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-[8em] h-[8em] rounded-full border-[1em] border-[#0a0a0f]"
                  style={{ background: ["#a78bfa", "#f472b6", "#34d399", "#f59e0b"][i] }} />
              ))}
            </div>
            <span className="text-[4.5em] text-gray-500">2M+ active users</span>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="w-[38%] relative">
          <div className="mx-auto w-[80%] rounded-[8em] border-[1.5em] border-gray-800 bg-[#0f0f15] overflow-hidden shadow-2xl shadow-violet-500/10">
            {/* Phone status bar */}
            <div className="flex items-center justify-between px-[5em] py-[3em]">
              <span className="text-[4em] text-gray-400">9:41</span>
              <div className="w-[15em] h-[3em] rounded-full bg-gray-800" />
              <div className="flex gap-[2em]">
                <div className="w-[4em] h-[3em] rounded-sm bg-gray-600" />
              </div>
            </div>
            {/* App content */}
            <div className="p-[5em]">
              <div className="flex justify-between items-center mb-[5em]">
                <div>
                  <span className="text-[4em] text-gray-600 block">Good Morning 👋</span>
                  <span className="font-display text-[7em] font-bold text-white">Dashboard</span>
                </div>
                <div className="w-[10em] h-[10em] rounded-full bg-gradient-to-br from-violet-400 to-pink-400" />
              </div>
              {/* Ring */}
              <div className="flex items-center gap-[5em] mb-[5em]">
                <div className="relative w-[28em] h-[28em]">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#a78bfa" strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 34 * 0.72} ${2 * Math.PI * 34}`}
                      strokeLinecap="round" />
                    <circle cx="40" cy="40" r="26" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                    <circle cx="40" cy="40" r="26" fill="none" stroke="#f472b6" strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 26 * 0.58} ${2 * Math.PI * 26}`}
                      strokeLinecap="round" />
                    <circle cx="40" cy="40" r="18" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                    <circle cx="40" cy="40" r="18" fill="none" stroke="#34d399" strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 18 * 0.85} ${2 * Math.PI * 18}`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[6em] font-bold text-white">72%</span>
                  </div>
                </div>
                <div className="flex flex-col gap-[3em]">
                  {[
                    { c: "bg-violet-400", l: "Move", v: "420 cal" },
                    { c: "bg-pink-400", l: "Exercise", v: "32 min" },
                    { c: "bg-emerald-400", l: "Stand", v: "10 hrs" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-center gap-[2em]">
                      <div className={`w-[2.5em] h-[2.5em] rounded-full ${r.c}`} />
                      <span className="text-[4em] text-gray-500 w-[16em]">{r.l}</span>
                      <span className="text-[4.5em] text-white font-medium">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Workout cards */}
              {[
                { n: "HIIT Training", d: "45 min", g: "from-violet-500/20 to-violet-500/5" },
                { n: "Yoga Flow", d: "30 min", g: "from-pink-500/20 to-pink-500/5" },
                { n: "Strength", d: "60 min", g: "from-emerald-500/20 to-emerald-500/5" },
              ].map((w) => (
                <div key={w.n} className={`rounded-[3em] bg-gradient-to-r ${w.g} border border-white/[0.06] p-[4em] mb-[3em] flex justify-between items-center`}>
                  <div>
                    <span className="text-[5em] font-bold text-white block">{w.n}</span>
                    <span className="text-[3.5em] text-gray-500">{w.d}</span>
                  </div>
                  <div className="w-[8em] h-[8em] rounded-full bg-white/[0.06] flex items-center justify-center">
                    <span className="text-[5em]">▶</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom nav */}
            <div className="flex justify-around py-[4em] border-t border-white/[0.06]">
              {["⌂", "◎", "♡", "☰"].map((ic, i) => (
                <span key={ic} className={`text-[6em] ${i === 0 ? "text-violet-400" : "text-gray-700"}`}>{ic}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div className="px-[14em] py-[12em] relative z-10">
        <div className="grid grid-cols-3 gap-[6em]">
          {[
            { icon: "⚡", title: "AI Coaching", desc: "Personalized plans that evolve with your progress" },
            { icon: "📊", title: "Deep Analytics", desc: "Heart rate, sleep, recovery — all in one place" },
            { icon: "🏆", title: "Social Challenges", desc: "Compete with friends and climb the leaderboard" },
          ].map((f) => (
            <div key={f.title} className="text-center p-[6em]">
              <span className="text-[12em] block mb-[4em]">{f.icon}</span>
              <span className="font-display text-[6em] font-bold text-white block mb-[3em]">{f.title}</span>
              <span className="text-[4.5em] text-gray-600 leading-[1.5]">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-[14em] py-[8em] border-t border-white/[0.04] flex items-center justify-between relative z-10">
        <span className="text-[4.5em] text-gray-700">© 2024 Pulse Fitness Inc.</span>
        <div className="flex gap-[8em]">
          {["Privacy", "Terms", "Support"].map((l) => (
            <span key={l} className="text-[4em] text-gray-700">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. BASECAMP CO — Adventure / Outdoor Brand
   Lifestyle brand with immersive hero and product showcase
   ═══════════════════════════════════════════════════════════ */
function AdventureBrand() {
  return (
    <div className="w-full h-full bg-[#080f08] text-white flex flex-col overflow-hidden select-none relative" style={{ fontSize: "1px" }}>
      {/* Topo pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322c55e' stroke-width='0.4'%3E%3Cpath d='M30 5c14 0 25 11 25 25s-11 25-25 25S5 44 5 30 16 5 30 5z'/%3E%3Cpath d='M30 15c8 0 15 7 15 15s-7 15-15 15-15-7-15-15 7-15 15-15z'/%3E%3Cpath d='M30 25c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f08] via-transparent to-[#080f08]" />

      {/* ── Nav ── */}
      <div className="flex items-center justify-between px-[14em] py-[8em] relative z-10 border-b border-green-500/[0.06]">
        <div className="flex items-center gap-[4em]">
          <svg viewBox="0 0 24 24" className="w-[10em] h-[10em]" fill="none" stroke="#22c55e" strokeWidth="1.5">
            <path d="M12 2L2 19h20L12 2z" />
            <path d="M12 8v6M12 16v1" />
          </svg>
          <span className="font-display text-[7em] tracking-[0.3em] uppercase font-bold">Basecamp</span>
        </div>
        <div className="flex items-center gap-[10em]">
          {["Collection", "Stories", "Sustainability", "Stores"].map((t) => (
            <span key={t} className="text-[5em] text-gray-500 tracking-[0.1em]">{t}</span>
          ))}
          <div className="border border-green-500/30 px-[8em] py-[3em] rounded-[2em]">
            <span className="text-[5em] text-green-400 tracking-[0.1em]">Shop Now</span>
          </div>
        </div>
      </div>

      {/* ── Hero — Full immersive ── */}
      <div className="relative flex-shrink-0" style={{ height: "35%" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a1a] via-[#0a1f0a] to-[#0d2b1a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f08] via-transparent to-transparent" />
        {/* Mountain silhouette */}
        <svg viewBox="0 0 400 100" className="absolute bottom-0 left-0 right-0 w-full" preserveAspectRatio="none" style={{ height: "40%" }}>
          <path d="M0 100 L60 40 L100 65 L160 20 L220 55 L280 30 L340 50 L400 25 L400 100Z" fill="#080f08" />
        </svg>
        {/* Hero text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-[14em]">
          <span className="text-[5em] tracking-[0.5em] uppercase text-green-400/60 mb-[6em]">Spring / Summer 2024</span>
          <div className="font-display text-[24em] font-bold leading-[0.95] tracking-[-0.02em] mb-[6em]">
            <span className="text-white">INTO THE</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>WILD</span>
          </div>
          <p className="text-[5em] text-gray-400 max-w-[60%] leading-[1.5] mb-[8em]">
            Gear forged for the untamed. Sustainably crafted for those who answer the call of the wild.
          </p>
          <div className="bg-green-500 text-[#080f08] px-[12em] py-[5em] rounded-[2em]">
            <span className="text-[5.5em] font-bold tracking-[0.1em]">Explore Collection</span>
          </div>
        </div>
      </div>

      {/* ── Product Cards ── */}
      <div className="px-[14em] py-[10em] relative z-10">
        <div className="flex items-center justify-between mb-[8em]">
          <span className="text-[5em] tracking-[0.3em] uppercase text-gray-600">New Arrivals</span>
          <span className="text-[5em] text-green-400 tracking-[0.1em]">View All →</span>
        </div>
        <div className="grid grid-cols-4 gap-[5em]">
          {[
            { name: "Alpine Jacket", price: "$289", color: "from-[#1a3a2a] to-[#0d1f15]" },
            { name: "Trail Pack 45L", price: "$179", color: "from-[#2a2a1a] to-[#1a1a0d]" },
            { name: "Summit Boot", price: "$249", color: "from-[#1a2a2a] to-[#0d1a1a]" },
            { name: "Base Layer", price: "$89", color: "from-[#2a1a2a] to-[#1a0d1a]" },
          ].map((p) => (
            <div key={p.name} className="rounded-[4em] overflow-hidden border border-white/[0.04]">
              <div className={`aspect-square bg-gradient-to-br ${p.color} relative`}>
                <div className="absolute top-[4em] right-[4em]">
                  <span className="text-[4em] text-green-400/60 bg-green-500/10 px-[3em] py-[1.5em] rounded-[1em]">New</span>
                </div>
              </div>
              <div className="p-[4em] bg-white/[0.02]">
                <span className="text-[5em] text-white block font-medium">{p.name}</span>
                <span className="text-[4.5em] text-green-400">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sustainability Banner ── */}
      <div className="mx-[14em] rounded-[4em] bg-green-500/[0.06] border border-green-500/10 p-[8em] relative z-10 flex items-center gap-[10em]">
        <div className="flex-1">
          <span className="text-[5em] tracking-[0.3em] uppercase text-green-400 block mb-[4em]">Our Promise</span>
          <span className="font-display text-[9em] font-bold text-white block mb-[3em]">100% Carbon Neutral by 2025</span>
          <p className="text-[4.5em] text-gray-500 leading-[1.5]">
            Every product designed with end-of-life in mind. Recycled materials. Fair wages. Zero waste.
          </p>
        </div>
        <div className="w-[25%] flex flex-col items-center gap-[4em]">
          <div className="w-[20em] h-[20em] rounded-full border-[2em] border-green-400/30 flex items-center justify-center">
            <span className="font-display text-[10em] font-bold text-green-400">92%</span>
          </div>
          <span className="text-[4em] text-gray-600 text-center">Recycled<br />Materials</span>
        </div>
      </div>

      {/* ── Instagram-style feed ── */}
      <div className="px-[14em] py-[10em] relative z-10">
        <span className="text-[5em] tracking-[0.3em] uppercase text-gray-600 block mb-[6em]">@basecampco</span>
        <div className="grid grid-cols-6 gap-[2em]">
          {[
            "from-[#2a3a2a] to-[#1a2a1a]",
            "from-[#3a3a2a] to-[#2a2a1a]",
            "from-[#1a3a3a] to-[#0d2a2a]",
            "from-[#2a2a3a] to-[#1a1a2a]",
            "from-[#3a2a2a] to-[#2a1a1a]",
            "from-[#2a3a3a] to-[#1a2a2a]",
          ].map((g, i) => (
            <div key={i} className={`aspect-square rounded-[2em] bg-gradient-to-br ${g}`} />
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-[14em] py-[8em] border-t border-white/[0.04] relative z-10">
        <div className="flex justify-between items-start mb-[8em]">
          <div>
            <span className="font-display text-[6em] tracking-[0.3em] uppercase text-gray-500 block mb-[4em]">Basecamp Co.</span>
            <p className="text-[4em] text-gray-700 leading-[1.5] max-w-[80%]">
              Portland, OR — Gear for the bold since 2018.
            </p>
          </div>
          <div className="flex gap-[16em]">
            <div>
              <span className="text-[4em] text-gray-500 block mb-[3em] font-bold">Shop</span>
              {["Men", "Women", "Accessories", "Sale"].map((l) => (
                <span key={l} className="text-[3.5em] text-gray-700 block mb-[2em]">{l}</span>
              ))}
            </div>
            <div>
              <span className="text-[4em] text-gray-500 block mb-[3em] font-bold">Company</span>
              {["About", "Sustainability", "Careers", "Press"].map((l) => (
                <span key={l} className="text-[3.5em] text-gray-700 block mb-[2em]">{l}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-[4em] border-t border-white/[0.03]">
          <span className="text-[4em] text-gray-800">© 2024 Basecamp Co. All rights reserved.</span>
          <div className="flex gap-[6em]">
            {["Instagram", "TikTok", "YouTube"].map((s) => (
              <span key={s} className="text-[3.5em] text-gray-700">{s}</span>
            ))}
          </div>
        </div>
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
