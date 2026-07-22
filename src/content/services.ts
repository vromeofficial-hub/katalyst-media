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
      "Coordinated placements across relevant creators, pages and music communities to help introduce your music to new audiences.",
  },
  {
    number: "02",
    title: "Paid Ad Campaigns",
    description:
      "We plan, launch and manage paid advertising campaigns for artists and music releases. This includes audience targeting, budget management, creative testing, campaign optimisation and performance reporting.",
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
      "Structured campaign planning for the period before, during and after the release of a single, EP, album or music video.",
  },
];

export const heroStructureItems = [
  "Creator campaigns",
  "Paid advertising",
  "Short-form content",
  "Creative direction",
  "Release strategy",
  "Performance reporting",
] as const;

export const aboutCopy = {
  eyebrow: "About",
  headline: "A music marketing and creative agency for independent artists.",
  paragraphs: [
    "Katalyst Media is a music marketing and creative agency built to help independent artists promote their releases and reach new listeners.",
    "We combine creator campaigns, paid advertising, short-form content and release strategy to build coordinated campaigns around each artist and release.",
  ],
};
