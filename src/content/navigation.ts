export type NavItem = {
  number: string;
  label: string;
  href: string;
  id: string;
};

export const primaryNav: NavItem[] = [
  { number: "01", label: "Home", href: "/#overview", id: "overview" },
  { number: "02", label: "Services", href: "/#services", id: "services" },
  { number: "03", label: "Paid Media", href: "/#paid-media", id: "paid-media" },
  { number: "04", label: "Process", href: "/#process", id: "process" },
  { number: "05", label: "Capabilities", href: "/#capabilities", id: "capabilities" },
  { number: "06", label: "About", href: "/#about", id: "about" },
  { number: "07", label: "FAQ", href: "/#faq", id: "faq" },
  { number: "08", label: "Contact", href: "/#contact", id: "contact" },
];

export const footerNav = [
  { label: "Services", href: "/#services" },
  { label: "Paid Media", href: "/#paid-media" },
  { label: "Process", href: "/#process" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
] as const;

export const sectionIds = primaryNav.map((item) => item.id);

export const primaryCta = {
  label: "Contact Us",
  href: "/",
  id: "contact",
} as const;
