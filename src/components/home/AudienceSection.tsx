import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { audienceCopy } from "@/content/services";

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="scroll-mt-20 border-t border-border-dark bg-deep-black section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <p className="label-caps text-acid-lime">{audienceCopy.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            {audienceCopy.headline}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {audienceCopy.groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.04}>
              <article className="border-t border-border-dark pt-5">
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-off-white">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-grey md:text-base">
                  {group.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
