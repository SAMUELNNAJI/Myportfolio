import { HeroCode } from "@/components/sections/hero-code";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { hero, siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative pb-10 pt-28 sm:pt-32 lg:pb-14 lg:pt-40">
      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.065] px-3.5 py-1.5 text-[11.5px] font-medium text-emerald-200/90">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {siteConfig.availability.label}
                </span>
                <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint sm:inline">
                  {hero.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h1
                id="hero-title"
                className="mt-7 max-w-[18ch] text-[2.55rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[3.4rem] lg:text-[3.9rem] xl:text-[4.15rem]"
              >
                {hero.headline.before}{" "}
                <span className="text-gradient">{hero.headline.highlight}</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base lg:text-[16.5px]">
                {hero.intro}
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={hero.primaryCta.href} variant="primary">
                  {hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink
                  href={hero.secondaryCta.href}
                  variant="secondary"
                  icon="arrow-right"
                >
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10 flex flex-col gap-3 text-[12.5px] text-faint sm:flex-row sm:items-center sm:gap-5">
                <span className="inline-flex items-center gap-2">
                  <Icon name="map-pin" size={14} className="text-accent-soft/70" />
                  {siteConfig.location}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block"
                />
                <span className="inline-flex items-center gap-2">
                  <Icon name="briefcase" size={14} className="text-accent-soft/70" />
                  {siteConfig.availability.note}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="min-w-0 lg:pl-2">
            <HeroCode />
          </Reveal>
        </div>
      </div>

      <div className="mt-16 lg:mt-20">
        <TechMarquee />
      </div>
    </section>
  );
}
