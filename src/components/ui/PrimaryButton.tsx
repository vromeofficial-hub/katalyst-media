import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { company, getMailtoHref } from "@/content/company";

type ButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
};

type AnchorProps = ButtonBaseProps & {
  href: string;
  onClick?: () => void;
  type?: never;
  disabled?: never;
  external?: boolean;
};

type NativeButtonProps = ButtonBaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: never;
};

type PrimaryButtonProps = AnchorProps | NativeButtonProps;

const primaryClasses =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-lime-border bg-acid-lime px-5 py-3.5 text-[0.9375rem] font-medium text-carbon transition-[transform,filter,background-color] duration-200 ease-out hover:-translate-y-px hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid-lime disabled:cursor-not-allowed disabled:opacity-60";

export function PrimaryButton(props: PrimaryButtonProps) {
  const { children, className, showArrow = true } = props;
  const isHash = "href" in props && !!props.href?.startsWith("#");
  const Arrow = isHash ? ArrowDownRight : ArrowUpRight;

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <Arrow
          className={cn(
            "size-4 transition-transform duration-200 ease-out",
            isHash
              ? "group-hover:translate-y-[2px]"
              : "group-hover:translate-x-[3px] group-hover:-translate-y-px",
          )}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const isMail = props.href.startsWith("mailto:");
    const hash = props.href.startsWith("#");
    const external = props.external ?? (props.href.startsWith("http") && !isMail);

    if (external || isMail || hash) {
      return (
        <a
          href={props.href}
          onClick={props.onClick}
          className={cn(primaryClasses, className)}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={props.href} onClick={props.onClick} className={cn(primaryClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(primaryClasses, className)}
    >
      {content}
    </button>
  );
}

export function EmailKatalystButton({
  className,
  label = "Email Katalyst Media",
  onClick,
}: {
  className?: string;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <PrimaryButton href={getMailtoHref()} className={className} onClick={onClick}>
      {label}
    </PrimaryButton>
  );
}

export function EmailAddressLink({ className }: { className?: string }) {
  return (
    <a
      href={getMailtoHref()}
      className={cn(
        "text-sm text-soft-grey underline-offset-4 transition-colors hover:text-acid-lime hover:underline",
        className,
      )}
    >
      {company.email}
    </a>
  );
}
