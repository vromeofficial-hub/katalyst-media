export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processIntro = {
  eyebrow: "How we work",
  headline: "What happens when you work with Katalyst.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand the Release",
    description:
      "Artist, music, timing, audience and what the campaign needs to achieve.",
  },
  {
    number: "02",
    title: "Build the Strategy",
    description:
      "Choose the right mix of creators, content, paid media and rollout for the release.",
  },
  {
    number: "03",
    title: "Develop Creative Direction",
    description:
      "Shape messaging, visuals and promotional creative before anything goes live.",
  },
  {
    number: "04",
    title: "Launch & Manage",
    description:
      "Coordinate the rollout and keep creator and paid activity moving as planned.",
  },
  {
    number: "05",
    title: "Review & Report",
    description:
      "Track available performance data, adjust where useful and summarise the outcome.",
  },
];
