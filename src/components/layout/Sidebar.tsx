"use client";

import {
  ArrowDownRight,
  CircleHelp,
  Crosshair,
  Home,
  Layers,
  Mail,
  Megaphone,
  User,
  Waypoints,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { SectionNavLink } from "@/components/ui/SectionNavLink";
import {
  company,
  getSocialLinks,
  hasInstagram,
  hasPublicEmail,
} from "@/content/company";
import { primaryCta, primaryNav } from "@/content/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { queueSectionScroll, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import "./sidebar.css";

const navIcons: Record<(typeof primaryNav)[number]["id"], LucideIcon> = {
  overview: Home,
  services: Layers,
  "paid-media": Megaphone,
  process: Waypoints,
  capabilities: Crosshair,
  about: User,
  faq: CircleHelp,
  contact: Mail,
};

function WaveformMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 12"
      fill="none"
      aria-hidden="true"
      className={cn("text-acid-lime", className)}
    >
      <path
        d="M1 6h2.5M6 3.5v5M10.5 1.5v9M15 4v4M19.5 2v8M24 4.5v3M28.5 3v6M33 5.5v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeId = useActiveSection();
  const isHome = pathname === "/";
  const socialLinks = getSocialLinks();
  const instagram = socialLinks.find((link) => link.label === "Instagram");
  const otherSocials = socialLinks.filter((link) => link.label !== "Instagram");

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isHome) {
      scrollToSection(primaryCta.id);
      return;
    }
    queueSectionScroll(primaryCta.id);
    router.push("/");
  };

  return (
    <aside
      className="sidebar fixed inset-y-0 left-0 z-40 hidden w-[288px] flex-col lg:flex"
      aria-label="Site sidebar"
    >
      <div className="sidebar__edge" aria-hidden="true" />

      <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-5 pt-6">
        {/* Brand */}
        <div className="relative shrink-0">
          <div className="sidebar__glow" aria-hidden="true" />
          <Wordmark className="relative text-[0.8rem]" />
          <WaveformMark className="relative mt-3 h-3 w-9" />
          <p className="relative mt-4 label-caps text-[0.65rem] text-acid-lime">
            Music marketing for artists
          </p>
          <p className="relative mt-2.5 max-w-[15rem] text-[0.75rem] leading-[1.55] text-[#9a9aa3]">
            {company.sidebarDescription}
          </p>
          <div className="sidebar__divider mt-5" aria-hidden="true" />
        </div>

        {/* Navigation */}
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
          <p className="label-caps shrink-0 text-[0.62rem] tracking-[0.14em] text-[#6f6f78]">
            Navigation
          </p>

          <nav
            className="mt-3 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain pr-0.5"
            aria-label="Primary"
          >
            {primaryNav.map((item) => {
              const active = isHome && activeId === item.id;
              const Icon = navIcons[item.id];

              return (
                <SectionNavLink
                  key={item.id}
                  item={item}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "sidebar__nav-link group relative flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[0.8125rem] transition-[color,background-color,border-color,box-shadow] duration-200",
                    active
                      ? "sidebar__nav-link--active text-off-white"
                      : "border border-transparent text-[#c8c8d0] hover:border-white/5 hover:bg-white/[0.03] hover:text-off-white",
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full transition-colors duration-200",
                      active
                        ? "sidebar__nav-accent bg-acid-lime"
                        : "bg-transparent group-hover:bg-[#55555e]",
                    )}
                    aria-hidden="true"
                  />
                  <Icon
                    className={cn(
                      "size-3.5 shrink-0 transition-colors duration-200",
                      active
                        ? "text-acid-lime"
                        : "text-[#6a6a74] group-hover:text-[#9a9aa3]",
                    )}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "w-5 shrink-0 font-mono text-[0.625rem] tracking-[0.1em] transition-colors duration-200",
                      active
                        ? "text-acid-lime"
                        : "text-[#5c5c66] group-hover:text-[#8a8a94]",
                    )}
                  >
                    {item.number}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 truncate transition-colors duration-200",
                      active ? "font-medium text-off-white" : "font-normal",
                    )}
                  >
                    {item.label}
                  </span>
                </SectionNavLink>
              );
            })}
          </nav>
        </div>

        {/* Contact panel */}
        <div className="mt-4 shrink-0">
          <div className="sidebar__contact relative overflow-hidden rounded-[14px] border border-white/[0.08] p-3.5">
            <div className="sidebar__contact-glow" aria-hidden="true" />

            <div className="relative flex items-center justify-between gap-3">
              <p className="label-caps text-[0.65rem] text-acid-lime">
                Let&apos;s talk
              </p>
              <WaveformMark className="h-2.5 w-7 opacity-80" />
            </div>

            <p className="relative mt-2.5 text-[0.8rem] leading-snug text-off-white/90">
              Ready to discuss your music or upcoming release?
            </p>

            <a
              href="/"
              onClick={handleContactClick}
              className="sidebar__cta relative mt-3.5 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-[9px] border border-lime-border bg-acid-lime px-3.5 text-[0.875rem] font-medium text-carbon transition-[filter,transform] duration-200 hover:-translate-y-px hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid-lime"
            >
              <Mail className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
              <span>{primaryCta.label}</span>
              <ArrowDownRight className="size-3.5 shrink-0" aria-hidden="true" />
            </a>

            {(hasPublicEmail() || hasInstagram() || otherSocials.length > 0) && (
              <ul className="relative mt-3 space-y-2">
                {instagram ? (
                  <li>
                    <a
                      href={instagram.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.72rem] text-[#9a9aa3] transition-colors hover:text-acid-lime focus-visible:outline-offset-2"
                    >
                      <InstagramIcon className="size-3.5 shrink-0" />
                      <span>Instagram</span>
                      <ArrowUpRight className="size-3 opacity-70" aria-hidden="true" />
                    </a>
                  </li>
                ) : null}

                {hasPublicEmail() ? (
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="inline-flex max-w-full items-center gap-2 text-[0.72rem] text-[#9a9aa3] transition-colors hover:text-acid-lime focus-visible:outline-offset-2"
                    >
                      <Mail className="size-3.5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                      <span className="truncate">{company.email}</span>
                    </a>
                  </li>
                ) : null}

                {otherSocials.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.72rem] text-[#9a9aa3] transition-colors hover:text-acid-lime focus-visible:outline-offset-2"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="size-3 opacity-70" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div className="relative mt-3.5 border-t border-white/[0.07] pt-3">
              <p className="inline-flex items-center gap-2 text-[0.68rem] text-[#8a8a94]">
                <span
                  className="sidebar__status-dot size-1.5 shrink-0 rounded-full bg-acid-lime"
                  aria-hidden="true"
                />
                Available for enquiries
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
