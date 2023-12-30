import './App.scss';
import 'animate.css/animate.min.css';
import { Contacts } from './components/Contacts';
import { ExperienceItem } from './components/ExperienceItem';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProjectItem } from './components/ProjectItem';
import { Skill } from './components/Skill';
import Slider from './components/Slider';

function App() {
  return (
    <div className="bg-noise font-inter text-white">
      <Header />

      <div className="w-[1200px] mx-auto">
        <div className="relative h-[calc(100vh-88px)] min-h-[720px]">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <h1 className="uppercase text-8xl mt-10 font-milligram animate__animated animate__fadeInDown">
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

            <div className="col-span-7 col-start-1">
              <div className="image rounded-full overflow-hidden h-[280px] animate__animated animate__fadeIn">
                <img
                  className="relative -top-[210px]"
                  src="/photo.jpeg"
                  alt=""
                />
              </div>
            </div>

            <div className="col-span-1 col-start-1">
              <button className="animate__animated animate__fadeInDown">
                <img className="" src="/arrow.svg" alt="" />
              </button>
            </div>
            <div className="col-span-11 text-right">
              <a
                className="name-link"
                target="_blank"
                href="https://api.whatsapp.com/send?phone=972535611522"
              >
                <h1 className="name uppercase text-8xl mt-10 absolute bottom-0 right-0 font-milligram animate__animated animate__fadeInUp">
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
          <div className="col-span-2">About</div>
          <div className="col-span-10 text-xl font-light">
            <p className="mb-8">
              I am a Frontend Engineer with over 8 years of experience,
              dedicated to transforming beautiful designs into scalable and
              maintainable code. Proficient in React, TypeScript, and Tailwind,
              I have adapted to various work environments, from dynamic startups
              to some of the country's largest corporations. My commitment lies
              in writing clean code, embracing advanced technologies, and
              contributing to impactful projects.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">Skillset</div>
          <div className="col-span-10">
            <div className="flex flex-wrap">
              <Skill title="HTML5" />
              <Skill title="CSS3" />
              <Skill title="JAVASCRIPT" />
              <Skill title="REACT" />
              <Skill title="VUE" />
              <Skill title="REDUX" />
              <Skill title="TYPESCRIPT" />
              <Skill title="TAILWIND" />
              <Skill title="UNIT TESTING" />
              <Skill title="E2E TESTING" />
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-white mt-24 mb-6"></div>
        <div className="grid grid-cols-12 gap-4" id="experience">
          <div className="col-span-2">Experience</div>
        </div>
      </div>

      <div className="relative mt-20">
        <div className="experience-line"></div>
        <Slider>
          <ExperienceItem
            title="BYLITH"
            position="Frontend Developer"
            period="Mar 2023 — Present"
            points={[
              `Leading the development and maintenance of a custom UI kit,
              comprising over 40 components using Vue 3, for use across
              company projects.`,
              `Directing quality assurance, including unit testing with Vitest
              and end-to-end testing with Playwright.`,
            ]}
            skills={['Vue', 'Playwright', 'Vitest']}
          />
          <ExperienceItem
            title="SBERBANK"
            position="Frontend Developer"
            period="Feb 2021 — Mar 2023"
            points={[
              `Developed and maintained an EdTech Microfrontend (MFE)
              project, utilizing React, TypeScript, Tailwind CSS, and
              Effector.`,
              `Successfully migrated a legacy monolith project to a
              microfrontend architecture, enhancing scalability and
              performance.`,
              `Conducted comprehensive unit and end-to-end testing using
              Jest and Puppeteer to maintain high code quality.`,
            ]}
            skills={['React.js', 'JAVASCRIPT', 'TypeScript']}
          />

          <ExperienceItem
            title="FutureComes"
            position="Frontend Developer"
            period="Apr 2020 — Feb 2021"
            points={[
              `Developed a SPA for an educational project of one of the
              largest banks in the country, effectively blending learning
              with gamified experiences.`,
              `Conducted peer code reviews, contributing to team
              knowledge and maintaining coding best practices.`,
            ]}
            skills={['React.js', 'JAVASCRIPT', 'TypeScript']}
          />

          <ExperienceItem
            title="Freelance"
            position="Frontend Developer"
            period="Nov 2018 — Apr 2020"
            points={[
              `Managed the full cycle of frontend development for various
              client projects, showcasing independence and project
              management expertise.`,
              `Collaborated with designers to turn creative concepts into
              functional web designs, ensuring both client satisfaction and
              visual quality.`,
              `Actively pursued learning and integrating React and Redux
              into projects, demonstrating dedication to staying current
              with evolving industry technologies.`,
            ]}
            skills={['React.js', 'JAVASCRIPT']}
          />

          <ExperienceItem
            title="Netrika"
            position="Frontend Developer"
            period="Jun 2017 — Nov 2018"
            points={[
              `Crafted high-performance commercial and promotional
              websites using JavaScript libraries, HTML, and CSS
              preprocessors, significantly enhancing user experience and
              interaction.`,
              `Delivered accessible and responsive websites for government
              institutions, ensuring compatibility with older browsers and
              support for lower resolutions, thereby extending outreach
              and usability.`,
            ]}
            skills={['CSS', 'JAVASCRIPT', 'Gulp', 'Stylus', 'Sass']}
          />

          <ExperienceItem
            title="RoyalMark"
            position="Frontend Developer"
            period="Mar 2015 — May 2017"
            points={[
              `Directed end-to-end development of over 30 projects,
              utilizing HTML, CSS, JavaScript, and PHP, demonstrating
              strong project management and technical skills.`,
              `Developed responsive websites with user-centric
              architectures, integrating analytics to enhance user
              engagement and performance tracking.`,
              `Engineered a custom CMS, streamlining content updates and
              administration processes.`,
            ]}
            skills={[
              'Jquery',
              'Php',
              'MySQL',
              'JAVASCRIPT',
              'CSS',
              'SCSS',
              'Gulp',
            ]}
          />
        </Slider>
      </div>
      <div className="w-[1200px] mx-auto">
        <div className="h-[1px] bg-white my-6"></div>

        <div className="grid grid-cols-12 gap-4" id="work">
          <div className="col-span-2">Recent work</div>
          <div className="col-span-10">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 mb-4">
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
              <div className="col-span-4">
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
              <div className="col-span-4 col-start-5">
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
              <div className="col-span-4">
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
              <div className="col-span-4">
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
              <div className="col-span-4">
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
        <div className="h-[1px] bg-white mt-32 mb-6"></div>
        <div className="grid grid-cols-12 gap-4" id="contacts">
          <div className="col-span-2 mb-20">Contacts</div>
          <div className="col-span-12">
            <Contacts />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
