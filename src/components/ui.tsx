import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ReactNode } from "react";

const buttonLinkVariants = cva(
  "control-tap-target inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-5 py-3.5 font-mono text-[0.98rem] font-medium uppercase tracking-[0.14em] leading-none transition-colors duration-200 ease-out focus-visible:outline-none sm:min-h-12 sm:gap-2 sm:py-3 sm:text-sm",
  {
    variants: {
      tone: {
        primary:
          "border border-[color:var(--color-border-strong)] bg-[color:var(--color-text-strong)] text-text-inverse hover:bg-[color:oklch(0.92_0_0)] active:bg-[color:oklch(0.88_0_0)] focus-visible:shadow-[0_0_0_1px_var(--color-ring-accent-strong),0_0_0_4px_var(--color-accent-soft)]",
        secondary:
          "border border-white/10 bg-[color:var(--color-surface-frosted)] text-text-strong backdrop-blur-sm hover:bg-[color:var(--color-surface-frosted-hover)] active:bg-[color:oklch(0.35_0_0_/_0.48)] focus-visible:border-white/24 focus-visible:shadow-[0_0_0_1px_var(--color-ring-accent-strong),0_0_0_4px_var(--color-accent-soft)]",
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
      {children}
      {icon}
    </a>
  );
}

export const panelVariants = cva("min-w-0 border border-border/80", {
  variants: {
    tone: {
      surface:
        "surface-floating blue-ring rounded-[1.1rem] bg-surface/92 p-5 sm:p-6 xl:p-7",
      subtle:
        "blue-ring rounded-[1.1rem] bg-[color:oklch(0.23_0_0_/_0.88)] p-5 sm:p-6 xl:p-7",
      metric: "blue-ring rounded-[1rem] bg-[color:oklch(0.3_0_0_/_0.42)] p-4 sm:p-5",
      inset: "rounded-[1rem] border border-white/10 bg-[color:oklch(0.3_0_0_/_0.34)] p-5",
      link: "focus-ring-panel group blue-ring flex items-center justify-between gap-4 rounded-[1rem] bg-[color:oklch(0.23_0_0_/_0.82)] px-4 py-3.5 transition-colors duration-200 ease-out hover:border-white/20 hover:bg-[color:oklch(0.27_0_0_/_0.9)] active:bg-[color:oklch(0.25_0_0_/_0.86)]",
    },
  },
  defaultVariants: {
    tone: "surface",
  },
});

export const iconButtonVariants = cva(
  "control-tap-target flex h-11 w-11 items-center justify-center rounded-full border transition duration-200 ease-out focus-visible:outline-none",
  {
    variants: {
      state: {
        default:
          "border-white/12 bg-[color:oklch(0.31_0_0_/_0.38)] text-text-strong backdrop-blur-sm hover:border-white/20 hover:bg-[color:oklch(0.36_0_0_/_0.5)] active:bg-[color:oklch(0.34_0_0_/_0.42)] focus-visible:border-white/24 focus-visible:shadow-[0_0_0_1px_var(--color-ring-accent-strong),0_0_0_4px_var(--color-accent-soft)]",
        disabled: "cursor-not-allowed border-white/8 bg-[color:oklch(0.27_0_0_/_0.28)] text-text-muted/60",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);
