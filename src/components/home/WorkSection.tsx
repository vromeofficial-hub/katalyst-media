import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { workCopy } from "@/content/services";
import "./work-section.css";

export function WorkSection() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-border-dark bg-deep-black section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <p className="label-caps text-acid-lime">{workCopy.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            {workCopy.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-soft-grey">{workCopy.description}</p>
        </Reveal>

        <Reveal className="mt-10" delay={0.05}>
          <div className="work-archive">
            <div className="work-archive__glow" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 grid-overlay opacity-30"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-dark pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="work-archive__status" aria-hidden="true" />
                  <p className="label-caps text-acid-lime">{workCopy.archiveLabel}</p>
                </div>
                <span className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-grey">
                  Documented campaigns only
                </span>
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
                <div>
                  <p className="max-w-lg text-sm leading-relaxed text-soft-grey md:text-[0.975rem]">
                    {workCopy.emptyNote}
                  </p>

                  <p className="mt-6 text-[0.65rem] uppercase tracking-[0.12em] text-muted-grey">
                    Future case studies will cover
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {workCopy.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-[8px] border border-border-dark bg-carbon/80 px-3 py-1.5 text-xs font-medium text-soft-grey"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="work-archive__timeline" aria-hidden="true">
                  <div className="work-archive__timeline-track">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="work-archive__timeline-rows">
                    <div className="work-archive__bar" style={{ width: "72%" }} />
                    <div className="work-archive__bar work-archive__bar--mid" style={{ width: "48%" }} />
                    <div className="work-archive__bar work-archive__bar--soft" style={{ width: "61%" }} />
                  </div>
                  <p className="work-archive__timeline-caption">Campaign timeline · abstract</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
