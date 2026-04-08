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
    <div className="sticky top-4 z-20 rounded-[1.1rem] border border-white/10 bg-black/78 p-4 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-ghost">
            Now viewing
          </p>
          <p className="mt-1 min-h-[1.25rem] text-sm font-semibold text-text-strong">
            {currentSection?.label}
          </p>
        </div>
        <p className="font-mono text-sm text-text-ghost">{positionLabel}</p>
      </div>
      <div className="mt-4 flex gap-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`h-2 flex-1 rounded-full transition duration-200 ${
              index === activeIndex ? "bg-accent" : "bg-white/10"
            }`}
            aria-label={`Jump to ${section.title}`}
          />
        ))}
      </div>
    </div>
  );
}
