import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export const buttonLinkVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
  {
    variants: {
      tone: {
        primary:
          "border border-text-strong bg-text-strong text-text-inverse hover:-translate-y-0.5 hover:bg-text-strong-hover",
        secondary:
          "border border-border bg-canvas/80 text-text-strong hover:border-text-strong",
      },
    },
    defaultVariants: {
      tone: "secondary",
    },
  },
);

interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonLinkVariants> {
  icon?: ReactNode;
}

export function ButtonLink({
  tone,
  icon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={clsx(buttonLinkVariants({ tone }), className)} {...props}>
      {icon}
      {children}
    </a>
  );
}

export const panelVariants = cva("min-w-0 border border-border/80", {
  variants: {
    tone: {
      surface:
        "elevation-surface rounded-[1.6rem] bg-surface-elevated/88 p-5 sm:p-6 xl:p-7",
      subtle:
        "elevation-subtle rounded-[1.6rem] bg-canvas/72 p-5 sm:p-6 xl:p-7",
      metric:
        "elevation-metric rounded-[1.4rem] bg-canvas/70 p-4 sm:p-5",
      inset: "rounded-[1.5rem] bg-canvas/70 p-5",
      link: "group flex items-center justify-between gap-4 rounded-[1.25rem] bg-canvas/78 px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-text-strong hover:bg-canvas",
    },
  },
  defaultVariants: {
    tone: "surface",
  },
});

export const chipVariants = cva(
  "rounded-full border border-border bg-canvas/80 px-3 py-1.5 text-sm text-text-muted",
);

export const metaLinkVariants = cva(
  "flex min-w-0 items-center gap-3 text-base text-text-strong transition hover:text-text-strong-hover",
);

export const iconButtonVariants = cva(
  "flex h-10 w-10 items-center justify-center border transition",
  {
    variants: {
      state: {
        default: "border-border bg-canvas/80 text-text-strong hover:border-text-strong",
        disabled: "cursor-not-allowed border-border/70 bg-canvas/60 text-text-muted/60",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export const tabButtonVariants = cva("rounded-full border px-3 py-1.5 text-sm transition", {
  variants: {
    active: {
      true: "border-text-strong bg-text-strong text-text-inverse",
      false:
        "border-border bg-canvas/70 text-text-muted hover:border-text-strong hover:text-text-strong",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const iconCircleClassName =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface transition group-hover:border-text-strong";
