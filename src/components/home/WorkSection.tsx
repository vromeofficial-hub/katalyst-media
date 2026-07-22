import { CampaignCard } from "@/components/cards/CampaignCard";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getPublicPartners } from "@/content/clients";
import { getVisibleCampaigns } from "@/content/projects";
import { exampleCampaignFramework, workCopy } from "@/content/work";

export function WorkSection() {
  const campaigns = getVisibleCampaigns();
  const partners = getPublicPartners();

  return (
    <section
      id="work"
      className="scroll-mt-20 bg-carbon section-pad lg:scroll-mt-0"
    >
      <Container>
        <Reveal>
          <p className="label-caps text-acid-lime">{workCopy.eyebrow}</p>
          <h2 className="mt-3 font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            {workCopy.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-soft-grey">{workCopy.description}</p>
        </Reveal>

        {campaigns.length === 0 ? (
          <Reveal className="mt-10">
            <p className="text-sm text-muted-grey">{workCopy.comingSoon}</p>

            <div className="mt-8 rounded-[20px] border border-border-dark bg-deep-black p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border-dark pb-4">
                <div>
                  <p className="label-caps text-acid-lime">{workCopy.exampleTitle}</p>
                  <p className="mt-2 max-w-xl text-sm text-muted-grey">
                    {workCopy.exampleNote}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {exampleCampaignFramework.map((item) => (
                  <article
                    key={item.number}
                    className="rounded-[12px] border border-border-dark bg-graphite px-4 py-4"
                  >
                    <p className="font-mono text-[0.65rem] tracking-[0.08em] text-acid-lime">
                      {item.number}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-off-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-grey">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {campaigns.map((campaign, index) => (
              <Reveal key={campaign.slug} delay={index * 0.05}>
                <CampaignCard campaign={campaign} />
              </Reveal>
            ))}
          </div>
        )}

        {partners.length > 0 ? (
          <Reveal className="mt-12 border-t border-border-dark pt-8">
            <p className="label-caps text-acid-lime">Artists & partners</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {partners.map((partner) => (
                <li
                  key={partner.id}
                  className="font-display text-lg font-semibold text-off-white"
                >
                  {partner.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
