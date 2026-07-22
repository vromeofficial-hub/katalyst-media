import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { capabilitiesCopy } from "@/content/services";

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-20 bg-carbon section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <p className="label-caps text-acid-lime">{capabilitiesCopy.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            {capabilitiesCopy.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-soft-grey">{capabilitiesCopy.description}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilitiesCopy.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="h-full rounded-[16px] border border-border-dark bg-deep-black p-5">
                <p className="font-mono text-[0.65rem] tracking-[0.08em] text-acid-lime">
                  {item.number}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-[-0.02em] text-off-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-grey">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
