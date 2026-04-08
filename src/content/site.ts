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
  items: Array<string | { label: string; icon?: "terminal" | "spark" | "nodes" | "chip" }>;
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
    experienceLabel: "10 years building production interfaces",
    email: "alex.guseynov.23@gmail.com",
    githubUrl: "https://github.com/guseynov",
    linkedinUrl: "https://www.linkedin.com/in/aguseynov/",
    cvPath: "alex-guseynov-cv.pdf",
  },
  intro: {
    eyebrow: "Frontend Engineer",
    headline:
      "Polished product surfaces, strong frontend systems, and delivery you can trust.",
    summary:
      "I build interfaces that stay clean under scale, from new product surfaces to legacy modernization. My work centers on React, TypeScript, Vue, and design-system minded UI architecture, with testing and implementation discipline treated as part of the product quality bar rather than cleanup work.",
    quickFacts: [
      "React, TypeScript, Vue, Tailwind",
      "UI kits, microfrontends, legacy modernization",
      "Startup speed and large-company delivery discipline",
    ],
  },
  skills: [
    {
      title: "Core frontend systems",
      summary:
        "Hands-on with modern component architecture and day-to-day product delivery.",
      items: [
        "React.js",
        "Vue.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind",
        "Redux",
      ],
    },
    {
      title: "AI",
      summary:
        "Comfortable using modern AI tooling in practical product and engineering workflows, from coding agents to integrated application features.",
      items: [
        "AI coding workflows",
        "Prompt iteration",
        "LLM API integration",
        "Agentic prototyping",
        "Workflow automation",
        "Evaluation-minded implementation",
      ],
    },
    {
      title: "Quality and maintainability",
      summary:
        "I work toward interfaces that remain easy to extend after the first launch.",
      items: [
        "Unit testing",
        "End-to-end testing",
        "SCSS architecture",
        "Reusable component design",
        "UI consistency systems",
      ],
    },
    {
      title: "Delivery strengths",
      summary:
        "The work I tend to be trusted with when the frontend needs structure.",
      items: [
        "UI kit ownership",
        "Microfrontend migration",
        "Legacy modernization",
        "Design-to-code translation",
        "Cross-functional implementation",
      ],
    },
  ],
  experience: [
    {
      company: "Twee",
      period: "Aug 2024 - Present",
      role: "Frontend Developer",
      impact: [
        "Built scalable React components for an AI-powered educational product.",
        "Introduced a structured SCSS architecture to improve UI consistency and maintainability.",
        "Contributed MVC components in ASP.NET/C# to support backend integration flows.",
      ],
    },
    {
      company: "Bylith",
      period: "Mar 2023 - Aug 2024",
      role: "Frontend Developer",
      impact: [
        "Led the creation of a feature-rich Vue 3 UI kit used across company projects.",
        "Focused on high-performing, thoroughly tested components that reduced duplication.",
      ],
    },
    {
      company: "Sberbank",
      period: "Feb 2021 - Mar 2023",
      role: "Frontend Developer",
      impact: [
        "Developed and maintained an EdTech microfrontend using React, TypeScript, and Tailwind CSS.",
        "Migrated a legacy monolith toward microfrontend architecture for better scalability.",
        "Expanded unit and end-to-end test coverage to keep quality predictable at scale.",
      ],
    },
    {
      company: "FUTURECOMES",
      period: "Apr 2020 - Feb 2021",
      role: "Frontend Developer",
      impact: [
        "Built a React SPA for a large EdTech engagement with game-like learning experiences.",
        "Contributed peer reviews and coding standards that improved team consistency.",
      ],
    },
    {
      company: "Earlier roles",
      period: "Mar 2015 - Apr 2020",
      role: "Frontend Developer",
      impact: [
        "Freelance, Netrika, and RoyalMark: shipped production interfaces across different business contexts.",
        "Built a broad foundation in frontend execution, collaboration, and product delivery.",
      ],
    },
  ],
  strengths: [
    {
      title: "Design systems without design drift",
      body: "I am often at my best when building the components and conventions that keep interfaces coherent across teams and releases.",
    },
    {
      title: "Modernization with product sensitivity",
      body: "I can improve an aging frontend without treating it like a greenfield fantasy. The goal is cleaner systems with lower risk, not needless churn.",
    },
    {
      title: "Testing as part of implementation",
      body: "High-quality delivery means adding coverage where it protects the product, not leaving QA as a separate cleanup phase.",
    },
    {
      title: "Comfort in different operating environments",
      body: "I have worked in startups and larger organizations, which makes it easier to balance speed, clarity, and maintainability under different constraints.",
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
    title: "Open to frontend roles where quality is visible in the product.",
    body: "If you need someone who can shape the interface layer, improve consistency, and ship production-ready UI with care, I am available for conversations about permanent roles and strong product teams.",
    availability:
      "Best contact channel: email. CV download is available below.",
    primaryCtaLabel: "Email Alex",
    secondaryCtaLabel: "Open GitHub",
    tertiaryCtaLabel: "Download CV",
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
      label: "Intro",
      index: 0,
      title: "Introduction",
      shortDescription: "Positioning, links, and hiring context.",
    },
    {
      id: SectionId.Capabilities,
      label: "Skills",
      index: 1,
      title: "Capabilities",
      shortDescription: "Technical strengths and frontend focus areas.",
    },
    {
      id: SectionId.Experience,
      label: "Experience",
      index: 2,
      title: "Experience",
      shortDescription: "Selected roles and delivery outcomes.",
    },
    {
      id: SectionId.Projects,
      label: "Projects",
      index: 3,
      title: "Selected Projects",
      shortDescription: "Archived builds and static concepts collected in one place.",
    },
    {
      id: SectionId.Proof,
      label: "Proof",
      index: 4,
      title: "Working Style",
      shortDescription: "How Alex adds value in real teams.",
    },
    {
      id: SectionId.Contact,
      label: "Contact",
      index: 5,
      title: "Hire Me",
      shortDescription: "Direct outreach and CV access.",
    },
  ],
};
