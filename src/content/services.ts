export const heroCopy = {
  description:
    "Katalyst Media helps independent and upcoming artists promote their releases through creator campaigns, paid advertising, short-form content and release strategy.",
  supporting:
    "We plan and manage coordinated campaigns designed around the artist, the music and the goals of each release.",
};

export const introCopy = {
  eyebrow: "Introduction",
  headline: "Music promotion needs more than one post.",
  description:
    "A release campaign needs more than isolated content. Katalyst Media brings strategy, creator outreach, paid advertising and campaign management together around one coordinated plan.",
  approachLabel: "Our approach",
  points: [
    {
      title: "Built around the release",
      description: "Campaigns shaped by the music, timing and release goals.",
    },
    {
      title: "Focused on relevant listeners",
      description: "Reach audiences who are more likely to connect with the music.",
    },
    {
      title: "Managed from strategy to reporting",
      description:
        "Planning, launch, optimisation and clear reporting in one coordinated process.",
    },
  ],
  mixNodes: [
    { id: "content", label: "Content", descriptor: "Creative assets" },
    { id: "creators", label: "Creators", descriptor: "Relevant reach" },
    { id: "paid", label: "Paid ads", descriptor: "Targeted media" },
    { id: "strategy", label: "Strategy", descriptor: "Campaign direction" },
  ] as const,
};

export type ServiceItem = {
  number: string;
  title: string;
  description: string;
  icon: "users" | "megaphone" | "clapperboard" | "calendar" | "share" | "chart";
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
    icon: "users",
    description:
      "Coordinated placements across relevant creators, music pages and online communities to introduce releases to suitable new audiences.",
  },
  {
    number: "02",
    title: "Paid Ad Campaigns",
    icon: "megaphone",
    description:
      "We plan, launch and manage paid advertising campaigns for artists and music releases, including targeting, budget management, creative testing, optimisation and reporting.",
  },
  {
    number: "03",
    title: "Content and Creative Direction",
    icon: "clapperboard",
    description:
      "Short-form content ideas, promotional visuals and creative guidance for TikTok, Instagram Reels, YouTube Shorts and other suitable platforms.",
  },
  {
    number: "04",
    title: "Release Campaign Strategy",
    icon: "calendar",
    description:
      "Structured planning for the period before, during and after the release of a single, EP, album or music video.",
  },
  {
    number: "05",
    title: "Social Media Marketing",
    icon: "share",
    description:
      "Release-focused content planning, campaign messaging and promotional support designed to create consistent attention around the music.",
  },
  {
    number: "06",
    title: "Campaign Management and Reporting",
    icon: "chart",
    description:
      "We coordinate campaign activity, monitor performance, make adjustments and report on the available results.",
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

export const paidMediaCopy = {
  eyebrow: "Paid media",
  headline: "We do more than make the ad. We run the campaign.",
  description:
    "Katalyst Media can manage the paid advertising process from campaign planning and audience targeting through to launch, optimisation and reporting.",
  note: "Advertising platforms and campaign formats are selected based on the release, audience, content and available budget.",
  stages: [
    { number: "01", title: "Campaign objective" },
    { number: "02", title: "Audience targeting" },
    { number: "03", title: "Creative selection" },
    { number: "04", title: "Launch and optimisation" },
    { number: "05", title: "Performance reporting" },
  ],
};

export const capabilitiesCopy = {
  eyebrow: "Campaign capabilities",
  headline: "What a Katalyst Media campaign can include.",
  description:
    "Every release requires a different approach. Depending on the artist, goals and campaign requirements, a campaign may combine several of the following services.",
  items: [
    {
      number: "01",
      title: "Release strategy",
      description: "Timing, objectives and campaign shape around the release.",
    },
    {
      number: "02",
      title: "Creator outreach",
      description: "Relevant creators, pages and communities for placement.",
    },
    {
      number: "03",
      title: "Short-form content",
      description: "Content ideas and formats for promotional clips.",
    },
    {
      number: "04",
      title: "Paid advertising",
      description: "Audience targeting, budget and creative testing.",
    },
    {
      number: "05",
      title: "Campaign optimisation",
      description: "Ongoing adjustments while the campaign is live.",
    },
    {
      number: "06",
      title: "Performance reporting",
      description: "Clear reporting on available campaign metrics.",
    },
  ],
};

export const audienceCopy = {
  eyebrow: "Who we help",
  headline: "Built for artists developing their audience.",
  groups: [
    {
      title: "Independent Artists",
      description: "Artists independently releasing and promoting their own music.",
    },
    {
      title: "Upcoming Artists",
      description:
        "Developing artists who want to reach new listeners and build stronger release campaigns.",
    },
    {
      title: "Producers",
      description:
        "Producers promoting tracks, collaborations, instrumental releases or creative projects.",
    },
    {
      title: "Music Teams and Labels",
      description:
        "Small teams and independent labels that need additional campaign, content or advertising support.",
    },
  ],
};

export const whyCopy = {
  eyebrow: "Approach",
  headline: "A coordinated approach to music marketing.",
  points: [
    {
      title: "Release-Focused",
      description:
        "Each campaign is built around the music, the release schedule and the artist’s goals.",
    },
    {
      title: "Creative and Strategic",
      description: "We combine campaign planning with content and creative direction.",
    },
    {
      title: "Multi-Channel",
      description:
        "Creator activity, short-form content and paid advertising can work together instead of operating separately.",
    },
    {
      title: "Clear Campaign Management",
      description:
        "We organise campaign activity and provide transparent reporting based on the data available.",
    },
  ],
};

export const aboutCopy = {
  eyebrow: "About",
  headline: "About Katalyst Media",
  paragraphs: [
    "Katalyst Media is a music marketing and creative agency built to help independent and upcoming artists promote their releases and reach new listeners.",
    "We combine creator campaigns, paid advertising, short-form content, creative direction and release strategy to build coordinated campaigns around each artist and release.",
    "Our role is to help artists present their music clearly, reach relevant audiences and manage the promotional process more effectively.",
  ],
};

export const faqCopy = {
  eyebrow: "FAQ",
  headline: "Common questions.",
  items: [
    {
      question: "What services does Katalyst Media provide?",
      answer:
        "Katalyst Media provides creator campaigns, paid advertising, short-form content support, creative direction, release strategy, social media marketing, campaign management and reporting.",
    },
    {
      question: "Do you run paid advertising campaigns?",
      answer:
        "Yes. Katalyst Media can plan, launch, manage and optimise paid advertising campaigns for artists and music releases.",
    },
    {
      question: "Do you only work with TikTok creators?",
      answer:
        "No. Creator campaigns are one part of the wider service. Campaigns may also include paid advertising, short-form content, release strategy and other promotional activity.",
    },
    {
      question: "Do you guarantee streams or views?",
      answer:
        "No. Music marketing results depend on the release, creative material, audience response, budget, platform performance and market conditions.",
    },
    {
      question: "Who does Katalyst Media work with?",
      answer:
        "Katalyst Media is primarily built for independent artists, upcoming artists, producers, music teams and independent labels.",
    },
    {
      question: "How can I contact Katalyst Media?",
      answer:
        "Use the contact details provided on the website to discuss your music or marketing requirements.",
    },
  ],
};

export const contactCopy = {
  eyebrow: "Contact",
  headline: "Contact Katalyst Media",
  description:
    "Get in touch to discuss your music, upcoming release or marketing requirements.",
  emailButton: "Email Katalyst Media",
  instagramButton: "Instagram",
};
