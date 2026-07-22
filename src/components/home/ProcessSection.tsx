import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { processIntro, processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-y border-border-light bg-off-white section-pad lg:scroll-mt-0"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
            <Reveal>
              <p className="label-caps text-lime-on-light">{processIntro.eyebrow}</p>
              <h2 className="mt-3 max-w-sm font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-carbon">
                {processIntro.headline}
              </h2>
            </Reveal>
          </div>

          <div className="relative lg:col-span-8">
            <div
              className="pointer-events-none absolute bottom-4 left-[1.05rem] top-3 w-px bg-border-light"
              aria-hidden="true"
            />

            <ol className="relative">
              {processSteps.map((step, index) => {
                const isLast = index === processSteps.length - 1;

                return (
                  <li key={step.number} className="relative">
                    <Reveal delay={index * 0.05}>
                      <div className="flex gap-5 sm:gap-6">
                        <span className="relative z-10 mt-0.5 flex size-[2.1rem] shrink-0 items-center justify-center rounded-full border border-border-light bg-off-white font-sans text-[0.68rem] tabular-nums tracking-[0.08em] text-lime-on-light shadow-[0_0_0_6px_var(--color-off-white)]">
                          {step.number}
                        </span>
                        <div
                          className={
                            isLast
                              ? "min-w-0 pb-0 sm:pt-0.5"
                              : "mb-8 min-w-0 border-b border-border-light pb-8 sm:pt-0.5"
                          }
                        >
                          <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-carbon sm:text-xl">
                            {step.title}
                          </h3>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-grey sm:text-[0.95rem]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
