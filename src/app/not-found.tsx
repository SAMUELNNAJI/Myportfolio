import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden py-24">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              Error 404
            </p>

            <h1 className="mt-5 text-[3.2rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-[4.5rem] lg:text-[5.2rem]">
              Off the map,
              <br />{" "}
              <span className="text-gradient">still on brand.</span>
            </h1>

            <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-muted">
              This page doesn&apos;t exist — maybe it was renamed, moved, or
              never shipped in the first place. The good stuff is one click away.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(115deg,#dc2626,#d92626_55%,#a81414)] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_-14px_rgba(255,59,59,0.9)]"
              >
                <Icon name="arrow-left" size={15} />
                Back home
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-white/25 hover:bg-white/[0.06]"
              >
                View projects
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>

            <p className="mt-8 flex flex-wrap items-center gap-2 text-[11.5px] text-faint">
              <Icon name="mail" size={13} className="text-accent-soft/60" />
              Looking for something specific?{" "}
              <a href={`mailto:${siteConfig.email}`} className="prose-link">
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div className="card overflow-hidden p-0">
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" aria-hidden="true" />
              <span className="ml-3 font-mono text-[10.5px] text-faint">
                request.log
              </span>
            </div>
            <div className="space-y-2.5 p-5 font-mono text-[11px] leading-relaxed sm:text-[12px]">
              <p className="text-faint">
                <span className="text-accent-soft/70">$</span> curl -I
                <span className="text-faint">
                  {" "}
                  {siteUrl.replace(/^https?:\/\//, "")}
                </span>
              </p>
              <p className="text-red-300/80">HTTP/2 404 Not Found</p>
              <p className="text-faint">
                <span className="text-muted">content-type:</span> text/html;
                charset=utf-8
              </p>
              <p className="text-faint">
                <span className="text-muted">host:</span>{" "}
                {siteUrl.replace(/^https?:\/\//, "")}
              </p>
              <p className="text-faint">
                <span className="text-muted">cache-control:</span> no-store
              </p>
              <div className="mt-4 border-t border-white/[0.07] pt-4">
                <p className="text-muted">
                  <span className="text-emerald-300/90">➜</span> Suggestion:{" "}
                  <Link href="/#contact" className="text-accent-soft underline decoration-accent/30 underline-offset-4 hover:text-white">
                    start a conversation
                  </Link>
                </p>
                <p className="mt-1.5 text-faint">
                  or try{" "}
                  <Link href="/#projects" className="text-accent-soft underline decoration-accent/30 underline-offset-4 hover:text-white">
                    /#projects
                  </Link>{" "}
                  <span className="animate-blink text-accent-soft/80">▍</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
