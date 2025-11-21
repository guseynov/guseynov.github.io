import Logo from './components/Logo';
import { scrollToAnchor } from '../../utils/scrollToAnchor';
import { LiquidGlass } from './LiquidGlass';

export const Header = ({ openMenu }: { openMenu: () => void }) => {
  return (
    <>
      <LiquidGlass id="liquid-glass" intensity={20} />
      <header className="text-white xl:p-6 py-2 sticky top-4 z-10 liquid-glass font-light text-sm border border-black border-opacity-10 shadow-sm rounded-full mx-4 xl:w-[1200px] xl:mx-auto">
        <div className="grid grid-cols-12 gap-4 xl:mx-auto xl:px-0 px-4 items-center">
          <div className="xl:col-span-3 lg:col-span-3 col-span-9">
            <div className="flex gap-2 items-center">
              <Logo />
              <span>Alex Guseynov</span>
            </div>
          </div>
        
          <div className="xl:col-span-9 lg:col-span-9 col-span-9 text-right hidden xl:flex justify-end gap-1">
            <a
              onClick={scrollToAnchor}
              href="#about"
              className="inline-block text-center px-6 py-2 font-sans text-sm font-medium rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              About
            </a>
            <a
              onClick={scrollToAnchor}
              href="#experience"
              className="inline-block text-center px-6 py-2 font-sans text-sm font-medium rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              Experience
            </a>
            <a
              onClick={scrollToAnchor}
              href="#work"
              className="inline-block text-center px-6 py-2 font-sans text-sm font-medium rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              Work
            </a>
            <a
              onClick={scrollToAnchor}
              href="#contacts"
              className="inline-block text-center px-6 py-2 font-sans text-sm font-medium rounded-full hover:bg-white/10 transition-colors duration-200"
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
    </>
  );
};
