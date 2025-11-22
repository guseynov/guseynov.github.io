import React from 'react';

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

export const Skillset = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mb-24">
      <div className="lg:col-span-2 col-span-12 flex items-start">
        <span className="uppercase tracking-widest text-sm font-outfit font-bold text-white/60 mt-4">
          Skillset
        </span>
      </div>
      <div className="lg:col-span-10 col-span-12">
        <div className="simple-glass rounded-3xl p-8 lg:p-12 animate__animated animate__fadeIn">
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill, index) => (
              <div
                key={`skill-${index}`}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-outfit text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
