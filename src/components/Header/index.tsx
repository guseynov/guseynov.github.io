export const Header = () => {
  return (
    <header className="text-white py-5 sticky top-0 z-10 frosted-glass">
      <div className="grid grid-cols-12 gap-4 w-[1200px] mx-auto">
        <div className="col-span-1">Alex Guseynov</div>
        <div className="col-span-1 col-start-3">Based in Israel</div>
        <div className="col-span-1 col-start-5">Frontend Developer</div>
        <div className="col-span-7 text-right">
          <a
            href="#about"
            className="inline-block text-center w-36 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            About
          </a>
          <a
            href="#experience"
            className="inline-block text-center w-36 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            Experience
          </a>
          <a
            href="#work"
            className="inline-block text-center w-36 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            Work
          </a>
          <a
            href="#contacts"
            className="inline-block text-center w-36 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};
