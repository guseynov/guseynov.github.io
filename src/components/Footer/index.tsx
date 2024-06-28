export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="grid grid-cols-12 gap-4 text-white py-5 font-light text-sm mt-10">
      <div className="xl:block hidden col-span-2">Alex Guseynov</div>
      <div className="xl:block hidden col-span-2 col-start-3">
        Based in Israel
      </div>
      <div className="xl:block hidden col-span-2 col-start-5">
        Frontend Developer
      </div>
      <div className="xl:col-span-6 col-span-12 flex xl:justify-end justify-center xl:col-start-7">
        <button
          className="text-gray flex items-center gap-2"
          onClick={scrollToTop}
        >
          <span>Back to top</span>
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
    </footer>
  );
};
