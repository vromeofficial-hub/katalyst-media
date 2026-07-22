import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutCopy } from "@/content/services";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-carbon section-pad lg:scroll-mt-0">
      <Container>
        <Reveal>
          <p className="label-caps text-acid-lime">{aboutCopy.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            {aboutCopy.headline}
          </h2>
        </Reveal>

        <div className="mt-8 max-w-2xl space-y-5">
          {aboutCopy.paragraphs.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 32)}>
              <p className="text-base leading-relaxed text-soft-grey md:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
