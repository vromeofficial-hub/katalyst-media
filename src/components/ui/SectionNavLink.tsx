"use client";

import { usePathname, useRouter } from "next/navigation";
import type { NavItem } from "@/content/navigation";
import { useSetActiveSection } from "@/components/providers/ActiveSectionProvider";
import { queueSectionScroll, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type SectionNavLinkProps = {
  item: NavItem;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  "aria-current"?: "true" | "page" | undefined;
};

export function SectionNavLink({
  item,
  className,
  children,
  onNavigate,
  "aria-current": ariaCurrent,
}: SectionNavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const setActiveId = useSetActiveSection();
  const isHome = pathname === "/";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
    setActiveId?.(item.id);

    if (isHome) {
      scrollToSection(item.id);
      return;
    }

    queueSectionScroll(item.id);
    router.push("/");
  };

  return (
    <a
      href="/"
      onClick={handleClick}
      className={cn(className)}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  );
}
