import clsx from "clsx";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { SectionNavItem } from "@/content/site";
import { DragHandleIcon } from "@/components/SanityIcons";

interface BottomSliderProps {
  sections: SectionNavItem[];
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
  onDragProgress: (progress: number) => void;
  onDragEnd: (progress: number) => void;
}

function clampIndex(index: number, maxIndex: number) {
  return Math.max(0, Math.min(maxIndex, index));
}

export function BottomSlider({
  sections,
  activeIndex,
  progress,
  onSelect,
  onDragProgress,
  onDragEnd,
}: BottomSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef({ clientX: 0, progress: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const maxIndex = Math.max(sections.length - 1, 0);
  const activeSection = sections[activeIndex];
  const safeProgress = Math.max(0, Math.min(1, progress));
  const positionPercent = safeProgress * 100;
  const handleInset = "3.5rem";
  const handleLeft = `clamp(${handleInset}, ${positionPercent}%, calc(100% - ${handleInset}))`;

  const getProgressFromClientXDelta = (clientX: number) => {
    const track = trackRef.current;

    if (!track) {
      return safeProgress;
    }

    const rect = track.getBoundingClientRect();
    const delta = rect.width === 0 ? 0 : (clientX - dragStartRef.current.clientX) / rect.width;

    return Math.max(0, Math.min(1, dragStartRef.current.progress + delta));
  };

  const updateFromPointer = (clientX: number) => {
    onDragProgress(getProgressFromClientXDelta(clientX));
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) {
      return;
    }

    setIsDragging(true);
    dragStartRef.current = {
      clientX: event.clientX,
      progress: safeProgress,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) {
      return;
    }

    updateFromPointer(event.clientX);
  };

  const finishDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) {
      return;
    }

    const nextProgress = getProgressFromClientXDelta(event.clientX);

    setIsDragging(false);
    onDragEnd(nextProgress);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSelect(clampIndex(activeIndex + 1, maxIndex));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSelect(clampIndex(activeIndex - 1, maxIndex));
    }

    if (event.key === "Home") {
      event.preventDefault();
      onSelect(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      onSelect(maxIndex);
    }
  };

  const handleClassName = clsx(
    "elevation-slider-handle absolute top-1/2 z-10 h-14 w-28 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border border-border-contrast-soft bg-[linear-gradient(180deg,var(--color-handle-surface-start),var(--color-handle-surface-end))] transition",
    "flex items-center justify-center",
    isDragging && "elevation-slider-handle-active scale-[1.02] cursor-grabbing",
  );

  return (
    <div
      data-bottom-slider="true"
      className="elevation-slider-shell pointer-events-auto rounded-full border border-border/70 bg-canvas/82 px-5 py-4"
    >
      <div
        ref={trackRef}
        className="relative h-14 touch-none select-none"
      >
        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,rgba(17,17,17,0.14),rgba(17,17,17,0.1))]" />
        <div
          className="absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-text-strong"
          style={{ width: `${positionPercent}%` }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
          {sections.map((section, index) => (
            <span
              key={section.id}
              className={clsx(
                "elevation-slider-dot h-2 w-2 rounded-full bg-dot-muted",
                index === activeIndex && "bg-dot-active",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          className={handleClassName}
          style={{ left: handleLeft }}
          role="slider"
          aria-label="Slide between portfolio sections"
          aria-valuemin={1}
          aria-valuemax={sections.length}
          aria-valuenow={activeIndex + 1}
          aria-valuetext={activeSection?.title}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <span aria-hidden="true" className="shrink-0 text-icon-strong">
            <DragHandleIcon aria-hidden="true" className="h-6 w-6" />
          </span>
        </button>
      </div>
    </div>
  );
}
