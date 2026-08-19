import { ExperienceSection } from "./components/ExperienceSection";
import { FooterSection } from "./components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsetSection } from "./components/SkillsetSection";

export default function App() {
  return (
    <main>
      <HeroSection />
      <SkillsetSection />
      <ProjectsSection />
      <ExperienceSection />
      <FooterSection />
    </main>
  );
}
