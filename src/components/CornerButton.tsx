import { clsx } from "clsx";
import type { MouseEventHandler, ReactNode } from "react";
import { AsciiLinkText } from "./AsciiLinkText";

const assetRoot = `${import.meta.env.BASE_URL}assets/hero`;

type CornerButtonProps = {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  download?: boolean;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  rel?: string;
  tabIndex?: number;
  target?: "_blank" | "_parent" | "_self" | "_top";
};

const corners = [
  ["top-left", "corner-top-left.svg", "top-px left-px"],
  ["bottom-left", "corner-bottom-left.svg", "bottom-px left-px -rotate-90"],
  ["bottom-right", "corner-bottom-right.svg", "right-px bottom-px rotate-180"],
  ["top-right", "corner-top-right.svg", "top-px right-px rotate-90"],
] as const;

export function CornerButton({
  ariaLabel,
  children,
  className = "",
  download,
  href,
  onClick,
  rel,
  tabIndex,
  target,
}: CornerButtonProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={clsx(
        "group relative grid h-[27px] w-[118px] place-items-center overflow-visible bg-surface text-xs leading-[18px] font-normal whitespace-nowrap transition-colors duration-160 after:absolute after:top-1/2 after:left-0 after:h-11 after:w-full after:-translate-y-1/2 after:content-[''] hover:bg-rule focus-visible:bg-rule focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
      download={download}
      href={href}
      onClick={onClick}
      rel={rel}
      tabIndex={tabIndex}
      target={target}
    >
      {corners.map(([position, filename, positionClass]) => (
        <span
          className={clsx("absolute h-[7px] w-[7px] overflow-visible", positionClass)}
          key={position}
        >
          <img
            alt=""
            className="absolute -top-[0.3px] -left-[0.3px] block h-[7.3px] w-[7.3px] max-w-none transition-[filter] duration-160 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
            height="7.3"
            src={`${assetRoot}/${filename}`}
            width="7.3"
          />
        </span>
      ))}
      <span className="relative z-1">
        {typeof children === "string" ? <AsciiLinkText>{children}</AsciiLinkText> : children}
      </span>
    </a>
  );
}
