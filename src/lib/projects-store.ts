import { promises as fs } from "node:fs";
import path from "node:path";
import type { Project, ProjectCategory, ProjectVisual } from "@/lib/project-types";

/**
 * Tiny JSON-backed project store.
 *
 * The dashboard writes to `data/projects.json` through the API routes. This is
 * intentionally dependency-free and works on any Node host with a persistent
 * filesystem (VPS, Docker, local machine). Serverless hosts with a read-only
 * filesystem need a database instead — see README.
 */

const DATA_DIR = process.env.PROJECTS_DIR
  ? path.resolve(process.env.PROJECTS_DIR)
  : path.join(process.cwd(), "data");

const DATA_FILE = path.join(DATA_DIR, "projects.json");
const EMPTY_STORE = JSON.stringify({ version: 1, projects: [] }, null, 2);

type StoredShape = { version?: number; projects?: unknown };

let writeQueue: Promise<unknown> = Promise.resolve();

function isCategory(value: unknown): value is ProjectCategory {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 40;
}

function isVisual(value: unknown): value is ProjectVisual {
  return value === "site" || value === "store" || value === "landing" || value === "app";
}

/** Drops malformed records rather than letting a bad write break the site. */
function normaliseRecord(raw: unknown): Project | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  if (
    typeof item.id !== "string" ||
    typeof item.slug !== "string" ||
    typeof item.title !== "string" ||
    typeof item.description !== "string"
  ) {
    return null;
  }

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: isCategory(item.category) ? String(item.category).trim() : "Business",
    year: typeof item.year === "string" ? item.year : "",
    description: item.description,
    stack: Array.isArray(item.stack)
      ? item.stack.filter((tag): tag is string => typeof tag === "string")
      : [],
    visual: isVisual(item.visual) ? item.visual : "site",
    accent:
      typeof item.accent === "string" && /^#[0-9a-f]{6}$/i.test(item.accent)
        ? item.accent
        : "#ff3b3b",
    liveUrl: typeof item.liveUrl === "string" ? item.liveUrl : "",
    repoUrl: typeof item.repoUrl === "string" ? item.repoUrl : "",
    featured: item.featured !== false,
    published: item.published !== false,
    sample: item.sample === true,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
    updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : new Date().toISOString(),
  };
}

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, EMPTY_STORE, "utf8");
  }
}

export async function readAllProjects(): Promise<Project[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  let parsed: StoredShape | unknown[];
  try {
    parsed = JSON.parse(raw) as StoredShape | unknown[];
  } catch {
    return [];
  }

  const list = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.projects)
      ? parsed.projects
      : [];

  return list
    .map(normaliseRecord)
    .filter((project): project is Project => project !== null);
}

export async function writeAllProjects(projects: Project[]): Promise<void> {
  const payload = JSON.stringify({ version: 1, projects }, null, 2) + "\n";
  const run = async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const temp = `${DATA_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(temp, payload, "utf8");
    await fs.rename(temp, DATA_FILE);
  };
  writeQueue = writeQueue.then(run, run);
  await writeQueue;
}

const byNewest = (a: Project, b: Project) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export async function getPublishedProjects(): Promise<Project[]> {
  const all = await readAllProjects();
  return all
    .filter((project) => project.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || byNewest(a, b));
}

export async function getAllProjects(): Promise<Project[]> {
  const all = await readAllProjects();
  return all.sort((a, b) => Number(b.featured) - Number(a.featured) || byNewest(a, b));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const published = await getPublishedProjects();
  const featured = published.filter((project) => project.featured);
  return featured.length > 0 ? featured : published;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const all = await readAllProjects();
  return all.find((project) => project.id === id);
}

export function uniqueSlug(title: string, existing: Project[], ignoreId?: string): string {
  const base =
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "project";

  const taken = new Set(
    existing.filter((project) => project.id !== ignoreId).map((project) => project.slug),
  );
  if (!taken.has(base)) return base;

  let counter = 2;
  while (taken.has(`${base}-${counter}`)) counter += 1;
  return `${base}-${counter}`;
}
