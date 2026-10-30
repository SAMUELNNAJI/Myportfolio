"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import {
  PROJECT_CATEGORIES,
  visualForCategory,
  type Project,
  type ProjectCategory,
  type ProjectVisual,
} from "@/lib/project-types";
import { cn } from "@/lib/utils";

type FormState = {
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  stack: string;
  visual: ProjectVisual;
  accent: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  published: boolean;
  sample: boolean;
};

type ProjectFormProps = {
  project: Project | null;
  onSaved: (project: Project, created: boolean) => void;
  onCancel: () => void;
  onNotice: (tone: "ok" | "error", text: string) => void;
};

const visualOptions: { value: ProjectVisual; label: string }[] = [
  { value: "site", label: "Business site" },
  { value: "store", label: "Storefront" },
  { value: "landing", label: "Landing page" },
  { value: "app", label: "Web app" },
];

const accentPresets = ["#dc2626", "#ff7a45", "#f43f5e", "#fb923c", "#ffb347", "#e11d48"];

function initialValues(project: Project | null): FormState {
  if (project) {
    return {
      title: project.title,
      category: project.category,
      year: project.year,
      description: project.description,
      stack: project.stack.join(", "),
      visual: project.visual,
      accent: project.accent,
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      featured: project.featured,
      published: project.published,
      sample: project.sample,
    };
  }

  return {
    title: "",
    category: "Business",
    year: String(new Date().getFullYear()),
    description: "",
    stack: "HTML, CSS, JavaScript",
    visual: "site",
    accent: "#dc2626",
    liveUrl: "",
    repoUrl: "",
    featured: true,
    published: true,
    sample: false,
  };
}

export function ProjectForm({
  project,
  onSaved,
  onCancel,
  onNotice,
}: ProjectFormProps) {
  const [values, setValues] = useState<FormState>(() => initialValues(project));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setErrors({});

    try {
      const response = await fetch(
        project ? `/api/projects/${project.id}` : "/api/projects",
        {
          method: project ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
        project?: Project;
      };

      if (!response.ok || !data.project) {
        if (response.status === 401) {
          setMessage("Your session expired. Refresh the page and sign in again.");
        } else {
          setErrors(data.errors ?? {});
          setMessage(
            data.message ??
              (data.errors
                ? "Check the highlighted fields and try again."
                : "Could not save the project. Try again."),
          );
        }
        return;
      }

      onSaved(data.project, !project);
      onNotice(
        "ok",
        project
          ? `“${data.project.title}” updated.`
          : `“${data.project.title}” added to the site.`,
      );
    } catch {
      setMessage("Network error — the project was not saved. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (key: string) =>
    errors[key] ? (
      <p id={`project-${key}-error`} className="mt-1.5 text-[11px] text-red-300">
        {errors[key]}
      </p>
    ) : null;

  const describedBy = (key: string) =>
    errors[key] ? `project-${key}-error` : undefined;

  return (
    <form onSubmit={handleSubmit} className="card overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] bg-white/[0.02] px-5 py-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-soft/80">
            {project ? "Edit project" : "New project"}
          </p>
          <h2 className="mt-1 font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">
            {project ? project.title : "Add something you built"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.09] bg-white/[0.03] text-faint transition-colors hover:border-white/20 hover:text-ink"
          aria-label="Close project form"
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {message && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-400/25 bg-red-400/[0.07] px-4 py-3 text-[12px] leading-relaxed text-red-200"
          >
            <Icon name="alert" size={14} className="mt-px shrink-0" />
            {message}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="project-title" className="field-label">
              Project title
            </label>
            <input
              id="project-title"
              className="field mt-2"
              value={values.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="e.g. Riverside Dental Clinic"
              maxLength={80}
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={describedBy("title")}
              required
            />
            {fieldError("title")}
          </div>

          <div>
            <label htmlFor="project-category" className="field-label">
              Category
            </label>
            <input
              id="project-category"
              className="field mt-2"
              list="project-category-options"
              value={values.category}
              onChange={(event) => {
                const category = event.target.value;
                setField("category", category);
                if ((PROJECT_CATEGORIES as readonly string[]).includes(category)) {
                  setField("visual", visualForCategory(category as ProjectCategory));
                }
              }}
              placeholder="e.g. Business, Marketing, SaaS"
              maxLength={40}
              aria-invalid={errors.category ? true : undefined}
              aria-describedby={describedBy("category")}
            />
            <datalist id="project-category-options">
              {PROJECT_CATEGORIES.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            {fieldError("category")}
          </div>

          <div>
            <label htmlFor="project-year" className="field-label">
              Year / label
            </label>
            <input
              id="project-year"
              className="field mt-2"
              value={values.year}
              onChange={(event) => setField("year", event.target.value)}
              placeholder="2026"
              maxLength={16}
              aria-invalid={errors.year ? true : undefined}
              aria-describedby={describedBy("year")}
            />
            {fieldError("year")}
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="project-description" className="field-label">
                Description
              </label>
              <span className="font-mono text-[9px] text-faint">
                {values.description.length}/500
              </span>
            </div>
            <textarea
              id="project-description"
              className="field mt-2 min-h-24 resize-y"
              value={values.description}
              onChange={(event) => setField("description", event.target.value)}
              placeholder="What is the site, who is it for, and what did you build?"
              maxLength={500}
              rows={4}
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={describedBy("description")}
              required
            />
            {fieldError("description")}
          </div>

          <div>
            <label htmlFor="project-stack" className="field-label">
              Technology stack
            </label>
            <input
              id="project-stack"
              className="field mt-2"
              value={values.stack}
              onChange={(event) => setField("stack", event.target.value)}
              placeholder="HTML, CSS, JavaScript"
              aria-invalid={errors.stack ? true : undefined}
              aria-describedby={describedBy("stack")}
            />
            <p className="mt-1.5 text-[10.5px] text-faint">
              Comma separated, up to 10 tags.
            </p>
            {fieldError("stack")}
          </div>

          <div>
            <label htmlFor="project-visual" className="field-label">
              Sample mockup style
            </label>
            <select
              id="project-visual"
              className="field mt-2"
              value={values.visual}
              onChange={(event) =>
                setField("visual", event.target.value as ProjectVisual)
              }
            >
              {visualOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[10.5px] text-faint">
              Used only when a live URL is not set.
            </p>
          </div>

          <div>
            <label htmlFor="project-live" className="field-label">
              Live URL
            </label>
            <input
              id="project-live"
              type="url"
              className="field mt-2"
              value={values.liveUrl}
              onChange={(event) => setField("liveUrl", event.target.value)}
              placeholder="https://example.com"
              aria-invalid={errors.liveUrl ? true : undefined}
              aria-describedby={describedBy("liveUrl")}
            />
            <p className="mt-1.5 text-[10.5px] text-faint">
              This is embedded as the live desktop/mobile preview.
            </p>
            {fieldError("liveUrl")}
          </div>

          <div>
            <label htmlFor="project-repo" className="field-label">
              Source code URL <span className="normal-case text-faint/60">(optional)</span>
            </label>
            <input
              id="project-repo"
              type="url"
              className="field mt-2"
              value={values.repoUrl}
              onChange={(event) => setField("repoUrl", event.target.value)}
              placeholder="https://github.com/you/project"
              aria-invalid={errors.repoUrl ? true : undefined}
              aria-describedby={describedBy("repoUrl")}
            />
            {fieldError("repoUrl")}
          </div>

          <div>
            <label htmlFor="project-accent" className="field-label">
              Accent colour
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input
                id="project-accent"
                type="color"
                value={values.accent}
                onChange={(event) => setField("accent", event.target.value)}
                className="h-11 w-14 cursor-pointer rounded-lg border border-white/[0.09] bg-white/[0.035] p-1"
              />
              <span className="font-mono text-[11px] uppercase text-faint">
                {values.accent}
              </span>
              <div className="flex gap-1">
                {accentPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setField("accent", preset)}
                    aria-label={`Use accent ${preset}`}
                    aria-pressed={values.accent.toLowerCase() === preset}
                    className={cn(
                      "h-5 w-5 rounded-full border transition-transform hover:scale-110",
                      values.accent.toLowerCase() === preset
                        ? "border-white/70 ring-2 ring-white/20"
                        : "border-white/20",
                    )}
                    style={{ backgroundColor: preset }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <fieldset className="rounded-xl border border-white/[0.08] bg-white/[0.018] px-4 py-3.5">
          <legend className="field-label px-1">Visibility</legend>
          <div className="mt-1 grid gap-3 sm:grid-cols-3">
            <label className="flex cursor-pointer items-start gap-2.5 text-[12px] text-muted">
              <input
                type="checkbox"
                checked={values.published}
                onChange={(event) => setField("published", event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#dc2626]"
              />
              <span>
                <span className="block font-medium text-ink">Published</span>
                Visible on the portfolio.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2.5 text-[12px] text-muted">
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(event) => setField("featured", event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#dc2626]"
              />
              <span>
                <span className="block font-medium text-ink">Featured</span>
                Shows in the homepage grid.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2.5 text-[12px] text-muted">
              <input
                type="checkbox"
                checked={values.sample}
                onChange={(event) => setField("sample", event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#dc2626]"
              />
              <span>
                <span className="block font-medium text-ink">Sample layout</span>
                Adds an honest sample badge.
              </span>
            </label>
          </div>
        </fieldset>

        <div className="flex flex-col-reverse gap-2 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.035] px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-white/25 hover:bg-white/[0.06]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#dc2626,#d92626_55%,#a81414)] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_-14px_rgba(255,59,59,0.9)] transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-55"
          >
            {submitting ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                />
                Saving…
              </>
            ) : (
              <>
                <Icon name={project ? "check" : "plus"} size={15} />
                {project ? "Save changes" : "Add project"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
