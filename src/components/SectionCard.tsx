import clsx from "clsx";
import type { PropsWithChildren, ReactNode, Ref } from "react";

interface SectionCardProps extends PropsWithChildren {
  id: string;
  title: string;
  summary: string;
  indexLabel: string;
  className?: string;
  aside?: ReactNode;
  contentRef?: Ref<HTMLDivElement>;
}

export function SectionCard({
  id,
  title,
  summary,
  indexLabel,
  className = "",
  aside,
  contentRef,
  children,
}: SectionCardProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={clsx("overflow-visible rounded-[1.35rem] lg:min-h-0 lg:rounded-[1.6rem]", className)}
    >
      <div className="surface-hero blue-glow flex flex-col rounded-[inherit] border border-white/8 bg-surface/92 lg:h-full lg:min-h-0 lg:overflow-hidden">
        <div
          ref={contentRef}
          className="section-scroll flex flex-col gap-6 p-5 sm:gap-8 sm:p-6 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:pr-3 xl:p-7"
        >
          <header className="flex flex-col gap-5 border-b border-white/8 pb-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-ghost md:hidden">
                {indexLabel}
              </span>
              <h2
                id={`${id}-title`}
                className="text-display-title max-w-3xl text-text-strong"
              >
                {title}
              </h2>
              <p className="font-ui max-w-2xl text-[0.98rem] leading-7 text-text-muted">
                {summary}
              </p>
            </div>
            <div className="flex flex-col gap-5 md:items-end">
              <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-ghost md:inline">
                {indexLabel}
              </span>
              {aside}
            </div>
          </header>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
