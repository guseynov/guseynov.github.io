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

export type Skill = {
  brandIcon?: SimpleIcon;
  icon?: LucideIcon;
  label: string;
};

export type SkillCategory = {
  desktopColumnBreak: number;
  desktopOrder?: number[];
  id: string;
  label: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    desktopColumnBreak: 4,
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
    desktopColumnBreak: 4,
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
    desktopColumnBreak: 4,
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
    desktopColumnBreak: 2,
    desktopOrder: [0, 2, 1, 3],
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
    desktopColumnBreak: 2,
    desktopOrder: [0, 3, 1, 2],
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
    desktopColumnBreak: 2,
    desktopOrder: [0, 1, 3, 2],
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
    desktopColumnBreak: 4,
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
