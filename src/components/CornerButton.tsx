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
  ["top-left", "corner-top-left.svg"],
  ["bottom-left", "corner-bottom-left.svg"],
  ["bottom-right", "corner-bottom-right.svg"],
  ["top-right", "corner-top-right.svg"],
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
      className={clsx("corner-button", className)}
      download={download}
      href={href}
      rel={rel}
      tabIndex={tabIndex}
      target={target}
    >
      {corners.map(([position, filename]) => (
        <span className={`corner-button__corner corner-button__corner--${position}`} key={position}>
          <img alt="" height="7.3" src={`${assetRoot}/${filename}`} width="7.3" />
        </span>
      ))}
      <span className="corner-button__label">{children}</span>
    </a>
  );
}
