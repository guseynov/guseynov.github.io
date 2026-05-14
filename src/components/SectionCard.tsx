import clsx from "clsx";
import type { PropsWithChildren, ReactNode, Ref } from "react";

interface SectionCardProps extends PropsWithChildren {
  id: string;
  title: string;
  summary: string;
  indexLabel: string;
  className?: string;
  titleClassName?: string;
  aside?: ReactNode;
  contentRef?: Ref<HTMLDivElement>;
  headerless?: boolean;
  tone?: "dark" | "light" | "paper" | "black";
}

export function SectionCard({
  id,
  title,
  summary,
  indexLabel,
  className = "",
  titleClassName = "",
  aside,
  contentRef,
  headerless = false,
  tone = "dark",
  children,
}: SectionCardProps) {
  const isLight = tone === "light";
  const isPaper = tone === "paper";
  const isBlack = tone === "black";
  const hasIndexLabel = indexLabel.trim().length > 0;
  const hasSummary = summary.trim().length > 0;
  const titleWidthClassName = titleClassName || "max-w-[14ch] sm:max-w-[16ch] md:max-w-[18ch]";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={clsx(
        "overflow-visible rounded-[1.35rem] scroll-mt-28 lg:rounded-[1.6rem]",
        className,
      )}
    >
      <div
        className={clsx(
          "flex flex-col rounded-[inherit] border",
          isLight
            ? "section-card-light border-black/8 bg-white text-text-inverse shadow-[0_26px_60px_rgba(0,0,0,0.08)] selection:bg-black selection:text-white"
            : isPaper
              ? "border-black/8 bg-[color:oklch(0.975_0_0)] text-text-inverse shadow-[0_26px_60px_rgba(0,0,0,0.08)] selection:bg-black selection:text-white"
              : isBlack
                ? "surface-hero border-white/10 bg-canvas"
                : "surface-hero border-white/8 bg-surface/92",
        )}
      >
        <div
          ref={contentRef}
          className="section-scroll flex flex-col gap-5 p-4 sm:gap-8 sm:p-6 xl:p-7"
        >
          {headerless ? null : (
            <header
              className={clsx(
                "flex flex-col gap-4 border-b pb-4 sm:gap-5 sm:pb-5 md:flex-row md:items-start md:justify-between",
                isLight || isPaper ? "border-black/8" : "border-white/8",
              )}
            >
              <div className="max-w-[58ch] space-y-3">
                {hasIndexLabel ? (
                  <span
                    className={clsx(
                      "mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.22em] md:hidden",
                      isLight || isPaper ? "text-text-inverse/44" : "text-text-ghost",
                    )}
                  >
                    {indexLabel}
                  </span>
                ) : null}
                <h2
                  id={`${id}-title`}
                  className={clsx(
                    "text-display-title",
                    titleWidthClassName,
                    isLight || isPaper ? "text-text-inverse" : "text-text-strong",
                  )}
                >
                  {title}
                </h2>
                {hasSummary ? (
                  <p
                    className={clsx(
                      "max-w-[62ch] text-[1rem] leading-7 sm:text-[1.02rem] sm:leading-8",
                      isLight || isPaper ? "text-text-inverse/72" : "text-text-muted",
                    )}
                  >
                    {summary}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-5 md:items-end">
                {hasIndexLabel ? (
                  <span
                    className={clsx(
                      "hidden font-mono text-[0.7rem] uppercase tracking-[0.22em] md:inline",
                      isLight || isPaper ? "text-text-inverse/44" : "text-text-ghost",
                    )}
                  >
                    {indexLabel}
                  </span>
                ) : null}
                {aside}
              </div>
            </header>
          )}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
