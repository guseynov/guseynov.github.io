import { cvUrl, emailAddress } from "./site";

export type FooterLink = {
  download?: boolean;
  href: string;
  label: string;
  newTab?: boolean;
};

export const footerLinks: FooterLink[] = [
  { href: `mailto:${emailAddress}`, label: "Email" },
  {
    download: true,
    href: cvUrl,
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
