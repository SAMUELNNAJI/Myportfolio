/** Single source of truth for absolute URLs used in metadata and SEO files. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com"
).replace(/\/$/, "");
