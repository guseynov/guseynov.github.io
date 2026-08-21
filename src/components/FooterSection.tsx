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
    <footer className="h-[514px] scroll-mt-4 bg-background md:h-[418px] md:scroll-mt-8" id="contact">
      <div className="relative mx-auto h-[514px] w-full md:h-[418px] md:w-[1088px] md:max-[1181px]:w-[calc(100%-80px)]">
        <img
          alt=""
          aria-hidden="true"
          className="absolute top-[29px] left-3 block h-[0.6px] w-[calc(100%-24px)] md:top-0 md:-left-0.5 md:w-[1091.5px] md:max-[1181px]:left-0 md:max-[1181px]:w-full"
          src={`${assetRoot}/footer-rule.svg`}
        />

        <div
          aria-hidden="true"
          className="absolute top-[153px] left-3 h-[106px] w-[calc(100%-24px)] overflow-hidden md:top-7 md:left-0 md:w-[346px]"
        >
          <img
            alt=""
            className="absolute -top-[58px] -left-1.5 block h-[280px] w-[calc(100%+6px)] max-w-none mix-blend-lighten md:-top-[47px] md:h-[258px] md:w-[353.32px]"
            src={`${assetRoot}/footer-strip.png`}
          />
        </div>

        <p className="absolute top-[45px] left-3 m-0 flex h-[92px] w-[calc(100%-24px)] items-start font-sans text-[40px] leading-[46px] font-normal tracking-[0.4px] whitespace-normal uppercase text-rule md:top-[162px] md:left-0 md:h-[70px] md:w-[841px] md:items-center md:text-7xl md:leading-[70px] md:tracking-normal md:whitespace-nowrap md:max-[1181px]:w-[calc(100%-120px)] md:max-[1181px]:text-[clamp(52px,6vw,72px)]">
          Let’s work together
        </p>

        <a
          aria-label={`Email ${emailAddress}`}
          className="absolute top-[275px] right-3 left-3 flex h-14 items-center justify-between gap-4 font-sans text-[40px] leading-14 font-normal tracking-[0.4px] uppercase transition-colors duration-160 hover:text-rule focus-visible:text-rule focus-visible:outline-none md:top-64 md:right-auto md:left-0 md:h-[70px] md:justify-start md:gap-[27px] md:text-7xl md:leading-[70px] md:tracking-normal"
          href={`mailto:${emailAddress}`}
        >
          <span>Email me</span>
          <picture className="block h-[15px] w-[45.787px] flex-[0_0_auto] md:h-[25.52px] md:w-[77.9px]">
            <source
              media="(max-width: 767px)"
              srcSet={`${assetRoot}/footer-arrow-mobile.svg`}
            />
            <img
              alt=""
              aria-hidden="true"
              className="block h-[15px] w-[45.787px] md:h-[25.52px] md:w-[77.9px]"
              src={`${assetRoot}/footer-arrow-desktop.svg`}
            />
          </picture>
        </a>

        <img
          alt=""
          aria-hidden="true"
          className="absolute top-[347px] left-3 block h-[0.6px] w-[calc(100%-24px)] md:hidden"
          src={`${assetRoot}/footer-rule.svg`}
        />

        <nav
          aria-label="Contact and profile links"
          className="absolute top-[363px] right-3 left-3 grid grid-cols-[minmax(0,1fr)_176px] gap-x-6 gap-y-[31px] md:top-[172px] md:right-[0.5px] md:left-auto md:flex md:w-[75.5px] md:flex-col md:gap-2"
        >
          {footerLinks.map((link) => (
            <a
              className="flex h-[19px] w-max items-center gap-2.5 text-base leading-[18.24px] font-medium transition-colors duration-160 hover:text-rule focus-visible:text-rule focus-visible:outline-none md:w-[75.5px] md:text-xs"
              download={link.download}
              href={link.href}
              key={link.label}
              rel={link.newTab ? "noreferrer" : undefined}
              target={link.newTab ? "_blank" : undefined}
            >
              <img
                alt=""
                aria-hidden="true"
                className="block h-2.5 w-2.5 flex-[0_0_10px] md:h-[9px] md:w-[9px] md:flex-[0_0_9px]"
                src={`${assetRoot}/footer-link.svg`}
              />
              <span className="w-auto md:w-[58px]">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
