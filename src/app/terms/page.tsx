import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/ui/PageHero";
import { company, hasPublicEmail } from "@/content/company";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms",
  description: "Website terms of use for Katalyst Media.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        description="Terms governing use of the Katalyst Media website."
      />
      <section className="section-pad bg-carbon">
        <Container className="max-w-3xl space-y-8 text-soft-grey">
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Website purpose</h2>
            <p className="mt-3 leading-relaxed">
              This website provides information about {company.name} and a way to enquire about
              music-promotion campaigns. Content is for general information and does not constitute
              a binding offer.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">
              No performance guarantees
            </h2>
            <p className="mt-3 leading-relaxed">
              Nothing on this website should be interpreted as a guarantee of virality, streams,
              chart positions or other specific commercial results. Campaign outcomes depend on the
              release, audience, content, timing and platform conditions.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">
              Intellectual property
            </h2>
            <p className="mt-3 leading-relaxed">
              Branding, copy, design and other materials on this site remain the property of{" "}
              {company.name} unless otherwise stated. You may not copy or reuse site materials for
              commercial purposes without permission.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Third-party links</h2>
            <p className="mt-3 leading-relaxed">
              Links to third-party sites are provided for convenience. We are not responsible for
              the content or practices of those services.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Contact</h2>
            <p className="mt-3 leading-relaxed">
              Questions about these terms can be sent to {company.name}
              {hasPublicEmail() ? (
                <>
                  {" "}
                  at{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-off-white underline underline-offset-4"
                  >
                    {company.email}
                  </a>
                </>
              ) : null}
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
