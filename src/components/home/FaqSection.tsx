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

        <div className="mt-8 divide-y divide-border-dark border-y border-border-dark">
          {faqCopy.items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <Reveal key={item.question} delay={index * 0.03}>
                <div>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid-lime"
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      <span className="font-display text-base font-semibold tracking-[-0.02em] text-off-white md:text-lg">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-acid-lime transition-transform duration-200",
                          open && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="pb-5"
                  >
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-grey md:text-base">
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
