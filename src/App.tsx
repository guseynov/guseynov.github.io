import { useEffect, useRef, type ReactNode } from "react";
import { HeroHeader, HeroSection } from "./components/HeroSection";
import { SectionCard } from "./components/SectionCard";
import { CapabilitiesContent } from "./components/sections/CapabilitiesContent";
import { ContactContent } from "./components/sections/ContactContent";
import { ExperienceContent } from "./components/sections/ExperienceContent";
import { IntroContent } from "./components/sections/IntroContent";
import { ProjectsContent } from "./components/sections/ProjectsContent";
import {
  ProofContent,
  ProofProjectionPlaceholder,
} from "./components/sections/ProofContent";
import {
  SectionId,
  siteContent,
  type SectionId as SectionIdValue,
} from "./content/site";
import { trackCtaClick, trackSectionView } from "./lib/analytics";

const SECTION_INDEX_LABELS: Record<SectionIdValue, string> = {
  [SectionId.Intro]: "01 / OVERVIEW",
  [SectionId.Proof]: "02 / OVERVIEW",
  [SectionId.Capabilities]: "03 / SKILLS",
  [SectionId.Experience]: "04 / EXPERIENCE",
  [SectionId.Projects]: "05 / PROJECTS",
  [SectionId.Contact]: "06 / CONTACT",
};

const SECTION_RENDER_ORDER: SectionIdValue[] = [
  SectionId.Intro,
  SectionId.Proof,
  SectionId.Capabilities,
  SectionId.Experience,
  SectionId.Projects,
  SectionId.Contact,
];

const SECTION_LAYOUT_CLASSNAMES: Record<SectionIdValue, string> = {
  [SectionId.Intro]: "xl:col-span-12",
  [SectionId.Proof]: "xl:col-span-12 xl:-mt-18",
  [SectionId.Capabilities]: "xl:col-span-12",
  [SectionId.Experience]: "xl:col-span-12",
  [SectionId.Projects]: "xl:col-span-12",
  [SectionId.Contact]: "xl:col-span-12",
};

interface SectionContentConfig {
  id: SectionIdValue;
  title: string;
  summary: string;
  indexLabel: string;
  titleClassName?: string;
  aside?: ReactNode;
  content: ReactNode;
}

interface SectionPresentation {
  className: string;
  tone: "dark" | "light" | "paper" | "black";
}

function getSectionPresentation(
  sectionId: SectionIdValue,
): SectionPresentation {
  switch (sectionId) {
    case SectionId.Proof:
      return {
        className:
          "relative z-20 h-full w-full -mt-8 sm:-mt-10 lg:-mt-12 xl:-mt-14",
        tone: "light",
      };
    case SectionId.Capabilities:
      return {
        className: "h-full w-full",
        tone: "black",
      };
    case SectionId.Contact:
      return {
        className: "h-full w-full",
        tone: "paper",
      };
    case SectionId.Projects:
      return {
        className: "h-full w-full",
        tone: "black",
      };
    case SectionId.Experience:
      return {
        className: "h-full w-full",
        tone: "light",
      };
    case SectionId.Intro:
      return {
        className: "h-full w-full",
        tone: "dark",
      };
  }
}

function getSectionConfig(
  sectionId: SectionIdValue,
  cvHref: string,
): SectionContentConfig {
  switch (sectionId) {
    case SectionId.Intro:
      return {
        id: SectionId.Intro,
        title: siteContent.intro.headline,
        summary: siteContent.intro.summary,
        indexLabel: SECTION_INDEX_LABELS[SectionId.Intro],
        content: <IntroContent />,
      };
    case SectionId.Proof:
      return {
        id: SectionId.Proof,
        title: "Overview",
        summary:
          "I build interfaces that stay clean under scale, from new product surfaces to legacy modernization. My work centers on React, TypeScript, Vue, and design-system minded UI architecture, with testing and implementation discipline treated as part of the product quality bar rather than cleanup work.",
        indexLabel: "",
        titleClassName: "max-w-[30ch] sm:max-w-[38ch] md:max-w-[48ch]",
        // aside: <ProofProjectionPlaceholder />,
        aside: null,
        content: <ProofContent />,
      };
    case SectionId.Experience:
      return {
        id: SectionId.Experience,
        title: "Experience",
        summary:
          "My recent work has concentrated on scalable component systems, product modernization, and disciplined frontend delivery across different team sizes.",
        indexLabel: "",
        content: <ExperienceContent />,
      };
    case SectionId.Capabilities:
      return {
        id: SectionId.Capabilities,
        title: "Skills",
        summary:
          "The stack matters, but the real value comes from how the frontend stays coherent as it grows. These are the areas I usually strengthen first.",
        indexLabel: "",
        content: <CapabilitiesContent />,
      };
    case SectionId.Projects:
      return {
        id: SectionId.Projects,
        title: "Projects",
        summary:
          "A selected set of public repositories that show product surfaces, interactive tools, data explorers, and focused UI experiments.",
        indexLabel: "",
        titleClassName: "max-w-[15ch] sm:max-w-[18ch] md:max-w-[20ch]",
        content: <ProjectsContent />,
      };
    case SectionId.Contact:
      return {
        id: SectionId.Contact,
        title: "Contact",
        summary: siteContent.contact.body,
        indexLabel: "",
        content: <ContactContent cvHref={cvHref} />,
      };
  }
}

function App() {
  const sectionRefs = useRef<Record<SectionIdValue, HTMLElement | null>>({
    [SectionId.Intro]: null,
    [SectionId.Capabilities]: null,
    [SectionId.Experience]: null,
    [SectionId.Projects]: null,
    [SectionId.Proof]: null,
    [SectionId.Contact]: null,
  });

  const cvHref = `${import.meta.env.BASE_URL}${siteContent.profile.cvPath}`;
  const sectionConfigs = SECTION_RENDER_ORDER.map((sectionId) =>
    getSectionConfig(sectionId, cvHref),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.getAttribute(
            "data-section-id",
          ) as SectionIdValue | null;
          const section = sectionId
            ? siteContent.sections.find((item) => item.id === sectionId)
            : null;

          if (!section) {
            return;
          }

          trackSectionView({
            sectionId: section.id,
            sectionLabel: section.label,
            sectionTitle: section.title,
            sectionIndex: section.index,
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    SECTION_RENDER_ORDER.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-text-strong antialiased">
      <div className="px-4 pt-4 sm:px-6 lg:px-6">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 lg:gap-8">
          <HeroHeader
            cvHref={cvHref}
            onEmailClick={() =>
              trackCtaClick({
                label: "Email me",
                href: `mailto:${siteContent.profile.email}`,
                placement: "hero",
              })
            }
            onCvClick={() =>
              trackCtaClick({
                label: "Download CV",
                href: cvHref,
                placement: "hero",
              })
            }
          />
          <HeroSection
            id={SectionId.Intro}
            cvHref={cvHref}
            onEmailClick={() =>
              trackCtaClick({
                label: "Email me",
                href: `mailto:${siteContent.profile.email}`,
                placement: "hero",
              })
            }
            onCvClick={() =>
              trackCtaClick({
                label: "Download CV",
                href: cvHref,
                placement: "hero",
              })
            }
          />
          <main
            id="main-content"
            className="grid w-full grid-cols-1 gap-5 pb-20 lg:gap-6 xl:grid-cols-12"
            aria-labelledby={`${SectionId.Intro}-title`}
          >
            {sectionConfigs
              .filter((section) => section.id !== SectionId.Intro)
              .map((section) => {
                const presentation = getSectionPresentation(section.id);

                return (
                  <div
                    key={section.id}
                    ref={(element) => {
                      sectionRefs.current[section.id] = element;
                    }}
                    data-section-id={section.id}
                    className={SECTION_LAYOUT_CLASSNAMES[section.id]}
                  >
                    <SectionCard
                      id={section.id}
                      title={section.title}
                      summary={section.summary}
                      indexLabel={section.indexLabel}
                      titleClassName={section.titleClassName}
                      aside={section.aside}
                      headerless={section.id === SectionId.Intro}
                      className={presentation.className}
                      tone={presentation.tone}
                    >
                      {section.content}
                    </SectionCard>
                  </div>
                );
              })}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
