import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { introCopy } from "@/content/services";

export function IntroSection() {
  return (
    <section
      id="introduction"
      className="scroll-mt-20 border-b border-border-dark bg-deep-black section-pad lg:scroll-mt-0"
      aria-labelledby="intro-heading"
    >
      <Container>
        <Reveal>
          <p className="label-caps text-acid-lime">{introCopy.eyebrow}</p>
          <h2
            id="intro-heading"
            className="mt-3 max-w-3xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white"
          >
            {introCopy.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-soft-grey md:text-lg">
            {introCopy.description}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 border-t border-border-dark pt-8 md:grid-cols-3">
          {introCopy.points.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.05}>
              <div className="relative pl-4">
                <span
                  className="absolute left-0 top-1 h-full w-px bg-lime-border"
                  aria-hidden="true"
                />
                <p className="font-mono text-[0.65rem] tracking-[0.1em] text-acid-lime">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-off-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-grey">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
