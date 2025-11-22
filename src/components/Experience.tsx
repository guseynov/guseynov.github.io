import React from 'react';
import Slider from './Slider';
import { ExperienceItem } from './ExperienceItem';

const EXPERIENCE = [
  {
    title: 'Twee',
    position: 'Frontend Developer',
    period: 'Aug 2024 — Present',
    points: [
      `Creating scalable React components and implementing a structured SCSS architecture to enhance UI consistency and maintainability for an AI-powered educational platform.`,
      `Supporting backend development by building MVC components in ASP.NET/C# to facilitate efficient data integration.`,
    ],
    skills: ['React', 'SCSS', 'ASP.NET', 'C#'],
  },
  {
    title: 'BYLITH',
    position: 'Frontend Developer',
    period: 'Mar 2023 — Aug 2024',
    points: [
      `Leading the development and maintenance of a custom UI kit, comprising over 40 components using Vue 3, for use across company projects.`,
      `Directing quality assurance, including unit testing with Vitest and end-to-end testing with Playwright.`,
    ],
    skills: ['Vue', 'Playwright', 'Vitest'],
  },
  {
    title: 'SBERBANK',
    position: 'Frontend Developer',
    period: 'Feb 2021 — Mar 2023',
    points: [
      `Developed and maintained an EdTech Microfrontend (MFE) project, utilizing React, TypeScript, Tailwind CSS, and Effector.`,
      `Successfully migrated a legacy monolith project to a microfrontend architecture, enhancing scalability and performance.`,
      `Conducted comprehensive unit and end-to-end testing using
      Jest and Puppeteer to maintain high code quality.`,
    ],
    skills: ['React.js', 'JAVASCRIPT', 'TypeScript'],
  },
  {
    title: 'FutureComes',
    position: 'Frontend Developer',
    period: 'Apr 2020 — Feb 2021',
    points: [
      `Developed a SPA for an educational project of one of the
      largest banks in the country, effectively blending learning
      with gamified experiences.`,
      `Conducted peer code reviews, contributing to team
      knowledge and maintaining coding best practices.`,
    ],
    skills: ['React.js', 'JAVASCRIPT', 'TypeScript'],
  },
  {
    title: 'Freelance',
    position: 'Frontend Developer',
    period: 'Nov 2018 — Apr 2020',
    points: [
      `Managed the full cycle of frontend development for various
      client projects, showcasing independence and project
      management expertise.`,
      `Collaborated with designers to turn creative concepts into
      functional web designs, ensuring both client satisfaction and
      visual quality.`,
      `Actively pursued learning and integrating React and Redux
      into projects, demonstrating dedication to staying current
      with evolving industry technologies.`,
    ],
    skills: ['React.js', 'JAVASCRIPT'],
  },
  {
    title: 'Netrika',
    position: 'Frontend Developer',
    period: 'Jun 2017 — Nov 2018',
    points: [
      `Crafted high-performance commercial and promotional
      websites using JavaScript libraries, HTML, and CSS
      preprocessors, significantly enhancing user experience and
      interaction.`,
      `Delivered accessible and responsive websites for government
      institutions, ensuring compatibility with older browsers and
      support for lower resolutions, thereby extending outreach
      and usability.`,
    ],
    skills: ['CSS', 'JAVASCRIPT', 'Gulp', 'Stylus', 'Sass'],
  },
  {
    title: 'RoyalMark',
    position: 'Frontend Developer',
    period: 'Mar 2015 — May 2017',
    points: [
      `Directed end-to-end development of over 30 projects,
      utilizing HTML, CSS, JavaScript, and PHP, demonstrating
      strong project management and technical skills.`,
      `Developed responsive websites with user-centric
      architectures, integrating analytics to enhance user
      engagement and performance tracking.`,
      `Engineered a custom CMS, streamlining content updates and
      administration processes.`,
    ],
    skills: ['Jquery', 'Php', 'MySQL', 'JAVASCRIPT', 'CSS', 'SCSS', 'Gulp'],
  },
];

export const Experience = () => {
  return (
    <>
      <div className="xl:w-[1200px] xl:mx-auto xl:px-0 px-4">
        <div className="grid grid-cols-12 gap-4" id="experience">
          <div className="lg:col-span-2 col-span-12 flex items-start">
            <span className="uppercase tracking-widest text-sm font-outfit font-bold text-white/60 mt-4">
              Experience
            </span>
          </div>
        </div>
      </div>

      <div className="justify-center mt-5 flex lg:hidden">
        <div className="items-center px-4 py-2 gap-3 border border-white rounded-full text-xs font-extralight border-opacity-25 uppercase inline-flex">
          <span>Swipe to see more</span>
          <img className="w-4" src="/swipe.svg" alt="Swipe to see more" />
        </div>
      </div>
      <div className="relative">
        <Slider>
          {EXPERIENCE.map((experience, index) => (
            <ExperienceItem key={`experience-${index}`} {...experience} />
          ))}
        </Slider>
      </div>
    </>
  );
};
