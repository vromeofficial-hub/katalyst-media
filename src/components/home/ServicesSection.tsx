import {
  CalendarRange,
  ChartNoAxesCombined,
  Clapperboard,
  Megaphone,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { coreServices, servicesIntro, type ServiceItem } from "@/content/services";

const icons: Record<ServiceItem["icon"], typeof Users> = {
  users: Users,
  megaphone: Megaphone,
  clapperboard: Clapperboard,
  calendar: CalendarRange,
  chart: ChartNoAxesCombined,
};

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

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {coreServices.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="group flex h-full flex-col border-t border-border-light pt-5 transition-colors duration-200 hover:border-lime-on-light/40">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-sans text-xs tabular-nums tracking-[0.08em] text-lime-on-light">
                      {item.number}
                    </p>
                    <Icon
                      className="size-5 shrink-0 text-lime-on-light transition-transform duration-200 group-hover:scale-105"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] text-carbon">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-grey md:text-[0.9375rem]">
                    {item.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {item.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="rounded-[6px] border border-border-light bg-white px-2 py-1 text-[0.65rem] font-medium tracking-[0.02em] text-[#5c5c66]"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
