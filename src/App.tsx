import { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";
import { BottomSlider } from "@/components/BottomSlider";
import { MobileProgress } from "@/components/MobileProgress";
import { DownloadIcon, EnvelopeIcon, LaunchIcon } from "@/components/SanityIcons";
import { SectionCard } from "@/components/SectionCard";
import { ButtonLink } from "@/components/ui";
import { CapabilitiesContent } from "@/components/sections/CapabilitiesContent";
import { ContactContent } from "@/components/sections/ContactContent";
import { ExperienceContent } from "@/components/sections/ExperienceContent";
import { IntroAside } from "@/components/sections/IntroAside";
import { IntroContent } from "@/components/sections/IntroContent";
import { ProofContent } from "@/components/sections/ProofContent";
import {
  SectionId,
  siteContent,
  type SectionId as SectionIdValue,
} from "@/content/site";

const DESKTOP_CARD_CLASS =
  "lg:flex lg:min-h-0 lg:flex-none lg:basis-[min(1200px,calc(100vw-10rem))]";
const DESKTOP_CAROUSEL_OPTIONS: EmblaOptionsType = {
  align: "center",
  containScroll: false,
  skipSnaps: true,
  duration: 30,
};

const SECTION_INDEX_LABELS: Record<SectionIdValue, string> = {
  [SectionId.Intro]: "01 / INTRO",
  [SectionId.Capabilities]: "02 / SKILLS",
  [SectionId.Experience]: "03 / EXPERIENCE",
  [SectionId.Proof]: "04 / PROOF",
  [SectionId.Contact]: "05 / CONTACT",
};

interface SectionContentConfig {
  title: string;
  summary: string;
  indexLabel: string;
  aside?: ReactNode;
  content: ReactNode;
}

interface ActionLinkConfig {
  href: string;
  label: string;
  tone: "primary" | "secondary";
  icon?: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean;
}

function clampIndex(index: number, total: number) {
  return Math.max(0, Math.min(total - 1, index));
}

function clampProgress(progress: number) {
  return Math.max(0, Math.min(1, progress));
}

function getTargetLocationFromProgress(api: EmblaCarouselType, progress: number) {
  const engine = api.internalEngine();
  const clampedProgress = clampProgress(progress);

  return engine.limit.max + (engine.limit.min - engine.limit.max) * clampedProgress;
}

function getNearestIndexFromProgress(progress: number, count: number) {
  const maxIndex = Math.max(count - 1, 0);

  if (maxIndex === 0) {
    return 0;
  }

  return Math.round(clampProgress(progress) * maxIndex);
}

function syncEngineToProgress(api: EmblaCarouselType, progress: number) {
  const engine = api.internalEngine();
  const targetLocation = getTargetLocationFromProgress(api, progress);

  engine.animation.stop();
  engine.target.set(targetLocation);
  engine.location.set(targetLocation);
  engine.offsetLocation.set(targetLocation);
  engine.previousLocation.set(targetLocation);
  engine.translate.to(targetLocation);
}

function getSectionConfig(sectionId: SectionIdValue, cvHref: string): SectionContentConfig {
  switch (sectionId) {
    case SectionId.Intro:
      return {
        title: siteContent.intro.headline,
        summary: siteContent.intro.summary,
        indexLabel: SECTION_INDEX_LABELS[SectionId.Intro],
        aside: <IntroAside />,
        content: <IntroContent cvHref={cvHref} />,
      };
    case SectionId.Capabilities:
      return {
        title: "A frontend profile shaped by systems, polish, and maintainability.",
        summary:
          "The stack matters, but the real value comes from how the frontend stays coherent as it grows. These are the areas I usually strengthen first.",
        indexLabel: SECTION_INDEX_LABELS[SectionId.Capabilities],
        content: <CapabilitiesContent />,
      };
    case SectionId.Experience:
      return {
        title: "Selected roles, with emphasis on what changed because I was there.",
        summary:
          "My recent work has concentrated on scalable component systems, product modernization, and disciplined frontend delivery across different team sizes.",
        indexLabel: SECTION_INDEX_LABELS[SectionId.Experience],
        content: <ExperienceContent />,
      };
    case SectionId.Proof:
      return {
        title: "The kind of frontend problems I solve well.",
        summary:
          "I’m typically most useful where the frontend needs clearer structure, stronger execution details, and a quality bar that survives real delivery pressure.",
        indexLabel: SECTION_INDEX_LABELS[SectionId.Proof],
        content: <ProofContent />,
      };
    case SectionId.Contact:
      return {
        title: siteContent.contact.title,
        summary: siteContent.contact.body,
        indexLabel: SECTION_INDEX_LABELS[SectionId.Contact],
        content: <ContactContent cvHref={cvHref} />,
      };
  }
}

function App() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderProgress, setSliderProgress] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(DESKTOP_CAROUSEL_OPTIONS);

  const registerSection =
    (index: number) =>
    (element: HTMLElement | null): void => {
      sectionRefs.current[index] = element;
    };

  const scrollToDesktopIndex = useEffectEvent((index: number) => {
    const nextIndex = clampIndex(index, siteContent.sections.length);

    if (!emblaApi) {
      return;
    }

    emblaApi.scrollTo(nextIndex, false);
  });

  const scrollToMobileIndex = useEffectEvent((index: number) => {
    const nextIndex = clampIndex(index, siteContent.sections.length);

    const target = sectionRefs.current[nextIndex];

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  });

  const syncDesktopActiveIndex = useEffectEvent((api: EmblaCarouselType) => {
    setActiveIndex(api.selectedScrollSnap());
  });

  const syncDesktopProgress = useEffectEvent((api: EmblaCarouselType) => {
    setSliderProgress(clampProgress(api.scrollProgress()));
  });

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    syncDesktopActiveIndex(emblaApi);
    syncDesktopProgress(emblaApi);
    emblaApi.on("select", syncDesktopActiveIndex);
    emblaApi.on("reInit", syncDesktopActiveIndex);
    emblaApi.on("scroll", syncDesktopProgress);
    emblaApi.on("reInit", syncDesktopProgress);

    return () => {
      emblaApi.off("select", syncDesktopActiveIndex);
      emblaApi.off("reInit", syncDesktopActiveIndex);
      emblaApi.off("scroll", syncDesktopProgress);
      emblaApi.off("reInit", syncDesktopProgress);
    };
  }, [emblaApi]);

  useEffect(() => {
    const targets = sectionRefs.current.filter(
      (target): target is HTMLElement => target instanceof HTMLElement,
    );

    if (targets.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const index = targets.findIndex((target) => target === visibleEntry.target);

        if (index >= 0) {
          setActiveIndex(index);
          setSliderProgress(
            siteContent.sections.length > 1 ? index / (siteContent.sections.length - 1) : 0,
          );
        }
      },
      {
        root: null,
        threshold: [0.35, 0.5, 0.7],
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const cvHref = `${import.meta.env.BASE_URL}${siteContent.profile.cvPath}`;
  const actionLinks: ActionLinkConfig[] = [
    {
      href: `mailto:${siteContent.profile.email}`,
      label: "Email Alex",
      tone: "primary" as const,
      icon: <EnvelopeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />,
    },
    {
      href: siteContent.profile.githubUrl,
      label: "GitHub",
      tone: "secondary" as const,
      target: "_blank",
      rel: "noreferrer",
      icon: <LaunchIcon aria-hidden="true" className="h-5 w-5 shrink-0" />,
    },
    {
      href: cvHref,
      label: "Download CV",
      tone: "secondary" as const,
      icon: <DownloadIcon aria-hidden="true" className="h-5 w-5 shrink-0" />,
      download: true,
    },
  ];
  const sectionConfigs = siteContent.sections.map((section) => ({
    ...section,
    ...getSectionConfig(section.id, cvHref),
  }));
  const handleSliderDragProgress = useEffectEvent((progress: number) => {
    const nextProgress = clampProgress(progress);

    setSliderProgress(nextProgress);

    if (!emblaApi) {
      return;
    }

    syncEngineToProgress(emblaApi, nextProgress);
  });
  const handleSliderDragEnd = useEffectEvent((progress: number) => {
    const nextIndex = getNearestIndexFromProgress(progress, siteContent.sections.length);

    scrollToDesktopIndex(nextIndex);
  });

  return (
    <div className="min-h-screen bg-canvas text-text-strong antialiased">
      <div className="flex min-h-screen flex-col px-4 pt-4 pb-5 sm:px-6 sm:pb-6 lg:h-screen lg:px-6 lg:pb-6">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4">
          <header className="elevation-header grid w-full shrink-0 gap-4 rounded-[1.5rem] border border-border/70 bg-surface-elevated/70 px-5 py-4 backdrop-blur-xl sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-8">
            <div className="space-y-2">
              <p className="text-sm text-text-muted sm:text-[1rem]">
                {siteContent.profile.name}
              </p>
              <div className="space-y-1.5">
                <h1 className="max-w-none text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-[clamp(2.8rem,4vw,4.5rem)] lg:leading-[0.94] xl:whitespace-nowrap">
                  {siteContent.profile.role}
                </h1>
                <p className="max-w-3xl text-sm leading-6 text-text-muted sm:text-base">
                  {siteContent.profile.experienceLabel}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {actionLinks.map((link) => (
                <ButtonLink
                  key={link.label}
                  href={link.href}
                  tone={link.tone}
                  className={link.className}
                  target={link.target}
                  rel={link.rel}
                  download={link.download}
                >
                  {link.icon}
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </header>

        </div>

        <main
          id="main-content"
          className="flex w-full flex-col overflow-visible lg:min-h-0 lg:flex-1"
          aria-labelledby={`${SectionId.Intro}-title`}
        >
          <div
            ref={emblaRef}
            className="hidden overflow-visible lg:block lg:min-h-0 lg:flex-1 lg:cursor-grab active:lg:cursor-grabbing"
          >
            <div className="flex h-full items-stretch gap-5 px-6 py-8 lg:px-8 xl:gap-6 xl:px-10">
              {sectionConfigs.map((section) => (
                <div key={section.id} className={DESKTOP_CARD_CLASS}>
                  <SectionCard
                    id={section.id}
                    title={section.title}
                    summary={section.summary}
                    indexLabel={section.indexLabel}
                    aside={section.aside}
                    className="h-full w-full"
                  >
                    {section.content}
                  </SectionCard>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 overflow-visible pt-4 lg:hidden">
            <MobileProgress
              sections={siteContent.sections}
              activeIndex={activeIndex}
              onSelect={scrollToMobileIndex}
            />
            {sectionConfigs.map((section, index) => (
              <div key={section.id} ref={registerSection(index)}>
                <SectionCard
                  id={section.id}
                  title={section.title}
                  summary={section.summary}
                  indexLabel={section.indexLabel}
                  aside={section.aside}
                >
                  {section.content}
                </SectionCard>
              </div>
            ))}
          </div>
        </main>

        <div className="hidden w-full shrink-0 lg:block">
          <div className="mx-auto w-full max-w-[1200px]">
            <BottomSlider
              sections={siteContent.sections}
              activeIndex={activeIndex}
              progress={sliderProgress}
              onSelect={scrollToDesktopIndex}
              onDragProgress={handleSliderDragProgress}
              onDragEnd={handleSliderDragEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
