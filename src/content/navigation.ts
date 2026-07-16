export type NavItem = {
  number: string;
  label: string;
  href: string;
  id: string;
};

export const primaryNav: NavItem[] = [
  { number: "01", label: "Overview", href: "/#overview", id: "overview" },
  { number: "02", label: "What We Do", href: "/#what-we-do", id: "what-we-do" },
  { number: "03", label: "Why Katalyst", href: "/#why-katalyst", id: "why-katalyst" },
  { number: "04", label: "Process", href: "/#process", id: "process" },
  { number: "05", label: "Work", href: "/#work", id: "work" },
  { number: "06", label: "Contact", href: "/#contact", id: "contact" },
];

export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export const sectionIds = primaryNav.map((item) => item.id);
