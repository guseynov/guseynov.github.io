import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { siteContent } from "../../content/site";
import { trackCtaClick } from "../../lib/analytics";

export function ProjectsContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={[
          "grid gap-3 overflow-hidden md:grid-cols-2 xl:grid-cols-10",
          isExpanded
            ? "max-h-none"
            : "max-h-[54rem] md:max-h-[45rem] xl:max-h-[39rem]",
        ].join(" ")}
      >
        {siteContent.projects.map((project, index) => {
          const pairIndex = Math.floor(index / 2);
          const isFirstInPair = index % 2 === 0;
          const shouldLeadWide = pairIndex % 2 === 1;
          const shouldBeWide = isFirstInPair ? shouldLeadWide : !shouldLeadWide;

          return (
            <article
              key={project.repository}
              className={[
                "group flex min-h-80 min-w-0 flex-col justify-between rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition duration-200 ease-out hover:border-white/18 hover:bg-white/[0.055] sm:p-5",
                shouldBeWide ? "xl:col-span-7" : "xl:col-span-3",
              ].join(" ")}
            >
          <div className="min-w-0">
            <h3 className="break-words font-display text-[clamp(1.35rem,1.9vw,1.75rem)] leading-[1.04] text-text-strong">
              {project.name}
            </h3>
            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-ghost">
              {project.repository}
            </p>
            <p className="mt-4 text-sm leading-6 text-text-muted">
              {project.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/8 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-ghost"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2">
            <a
              href={project.liveHref}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackCtaClick({
                  label: `${project.name} live project`,
                  href: project.liveHref,
                  placement: "projects_live",
                })
              }
              className="control-tap-target inline-flex items-center justify-center gap-2 rounded-full bg-text-strong px-3 py-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.13em] text-text-inverse transition-colors duration-200 ease-out hover:bg-[oklch(0.9_0_0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              Live
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackCtaClick({
                  label: `${project.name} source code`,
                  href: project.href,
                  placement: "projects_code",
                })
              }
              className="control-tap-target inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.13em] text-text-strong transition-colors duration-200 ease-out hover:border-white/22 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              Code
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
            </article>
          );
        })}
      </div>

      <div
        className={[
          "flex justify-center px-4",
          isExpanded
            ? "mt-5"
            : "pointer-events-none absolute -left-px -right-px bottom-0 min-h-56 items-end bg-[linear-gradient(180deg,oklch(0.02_0_0/0),oklch(0.02_0_0/0.86)_36%,oklch(0.02_0_0)_72%)] pb-3",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="pointer-events-auto control-tap-target inline-flex min-h-12 items-center justify-center rounded-full bg-text-strong px-6 py-3 font-mono text-sm font-medium uppercase leading-none tracking-[0.14em] text-text-inverse transition-colors duration-200 ease-out hover:bg-[oklch(0.9_0_0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}
