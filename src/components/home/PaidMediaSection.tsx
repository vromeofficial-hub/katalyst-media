"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { paidMediaCopy } from "@/content/services";
import "./paid-media.css";

export function PaidMediaSection() {
  return (
    <section
      id="paid-media"
      className="paid-media-section relative scroll-mt-20 overflow-hidden border-b border-border-dark bg-carbon section-pad grain lg:scroll-mt-0"
    >
      <div className="paid-media-section__backdrop" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-12 xl:gap-16">
          <Reveal className="paid-media-copy">
            <p className="label-caps tracking-[0.14em] text-acid-lime">
              {paidMediaCopy.eyebrow}
            </p>

            <h2 className="paid-media-copy__headline mt-6 font-display font-semibold tracking-[-0.035em] text-off-white">
              We do more than
              <br className="hidden sm:inline" />{" "}
              make the ad. We
              <br />
              <span className="text-acid-lime">run the campaign.</span>
            </h2>

            <p className="paid-media-copy__body mt-7 max-w-[34rem] text-[0.95rem] leading-[1.7] text-soft-grey sm:text-base">
              {paidMediaCopy.description}
            </p>

            <div className="paid-media-note mt-8 sm:mt-9">
              <span className="paid-media-note__dot" aria-hidden="true" />
              <p className="paid-media-note__text">{paidMediaCopy.note}</p>
            </div>
          </Reveal>

          <Reveal className="min-w-0" delay={0.06}>
            <div className="paid-media-panel">
              <div className="paid-media-panel__glow" aria-hidden="true">
                <div className="paid-media-panel__neon" />
              </div>

              <div className="paid-media-panel__inner">
                <div className="relative mb-5 border-b border-border-dark pb-4">
                  <p className="label-caps text-acid-lime">Campaign stages</p>
                  <p className="mt-1 text-sm text-soft-grey">
                    From objective to reporting
                  </p>
                </div>

                <ol className="relative space-y-2">
                  {paidMediaCopy.stages.map((stage) => (
                    <li
                      key={stage.number}
                      className="relative grid grid-cols-[auto_1fr] items-start gap-3.5 rounded-[12px] border border-border-dark bg-graphite/50 px-3.5 py-3.5 transition-colors duration-200 hover:border-white/15 sm:gap-4 sm:px-4 sm:py-4"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] border border-white/10 bg-deep-black font-sans text-xs tabular-nums tracking-[0.08em] text-acid-lime sm:size-10 sm:rounded-[10px]">
                        {stage.number}
                      </span>

                      <div className="min-w-0 pt-0.5">
                        <h3 className="font-display text-base font-semibold tracking-[-0.02em] text-off-white sm:text-lg">
                          {stage.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-soft-grey">
                          {stage.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
