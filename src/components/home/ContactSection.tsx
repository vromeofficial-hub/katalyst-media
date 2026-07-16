import { Container } from "@/components/layout/Container";
import { EmailAddressLink, EmailKatalystButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { hasPublicEmail } from "@/content/company";
import { contactCopy } from "@/content/contact";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-[85vh] scroll-mt-24 flex-col justify-center border-t border-border-dark bg-deep-black section-pad pb-28 lg:scroll-mt-8"
    >
      <Container>
        <Reveal>
          <div className="max-w-xl">
            <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
              {contactCopy.headline}
            </h2>
            <p className="mt-4 text-soft-grey">{contactCopy.description}</p>
            <div className="mt-7 flex flex-col gap-3">
              {hasPublicEmail() ? (
                <>
                  <EmailKatalystButton label={contactCopy.buttonLabel} />
                  <EmailAddressLink />
                </>
              ) : (
                <p className="label-caps text-acid-lime">{contactCopy.pendingLabel}</p>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
