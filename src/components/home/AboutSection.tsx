import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutCopy } from "@/content/services";

export function AboutSection() {
  const [lead, ...rest] = aboutCopy.paragraphs;
  const statement = lead.includes(":")
    ? lead.split(":").slice(1).join(":").trim()
    : lead;

  return (
    <section id="about" className="scroll-mt-20 bg-carbon section-pad lg:scroll-mt-0">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="label-caps text-acid-lime">{aboutCopy.eyebrow}</p>
            <h2 className="mt-3 max-w-sm font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
              {aboutCopy.headline}
            </h2>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="max-w-2xl font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-off-white text-balance">
                {statement.charAt(0).toUpperCase() + statement.slice(1)}
              </p>
            </Reveal>

            <div className="mt-8 space-y-5 border-t border-border-dark pt-8">
              {rest.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 40)}>
                  <p className="max-w-2xl text-base leading-relaxed text-soft-grey md:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
