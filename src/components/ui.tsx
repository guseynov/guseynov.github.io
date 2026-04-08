import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export const buttonLinkVariants = cva(
  "inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-[0.98rem] font-medium leading-none transition duration-200 sm:min-h-12 sm:gap-2 sm:py-3 sm:text-sm",
  {
    variants: {
      tone: {
        primary:
          "border border-white/80 bg-white text-text-inverse shadow-[0_0_0_1px_rgba(0,153,255,0.18)] hover:-translate-y-0.5 hover:bg-white/92",
        secondary:
          "border border-white/10 bg-white/10 text-text-strong backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/16",
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
        "surface-floating blue-ring rounded-[1.1rem] bg-surface/92 p-5 sm:p-6 xl:p-7",
      subtle:
        "blue-ring rounded-[1.1rem] bg-black/72 p-5 sm:p-6 xl:p-7",
      metric: "blue-ring rounded-[1rem] bg-white/5 p-4 sm:p-5",
      inset: "rounded-[1rem] border border-white/10 bg-white/5 p-5",
      link: "group blue-ring flex items-center justify-between gap-4 rounded-[1rem] bg-black/70 px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/6 hover:shadow-[0_0_0_1px_rgba(0,153,255,0.32)]",
    },
  },
  defaultVariants: {
    tone: "surface",
  },
});

export const chipVariants = cva(
  "rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-sm text-text-muted backdrop-blur-sm",
);

export const metaLinkVariants = cva(
  "flex min-w-0 items-center gap-3 text-base text-text-strong transition hover:text-[#8fd0ff]",
);

export const iconButtonVariants = cva(
  "flex h-11 w-11 items-center justify-center rounded-full border transition",
  {
    variants: {
      state: {
        default:
          "border-white/12 bg-white/8 text-text-strong backdrop-blur-sm hover:border-white/20 hover:bg-white/14",
        disabled: "cursor-not-allowed border-white/8 bg-white/4 text-text-muted/60",
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
      true: "border-accent bg-accent text-white shadow-[0_0_24px_rgba(0,153,255,0.2)]",
      false:
        "border-white/10 bg-white/6 text-text-muted hover:border-white/20 hover:text-text-strong",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const iconCircleClassName =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 transition group-hover:border-accent group-hover:bg-accent-soft";
