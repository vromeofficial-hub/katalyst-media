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

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col border-r border-border-dark bg-deep-black lg:flex">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-acid-lime/25 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex min-h-0 flex-1 flex-col px-5 py-7">
        <div className="shrink-0">
          <Wordmark className="text-[0.82rem]" />
          <div className="mt-5 rounded-[12px] border border-border-dark bg-carbon/80 px-3.5 py-3.5">
            <p className="label-caps text-acid-lime/80">{company.focusLabel}</p>
            <p className="mt-2 text-[0.8125rem] leading-snug text-soft-grey">
              {company.positioning}
            </p>
          </div>
        </div>

        <nav
          className="mt-6 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pr-1"
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
                  "group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm tracking-[0.01em] transition-colors duration-200",
                  active
                    ? "bg-lime-soft text-off-white"
                    : "text-soft-grey hover:bg-elevated/50 hover:text-off-white",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full transition-colors duration-200",
                    active ? "bg-acid-lime" : "bg-transparent group-hover:bg-border-dark",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "w-6 shrink-0 font-mono text-[0.7rem] tracking-[0.1em]",
                    active ? "text-acid-lime" : "text-muted-grey group-hover:text-soft-grey",
                  )}
                >
                  {item.number}
                </span>
                <span className={cn("font-medium", active && "text-off-white")}>
                  {item.label}
                </span>
              </SectionNavLink>
            );
          })}
        </nav>

        <div className="mt-5 shrink-0 space-y-4 border-t border-border-dark pt-5">
          <PrimaryButton href={primaryCta.href} className="w-full" showArrow>
            {primaryCta.label}
          </PrimaryButton>

          {hasPublicEmail() ? (
            <div>
              <p className="label-caps text-muted-grey">Email</p>
              <a
                href={`mailto:${company.email}`}
                className="mt-1.5 block break-all text-xs leading-relaxed text-soft-grey underline-offset-4 transition-colors hover:text-acid-lime hover:underline"
              >
                {company.email}
              </a>
            </div>
          ) : null}

          {socialLinks.length > 0 ? (
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
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
