export enum SectionId {
  Intro = "intro",
  Capabilities = "capabilities",
  Experience = "experience",
  Proof = "proof",
  Projects = "projects",
  Contact = "contact",
}

export interface SectionNavItem {
  id: SectionId;
  label: string;
  index: number;
  title: string;
  shortDescription: string;
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

export interface ProjectEntry {
  title: string;
  category: string;
  stack: string;
  description: string;
  href: string;
}

export interface SiteContent {
  profile: {
    name: string;
    role: string;
    experienceLabel: string;
    email: string;
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
  projects: ProjectEntry[];
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
        { label: "ASP.NET", icon: "aspnet", href: "http://asp.net/" },
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
        "Built AI-powered ESL tools for teachers and students.",
        "Worked on lesson-generation flows with AI, TTS, images, and editable materials.",
        "Rebuilt scattered styles into a reusable SCSS and UI kit foundation.",
        "Built admin screens for analytics, Stripe, and internal operations.",
        "Maintained Storybook examples for shared UI components.",
      ],
    },
    {
      company: "Bylith",
      period: "Mar 2023 - Aug 2024",
      role: "Frontend Developer",
      impact: [
        "Built a Vue UI kit from scratch.",
        "Used JSON design tokens for themes, colors, and component variants.",
        "Created inputs, dropdowns, modals, sliders, date/time pickers, and color pickers.",
        "Designed detailed mobile interactions like calendars and spinning time wheels.",
        "Documented component states, themes, sizes, and usage examples.",
      ],
    },
    {
      company: "Sberbank",
      period: "Feb 2021 - Mar 2023",
      role: "Frontend Developer",
      impact: [
        "Built EdTech task-constructor flows for teachers and students.",
        "Implemented widgets with editing and learning modes.",
        "Used React, TypeScript, GraphQL, and Effector for task sync.",
        "Worked on answer storage, scoring, and review flows.",
        "Helped standardize reusable task-building patterns.",
      ],
    },
    {
      company: "FUTURECOMES",
      period: "Apr 2020 - Feb 2021",
      role: "Frontend Developer",
      impact: [
        "Built an interactive EdTech product from scratch.",
        "Used React and Redux for stateful learning flows.",
        "Created browser-based experiences closer to a game than a static course.",
        "Built reusable frontend structure for interactive screens.",
      ],
    },
    {
      company: "Older roles",
      period: "Mar 2015 - Apr 2020",
      role: "Frontend Developer",
      impact: [
        "Delivered 20+ frontend and backend web projects.",
        "Built websites, CMS projects, public-sector interfaces, and PHP apps.",
        "Worked with JavaScript, HTML, CSS, PHP, and CodeIgniter.",
        "Handled requirements, implementation, fixes, releases, and support.",
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
  projects: [
    {
      title: "Synthesizer",
      category: "React project",
      stack: "React, TypeScript, Tone.js",
      description:
        "A browser-based synthesizer with custom controls, playable audio interaction, and a compact instrument-style interface.",
      href: "projects/synthesizer",
    },
    {
      title: "Breathing Bubble",
      category: "React project",
      stack: "React, TypeScript, MobX",
      description:
        "A guided breathing app built around calm pacing, minimal controls, and a focused visual rhythm.",
      href: "projects/breathing-bubble",
    },
    {
      title: "Calculator",
      category: "React project",
      stack: "React, Redux",
      description:
        "A browser calculator with keyboard support, responsive controls, and a clean app-style interface.",
      href: "projects/calculator",
    },
    {
      title: "Metronome",
      category: "React project",
      stack: "React",
      description:
        "A metronome app with tempo controls, visual beat feedback, and a minimal practice-focused interface.",
      href: "projects/metronome",
    },
    {
      title: "Weather",
      category: "React project",
      stack: "React, API integration",
      description:
        "A weather app with city search, five-day forecast cards, and a compact data-first layout.",
      href: "projects/weather",
    },
    {
      title: "Todo",
      category: "Vue project",
      stack: "Vue 2, Vuex",
      description:
        "A task management app with category-based organization, playful UI details, and a bold everyday productivity flow.",
      href: "projects/todo",
    },
  ],
  contact: {
    title: "Available for frontend roles where interface quality matters.",
    body: "If the role needs stronger frontend systems, sharper product judgment, and production-ready interface work that holds up after launch, email is the fastest way to start the conversation.",
    availability:
      "Best first step: send an email. LinkedIn and the CV are here if you want more detail first.",
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
      shortDescription: "Frontend focus, fit, and hiring context.",
    },
    {
      id: SectionId.Capabilities,
      label: "Skills",
      index: 1,
      title: "Skills",
      shortDescription: "Frontend stack, UI systems, tooling, testing, and backend-adjacent work.",
    },
    {
      id: SectionId.Experience,
      label: "Experience",
      index: 2,
      title: "Experience",
      shortDescription: "Selected roles and delivery outcomes.",
    },
    {
      id: SectionId.Proof,
      label: "Strengths",
      index: 3,
      title: "Strengths",
      shortDescription: "Where Alex adds the most value in real teams.",
    },
    {
      id: SectionId.Contact,
      label: "Get In Touch",
      index: 4,
      title: "Get In Touch",
      shortDescription: "Direct outreach and supporting links.",
    },
  ],
};
