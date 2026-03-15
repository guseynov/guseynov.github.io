import clsx from "clsx";
import { useEffect, useRef, type CSSProperties, type PointerEvent, type PropsWithChildren, type ReactNode, type Ref } from "react";

const MAX_PANEL_TILT_DEGREES = 7;

type PanelStyle = CSSProperties & {
  "--panel-glow-x": string;
  "--panel-glow-y": string;
  "--panel-rotate-x": string;
  "--panel-rotate-y": string;
};

const INITIAL_PANEL_STYLE: PanelStyle = {
  "--panel-glow-x": "50%",
  "--panel-glow-y": "50%",
  "--panel-rotate-x": "0deg",
  "--panel-rotate-y": "0deg",
};

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function resetTiltStyles(element: HTMLDivElement) {
  element.style.setProperty("--panel-glow-x", INITIAL_PANEL_STYLE["--panel-glow-x"]);
  element.style.setProperty("--panel-glow-y", INITIAL_PANEL_STYLE["--panel-glow-y"]);
  element.style.setProperty("--panel-rotate-x", INITIAL_PANEL_STYLE["--panel-rotate-x"]);
  element.style.setProperty("--panel-rotate-y", INITIAL_PANEL_STYLE["--panel-rotate-y"]);
  element.dataset.tiltActive = "false";
}

function applyTiltStyles(element: HTMLDivElement, clientX: number, clientY: number) {
  const bounds = element.getBoundingClientRect();

  if (bounds.width === 0 || bounds.height === 0) {
    return;
  }

  const x = clampValue((clientX - bounds.left) / bounds.width, 0, 1);
  const y = clampValue((clientY - bounds.top) / bounds.height, 0, 1);
  const rotateX = (0.5 - y) * MAX_PANEL_TILT_DEGREES;
  const rotateY = (x - 0.5) * MAX_PANEL_TILT_DEGREES;

  element.style.setProperty("--panel-glow-x", `${(x * 100).toFixed(1)}%`);
  element.style.setProperty("--panel-glow-y", `${(y * 100).toFixed(1)}%`);
  element.style.setProperty("--panel-rotate-x", `${rotateX.toFixed(2)}deg`);
  element.style.setProperty("--panel-rotate-y", `${rotateY.toFixed(2)}deg`);
  element.dataset.tiltActive = "true";
}

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
  const cardRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pointerStateRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const tiltEnabledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncTiltAvailability = () => {
      tiltEnabledRef.current = hoverQuery.matches && !motionQuery.matches;

      if (!tiltEnabledRef.current && cardRef.current) {
        resetTiltStyles(cardRef.current);
      }
    };

    syncTiltAvailability();
    motionQuery.addEventListener("change", syncTiltAvailability);
    hoverQuery.addEventListener("change", syncTiltAvailability);

    return () => {
      motionQuery.removeEventListener("change", syncTiltAvailability);
      hoverQuery.removeEventListener("change", syncTiltAvailability);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const queueTiltUpdate = (clientX: number, clientY: number) => {
    pointerStateRef.current = { clientX, clientY };

    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;

      const element = cardRef.current;
      const pointer = pointerStateRef.current;

      if (!element || !pointer) {
        return;
      }

      applyTiltStyles(element, pointer.clientX, pointer.clientY);
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabledRef.current || event.pointerType === "touch") {
      return;
    }

    queueTiltUpdate(event.clientX, event.clientY);
  };

  const handlePointerLeave = () => {
    pointerStateRef.current = null;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (cardRef.current) {
      resetTiltStyles(cardRef.current);
    }
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={clsx("overflow-visible rounded-[1.75rem] lg:min-h-0 lg:rounded-[2rem]", className)}
    >
      <div
        ref={cardRef}
        className="tilt-panel elevation-card relative isolate flex flex-col rounded-[inherit] border border-border/80 bg-surface/88 backdrop-blur-sm lg:h-full lg:min-h-0 lg:overflow-hidden"
        style={INITIAL_PANEL_STYLE}
        data-tilt-active="false"
        onPointerEnter={handlePointerMove}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        <div aria-hidden="true" className="tilt-panel__glow pointer-events-none absolute inset-0 rounded-[inherit]" />
        <div
          ref={contentRef}
          className="section-scroll relative z-10 flex flex-col gap-6 p-5 sm:gap-8 sm:p-6 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:pr-3 xl:p-7"
        >
          <header className="flex flex-col gap-5 border-b border-border/80 pb-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-sm text-text-muted md:hidden">
                {indexLabel}
              </span>
              <h2
                id={`${id}-title`}
                className="max-w-3xl text-[clamp(2rem,3vw,2.7rem)] font-semibold tracking-[-0.04em] text-text-strong"
              >
                {title}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-text-muted">
                {summary}
              </p>
            </div>
            <div className="flex flex-col gap-5 md:items-end">
              <span className="hidden font-mono text-sm text-text-muted md:inline">
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
