import { company } from "@/content/company";

export const contactCopy = {
  headline: "Contact Katalyst Media",
  description:
    "Get in touch to discuss your music, upcoming release or marketing requirements.",
  buttonLabel: "Send Message",
  email: company.email,
} as const;

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

/**
 * Placeholder for future backend wiring (email API, Formspree, Resend, etc.).
 * The UI collects data; submissions are not stored or emailed yet.
 */
export async function submitContactMessage(
  payload: ContactMessage,
): Promise<{ ok: true } | { ok: false; error: string }> {
  // TODO: Connect form backend
  void payload;
  return {
    ok: false,
    error:
      "Message delivery is not connected yet. Please try again once the contact form backend is live.",
  };
}
