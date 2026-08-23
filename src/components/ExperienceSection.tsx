import { experiences, type Experience } from "../data/experiences";
import { cvUrl } from "../data/site";
import { CornerButton } from "./CornerButton";

const assetRoot = `${import.meta.env.BASE_URL}assets`;

type ExperienceEntryProps = {
  experience: Experience;
  featured: boolean;
};

function ExperienceEntry({ experience, featured }: ExperienceEntryProps) {
  return (
    <article className="block w-full md:grid md:w-[530px] md:grid-cols-[130px_344px] md:gap-x-14">
      <div className="border-b-[0.6px] border-rule pb-4 md:border-0 md:pb-0">
        <h3 className="m-0 font-mono text-[21px] leading-[26px] font-normal md:leading-5">
          {experience.company}
        </h3>
        <p className="mt-4 mb-0 ml-px font-sans text-xs leading-[18px] font-normal whitespace-nowrap text-rule md:mt-3 md:text-sm md:leading-[15.84px]">
          {experience.period}
        </p>
      </div>

      <div className="mt-10 md:mt-0">
        <h4 className="m-0 font-mono text-[21px] leading-[26px] font-normal md:leading-5">
          {experience.role}
        </h4>

        <div className="mt-10 flex flex-col gap-10 md:mt-7 md:gap-7">
          <div className="flex flex-col gap-4 md:gap-[9px]">
            <h5 className="m-0 font-sans text-sm leading-6 font-bold uppercase">
              Responsibilities
            </h5>
            <ul
              className={featured
                ? "m-0 flex list-none flex-col gap-6 p-0 font-sans text-sm leading-6 font-normal md:gap-3.5"
                : "m-0 flex list-none flex-col gap-6 p-0 font-sans text-sm leading-6 font-normal md:gap-2 md:text-xs md:leading-[21px]"}
            >
              {experience.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <img
            alt=""
            aria-hidden="true"
            className="block h-px w-full md:w-[344px]"
            src={`${assetRoot}/experience-rule.svg`}
          />

          <div className="flex flex-col gap-4 md:gap-[9px]">
            <h5 className="m-0 font-sans text-sm leading-6 font-bold uppercase">
              Achievements
            </h5>
            <ul
              className={featured
                ? "m-0 flex list-none flex-col gap-6 p-0 font-sans text-sm leading-6 font-normal md:gap-3.5"
                : "m-0 flex list-none flex-col gap-6 p-0 font-sans text-sm leading-6 font-normal md:gap-2 md:text-xs md:leading-[21px]"}
            >
              {experience.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ExperienceSection() {
  return (
    <section className="relative scroll-mt-[132px] bg-background py-24 md:scroll-mt-0 md:py-40 md:max-[901px]:py-[120px]" id="experience">
      <div className="mx-auto block w-[calc(100%-24px)] md:grid md:w-[min(calc(100%-192px),1088px)] md:grid-cols-[513px_530px] md:items-start md:gap-x-[45px] md:max-[901px]:block md:max-[901px]:w-[calc(100%-80px)]">
        <div className="relative self-start md:sticky md:top-0 md:max-[901px]:relative md:max-[901px]:top-auto md:max-[901px]:w-[min(100%,513px)]">
          <h2 className="m-0 font-sans text-[clamp(53px,17.9vw,72px)] leading-[66px] font-normal tracking-normal max-[360px]:text-[52px] max-[360px]:tracking-[-2px] md:text-7xl">
            Experience
            <sup className="top-auto align-super text-2xl leading-normal tracking-normal md:text-[46.44px]">
              ({experiences.length})
            </sup>
          </h2>

          <div className="mt-[26px] md:mt-[18px]">
            <p className="m-0 w-[min(100%,344px)] font-sans text-[15px] leading-[26px] font-normal md:w-[344px] md:text-base">
              My recent work has concentrated on scalable component systems,
              product modernization, and disciplined frontend delivery across
              different team sizes.
            </p>

            <CornerButton
              ariaLabel="Download Alex Guseynov's full resume"
              className="mt-10 !h-10 !w-[min(279px,100%)] bg-surface !text-xs !leading-[18.24px] !font-medium text-white md:mt-12 md:!w-[190px]"
              download
              href={cvUrl}
            >
              <span className="hidden md:inline">
                Download full resume
              </span>
              <span className="inline md:hidden">
                Download full resume ↓
              </span>
            </CornerButton>
          </div>
        </div>

        <div className="mt-[78px] w-full md:mt-[39px] md:w-[530px] md:max-[901px]:mt-24 md:max-[901px]:ml-auto md:max-[901px]:max-w-full">
          {experiences.map((experience, index) => (
            <div key={experience.company}>
              <ExperienceEntry experience={experience} featured={index === 0} />
              {index < experiences.length - 1 && (
                <p
                  aria-hidden="true"
                  className="mt-10 mb-[78px] h-5 w-full overflow-hidden font-sans text-xl leading-5 font-normal tracking-[6px] whitespace-nowrap text-rule md:my-14 md:w-[530px]"
                >
                  ///////////////////////////////////////////////
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
