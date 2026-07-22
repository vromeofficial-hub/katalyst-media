import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { company, hasPublicEmail } from "@/content/company";
import { footerNav, legalNav } from "@/content/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-deep-black">
      <Container className="py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-soft-grey">
              {company.positioning}
            </p>
            {hasPublicEmail() ? (
              <a
                href={`mailto:${company.email}`}
                className="mt-4 block text-sm text-soft-grey underline-offset-4 hover:text-acid-lime hover:underline"
              >
                {company.email}
              </a>
            ) : null}
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-soft-grey transition-colors hover:text-off-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-grey transition-colors hover:text-off-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-grey">
              © {year} {company.legalName}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
