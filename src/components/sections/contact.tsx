import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { LinkOrPlaceholder } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { contact, siteConfig } from "@/content/site";

const socials = [
  { key: "github", icon: "github" as IconName, ...siteConfig.socials.github },
  { key: "linkedin", icon: "linkedin" as IconName, ...siteConfig.socials.linkedin },
  { key: "x", icon: "x" as IconName, ...siteConfig.socials.x },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section section-rule relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,59,59,0.12),transparent_72%)] blur-2xl"
      />

      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 xl:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="text-faint">07</span>
                <span aria-hidden="true" className="text-faint/40">
                  /
                </span>
                {contact.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h2
                id="contact-title"
                className="mt-5 max-w-xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.6rem] lg:text-[2.85rem]"
              >
                Let&apos;s build something{" "}
                <span className="text-gradient">worth shipping.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-muted">
                {contact.description}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 text-[11.5px] font-medium text-emerald-200/90">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {siteConfig.availability.label}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-4 sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-accent-soft">
                      <Icon name="mail" size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-faint">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="mt-0.5 block truncate text-[13px] font-medium text-ink transition-colors hover:text-accent-soft"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                  <CopyEmail email={siteConfig.email} />
                </div>

                <div className="border-b border-white/[0.06] px-4 py-4 sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-accent-soft">
                      <Icon name="phone" size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-faint">
                        Phone
                      </p>
                      <a
                        href={siteConfig.phoneHref}
                        className="mt-0.5 block text-[13px] font-medium text-ink transition-colors hover:text-accent-soft"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-4 sm:px-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-faint">
                      Elsewhere
                    </p>
                    <p className="hidden font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint sm:block">
                      {siteConfig.location}
                    </p>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {socials.map((social) => (
                      <LinkOrPlaceholder
                        key={social.key}
                        href={social.url}
                        label={social.label}
                        icon={social.icon}
                        variant="solid"
                        hint={`Add your ${social.label} URL in src/content/site.ts`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                  What happens next
                </p>
                <ol className="mt-3.5 space-y-3">
                  {contact.nextSteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-[12.5px] leading-relaxed text-muted"
                    >
                      <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] font-mono text-[9px] text-accent-soft">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-5 flex items-center gap-2.5 text-[11px] text-faint">
                  <Icon name="clock" size={13} className="shrink-0 text-accent-soft/60" />
                  {siteConfig.responseTime}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:pt-2">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
