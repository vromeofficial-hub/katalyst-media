import Link from "next/link";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  onDark?: boolean;
  onClick?: () => void;
};

export function SecondaryButton({
  children,
  href,
  className,
  onDark = true,
  onClick,
}: SecondaryButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-[8px] border px-5 py-3.5 text-[0.9375rem] font-medium transition-colors duration-200 ease-out",
    onDark
      ? "border-border-dark bg-transparent text-off-white hover:border-lime-border"
      : "border-border-light bg-transparent text-carbon hover:border-lime-on-light",
    className,
  );

  const isExternal = href.startsWith("http");
  const isMail = href.startsWith("mailto:");

  if (isExternal || isMail) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
