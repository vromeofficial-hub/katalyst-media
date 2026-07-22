"use client";

import { Container } from "@/components/layout/Container";
import { EqualizerWave } from "@/components/ui/EqualizerWave";
import { Reveal } from "@/components/ui/Reveal";
import { processIntro, processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-y border-border-light bg-off-white section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="label-caps text-lime-on-light">{processIntro.eyebrow}</p>
              <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-carbon">
                {processIntro.headline}
              </h2>
            </div>
            <EqualizerWave className="mb-1 shrink-0" />
          </div>
        </Reveal>

        {/* Mobile / tablet */}
        <ol className="mt-10 space-y-3 lg:hidden">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.04}>
              <li className="rounded-[16px] border border-border-light bg-white px-5 py-5">
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-lime-soft font-mono text-[0.7rem] tracking-[0.08em] text-lime-on-light">
                    {step.number}
                  </span>
                  <div className="min-w-0 text-left">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-carbon">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-grey">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Desktop: connected numbered cards */}
        <div className="relative mt-11 hidden lg:block">
          <div
            className="pointer-events-none absolute left-[calc(10%+1.125rem)] right-[calc(10%+1.125rem)] top-[2.375rem] h-px bg-border-light"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.05} className="h-full">
                <li className="relative flex h-full flex-col rounded-[16px] border border-border-light bg-white px-4 py-5 text-left xl:px-5">
                  <span className="relative z-10 mb-4 flex size-9 shrink-0 items-center justify-center rounded-full border border-lime-border bg-lime-soft font-mono text-[0.7rem] tracking-[0.08em] text-lime-on-light">
                    {step.number}
                  </span>
                  <h3 className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-carbon">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-grey">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
