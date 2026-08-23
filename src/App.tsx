import { useEffect } from "react";
import { ExperienceSection } from "./components/ExperienceSection";
import { FooterSection } from "./components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsetSection } from "./components/SkillsetSection";
import { trackSectionView } from "./lib/analytics";

const trackedSections = [
  { id: "overview", label: "Overview", title: "Overview" },
  { id: "skills", label: "Skills", title: "Skillset" },
  { id: "projects", label: "Projects", title: "Projects" },
  { id: "experience", label: "Experience", title: "Experience" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const;

export default function App() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      const firstSection = trackedSections[0];
      trackSectionView({
        sectionId: firstSection.id,
        sectionIndex: 1,
        sectionLabel: firstSection.label,
        sectionTitle: firstSection.title,
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionIndex = trackedSections.findIndex(
            ({ id }) => id === entry.target.id,
          );
          const section = trackedSections[sectionIndex];

          if (!section) {
            return;
          }

          trackSectionView({
            sectionId: section.id,
            sectionIndex: sectionIndex + 1,
            sectionLabel: section.label,
            sectionTitle: section.title,
          });
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      },
    );

    trackedSections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <SkillsetSection />
        <ProjectsSection />
        <ExperienceSection />
      </main>
      <FooterSection />
    </>
  );
}
