import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

interface ProjectsContentProps {
  baseUrl: string;
}

export function ProjectsContent({ baseUrl }: ProjectsContentProps) {
  const projects = siteContent.projects.filter((project) =>
    ["React project", "Vue project"].includes(project.category),
  );

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <article
          key={project.title}
          className={clsx(
            "project-cta flex items-start gap-5 px-0 py-5 first:pt-0 last:pb-0",
            index > 0 && "border-t border-white/8",
          )}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-ghost">
              <span>{project.category}</span>
              <span className="text-white/18">/</span>
              <span>{project.stack}</span>
            </div>
            <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.03em] text-text-strong sm:text-[1.6rem]">
              {project.title}
            </h3>
            <p className="mt-3 max-w-[60ch] text-base leading-7 text-text-muted">
              {project.description}
            </p>
          </div>
          <a
            href={`${baseUrl}${project.href}`}
            target="_blank"
            rel="noreferrer"
            className={clsx(panelVariants({ tone: "link" }), "shrink-0 self-start")}
          >
            <div className="min-w-0">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/70">
                Demo
              </p>
              <p className="mt-2 text-base font-medium text-text-strong">Open</p>
            </div>
            <span className="project-cta__icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/10">
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </span>
          </a>
        </article>
      ))}
    </div>
  );
}
