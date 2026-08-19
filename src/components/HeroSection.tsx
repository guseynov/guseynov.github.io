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
    <section className="hero" id="overview">
      <header className="site-header site-header--desktop">
        <div className="site-header__inner">
          <a className="site-header__identity" href="#overview">
            Alex Guseynov
          </a>

          <nav aria-label="Primary" className="site-header__navigation">
            {navigation.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <CornerButton href="#contact">Contact me →</CornerButton>
            <CornerButton download href={cvUrl}>
              Download CV ↓
            </CornerButton>
          </div>

          <div className="site-header__rule" aria-hidden="true">
            <img alt="" height="0.6" src={`${assetRoot}/desktop-rule.svg`} width="1086" />
            <div className="site-header__ticks">
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index}>+</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <header
        className={clsx("site-header", "site-header--mobile", {
          "site-header--mobile-open": isMenuOpen,
        })}
      >
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label="Open navigation"
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(true)}
          type="button"
        >
          <img alt="" height="10" src={`${assetRoot}/mobile-menu.svg`} width="54.75" />
        </button>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label="Close navigation"
          className="mobile-menu-close"
          onClick={() => setIsMenuOpen(false)}
          type="button"
        >
          <img alt="" height="20" src={`${assetRoot}/mobile-menu-close.svg`} width="70" />
        </button>

        <nav
          aria-label="Mobile primary"
          className={clsx("mobile-navigation", {
            "mobile-navigation--open": isMenuOpen,
          })}
          id="mobile-navigation"
        >
          {navigation.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setIsMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <img
          alt="Alex Guseynov"
          className="mobile-navigation-name"
          height="34.028"
          src={`${assetRoot}/mobile-name-open.svg`}
          width="378.618"
        />

        <div className="mobile-header-rule" aria-hidden="true">
          <img alt="" height="0.6" src={`${assetRoot}/mobile-rule.svg`} width="378" />
          <div className="mobile-header-rule__ticks">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>{isMenuOpen ? "-" : "+"}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="hero__desktop-lockup">
        <p>Frontend Engineer</p>
        <p>Alex Guseynov</p>
      </div>

      <div className="hero__mobile-main">
        <img
          alt="Alex Guseynov"
          className="hero__mobile-name"
          height="34.028"
          src={`${assetRoot}/mobile-name.svg`}
          width="378.618"
        />

        <div aria-hidden="true" className="hero__artwork-reserved" />

        <img
          alt="Frontend engineer"
          className="hero__mobile-role"
          height="26.064"
          src={`${assetRoot}/mobile-role.svg`}
          width="367.188"
        />
      </div>

      <div className="hero__mobile-actions">
        <CornerButton className="corner-button--mobile" href="#contact">
          Contact me →
        </CornerButton>
        <CornerButton className="corner-button--mobile" download href={cvUrl}>
          Download CV ↓
        </CornerButton>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className="hero__scroll-cue"
        height="6.51"
        src={`${assetRoot}/scroll-cue.svg`}
        width="19.553"
      />
    </section>
  );
}
