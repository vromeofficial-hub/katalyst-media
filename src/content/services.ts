export type ServiceItem = {
  number: string;
  title: string;
  description: string;
};

export const servicesIntro = {
  eyebrow: "Services",
  headline: "Music marketing built around your release.",
  description:
    "Creator campaigns are one part of a wider offer. Katalyst Media plans and manages coordinated music marketing across creators, content and paid advertising.",
};

export const coreServices: ServiceItem[] = [
  {
    number: "01",
    title: "Creator Campaigns",
    description:
      "Coordinated creator and music-page placements designed to introduce your music to relevant new audiences.",
  },
  {
    number: "02",
    title: "Paid Ad Campaigns",
    description:
      "We plan, launch and manage paid advertising campaigns for artists and music releases, including audience targeting, budget management, creative testing, optimisation and reporting.",
  },
  {
    number: "03",
    title: "Content and Creative Direction",
    description:
      "Short-form content ideas, promotional visuals and creative guidance for TikTok, Instagram Reels and YouTube Shorts.",
  },
  {
    number: "04",
    title: "Release Campaign Strategy",
    description:
      "Campaign planning for the period before, during and after the release of a single, EP, album or music video.",
  },
  {
    number: "05",
    title: "Social Media Marketing",
    description:
      "Support with promotional content, campaign messaging and consistent release-focused social media activity.",
  },
  {
    number: "06",
    title: "Campaign Management and Reporting",
    description:
      "We manage campaign activity, monitor performance and provide clear reporting on available results such as views, engagement, clicks, streams and audience growth.",
  },
];

export const heroStructureItems = [
  "Creator campaigns",
  "Paid advertising",
  "Short-form content",
  "Creative direction",
  "Release strategy",
  "Campaign reporting",
] as const;

export const aboutCopy = {
  eyebrow: "About",
  headline: "A music marketing and creative agency for independent artists.",
  paragraphs: [
    "Katalyst Media is a music marketing and creative agency built to help independent and upcoming artists promote their releases and reach new listeners.",
    "We combine creator campaigns, paid advertising, short-form content and release strategy to create coordinated music marketing campaigns.",
  ],
};
