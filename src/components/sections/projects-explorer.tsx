"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProjectPreview } from "@/components/sections/project-preview";
import { LinkOrPlaceholder } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/lib/project-types";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");
  const [showCount, setShowCount] = useState(4);

  const filters = useMemo<Filter[]>(() => {
    const present = new Set(projects.map((project) => project.category));
    const known = PROJECT_CATEGORIES.filter((category) => present.has(category));
    const custom = [...present].filter((category) => !(PROJECT_CATEGORIES as readonly string[]).includes(category));
    return ["All", ...known, ...custom];
  }, [projects]);

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [projects, active],
  );

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const countFor = (filter: Filter) =>
    filter === "All"
      ? projects.length
      : projects.filter((project) => project.category === filter).length;

  const hasSamples = projects.some((project) => project.sample);

  // Reset pagination when the active filter changes.
  useEffect(() => {
    setShowCount(4);
  }, [active]);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section section-rule">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow="Featured projects"
          title="Selected work, built end to end."
          description="Live previews of sites I've built. Use the desktop and mobile buttons on any card to see how the layout responds."
        />

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-[12px] leading-relaxed text-faint">
          <Icon name="info" size={15} className="mt-px shrink-0 text-accent-soft/80" />
          <p>
            <span className="font-medium text-muted">Live previews.</span>{" "}
            Each project is loaded from the URL added in the{" "}
            <Link
              href="/dashboard"
              className="font-medium text-ink underline decoration-white/25 underline-offset-2 transition-colors hover:text-accent-soft"
            >
              dashboard
            </Link>
            .{" "}
            {hasSamples
              ? "Sample layouts show a generated mockup until a live URL is added."
              : "A few sites block embedding — the open link always works."}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.015] px-6 py-14 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.03] text-accent-soft">
              <Icon name="dashboard" size={20} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
              No projects published yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
              Add a project and its live URL from the dashboard — it will appear
              here automatically.
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent/20"
            >
              Open dashboard
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap gap-1.5"
              >
                {filters.map((filter) => {
                  const isActive = active === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActive(filter)}
                      aria-pressed={isActive}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-300",
                        isActive
                          ? "border-accent/40 bg-accent/[0.14] text-white"
                          : "border-white/[0.08] bg-white/[0.02] text-faint hover:border-white/20 hover:text-ink",
                      )}
                    >
                      {filter}
                      <span
                        className={cn(
                          "text-[9px]",
                          isActive ? "text-accent-soft" : "text-faint/60",
                        )}
                      >
                        {String(countFor(filter)).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Showing {String(visible.length).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
            </div>

            <p aria-live="polite" className="sr-only">
              {visible.length} {visible.length === 1 ? "project" : "projects"} shown
              {active === "All" ? "" : ` in ${active}`}.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {visible.map((project, index) => (
                <Reveal key={`${active}-${project.id}`} delay={index * 60}>
                  <ProjectCard project={project} index={index} />
                </Reveal>
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowCount((c) => c + 4)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-white/25 hover:bg-white/[0.06]"
                >
                  See more projects
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="card card-interactive group flex h-full flex-col overflow-hidden">
      <ProjectPreview
        title={project.title}
        liveUrl={project.liveUrl}
        visual={project.visual}
        accent={project.accent}
        domain={`${project.slug}.com`}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-accent-soft/80">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            {project.category}
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
            {project.year}
          </span>
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
            {project.title}
          </h3>
          <span className="mt-1 shrink-0 font-mono text-[9px] tracking-[0.16em] text-white/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>

        {project.sample && (
          <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed border-white/[0.14] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
            <Icon name="info" size={10} />
            Sample layout
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-4">
          <LinkOrPlaceholder
            href={project.liveUrl}
            label={project.liveUrl ? "Visit live site" : "Live URL pending"}
            icon="external"
            hint={`Add a live URL for ${project.title} in the dashboard.`}
          />
          <LinkOrPlaceholder
            href={project.repoUrl}
            label="Source code"
            icon="github"
            hint={`Add a repository URL for ${project.title} in the dashboard.`}
          />
        </div>
      </div>
    </article>
  );
}
