import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAuthenticated, sameOrigin } from "@/lib/admin-auth";
import { EDITABLE_FIELDS, validateProjectFields } from "@/lib/project-validation";
import { getProjectById, readAllProjects, writeAllProjects } from "@/lib/projects-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Invalid origin." }, { status: 403 });
  }

  const { id } = await params;
  const existing = await getProjectById(id);
  if (!existing) {
    return NextResponse.json({ ok: false, message: "Project not found." }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ ok: false, message: "Send a JSON body." }, { status: 400 });
  }

  const candidate: Record<string, unknown> = { ...existing };
  for (const field of EDITABLE_FIELDS) {
    if (field in body) candidate[field] = body[field];
  }

  const result = validateProjectFields(candidate);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: "INVALID", errors: result.errors },
      { status: 422 },
    );
  }

  const updated = {
    ...existing,
    ...result.fields,
    sample: typeof body.sample === "boolean" ? body.sample : existing.sample,
    updatedAt: new Date().toISOString(),
  };

  const all = await readAllProjects();
  await writeAllProjects(all.map((project) => (project.id === id ? updated : project)));
  revalidatePath("/");

  return NextResponse.json({ ok: true, project: updated });
}

export async function DELETE(request: Request, { params }: Context) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Invalid origin." }, { status: 403 });
  }

  const { id } = await params;
  const all = await readAllProjects();
  if (!all.some((project) => project.id === id)) {
    return NextResponse.json({ ok: false, message: "Project not found." }, { status: 404 });
  }

  await writeAllProjects(all.filter((project) => project.id !== id));
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
