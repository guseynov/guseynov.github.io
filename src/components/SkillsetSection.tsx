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
        className="h-5 w-5 flex-[0_0_20px] fill-current"
        viewBox="0 0 24 24"
      >
        <path d={brandIcon.path} />
      </svg>
    );
  }

  return Icon ? (
    <Icon
      aria-hidden="true"
      className="h-5 w-5 flex-[0_0_20px] fill-none stroke-current"
      strokeWidth={1.8}
    />
  ) : null;
}

export function SkillsetSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? categories[0];

  return (
    <section
      className="relative min-h-[950px] overflow-hidden bg-background pt-[31px] md:min-h-[796px] md:overflow-clip md:pt-0"
      id="skills"
    >
      <div className="relative mx-auto min-h-[919px] w-[calc(100%-24px)] md:h-[796px] md:min-h-0 md:w-[min(calc(100%-192px),1088px)] md:max-[901px]:w-[calc(100%-80px)]">
        <div className="relative min-h-[188px] w-full md:absolute md:top-[54px] md:left-0 md:min-h-0 md:w-[344px]">
          <h2 className="m-0 min-h-[78px] pt-[5px] pr-[132px] font-sans text-5xl leading-[58px] font-medium tracking-[-2.4px] md:min-h-0 md:p-0 md:text-[64px] md:leading-[1.06] md:tracking-[-3.2px]">
            Skillset
          </h2>
          <p className="mt-[9px] mb-0 font-sans text-[15px] leading-[22px] font-normal md:mt-5 md:text-base md:leading-[26px]">
            I pay attention to the details that make interfaces feel finished after launch,
            including behavior, states, accessibility, and the implementation choices that other
            engineers inherit.
          </p>
        </div>

        <img
          alt="Alex Guseynov"
          className="absolute top-0 right-0 block h-[78px] w-[120px] object-cover object-[center_43%] md:top-[54px] md:h-[103px] md:w-[158px]"
          loading="lazy"
          src={`${import.meta.env.BASE_URL}images/image.JPEG`}
        />

        <div className="relative mt-[78px] grid md:absolute md:top-[361px] md:right-0 md:left-0 md:mt-0 md:block">
          <div className="contents md:grid md:grid-cols-[31.6176%_minmax(0,1fr)] md:gap-x-7">
            <p className="col-start-1 row-start-1 m-0 border-b-[0.6px] border-rule pb-0 text-base leading-[18px] font-normal md:pb-[9px] md:leading-6">
              /Select
            </p>
            <p className="col-start-1 row-start-3 mt-[46px] mb-0 border-b-[0.6px] border-rule pb-0 text-base leading-[18px] font-normal md:col-start-2 md:row-start-1 md:mt-0 md:pb-[9px] md:leading-6">
              /{selectedCategory.label}
            </p>
          </div>

          <div className="contents md:mt-[27px] md:grid md:grid-cols-[31.6176%_minmax(0,1fr)] md:gap-x-7">
            <div
              aria-label="Skill categories"
              className="col-start-1 row-start-2 mt-[29px] flex h-6 flex-row gap-5 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-0 md:h-[252px] md:flex-col md:gap-3.5 md:overflow-visible md:bg-[repeating-linear-gradient(to_bottom,var(--color-rule)_0_5px,transparent_5px_9px)] md:bg-[length:1px_100%] md:bg-left-top md:bg-no-repeat md:pl-5"
              role="tablist"
            >
              {categories.map((category) => {
                const isSelected = category.id === selectedCategory.id;

                return (
                  <button
                    aria-controls="selected-skills"
                    aria-selected={isSelected}
                    className={clsx(
                      "flex h-6 w-max min-w-max flex-[0_0_auto] cursor-pointer items-center gap-0 bg-transparent p-0 text-left text-lg leading-6 font-light text-rule transition-colors duration-140 hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-rule md:grid md:w-full md:min-w-0 md:grid-cols-[18px_minmax(0,1fr)_auto] md:pr-0.5 md:text-base",
                      isSelected && "!font-normal !text-white",
                    )}
                    id={`category-${category.id}`}
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    role="tab"
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={clsx("hidden", isSelected && "md:block")}
                    >
                      {isSelected ? ">" : ""}
                    </span>
                    <span
                      className={clsx(
                        "overflow-hidden text-ellipsis whitespace-nowrap",
                        isSelected
                          ? "md:underline md:underline-offset-2"
                          : "md:col-span-2",
                      )}
                    >
                      {category.label}
                    </span>
                    <span className="md:col-start-3">({category.skills.length})</span>
                  </button>
                );
              })}
            </div>

            <div
              aria-labelledby={`category-${selectedCategory.id}`}
              className="relative col-start-1 row-start-4 mt-6 grid h-auto grid-cols-[minmax(0,1fr)] auto-rows-[44px] gap-y-5 md:col-start-2 md:row-start-1 md:mt-0 md:h-[252px] md:grid-cols-[52%_48%] md:grid-rows-[repeat(4,44px)] md:auto-rows-auto md:bg-[repeating-linear-gradient(to_bottom,var(--color-rule)_0_5px,transparent_5px_9px)] md:bg-[length:1px_100%] md:bg-left-top md:bg-no-repeat md:after:absolute md:after:top-0 md:after:bottom-0 md:after:left-[52%] md:after:w-px md:after:bg-[repeating-linear-gradient(to_bottom,var(--color-rule)_0_5px,transparent_5px_9px)] md:after:content-['']"
              id="selected-skills"
              role="tabpanel"
            >
              {selectedCategory.skills.map((skill, index) => (
                <div
                  className={clsx(
                    "flex h-11 min-w-0 items-center gap-4 border-b-[0.6px] border-rule font-sans text-lg leading-6 font-medium whitespace-nowrap last:border-b-transparent md:gap-3 md:text-base md:last:border-b-rule",
                    index % 2 === 0
                      ? "md:mr-9 md:ml-3"
                      : "md:ml-5",
                  )}
                  key={skill.label}
                >
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
