type FooterLink = {
  download?: boolean;
  href: string;
  label: string;
  newTab?: boolean;
};

const assetRoot = `${import.meta.env.BASE_URL}assets`;
const emailAddress = "me@alex23.com";

const footerLinks: FooterLink[] = [
  { href: `mailto:${emailAddress}`, label: "Email" },
  {
    download: true,
    href: `${import.meta.env.BASE_URL}alex-guseynov-cv.pdf`,
    label: "CV",
  },
  {
    href: "https://github.com/guseynov",
    label: "Github",
    newTab: true,
  },
  {
    href: "https://linkedin.com/in/aguseynov/",
    label: "LinkedIn",
    newTab: true,
  },
];

export function FooterSection() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <img
          alt=""
          aria-hidden="true"
          className="footer__rule footer__rule--top"
          src={`${assetRoot}/footer-rule.svg`}
        />

        <div aria-hidden="true" className="footer__artwork">
          <img alt="" src={`${assetRoot}/footer-strip.png`} />
        </div>

        <p className="footer__heading">Let’s work together</p>

        <a
          aria-label={`Email ${emailAddress}`}
          className="footer__email"
          href={`mailto:${emailAddress}`}
        >
          <span>Email me</span>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={`${assetRoot}/footer-arrow-mobile.svg`}
            />
            <img
              alt=""
              aria-hidden="true"
              className="footer__email-arrow"
              src={`${assetRoot}/footer-arrow-desktop.svg`}
            />
          </picture>
        </a>

        <img
          alt=""
          aria-hidden="true"
          className="footer__rule footer__rule--links"
          src={`${assetRoot}/footer-rule.svg`}
        />

        <nav aria-label="Contact and profile links" className="footer__links">
          {footerLinks.map((link) => (
            <a
              className="footer__link"
              download={link.download}
              href={link.href}
              key={link.label}
              rel={link.newTab ? "noreferrer" : undefined}
              target={link.newTab ? "_blank" : undefined}
            >
              <img alt="" aria-hidden="true" src={`${assetRoot}/footer-link.svg`} />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
