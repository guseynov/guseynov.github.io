import { useId, useState } from "react";
import clsx from "clsx";
import { siteContent } from "@/content/site";

function clampIndex(index: number, total: number) {
  return Math.max(0, Math.min(total - 1, index));
}

export function ExperienceContent() {
  const experiencePanelId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeEntry = siteContent.experience[selectedIndex];

  const scrollToExperience = (index: number) => {
    setSelectedIndex(clampIndex(index, siteContent.experience.length));
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
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
