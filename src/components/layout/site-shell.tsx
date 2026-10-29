"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Keeps the marketing chrome off the private dashboard while keeping the same
 * root layout (fonts, metadata, skip link, background) across every route.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = Boolean(pathname?.startsWith("/dashboard"));

  return (
    <>
      {!isDashboard && <SiteHeader />}
      <main id="main">{children}</main>
      {!isDashboard && <SiteFooter />}
    </>
  );
}
