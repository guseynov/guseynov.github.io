export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="simple-glass rounded-3xl p-6 grid grid-cols-12 gap-4 text-white font-outfit text-sm mt-10 items-center">
      <div className="xl:block hidden col-span-2 font-medium opacity-60">
        Alex Guseynov
      </div>
      <div className="xl:block hidden col-span-2 col-start-3 font-medium opacity-60">
        Based in Georgia
      </div>
      <div className="xl:block hidden col-span-2 col-start-5 font-medium opacity-60">
        Frontend Developer
      </div>
      <div className="xl:col-span-6 col-span-12 flex xl:justify-end justify-center xl:col-start-7">
        <button
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
          onClick={scrollToTop}
        >
          <span className="font-bold tracking-wide text-xs uppercase">
            Back to top
          </span>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 0L9.33013 7.5H0.669873L5 0Z"
                fill="white"
                className="opacity-80"
              />
            </svg>
          </div>
        </button>
      </div>
    </footer>
  );
};
