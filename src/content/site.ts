export enum SectionId {
  Intro = "intro",
  Capabilities = "capabilities",
  Experience = "experience",
  Proof = "proof",
  Contact = "contact",
}

export interface SectionNavItem {
  id: SectionId;
  label: string;
  index: number;
  title: string;
}

export interface SkillGroup {
  title: string;
  summary: string;
  items: Array<{
    label: string;
    icon: string;
    href?: string;
  }>;
}

export interface ExperienceEntry {
  company: string;
  period: string;
  role: string;
  impact: string[];
}

export interface StrengthItem {
  title: string;
  body: string;
}

export interface SiteContent {
  profile: {
    name: string;
    role: string;
    experienceLabel: string;
    email: string;
    githubUrl: string;
    linkedinUrl: string;
    cvPath: string;
  };
  intro: {
    eyebrow: string;
    headline: string;
    summary: string;
    quickFacts: string[];
  };
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  strengths: StrengthItem[];
  contact: {
    title: string;
    body: string;
    availability: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    tertiaryCtaLabel: string;
  };
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
  };
  sections: SectionNavItem[];
}

export const siteContent: SiteContent = {
  profile: {
    name: "Alex Guseynov",
    role: "Frontend Engineer",
    experienceLabel: "10 years shipping production frontend work",
    email: "me@alex23.com",
    githubUrl: "https://github.com/guseynov/",
    linkedinUrl: "https://linkedin.com/in/aguseynov/",
    cvPath: "alex-guseynov-cv.pdf",
  },
  intro: {
    eyebrow: "Frontend Engineer",
    headline:
      "Frontend systems, product polish, and delivery that holds up in production.",
    summary:
      "I build interfaces that stay clear as products grow, from new surfaces to legacy modernization. My work centers on React, TypeScript, Vue, and UI systems, with testing and implementation discipline treated as part of the product itself.",
    quickFacts: [
      "React, TypeScript, Vue, Tailwind",
      "UI kits, microfrontends, legacy modernization",
      "Startup speed and large-company delivery discipline",
    ],
  },
  skills: [
    {
      title: "Core frontend",
      summary:
        "The languages and frameworks I use to build production interfaces.",
      items: [
        { label: "React", icon: "react" },
        { label: "TypeScript", icon: "typescript" },
        { label: "JavaScript", icon: "javascript" },
        { label: "HTML", icon: "html" },
        { label: "CSS", icon: "css" },
        { label: "Next.js", icon: "next" },
        { label: "Vue", icon: "vue" },
        { label: "Nuxt", icon: "nuxt" },
      ],
    },
    {
      title: "UI engineering",
      summary:
        "Interface systems, product surfaces, and the details that keep them usable.",
      items: [
        { label: "Design Systems", icon: "design-systems" },
        { label: "Component Libraries", icon: "component-libraries" },
        { label: "Responsive UI", icon: "responsive-ui" },
        { label: "Accessibility", icon: "accessibility" },
        { label: "Performance Optimization", icon: "performance" },
        { label: "Complex Product UI", icon: "product-ui" },
        { label: "Interactive Interfaces", icon: "interactive" },
      ],
    },
    {
      title: "State & data",
      summary:
        "Client state, server data, transport patterns, and form architecture.",
      items: [
        { label: "Redux", icon: "redux" },
        { label: "Zustand", icon: "zustand" },
        { label: "TanStack Query / React Query", icon: "react-query" },
        { label: "REST APIs", icon: "rest" },
        { label: "WebSockets", icon: "websockets" },
        { label: "Form Architecture", icon: "forms" },
      ],
    },
    {
      title: "Styling",
      summary:
        "The styling layer, from utility CSS to maintainable design tokens.",
      items: [
        { label: "Tailwind CSS", icon: "tailwind" },
        { label: "CSS Modules", icon: "css-modules" },
        { label: "Styled Components", icon: "styled-components" },
        { label: "SCSS", icon: "scss" },
        { label: "Design Tokens", icon: "design-tokens" },
      ],
    },
    {
      title: "Tooling",
      summary:
        "Build tools, delivery infrastructure, diagnostics, and AI-assisted execution.",
      items: [
        { label: "Vite", icon: "vite" },
        { label: "Webpack", icon: "webpack" },
        { label: "CI/CD", icon: "ci-cd" },
        { label: "Sentry", icon: "sentry" },
        { label: "Git", icon: "git" },
        { label: "AI-assisted Development", icon: "ai-development" },
      ],
    },
    {
      title: "Testing",
      summary:
        "The test tools I use to keep interactions and regressions visible.",
      items: [
        { label: "Jest", icon: "jest" },
        { label: "React Testing Library", icon: "testing-library" },
        { label: "Cypress", icon: "cypress" },
        { label: "Playwright", icon: "playwright" },
      ],
    },
    {
      title: "Backend-adjacent",
      summary:
        "Server-side technologies I can work around when the frontend crosses boundaries.",
      items: [
        { label: "Node.js", icon: "node" },
        { label: "C#", icon: "csharp" },
        { label: "ASP.NET", icon: "aspnet" },
        { label: "PHP", icon: "php" },
        { label: "CodeIgniter", icon: "codeigniter" },
      ],
    },
  ],
  experience: [
    {
      company: "Twee",
      period: "Aug 2024 - Present",
      role: "Frontend Developer",
      impact: [
        "Built interactive lesson and classroom tools in React/TypeScript for mobile and desktop flows.",
        "Worked across React/TypeScript frontend and ASP.NET/C# backend code for product features.",
        "Shipped AI, admin, analytics, and Stripe flows across the product.",
        "Kept shared components documented so the team could reuse them safely.",
      ],
    },
    {
      company: "Bylith",
      period: "Mar 2023 - Aug 2024",
      role: "Frontend Developer",
      impact: [
        "Built shared UI-kit foundations and reusable patterns for product teams.",
        "Shipped reusable UI components with consistent states, variants, and responsive behavior.",
        "Improved accessibility, mobile behavior, and edge-case handling across the component library.",
        "Documented patterns and usage so teams could avoid duplicated UI work.",
      ],
    },
    {
      company: "Sberbank",
      period: "Feb 2021 - Mar 2023",
      role: "Frontend Developer",
      impact: [
        "Built teacher task constructors and student learning modes for widget-based EdTech exercises.",
        "Worked on migration from a monorepo setup toward microfrontend architecture.",
        "Supported answer storage, scoring, and review flows for completed student tasks.",
        "Reused widget patterns across flows used by thousands of teachers and students.",
      ],
    },
    {
      company: "FUTURECOMES",
      period: "Apr 2020 - Feb 2021",
      role: "Frontend Developer",
      impact: [
        "Built a React/Redux EdTech SPA from scratch with game-like interactive flows.",
        "Implemented stateful exercises, API-driven screens, and responsive UI.",
        "Set reusable frontend structure for new learning activities.",
      ],
    },
    {
      company: "Older roles",
      period: "Mar 2015 - Apr 2020",
      role: "Frontend Developer",
      impact: [
        "Delivered 20+ frontend and full-stack projects, including CMS and PHP/CodeIgniter work.",
        "Built responsive UI, API integrations, and production fixes/releases.",
        "Worked directly with clients and teams from first draft to launch.",
      ],
    },
  ],
  strengths: [
    {
      title: "Complex product UI",
      body: "I do best on interfaces that have to support real workflows, not just present information. The work usually has moving parts, state, and enough edge cases that clarity matters more than decoration.",
    },
    {
      title: "Reusable frontend foundations",
      body: "I like turning scattered frontend decisions into a system the rest of the team can keep using. That usually means fewer one-offs, cleaner patterns, and a codebase that is easier to extend.",
    },
    {
      title: "Details that survive production",
      body: "I pay attention to the details that make interfaces feel finished after launch, including behavior, states, accessibility, and the implementation choices that other engineers inherit.",
    },
  ],
  contact: {
    title: "Contact",
    body: "If you need someone who can shape the interface layer, improve consistency, and ship production-ready UI with care, I am available for conversations about permanent roles and strong product teams.",
    availability:
      "Send the role, product surface, and the problems the frontend needs to solve. I can usually tell quickly whether there is a useful fit.",
    primaryCtaLabel: "Email Alex",
    secondaryCtaLabel: "Copy Email",
    tertiaryCtaLabel: "View CV",
  },
  seo: {
    title: "Alex Guseynov | Frontend Engineer",
    description:
      "Frontend engineer with 10 years of experience building polished React and Vue products, design systems, and maintainable interfaces.",
    canonicalUrl: "https://guseynov.github.io/",
  },
  sections: [
    {
      id: SectionId.Intro,
      label: "Overview",
      index: 0,
      title: "Overview",
    },
    {
      id: SectionId.Capabilities,
      label: "Skills",
      index: 1,
      title: "Skills",
    },
    {
      id: SectionId.Experience,
      label: "Experience",
      index: 2,
      title: "Experience",
    },
    {
      id: SectionId.Proof,
      label: "Strengths",
      index: 3,
      title: "Strengths",
    },
    {
      id: SectionId.Contact,
      label: "Contact",
      index: 4,
      title: "Contact",
    },
  ],
};
