import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAuthenticated, sameOrigin } from "@/lib/admin-auth";
import { validateProjectFields } from "@/lib/project-validation";
import { getPublishedProjects, readAllProjects, uniqueSlug, writeAllProjects } from "@/lib/projects-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PROJECTS = 60;

export async function GET(request: Request) {
  const wantsAll = new URL(request.url).searchParams.get("all") === "1";

  if (wantsAll) {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { ok: false, message: "Sign in to view unpublished projects." },
        { status: 401 },
      );
    }
    const { getAllProjects } = await import("@/lib/projects-store");
    return NextResponse.json({ ok: true, projects: await getAllProjects() });
  }

  return NextResponse.json({ ok: true, projects: await getPublishedProjects() });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Invalid origin." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ ok: false, message: "Send a JSON body." }, { status: 400 });
  }

  const result = validateProjectFields(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: "INVALID", errors: result.errors },
      { status: 422 },
    );
  }

  const all = await readAllProjects();
  if (all.length >= MAX_PROJECTS) {
    return NextResponse.json(
      { ok: false, message: `The project limit is ${MAX_PROJECTS}. Delete one first.` },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const project = {
    id: randomUUID(),
    slug: uniqueSlug(result.fields.title, all),
    ...result.fields,
    sample: typeof body.sample === "boolean" ? body.sample : false,
    createdAt: now,
    updatedAt: now,
  };

  await writeAllProjects([project, ...all]);
  revalidatePath("/");

  return NextResponse.json({ ok: true, project }, { status: 201 });
}
