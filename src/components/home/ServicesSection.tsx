import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { coreServices, servicesIntro } from "@/content/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-b border-border-light bg-off-white section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <p className="label-caps text-lime-on-light">{servicesIntro.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-carbon">
            {servicesIntro.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-grey">{servicesIntro.description}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {coreServices.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="border-t border-border-light pt-5">
                <p className="font-mono text-xs tracking-[0.08em] text-lime-on-light">
                  {item.number}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-carbon">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-grey md:text-base">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
