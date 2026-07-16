export const company = {
  name: "Katalyst Media",
  legalName: "Katalyst Media",
  tagline: "Put your music in front of the right audiences.",
  description:
    "Katalyst Media helps artists promote their releases through coordinated TikTok creator campaigns across relevant niche communities.",
  shortDescription:
    "Music promotion for artists through coordinated TikTok creator campaigns.",
  fullDescription:
    "Katalyst Media helps artists promote their music through coordinated TikTok creator campaigns designed to place songs in front of relevant audiences. We work with the artist to understand the release, sound, target listener and campaign objective, then build a promotion plan around suitable content styles, communities and creator pages. The campaign is organised across multiple accounts so the song can appear naturally across different content environments that fit the track. Katalyst Media manages the campaign budget, creator communication, content direction, posting schedule and delivery process, giving the artist one organised point of contact instead of having to manage every page individually.",
  focus: "TikTok creator campaigns for artists",
  focusLabel: "Current focus",
  email: "hello@katalystmedia.com",
  location: "United Kingdom",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://katalystmedia.com",
  pageTitle: "Katalyst Media | Music Promotion Through Creator Campaigns",
  foundingYear: 2024,
} as const;

export function getMailtoHref() {
  return `mailto:${company.email}`;
}
