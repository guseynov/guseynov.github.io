export const Contacts = () => {
  return (
    <div className="rounded-2xl border border-white overflow-hidden">
      <div className="bg-white uppercase text-dark text-center py-8 text-4xl">
        Hello
      </div>
      <div className="text-center uppercase color-white text-7xl py-24 font-milligram">
        L<span className="font-dirtyline">e</span>t’s w
        <span className="font-dirtyline">o</span>r<i>k</i> t
        <span className="font-dirtyline">o</span>g<i>e</i>t
        <span className="font-dirtyline">h</span>e<i>r</i>!
      </div>
      <div className="flex border-t border-white text-2xl">
        <a
          target="_blank"
          href="https://t.me/ahmedguseynov"
          className="flex-grow uppercase py-8 text-center flex justify-center items-center hover:bg-white hover:text-dark group border-r border-white"
        >
          Telegram
          <svg
            className="ml-2.5"
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
          className="flex-grow uppercase py-8 text-center  flex justify-center items-center hover:bg-white hover:text-dark group border-r border-white"
        >
          LinkedIn
          <svg
            className="ml-2.5"
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
          href=""
          className="flex-grow uppercase py-8 text-center  flex justify-center items-center hover:bg-white hover:text-dark group border-r border-white"
        >
          Whatsapp
          <svg
            className="ml-2.5"
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
          href="https://join.skype.com/invite/LSLCsLPa5MbV"
          target="_blank"
          className="flex-grow uppercase py-8 text-center  flex justify-center items-center hover:bg-white hover:text-dark group"
        >
          Skype
          <svg
            className="ml-2.5"
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
