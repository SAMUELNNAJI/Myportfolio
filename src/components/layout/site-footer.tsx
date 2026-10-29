import Link from "next/link";
import { LinkOrPlaceholder } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";
import { navLinks, siteConfig } from "@/content/site";

const socials = [
  { key: "github", icon: "github" as IconName, ...siteConfig.socials.github },
  { key: "linkedin", icon: "linkedin" as IconName, ...siteConfig.socials.linkedin },
  { key: "x", icon: "x" as IconName, ...siteConfig.socials.x },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.07]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,59,59,0.35),transparent)]"
      />

      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_0.85fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-offset-4"
              aria-label={`${siteConfig.brand} — back to top`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-[linear-gradient(145deg,rgba(255,59,59,0.28),rgba(255,138,61,0.08))] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                <span className="font-mono text-[12px] font-semibold tracking-tighter text-accent-soft">
                  {"</>"}
                </span>
              </span>
              <span className="font-display text-[15px] font-semibold tracking-[-0.02em]">
                {siteConfig.brand}
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-muted">
              Websites and web apps built with HTML, CSS, JavaScript, React,
              Django and WordPress — designed and developed in Port Harcourt.
            </p>

            <p className="mt-5 flex items-center gap-2 text-[12px] text-faint">
              <Icon name="map-pin" size={14} className="text-accent-soft/60" />
              {siteConfig.location}
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2.5 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink transition-colors hover:text-accent-soft"
            >
              <Icon name="mail" size={14} className="text-accent-soft/60" />
              {siteConfig.email}
            </a>

            <a
              href={siteConfig.phoneHref}
              className="mt-1.5 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink transition-colors hover:text-accent-soft"
            >
              <Icon name="phone" size={14} className="text-accent-soft/60" />
              {siteConfig.phone}
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${link.href}`}
                    className="text-[12.5px] text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="text-[12.5px] text-muted transition-colors hover:text-ink"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-muted transition-colors hover:text-ink"
                >
                  <Icon name="lock" size={11} className="text-accent-soft/60" />
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.key}>
                  <LinkOrPlaceholder
                    href={social.url}
                    label={social.label}
                    icon={social.icon}
                    hint={`Add your ${social.label} URL in src/content/site.ts`}
                  />
                </li>
              ))}
              <li className="pt-1">
                <span className="inline-flex items-center gap-2 text-[11px] text-faint">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Open to new projects
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-faint">
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-[11px] text-faint">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent/70"
            />
            Designed and developed with care.
          </p>

          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[11px] text-faint transition-colors hover:text-ink"
          >
            Back to {siteConfig.brand}
            <Icon
              name="arrow-up"
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
