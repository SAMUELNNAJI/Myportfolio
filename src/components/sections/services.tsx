import { services } from "@/content/site";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section section-rule">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          index="04"
          eyebrow="Services"
          title="From a blank page to something you're proud to share."
          description="Every engagement starts with a clear scope, a short feedback loop, and one person accountable for the result — me."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 55}>
              <article className="card card-interactive group relative flex h-full flex-col overflow-hidden p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,59,59,0.65),rgba(255,138,61,0.45),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,59,59,0.18),rgba(255,138,61,0.04))] text-accent-soft transition-colors duration-300 group-hover:border-accent/35 group-hover:text-white">
                    <Icon name={service.icon} size={19} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[16px] font-semibold leading-snug tracking-[-0.015em] text-ink">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[11.5px] text-muted/90"
                    >
                      <Icon
                        name="check"
                        size={12}
                        className="shrink-0 text-accent-soft/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-auto inline-flex w-fit items-center gap-1.5 pt-6 text-[11.5px] font-medium text-accent-soft/90 transition-colors hover:text-white"
                >
                  Discuss this service
                  <Icon
                    name="arrow-right"
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-[12.5px] leading-relaxed text-muted">
              <span className="font-medium text-ink">Not sure what you need?</span>{" "}
              Most projects start as a vague idea. A short call is usually enough
              to find the right shape.
            </p>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 text-[12px] font-semibold text-ink transition-colors hover:text-accent-soft"
            >
              Start with a conversation
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
