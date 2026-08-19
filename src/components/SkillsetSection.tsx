import { clsx } from "clsx";
import {
  Accessibility,
  Braces,
  CodeXml,
  Component,
  Database,
  Gauge,
  MonitorSmartphone,
  PanelsTopLeft,
  Radio,
  TestTube2,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import {
  siCss,
  siDocker,
  siDotnet,
  siExpress,
  siGit,
  siGraphql,
  siHtml5,
  siJavascript,
  siJest,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPostgresql,
  siReact,
  siReactquery,
  siRedis,
  siRedux,
  siSass,
  siStorybook,
  siTailwindcss,
  siTestinglibrary,
  siTypescript,
  siVite,
  siVitest,
  siVuedotjs,
  siWebpack,
  type SimpleIcon,
} from "simple-icons";

type Skill = {
  brandIcon?: SimpleIcon;
  icon?: LucideIcon;
  label: string;
};

type Category = {
  id: string;
  label: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    id: "core-frontend",
    label: "Core frontend",
    skills: [
      { brandIcon: siReact, label: "React" },
      { brandIcon: siJavascript, label: "JavaScript" },
      { brandIcon: siCss, label: "CSS" },
      { brandIcon: siVuedotjs, label: "Vue" },
      { brandIcon: siTypescript, label: "TypeScript" },
      { brandIcon: siHtml5, label: "HTML" },
      { brandIcon: siNextdotjs, label: "Next.js" },
      { brandIcon: siNuxt, label: "Nuxt" },
    ],
  },
  {
    id: "ui-engineering",
    label: "UI engineering",
    skills: [
      { icon: PanelsTopLeft, label: "Design systems" },
      { icon: MonitorSmartphone, label: "Responsive UI" },
      { icon: Gauge, label: "Performance optimization" },
      { icon: Component, label: "Component libraries" },
      { icon: Accessibility, label: "Accessibility" },
    ],
  },
  {
    id: "state-and-data",
    label: "State & data",
    skills: [
      { brandIcon: siRedux, label: "Redux" },
      { brandIcon: siReactquery, label: "TanStack Query" },
      { brandIcon: siGraphql, label: "GraphQL" },
      { icon: Database, label: "Zustand" },
      { icon: Braces, label: "REST APIs" },
      { icon: Radio, label: "WebSockets" },
    ],
  },
  {
    id: "styling",
    label: "Styling",
    skills: [
      { brandIcon: siTailwindcss, label: "Tailwind CSS" },
      { brandIcon: siSass, label: "Sass" },
      { icon: PanelsTopLeft, label: "CSS Modules" },
      { icon: CodeXml, label: "CSS-in-JS" },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    skills: [
      { brandIcon: siVite, label: "Vite" },
      { brandIcon: siWebpack, label: "Webpack" },
      { brandIcon: siStorybook, label: "Storybook" },
      { brandIcon: siGit, label: "Git" },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    skills: [
      { brandIcon: siVitest, label: "Vitest" },
      { brandIcon: siJest, label: "Jest" },
      { icon: TestTube2, label: "Playwright" },
      { brandIcon: siTestinglibrary, label: "Testing Library" },
    ],
  },
  {
    id: "backend-adjacent",
    label: "Backend-adjacent",
    skills: [
      { brandIcon: siNodedotjs, label: "Node.js" },
      { brandIcon: siExpress, label: "Express" },
      { brandIcon: siDotnet, label: "ASP.NET Core" },
      { icon: CodeXml, label: "C#" },
      { brandIcon: siPostgresql, label: "PostgreSQL" },
      { brandIcon: siMongodb, label: "MongoDB" },
      { brandIcon: siDocker, label: "Docker" },
      { brandIcon: siRedis, label: "Redis" },
    ],
  },
];

function TechnologyIcon({ brandIcon, icon: Icon }: Skill) {
  if (brandIcon) {
    return (
      <svg
        aria-hidden="true"
        className="skillset__technology-icon skillset__technology-icon--brand"
        viewBox="0 0 24 24"
      >
        <path d={brandIcon.path} />
      </svg>
    );
  }

  return Icon ? (
    <Icon
      aria-hidden="true"
      className="skillset__technology-icon skillset__technology-icon--lucide"
      strokeWidth={1.8}
    />
  ) : null;
}

export function SkillsetSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? categories[0];

  return (
    <section className="skillset" id="skills">
      <div className="skillset__inner">
        <div className="skillset__intro">
          <h2>Skillset</h2>
          <p>
            I pay attention to the details that make interfaces feel finished after launch,
            including behavior, states, accessibility, and the implementation choices that other
            engineers inherit.
          </p>
        </div>

        <img
          alt="Alex Guseynov"
          className="skillset__portrait"
          loading="lazy"
          src={`${import.meta.env.BASE_URL}images/image.JPEG`}
        />

        <div className="skillset__table">
          <div className="skillset__table-head">
            <p>/Select</p>
            <p>/{selectedCategory.label}</p>
          </div>

          <div className="skillset__table-body">
            <div aria-label="Skill categories" className="skillset__categories" role="tablist">
              {categories.map((category) => {
                const isSelected = category.id === selectedCategory.id;

                return (
                  <button
                    aria-controls="selected-skills"
                    aria-selected={isSelected}
                    className={clsx("skillset__category", {
                      "skillset__category--selected": isSelected,
                    })}
                    id={`category-${category.id}`}
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    role="tab"
                    type="button"
                  >
                    <span aria-hidden="true" className="skillset__category-arrow">
                      {isSelected ? ">" : ""}
                    </span>
                    <span className="skillset__category-label">{category.label}</span>
                    <span className="skillset__category-count">({category.skills.length})</span>
                  </button>
                );
              })}
            </div>

            <div
              aria-labelledby={`category-${selectedCategory.id}`}
              className="skillset__skills"
              id="selected-skills"
              role="tabpanel"
            >
              {selectedCategory.skills.map((skill) => (
                <div className="skillset__skill" key={skill.label}>
                  <TechnologyIcon {...skill} />
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
