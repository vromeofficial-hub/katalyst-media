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
    "Katalyst Media is a music marketing and creative agency built to help independent and upcoming artists promote their releases and reach new listeners. We combine creator campaigns, paid advertising, short-form content and release strategy to create coordinated music marketing campaigns.",
  focus: "Music marketing for independent artists",
  focusLabel: "What we do",
  // TODO: Add the public business email when ready (e.g. "hello@katalystmedia.xyz")
  email: "",
  location: "United Kingdom",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.katalystmedia.xyz",
  pageTitle: "Katalyst Media | Music Marketing for Artists",
  foundingYear: 2024,
  // TODO: Add Instagram / other social URLs when ready
  socialLinks: [] as { label: string; href: string }[],
} as const;

export function getMailtoHref() {
  if (!company.email) return "/#contact";
  return `mailto:${company.email}`;
}

export function hasPublicEmail() {
  return Boolean(company.email.trim());
}
