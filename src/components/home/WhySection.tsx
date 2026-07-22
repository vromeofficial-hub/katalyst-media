import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { whyCopy } from "@/content/services";

export function WhySection() {
  return (
    <section
      id="why"
      className="scroll-mt-20 border-y border-border-light bg-off-white section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <p className="label-caps text-lime-on-light">{whyCopy.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-carbon">
            {whyCopy.headline}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {whyCopy.points.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.04}>
              <article className="h-full">
                <p className="font-sans text-xs tabular-nums tracking-[0.08em] text-lime-on-light">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-carbon">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-grey md:text-base">
                  {point.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
