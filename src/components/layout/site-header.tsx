"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { navLinks, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  /* Header styling + reading progress -------------------------------------- */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 10);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Active section --------------------------------------------------------- */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.15, 0.35] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "relative transition-[background-color,border-color,box-shadow] duration-500",
            scrolled
              ? "border-b border-white/[0.07] bg-canvas/75 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-offset-4"
              aria-label={`${siteConfig.brand} — back to top`}
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-white/12 bg-[linear-gradient(145deg,rgba(255,59,59,0.28),rgba(255,138,61,0.08))] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors duration-300 group-hover:border-accent/45">
                <span className="font-mono text-[12px] font-semibold tracking-tighter text-accent-soft">
                  {"</>"}
                </span>
              </span>
              <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
                {siteConfig.brand}
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <Link
                    key={link.href}
                    href={sectionHref(link.href)}
                    className="nav-link"
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                aria-label="Project dashboard"
                title="Project dashboard"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-muted transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-ink"
              >
                <Icon name="lock" size={16} />
              </Link>

              <Link
                href={sectionHref("#contact")}
                className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-white sm:inline-flex"
              >
                Let&apos;s talk
                <Icon name="arrow-up-right" size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ink transition-colors hover:border-white/25 hover:bg-white/[0.08] lg:hidden"
              >
                <Icon name={open ? "close" : "menu"} size={19} />
              </button>
            </div>
          </div>

          {/* Reading progress */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px overflow-hidden"
          >
            <div
              className="h-full origin-left bg-[linear-gradient(90deg,#dc2626,#ff8a3d)] transition-transform duration-150 ease-out"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>

        <MobileNavigation
          open={open}
          active={active}
          sectionHref={sectionHref}
          onClose={closeMenu}
        />
      </header>
    </>
  );
}

function MobileNavigation({
  open,
  active,
  sectionHref,
  onClose,
}: {
  open: boolean;
  active: string;
  sectionHref: (hash: string) => string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 top-[4.5rem] bg-canvas/70 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-slide-down fixed inset-x-0 top-[4.5rem] max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-white/[0.07] bg-canvas/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
      >
        <div className="container-page py-6">
          <h2 id={titleId} className="sr-only">
            Site navigation
          </h2>

          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.map((link, index) => {
              const isActive = active === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={onClose}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[1.35rem] font-medium tracking-[-0.02em] transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-faint">
                      0{index + 1}
                    </span>
                    {link.label}
                  </span>
                  <Icon
                    name="arrow-up-right"
                    size={17}
                    className="text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-soft"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-4">
            <Link
              href={sectionHref("#contact")}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#dc2626,#d92626_55%,#a81414)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-14px_rgba(255,59,59,0.9)]"
            >
              Start a project
              <Icon name="arrow-up-right" size={15} />
            </Link>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5">
              <span className="inline-flex items-center gap-2 text-[11.5px] text-muted">
                <Icon name="lock" size={13} className="text-accent-soft/70" />
                Manage the site
              </span>
              <Link
                href="/dashboard"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-accent-soft transition-colors hover:text-ink"
              >
                Dashboard
                <Icon name="arrow-right" size={12} />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="inline-flex items-center gap-2 text-[12px] text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {siteConfig.availability.label}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-[12px] text-muted transition-colors hover:text-ink"
              >
                <Icon name="mail" size={14} />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
