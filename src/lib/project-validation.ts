import {
  safeHttpUrl,
  visualForCategory,
  type ProjectCategory,
  type ProjectFields,
  type ProjectVisual,
} from "@/lib/project-types";

type Failure = { ok: false; errors: Record<string, string> };
type Success = { ok: true; fields: ProjectFields };
export type ValidationResult = Success | Failure;

const isCategory = (value: unknown): value is ProjectCategory =>
  typeof value === "string" && value.trim().length > 0 && value.trim().length <= 40;

const isVisual = (value: unknown): value is ProjectVisual =>
  value === "site" || value === "store" || value === "landing" || value === "app";

function parseStack(value: unknown): string[] {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const entry of raw) {
    if (typeof entry !== "string") continue;
    const tag = entry.trim().replace(/\s+/g, " ").slice(0, 30);
    if (!tag) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    tags.push(tag);
    if (tags.length === 10) break;
  }
  return tags;
}

/**
 * Validates and normalises the editable project fields. Expects a complete
 * payload (PATCH routes merge existing values before calling this).
 */
export function validateProjectFields(raw: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};

  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  if (title.length < 2) errors.title = "Add a project title (at least 2 characters).";
  else if (title.length > 80) errors.title = "Keep the title under 80 characters.";

  if (!isCategory(raw.category)) {
    errors.category = "Choose a category.";
  }

  let year = typeof raw.year === "string" ? raw.year.trim() : "";
  if (!year) year = String(new Date().getFullYear());
  if (year.length > 16) errors.year = "Keep the year short (max 16 characters).";

  const description =
    typeof raw.description === "string" ? raw.description.trim() : "";
  if (description.length < 20)
    errors.description = "Write at least 20 characters so visitors know what it is.";
  else if (description.length > 500)
    errors.description = "Keep the description under 500 characters.";

  const stack = parseStack(raw.stack);
  if (stack.length === 0) errors.stack = "Add at least one technology.";
  if (stack.length > 10) errors.stack = "Use at most 10 technologies.";

  const liveRaw = typeof raw.liveUrl === "string" ? raw.liveUrl.trim() : "";
  const liveUrl = safeHttpUrl(liveRaw);
  if (liveRaw && !liveUrl) errors.liveUrl = "Enter a valid http(s) URL.";
  if (liveUrl.length > 500) errors.liveUrl = "That URL is too long.";

  const repoRaw = typeof raw.repoUrl === "string" ? raw.repoUrl.trim() : "";
  const repoUrl = safeHttpUrl(repoRaw);
  if (repoRaw && !repoUrl) errors.repoUrl = "Enter a valid http(s) URL.";

  const accent =
    typeof raw.accent === "string" && /^#[0-9a-f]{6}$/i.test(raw.accent)
      ? raw.accent
      : "#ff3b3b";

  const categoryRaw = typeof raw.category === "string" ? raw.category.trim() : "";
  const category = isCategory(categoryRaw) ? categoryRaw : "Business";
  const visual = isVisual(raw.visual) ? raw.visual : visualForCategory(category);

  const featured = typeof raw.featured === "boolean" ? raw.featured : true;
  const published = typeof raw.published === "boolean" ? raw.published : true;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    fields: {
      title,
      category,
      year,
      description,
      stack,
      visual,
      accent,
      liveUrl,
      repoUrl,
      featured,
      published,
    },
  };
}

/** Fields the dashboard is allowed to send. */
export const EDITABLE_FIELDS = [
  "title",
  "category",
  "year",
  "description",
  "stack",
  "visual",
  "accent",
  "liveUrl",
  "repoUrl",
  "featured",
  "published",
] as const;
