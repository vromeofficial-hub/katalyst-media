"use client";

import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { SectionNavLink } from "@/components/ui/SectionNavLink";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { company, getSocialLinks, hasPublicEmail } from "@/content/company";
import { primaryCta, primaryNav } from "@/content/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const activeId = useActiveSection();
  const isHome = pathname === "/";
  const socialLinks = getSocialLinks();
  const ctaHref = isHome ? `#${primaryCta.id}` : primaryCta.href;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col border-r border-border-dark bg-deep-black lg:flex">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-elevated/20 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-acid-lime/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex min-h-0 flex-1 flex-col px-5 py-6">
        <div className="shrink-0">
          <Wordmark className="text-[0.82rem]" />
          <p className="mt-4 text-[0.75rem] leading-snug text-muted-grey">
            <span className="label-caps mb-1.5 block text-muted-grey">
              {company.focusLabel}
            </span>
            {company.positioning}
          </p>
        </div>

        <nav
          className="mt-5 flex min-h-0 flex-1 flex-col gap-px overflow-y-auto pr-0.5"
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
                  "group relative flex items-center gap-3 rounded-[8px] py-2 pl-3 pr-2 text-sm tracking-[0.01em] transition-colors duration-200",
                  active
                    ? "text-off-white"
                    : "text-soft-grey hover:bg-elevated/40 hover:text-off-white",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full transition-colors duration-200",
                    active
                      ? "bg-acid-lime"
                      : "bg-transparent group-hover:bg-muted-grey/50",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "w-6 shrink-0 font-mono text-[0.65rem] tracking-[0.1em] transition-colors duration-200",
                    active
                      ? "text-acid-lime"
                      : "text-muted-grey/70 group-hover:text-muted-grey",
                  )}
                >
                  {item.number}
                </span>
                <span
                  className={cn(
                    "transition-colors duration-200",
                    active ? "font-medium text-off-white" : "font-normal",
                  )}
                >
                  {item.label}
                </span>
              </SectionNavLink>
            );
          })}
        </nav>

        <div className="mt-3 shrink-0 space-y-3 border-t border-border-dark pt-4">
          <PrimaryButton
            href={ctaHref}
            className="w-full min-h-10 px-4 py-2.5 text-sm"
            showArrow
          >
            {primaryCta.label}
          </PrimaryButton>

          {hasPublicEmail() ? (
            <a
              href={`mailto:${company.email}`}
              className="block break-all text-xs leading-relaxed text-muted-grey underline-offset-4 transition-colors hover:text-acid-lime hover:underline"
            >
              {company.email}
            </a>
          ) : null}

          {socialLinks.length > 0 ? (
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-grey underline-offset-4 transition-colors hover:text-acid-lime hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
