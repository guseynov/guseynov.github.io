export const Contacts = () => {
  return (
    <div className="rounded-2xl border border-white overflow-hidden">
      <div className="bg-white uppercase text-dark text-center py-8 text-4xl">
        Hello
      </div>
      <div className="text-center uppercase color-white xl:text-7xl text-4xl xl:py-24 py-20 font-milligram">
        L<span className="font-dirtyline">e</span>t’s w
        <span className="font-dirtyline">o</span>r<i>k</i> t
        <span className="font-dirtyline">o</span>g<i>e</i>t
        <span className="font-dirtyline">h</span>e<i>r</i>!
      </div>
      <div className="flex border-t border-white text-2xl">
        <a
          target="_blank"
          href="https://api.whatsapp.com/send?phone=972535611522"
          className="flex-grow uppercase py-8 text-center flex justify-center items-center hover:bg-white hover:text-dark group border-r border-white basis-1/3 lg:text-base text-xs"
        >
          Whatsapp
          <svg
            className="lg:ml-2.5 ml-1 lg:w-auto w-2"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1649 1.80718H0.888936V0H16.25V15.3611H14.4428V3.08506L1.52787 16L0.25 14.7221L13.1649 1.80718Z"
              fill="white"
              className="group-hover:fill-dark"
            />
          </svg>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/aguseynov/"
          className="flex-grow uppercase py-8 text-center  flex justify-center items-center hover:bg-white hover:text-dark group border-r border-white basis-1/3 lg:text-base text-xs"
        >
          LinkedIn
          <svg
            className="lg:ml-2.5 ml-1 lg:w-auto w-2"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1649 1.80718H0.888936V0H16.25V15.3611H14.4428V3.08506L1.52787 16L0.25 14.7221L13.1649 1.80718Z"
              fill="white"
              className="group-hover:fill-dark"
            />
          </svg>
        </a>
        <a
          href="mailto:alex.guseynov.23@gmail.com"
          target="_blank"
          className="flex-grow uppercase py-8 text-center  flex justify-center items-center hover:bg-white hover:text-dark group border-r border-white basis-1/3 lg:text-base text-xs"
        >
          Email
          <svg
            className="lg:ml-2.5 ml-1 lg:w-auto w-2"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1649 1.80718H0.888936V0H16.25V15.3611H14.4428V3.08506L1.52787 16L0.25 14.7221L13.1649 1.80718Z"
              fill="white"
              className="group-hover:fill-dark"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
