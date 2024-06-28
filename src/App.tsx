import './App.scss';
import 'animate.css/animate.min.css';
import { Contacts } from './components/Contacts';
import { ExperienceItem } from './components/ExperienceItem';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProjectItem } from './components/ProjectItem';
import { Skill } from './components/Skill';
import Slider from './components/Slider';
import { useCallback, useRef, useState } from 'react';
import MobileMenu from './components/MobileMenu';

const SKILLS = [
  'HTML5',
  'CSS3',
  'JAVASCRIPT',
  'REACT',
  'VUE',
  'REDUX',
  'TYPESCRIPT',
  'TAILWIND',
  'UNIT TESTING',
  'E2E TESTING',
];

const EXPERIENCE = [
  {
    title: 'BYLITH',
    position: 'Frontend Developer',
    period: 'Mar 2023 — Present',
    points: [
      `Leading the development and maintenance of a custom UI kit,
      comprising over 40 components using Vue 3, for use across
      company projects.`,
      `Directing quality assurance, including unit testing with Vitest
      and end-to-end testing with Playwright.`,
    ],
    skills: ['Vue', 'Playwright', 'Vitest'],
  },
  {
    title: 'SBERBANK',
    position: 'Frontend Developer',
    period: 'Feb 2021 — Mar 2023',
    points: [
      `Developed and maintained an EdTech Microfrontend (MFE)
      project, utilizing React, TypeScript, Tailwind CSS, and
      Effector.`,
      `Successfully migrated a legacy monolith project to a
      microfrontend architecture, enhancing scalability and
      performance.`,
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

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-noise font-inter text-white">
      <div className="grid-bg">
        <Header openMenu={toggleMobileMenu} />

        <div className="xl:w-[1200px] xl:mx-auto xl:px-0 px-4">
          <div className="relative xl:h-[calc(100vh-88px)] xl:min-h-[720px]">
            <div className="grid grid-cols-12 gap-4">
              <div className="xl:col-span-5 col-span-12">
                <h1 className="uppercase xl:text-8xl text-4xl mt-10 font-milligram animate__animated animate__fadeInDown">
                  <span className="font-dirtyline">f</span>r
                  <span className="italic">o</span>n
                  <span className="font-dirtyline">t</span>e
                  <span className="font-dirtyline">n</span>d
                  <br />
                  <span className="font-dirtyline">e</span>ng
                  <span className="font-dirtyline">i</span>n
                  <span className="font-dirtyline">e</span>e
                  <span className="font-dirtyline">r</span>
                </h1>
              </div>

              <div className="xl:col-span-7 xl:col-start-1 col-span-12">
                <div className="image rounded-full overflow-hidden xl:h-[280px] xl:w-full lg:w-[500px] lg:h-[200px] w-[200px] h-[100px] animate__animated animate__fadeIn">
                  <img
                    className="relative xl:-top-[210px] lg:-top-[150px] -top-[50px]"
                    src="/photo.jpeg"
                    alt=""
                  />
                </div>
              </div>

              <div className="xl:col-span-1 xl:col-start-1 col-span-1 hidden xl:block">
                <button className="animate__animated animate__fadeInDown">
                  <img src="/arrow.svg" alt="" />
                </button>
              </div>
              <div className="xl:col-span-11 col-span-12 text-right">
                <a
                  className="name-link"
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=972535611522"
                >
                  <h1 className="name uppercase xl:text-8xl text-4xl xl:mt-10 xl:absolute bottom-0 right-0 font-milligram animate__animated animate__fadeInUp">
                    a<span className="font-dirtyline">l</span>
                    <span className="italic">e</span>x<br></br>g
                    <span className="font-dirtyline">u</span>sey
                    <span className="italic">n</span>o
                    <span className="font-dirtyline">v</span>
                  </h1>
                </a>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-white my-6"></div>
          <div className="grid grid-cols-12 gap-4" id="about">
            <div className="lg:col-span-2 col-span-12">About</div>
            <div className="lg:col-span-10 col-span-12 xl:text-lg font-light">
              <p className="mb-8">
                Hi! I'm Alex, a frontend engineer based in Israel{' '}
                <span className="text-3xl">👨🏼‍💻</span>
                <br />
                <br />
                With 9 years of experience in the field, I enjoy working with
                React / Vue, TypeScript and Tailwind. I've worked in both
                startups and big companies, turning designs into clean, scalable
                code. My passion is to create visually appealing and
                user-friendly interfaces. I'm looking for new opportunities to
                grow and contribute to exciting projects.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-2 col-span-12">Skillset</div>
            <div className="lg:col-span-10 col-span-12">
              <div className="flex flex-wrap">
                {SKILLS.map((skill, index) => (
                  <Skill key={`skill-${index}`} title={skill} />
                ))}
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-white mt-24 mb-6"></div>
          <div className="grid grid-cols-12 gap-4" id="experience">
            <div className="lg:col-span-2 col-span-12">Experience</div>
          </div>
        </div>

        <div className="justify-center mt-5 flex lg:hidden">
          <div className="items-center px-4 py-2 gap-3 border border-white rounded-full text-xs font-extralight border-opacity-25 uppercase inline-flex">
            <span>Swipe to see more</span>
            <img className="w-4" src="/swipe.svg" alt="Swipe to see more" />
          </div>
        </div>
        <div className="relative">
          <div className="experience-line"></div>
          <Slider>
            {EXPERIENCE.map((experience, index) => (
              <ExperienceItem key={`experience-${index}`} {...experience} />
            ))}
          </Slider>
        </div>
        <div className="xl:w-[1200px] xl:mx-auto xl:px-0 px-4">
          <div className="h-[1px] bg-white lg:my-6 my-2" />

          <div className="grid grid-cols-12 gap-4" id="work">
            <div className="lg:col-span-2 col-span-12">Recent work</div>
            <div className="lg:col-span-10 col-span-12">
              <div className="grid grid-cols-12 gap-4 mb-4 lg:mb-0">
                <div className="xl:col-span-4 lg:mb-4 lg:col-span-6 col-span-12">
                  <ProjectItem
                    title="Synthesizer"
                    skills={['React', 'Typescript']}
                    icons={['react', 'typescript']}
                    projectLink={'/projects/react/synthesizer/build'}
                    codeLink={
                      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/synthesizer'
                    }
                  />
                </div>
                <div className="xl:col-span-4 lg:col-span-6 col-span-12">
                  <ProjectItem
                    title="Breathing Bubble"
                    skills={['Vue', 'VueX']}
                    icons={['vue', 'vuex']}
                    projectLink={'projects/react/breathing_bubble/build'}
                    codeLink={
                      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/breathing_bubble'
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="xl:col-span-4 xl:col-start-5 lg:col-span-6 col-span-12">
                  <ProjectItem
                    title="To-do list with categories"
                    skills={['Vue', 'VueX']}
                    icons={['vue', 'vuex']}
                    projectLink={'projects/vue/todo/dist'}
                    codeLink={
                      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/vue/todo'
                    }
                  />
                </div>
                <div className="xl:col-span-4 lg:col-span-6 col-span-12">
                  <ProjectItem
                    title="Calculator"
                    skills={['React', 'Redux']}
                    icons={['react', 'redux']}
                    projectLink={'projects/react/calculator/build'}
                    codeLink={
                      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/calculator'
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="xl:col-span-4 lg:col-span-6 col-span-12">
                  <ProjectItem
                    title="Forecast"
                    skills={['React']}
                    icons={['react']}
                    projectLink={'projects/react/weather/build'}
                    codeLink={
                      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/weather'
                    }
                  />
                </div>
                <div className="xl:col-span-4 lg:col-span-6 col-span-12">
                  <ProjectItem
                    title="Metronome"
                    skills={['React']}
                    icons={['react']}
                    projectLink={'projects/react/metronome/build'}
                    codeLink={
                      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/metronome'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-white lg:mt-32 mt-6 mb-6"></div>
          <div className="grid grid-cols-12 gap-4" id="contacts">
            <div className="col-span-2 xl:mb-20 mb-12">Contacts</div>
            <div className="col-span-12">
              <Contacts />
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <MobileMenu closeMenu={toggleMobileMenu} isActive={isMobileMenuOpen} />
    </div>
  );
}

export default App;
