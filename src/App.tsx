import './App.scss';
import 'animate.css/animate.min.css';
import { Contacts } from './components/Contacts';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skillset } from './components/Skillset';
import { ExperienceItem } from './components/ExperienceItem';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RecentWork } from './components/RecentWork';
import { useCallback, useState } from 'react';
import MobileMenu from './components/MobileMenu';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-noise font-inter text-white">
      <div className="grid-bg">
        <Header openMenu={toggleMobileMenu} />

        <Hero />

        <div className="xl:w-[1200px] xl:mx-auto xl:px-0 px-4">
          <div className="h-[1px] bg-white my-6"></div>
          <About />
          <Skillset />
          <div className="h-[1px] bg-white mt-24 mb-6"></div>
        </div>

        <Experience />

        <div className="xl:w-[1200px] xl:mx-auto xl:px-0 px-4">
          <div className="h-[1px] bg-white lg:my-6 my-2" />

          <RecentWork />
          <div className="h-[1px] bg-white lg:mt-32 mt-6 mb-6"></div>
          <div className="grid grid-cols-12 gap-4" id="contacts">
            <div className="col-span-2 xl:mb-20 mb-12">Contacts</div>
            <div className="col-span-12">
              <Contacts />
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <MobileMenu closeMenu={toggleMobileMenu} isActive={isMobileMenuOpen} />
    </div>
  );
}

export default App;
