import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { paidMediaCopy } from "@/content/services";

export function PaidMediaSection() {
  return (
    <section
      id="paid-media"
      className="scroll-mt-20 border-b border-border-dark bg-carbon section-pad lg:scroll-mt-0"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="label-caps text-acid-lime">{paidMediaCopy.eyebrow}</p>
            <h2 className="mt-3 font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
              {paidMediaCopy.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-soft-grey">
              {paidMediaCopy.description}
            </p>
            <p className="mt-5 border-l border-lime-border pl-4 text-sm leading-relaxed text-muted-grey">
              {paidMediaCopy.note}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <ol className="space-y-0 rounded-[20px] border border-border-dark bg-deep-black p-2 sm:p-3">
              {paidMediaCopy.stages.map((stage, index) => (
                <li
                  key={stage.number}
                  className="relative flex items-center gap-4 rounded-[12px] px-4 py-4 sm:gap-5 sm:px-5"
                >
                  {index < paidMediaCopy.stages.length - 1 ? (
                    <span
                      className="absolute bottom-0 left-[1.85rem] top-1/2 w-px bg-border-dark sm:left-[2.1rem]"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-lime-border bg-lime-soft font-mono text-[0.65rem] tracking-[0.06em] text-acid-lime sm:size-9">
                    {stage.number}
                  </span>
                  <div className="relative z-10 min-w-0 flex-1 border-b border-border-dark pb-4 last:border-0 last:pb-0">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-off-white">
                      {stage.title}
                    </h3>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
