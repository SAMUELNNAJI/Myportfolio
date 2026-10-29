import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName | null;
  className?: string;
  /** External links get the right rel/target and a screen-reader hint. */
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-offset-4";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[14px]",
  sm: "px-4 py-2.5 text-[13px]",
};

const variants: Record<Variant, string> = {
  primary:
    "overflow-hidden text-white bg-[linear-gradient(115deg,#ff3b3b_0%,#d92626_52%,#a81414_100%)] shadow-[0_12px_32px_-14px_rgba(255,59,59,0.85),inset_0_1px_0_rgba(255,255,255,0.28)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(255,59,59,0.9),inset_0_1px_0_rgba(255,255,255,0.34)]",
  secondary:
    "border border-white/[0.12] bg-white/[0.035] text-ink backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.065]",
  ghost:
    "text-muted hover:text-ink hover:bg-white/[0.05]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrow-up-right",
  className,
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={16}
          className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/**
 * Renders a real link when a URL exists, otherwise an honest, non-interactive
 * placeholder state. Used for socials and project links that ship empty.
 */
export function LinkOrPlaceholder({
  href,
  label,
  icon,
  hint = "Add your link in src/content/site.ts",
  className,
  variant = "default",
}: {
  href: string;
  label: string;
  icon?: IconName;
  hint?: string;
  className?: string;
  variant?: "default" | "solid";
}) {
  const baseClasses = cn(
    "group/link inline-flex items-center gap-2 text-[13px] font-medium transition-colors",
    className,
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          baseClasses,
          variant === "solid"
            ? "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-ink hover:border-accent/40 hover:text-accent-soft"
            : "text-muted hover:text-ink",
        )}
      >
        {icon && <Icon name={icon} size={15} />}
        {label}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <span
      aria-disabled="true"
      title={hint}
      className={cn(
        baseClasses,
        "cursor-not-allowed text-faint",
        variant === "solid" &&
          "rounded-full border border-dashed border-white/10 px-4 py-2",
      )}
    >
      {icon && <Icon name={icon} size={15} />}
      {label}
      <span className="sr-only"> (link not configured yet)</span>
    </span>
  );
}
