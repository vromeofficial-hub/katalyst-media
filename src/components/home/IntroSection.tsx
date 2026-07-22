"use client";

import { AudioLines, Disc3, Radio } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { introCopy } from "@/content/services";
import { cn } from "@/lib/utils";

const pointIcons = [Disc3, AudioLines, Radio] as const;

export function IntroSection() {
  return (
    <section
      id="introduction"
      className="scroll-mt-20 border-b border-border-dark bg-deep-black section-pad grain lg:scroll-mt-0"
      aria-labelledby="intro-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="label-caps text-acid-lime">{introCopy.eyebrow}</p>
            <h2
              id="intro-heading"
              className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white text-balance"
            >
              Music promotion needs more than{" "}
              <span className="text-acid-lime">one post.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-grey md:text-[0.9375rem]">
              {introCopy.description}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.06}>
            <div className="rounded-[18px] border border-border-dark bg-carbon p-5">
              <div className="flex items-center justify-between gap-3 border-b border-border-dark pb-3">
                <p className="label-caps text-acid-lime">Campaign mix</p>
                <span className="font-mono text-[0.65rem] tracking-[0.1em] text-muted-grey">
                  One release
                </span>
              </div>

              <div className="mt-4 rounded-[12px] border border-lime-border bg-lime-soft px-4 py-3">
                <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-grey">
                  Centre
                </p>
                <p className="mt-1 font-display text-base font-semibold tracking-[-0.02em] text-off-white">
                  The release
                </p>
              </div>

              <ul className="mt-3 grid grid-cols-2 gap-2">
                {introCopy.mixLabels.map((label) => (
                  <li
                    key={label}
                    className="rounded-[10px] border border-border-dark bg-deep-black px-3 py-2.5 text-sm text-soft-grey"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Desktop: connected sequence */}
        <div className="relative mt-12 hidden md:block">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-[2.15rem] h-px bg-gradient-to-r from-transparent via-lime-border to-transparent"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-3 gap-5">
            {introCopy.points.map((point, index) => {
              const Icon = pointIcons[index] ?? Disc3;
              const isFirst = index === 0;

              return (
                <Reveal key={point.title} delay={index * 0.06}>
                  <li className="relative">
                    <article
                      className={cn(
                        "group flex h-full flex-col rounded-[18px] border p-6 transition-colors duration-200",
                        isFirst
                          ? "border-lime-border bg-lime-soft/40"
                          : "border-border-dark bg-carbon hover:border-lime-border/50 hover:bg-elevated/40",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "relative z-10 flex size-11 items-center justify-center rounded-full border",
                            isFirst
                              ? "border-acid-lime bg-acid-lime text-carbon"
                              : "border-lime-border bg-deep-black text-acid-lime",
                          )}
                        >
                          <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <p className="font-mono text-sm tracking-[0.1em] text-acid-lime">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-off-white">
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
          </ol>
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="relative mt-10 space-y-0 border-l border-lime-border/50 pl-6 md:hidden">
          {introCopy.points.map((point, index) => {
            const Icon = pointIcons[index] ?? Disc3;

            return (
              <li key={point.title} className="relative pb-8 last:pb-0">
                <span
                  className="absolute -left-[1.9rem] top-0 flex size-8 items-center justify-center rounded-full border border-lime-border bg-carbon text-acid-lime"
                  aria-hidden="true"
                >
                  <Icon className="size-3.5" strokeWidth={1.6} />
                </span>
                <p className="font-mono text-sm tracking-[0.1em] text-acid-lime">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-off-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soft-grey">
                  {point.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
