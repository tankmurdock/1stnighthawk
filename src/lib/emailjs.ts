import emailjs from "@emailjs/browser";

// ============================================================
// EMAILJS CONFIGURATION
// ============================================================
// Set these in your .env file (see .env.example):
//   VITE_EMAILJS_SERVICE_ID
//   VITE_EMAILJS_TEMPLATE_ID
//   VITE_EMAILJS_PUBLIC_KEY
//
// Template variables used: {{title}}, {{name}}, {{email}}, {{message}}
// ============================================================

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const fullMessage = data.budget
      ? `Budget: ${data.budget}\n\n${data.message}`
      : data.message;

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        title: `New Project Inquiry from ${data.name}`,
        name: data.name,
        email: data.email,
        message: fullMessage,
      },
      EMAILJS_PUBLIC_KEY
    );

    return result.status === 200;
  } catch (error) {
    console.error("EmailJS error:", error);
    return false;
  }
}
