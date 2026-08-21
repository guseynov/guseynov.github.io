import { clsx } from "clsx";
import type { ReactNode } from "react";

const assetRoot = `${import.meta.env.BASE_URL}assets/hero`;

type CornerButtonProps = {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  download?: boolean;
  href: string;
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
  rel,
  tabIndex,
  target,
}: CornerButtonProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={clsx(
        "relative grid h-[27px] w-[118px] place-items-center overflow-hidden bg-surface text-xs leading-[18px] font-normal whitespace-nowrap transition-colors duration-160 hover:bg-[#454545] focus-visible:bg-[#454545] focus-visible:outline-none",
        className,
      )}
      download={download}
      href={href}
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
            className="absolute -top-[0.3px] -left-[0.3px] block h-[7.3px] w-[7.3px] max-w-none"
            height="7.3"
            src={`${assetRoot}/${filename}`}
            width="7.3"
          />
        </span>
      ))}
      <span className="relative z-1">{children}</span>
    </a>
  );
}
