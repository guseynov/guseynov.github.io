import { useEffect } from 'react';
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
                <span className="font-dirtyline">r</span>e
                <span className="italic">a</span>c
                <span className="font-dirtyline">t</span>.j
                <span className="font-dirtyline">s</span> d
                <span className="font-dirtyline">e</span>vel
                <span className="font-dirtyline">o</span>pe
                <span className="italic">r</span>
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
          <div className="col-span-10 text-4xl leading-tight">
            <p className="mb-32">
              React Frontend Developer with a Bachelor's degree in Computer
              Science and 8 years of comprehensive experience specializing in
              crafting interactive, efficient, and user-focused solutions.
              <br></br>
              <br></br>
              Have experience leveraging HTML5, CSS3, JavaScript, React, Redux,
              and TypeScript to create and maintain various projects ranging
              from educational platforms to commercial websites.
              <br></br>
              <br></br>
              Equipped with a strong understanding of the full project life
              cycle and a proven track record of delivering projects on time
              without compromising quality. Skilled in navigating large
              codebases, including working with legacy code, showcasing a strong
              grasp of front-end development from simple landing pages to
              complex, interactive SPAs.
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
              `Development of a custom UI kit tailored to suit the specific needs of our
            projects. This involved implementation of various types of user inputs to
            facilitate diverse user interactions. The UI kit is comprehensive, featuring
            components like text fields, drop down menus, checkboxes, radio buttons,
            and sliders, among others`,
            ]}
            skills={['Vue']}
          />
          <ExperienceItem
            title="SBERBANK"
            position="Frontend Developer"
            period="Feb 2021 — Mar 2023"
            points={[
              `Developed and maintained educational MFE projects utilizing React,
            TypeScript, Tailwind, and Effector`,
              `Managed a large, legacy codebase and performed unit and E2E testing
            using Jest and Puppeteer`,
              `Collaborated with cross-functional teams and led peer code reviews`,
            ]}
            skills={['React.js', 'JAVASCRIPT', 'TypeScript']}
          />

          <ExperienceItem
            title="FutureComes"
            position="Frontend Developer"
            period="Apr 2020 — Feb 2021"
            points={[
              `Worked in a team to develop an interactive SPA for a leading bank,
              employing React and Redux`,
              `Delivered a user-centric project with complex animations and minigames on schedule`,
              `Collaborated with cross-functional teams and led peer code reviews`,
            ]}
            skills={['React.js', 'JAVASCRIPT', 'TypeScript']}
          />

          <ExperienceItem
            title="Freelance"
            position="Frontend Developer"
            period="Nov 2018 — Apr 2020"
            points={[
              `Managed full cycle frontend development for various client projects`,
              `Partnered with designers and integrated React and Redux into the
                workflow`,
            ]}
            skills={['React.js', 'JAVASCRIPT']}
          />

          <ExperienceItem
            title="Netrika"
            position="Frontend Developer"
            period="Jun 2017 — Nov 2018"
            points={[
              `Crafted commercial and promo websites using JS libraries, HTML, and
              CSS preprocessors, improving performance and user experience`,
              `Delivered accessible, responsive websites for government institutes
              supporting older browsers and low resolutions`,
            ]}
            skills={['CSS', 'JAVASCRIPT', 'Gulp', 'Stylus', 'Sass']}
          />

          <ExperienceItem
            title="RoyalMark"
            position="Frontend Developer"
            period="Mar 2015 — May 2017"
            points={[
              `Directed end-to-end project development, delivering over 30 projects
              using HTML, CSS, JavaScript, and PHP`,
              ` Developed responsive websites with user-friendly architectures and
              integrated analytics`,
              `Created a social network for athletes and a custom CMS for
              competition content management`,
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
