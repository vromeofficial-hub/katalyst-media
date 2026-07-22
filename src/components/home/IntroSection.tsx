"use client";

import { CalendarRange, Crosshair, Route } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { introCopy } from "@/content/services";
import { cn } from "@/lib/utils";

const pointIcons = [CalendarRange, Crosshair, Route] as const;

export function IntroSection() {
  return (
    <section
      id="introduction"
      className="scroll-mt-20 border-b border-border-dark bg-deep-black section-pad grain lg:scroll-mt-0"
      aria-labelledby="intro-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="label-caps text-acid-lime">{introCopy.eyebrow}</p>
            <h2
              id="intro-heading"
              className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white text-balance"
            >
              Music promotion needs more than{" "}
              <span className="text-acid-lime">one post.</span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <p className="text-base leading-relaxed text-soft-grey md:text-lg">
              {introCopy.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {introCopy.points.map((point, index) => {
            const Icon = pointIcons[index] ?? CalendarRange;

            return (
              <Reveal key={point.title} delay={index * 0.06}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-border-dark bg-carbon p-5 transition-colors duration-200",
                    "hover:border-lime-border/60 hover:bg-elevated/40",
                  )}
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-acid-lime/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-[10px] border border-lime-border/50 bg-lime-soft text-acid-lime">
                      <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <p className="font-mono text-[0.65rem] tracking-[0.12em] text-acid-lime">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <h3 className="relative mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-off-white md:text-xl">
                    {point.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted-grey">
                    {point.description}
                  </p>

                  <div
                    className="relative mt-auto pt-5"
                    aria-hidden="true"
                  >
                    <div className="h-px w-full bg-border-dark" />
                    <div
                      className="mt-0 h-0.5 w-10 rounded-full bg-acid-lime/70 transition-all duration-300 group-hover:w-16"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
