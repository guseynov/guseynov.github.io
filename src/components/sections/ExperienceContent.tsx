import { useId, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/SanityIcons";
import { iconButtonVariants, panelVariants, tabButtonVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

function clampIndex(index: number, total: number) {
  return Math.max(0, Math.min(total - 1, index));
}

export function ExperienceContent() {
  const experienceCarouselId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeEntry = siteContent.experience[selectedIndex];

  const scrollToExperience = (index: number) => {
    setSelectedIndex(clampIndex(index, siteContent.experience.length));
  };

  const showPrevious = () => {
    setSelectedIndex((currentIndex) => clampIndex(currentIndex - 1, siteContent.experience.length));
  };

  const showNext = () => {
    setSelectedIndex((currentIndex) => clampIndex(currentIndex + 1, siteContent.experience.length));
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
            Role spotlight
          </p>
          <p className="mt-2 text-sm text-text-muted">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(siteContent.experience.length).padStart(2, "0")}
            {activeEntry ? ` · ${activeEntry.company}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            disabled={selectedIndex === 0}
            aria-controls={experienceCarouselId}
            aria-label="Show previous experience"
            className={iconButtonVariants({
              state: selectedIndex === 0 ? "disabled" : "default",
            })}
          >
            <span aria-hidden="true" className="text-icon-strong">
              <ChevronLeftIcon aria-hidden="true" className="h-6 w-6" />
            </span>
          </button>
          <button
            type="button"
            onClick={showNext}
            disabled={selectedIndex === siteContent.experience.length - 1}
            aria-controls={experienceCarouselId}
            aria-label="Show next experience"
            className={iconButtonVariants({
              state:
                selectedIndex === siteContent.experience.length - 1 ? "disabled" : "default",
            })}
          >
            <span aria-hidden="true" className="text-icon-strong">
              <ChevronRightIcon aria-hidden="true" className="h-6 w-6" />
            </span>
          </button>
        </div>
      </div>

      <div className="min-h-0" id={experienceCarouselId} aria-live="polite">
        {activeEntry ? (
          <article
            key={`${activeEntry.company}-${activeEntry.period}`}
            className={panelVariants({ tone: "surface" })}
          >
            <div className="flex flex-col gap-3 border-b border-white/8 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-display-title text-[clamp(1.7rem,2.5vw,2.35rem)] text-text-strong">
                  {activeEntry.company}
                </h3>
                <p className="mt-1 text-base text-text-muted">{activeEntry.role}</p>
              </div>
              <p className="font-mono text-sm text-text-ghost">{activeEntry.period}</p>
            </div>
            <ul className="mt-4 space-y-3">
              {activeEntry.impact.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-text-muted">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {siteContent.experience.map((entry, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={`${entry.company}-tab`}
              type="button"
              onClick={() => scrollToExperience(index)}
              aria-label={`Show experience for ${entry.company}`}
              aria-pressed={isActive}
              className={tabButtonVariants({ active: isActive })}
            >
              {entry.company}
            </button>
          );
        })}
      </div>
    </div>
  );
}
