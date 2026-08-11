import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { workCopy } from "@/content/services";

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
          <div className="rounded-[18px] border border-border-dark bg-carbon p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-dark pb-4">
              <p className="label-caps text-acid-lime">{workCopy.emptyLabel}</p>
              <span className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-grey">
                Case study frame
              </span>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-soft-grey">
              {workCopy.emptyNote}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {workCopy.cardFields.map((field) => (
                <li
                  key={field}
                  className="rounded-[12px] border border-dashed border-border-dark bg-deep-black/60 px-4 py-3 text-sm text-[#9a9aa3]"
                >
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
