import Logo from './components/Logo';
import { scrollToAnchor } from '../../utils/scrollToAnchor';

export const Header = ({ openMenu }: { openMenu: () => void }) => {
  return (
    <header className="text-white xl:py-6 py-2 sticky top-0 z-10 frosted-glass font-light text-sm border border-black border-opacity-10 shadow-sm">
      <div className="grid grid-cols-12 gap-4 xl:w-[1200px] xl:mx-auto xl:px-0 px-4 items-center">
        <div className="xl:col-span-2 lg:col-span-3 col-span-9">
          <div className="flex gap-2 items-center">
            <Logo />
            <span>Alex Guseynov</span>
          </div>
        </div>
        <div className="xl:col-span-2 xl:col-start-3 col-span-3 col-start-4 hidden lg:block">
          <div className="flex align-middle gap-2">
            <img className="w-4" src="/code.svg" alt="pin" />
            <span>Frontend Developer</span>
          </div>
        </div>
        <div className="xl:col-span-2 xl:col-start-5 col-start-7 col-span-3 hidden lg:block">
          <div className="flex align-middle gap-2">
            <img className="w-4" src="/pin.svg" alt="pin" />
            <span>Netanya, Israel</span>
          </div>
        </div>
        <div className="col-span-6 text-right hidden xl:block">
          <a
            onClick={scrollToAnchor}
            href="#about"
            className="inline-block text-center xl:w-36 w-32 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            About
          </a>
          <a
            onClick={scrollToAnchor}
            href="#experience"
            className="inline-block text-center w-36 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            Experience
          </a>
          <a
            onClick={scrollToAnchor}
            href="#work"
            className="inline-block text-center w-36 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            Work
          </a>
          <a
            onClick={scrollToAnchor}
            href="#contacts"
            className="inline-block text-center w-36 font-milligram border-white py-2 rounded-full border uppercase hover:text-neutral-900 hover:bg-white"
          >
            Contact
          </a>
        </div>
        <div className="col-span-3 col-start-10 flex justify-end xl:hidden">
          <button onClick={openMenu}>
            <img className="w-6" src="/burger.svg" alt="Menu" />
          </button>
        </div>
      </div>
    </header>
  );
};
