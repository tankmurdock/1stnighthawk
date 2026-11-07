import emailjs from "@emailjs/browser";

/* ══════════════════════════════════════════════════════════════════
   CONTACT DELIVERY

   Three states matter here:

   1. CONFIGURED  — EmailJS keys present, message posts and lands in
      the inbox. This is the happy path.

   2. UNCONFIGURED — no keys. Previously this returned `false` and the
      visitor saw "That didn't go through", losing the lead entirely.
      Now we fall back to a pre-filled mailto: link, which always
      works with no backend at all.

   3. FAILED — keys present but the request failed (network, quota,
      bad template). We surface a copyable summary plus the mailto
      fallback, so the visitor can still reach you.

   Keys live in .env as VITE_EMAILJS_* and are inlined at build time.
   They are public by design (EmailJS keys are browser-safe) — the
   service restricts allowed origins in the EmailJS dashboard.
   ══════════════════════════════════════════════════════════════════ */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

/** True only when all three values look real, not placeholders. */
export const isEmailConfigured = (() => {
  const looksReal = (v: string) =>
    v.length > 0 && !/^(your_|YOUR_|xxx)/.test(v);
  return (
    looksReal(SERVICE_ID) && looksReal(TEMPLATE_ID) && looksReal(PUBLIC_KEY)
  );
})();

export interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export type SendResult =
  | { ok: true; via: "emailjs" }
  | { ok: false; reason: "unconfigured" | "failed"; error?: string };

/**
 * Builds a mailto: URL containing the whole enquiry, so nothing is lost
 * when the automated path is unavailable.
 */
export function buildFallbackMailto(to: string, data: ContactFormData): string {
  const subject = `Project inquiry${
    data.budget ? ` — ${data.budget}` : ""
  } — ${data.name}`;

  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.budget ? `Budget: ${data.budget}` : "",
    "",
    data.message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export async function sendContactEmail(
  data: ContactFormData,
): Promise<SendResult> {
  // No keys — don't pretend to send. Let the UI offer the mailto fallback.
  if (!isEmailConfigured) {
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        // Every common template variable name, so the template works
        // whether it was authored with {{from_name}} or {{name}}.
        from_name: data.name,
        name: data.name,
        reply_to: data.email,
        email: data.email,
        budget: data.budget || "Not specified",
        message: data.message,
        title: `New project inquiry from ${data.name}`,
        // Compact single-line summary for templates that only have one field.
        summary: `${data.name} <${data.email}> · ${
          data.budget || "budget TBD"
        } — ${data.message.slice(0, 240)}`,
        sent_at: new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
      },
      { publicKey: PUBLIC_KEY },
    );

    if (result.status === 200) return { ok: true, via: "emailjs" };

    return { ok: false, reason: "failed", error: `HTTP ${result.status}` };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
          ? err
          : "Unknown error";
    console.error("[contact] EmailJS send failed:", message);
    return { ok: false, reason: "failed", error: message };
  }
}
