export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="grid grid-cols-12 gap-4 text-white py-5 sticky top-0 bg-noise z-10 pt-8 pb-4">
      <div className="col-span-1">Alex Guseynov</div>
      <div className="col-span-1 col-start-3">Based in Israel</div>
      <div className="col-span-1 col-start-5">Frontend Developer</div>
      <div className="col-span-7 flex justify-end">
        <button className="text-gray flex items-center" onClick={scrollToTop}>
          <span className="mr-2">Back to top</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_202_662)">
              <path d="M15 12L8 5L1 12" stroke="#565656" />
            </g>
            <defs>
              <clipPath id="clip0_202_662">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(16) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </header>
  );
};
