"use client";

import { AudioLines, Disc3, Radio } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { introCopy } from "@/content/services";
import { cn } from "@/lib/utils";
import "./intro-section.css";

const pointIcons = [Disc3, AudioLines, Radio] as const;

const spokeNodes = [
  { id: "content", label: "Content", x: 50, y: 12 },
  { id: "creators", label: "Creators", x: 88, y: 50 },
  { id: "paid", label: "Paid ads", x: 50, y: 88 },
  { id: "strategy", label: "Strategy", x: 12, y: 50 },
] as const;

function CampaignMixDiagram() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="intro-mix">
      <div className="intro-mix__glow" aria-hidden="true" />

      <div className="relative z-10 rounded-[20px] border border-border-dark bg-carbon/95 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-border-dark pb-3">
          <p className="label-caps text-acid-lime">Campaign mix</p>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-soft-grey">
            One coordinated plan
          </p>
        </div>

        <div
          className="intro-mix__diagram relative mx-auto mt-4 aspect-square w-full max-w-[340px] sm:max-w-none"
          role="img"
          aria-label="Campaign mix diagram with the release at the centre, connected to content, creators, paid ads and strategy"
        >
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {spokeNodes.map((node) => (
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

          <div className="intro-mix__hub absolute left-1/2 top-1/2 z-20 w-[42%] max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[14px] border border-lime-border bg-lime-soft px-3 py-3 text-center shadow-[0_0_32px_rgba(198,255,0,0.12)] sm:w-[38%] sm:px-3.5 sm:py-3.5">
            <p className="text-[0.6rem] uppercase tracking-[0.12em] text-muted-grey">
              Centre
            </p>
            <p className="mt-1 font-display text-sm font-semibold tracking-[-0.02em] text-off-white sm:text-base">
              The release
            </p>
          </div>

          {spokeNodes.map((node) => (
            <div
              key={node.id}
              className={cn(
                "intro-mix__node absolute z-10 w-[30%] max-w-[6.75rem] -translate-x-1/2 -translate-y-1/2 rounded-[12px] border border-border-dark bg-deep-black px-2.5 py-2.5 text-center transition-colors duration-200",
                !reduceMotion && "hover:border-lime-border hover:bg-elevated",
              )}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <p className="text-[0.75rem] font-medium leading-tight text-soft-grey sm:text-sm">
                {node.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IntroSection() {
  return (
    <section
      id="introduction"
      className="intro-section relative scroll-mt-20 overflow-hidden border-b border-border-dark bg-deep-black section-pad lg:scroll-mt-0"
      aria-labelledby="intro-heading"
    >
      <div className="intro-section__texture pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-start gap-8 lg:grid-cols-[52fr_48fr] lg:gap-10">
          <Reveal>
            <p className="label-caps text-acid-lime">{introCopy.eyebrow}</p>
            <h2
              id="intro-heading"
              className="mt-3 max-w-xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white text-balance"
            >
              Music promotion needs more than{" "}
              <span className="text-acid-lime">one post.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-soft-grey md:text-[0.975rem]">
              {introCopy.description}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <CampaignMixDiagram />
          </Reveal>
        </div>

        <div className="mt-8 md:mt-9">
          <Reveal>
            <p className="label-caps text-acid-lime">{introCopy.approachLabel}</p>
          </Reveal>

          <ul className="mt-4 grid gap-4 md:grid-cols-3 md:gap-5">
            {introCopy.points.map((point, index) => {
              const Icon = pointIcons[index] ?? Disc3;

              return (
                <Reveal key={point.title} delay={index * 0.05}>
                  <li className="h-full">
                    <article className="group flex h-full flex-col rounded-[18px] border border-border-dark bg-carbon p-5 transition-colors duration-200 hover:border-lime-border/70 hover:bg-elevated/35 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex size-11 items-center justify-center rounded-full border border-lime-border bg-deep-black text-acid-lime transition-colors duration-200 group-hover:border-acid-lime group-hover:bg-lime-soft">
                          <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <p className="font-mono text-sm tracking-[0.1em] text-acid-lime">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-off-white sm:text-xl">
                        {point.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-soft-grey">
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
