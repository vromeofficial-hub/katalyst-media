"use client";

import { AudioLines, Disc3, Radio } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { introCopy } from "@/content/services";
import { cn } from "@/lib/utils";
import "./intro-section.css";

const pointIcons = [Disc3, AudioLines, Radio] as const;

export function IntroSection() {
  return (
    <section
      id="introduction"
      className="intro-section relative scroll-mt-20 overflow-hidden border-b border-border-dark bg-deep-black section-pad lg:scroll-mt-0"
      aria-labelledby="intro-heading"
    >
      <div className="intro-section__texture pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <Reveal>
          <p className="label-caps text-acid-lime">{introCopy.eyebrow}</p>
          <h2
            id="intro-heading"
            className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold leading-[1.12] tracking-[-0.03em] text-off-white text-balance"
          >
            Music promotion needs more than{" "}
            <span className="text-acid-lime">one post.</span>
          </h2>
          <p className="mt-4 max-w-[32.5rem] text-sm leading-relaxed text-[#c4c4ca] md:text-[0.975rem]">
            {introCopy.description}
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-12">
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
                        <p className="font-sans text-sm tabular-nums tracking-[0.1em] text-acid-lime">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-off-white sm:text-xl">
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
