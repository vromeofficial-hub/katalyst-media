import { company } from "@/content/company";

export const contactCopy = {
  headline: "Start Your Campaign",
  description:
    "Tell us about your music, your upcoming release and the type of support you need.",
  buttonLabel: "Submit Campaign Enquiry",
  email: company.email,
} as const;

export const releaseTypes = [
  "Single",
  "EP",
  "Album",
  "Music video",
  "Existing release",
  "Other",
] as const;

export const serviceOptions = [
  "Creator campaign",
  "Paid advertising",
  "Content and creative direction",
  "Release strategy",
  "Full campaign management",
  "Not sure yet",
] as const;

export type CampaignEnquiry = {
  artistName: string;
  email: string;
  releaseLink: string;
  releaseType: string;
  releaseDate: string;
  budget: string;
  services: string[];
  additionalInfo: string;
};

/**
 * Placeholder for future backend wiring (email API, CRM, or form service).
 * The UI validates and collects data; submissions are not stored or emailed yet.
 */
export async function submitCampaignEnquiry(
  payload: CampaignEnquiry,
): Promise<{ ok: true } | { ok: false; error: string }> {
  // TODO: Connect form backend (Resend, Formspree, API route, etc.)
  void payload;
  return {
    ok: false,
    error:
      "Form submissions are not connected yet. Please try again once the enquiry backend is live.",
  };
}
