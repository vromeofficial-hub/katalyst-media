/**
 * Smoothly scroll to a homepage section by id and sync the URL hash.
 */
export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });

  window.history.replaceState(null, "", `#${id}`);
  return true;
}
