import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { company, hasPublicEmail } from "@/content/company";
import { legalNav } from "@/content/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-deep-black">
      <Container className="py-10 md:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Wordmark />
            {hasPublicEmail() ? (
              <a
                href={`mailto:${company.email}`}
                className="mt-4 block text-sm text-soft-grey underline-offset-4 hover:text-acid-lime hover:underline"
              >
                {company.email}
              </a>
            ) : (
              <p className="mt-4 text-sm text-acid-lime">In Progress</p>
            )}
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <ul className="flex flex-wrap gap-5">
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
