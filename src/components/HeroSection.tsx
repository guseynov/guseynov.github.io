import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../data/navigation";
import { cvUrl } from "../data/site";
import { trackCtaClick, trackNavigationClick } from "../lib/analytics";
import { AsciiHero } from "./AsciiHero/AsciiHero";
import { AsciiLinkText } from "./AsciiLinkText";
import { CornerButton } from "./CornerButton";

const assetRoot = `${import.meta.env.BASE_URL}assets/hero`;

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (restoreFocus = false) => {
    setIsMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => openButtonRef.current?.focus());
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    closeButtonRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  return (
    <section className="hero-section relative min-h-[max(620px,100svh)] scroll-mt-[132px] overflow-clip bg-[#181818] md:min-h-[796px] md:scroll-mt-0" id="overview">
      <AsciiHero />
      <header className="hero-desktop-header relative z-10 hidden h-[87px] md:block">
        <div className="relative mx-auto h-full w-[min(calc(100%-192px),1088px)] max-[901px]:w-[calc(100%-80px)]">
          <a
            className="absolute top-8 left-0 text-xs leading-[18px] font-normal whitespace-nowrap transition-colors duration-160 hover:text-rule focus-visible:text-rule focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[901px]:hidden"
            href="#overview"
            onClick={() =>
              trackNavigationClick({
                href: "#overview",
                label: "Alex Guseynov",
                placement: "desktop_header",
              })
            }
          >
            <AsciiLinkText>Alex Guseynov</AsciiLinkText>
          </a>

          <nav
            aria-label="Primary"
            className="absolute top-8 left-1/2 flex -translate-x-1/2 gap-[13px] text-xs leading-[18px] font-normal whitespace-nowrap max-[901px]:left-0 max-[901px]:translate-x-0"
          >
            {navigation.map(({ href, label }) => (
              <a
                className="transition-colors duration-160 hover:text-rule focus-visible:text-rule focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href={href}
                key={href}
                onClick={() =>
                  trackNavigationClick({
                    href,
                    label,
                    placement: "desktop_header",
                  })
                }
              >
                <AsciiLinkText>{label}</AsciiLinkText>
              </a>
            ))}
          </nav>

          <div className="absolute top-7 right-0 flex gap-4">
            <CornerButton
              href="#contact"
              onClick={() =>
                trackCtaClick({
                  href: "#contact",
                  label: "Contact me",
                  placement: "desktop_header",
                })
              }
            >
              Contact me →
            </CornerButton>
            <CornerButton
              download
              href={cvUrl}
              onClick={() =>
                trackCtaClick({
                  href: cvUrl,
                  label: "Download CV",
                  placement: "desktop_header",
                })
              }
            >
              Download CV ↓
            </CornerButton>
          </div>

          <div className="absolute top-16 left-0 w-[calc(100%-2px)]" aria-hidden="true">
            <img
              alt=""
              className="block h-[0.6px] w-full"
              height="0.6"
              src={`${assetRoot}/desktop-rule.svg`}
              width="1086"
            />
            <div className="mt-[3px] flex justify-between font-instrument text-[12.16px] leading-[18.24px] text-rule">
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index}>+</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 block overflow-hidden bg-background md:hidden",
          isMenuOpen ? "h-[410px]" : "h-[var(--mobile-header-height)]",
        )}
      >
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 bg-surface transition-opacity duration-300 ease-out motion-reduce:transition-none",
            isMenuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-hidden={isMenuOpen}
          aria-label="Open navigation"
          className={clsx(
            "absolute top-[54px] left-1/2 z-2 grid h-11 w-[76px] -translate-x-1/2 cursor-pointer place-items-center bg-transparent p-0 transition-opacity duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white motion-reduce:transition-none",
            isMenuOpen ? "pointer-events-none opacity-0" : "opacity-100",
          )}
          onClick={() => setIsMenuOpen(true)}
          ref={openButtonRef}
          tabIndex={isMenuOpen ? -1 : 0}
          type="button"
        >
          <img
            alt=""
            className="block h-[10px] w-[54.75px]"
            height="10"
            src={`${assetRoot}/mobile-menu.svg`}
            width="54.75"
          />
        </button>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-hidden={!isMenuOpen}
          aria-label="Close navigation"
          className={clsx(
            "absolute top-[53px] left-1/2 z-2 h-11 w-[76px] -translate-x-1/2 cursor-pointer bg-transparent p-0 text-base leading-[27px] font-normal text-white transition-opacity duration-300 ease-out before:absolute before:top-[8.5px] before:left-0 before:content-['['] after:absolute after:top-[8.5px] after:right-0 after:content-[']'] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white motion-reduce:transition-none",
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => closeMenu(true)}
          ref={closeButtonRef}
          tabIndex={isMenuOpen ? 0 : -1}
          type="button"
        >
          <img
            alt=""
            className="absolute top-[13.5px] left-[3px] block h-5 w-[70px]"
            height="20"
            src={`${assetRoot}/mobile-menu-close.svg`}
            width="70"
          />
        </button>

        <nav
          aria-label="Mobile primary"
          aria-hidden={!isMenuOpen}
          className={clsx(
            "absolute top-[208px] right-[13px] left-3 z-1 flex flex-col items-start bg-transparent p-0 text-2xl leading-[18px] font-light whitespace-nowrap transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none",
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0",
          )}
          id="mobile-navigation"
          inert={!isMenuOpen}
        >
          {navigation.map(({ href, label }) => (
            <a
              className="flex h-11 w-full items-center p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
              href={href}
              key={href}
              onClick={() => {
                trackNavigationClick({
                  href,
                  label,
                  placement: "mobile_menu",
                });
                closeMenu();
              }}
            >
              <AsciiLinkText>{label}</AsciiLinkText>
            </a>
          ))}
        </nav>

        <img
          alt="Alex Guseynov"
          className={clsx(
            "absolute top-[142px] left-1/2 h-[34.028px] w-[calc(100%-23.382px)] -translate-x-1/2 transition-opacity duration-300 ease-out motion-reduce:transition-none",
            isMenuOpen ? "opacity-100" : "opacity-0",
          )}
          height="34.028"
          src={`${assetRoot}/mobile-name-open.svg`}
          width="378.618"
        />

        <div className="absolute top-[105px] right-3 left-3" aria-hidden="true">
          <img
            alt=""
            className="block h-[0.6px] w-full"
            height="0.6"
            src={`${assetRoot}/mobile-rule.svg`}
            width="378"
          />
          <div className="mt-[3px] flex justify-between font-instrument text-sm leading-[18.24px] text-rule">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>{isMenuOpen ? "-" : "+"}</span>
            ))}
          </div>
        </div>
      </header>

      <h1 className="hero-desktop-identity absolute top-[597px] left-1/2 z-10 m-0 hidden w-[min(calc(100%-192px),1088px)] -translate-x-1/2 items-center justify-between font-sans text-[clamp(38px,3.75vw,48px)] leading-normal font-medium tracking-[0.48px] whitespace-nowrap uppercase md:flex max-[901px]:w-[calc(100%-68px)] max-[901px]:text-[34px]">
        <span className="-translate-x-1.5">Frontend Engineer</span>
        <span>Alex Guseynov</span>
      </h1>

      <h1
        aria-label="Alex Guseynov, Frontend Engineer"
        className="pointer-events-none absolute inset-0 z-10 m-0 md:hidden"
      >
        <img
          alt=""
          aria-hidden="true"
          className="absolute top-[142px] right-[11.38px] left-3 block h-auto w-[calc(100%-23.38px)]"
          height="34.028"
          src={`${assetRoot}/mobile-name.svg`}
          width="378.618"
        />
        <img
          alt=""
          aria-hidden="true"
          className="absolute right-[17.1px] bottom-[clamp(164px,25.8svh,218px)] left-3 block h-auto w-[calc(100%-29.1px)]"
          height="26.0645"
          src={`${assetRoot}/mobile-role.svg`}
          width="367.188"
        />
      </h1>

      <div className="absolute right-3 bottom-[clamp(50px,10.3svh,87px)] left-3 z-10 flex flex-col gap-3 md:hidden">
        <CornerButton
          className="!h-10 !w-full !text-base !leading-[18.24px] !font-medium"
          href="#contact"
          onClick={() =>
            trackCtaClick({
              href: "#contact",
              label: "Contact me",
              placement: "mobile_hero",
            })
          }
        >
          Contact me →
        </CornerButton>
        <CornerButton
          className="!h-10 !w-full !text-base !leading-[18.24px] !font-medium"
          download
          href={cvUrl}
          onClick={() =>
            trackCtaClick({
              href: cvUrl,
              label: "Download CV",
              placement: "mobile_hero",
            })
          }
        >
          Download CV ↓
        </CornerButton>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className="absolute bottom-[clamp(26px,6.4svh,54px)] left-1/2 z-10 block h-[6.51px] w-[19.553px] -translate-x-1/2 md:hidden"
        height="6.51"
        src={`${assetRoot}/scroll-cue.svg`}
        width="19.553"
      />
    </section>
  );
}
