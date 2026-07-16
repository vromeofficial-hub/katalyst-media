"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll";

/** On load / hash change, scroll to the matching homepage section. */
export function HashScroll() {
  useEffect(() => {
    const scrollFromHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      // Wait a frame so layout is ready after route changes
      window.requestAnimationFrame(() => {
        scrollToSection(id);
      });
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, []);

  return null;
}
