import { useId, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { iconButtonVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

const WORK_ENTRY_META: Record<string, { context: string; signals: string[] }> = {
  Twee: {
    context: "AI education product",
    signals: ["React components", "SCSS architecture", "ASP.NET integration"],
  },
  Bylith: {
    context: "Company UI foundation",
    signals: ["Vue 3 UI kit", "Component quality", "Reusable patterns"],
  },
  Sberbank: {
    context: "Large-scale EdTech",
    signals: ["Microfrontends", "React + TypeScript", "Test coverage"],
  },
  FUTURECOMES: {
    context: "Game-like learning SPA",
    signals: ["React delivery", "Review standards", "Team consistency"],
  },
  "Older roles": {
    context: "Production frontend base",
    signals: ["Freelance delivery", "Business contexts", "Execution range"],
  },
};

function clampIndex(index: number, total: number) {
  return Math.max(0, Math.min(total - 1, index));
}

export function ExperienceContent() {
  const experiencePanelId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeEntry = siteContent.experience[selectedIndex];
  const activeMeta = activeEntry ? WORK_ENTRY_META[activeEntry.company] : null;

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
    <div className="flex h-full min-h-0 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-end gap-2 border-b border-white/8 pb-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            disabled={selectedIndex === 0}
            aria-controls={experiencePanelId}
            aria-label="Show previous experience"
            className={iconButtonVariants({
              state: selectedIndex === 0 ? "disabled" : "default",
            })}
          >
            <span aria-hidden="true" className="text-icon-strong">
              <ChevronLeft aria-hidden="true" className="h-6 w-6" />
            </span>
          </button>
          <button
            type="button"
            onClick={showNext}
            disabled={selectedIndex === siteContent.experience.length - 1}
            aria-controls={experiencePanelId}
            aria-label="Show next experience"
            className={iconButtonVariants({
              state:
                selectedIndex === siteContent.experience.length - 1 ? "disabled" : "default",
            })}
          >
            <span aria-hidden="true" className="text-icon-strong">
              <ChevronRight aria-hidden="true" className="h-6 w-6" />
            </span>
          </button>
        </div>
      </div>

      <div className="grid min-h-0 gap-5 lg:grid-cols-[minmax(12rem,0.36fr)_minmax(0,1fr)] xl:gap-7">
        <div className="min-w-0">
          <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
            Timeline
          </p>
          <div
            role="tablist"
            aria-label="Experience timeline"
            className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
          >
            {siteContent.experience.map((entry, index) => {
              const isActive = index === selectedIndex;
              const entryNumber = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={`${entry.company}-tab`}
                  type="button"
                  role="tab"
                  id={`${experiencePanelId}-${entryNumber}-tab`}
                  aria-selected={isActive}
                  aria-controls={experiencePanelId}
                  onClick={() => scrollToExperience(index)}
                  className={clsx(
                    "control-tap-target group flex min-w-0 items-center rounded-[0.9rem] border p-3 text-left transition duration-200 ease-out focus-visible:outline-none",
                    isActive
                      ? "border-accent bg-accent text-text-inverse shadow-[0_0_24px_var(--color-accent-glow)]"
                      : "border-white/8 bg-[color:oklch(0.18_0_0_/_0.46)] text-text-muted hover:border-white/18 hover:bg-[color:oklch(0.23_0_0_/_0.6)] hover:text-text-strong",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{entry.company}</span>
                    <span
                      className={clsx(
                        "mt-1 block truncate font-mono text-[0.66rem]",
                        isActive ? "text-text-inverse/54" : "text-text-ghost",
                      )}
                    >
                      {entry.period}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 border-t border-white/8 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <div
            className="relative overflow-hidden rounded-[1rem] border border-white/8 bg-[color:oklch(0.07_0_0_/_0.64)] p-4 sm:p-5 lg:p-6"
            id={experiencePanelId}
            role="tabpanel"
            aria-labelledby={`${experiencePanelId}-${String(selectedIndex + 1).padStart(2, "0")}-tab`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:2.2rem_2.2rem] [mask-image:linear-gradient(180deg,black,transparent_82%)]"
            />
            {activeEntry ? (
              <article
                key={`${activeEntry.company}-${activeEntry.period}`}
                className="relative z-10"
              >
                <div className="flex flex-col gap-5 border-b border-white/8 pb-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
                      <h3 className="text-display-title text-[clamp(2.35rem,5.8vw,4.8rem)] text-text-strong">
                        {activeEntry.company}
                      </h3>
                      <p className="pb-1 text-base text-text-muted">{activeEntry.role}</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm leading-6 text-text-ghost xl:pt-2">
                    {activeEntry.period}
                  </p>
                </div>

                {activeMeta ? (
                  <div className="grid gap-3 border-b border-white/8 py-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
                        Context
                      </p>
                      <p className="mt-2 text-base text-text-strong">{activeMeta.context}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
                        Signals
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeMeta.signals.map((signal) => (
                          <span
                            key={signal}
                            className="rounded-full border border-white/10 bg-[color:oklch(0.25_0_0_/_0.42)] px-3 py-1.5 text-sm text-text-muted"
                          >
                            {signal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                <ul className="divide-y divide-white/8">
                  {activeEntry.impact.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 py-4 text-base leading-7 text-text-muted"
                    >
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
