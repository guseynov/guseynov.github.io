import clsx from "clsx";
import { DownloadIcon, EnvelopeIcon, LaunchIcon } from "@/components/SanityIcons";
import { ButtonLink, metaLinkVariants, panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

const INTRO_METRICS = [
  { label: "Focus", value: "UI architecture" },
  { label: "Stack", value: "React and Vue" },
  { label: "Strength", value: "Quality at speed" },
];

interface IntroContentProps {
  cvHref: string;
}

export function IntroContent({ cvHref }: IntroContentProps) {
  return (
    <div className="grid min-h-0 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.9fr)]">
      <div className="flex min-h-0 flex-col justify-between gap-8">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {INTRO_METRICS.map((item) => (
              <div key={item.label} className={panelVariants({ tone: "metric" })}>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-text-strong">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="max-w-3xl text-lg leading-8 text-text-strong sm:text-xl">
            I focus on frontend work that affects how a product feels in use: interface
            clarity, system consistency, implementation quality, and the details people notice
            when they cannot name them.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={`mailto:${siteContent.profile.email}`}
            tone="primary"
            icon={<EnvelopeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />}
          >
            Start a conversation
          </ButtonLink>
          <ButtonLink
            href={cvHref}
            download
            icon={<DownloadIcon aria-hidden="true" className="h-5 w-5 shrink-0" />}
          >
            Download CV
          </ButtonLink>
        </div>
      </div>
      <div
        className={clsx(panelVariants({ tone: "surface" }), "flex min-h-0 flex-col justify-between gap-6")}
      >
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
            Public links
          </p>
          <ul className="mt-5 space-y-4 text-sm text-text-muted">
            <li>
              <a href={`mailto:${siteContent.profile.email}`} className={metaLinkVariants()}>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                  Email
                </span>
                <EnvelopeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
                <span className="min-w-0 truncate">{siteContent.profile.email}</span>
              </a>
            </li>
            <li>
              <a
                href={siteContent.profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={metaLinkVariants()}
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                  GitHub
                </span>
                <LaunchIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
                <span className="min-w-0 truncate">github.com/guseynov</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={panelVariants({ tone: "inset" })}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
            Best fit
          </p>
          <p className="mt-3 text-base leading-7 text-text-strong">
            Teams that care about product detail, maintainable UI systems, and frontend
            decisions that hold up after launch.
          </p>
        </div>
      </div>
    </div>
  );
}
