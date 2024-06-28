import classNames from 'classnames';
import { scrollToAnchor } from '../../utils/scrollToAnchor';

export const MobileMenu = ({
  isActive,
  closeMenu,
}: {
  isActive: boolean;
  closeMenu: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    scrollToAnchor(e);
  };
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 w-full h-full bg-[#171717] z-50 transition-all',
        {
          'opacity-100': isActive,
          'opacity-0': !isActive,
          'pointer-events-none': !isActive,
          'pointer-events-auto': isActive,
          'scale-0': !isActive,
          'scale-100': isActive,
        }
      )}
    >
      <div className="fixed top-4 right-4">
        <button onClick={closeMenu}>
          <img className="w-6" src="/close.svg" alt="Close" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-full w-full px-2">
        <a
          onClick={handleClick}
          href="#about"
          className="uppercase border rounded-full py-4 text-3xl w-full text-center"
        >
          About
        </a>
        <a
          onClick={handleClick}
          href="#experience"
          className="uppercase border rounded-full py-4 text-3xl w-full text-center"
        >
          Experience
        </a>
        <a
          onClick={handleClick}
          href="#work"
          className="uppercase border rounded-full py-4 text-3xl w-full text-center"
        >
          Work
        </a>
        <a
          onClick={handleClick}
          href="#contacts"
          className="uppercase border rounded-full py-4 text-3xl w-full text-center"
        >
          Contacts
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
