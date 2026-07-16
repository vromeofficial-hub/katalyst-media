import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { differentiators, whyStatement } from "@/content/services";

export function WhyKatalystSection() {
  return (
    <section id="why-katalyst" className="scroll-mt-20 bg-carbon section-pad lg:scroll-mt-0">
      <Container>
        <Reveal>
          <p className="label-caps text-acid-lime">Why Katalyst</p>
          <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            A more structured approach to music promotion.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="border-t border-border-dark pt-5">
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-off-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-grey md:text-base">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-2xl border-t border-border-dark pt-6">
          <p className="text-soft-grey">{whyStatement}</p>
        </Reveal>
      </Container>
    </section>
  );
}
