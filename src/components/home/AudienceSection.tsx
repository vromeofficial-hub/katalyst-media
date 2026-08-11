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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {audienceCopy.groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.04}>
              <article className="group h-full rounded-[14px] border border-border-dark bg-carbon/40 px-5 py-5 transition-colors duration-200 hover:border-lime-border/50 hover:bg-carbon/70">
                <div className="flex items-center gap-3">
                  <span
                    className="h-4 w-0.5 rounded-full bg-acid-lime/80 transition-shadow duration-200 group-hover:shadow-[0_0_10px_rgba(198,255,0,0.45)]"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-[0.65rem] tabular-nums tracking-[0.08em] text-acid-lime">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] text-off-white">
                  {group.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-soft-grey md:text-[0.975rem]">
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
