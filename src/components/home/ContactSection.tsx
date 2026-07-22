"use client";

import { useId, useState } from "react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { company, hasPublicEmail } from "@/content/company";
import {
  contactCopy,
  submitContactMessage,
  type ContactMessage,
} from "@/content/contact";
import { cn } from "@/lib/utils";

const emptyForm: ContactMessage = {
  name: "",
  email: "",
  message: "",
};

const fieldClass =
  "mt-2 w-full rounded-[8px] border border-border-dark bg-graphite px-3.5 py-3 text-sm text-off-white outline-none transition-colors placeholder:text-muted-grey focus-visible:border-lime-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid-lime";

export function ContactSection() {
  const formId = useId();
  const [form, setForm] = useState<ContactMessage>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    // TODO: Connect form backend (email API / Formspree / Resend)
    const result = await submitContactMessage(form);

    if (!result.ok) {
      setStatus("error");
      setMessage(result.error);
      return;
    }

    setStatus("idle");
    setForm(emptyForm);
    setMessage("Message sent.");
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border-dark bg-deep-black section-pad pb-28 lg:scroll-mt-8"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[-0.03em] text-off-white">
              {contactCopy.headline}
            </h2>
            <p className="mt-4 text-soft-grey">{contactCopy.description}</p>

            <div className="mt-6 space-y-3">
              {hasPublicEmail() ? (
                <a
                  href={`mailto:${company.email}`}
                  className="block text-sm text-acid-lime underline-offset-4 hover:underline"
                >
                  {company.email}
                </a>
              ) : null}

              {company.socialLinks.length > 0 ? (
                <ul className="flex flex-wrap gap-4">
                  {company.socialLinks.map((link) => (
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
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <form
              onSubmit={onSubmit}
              className="rounded-[20px] border border-border-dark bg-carbon p-5 md:p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-name`}>
                    Name
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-email`}>
                    Email
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-message`}>
                    Message
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    className={cn(fieldClass, "resize-y")}
                  />
                </div>
              </div>

              <div className="mt-6">
                <PrimaryButton type="submit" disabled={status === "submitting"} showArrow>
                  {status === "submitting" ? "Sending…" : contactCopy.buttonLabel}
                </PrimaryButton>
              </div>

              {message ? (
                <p
                  className={cn(
                    "mt-4 text-sm",
                    status === "error" ? "text-soft-grey" : "text-acid-lime",
                  )}
                  role="status"
                >
                  {message}
                </p>
              ) : (
                <p className="mt-4 text-xs leading-relaxed text-muted-grey">
                  Form submissions are prepared on this page. Backend delivery is not
                  connected yet — messages are not emailed or stored until the contact
                  form service is wired up.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
