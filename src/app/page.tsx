import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { siteConfig, skillGroups } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function HomePage() {
  const sameAs = Object.values(siteConfig.socials)
    .map((social) => social.url)
    .filter(Boolean);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.seo.description,
    url: siteUrl,
    email: `mailto:${siteConfig.email}`,
    knowsAbout: Array.from(
      new Set(skillGroups.flatMap((group) => [...group.skills])),
    ),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand,
    url: siteUrl,
    description: siteConfig.seo.description,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema]),
        }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
