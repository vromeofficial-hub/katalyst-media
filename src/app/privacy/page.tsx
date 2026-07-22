import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/ui/PageHero";
import { company, hasPublicEmail } from "@/content/company";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy notice for Katalyst Media website visitors and campaign enquiries.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Katalyst Media handles information related to this website and campaign enquiries."
      />
      <section className="section-pad bg-carbon">
        <Container className="max-w-3xl space-y-8 text-soft-grey">
          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Who we are</h2>
            <p className="mt-3 leading-relaxed">
              {company.name} operates this website
              {hasPublicEmail() ? (
                <>
                  {" "}
                  and can be contacted at{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-off-white underline underline-offset-4"
                  >
                    {company.email}
                  </a>
                </>
              ) : null}
              . We help independent artists promote their music through music marketing,
              creator campaigns, short-form content, release strategy and paid advertising.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">
              Information we collect
            </h2>
            <p className="mt-3 leading-relaxed">
              This website may collect information through a campaign-enquiry form. The form
              may collect:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li>Name or artist name</li>
              <li>Email address</li>
              <li>Release links</li>
              <li>Release type</li>
              <li>Release dates</li>
              <li>Campaign budgets</li>
              <li>Service requirements</li>
              <li>Information you voluntarily provide in the enquiry</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Server logs may also record basic technical data required to operate the site
              securely. If you contact {company.name} directly by email, we process the
              information you choose to include in that correspondence.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">
              How we use information
            </h2>
            <p className="mt-3 leading-relaxed">
              Enquiry information is used to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li>Respond to enquiries</li>
              <li>Assess campaign requirements</li>
              <li>Prepare proposals or service recommendations</li>
              <li>Communicate about potential work</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              We do not sell personal information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Retention</h2>
            <p className="mt-3 leading-relaxed">
              Correspondence and enquiry details are retained only for as long as needed to
              manage the conversation and maintain reasonable business records, unless a longer
              period is required by law.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Your rights</h2>
            <p className="mt-3 leading-relaxed">
              Depending on applicable law, you may request access to, correction of, or
              deletion of personal information we hold about you. Contact {company.name}
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
              ) : (
                <> using the campaign enquiry form on this website</>
              )}{" "}
              to make a request.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-off-white">Updates</h2>
            <p className="mt-3 leading-relaxed">
              This notice may be updated as the website or operating practices change. The
              latest version will always be available on this page.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
