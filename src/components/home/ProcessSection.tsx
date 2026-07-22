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
        <Reveal>
          <p className="label-caps text-lime-on-light">{processIntro.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-carbon">
            {processIntro.headline}
          </h2>
        </Reveal>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="relative mt-10 space-y-0 border-l border-border-light pl-6 lg:hidden">
          {processSteps.map((step) => (
            <li key={step.number} className="relative pb-8 last:pb-0">
              <span
                className="absolute -left-[1.66rem] top-1 size-2.5 rounded-full bg-lime-on-light"
                aria-hidden="true"
              />
              <p className="font-mono text-xs tracking-[0.08em] text-lime-on-light">
                {step.number}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-carbon">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-grey">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Desktop: balanced five-column process */}
        <div className="relative mt-12 hidden lg:block">
          <div
            className="pointer-events-none absolute left-0 right-0 top-3 h-px bg-border-light"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-5 gap-5">
            {processSteps.map((step) => (
              <li key={step.number} className="relative">
                <span
                  className="mb-5 flex size-2 rounded-full bg-lime-on-light"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs tracking-[0.08em] text-lime-on-light">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold tracking-[-0.02em] text-carbon xl:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-grey">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
