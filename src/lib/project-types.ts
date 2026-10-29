/** Shared project types — safe to import from client components. */

export const PROJECT_CATEGORIES = [
  "Business",
  "E-commerce",
  "Landing page",
  "Web app",
  "WordPress site",
  "Portfolio",
] as const;

export type ProjectCategory = string;

export type ProjectVisual = "site" | "store" | "landing" | "app";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  stack: string[];
  visual: ProjectVisual;
  accent: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  published: boolean;
  /** Sample layouts shipped with the template, not client work. */
  sample: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProjectFields = Pick<
  Project,
  | "title"
  | "category"
  | "year"
  | "description"
  | "stack"
  | "visual"
  | "accent"
  | "liveUrl"
  | "repoUrl"
  | "featured"
  | "published"
>;

export function visualForCategory(category: ProjectCategory): ProjectVisual {
  switch (category) {
    case "E-commerce":
      return "store";
    case "Landing page":
      return "landing";
    case "Web app":
      return "app";
    default:
      return "site";
  }
}

/** Returns a normalised http(s) URL, or an empty string when untrusted. */
export function safeHttpUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function hostnameOf(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
