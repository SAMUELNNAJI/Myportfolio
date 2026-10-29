import { processSteps } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section section-rule">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          index="05"
          eyebrow="Work process"
          title="A simple process, built to remove surprises."
          description="Four phases, each with something concrete at the end. You'll always know what's happening, what's next, and what I need from you."
        />

        <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          <div
            aria-hidden="true"
            className="absolute left-[1.75rem] right-[1.75rem] top-7 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(255,59,59,0.35),rgba(255,138,61,0.3),transparent)] lg:block"
          />

          {processSteps.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={index * 80} className="h-full">
                <div className="flex h-full flex-col">
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/[0.1] bg-[#0c0809] font-mono text-[12px] font-medium text-accent-soft shadow-[0_0_0_6px_#070506,inset_0_1px_0_rgba(255,255,255,0.08)]">
                      {step.number}
                    </span>
                    <span className="hidden items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint lg:flex">
                      <Icon
                        name={step.icon as IconName}
                        size={14}
                        className="text-accent-soft/50"
                      />
                      Phase
                    </span>
                  </div>

                  <div className="card card-interactive mt-4 flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <Icon
                        name={step.icon as IconName}
                        size={17}
                        className="text-accent-soft lg:hidden"
                      />
                      <h3 className="font-display text-[15px] font-semibold tracking-[-0.015em] text-ink">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">
                      {step.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {step.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-faint"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="mt-6 flex items-start gap-2.5 px-1 text-[11.5px] leading-relaxed text-faint">
            <Icon name="info" size={14} className="mt-px shrink-0 text-faint/80" />
            Timelines depend on scope and content readiness — you&apos;ll get a
            realistic estimate in writing before anything starts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
