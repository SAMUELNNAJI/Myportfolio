import { testimonials } from "@/content/site";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section section-rule"
    >
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          index="06"
          eyebrow="Testimonials"
          title="What it's like to work together."
          description="A good project is as much about communication as code. This is where real client feedback will live once it's available."
        />

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-dashed border-white/[0.14] bg-white/[0.015] px-4 py-3.5 text-[12px] leading-relaxed text-faint">
          <Icon name="info" size={15} className="mt-px shrink-0 text-accent-soft/80" />
          <p>
            <span className="font-medium text-muted">Placeholder content.</span>{" "}
            The quotes below are sample copy, not real client feedback. Replace
            them in{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-ink/80">
              src/content/site.ts
            </code>{" "}
            only when you have permission to publish them.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:gap-5">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 80} className="h-full">
              <figure className="card card-interactive relative flex h-full flex-col overflow-hidden p-6">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-8 font-display text-[8rem] leading-none text-white/[0.035]"
                >
                  &rdquo;
                </span>

                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.9rem] leading-none text-accent/45"
                  >
                    &ldquo;
                  </span>
                  <span className="rounded-full border border-dashed border-white/15 bg-white/[0.03] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                    Placeholder
                  </span>
                </div>

                <blockquote className="mt-3 text-[13.5px] leading-[1.75] text-ink/85">
                  {testimonial.quote}
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-[linear-gradient(145deg,rgba(255,59,59,0.24),rgba(255,138,61,0.08))] font-mono text-[10px] font-medium text-accent-soft"
                  >
                    {testimonial.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-medium text-ink">
                      {testimonial.name}
                    </span>
                    <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.1em] text-faint">
                      {testimonial.title}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
