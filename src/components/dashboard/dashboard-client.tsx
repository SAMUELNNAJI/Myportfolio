"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoginPanel } from "@/components/dashboard/login-panel";
import { ProjectForm } from "@/components/dashboard/project-form";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/content/site";
import { hostnameOf, type Project } from "@/lib/project-types";
import { cn } from "@/lib/utils";

type SessionState = "loading" | "anon" | "authed";
type Notice = { tone: "ok" | "error"; text: string };

export function DashboardClient() {
  const [session, setSession] = useState<SessionState>("loading");
  const [configured, setConfigured] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);
    setLoadError("");
    try {
      const response = await fetch("/api/projects?all=1", { cache: "no-store" });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        projects?: Project[];
        message?: string;
      };
      if (response.status === 401) {
        setSession("anon");
        return;
      }
      if (!response.ok || !data.projects) {
        setLoadError(data.message ?? "Could not load your projects.");
        return;
      }
      setProjects(data.projects);
    } catch {
      setLoadError("Network error — could not load your projects.");
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json().catch(() => ({})))
      .then((data: { authenticated?: boolean; configured?: boolean }) => {
        if (cancelled) return;
        setConfigured(data.configured !== false);
        setSession(data.authenticated ? "authed" : "anon");
      })
      .catch(() => {
        if (!cancelled) setSession("anon");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (session === "authed") {
      void loadProjects();
    }
  }, [session, loadProjects]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 7000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const stats = useMemo(
    () => ({
      total: projects.length,
      published: projects.filter((project) => project.published).length,
      featured: projects.filter((project) => project.featured && project.published).length,
      live: projects.filter((project) => project.liveUrl).length,
    }),
    [projects],
  );

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
    setConfirmId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openEdit(project: Project) {
    setEditing(project);
    setFormOpen(true);
    setConfirmId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSaved(project: Project) {
    setProjects((current) => {
      const exists = current.some((item) => item.id === project.id);
      return exists
        ? current.map((item) => (item.id === project.id ? project : item))
        : [project, ...current];
    });
    setFormOpen(false);
    setEditing(null);
  }

  async function toggleField(project: Project, field: "published" | "featured") {
    setBusyId(project.id);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !project[field] }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        project?: Project;
        message?: string;
      };
      if (!response.ok || !data.project) {
        if (response.status === 401) {
          setSession("anon");
          return;
        }
        setNotice({
          tone: "error",
          text: data.message ?? "Could not update the project.",
        });
        return;
      }
      handleSaved(data.project);
      setNotice({
        tone: "ok",
        text: `${data.project.title} is now ${
          field === "published"
            ? data.project.published
              ? "published"
              : "a draft"
            : data.project.featured
              ? "featured"
              : "not featured"
        }.`,
      });
    } catch {
      setNotice({ tone: "error", text: "Network error — nothing was changed." });
    } finally {
      setBusyId(null);
    }
  }

  async function deleteProject(project: Project) {
    setBusyId(project.id);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      if (!response.ok) {
        if (response.status === 401) {
          setSession("anon");
          return;
        }
        setNotice({
          tone: "error",
          text: data.message ?? "Could not delete the project.",
        });
        return;
      }
      setProjects((current) => current.filter((item) => item.id !== project.id));
      setConfirmId(null);
      if (editing?.id === project.id) {
        setEditing(null);
        setFormOpen(false);
      }
      setNotice({ tone: "ok", text: `“${project.title}” deleted.` });
    } catch {
      setNotice({ tone: "error", text: "Network error — the project was not deleted." });
    } finally {
      setBusyId(null);
    }
  }

  async function signOut() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setSession("anon");
      setProjects([]);
      setFormOpen(false);
      setEditing(null);
      setNotice(null);
    }
  }

  if (session === "loading") {
    return (
      <div className="grid min-h-svh place-items-center px-5">
        <span className="flex flex-col items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-accent"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            Checking session
          </span>
        </span>
      </div>
    );
  }

  if (session === "anon") {
    return <LoginPanel configured={configured} onSuccess={() => setSession("authed")} />;
  }

  return (
    <div className="min-h-svh pb-20">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-canvas/85 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-xl focus-visible:outline-offset-4"
              aria-label={`${siteConfig.brand} — back to the portfolio`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-[linear-gradient(145deg,rgba(255,59,59,0.28),rgba(255,138,61,0.08))]">
                <span className="font-mono text-[11px] font-semibold tracking-tighter text-accent-soft">
                  {"</>"}
                </span>
              </span>
              <span className="font-display text-[14px] font-semibold tracking-[-0.02em] text-ink">
                {siteConfig.brand}
              </span>
            </Link>
            <span aria-hidden="true" className="h-4 w-px bg-white/10" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-accent-soft">
              <Icon name="dashboard" size={11} />
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-muted transition-colors hover:border-white/25 hover:text-ink sm:inline-flex"
            >
              <Icon name="external" size={13} />
              View site
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              <Icon name="log-out" size={13} />
              <span className="hidden sm:inline">Sign out</span>
              <span className="sr-only sm:hidden">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container-page pt-8 lg:pt-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              Private area
            </p>
            <h1 className="mt-3 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[2.4rem]">
              Project dashboard
            </h1>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted">
              Add a site you built, paste its live URL, and it appears in the
              featured grid with desktop and mobile previews.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreate}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#dc2626,#d92626_55%,#a81414)] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_-14px_rgba(255,59,59,0.9)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <Icon name="plus" size={15} />
            New project
          </button>
        </div>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[12.5px] leading-relaxed",
              notice.tone === "ok"
                ? "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-100/90"
                : "border-red-400/25 bg-red-400/[0.07] text-red-200",
            )}
          >
            <Icon
              name={notice.tone === "ok" ? "check-circle" : "alert"}
              size={15}
              className="mt-px shrink-0"
            />
            <span className="flex-1">{notice.text}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="grid h-5 w-5 place-items-center rounded text-current opacity-60 transition-opacity hover:opacity-100"
              aria-label="Dismiss message"
            >
              <Icon name="close" size={12} />
            </button>
          </div>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total", value: stats.total, icon: "dashboard" as const },
            { label: "Published", value: stats.published, icon: "eye" as const },
            { label: "Featured", value: stats.featured, icon: "star" as const },
            { label: "With live URL", value: stats.live, icon: "external" as const },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
            >
              <dt className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
                <Icon name={stat.icon} size={11} className="text-accent-soft/70" />
                {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-[1.45rem] font-semibold tracking-[-0.03em] text-ink">
                {String(stat.value).padStart(2, "0")}
              </dd>
            </div>
          ))}
        </dl>

        {formOpen && (
          <div className="mt-6">
            <ProjectForm
              key={editing?.id ?? "new"}
              project={editing}
              onSaved={handleSaved}
              onCancel={() => {
                setFormOpen(false);
                setEditing(null);
              }}
              onNotice={(tone, text) => setNotice({ tone, text })}
            />
          </div>
        )}

        <section aria-labelledby="project-list-title" className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <h2
              id="project-list-title"
              className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint"
            >
              All projects
            </h2>
            {loadingProjects && (
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 animate-spin rounded-full border border-white/20 border-t-accent"
                />
                Syncing
              </span>
            )}
          </div>

          {loadError ? (
            <div className="mt-3 rounded-xl border border-red-400/25 bg-red-400/[0.06] px-4 py-4 text-[12.5px] text-red-200">
              <p>{loadError}</p>
              <button
                type="button"
                onClick={() => void loadProjects()}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11.5px] font-medium text-ink transition-colors hover:border-white/30"
              >
                <Icon name="refresh" size={12} />
                Try again
              </button>
            </div>
          ) : projects.length === 0 && !loadingProjects ? (
            <div className="mt-3 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.015] px-6 py-12 text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.03] text-accent-soft">
                <Icon name="plus" size={19} />
              </span>
              <h3 className="mt-3 font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                No projects yet
              </h3>
              <p className="mx-auto mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-muted">
                Add the first one and its live URL — the homepage updates as soon
                as you save.
              </p>
              <button
                type="button"
                onClick={openCreate}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-accent/20"
              >
                <Icon name="plus" size={13} />
                Add a project
              </button>
            </div>
          ) : (
            <ul className="mt-3 space-y-3">
              {projects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  busy={busyId === project.id}
                  confirming={confirmId === project.id}
                  onEdit={() => openEdit(project)}
                  onToggle={(field) => void toggleField(project, field)}
                  onAskDelete={() => setConfirmId(project.id)}
                  onCancelDelete={() => setConfirmId(null)}
                  onDelete={() => void deleteProject(project)}
                />
              ))}
            </ul>
          )}
        </section>

        <p className="mt-10 flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.015] px-4 py-3 text-[11px] leading-relaxed text-faint">
          <Icon name="info" size={13} className="mt-px shrink-0 text-accent-soft/60" />
          Projects are stored in{" "}
          <code className="font-mono text-[10.5px] text-muted">data/projects.json</code>{" "}
          on the server. Back that file up, and make sure your host has a
          persistent filesystem — serverless read-only hosts need a database.
        </p>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  busy,
  confirming,
  onEdit,
  onToggle,
  onAskDelete,
  onCancelDelete,
  onDelete,
}: {
  project: Project;
  busy: boolean;
  confirming: boolean;
  onEdit: () => void;
  onToggle: (field: "published" | "featured") => void;
  onAskDelete: () => void;
  onCancelDelete: () => void;
  onDelete: () => void;
}) {
  const liveHost = project.liveUrl ? hostnameOf(project.liveUrl) : "";

  return (
    <li className="card overflow-hidden rounded-xl">
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[1.02rem] font-semibold tracking-[-0.02em] text-ink">
                {project.title}
              </h3>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em]",
                  project.published
                    ? "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200/90"
                    : "border-amber-300/25 bg-amber-300/[0.08] text-amber-100/90",
                )}
              >
                {project.published ? "Published" : "Draft"}
              </span>
              {project.featured && (
                <span className="rounded-full border border-accent/25 bg-accent/[0.08] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-accent-soft">
                  Featured
                </span>
              )}
              {project.sample && (
                <span className="rounded-full border border-white/[0.12] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
                  Sample
                </span>
              )}
            </div>

            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
              {project.category} · {project.year} · {project.stack.join(" / ")}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onToggle("featured")}
              aria-pressed={project.featured}
              disabled={busy}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10.5px] font-medium transition-colors disabled:opacity-50",
                project.featured
                  ? "border-accent/35 bg-accent/10 text-accent-soft"
                  : "border-white/[0.1] bg-white/[0.02] text-faint hover:text-ink",
              )}
            >
              <Icon name="star" size={11} />
              {project.featured ? "Featured" : "Feature"}
            </button>
            <button
              type="button"
              onClick={() => onToggle("published")}
              aria-pressed={project.published}
              disabled={busy}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10.5px] font-medium transition-colors disabled:opacity-50",
                project.published
                  ? "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-200/90"
                  : "border-white/[0.1] bg-white/[0.02] text-faint hover:text-ink",
              )}
            >
              <Icon name={project.published ? "eye" : "eye-off"} size={11} />
              {project.published ? "Live" : "Hidden"}
            </button>
          </div>
        </div>

        <p className="line-clamp-2 text-[12.5px] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1.5">
            {liveHost ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-[16rem] items-center gap-1.5 text-[11px] text-accent-soft transition-colors hover:text-ink"
              >
                <Icon name="external" size={11} className="shrink-0" />
                <span className="truncate">{liveHost}</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-faint">
                <Icon name="info" size={11} />
                No live URL — showing a mockup
              </span>
            )}
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint/70">
              Updated {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {confirming ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-red-200">
                Delete permanently?
              </span>
              <button
                type="button"
                onClick={onCancelDelete}
                className="rounded-full border border-white/[0.12] px-3 py-1.5 text-[10.5px] font-medium text-muted transition-colors hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={busy}
                className="rounded-full border border-red-400/40 bg-red-400/10 px-3 py-1.5 text-[10.5px] font-semibold text-red-200 transition-colors hover:bg-red-400/20 disabled:opacity-50"
              >
                {busy ? "Deleting…" : "Delete"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-[10.5px] font-medium text-muted transition-colors hover:border-white/25 hover:text-ink"
              >
                <Icon name="edit" size={11} />
                Edit
              </button>
              <button
                type="button"
                onClick={onAskDelete}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-[10.5px] font-medium text-muted transition-colors hover:border-red-400/40 hover:text-red-200"
              >
                <Icon name="trash" size={11} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
