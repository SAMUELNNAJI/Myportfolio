import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "split" | "center";
  className?: string;
};

/**
 * Editorial section header: mono eyebrow with an index, display heading, and an
 * optional description. The "split" layout places the description to the right
 * on large screens.
 */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  align = "split",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        align === "split"
          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-12"
          : "justify-items-center text-center",
        className,
      )}
    >
      <div className={cn(align === "center" && "flex flex-col items-center")}>
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            <span className="text-faint">{index}</span>
            <span aria-hidden="true" className="text-faint/40">
              /
            </span>
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={60}>
          <h2
            id={id}
            className={cn(
              "mt-5 max-w-2xl text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-4xl lg:text-[2.65rem]",
              align === "center" && "mx-auto",
            )}
          >
            {title}
          </h2>
        </Reveal>
      </div>

      {description && (
        <Reveal delay={120}>
          <p
            className={cn(
              "max-w-xl text-[14.5px] leading-relaxed text-muted lg:text-[15px]",
              align === "center" && "mx-auto mt-1",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
