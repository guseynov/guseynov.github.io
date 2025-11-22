import React from 'react';
import { ProjectItem } from './ProjectItem';

const PROJECTS = [
  {
    title: 'Synthesizer',
    skills: ['React', 'Typescript'],
    icons: ['react', 'typescript'],
    projectLink: '/projects/react/synthesizer/build',
    codeLink:
      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/synthesizer',
  },
  {
    title: 'Breathing Bubble',
    skills: ['Vue', 'VueX'],
    icons: ['vue', 'vuex'],
    projectLink: 'projects/react/breathing_bubble/build',
    codeLink:
      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/breathing_bubble',
  },
  {
    title: 'To-do list with categories',
    skills: ['Vue', 'VueX'],
    icons: ['vue', 'vuex'],
    projectLink: 'projects/vue/todo/dist',
    codeLink:
      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/vue/todo',
  },
  {
    title: 'Calculator',
    skills: ['React', 'Redux'],
    icons: ['react', 'redux'],
    projectLink: 'projects/react/calculator/build',
    codeLink:
      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/calculator',
  },
  {
    title: 'Forecast',
    skills: ['React'],
    icons: ['react'],
    projectLink: 'projects/react/weather/build',
    codeLink:
      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/weather',
  },
  {
    title: 'Metronome',
    skills: ['React'],
    icons: ['react'],
    projectLink: 'projects/react/metronome/build',
    codeLink:
      'https://github.com/guseynov/guseynov.github.io/tree/master/projects/react/metronome',
  },
];

export const RecentWork = () => {
  return (
    <div className="xl:w-[1200px] xl:mx-auto xl:px-0 px-4">
      <div className="grid grid-cols-12 gap-4" id="work">
        <div className="lg:col-span-2 col-span-12 flex items-start">
          <span className="uppercase tracking-widest text-sm font-outfit font-bold text-white/60 mt-4">
            Recent work
          </span>
        </div>
        <div className="lg:col-span-10 col-span-12">
          <div className="grid grid-cols-12 gap-6">
            {PROJECTS.map((project, index) => (
              <div
                key={`project-${index}`}
                className="xl:col-span-6 col-span-12"
              >
                <ProjectItem {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
