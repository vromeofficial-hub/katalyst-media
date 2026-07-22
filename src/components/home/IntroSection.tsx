"use client";

import { AudioLines, Disc3, Radio } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { introCopy } from "@/content/services";
import { cn } from "@/lib/utils";
import "./intro-section.css";

const pointIcons = [Disc3, AudioLines, Radio] as const;

/** Compact hub-and-spoke positions (percent of diagram box). */
const spokeLayout = [
  { id: "content", x: 50, y: 20 },
  { id: "creators", x: 80, y: 50 },
  { id: "paid", x: 50, y: 80 },
  { id: "strategy", x: 20, y: 50 },
] as const;

function CampaignMixDiagram() {
  const reduceMotion = useReducedMotion();
  const nodes = introCopy.mixNodes.map((node) => {
    const layout = spokeLayout.find((item) => item.id === node.id)!;
    return { ...node, ...layout };
  });

  return (
    <div className="intro-mix">
      <div className="intro-mix__glow" aria-hidden="true" />

      <div className="intro-mix__panel relative z-10 flex h-auto flex-col overflow-hidden rounded-[20px] lg:h-[410px]">
        <div className="intro-mix__panel-surface absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col p-5 sm:p-6">
          <div className="intro-mix__header flex shrink-0 items-baseline justify-between gap-4 pb-3.5">
            <p className="label-caps text-acid-lime">Campaign mix</p>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#b0b0b8]">
              One coordinated plan
            </p>
          </div>

          <div
            className="intro-mix__diagram relative mx-auto mt-2 w-full flex-1 min-h-[250px] max-h-[300px] lg:min-h-0 lg:max-h-none"
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
                <line
                  key={node.id}
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  className="intro-mix__spoke"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            <div className="intro-mix__hub absolute left-1/2 top-1/2 z-20 flex w-[48%] max-w-[12.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[16px] px-4 py-4 text-center sm:w-[44%] sm:px-5 sm:py-5">
              <p className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-acid-lime">
                The release
              </p>
              <p className="mt-2 font-display text-base font-semibold leading-[1.25] tracking-[-0.025em] text-off-white sm:text-[1.0625rem]">
                One coordinated campaign
              </p>
            </div>

            {nodes.map((node) => (
              <div
                key={node.id}
                className={cn(
                  "intro-mix__node absolute z-10 flex w-[36%] max-w-[8rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[14px] px-3 py-3 text-center sm:w-[34%] sm:max-w-[8.5rem] sm:px-3.5 sm:py-3.5",
                  reduceMotion ? "" : "intro-mix__node--interactive",
                )}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <p className="text-[0.8125rem] font-semibold leading-tight tracking-[-0.01em] text-off-white sm:text-[0.875rem]">
                  {node.label}
                </p>
                <p className="mt-1.5 text-[0.6875rem] leading-snug text-[#8e8e96]">
                  {node.descriptor}
                </p>
              </div>
            ))}
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
        <div className="grid items-center gap-7 lg:grid-cols-[48fr_52fr] lg:gap-9">
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
                      isLastOdd && "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-md lg:col-span-1 lg:mx-0 lg:max-w-none",
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
