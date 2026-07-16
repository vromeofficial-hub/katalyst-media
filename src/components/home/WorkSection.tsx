import { CampaignCard } from "@/components/cards/CampaignCard";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getPublicPartners } from "@/content/clients";
import { getVisibleCampaigns } from "@/content/projects";
import { WorkInProgress } from "./WorkInProgress";

export function WorkSection() {
  const campaigns = getVisibleCampaigns();
  const partners = getPublicPartners();

  return (
    <section
      id="work"
      className="relative flex min-h-[75vh] scroll-mt-20 flex-col justify-center overflow-hidden bg-carbon section-pad lg:scroll-mt-0"
    >
      <Container className="relative z-10">
        <Reveal>
          <h2 className="relative z-10 font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            Selected campaigns
          </h2>
        </Reveal>

        {campaigns.length === 0 ? (
          <WorkInProgress />
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
