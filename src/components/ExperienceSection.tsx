import { CornerButton } from "./CornerButton";

type Experience = {
  achievements: string[];
  company: string;
  period: string;
  responsibilities: string[];
  role: string;
};

const experiences: Experience[] = [
  {
    company: "Twee",
    period: "Aug 2024 - May 2026",
    role: "Senior Frontend Developer",
    responsibilities: [
      "Owned React and TypeScript workflows for an AI-assisted EdTech platform.",
      "Built lesson, classroom, admin, analytics, shared-component, and Stripe flows.",
      "Shaped API behavior and production UI states with product, design, backend, and QA.",
      "Changed ASP.NET/C# backend code when features crossed the stack.",
    ],
    achievements: [
      "Took unclear requirements through implementation, testing, and release.",
      "Delivered reliable mobile and desktop workflows across complex product areas.",
    ],
  },
  {
    company: "Bylith",
    period: "Mar 2023 - Aug 2024",
    role: "Senior Frontend Developer",
    responsibilities: [
      "Built the company UI kit from scratch and owned the component library end to end.",
      "Shipped reusable components with clear states, variants, and responsive behavior.",
      "Improved accessibility, mobile behavior, and edge-case handling.",
      "Kept shared patterns documented for product teams.",
    ],
    achievements: [
      "Established the reusable UI foundation used across the product.",
      "Helped product teams move faster through documented component patterns.",
    ],
  },
  {
    company: "Sberbank",
    period: "Feb 2021 - Mar 2023",
    role: "Senior Frontend Developer",
    responsibilities: [
      "Built teacher-facing task constructors and student learning flows.",
      "Worked on the move from a monorepo setup toward microfrontends.",
      "Supported answer storage, scoring, and review flows for completed tasks.",
    ],
    achievements: [
      "Reused widget patterns across products used by thousands of teachers and students.",
    ],
  },
  {
    company: "FUTURECOMES",
    period: "Apr 2020 - Feb 2021",
    role: "Frontend Developer",
    responsibilities: [
      "Built a React and Redux in-browser game with complex animation and gamified flows.",
      "Implemented sound, video, stateful API-driven screens, and responsive UI.",
    ],
    achievements: [
      "Set up reusable frontend structure that made new learning activities easier to add.",
    ],
  },
  {
    company: "Freelance",
    period: "2015 - 2020",
    role: "Frontend Developer",
    responsibilities: [
      "Delivered frontend and full-stack projects, including CMS and PHP development.",
      "Built responsive UI, API integrations, and production fixes and releases.",
      "Worked directly with clients and teams from first draft to launch.",
    ],
    achievements: ["Delivered production work reliably under tight deadlines."],
  },
];

const assetRoot = `${import.meta.env.BASE_URL}assets`;

type ExperienceEntryProps = {
  experience: Experience;
  featured: boolean;
};

function ExperienceEntry({ experience, featured }: ExperienceEntryProps) {
  const className = [
    "experience-entry",
    featured ? "experience-entry--featured" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className}>
      <div className="experience-entry__meta">
        <h3>{experience.company}</h3>
        <p>{experience.period}</p>
      </div>

      <div className="experience-entry__content">
        <h4>{experience.role}</h4>

        <div className="experience-entry__body">
          <div className="experience-entry__group">
            <h5>Responsibilities</h5>
            <ul>
              {experience.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <img
            alt=""
            aria-hidden="true"
            className="experience-entry__rule"
            src={`${assetRoot}/experience-rule.svg`}
          />

          <div className="experience-entry__group">
            <h5>Achievements</h5>
            <ul>
              {experience.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ExperienceSection() {
  return (
    <section className="experience" id="experience">
      <div className="experience__inner">
        <div className="experience__intro">
          <h2>
            Experience<sup>({experiences.length})</sup>
          </h2>

          <div className="experience__intro-body">
            <p>
              My recent work has concentrated on scalable component systems,
              product modernization, and disciplined frontend delivery across
              different team sizes.
            </p>

            <CornerButton
              ariaLabel="Download Alex Guseynov's full resume"
              className="experience__resume"
              download
              href={`${import.meta.env.BASE_URL}alex-guseynov-cv.pdf`}
            >
              <span className="experience__resume-label experience__resume-label--desktop">
                Download full resume
              </span>
              <span className="experience__resume-label experience__resume-label--mobile">
                Download full resume ↓
              </span>
            </CornerButton>
          </div>
        </div>

        <div className="experience__timeline">
          {experiences.map((experience, index) => (
            <div className="experience__timeline-item" key={experience.company}>
              <ExperienceEntry experience={experience} featured={index === 0} />
              {index < experiences.length - 1 ? (
                <p aria-hidden="true" className="experience__separator">
                  ///////////////////////////////////////////////
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
