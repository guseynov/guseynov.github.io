import clsx from "clsx";
import { LaunchIcon } from "@/components/SanityIcons";
import { chipVariants, panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

interface ProjectsContentProps {
  baseUrl: string;
}

const PROJECT_GROUPS = [
  {
    title: "React and Vue Projects",
    summary:
      "Interactive apps and frontend experiments built with component frameworks and bundled as standalone demos.",
    categories: new Set(["React project", "Vue project"]),
  },
] as const;

export function ProjectsContent({ baseUrl }: ProjectsContentProps) {
  return (
    <div className="space-y-8">
      {PROJECT_GROUPS.map((group) => {
        const projects = siteContent.projects.filter((project) =>
          group.categories.has(project.category),
        );

        if (projects.length === 0) {
          return null;
        }

        return (
          <section key={group.title} className="space-y-4">
            <header className={panelVariants({ tone: "subtle" })}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
                Portfolio section
              </p>
              <h3 className="mt-4 text-display-title text-[1.85rem] text-text-strong">
                {group.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-text-muted">
                {group.summary}
              </p>
            </header>
            <div className="grid gap-4 xl:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className={clsx(panelVariants({ tone: "surface" }), "flex h-full flex-col")}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={chipVariants()}>{project.category}</span>
                    <span className={chipVariants()}>{project.stack}</span>
                  </div>
                  <h4 className="mt-5 text-display-title text-[1.85rem] text-text-strong">
                    {project.title}
                  </h4>
                  <p className="mt-4 flex-1 text-base leading-7 text-text-muted">
                    {project.description}
                  </p>
                  <a
                    href={`${baseUrl}${project.href}`}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx("project-cta mt-6", panelVariants({ tone: "link" }))}
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/70">
                        Launch demo
                      </p>
                      <p className="mt-2 text-lg font-medium text-text-strong">Open project</p>
                      <p className="mt-1 truncate text-sm text-white/55">{project.href}</p>
                    </div>
                    <span className="project-cta__icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/10">
                      <LaunchIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
