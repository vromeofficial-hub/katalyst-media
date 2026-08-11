"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { faqCopy } from "@/content/services";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border-dark bg-deep-black section-pad lg:scroll-mt-0"
    >
      <Container className="max-w-3xl">
        <Reveal>
          <p className="label-caps text-acid-lime">{faqCopy.eyebrow}</p>
          <h2 className="mt-3 font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            {faqCopy.headline}
          </h2>
        </Reveal>

        <div className="mt-8 border-y border-border-dark">
          {faqCopy.items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <Reveal key={item.question} delay={index * 0.02}>
                <div
                  className={cn(
                    "border-b border-border-dark last:border-b-0 transition-colors duration-200",
                    open && "bg-carbon/40",
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid-lime",
                        open ? "text-off-white" : "text-off-white/90 hover:text-off-white",
                      )}
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      <span
                        className={cn(
                          "font-display text-base font-semibold tracking-[-0.02em] md:text-lg",
                          open && "text-off-white",
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                          open
                            ? "border-lime-border bg-lime-soft text-acid-lime"
                            : "border-border-dark text-acid-lime/80",
                        )}
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200 ease-out",
                            open && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="pb-5 pl-0 pr-10"
                  >
                    <p className="max-w-2xl border-l-2 border-acid-lime/40 pl-4 text-sm leading-relaxed text-soft-grey md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
