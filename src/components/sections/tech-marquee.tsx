import { hero } from "@/content/site";

/**
 * Decorative infinite tech strip. Duplicated lists make the loop seamless; the
 * whole strip is hidden from assistive tech since skills are listed properly in
 * the Skills section.
 */
export function TechMarquee() {
  const items = [...hero.marquee];

  return (
    <div
      aria-hidden="true"
      className="marquee mask-fade-x relative overflow-hidden border-y border-white/[0.06] py-4"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-9 pr-9 sm:gap-12 sm:pr-12"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint"
              >
                <span className="h-1 w-1 rounded-full bg-accent/70" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
