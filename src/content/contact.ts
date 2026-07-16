import { company } from "@/content/company";

export const contactCopy = {
  headline: "Contact Katalyst Media",
  description: company.email
    ? "For music-promotion enquiries, campaign information or collaboration opportunities, contact Katalyst Media directly by email."
    : "For music-promotion enquiries, campaign information or collaboration opportunities, contact details will be shared here soon.",
  buttonLabel: "Email Katalyst Media",
  email: company.email,
} as const;
