"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { sectionIds } from "@/content/navigation";

type ActiveSectionContextValue = {
  activeId: string;
  setActiveId: (id: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue | null>(
  null,
);

function readActiveFromScroll(defaultId: string) {
  const elements = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));

  if (elements.length === 0) return defaultId;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const viewport = window.innerHeight;
  const docHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );

  // Only force Contact when truly pinned to the end of the document
  if (scrollTop + viewport >= docHeight - 2) {
    return sectionIds[sectionIds.length - 1] ?? defaultId;
  }

  const probe = viewport * 0.25;
  let nextId = defaultId;

  for (const el of elements) {
    if (el.getBoundingClientRect().top <= probe) {
      nextId = el.id;
    }
  }

  return nextId;
}

export function ActiveSectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeId, setActiveIdState] = useState("overview");

  const setActiveId = useCallback((id: string) => {
    setActiveIdState(id);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActiveIdState(readActiveFromScroll("overview"));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("scroll", update, { passive: true, capture: true });

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer =
      elements.length > 0
        ? new IntersectionObserver(update, {
            root: null,
            rootMargin: "-20% 0px -55% 0px",
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          })
        : null;

    elements.forEach((el) => observer?.observe(el));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("scroll", update, true);
      observer?.disconnect();
    };
  }, [pathname]);

  const resolvedActiveId = pathname === "/" ? activeId : "overview";

  const value = useMemo(
    () => ({ activeId: resolvedActiveId, setActiveId }),
    [resolvedActiveId, setActiveId],
  );

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection(defaultId = "overview") {
  const ctx = useContext(ActiveSectionContext);
  if (!ctx) return defaultId;
  return ctx.activeId;
}

export function useSetActiveSection() {
  const ctx = useContext(ActiveSectionContext);
  return ctx?.setActiveId;
}
