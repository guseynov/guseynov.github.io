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
        <div className="relative">
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
              <h1 className="uppercase text-8xl mt-10 absolute bottom-0 right-0 font-milligram animate__animated animate__fadeInUp">
                a<span className="font-dirtyline">l</span>
                <span className="italic">e</span>x<br></br>g
                <span className="font-dirtyline">u</span>sey
                <span className="italic">n</span>o
                <span className="font-dirtyline">v</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-white my-10"></div>
        <div className="grid grid-cols-12 gap-4" id="about">
          <div className="col-span-2">About</div>
          <div className="col-span-10 text-4xl leading-tight">
            <p>Experience: 7+ years</p>
            <br></br>
            <p>Education: Bachelor of Computer Science</p>
            <br></br>

            <p className="mb-12">
              I am a React web developer with over 7 years of professional
              experience. Armed with proficient knowledge in all the parts of a
              modern React application: from pixel-perfect markup to complex app
              architecture. Have experience in creating and maintaining projects
              of any scale, including large scaled projects for the country's
              leading companies. Passionate about creating quality code that
              delivers excellent user experience.
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
              <Skill title="REACT.JS" />
              <Skill title="UNIT TESTING" />
              <Skill title="E2E TESTING" />
              <Skill title="CI/CD" />
              <Skill title="VUE" />
              <Skill title="MOBX" />
              <Skill title="REDUX" />
              <Skill title="VUEX" />
              <Skill title="SASS" />
              <Skill title="WEBPACK" />
              <Skill title="EFFECTOR" />
              <Skill title="TYPESCRIPT" />
              <Skill title="GraphQL" />
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-white my-10"></div>
      </div>

      <div className="relative" id="experience">
        <div className="experience-line"></div>
        <Slider>
          <ExperienceItem
            title="SBERBANK"
            position="Frontend Developer"
            period="Aug 2020 — Present"
            description={`As a Frontend React Engineer at Sberbank, I am responsible for the development and maintenance of a complex app for an educational project. I utilize React with TypeScript, Effector, and GraphQL in my work and am also responsible for creating unit and E2E tests.`}
            skills={['React.js', 'JAVASCRIPT', ' TypeScript']}
          />

          <ExperienceItem
            title="FutureComes"
            position="Frontend Developer"
            period="Aug 2020 — Present"
            description={`At FutureComes, I was taking part in developing a game-like project for a leading Russian bank that involved lots of complex frontend solutions for making the app interactive and engaging.`}
            skills={['React.js', 'JAVASCRIPT', ' TypeScript']}
          />

          <ExperienceItem
            title="Freelance"
            position="Frontend Developer"
            period="Aug 2020 — Present"
            description={`During these years, I was working for myself, responsible for the entire cycle of frontend development.`}
            skills={['React.js', 'JAVASCRIPT', ' TypeScript']}
          />

          <ExperienceItem
            title="Netrika"
            position="Frontend Developer"
            period="Aug 2020 — Present"
            description={`At Netrika, I was working on maintaining and upgrading websites using JS libraries, HTML, and CSS preprocessors. Had experience in doing projects for the government, ensuring they worked on all sorts of devices and browsers.`}
            skills={['React.js', 'JAVASCRIPT', ' TypeScript']}
          />
          <ExperienceItem
            title="RoyalMark"
            position="Frontend Developer"
            period="Aug 2020 — Present"
            description={`At RoyalMark, I was responsible for the entire cycle of project creation, including backend development. I completed dozens of various projects of different complexity with stringent deadlines. I was creating web resources from scratch, providing close attention to detail, and making the end product look and work great on all sorts of devices.`}
            skills={['React.js', 'JAVASCRIPT', ' TypeScript']}
          />
        </Slider>
      </div>
      <div className="w-[1200px] mx-auto">
        <div className="h-[1px] bg-white my-10"></div>

        <div className="grid grid-cols-12 gap-4" id="work">
          <div className="col-span-2">Recent work</div>
          <div className="col-span-10">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 mb-4">
                <ProjectItem
                  title="Synthesizer"
                  skills={['React', 'Typescript']}
                  icons={['react', 'typescript']}
                  projectLink={'/projects/synthesizer'}
                  codeLink={''}
                />
              </div>
              <div className="col-span-4">
                <ProjectItem
                  title="Breathing Bubble"
                  skills={['Vue', 'VueX']}
                  icons={['vue', 'vuex']}
                  projectLink={''}
                  codeLink={''}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-4 col-start-5">
                <ProjectItem
                  title="To-do list with categories"
                  skills={['Vue', 'VueX']}
                  icons={['vue', 'vuex']}
                  projectLink={''}
                  codeLink={''}
                />
              </div>
              <div className="col-span-4">
                <ProjectItem
                  title="Hot or not"
                  skills={['Vue', 'VueX']}
                  icons={['vue', 'vuex']}
                  projectLink={''}
                  codeLink={''}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-4">
                <ProjectItem
                  title="Calculator"
                  skills={['React', 'Redux']}
                  icons={['react', 'redux']}
                  projectLink={''}
                  codeLink={''}
                />
              </div>
              <div className="col-span-4">
                <ProjectItem
                  title="Forecast"
                  skills={['React']}
                  icons={['react']}
                  projectLink={''}
                  codeLink={''}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-4 col-start-5">
                <ProjectItem
                  title="Metronome"
                  skills={['React']}
                  icons={['react']}
                  projectLink={''}
                  codeLink={''}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-white my-10"></div>
        <div className="grid grid-cols-12 gap-4" id="contacts">
          <div className="col-span-2">Contacts</div>
          <div className="col-span-10">
            <Contacts />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
