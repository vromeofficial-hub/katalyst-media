"use client";

import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { SectionNavLink } from "@/components/ui/SectionNavLink";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { company, hasPublicEmail } from "@/content/company";
import { primaryCta, primaryNav } from "@/content/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const activeId = useActiveSection();
  const isHome = pathname === "/";

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-border-dark bg-carbon lg:flex">
      <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
        <Wordmark className="text-[0.85rem]" />

        <div className="mt-8 border-t border-border-dark pt-6">
          <p className="label-caps text-muted-grey">{company.focusLabel}</p>
          <p className="mt-2 text-sm leading-snug text-soft-grey">{company.positioning}</p>
        </div>

        <nav className="mt-8 flex flex-col gap-0.5" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = isHome && activeId === item.id;

            return (
              <SectionNavLink
                key={item.id}
                item={item}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 py-2 pl-3 pr-2 text-sm tracking-[0.02em] transition-colors duration-200",
                  active ? "text-off-white" : "text-soft-grey hover:text-off-white",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-5 w-px -translate-y-1/2 transition-colors duration-200",
                    active ? "bg-acid-lime" : "bg-transparent group-hover:bg-border-dark",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "w-6 shrink-0 font-mono text-xs tracking-[0.08em]",
                    active ? "text-acid-lime" : "text-muted-grey",
                  )}
                >
                  {item.number}
                </span>
                <span>{item.label}</span>
              </SectionNavLink>
            );
          })}
        </nav>

        <div className="mt-8">
          <PrimaryButton href={primaryCta.href} className="w-full" showArrow>
            {primaryCta.label}
          </PrimaryButton>
        </div>

        {hasPublicEmail() ? (
          <div className="mt-auto border-t border-border-dark pt-6">
            <p className="label-caps text-muted-grey">Contact</p>
            <a
              href={`mailto:${company.email}`}
              className="mt-2 block break-all text-sm text-off-white underline-offset-4 transition-colors hover:text-acid-lime hover:underline"
            >
              {company.email}
            </a>
          </div>
        ) : (
          <div className="mt-auto" />
        )}
      </div>
    </aside>
  );
}
