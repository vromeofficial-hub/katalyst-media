import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { whatWeDo } from "@/content/services";

export function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="scroll-mt-20 border-b border-border-light bg-off-white section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <h2 className="max-w-2xl font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-carbon">
            One campaign. Multiple relevant communities.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-grey">
            Campaigns are built around the release, then organised across creator pages
            and content formats that fit the track.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {whatWeDo.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="border-t border-border-light pt-5">
                <p className="font-mono text-xs tracking-[0.08em] text-lime-on-light">
                  {String(index + 1).padStart(2, "0")}
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
