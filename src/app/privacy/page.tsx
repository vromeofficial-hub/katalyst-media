import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/ui/PageHero";
import { company } from "@/content/company";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy",
  description: "Privacy notice for Katalyst Media website visitors.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        description="How Katalyst Media handles information related to this website."
      />
      <section className="section-pad bg-carbon">
        <Container className="max-w-3xl space-y-8 text-soft-grey">
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Who we are</h2>
            <p className="mt-3 leading-relaxed">
              {company.name} operates this website and can be contacted at{" "}
              <a
                href={`mailto:${company.email}`}
                className="text-off-white underline underline-offset-4"
              >
                {company.email}
              </a>
              . We help artists promote music through coordinated creator campaigns.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">
              Information we collect
            </h2>
            <p className="mt-3 leading-relaxed">
              This website does not include a public contact form. If you email{" "}
              {company.name}, we process the information you choose to include in that
              correspondence. Server logs may also record basic technical data required to
              operate the site securely.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">
              How we use information
            </h2>
            <p className="mt-3 leading-relaxed">
              Email enquiries are used only to respond to your request and manage related
              communication. We do not sell personal information.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Retention</h2>
            <p className="mt-3 leading-relaxed">
              Correspondence is retained only for as long as needed to manage the conversation
              and maintain reasonable business records, unless a longer period is required by law.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Your rights</h2>
            <p className="mt-3 leading-relaxed">
              Depending on applicable law, you may request access to, correction of, or deletion of
              personal information we hold about you. Contact us using the email above to make a request.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Updates</h2>
            <p className="mt-3 leading-relaxed">
              This notice may be updated as the website or operating practices change. The latest
              version will always be available on this page.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
