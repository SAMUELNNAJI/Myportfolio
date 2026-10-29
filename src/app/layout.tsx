import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { BootOverlay } from "@/components/layout/boot-overlay";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.seo.title,
    template: `%s — ${siteConfig.brand}`,
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.brand,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [...siteConfig.seo.keywords],
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.brand,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070506",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
          Runs before paint: enables scroll reveals only when JS is available,
          and decides whether the one-per-session code-door intro should play.
          No JS means no intro and no hidden content.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.dataset.js='true';try{var seen=sessionStorage.getItem('samizil-boot')==='1';var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var isDash=location.pathname.indexOf('/dashboard')===0;if(!seen&&!reduce&&!isDash){d.dataset.boot='play';window.setTimeout(function(){if(d.dataset.boot==='play'){d.dataset.boot='done';try{sessionStorage.setItem('samizil-boot','1')}catch(e){}}},1500);}else{d.dataset.boot='done';}}catch(e){d.dataset.boot='done';}})();`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AmbientBackground />
        <BootOverlay />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
