import { clsx } from "clsx";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { skillCategories, type Skill } from "../data/skills";

function TechnologyIcon({ brandIcon, icon: Icon }: Skill) {
  if (brandIcon) {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5 flex-[0_0_20px] fill-current"
        viewBox="0 0 24 24"
      >
        <path d={brandIcon.path} />
      </svg>
    );
  }

  return Icon ? (
    <Icon
      aria-hidden="true"
      className="h-5 w-5 flex-[0_0_20px] fill-none stroke-current"
      strokeWidth={1.8}
    />
  ) : null;
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <div className="flex h-11 min-w-0 items-center gap-4 border-b-[0.6px] border-rule font-sans text-lg leading-6 font-medium whitespace-nowrap md:gap-3 md:text-base">
      <TechnologyIcon {...skill} />
      <span>{skill.label}</span>
    </div>
  );
}

export function SkillsetSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(skillCategories[0].id);
  const [isDesktop, setIsDesktop] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedCategoryIndex = Math.max(
    0,
    skillCategories.findIndex((category) => category.id === selectedCategoryId),
  );
  const selectedCategory = skillCategories[selectedCategoryIndex];
  const desktopSkills = (selectedCategory.desktopOrder ?? selectedCategory.skills.map((_, index) => index))
    .map((index) => selectedCategory.skills[index])
    .filter(Boolean);
  const firstDesktopColumn = desktopSkills.slice(0, selectedCategory.desktopColumnBreak);
  const secondDesktopColumn = desktopSkills.slice(selectedCategory.desktopColumnBreak);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateOrientation = () => setIsDesktop(mediaQuery.matches);

    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);
    return () => mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

  const activateTab = (index: number) => {
    const nextIndex = (index + skillCategories.length) % skillCategories.length;
    setSelectedCategoryId(skillCategories[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();

    if (!isDesktop) {
      tabRefs.current[nextIndex]?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = skillCategories.length - 1;
    if (isDesktop && event.key === "ArrowUp") nextIndex = index - 1;
    if (isDesktop && event.key === "ArrowDown") nextIndex = index + 1;
    if (!isDesktop && event.key === "ArrowLeft") nextIndex = index - 1;
    if (!isDesktop && event.key === "ArrowRight") nextIndex = index + 1;

    if (nextIndex === undefined) return;
    event.preventDefault();
    activateTab(nextIndex);
  };

  return (
    <section
      className="relative min-h-[1080px] scroll-mt-[132px] overflow-hidden bg-background pt-[31px] md:min-h-[796px] md:scroll-mt-0 md:overflow-clip md:pt-0"
      id="skills"
    >
      <div className="relative mx-auto min-h-[1049px] w-[calc(100%-24px)] md:h-[796px] md:min-h-0 md:w-[min(calc(100%-192px),1088px)] md:max-[901px]:w-[calc(100%-80px)]">
        <div className="relative w-full md:absolute md:top-[54px] md:left-0 md:w-[344px]">
          <h2 className="m-0 h-[66px] font-sans text-[72px] leading-[66px] font-medium tracking-normal">
            Skillset
          </h2>
          <p className="mt-[22px] mb-0 max-w-[344px] font-sans text-base leading-[26px] font-normal">
            I pay attention to the details that make interfaces feel finished after launch,
            including behavior, states, accessibility, and the implementation choices that other
            engineers inherit.
          </p>
        </div>

        <img
          alt="Alex Guseynov"
          className="absolute top-[54px] right-0 hidden h-[206px] w-[316px] object-cover object-[center_43%] md:block"
          loading="lazy"
          src={`${import.meta.env.BASE_URL}images/image.JPEG`}
        />

        <div className="relative mt-[85px] grid md:absolute md:top-[361px] md:right-0 md:left-0 md:mt-0 md:block">
          <div className="contents md:grid md:grid-cols-[31.6176%_minmax(0,1fr)] md:gap-x-7">
            <p className="col-start-1 row-start-1 m-0 border-b-[0.6px] border-rule pb-0 text-base leading-[24px] font-normal md:pb-[9px]">
              /Select
            </p>
            <p className="col-start-1 row-start-3 mt-[46px] mb-0 border-b-[0.6px] border-rule pb-0 text-base leading-[24px] font-normal md:col-start-2 md:row-start-1 md:mt-0 md:pb-[9px]">
              /Selected category
            </p>
          </div>

          <div className="contents md:mt-[27px] md:grid md:grid-cols-[31.6176%_minmax(0,1fr)] md:gap-x-7">
            <div
              aria-label="Skill categories"
              aria-orientation={isDesktop ? "vertical" : "horizontal"}
              className="col-start-1 row-start-2 mt-[29px] flex h-11 flex-row gap-5 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:row-start-1 md:mt-0 md:h-[252px] md:flex-col md:gap-3.5 md:overflow-visible md:bg-[repeating-linear-gradient(to_bottom,var(--color-rule)_0_5px,transparent_5px_9px)] md:bg-[length:1px_100%] md:bg-left-top md:bg-no-repeat md:pl-5"
              role="tablist"
            >
              {skillCategories.map((category, index) => {
                const isSelected = category.id === selectedCategory.id;

                return (
                  <button
                    aria-controls="selected-skills"
                    aria-selected={isSelected}
                    className={clsx(
                      "flex h-11 w-max min-w-max flex-[0_0_auto] cursor-pointer items-center bg-transparent p-0 text-left text-lg leading-6 font-light text-rule focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:grid md:h-6 md:w-full md:min-w-0 md:grid-cols-[18px_minmax(0,1fr)_auto] md:pr-0.5 md:text-base",
                      isSelected && "!font-normal !text-white",
                    )}
                    id={`category-${category.id}`}
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    role="tab"
                    tabIndex={isSelected ? 0 : -1}
                    type="button"
                  >
                    <span aria-hidden="true" className={clsx("hidden", isSelected && "md:block")}>
                      &gt;
                    </span>
                    <span
                      className={clsx(
                        "overflow-hidden text-ellipsis whitespace-nowrap",
                        isSelected ? "md:underline md:underline-offset-2" : "md:col-span-2",
                      )}
                    >
                      {category.label}
                    </span>
                    <span className="md:col-start-3">({category.skills.length})</span>
                  </button>
                );
              })}
            </div>

            <div
              aria-labelledby={`category-${selectedCategory.id}`}
              className="col-start-1 row-start-4 mt-6 md:col-start-2 md:row-start-1 md:mt-0"
              id="selected-skills"
              role="tabpanel"
              tabIndex={0}
            >
              <div className="grid auto-rows-[44px] grid-cols-1 gap-y-5 md:hidden">
                {selectedCategory.skills.map((skill) => (
                  <SkillRow key={skill.label} skill={skill} />
                ))}
              </div>

              <div className="relative hidden h-[252px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-7 bg-[repeating-linear-gradient(to_bottom,var(--color-rule)_0_5px,transparent_5px_9px)] bg-[length:1px_100%] bg-left-top bg-no-repeat after:absolute after:top-0 after:bottom-0 after:left-[calc(50%)] after:w-px after:bg-[repeating-linear-gradient(to_bottom,var(--color-rule)_0_5px,transparent_5px_9px)] after:content-[''] md:grid">
                <div className="ml-5 grid auto-rows-[44px] gap-y-5">
                  {firstDesktopColumn.map((skill) => (
                    <SkillRow key={skill.label} skill={skill} />
                  ))}
                </div>
                <div className="ml-5 grid auto-rows-[44px] gap-y-5">
                  {secondDesktopColumn.map((skill) => (
                    <SkillRow key={skill.label} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
