import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Copy } from "lucide-react";
import { Eyebrow } from "../components/ui/Button";
import { SplitLines, Reveal } from "../components/ui/Type";
import { site } from "../lib/content";
import {
  sendContactEmail,
  buildFallbackMailto,
  isEmailConfigured,
} from "../lib/emailjs";
import { cn } from "../lib/utils";
import { usePageTitle } from "../hooks/usePageTitle";

const budgets = [
  "Under $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k+",
  "Not sure yet",
];

export default function ContactPage() {
  usePageTitle(`Start a Project — ${site.name}`);
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "fallback" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Tell me your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "That email looks off";
    if (form.message.trim().length < 12)
      e.message = "A little more detail, please";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Never dead-ends. If the automated path isn't available we hand the
     visitor a mailto: carrying the whole message, so the lead survives. */
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setState("sending");
    const result = await sendContactEmail(form);

    if (result.ok) {
      setState("sent");
      return;
    }

    setState(result.reason === "unconfigured" ? "fallback" : "error");
    // Open the mail client immediately in the unconfigured case — it's
    // the only path that actually works, so don't make them hunt for it.
    if (result.reason === "unconfigured") {
      window.location.href = buildFallbackMailto(site.email, form);
    }
  };

  const copySummary = async () => {
    const text = `Name: ${form.name}\nEmail: ${form.email}\nBudget: ${
      form.budget || "Not specified"
    }\n\n${form.message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard can fail on insecure origins — the mailto still works */
    }
  };

  return (
    <main className="pt-28 sm:pt-32">
      <section className="container-x pb-24">
        <Eyebrow>Contact</Eyebrow>

        <div className="mt-10 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left: the human side */}
          <div>
            <SplitLines
              as="h1"
              className="display max-w-[12ch] text-[clamp(2.4rem,6.6vw,4.6rem)] text-bone"
            >
              {"Tell me what\nyou're building."}
            </SplitLines>

            <Reveal delay={0.25} className="mt-8 max-w-md">
              <p className="font-sans text-[15px] leading-[1.85] text-bone/55">
                A paragraph is enough. What it is, who it&rsquo;s for, and when
                it needs to exist. I answer every message myself — usually
                within a day, and always with an honest read on whether
                I&rsquo;m the right person for it.
              </p>
            </Reveal>

            <Reveal
              delay={0.35}
              className="mt-12 space-y-6 border-t border-haze/60 pt-8"
            >
              <div>
                <p className="label mb-2">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="wipe font-sans text-[15px] text-bone/80 transition-colors hover:text-sodium"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="label mb-2">Phone</p>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="wipe font-sans text-[15px] text-bone/80 transition-colors hover:text-sodium"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="label mb-2">Based in</p>
                <p className="font-sans text-[15px] text-bone/80">
                  {site.location}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.45} className="mt-10">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-sodium"
                  style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                  Taking new work · {site.availability}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: the form */}
          <div>
            {/* Direct email always offered, so nobody is dependent on the
                form working. Quiet, not competing with the primary action. */}
            {state === "idle" && (
              <p className="mb-8 font-sans text-[13px] leading-relaxed text-bone/40">
                Prefer email?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="wipe text-bone/70 transition-colors hover:text-sodium"
                >
                  {site.email}
                </a>
              </p>
            )}

            {state === "sent" ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center border border-haze/60 bg-dusk/30 p-10">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sodium/15">
                  <Check className="h-5 w-5 text-sodium" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-medium text-bone">
                  Message sent.
                </h2>
                <p className="mt-3 max-w-sm font-sans text-[14px] leading-relaxed text-bone/50">
                  Thanks, {form.name.split(" ")[0]}. I&rsquo;ll get back to you
                  at {form.email} within a day.
                </p>
                <button
                  onClick={() => {
                    setForm({ name: "", email: "", budget: "", message: "" });
                    setState("idle");
                  }}
                  className="mt-8 border-b border-sodium/40 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sodium"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-7">
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                  autoComplete="email"
                />

                <div>
                  <p className="label mb-3">Budget range</p>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        className={cn(
                          "border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-300",
                          form.budget === b
                            ? "border-sodium/70 bg-sodium/10 text-sodium"
                            : "border-haze/70 text-mute hover:border-haze hover:text-bone/70",
                        )}
                        aria-pressed={form.budget === b}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="label mb-3 block">
                    The project
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full resize-none border-b border-haze bg-transparent pb-3 font-sans text-[15px] text-bone outline-none transition-colors placeholder:text-mute/40 focus:border-sodium"
                    placeholder="What are you building, and what's the deadline?"
                  />
                  {errors.message && (
                    <p className="mt-2 font-mono text-[10px] text-ember">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={state === "sending"}
                  data-cursor="send"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-sodium py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-void transition-opacity disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {state === "sending" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 -translate-y-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                </button>

                {/* Failure paths never dead-end: the visitor always gets a
                    working route to you, pre-filled with what they wrote. */}
                {(state === "error" || state === "fallback") && (
                  <div className="border border-sodium/25 bg-sodium/[0.04] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sodium">
                      {state === "fallback"
                        ? "One more step"
                        : "Couldn't send automatically"}
                    </p>
                    <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-bone/55">
                      {state === "fallback"
                        ? "Your message is ready to go — your email app should have opened with everything filled in. If it didn't:"
                        : "Your message is safe. Send it the direct way and I'll pick it up right away."}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={buildFallbackMailto(site.email, form)}
                        className="bg-sodium px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-void transition-colors hover:bg-[#ffb055]"
                      >
                        Open in email
                      </a>
                      <button
                        type="button"
                        onClick={copySummary}
                        className="flex items-center gap-2 border border-haze px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70 transition-colors hover:border-sodium/50 hover:text-bone"
                      >
                        <Copy className="h-3 w-3" />
                        {copied ? "Copied" : "Copy message"}
                      </button>
                      <a
                        href={`mailto:${site.email}`}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-bone"
                      >
                        {site.email}
                      </a>
                    </div>

                    {state === "error" && (
                      <p className="mt-4 font-mono text-[9px] leading-relaxed text-mute/50">
                        Set {isEmailConfigured ? "valid" : "your"} EmailJS keys
                        in .env to make this automatic.
                      </p>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={id} className="label mb-3 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-haze bg-transparent pb-3 font-sans text-[15px] text-bone outline-none transition-colors focus:border-sodium"
      />
      {error && (
        <p className="mt-2 font-mono text-[10px] text-ember">{error}</p>
      )}
    </div>
  );
}
