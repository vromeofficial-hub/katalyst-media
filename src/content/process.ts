export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processIntro = {
  eyebrow: "How we work",
  headline: "A clear process for every campaign.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand the Release",
    description:
      "We learn about the artist, music, release date, audience and campaign goals.",
  },
  {
    number: "02",
    title: "Build the Strategy",
    description:
      "We choose the right combination of content, creator activity, paid advertising and release promotion.",
  },
  {
    number: "03",
    title: "Develop the Creative Direction",
    description:
      "We plan the campaign messaging, visual direction, promotional content and advertising material.",
  },
  {
    number: "04",
    title: "Launch and Manage",
    description:
      "We coordinate the campaign rollout, creator activity and paid advertising where required.",
  },
  {
    number: "05",
    title: "Review and Report",
    description:
      "We monitor available performance data, make campaign adjustments and provide a clear summary of the results.",
  },
];
