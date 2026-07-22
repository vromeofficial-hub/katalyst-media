import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  company,
  getSocialLinks,
  hasInstagram,
  hasPublicEmail,
} from "@/content/company";
import { contactCopy } from "@/content/services";

export function ContactSection() {
  const socialLinks = getSocialLinks().filter((link) => link.label !== "Instagram");
  const showEmail = hasPublicEmail();
  const showInstagram = hasInstagram();
  const hasDirectContact = showEmail || showInstagram || socialLinks.length > 0;

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border-dark bg-carbon section-pad pb-28 lg:scroll-mt-8"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <p className="label-caps text-acid-lime">{contactCopy.eyebrow}</p>
          <h2 className="mt-3 font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
            {contactCopy.headline}
          </h2>
          <p className="mt-4 text-soft-grey">{contactCopy.description}</p>

          {hasDirectContact ? (
            <>
              {(showEmail || showInstagram) && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {showEmail ? (
                    <PrimaryButton href={`mailto:${company.email}`}>
                      {contactCopy.emailButton}
                    </PrimaryButton>
                  ) : null}
                  {showInstagram ? (
                    <SecondaryButton href={company.instagramUrl} onDark>
                      {contactCopy.instagramButton}
                    </SecondaryButton>
                  ) : null}
                </div>
              )}

              {showEmail ? (
                <a
                  href={`mailto:${company.email}`}
                  className="mt-6 inline-block text-sm text-acid-lime underline-offset-4 hover:underline"
                >
                  {company.email}
                </a>
              ) : null}

              {socialLinks.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-4">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-soft-grey underline-offset-4 transition-colors hover:text-acid-lime hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <p className="mt-8 max-w-md rounded-[14px] border border-border-dark bg-deep-black px-5 py-4 text-sm leading-relaxed text-soft-grey">
              {contactCopy.emptyState}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
