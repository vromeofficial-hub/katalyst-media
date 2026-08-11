export const heroCopy = {
  description:
    "Katalyst Media builds and manages release campaigns for independent and emerging artists, combining creator marketing, short-form content and paid media around one coordinated strategy.",
};

export const introCopy = {
  eyebrow: "Introduction",
  headline: "Music promotion needs more than one post.",
  description:
    "Isolated posts and one-off promotion rarely move a release. Stronger campaigns connect strategy, creative and distribution around the same release objective.",
  approachLabel: "Why Katalyst",
  points: [
    {
      title: "Release-led strategy",
      description:
        "Everything starts with the music, release timing and campaign objective.",
    },
    {
      title: "Relevant audience reach",
      description:
        "Creators, content and advertising are selected around the listeners most likely to connect.",
    },
    {
      title: "One managed campaign",
      description:
        "Strategy, creative, launch, optimisation and reporting stay coordinated in one place.",
    },
  ],
};

export type ServiceItem = {
  number: string;
  title: string;
  description: string;
  icon: "users" | "megaphone" | "clapperboard" | "calendar" | "chart";
  capabilities: readonly string[];
};

export const servicesIntro = {
  eyebrow: "Services",
  headline: "Music marketing built around your release.",
  description:
    "Five focused services that can run alone or together as one release campaign.",
};

export const coreServices: ServiceItem[] = [
  {
    number: "01",
    title: "Creator Campaigns",
    icon: "users",
    description:
      "Creator research, shortlisting, outreach, briefs and placement coordination — so the right creators introduce the release to relevant audiences.",
    capabilities: [
      "Creator research",
      "Shortlisting",
      "Outreach",
      "Campaign briefs",
      "Placement",
    ],
  },
  {
    number: "02",
    title: "Paid Advertising",
    icon: "megaphone",
    description:
      "Objectives, audience targeting, budget allocation, creative testing, launch, optimisation and reporting for paid campaigns around the release.",
    capabilities: [
      "Targeting",
      "Budget",
      "Creative testing",
      "Optimisation",
      "Reporting",
    ],
  },
  {
    number: "03",
    title: "Content & Creative Direction",
    icon: "clapperboard",
    description:
      "Short-form concepts for TikTok, Reels and Shorts, plus promotional visuals, campaign messaging and ad creative direction.",
    capabilities: [
      "TikTok",
      "Reels",
      "Shorts",
      "Visual direction",
      "Ad creative",
    ],
  },
  {
    number: "04",
    title: "Release Campaign Strategy",
    icon: "calendar",
    description:
      "Pre-release, release-week and post-release planning — timeline, channel selection, content rollout and budget shape.",
    capabilities: [
      "Pre-release",
      "Release week",
      "Post-release",
      "Timeline",
      "Rollout",
    ],
  },
  {
    number: "05",
    title: "Campaign Management & Reporting",
    icon: "chart",
    description:
      "Day-to-day coordination across creators and paid media, performance monitoring, live adjustments and a clear performance review.",
    capabilities: [
      "Coordination",
      "Monitoring",
      "Adjustments",
      "Paid media",
      "Reporting",
    ],
  },
];

export const heroStructureItems = [
  "Creator campaigns",
  "Paid advertising",
  "Content & creative",
  "Release strategy",
  "Campaign management",
] as const;

export const paidMediaCopy = {
  eyebrow: "Paid media",
  headline: "We do more than make the ad. We run the campaign.",
  description:
    "From objective and targeting through creative testing, launch and reporting — Katalyst can manage the paid side of a release campaign end to end.",
  note: "Platforms and formats are chosen for the release, audience, creative and budget — not as a fixed package.",
  stages: [
    {
      number: "01",
      title: "Campaign objective",
      description: "Define what the campaign needs to achieve around the release.",
    },
    {
      number: "02",
      title: "Audience targeting",
      description:
        "Build audiences around genre, listener behaviour and campaign goals.",
    },
    {
      number: "03",
      title: "Creative selection",
      description: "Select and test promotional content suited to the campaign.",
    },
    {
      number: "04",
      title: "Launch & optimisation",
      description:
        "Monitor performance and adjust audiences, budget and creative.",
    },
    {
      number: "05",
      title: "Performance reporting",
      description: "Review campaign data and identify what performed best.",
    },
  ],
};

export const audienceCopy = {
  eyebrow: "Who we help",
  headline: "Built for artists developing their audience.",
  groups: [
    {
      title: "Independent Artists",
      description: "Artists releasing and promoting their own music independently.",
    },
    {
      title: "Emerging Artists",
      description:
        "Artists building an audience and looking for clearer, more structured release campaigns.",
    },
    {
      title: "Producers",
      description:
        "Producers promoting tracks, collaborations, instrumentals or creative projects.",
    },
    {
      title: "Artist Teams & Independent Labels",
      description:
        "Small teams and labels that need extra campaign, content or paid-media support.",
    },
  ],
};

export const aboutCopy = {
  eyebrow: "About",
  headline: "About Katalyst Media",
  paragraphs: [
    "Katalyst Media was built around a simple idea: music marketing works better when the different parts of a release campaign work together.",
    "Instead of treating creator promotion, content and paid media as separate activities, Katalyst brings them into one release-focused strategy for independent and emerging artists.",
    "The aim is a clearer alternative to disconnected promotion — structured around the music, the timing and the goal of each release.",
  ],
};

export const faqCopy = {
  eyebrow: "FAQ",
  headline: "Common questions.",
  items: [
    {
      question: "How early should a campaign start before release?",
      answer:
        "Earlier planning usually helps. Many campaigns begin in the weeks before release so strategy, creative and outreach can be set before launch week.",
    },
    {
      question: "Can you promote music that is already released?",
      answer:
        "Yes. Live or catalogue releases can still be supported with a clear objective, audience plan and suitable creative.",
    },
    {
      question: "Can an artist use only one Katalyst service?",
      answer:
        "Yes. Services can run individually or as a combined release campaign, depending on what the project needs.",
    },
    {
      question: "What does an artist need before starting a campaign?",
      answer:
        "Typically the release (or a clear release plan), usable audio/visual assets, and an idea of goals and budget. Exact requirements depend on the services involved.",
    },
    {
      question: "What budget is needed for paid advertising?",
      answer:
        "There is no single figure. Budget depends on objectives, platforms, creative and how long the campaign needs to run. Katalyst can help shape a realistic plan.",
    },
    {
      question: "How long does a typical campaign run?",
      answer:
        "Timelines vary. Some focus on release week; others span pre-release, launch and a short post-release window.",
    },
    {
      question: "How are creators selected?",
      answer:
        "Through research and shortlisting based on relevance to the music, audience fit and campaign goals — not random outreach.",
    },
    {
      question: "How are campaign results measured?",
      answer:
        "Against the agreed objective, using the performance data available from creators, platforms and paid media. Metrics depend on the campaign setup.",
    },
    {
      question: "Do you work with singles, EPs and albums?",
      answer:
        "Yes. Campaigns can support singles, EPs, albums and other release formats where promotion is needed.",
    },
    {
      question: "Can Katalyst work alongside an artist’s existing team?",
      answer:
        "Yes. Katalyst can plug into existing management, label or creative workflows when a release needs additional campaign support.",
    },
    {
      question: "Do you guarantee streams or views?",
      answer:
        "No. Results depend on the release, creative, audience response, budget, platform performance and market conditions.",
    },
  ],
};

export const contactCopy = {
  eyebrow: "Contact",
  headline: "Contact Katalyst Media",
  description:
    "Get in touch to discuss your music, release or marketing requirements.",
  emailButton: "Email Katalyst Media",
  instagramButton: "Instagram",
  emptyState:
    "Direct email and social links will appear here once they are published. Until then, this page remains the home for Katalyst Media updates.",
};
