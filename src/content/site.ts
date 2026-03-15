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
  shortDescription: string;
}

export interface SkillGroup {
  title: string;
  summary: string;
  items: string[];
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
    experienceLabel: "10 years building production interfaces",
    email: "alex.guseynov.23@gmail.com",
    githubUrl: "https://github.com/guseynov",
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
      id: SectionId.Proof,
      label: "Proof",
      index: 3,
      title: "Working Style",
      shortDescription: "How Alex adds value in real teams.",
    },
    {
      id: SectionId.Contact,
      label: "Contact",
      index: 4,
      title: "Hire Me",
      shortDescription: "Direct outreach and CV access.",
    },
  ],
};
