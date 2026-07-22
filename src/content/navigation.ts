export type NavItem = {
  number: string;
  label: string;
  href: string;
  id: string;
};

export const primaryNav: NavItem[] = [
  { number: "01", label: "Home", href: "/#overview", id: "overview" },
  { number: "02", label: "Services", href: "/#services", id: "services" },
  { number: "03", label: "Process", href: "/#process", id: "process" },
  { number: "04", label: "Work", href: "/#work", id: "work" },
  { number: "05", label: "About", href: "/#about", id: "about" },
  { number: "06", label: "Contact", href: "/#contact", id: "contact" },
];

export const footerNav = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
] as const;

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
] as const;

export const sectionIds = primaryNav.map((item) => item.id);

export const primaryCta = {
  label: "Start a Campaign",
  href: "/#contact",
  id: "contact",
} as const;
