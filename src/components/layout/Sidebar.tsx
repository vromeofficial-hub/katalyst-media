"use client";

import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { SectionNavLink } from "@/components/ui/SectionNavLink";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { company, getSocialLinks, hasPublicEmail } from "@/content/company";
import { primaryCta, primaryNav } from "@/content/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import "./sidebar.css";

export function Sidebar() {
  const pathname = usePathname();
  const activeId = useActiveSection();
  const isHome = pathname === "/";
  const socialLinks = getSocialLinks();
  const ctaHref = isHome ? `#${primaryCta.id}` : primaryCta.href;
  const showContactDetails = hasPublicEmail() || socialLinks.length > 0;

  return (
    <aside className="sidebar fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col border-r border-border-dark lg:flex">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-acid-lime/18 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-5 pt-6">
        <div className="relative shrink-0 pb-5">
          <div
            className="sidebar__glow pointer-events-none absolute -left-3 -top-2 h-16 w-28 opacity-80"
            aria-hidden="true"
          />
          <Wordmark className="relative text-[0.82rem]" />
          <p className="relative mt-4 text-[0.7rem] font-medium leading-snug tracking-[0.04em] text-soft-grey">
            {company.heroEyebrow}
          </p>
          <p className="relative mt-2.5 max-w-[14.5rem] text-[0.75rem] leading-[1.55] text-muted-grey">
            {company.sidebarDescription}
          </p>
          <div
            className="sidebar__brand-divider mt-5 h-px w-full"
            aria-hidden="true"
          />
        </div>

        <nav
          className="flex min-h-0 flex-1 flex-col justify-start gap-0.5 overflow-y-auto py-1 pr-0.5"
          aria-label="Primary"
        >
          {primaryNav.map((item) => {
            const active = isHome && activeId === item.id;

            return (
              <SectionNavLink
                key={item.id}
                item={item}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "sidebar__nav-link group relative flex items-baseline gap-3 rounded-[8px] py-[0.55rem] pl-3.5 pr-2.5 text-[0.8125rem] tracking-[0.015em] transition-[color,background-color,box-shadow] duration-200",
                  active
                    ? "text-off-white"
                    : "text-muted-grey hover:bg-elevated/35 hover:text-soft-grey",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full transition-[background-color,box-shadow,opacity] duration-200",
                    active
                      ? "sidebar__nav-accent bg-acid-lime"
                      : "bg-transparent opacity-0 group-hover:bg-muted-grey/60 group-hover:opacity-100",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "w-6 shrink-0 font-mono text-[0.62rem] leading-none tracking-[0.12em] transition-colors duration-200",
                    active
                      ? "font-medium text-acid-lime"
                      : "text-muted-grey/55 group-hover:text-muted-grey/85",
                  )}
                >
                  {item.number}
                </span>
                <span
                  className={cn(
                    "leading-none transition-[color,font-weight] duration-200",
                    active ? "font-medium text-off-white" : "font-normal",
                  )}
                >
                  {item.label}
                </span>
              </SectionNavLink>
            );
          })}
        </nav>

        <div className="mt-auto shrink-0 pt-3">
          <div
            className="sidebar__cta-divider mb-4 h-px w-full"
            aria-hidden="true"
          />
          <div className="sidebar__cta-zone rounded-[10px] border border-border-dark px-3.5 py-3.5">
            <p className="label-caps text-[0.65rem] text-muted-grey">
              Let&apos;s talk
            </p>
            <PrimaryButton
              href={ctaHref}
              className="mt-3 w-full min-h-10 px-4 py-2.5 text-sm"
              showArrow
            >
              {primaryCta.label}
            </PrimaryButton>

            {showContactDetails ? (
              <div className="mt-3.5 space-y-2">
                {hasPublicEmail() ? (
                  <a
                    href={`mailto:${company.email}`}
                    className="block break-all text-[0.7rem] leading-relaxed text-muted-grey underline-offset-4 transition-colors hover:text-acid-lime hover:underline focus-visible:outline-offset-2"
                  >
                    {company.email}
                  </a>
                ) : null}

                {socialLinks.length > 0 ? (
                  <ul className="flex flex-wrap gap-x-3 gap-y-1">
                    {socialLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.7rem] text-muted-grey underline-offset-4 transition-colors hover:text-acid-lime hover:underline focus-visible:outline-offset-2"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <p className="mt-3 text-[0.7rem] leading-relaxed text-muted-grey/80">
                Available for enquiries
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
