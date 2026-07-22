"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { EqualizerWave } from "@/components/ui/EqualizerWave";
import { Reveal } from "@/components/ui/Reveal";
import { paidMediaCopy } from "@/content/services";
import { cn } from "@/lib/utils";
import "./paid-media.css";

export function PaidMediaSection() {
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion === false;

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
                <div
                  className="pointer-events-none absolute inset-0 grid-overlay opacity-30"
                  aria-hidden="true"
                />

                <div className="relative mb-6 flex items-end justify-between gap-4 border-b border-border-dark pb-4">
                  <div>
                    <p className="label-caps text-acid-lime">Campaign stages</p>
                    <p className="mt-1 text-sm text-soft-grey">
                      From objective to reporting
                    </p>
                  </div>
                  <EqualizerWave />
                </div>

                <ol className="relative space-y-2">
                  {paidMediaCopy.stages.map((stage, index) => {
                    const isLast = index === paidMediaCopy.stages.length - 1;

                    return (
                      <motion.li
                        key={stage.number}
                        initial={animate ? { opacity: 0, x: 12 } : false}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.4,
                          delay: animate ? index * 0.05 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={cn(
                          "group relative grid grid-cols-[auto_1fr] items-center gap-4 rounded-[12px] border px-3.5 py-3.5 transition-colors duration-200 sm:gap-5 sm:px-4 sm:py-4",
                          isLast
                            ? "border-lime-border bg-lime-soft"
                            : "border-border-dark bg-graphite/70 hover:border-lime-border/50 hover:bg-elevated/60",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-[10px] font-sans text-xs tabular-nums tracking-[0.08em]",
                            isLast
                              ? "bg-acid-lime text-carbon"
                              : "border border-lime-border/60 bg-deep-black text-acid-lime",
                          )}
                        >
                          {stage.number}
                        </span>

                        <div className="flex min-w-0 items-center justify-between gap-3">
                          <h3 className="font-display text-base font-semibold tracking-[-0.02em] text-off-white sm:text-lg">
                            {stage.title}
                          </h3>
                          <span
                            className={cn(
                              "hidden h-1.5 w-1.5 shrink-0 rounded-full sm:block",
                              isLast ? "bg-acid-lime" : "bg-soft-grey/40",
                            )}
                            aria-hidden="true"
                          />
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
