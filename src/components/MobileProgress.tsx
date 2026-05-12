import type { SectionNavItem } from "@/content/site";

interface MobileProgressProps {
  sections: SectionNavItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function MobileProgress({
  sections,
  activeIndex,
  onSelect,
}: MobileProgressProps) {
  const currentSection = sections[activeIndex];
  const positionLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    sections.length,
  ).padStart(2, "0")}`;

  return (
    <div className="sticky top-4 z-20 rounded-[1.1rem] border border-white/10 bg-[color:oklch(0.21_0.014_248_/_0.84)] p-4 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-ghost">
            Now viewing
          </p>
          <p className="mt-1 min-h-[1.25rem] text-[0.98rem] font-semibold leading-5 text-text-strong">
            {currentSection?.label}
          </p>
        </div>
        <p className="font-mono text-[0.92rem] text-text-ghost">{positionLabel}</p>
      </div>
      <div className="mt-4 flex gap-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(index)}
            className="control-tap-target flex flex-1 items-center rounded-full transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label={`Jump to ${section.title}`}
            aria-pressed={index === activeIndex}
          >
            <span
              className={`h-2 w-full rounded-full transition duration-200 ease-out ${
                index === activeIndex ? "bg-accent" : "bg-white/10"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
