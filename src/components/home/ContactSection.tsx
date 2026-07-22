"use client";

import { useId, useState } from "react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { company, hasPublicEmail } from "@/content/company";
import {
  contactCopy,
  releaseTypes,
  serviceOptions,
  submitCampaignEnquiry,
  type CampaignEnquiry,
} from "@/content/contact";
import { cn } from "@/lib/utils";

const emptyForm: CampaignEnquiry = {
  artistName: "",
  email: "",
  releaseLink: "",
  releaseType: "",
  releaseDate: "",
  budget: "",
  services: [],
  additionalInfo: "",
};

const fieldClass =
  "mt-2 w-full rounded-[8px] border border-border-dark bg-graphite px-3.5 py-3 text-sm text-off-white outline-none transition-colors placeholder:text-muted-grey focus-visible:border-lime-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid-lime";

export function ContactSection() {
  const formId = useId();
  const [form, setForm] = useState<CampaignEnquiry>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  const toggleService = (service: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    // TODO: Connect form backend (email API / CRM / form service)
    const result = await submitCampaignEnquiry(form);

    if (!result.ok) {
      setStatus("error");
      setMessage(result.error);
      return;
    }

    setStatus("idle");
    setForm(emptyForm);
    setMessage("Enquiry received.");
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

            {hasPublicEmail() ? (
              <a
                href={`mailto:${company.email}`}
                className="mt-6 inline-block text-sm text-acid-lime underline-offset-4 hover:underline"
              >
                {company.email}
              </a>
            ) : null}

            {company.socialLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-4">
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
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <form
              onSubmit={onSubmit}
              className="rounded-[20px] border border-border-dark bg-carbon p-5 md:p-7"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-artist`}>
                    Artist or project name
                  </label>
                  <input
                    id={`${formId}-artist`}
                    name="artistName"
                    required
                    autoComplete="organization"
                    value={form.artistName}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        artistName: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-email`}>
                    Email address
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
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-link`}>
                    Song or release link
                  </label>
                  <input
                    id={`${formId}-link`}
                    name="releaseLink"
                    type="url"
                    inputMode="url"
                    placeholder="https://"
                    value={form.releaseLink}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        releaseLink: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-type`}>
                    Release type
                  </label>
                  <select
                    id={`${formId}-type`}
                    name="releaseType"
                    required
                    value={form.releaseType}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        releaseType: event.target.value,
                      }))
                    }
                    className={cn(fieldClass, "appearance-none")}
                  >
                    <option value="" disabled>
                      Select release type
                    </option>
                    {releaseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-date`}>
                    Release date
                  </label>
                  <input
                    id={`${formId}-date`}
                    name="releaseDate"
                    type="date"
                    value={form.releaseDate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        releaseDate: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-budget`}>
                    Estimated campaign budget
                  </label>
                  <input
                    id={`${formId}-budget`}
                    name="budget"
                    value={form.budget}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, budget: event.target.value }))
                    }
                    placeholder="e.g. £500–£2,000"
                    className={fieldClass}
                  />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="text-sm text-soft-grey">Services required</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {serviceOptions.map((service) => {
                      const checked = form.services.includes(service);
                      const optionId = `${formId}-${service}`;
                      return (
                        <label
                          key={service}
                          htmlFor={optionId}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-[8px] border px-3 py-3 text-sm transition-colors",
                            checked
                              ? "border-lime-border bg-lime-soft text-off-white"
                              : "border-border-dark bg-graphite text-soft-grey hover:border-border-dark hover:text-off-white",
                          )}
                        >
                          <input
                            id={optionId}
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleService(service)}
                            className="size-4 accent-[#c6ff00]"
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <label className="text-sm text-soft-grey" htmlFor={`${formId}-info`}>
                    Additional information
                  </label>
                  <textarea
                    id={`${formId}-info`}
                    name="additionalInfo"
                    rows={4}
                    value={form.additionalInfo}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        additionalInfo: event.target.value,
                      }))
                    }
                    className={cn(fieldClass, "resize-y")}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryButton type="submit" disabled={status === "submitting"} showArrow>
                  {status === "submitting"
                    ? "Submitting…"
                    : contactCopy.buttonLabel}
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
                  connected yet — enquiries are not emailed or stored until the form
                  service is wired up.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
