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

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-0 right-0 top-3 hidden h-px bg-border-light lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
            {processSteps.map((step) => (
              <li key={step.number} className="relative">
                <span
                  className="mb-4 flex size-2 rounded-full bg-lime-on-light lg:mb-5"
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
        </div>
      </Container>
    </section>
  );
}
