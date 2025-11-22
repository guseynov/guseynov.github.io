import React from 'react';

export const Hero = () => {
  return (
    <div className="xl:w-[1200px] xl:mx-auto xl:px-0 px-4 mb-10">
      <div className="relative xl:h-[calc(100vh-88px)] xl:min-h-[720px] flex flex-col justify-center">
        <div className="grid grid-cols-12 gap-6">
          {/* Title Widget */}
          <div className="xl:col-span-8 col-span-12">
            <div className="simple-glass rounded-3xl p-10 h-full flex items-center animate__animated animate__fadeInDown">
              <h1 className="uppercase xl:text-8xl text-4xl font-outfit font-extrabold leading-tight">
                Frontend
                <br />
                Engineer
              </h1>
            </div>
          </div>

          {/* Photo Widget */}
          <div className="xl:col-span-4 col-span-12">
            <div className="simple-glass rounded-3xl p-4 h-full flex items-center justify-center animate__animated animate__fadeIn">
              <div className="rounded-2xl overflow-hidden w-full h-full relative min-h-[300px]">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/photo.jpeg"
                  alt="Alex Guseynov"
                />
              </div>
            </div>
          </div>

          {/* Arrow / Spacer (Optional, or integrated) */}
           <div className="xl:col-span-4 col-span-12 hidden xl:flex items-center justify-center">
             <div className="simple-glass rounded-full w-24 h-24 flex items-center justify-center animate__animated animate__fadeInUp cursor-pointer hover:scale-110 transition-transform duration-300">
                <img src="/arrow.svg" alt="Scroll down" className="w-8 h-8" />
             </div>
           </div>

          {/* Name Widget */}
          <div className="xl:col-span-8 col-span-12">
            <a
              href="https://api.whatsapp.com/send?phone=972535611522"
              target="_blank"
              rel="noreferrer"
              className="block h-full"
            >
              <div className="simple-glass rounded-3xl p-10 h-full flex items-center justify-end hover:bg-white/5 transition-colors duration-300 animate__animated animate__fadeInUp">
                <h1 className="name uppercase xl:text-8xl text-4xl font-outfit font-extrabold text-right leading-tight">
                  Alex Guseynov
                </h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
