export const company = {
  name: "Katalyst Media",
  legalName: "Katalyst Media",
  tagline: "Put your music in front of the right listeners.",
  positioning: "Music marketing, creator campaigns and paid advertising for artists.",
  heroEyebrow: "Music marketing for artists",
  sidebarDescription:
    "Creator campaigns, paid advertising and release-focused promotion for independent and upcoming artists.",
  description:
    "Katalyst Media helps independent artists promote their music through creator campaigns, paid advertising, short-form content and release strategy.",
  focusLabel: "What we do",
  location: "United Kingdom",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.katalystmedia.xyz",
  pageTitle: "Katalyst Media | Music Marketing for Artists",
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim(),
  instagramUrl: (process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "").trim(),
  linkedinUrl: (process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "").trim(),
} as const;

export type SocialLink = {
  label: string;
  href: string;
};

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (company.instagramUrl) {
    links.push({ label: "Instagram", href: company.instagramUrl });
  }
  if (company.linkedinUrl) {
    links.push({ label: "LinkedIn", href: company.linkedinUrl });
  }
  return links;
}

export function hasPublicEmail() {
  return Boolean(company.email);
}

export function hasInstagram() {
  return Boolean(company.instagramUrl);
}

export function getMailtoHref() {
  if (!company.email) return "/";
  return `mailto:${company.email}`;
}
