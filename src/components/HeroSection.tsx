import { clsx } from "clsx";
import { useState } from "react";
import { CornerButton } from "./CornerButton";

const assetRoot = `${import.meta.env.BASE_URL}assets/hero`;
const cvUrl = `${import.meta.env.BASE_URL}alex-guseynov-cv.pdf`;

const navigation = [
  ["/Overview", "#overview"],
  ["/Skills", "#skills"],
  ["/Experience", "#experience"],
  ["/Projects", "#projects"],
] as const;

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="relative min-h-[900px] overflow-clip bg-background md:min-h-[796px]" id="overview">
      <header className="relative z-10 hidden h-[87px] md:block">
        <div className="relative mx-auto h-full w-[min(calc(100%-192px),1088px)] max-[901px]:w-[calc(100%-80px)]">
          <a
            className="absolute top-8 left-0 text-xs leading-[18px] font-normal whitespace-nowrap transition-colors duration-160 hover:text-rule focus-visible:text-rule max-[901px]:hidden"
            href="#overview"
          >
            Alex Guseynov
          </a>

          <nav
            aria-label="Primary"
            className="absolute top-8 left-1/2 flex -translate-x-1/2 gap-[13px] text-xs leading-[18px] font-normal whitespace-nowrap max-[901px]:left-0 max-[901px]:translate-x-0"
          >
            {navigation.map(([label, href]) => (
              <a
                className="transition-colors duration-160 hover:text-rule focus-visible:text-rule"
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="absolute top-7 right-0 flex gap-4">
            <CornerButton href="#contact">Contact me →</CornerButton>
            <CornerButton download href={cvUrl}>
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
          "relative z-10 block overflow-hidden md:hidden",
          isMenuOpen ? "h-[410px] bg-surface" : "h-[132px] bg-background",
        )}
      >
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label="Open navigation"
          className={clsx(
            "absolute top-[71px] left-1/2 z-2 h-[10px] w-[54.75px] -translate-x-1/2 cursor-pointer bg-transparent p-0",
            isMenuOpen ? "hidden" : "block",
          )}
          onClick={() => setIsMenuOpen(true)}
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
          aria-label="Close navigation"
          className={clsx(
            "absolute top-[62px] left-1/2 z-2 h-[27px] w-[76px] -translate-x-1/2 cursor-pointer bg-transparent p-0 text-base leading-[27px] font-normal text-white before:absolute before:top-0 before:left-0 before:content-['['] after:absolute after:top-0 after:right-0 after:content-[']']",
            isMenuOpen ? "block" : "hidden",
          )}
          onClick={() => setIsMenuOpen(false)}
          type="button"
        >
          <img
            alt=""
            className="absolute top-[5px] left-[3px] block h-5 w-[70px]"
            height="20"
            src={`${assetRoot}/mobile-menu-close.svg`}
            width="70"
          />
        </button>

        <nav
          aria-label="Mobile primary"
          className={clsx(
            "absolute top-[221px] right-[13px] left-3 z-1 flex flex-col items-start gap-[26px] bg-transparent p-0 text-2xl leading-[18px] font-light whitespace-nowrap transition-[opacity,visibility] duration-140",
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0",
          )}
          id="mobile-navigation"
        >
          {navigation.map(([label, href]) => (
            <a className="w-full p-0" href={href} key={href} onClick={() => setIsMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <img
          alt="Alex Guseynov"
          className={clsx(
            "absolute top-[142px] left-1/2 h-[34.028px] w-[calc(100%-23.382px)] -translate-x-1/2",
            isMenuOpen ? "block" : "hidden",
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

      <div className="absolute top-[597px] left-1/2 hidden w-[min(calc(100%-192px),1088px)] -translate-x-1/2 items-center justify-between font-sans text-[clamp(38px,3.75vw,48px)] leading-normal font-medium tracking-[0.48px] whitespace-nowrap uppercase md:flex max-[901px]:w-[calc(100%-68px)] max-[901px]:text-[34px]">
        <p className="m-0 -translate-x-1.5">Frontend Engineer</p>
        <p className="m-0">Alex Guseynov</p>
      </div>

      <div className="absolute top-[142px] right-[11.38px] left-3 block h-[551.092px] md:hidden">
        <img
          alt="Alex Guseynov"
          className="absolute top-0 left-0 block h-[34.028px] w-full"
          height="34.028"
          src={`${assetRoot}/mobile-name.svg`}
          width="378.618"
        />

        <div aria-hidden="true" className="absolute top-[50.028px] right-0 left-0 h-[459px]" />

        <img
          alt="Frontend engineer"
          className="absolute right-[5.715px] bottom-0 block h-[26.064px] w-[calc(100%-11.43px)]"
          height="26.064"
          src={`${assetRoot}/mobile-role.svg`}
          width="367.188"
        />
      </div>

      <div className="absolute top-[721px] right-3 left-3 flex flex-col gap-3 md:hidden">
        <CornerButton className="!h-10 !w-full !text-base !leading-[18.24px] !font-medium" href="#contact">
          Contact me →
        </CornerButton>
        <CornerButton className="!h-10 !w-full !text-base !leading-[18.24px] !font-medium" download href={cvUrl}>
          Download CV ↓
        </CornerButton>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className="absolute top-[839.5px] left-1/2 block h-[6.51px] w-[19.553px] -translate-x-1/2 md:hidden"
        height="6.51"
        src={`${assetRoot}/scroll-cue.svg`}
        width="19.553"
      />
    </section>
  );
}
