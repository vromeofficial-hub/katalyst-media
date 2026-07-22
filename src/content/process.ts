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
      "We learn about the artist, the music, the release date and the campaign goals.",
  },
  {
    number: "02",
    title: "Build the Strategy",
    description:
      "We choose the right combination of creator campaigns, content and paid advertising.",
  },
  {
    number: "03",
    title: "Develop the Creative Direction",
    description:
      "We plan the messaging, visual direction and content required for the campaign.",
  },
  {
    number: "04",
    title: "Launch and Manage",
    description:
      "We launch the campaign, coordinate activity and manage paid advertising where required.",
  },
  {
    number: "05",
    title: "Review and Report",
    description:
      "We monitor performance, make adjustments and report on the available campaign results.",
  },
];
