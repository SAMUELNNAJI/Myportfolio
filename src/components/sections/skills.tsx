import { skillGroups } from "@/content/site";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const standards = [
  "Semantic HTML",
  "Keyboard & screen-reader checks",
  "Responsive QA at real breakpoints",
  "Performance and Core Web Vitals review",
];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section section-rule">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index="02"
          eyebrow="Skills & technologies"
          title="A toolkit built for shipping, not collecting badges."
          description="The technologies I reach for most, grouped by where they sit in a build. Highlighted tags are the ones I use on almost every project."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <article className="card card-interactive group relative h-full overflow-hidden p-6 sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/[0.09] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,59,59,0.18),rgba(255,138,61,0.04))] text-accent-soft transition-colors duration-300 group-hover:border-accent/35 group-hover:text-white">
                    <Icon name={group.icon} size={19} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint/70">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[17px] font-semibold tracking-[-0.015em] text-ink">
                  {group.title}
                </h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                  {group.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => {
                    const isCore = group.core.includes(skill);
                    return (
                      <li
                        key={skill}
                        className={cn(
                          "tag transition-colors duration-200",
                          isCore &&
                            "border-accent/25 bg-accent/[0.09] text-accent-soft",
                        )}
                      >
                        {skill}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="flex items-center gap-2.5 text-[12px] font-medium text-ink">
              <Icon name="check-circle" size={16} className="text-emerald-400/90" />
              Included in every build
            </p>
            <ul className="grid gap-2 text-[12px] text-muted sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-6">
              {standards.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Icon name="check" size={12} className="text-accent-soft/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
