import {
  DownloadIcon,
  EnvelopeIcon,
  LaunchIcon,
} from "@/components/SanityIcons";
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
    <div className="grid min-h-0 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.95fr)]">
      <div className="flex min-h-0 flex-col justify-between gap-8">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {INTRO_METRICS.map((item) => (
              <div
                key={item.label}
                className={panelVariants({ tone: "metric" })}
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-ghost">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-text-strong">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <p className="font-ui max-w-3xl text-lg leading-8 text-text-strong sm:text-xl">
            I focus on frontend work that affects how a product feels in use:
            interface clarity, system consistency, implementation quality, and
            the details people notice when they cannot name them.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={`mailto:${siteContent.profile.email}`}
            tone="primary"
            icon={
              <EnvelopeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
            }
          >
            Start a conversation
          </ButtonLink>
          <ButtonLink
            href={cvHref}
            download
            icon={
              <DownloadIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
            }
          >
            Download CV
          </ButtonLink>
        </div>
      </div>
      <div
        className={`${panelVariants({ tone: "surface" })} flex min-h-0 flex-col justify-between gap-6 overflow-hidden`}
      >
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
              Public links
            </p>
            <ul className="mt-5 space-y-4 text-sm text-text-muted">
              <li>
                <a
                  href={`mailto:${siteContent.profile.email}`}
                  className={metaLinkVariants()}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-ghost">
                    Email
                  </span>
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-accent"
                  />
                  <span className="min-w-0 truncate">
                    {siteContent.profile.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={siteContent.profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={metaLinkVariants()}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-ghost">
                    GitHub
                  </span>
                  <LaunchIcon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-accent"
                  />
                  <span className="min-w-0 truncate">github.com/guseynov</span>
                </a>
              </li>
              <li>
                <a
                  href={siteContent.profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={metaLinkVariants()}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-ghost">
                    LinkedIn
                  </span>
                  <LaunchIcon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-accent"
                  />
                  <span className="min-w-0 truncate">
                    linkedin.com/in/aguseynov
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="intro-loop-shell mt-5 rounded-[1rem] border border-white/6 bg-[#050505] p-4 shadow-[0_0_0_1px_rgba(0,153,255,0.12)]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#252525]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#252525]" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            </div>
            <div className="mt-5 space-y-4">
              <div className="intro-build-canvas">
                <div className="intro-abstract-guides" />
                <div className="intro-abstract-glow" />
                <div className="intro-abstract-frame">
                  <div className="intro-abstract-workspace">
                    <div className="intro-abstract-preview">
                      <div className="intro-abstract-preview-label" />
                      <div className="intro-abstract-preview-headline" />
                      <div className="intro-abstract-preview-body" />
                      <div className="intro-abstract-preview-actions">
                        <div className="intro-abstract-chip intro-abstract-chip--primary" />
                        <div className="intro-abstract-chip intro-abstract-chip--ghost" />
                      </div>
                    </div>
                    <div className="intro-abstract-inspector">
                      <div className="intro-abstract-inspector-line intro-abstract-inspector-line--short" />
                      <div className="intro-abstract-inspector-line intro-abstract-inspector-line--mid" />
                      <div className="intro-abstract-inspector-line intro-abstract-inspector-line--accent" />
                      <div className="intro-abstract-inspector-stack">
                        <div className="intro-abstract-inspector-card" />
                        <div className="intro-abstract-inspector-card" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="intro-abstract-module-row">
                  <div className="intro-abstract-module intro-abstract-module--one" />
                  <div className="intro-abstract-module intro-abstract-module--two" />
                  <div className="intro-abstract-module intro-abstract-module--three" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={panelVariants({ tone: "inset" })}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-ghost">
            Best fit
          </p>
          <p className="mt-3 text-base leading-7 text-text-muted">
            Teams that care about product detail, maintainable UI systems, and
            frontend decisions that hold up after launch.
          </p>
        </div>
      </div>
    </div>
  );
}
