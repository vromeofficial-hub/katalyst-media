export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processIntro = {
  eyebrow: "Campaign process",
  headline: "How a Katalyst Media campaign works.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand the Release",
    description:
      "We learn about the artist, the music, the release date and the overall goals of the campaign.",
  },
  {
    number: "02",
    title: "Define the Audience and Objective",
    description:
      "We identify the listeners the campaign should reach and establish the main campaign objective.",
  },
  {
    number: "03",
    title: "Choose the Campaign Mix",
    description:
      "We decide how creator placements, paid advertising, content and promotional pages should work together.",
  },
  {
    number: "04",
    title: "Develop the Creative Direction",
    description:
      "We plan the campaign messaging, visual direction, content ideas and advertising creatives.",
  },
  {
    number: "05",
    title: "Launch the Campaign",
    description:
      "We coordinate creator placements, launch paid advertising and manage the campaign rollout.",
  },
  {
    number: "06",
    title: "Optimise and Report",
    description:
      "We monitor performance, make campaign adjustments and report on views, engagement, clicks, streams, conversions and audience growth where the relevant data is available.",
  },
];
