import { ExperienceSection } from "./components/ExperienceSection";
import { FooterSection } from "./components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsetSection } from "./components/SkillsetSection";

export default function App() {
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
