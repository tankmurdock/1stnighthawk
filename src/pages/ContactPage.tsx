import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react";
import TextReveal, { FadeReveal } from "../components/shared/TextReveal";
import { sendContactEmail } from "../lib/emailjs";

const budgetRanges = [
  "$5K - $10K",
  "$10K - $25K",
  "$25K - $50K",
  "$50K+",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    const success = await sendContactEmail(formData);

    if (success) {
      setStatus("sent");
      setFormData({ name: "", email: "", budget: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          <div>
            <TextReveal
              as="h1"
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-8"
              stagger={0.06}
              animate="onMount"
            >
              Let's talk.
            </TextReveal>

            <FadeReveal delay={0.4}>
              <p className="text-gray-500 text-lg sm:text-xl max-w-md leading-relaxed mb-12">
                Have a project in mind? We'd love to hear about it. Drop us a line
                and let's create something extraordinary together.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.6}>
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-600 block mb-2">
                    Email
                  </span>
                  <a
                    href="mailto:1stnighthawkllc@gmail.com"
                    className="text-white text-lg hover:text-primary-400 transition-colors link-underline"
                  >
                    1stnighthawkllc@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-600 block mb-2">
                    Phone
                  </span>
                  <a
                    href="tel:+19043383032"
                    className="text-white text-lg hover:text-primary-400 transition-colors link-underline"
                  >
                    +1 (904) 338-3032
                  </a>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-600 block mb-2">
                    Location
                  </span>
                  <span className="text-gray-400 text-lg">
                    Jacksonville, Florida
                  </span>
                </div>
              </div>
            </FadeReveal>
          </div>

          <FadeReveal delay={0.3} direction="right">
            <form onSubmit={handleSubmit} className="space-y-10">
              <AnimatedInput
                label="Your Name"
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
                isFocused={focusedField === "name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                delay={0.5}
              />

              <AnimatedInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                isFocused={focusedField === "email"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                delay={0.6}
              />

              <BudgetSelector
                selected={formData.budget}
                onSelect={(v) => setFormData({ ...formData, budget: v })}
                delay={0.7}
              />

              <AnimatedTextarea
                label="Tell us about your project"
                value={formData.message}
                onChange={(v) => setFormData({ ...formData, message: v })}
                isFocused={focusedField === "message"}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                delay={0.8}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.button
                  type="submit"
                  whileHover={status === "idle" ? { scale: 1.03 } : undefined}
                  whileTap={status === "idle" ? { scale: 0.97 } : undefined}
                  className={`w-full py-5 rounded-full font-medium text-lg transition-all duration-500 flex items-center justify-center gap-3 ${
                    status === "sent"
                      ? "bg-accent-500 text-white"
                      : status === "error"
                        ? "bg-red-500/20 border border-red-500/40 text-red-300"
                        : "btn-primary"
                  }`}
                  disabled={status !== "idle"}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : status === "sent" ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : status === "error" ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>Failed to send. Try again.</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </FadeReveal>
        </div>
      </div>
    </main>
  );
}

function AnimatedInput({
  label,
  type = "text",
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
  delay = 0,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const isActive = isFocused || value.length > 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "text-xs text-primary-400 -top-5"
            : "text-base text-gray-600 top-4"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={label}
        className="w-full bg-transparent border-b border-white/10 py-4 text-white text-base outline-none transition-colors focus:border-primary-500"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary-500 to-accent-400"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

function AnimatedTextarea({
  label,
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
  delay = 0,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const isActive = isFocused || value.length > 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "text-xs text-primary-400 -top-5"
            : "text-base text-gray-600 top-4"
        }`}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        rows={4}
        aria-label={label}
        className="w-full bg-transparent border-b border-white/10 py-4 text-white text-base outline-none transition-colors focus:border-primary-500 resize-none"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary-500 to-accent-400"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

function BudgetSelector({
  selected,
  onSelect,
  delay = 0,
}: {
  selected: string;
  onSelect: (v: string) => void;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay }}
    >
      <span className="text-xs text-gray-600 block mb-4 uppercase tracking-wider">
        Budget Range
      </span>
      <div className="flex flex-wrap gap-3">
        {budgetRanges.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => onSelect(range)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selected === range
                ? "bg-primary-500 text-white"
                : "glass text-gray-400 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
