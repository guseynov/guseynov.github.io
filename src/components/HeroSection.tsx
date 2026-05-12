import type { MouseEventHandler } from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
} from "lucide-react";
import { HeroFidget } from "@/components/HeroFidget";
import { ButtonLink } from "@/components/ui";
import { siteContent } from "@/content/site";

const HERO_NAV_ITEMS = [
  { label: "About", href: "#intro" },
  { label: "Work", href: "#experience" },
  { label: "Experiments", href: "#capabilities" },
  { label: "Notes", href: "#proof" },
];

interface HeroSectionProps {
  id: string;
  cvHref: string;
  onPrimaryClick?: MouseEventHandler<HTMLAnchorElement>;
  onGithubClick?: MouseEventHandler<HTMLAnchorElement>;
  onCvClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function HeroHeader({
  cvHref,
  onPrimaryClick,
  onGithubClick,
  onCvClick,
}: HeroSectionProps) {
  return (
    <div className="sticky top-0 z-50 -mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center border-b border-white/8 bg-canvas/95 px-5 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <a
        href="#intro"
        aria-label="Home"
        className="font-mono text-[1.9rem] leading-none tracking-[-0.08em] text-text-strong sm:text-[2.35rem] lg:text-[2.8rem]"
      >
        AG.
      </a>
      <nav className="hidden justify-center lg:flex" aria-label="Primary">
        <div className="flex items-center gap-10 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-text-strong">
          {HERO_NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="transition-opacity duration-200 hover:opacity-70">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      <div className="ml-auto hidden items-center gap-4 lg:flex">
        <ButtonLink
          href={cvHref}
          tone="primary"
          className="px-5"
          download
          onClick={onCvClick}
          icon={<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />}
        >
          Resume
        </ButtonLink>
      </div>
    </div>
  );
}

export function HeroSection({ id, cvHref, onPrimaryClick, onGithubClick, onCvClick }: HeroSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="hero-shell relative overflow-visible border border-white/8 bg-canvas text-text-strong"
    >
      <div className="hero-grid relative grid min-h-[min(54rem,calc(100svh-2rem))] gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="relative grid flex-1 gap-7 lg:grid-cols-[minmax(0,1.06fr)_minmax(19rem,0.94fr)] lg:items-stretch lg:gap-8">
          <div className="relative flex h-full flex-col gap-7 lg:gap-8">
            <div className="space-y-5 pt-1">
              <div className="space-y-4">
                <h1
                  id={`${id}-title`}
                  className="text-display-hero max-w-[10ch] text-text-strong sm:max-w-[11ch] lg:max-w-[9ch]"
                >
                  {siteContent.profile.name}
                </h1>
              </div>
              <div className="max-w-[34rem] space-y-4">
                <p className="max-w-[28ch] font-mono text-[1.45rem] font-medium leading-[0.98] tracking-[-0.03em] text-text-strong sm:text-[1.9rem]">
                  Frontend Engineer
                </p>
                <p className="max-w-[31ch] text-[1rem] leading-7 tracking-[0.01em] text-text-muted sm:text-[1.08rem] sm:leading-8">
                  I build clear product surfaces, stronger UI systems, and modernization work
                  that holds up in production. Practical, sharp, and quiet when it needs to be.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href={`mailto:${siteContent.profile.email}`}
                  tone="primary"
                  className="px-5"
                  onClick={onPrimaryClick}
                  icon={<Mail aria-hidden="true" className="h-5 w-5 shrink-0" />}
                >
                  Email Alex
                </ButtonLink>
                <ButtonLink
                  href={siteContent.profile.githubUrl}
                  tone="secondary"
                  className="px-5"
                  target="_blank"
                  rel="noreferrer"
                  onClick={onGithubClick}
                  icon={<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />}
                >
                  GitHub
                </ButtonLink>
                <ButtonLink
                  href={cvHref}
                  tone="secondary"
                  className="px-5"
                  download
                  onClick={onCvClick}
                  icon={<Download aria-hidden="true" className="h-5 w-5 shrink-0" />}
                >
                  Download CV
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="flex h-full min-h-[20rem] flex-col justify-end lg:min-h-[34rem]">
            <div className="toy-stage relative h-full min-h-[20rem] rounded-none border border-white/10 bg-[rgba(255,255,255,0.02)]">
              <HeroFidget />
            </div>
          </div>
        </div>
        <a
          href={`mailto:${siteContent.profile.email}`}
          aria-label="Email Alex"
          className="hero-sticker absolute right-5 bottom-[7.75rem] z-40 hidden min-w-[11.5rem] -rotate-[2deg] rounded-[0.85rem] border border-white/14 bg-white px-6 py-4 text-text-inverse shadow-[0_18px_36px_rgba(0,0,0,0.22)] transition-transform duration-200 ease-out hover:-translate-y-0.5 md:block lg:right-10 lg:bottom-[8.75rem] lg:min-w-[12.5rem]"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-text-inverse/58">
            Let&apos;s build
          </p>
          <p className="mt-2.5 max-w-[7ch] font-display text-[1.35rem] leading-[0.92] tracking-[-0.075em] font-normal">
            Something great
          </p>
          <ArrowUpRight aria-hidden="true" className="absolute top-3.5 right-3.5 h-4 w-4 text-text-inverse" />
        </a>
      </div>
    </section>
  );
}
