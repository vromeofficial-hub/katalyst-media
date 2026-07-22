"use client";

import {
  AudioLines,
  Clapperboard,
  Crosshair,
  Disc3,
  Megaphone,
  Radio,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { introCopy } from "@/content/services";
import { cn } from "@/lib/utils";
import "./intro-section.css";

const pointIcons = [Disc3, AudioLines, Radio] as const;

const nodeIcons: Record<(typeof introCopy.mixNodes)[number]["id"], LucideIcon> = {
  content: Clapperboard,
  creators: Users,
  paid: Megaphone,
  strategy: Crosshair,
};

/** Roomier static hub-and-spoke layout (percent of diagram box). */
const spokeLayout = [
  { id: "content", x: 50, y: 13, x1: 50, y1: 36, x2: 50, y2: 22 },
  { id: "creators", x: 87, y: 50, x1: 64, y1: 50, x2: 78, y2: 50 },
  { id: "paid", x: 50, y: 87, x1: 50, y1: 64, x2: 50, y2: 78 },
  { id: "strategy", x: 13, y: 50, x1: 36, y1: 50, x2: 22, y2: 50 },
] as const;

function CampaignMixDiagram() {
  const nodes = introCopy.mixNodes.map((node) => {
    const layout = spokeLayout.find((item) => item.id === node.id)!;
    return { ...node, ...layout, Icon: nodeIcons[node.id] };
  });

  return (
    <div className="intro-mix">
      <div className="intro-mix__glow" aria-hidden="true" />

      <div className="intro-mix__panel relative z-10 flex h-auto min-h-[360px] flex-col overflow-hidden rounded-[24px] sm:min-h-[420px] lg:h-[540px]">
        <div className="intro-mix__panel-surface absolute inset-0" aria-hidden="true" />
        <div className="intro-mix__grain absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
          <div className="intro-mix__header relative flex shrink-0 items-baseline justify-between gap-4 pb-4">
            <p className="label-caps text-acid-lime">Campaign mix</p>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#b8b8c0] sm:text-[0.75rem]">
              One coordinated plan
            </p>
            <span className="intro-mix__header-dot" aria-hidden="true" />
          </div>

          <div
            className="intro-mix__diagram relative mx-auto mt-4 w-full flex-1 min-h-[300px] sm:min-h-[340px] lg:min-h-0"
            role="img"
            aria-label="Campaign mix diagram with the release at the centre, connected to content, creators, paid ads and strategy"
          >
            <div className="intro-mix__hub-glow" aria-hidden="true" />

            <svg
              className="pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {nodes.map((node) => (
                <g key={node.id}>
                  <line
                    x1={node.x1}
                    y1={node.y1}
                    x2={node.x2}
                    y2={node.y2}
                    className="intro-mix__spoke"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={node.x2}
                    cy={node.y2}
                    r="0.9"
                    className="fill-acid-lime/55"
                  />
                </g>
              ))}
            </svg>

            <div className="intro-mix__hub absolute left-1/2 top-1/2 z-20 flex w-[44%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[20px] px-5 py-6 text-center sm:w-[40%] sm:max-w-[16rem] sm:px-6 sm:py-7">
              <span className="intro-mix__crosshair" aria-hidden="true" />
              <p className="relative z-[1] text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-acid-lime">
                The release
              </p>
              <p className="relative z-[1] mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.03em] text-off-white sm:text-xl">
                One coordinated campaign
              </p>
            </div>

            {nodes.map((node) => {
              const Icon = node.Icon;
              return (
                <div
                  key={node.id}
                  className="intro-mix__node absolute z-10 flex w-[34%] max-w-[10rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[18px] px-3.5 py-4 text-center sm:w-[30%] sm:max-w-[11rem] sm:px-4 sm:py-5"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <span className="intro-mix__node-icon mb-3 flex size-9 items-center justify-center rounded-full sm:size-10">
                    <Icon className="size-4 text-acid-lime sm:size-[1.125rem]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold leading-tight tracking-[-0.015em] text-off-white sm:text-[0.9375rem]">
                    {node.label}
                  </p>
                  <p className="mt-1.5 text-[0.75rem] leading-snug text-[#8a8a92]">
                    {node.descriptor}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function IntroSection() {
  return (
    <section
      id="introduction"
      className="intro-section relative scroll-mt-20 overflow-hidden border-b border-border-dark bg-deep-black py-12 md:py-14 lg:scroll-mt-0 lg:py-16"
      aria-labelledby="intro-heading"
    >
      <div className="intro-section__texture pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[42fr_58fr] lg:gap-10">
          <Reveal>
            <p className="label-caps text-acid-lime">{introCopy.eyebrow}</p>
            <h2
              id="intro-heading"
              className="mt-3 max-w-xl font-display text-[length:var(--text-h2)] font-semibold leading-[1.12] tracking-[-0.03em] text-off-white text-balance"
            >
              Music promotion needs more than{" "}
              <span className="text-acid-lime">one post.</span>
            </h2>
            <p className="mt-4 max-w-[32.5rem] text-sm leading-relaxed text-[#c4c4ca] md:text-[0.975rem]">
              {introCopy.description}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <CampaignMixDiagram />
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-20">
          <Reveal>
            <p className="label-caps text-acid-lime">{introCopy.approachLabel}</p>
          </Reveal>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {introCopy.points.map((point, index) => {
              const Icon = pointIcons[index] ?? Disc3;
              const isLastOdd =
                introCopy.points.length % 2 === 1 &&
                index === introCopy.points.length - 1;

              return (
                <Reveal key={point.title} delay={index * 0.04}>
                  <li
                    className={cn(
                      "h-full",
                      isLastOdd &&
                        "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-md lg:col-span-1 lg:mx-0 lg:max-w-none",
                    )}
                  >
                    <article className="group flex h-full flex-col rounded-[18px] border border-border-dark bg-carbon p-6 transition-colors duration-200 hover:border-lime-border hover:bg-lime-soft/25">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex size-12 items-center justify-center rounded-full border border-lime-border bg-deep-black text-acid-lime transition-colors duration-200 group-hover:border-acid-lime group-hover:bg-lime-soft">
                          <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <p className="font-mono text-sm tracking-[0.1em] text-acid-lime">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <h3 className="mt-5 min-h-[3.25rem] font-display text-lg font-semibold tracking-[-0.02em] text-off-white sm:text-xl">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-soft-grey">
                        {point.description}
                      </p>
                    </article>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
