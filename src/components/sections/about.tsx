import Image from "next/image";
import Link from "next/link";
import { about, siteConfig } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About me"
          title={about.title}
          description="A little about how I think about the web — and how I work with the people building it."
        />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Portrait ------------------------------------------------------ */}
          <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(255,59,59,0.18),transparent_75%)] blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={siteConfig.avatar.src}
                  alt={siteConfig.avatar.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 420px, 80vw"
                  className="object-cover"
                  priority={false}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,11,0.95)_0%,rgba(5,6,11,0.35)_35%,transparent_60%)]"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
                      Hello, I&apos;m
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
                      {siteConfig.name}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted backdrop-blur">
                    Portrait
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-2 px-1 text-[11px] text-faint">
              <Icon name="info" size={13} className="shrink-0" />
              {about.imageCaption}
            </p>

            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-12 w-12 rounded-tl-[1.4rem] border-l border-t border-accent/40"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-12 w-12 rounded-br-[1.4rem] border-b border-r border-ember/25"
            />
          </Reveal>

          {/* Copy ---------------------------------------------------------- */}
          <div>
            <div className="space-y-5 text-[14.5px] leading-[1.85] text-muted sm:text-[15px]">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 60}>
                  <p className={index === 0 ? "text-ink/90" : undefined}>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.07]">
                {about.facts.map((fact) => (
                  <div key={fact.label} className="bg-[#090607] px-4 py-4 sm:px-5">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-[13px] font-medium text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 flex items-start gap-2.5 rounded-xl border border-accent/15 bg-accent/[0.055] px-4 py-3 text-[12.5px] leading-relaxed text-muted">
                <Icon
                  name="sparkles"
                  size={15}
                  className="mt-0.5 shrink-0 text-accent-soft"
                />
                <span>
                  Prefer proof over adjectives? The{" "}
                  <Link href="/#projects" className="prose-link">
                    project section
                  </Link>{" "}
                  shows the kind of work I enjoy, and the{" "}
                  <Link href="/#process" className="prose-link">
                    process
                  </Link>{" "}
                  shows how we&apos;d get there together.
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Principles ------------------------------------------------------ */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
          {about.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 70}>
              <article className="card card-interactive group h-full p-5 sm:p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,59,59,0.16),rgba(255,138,61,0.04))] text-accent-soft transition-colors duration-300 group-hover:border-accent/30 group-hover:text-white">
                  <Icon name={principle.icon as IconName} size={18} />
                </span>
                <h3 className="mt-4 text-[14.5px] font-semibold tracking-tight text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  {principle.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
