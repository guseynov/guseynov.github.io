import React from 'react';

export const About = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mb-24" id="about">
      <div className="lg:col-span-2 col-span-12 flex items-start">
        <span className="uppercase tracking-widest text-sm font-outfit font-bold text-white/60 mt-4">
          About
        </span>
      </div>
      <div className="lg:col-span-10 col-span-12">
        <div className="simple-glass rounded-3xl p-8 lg:p-12 animate__animated animate__fadeIn">
          <p className="font-outfit text-xl lg:text-2xl leading-relaxed text-white/90 font-light">
            Hi! I'm Alex, a Senior Frontend Engineer based in Georgia{' '}
            <span className="text-3xl inline-block">
              👨🏼‍💻
            </span>
            <br />
            <br />
            With over a decade of experience, I specialize in building scalable,
            high-performance web applications using React, Vue, TypeScript, and
            Tailwind CSS. My background spans from crafting EdTech platforms and
            FinTech solutions to developing comprehensive UI kits and migrating
            complex monoliths to microfrontends.
            <br />
            <br />
            I thrive on turning complex requirements into polished,
            user-friendly interfaces. Whether it's architecting a new
            application from scratch or optimizing an existing codebase, I focus
            on writing clean, maintainable code and delivering exceptional user
            experiences.
          </p>
        </div>
      </div>
    </div>
  );
};
