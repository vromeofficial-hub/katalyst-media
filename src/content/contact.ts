import { company } from "@/content/company";

export const contactCopy = {
  headline: "Contact Katalyst Media",
  description: company.email
    ? "For music-promotion enquiries, campaign information or collaboration opportunities, contact Katalyst Media directly by email."
    : "Contact details are currently in progress and will appear here soon.",
  buttonLabel: "Email Katalyst Media",
  email: company.email,
  pendingLabel: "In Progress",
} as const;
