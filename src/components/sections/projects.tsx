import { ProjectsExplorer } from "@/components/sections/projects-explorer";
import { getFeaturedProjects } from "@/lib/projects-store";

/**
 * Server wrapper: reads the dashboard-managed project store and hands the
 * featured list to the interactive filter/preview UI.
 */
export async function Projects() {
  const projects = await getFeaturedProjects();

  return <ProjectsExplorer projects={projects} />;
}
