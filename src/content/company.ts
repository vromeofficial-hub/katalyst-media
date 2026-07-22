export const company = {
  name: "Katalyst Media",
  legalName: "Katalyst Media",
  tagline: "Put your music in front of the right listeners.",
  positioning: "Music marketing, creator campaigns and paid advertising for artists.",
  description:
    "Katalyst Media helps independent artists promote their music through creator campaigns, short-form content, release strategy and paid advertising.",
  shortDescription:
    "Music marketing, creator campaigns and paid advertising for artists.",
  fullDescription:
    "Katalyst Media is a music marketing and creative agency built to help independent artists promote their releases and reach new listeners. We combine creator campaigns, paid advertising, short-form content and release strategy to build coordinated campaigns around each artist and release.",
  focus: "Music marketing for independent artists",
  focusLabel: "What we do",
  email: "",
  location: "United Kingdom",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.katalystmedia.xyz",
  pageTitle: "Katalyst Media | Music Marketing & Advertising for Artists",
  foundingYear: 2024,
  socialLinks: [] as { label: string; href: string }[],
} as const;

export function getMailtoHref() {
  if (!company.email) return "/#contact";
  return `mailto:${company.email}`;
}

export function hasPublicEmail() {
  return Boolean(company.email.trim());
}
