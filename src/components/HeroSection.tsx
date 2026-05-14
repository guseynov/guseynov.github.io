import { useEffect, useState, type MouseEventHandler } from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { HeroFidget } from "@/components/HeroFidget";
import { ButtonLink, iconButtonVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

const HERO_NAV_ITEMS = [
  { label: "Overview", href: "#intro" },
  { label: "Strengths", href: "#proof" },
  { label: "Skills", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

interface HeroSectionProps {
  id: string;
  cvHref: string;
  onEmailClick?: MouseEventHandler<HTMLAnchorElement>;
  onCvClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function HeroHeader({
  cvHref,
  onCvClick,
  onEmailClick,
}: Pick<HeroSectionProps, "cvHref" | "onCvClick" | "onEmailClick">) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = "mobile-site-menu";

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="sticky top-4 z-50 rounded-[0.8rem] border border-white/10 bg-[color:var(--color-surface-frosted)] px-5 py-4 shadow-[inset_0_0.5px_0_0.5px_oklch(0.95_0.008_248_/_0.08),0_18px_40px_oklch(0.1_0.012_248_/_0.26)] backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center">
      <a href="#intro" aria-label="Home" className="group flex min-w-0 items-center gap-3">
        <span className="font-mono text-[1.9rem] leading-none tracking-[0em] text-text-strong transition-opacity duration-200 group-hover:opacity-70 sm:text-[2.35rem] lg:text-[2.8rem]">
          AG.
        </span>
      </a>
      <nav className="hidden justify-center lg:flex" aria-label="Primary">
        <div className="flex items-center gap-8 font-mono text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-text-strong">
          {HERO_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-opacity duration-200 hover:opacity-70"
            >
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
      <button
        type="button"
        className={`${iconButtonVariants()} ml-auto lg:hidden`}
        aria-expanded={isMenuOpen}
        aria-controls={mobileMenuId}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        {isMenuOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      <div
        id={mobileMenuId}
        className={[
          "absolute left-0 right-0 top-[calc(100%+0.75rem)] lg:hidden",
          isMenuOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="rounded-[1rem] border border-white/10 bg-[color:var(--color-surface-frosted)] p-4 shadow-[inset_0_0.5px_0_0.5px_oklch(0.95_0.008_248_/_0.08),0_24px_48px_oklch(0.1_0.012_248_/_0.28)] backdrop-blur-sm">
          <nav aria-label="Mobile primary" className="grid gap-1">
            {HERO_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-[0.85rem] border border-transparent px-3 py-3 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-text-strong transition-colors duration-200 ease-out hover:border-white/10 hover:bg-white/[0.04]"
              >
                <span>{item.label}</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
          </nav>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ButtonLink
              href={`mailto:${siteContent.profile.email}`}
              tone="secondary"
              className="w-full justify-center"
              onClick={(event) => {
                setIsMenuOpen(false);
                onEmailClick?.(event);
              }}
              icon={<Mail aria-hidden="true" className="h-5 w-5 shrink-0" />}
            >
              Email me
            </ButtonLink>
            <ButtonLink
              href={cvHref}
              tone="primary"
              className="w-full justify-center"
              download
              onClick={(event) => {
                setIsMenuOpen(false);
                onCvClick?.(event);
              }}
              icon={<Download aria-hidden="true" className="h-4 w-4 shrink-0" />}
            >
              Resume
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export function HeroSection({ id, cvHref, onEmailClick, onCvClick }: HeroSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="hero-shell relative min-h-[min(54rem,calc(100svh-2rem))] overflow-visible bg-canvas text-text-strong"
    >
      <div className="hero-fidget-shell">
        <HeroFidget />
      </div>
      <div className="pointer-events-none relative z-20 mx-auto grid w-full max-w-[1280px] px-5 pb-5 pt-14 sm:px-6 sm:pb-6 sm:pt-16 lg:px-10 lg:pb-8 lg:pt-20 xl:px-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(12rem,0.18fr)_minmax(0,0.82fr)] lg:items-stretch lg:gap-10">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="flex h-full flex-col gap-8 lg:gap-10">
            <div className="space-y-6 pt-1">
              <div className="space-y-4">
                <h1
                  id={`${id}-title`}
                  className="text-display-hero max-w-[10ch] text-text-strong sm:max-w-[11ch] lg:max-w-[9ch]"
                >
                  {siteContent.profile.name}
                </h1>
              </div>
              <p className="max-w-[20ch] font-mono text-[1rem] font-medium leading-[1.05] tracking-[0.06em] text-text-muted sm:max-w-[22ch] sm:text-[1.05rem] lg:text-[1.1rem]">
                Frontend Engineer
              </p>
            </div>

            <div className="pointer-events-auto mt-1 space-y-5">
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href={`mailto:${siteContent.profile.email}`}
                  tone="secondary"
                  className="px-5"
                  onClick={onEmailClick}
                  icon={<Mail aria-hidden="true" className="h-5 w-5 shrink-0" />}
                >
                  Email me
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
        </div>
      </div>
    </section>
  );
}
