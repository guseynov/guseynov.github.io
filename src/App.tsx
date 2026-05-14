import { useEffect, useRef, type ReactNode } from "react";
import { HeroHeader, HeroSection } from "@/components/HeroSection";
import { SectionCard } from "@/components/SectionCard";
import { CapabilitiesContent } from "@/components/sections/CapabilitiesContent";
import { ContactContent } from "@/components/sections/ContactContent";
import { ExperienceContent } from "@/components/sections/ExperienceContent";
import { IntroContent } from "@/components/sections/IntroContent";
import {
  ProofContent,
  ProofProjectionPlaceholder,
} from "@/components/sections/ProofContent";
import {
  SectionId,
  siteContent,
  type SectionId as SectionIdValue,
} from "@/content/site";
import { trackCtaClick, trackSectionView } from "@/lib/analytics";

const SECTION_INDEX_LABELS: Record<SectionIdValue, string> = {
  [SectionId.Intro]: "01 / OVERVIEW",
  [SectionId.Proof]: "02 / STRENGTHS",
  [SectionId.Capabilities]: "03 / SKILLS",
  [SectionId.Experience]: "04 / EXPERIENCE",
  [SectionId.Projects]: "05 / WORK",
  [SectionId.Contact]: "05 / CONTACT",
};

const SECTION_RENDER_ORDER: SectionIdValue[] = [
  SectionId.Intro,
  SectionId.Proof,
  SectionId.Capabilities,
  SectionId.Experience,
  SectionId.Contact,
];

const SECTION_LAYOUT_CLASSNAMES: Record<SectionIdValue, string> = {
  [SectionId.Intro]: "xl:col-span-12",
  [SectionId.Proof]: "xl:col-span-12 xl:-mt-18",
  [SectionId.Capabilities]: "xl:col-span-12",
  [SectionId.Experience]: "xl:col-span-12",
  [SectionId.Projects]: "xl:col-span-7",
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

function getSectionConfig(sectionId: SectionIdValue, cvHref: string): SectionContentConfig {
  switch (sectionId) {
    case SectionId.Intro:
      return {
        id: SectionId.Intro,
        title: siteContent.intro.headline,
        summary: siteContent.intro.summary,
        indexLabel: SECTION_INDEX_LABELS[SectionId.Intro],
        content: <IntroContent cvHref={cvHref} />,
      };
    case SectionId.Proof:
      return {
        id: SectionId.Proof,
        title: "Strengths",
        summary:
          "I build interfaces that stay clean under scale, from new product surfaces to legacy modernization. My work centers on React, TypeScript, Vue, and design-system minded UI architecture, with testing and implementation discipline treated as part of the product quality bar rather than cleanup work.",
        indexLabel: "",
        titleClassName: "max-w-[30ch] sm:max-w-[38ch] md:max-w-[48ch]",
        aside: <ProofProjectionPlaceholder />,
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
    [SectionId.Proof]: null,
    [SectionId.Projects]: null,
    [SectionId.Contact]: null,
  });

  const cvHref = `${import.meta.env.BASE_URL}${siteContent.profile.cvPath}`;
  const sectionConfigs = SECTION_RENDER_ORDER.map((sectionId) => getSectionConfig(sectionId, cvHref));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.getAttribute("data-section-id") as SectionIdValue | null;
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
              .map((section) => (
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
                    className={
                      section.id === SectionId.Proof
                        ? "relative z-20 h-full w-full -mt-8 sm:-mt-10 lg:-mt-12 xl:-mt-14"
                        : "h-full w-full"
                    }
                    tone={
                      section.id === SectionId.Proof
                        ? "light"
                        : section.id === SectionId.Capabilities
                          ? "black"
                          : section.id === SectionId.Contact
                            ? "paper"
                          : "dark"
                    }
                  >
                    {section.content}
                  </SectionCard>
                </div>
              ))}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
