import { ProjectItemProps } from './interfaces';

export const ProjectItem = ({
  icons,
  title,
  skills,
  projectLink,
  codeLink,
}: ProjectItemProps) => {
  return (
    <div className="rounded-2xl border border-white pt-7 overflow-hidden">
      <div className="min-h-[280px]">
        <div className="flex mb-4 px-6">
          {icons.map((icon, index) => (
            <img
              key={`icon-${index}`}
              className="mr-2"
              src={`/${icon}.svg`}
              alt=""
            />
          ))}
        </div>
        <p className="text-4xl text-white mb-4 px-6">{title}</p>
        <div className="flex mb-2 px-6">
          {skills.map((skill, index) => (
            <div className="flex" key={`skill-${skill}`}>
              <p className="text-2xl text-gray">{skill}</p>
              <span>
                {index !== skills.length - 1 && (
                  <span className="text-2xl text-gray mx-3">•</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex border-t border-white">
        <a
          className="text-2xl py-5 text-white flex justify-center items-center hover:bg-white hover:text-dark group flex-grow text-center"
          href={projectLink}
        >
          Project
          <svg
            className="ml-2.5"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1649 1.80718H0.888936V0H16.25V15.3611H14.4428V3.08506L1.52787 16L0.25 14.7221L13.1649 1.80718Z"
              fill="white"
              className="group-hover:fill-dark"
            />
          </svg>
        </a>
        <a
          className="text-2xl py-5 text-white flex justify-center items-center hover:bg-white hover:text-dark group flex-grow text-center"
          href={codeLink}
        >
          Code
          <svg
            className="ml-2.5"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1649 1.80718H0.888936V0H16.25V15.3611H14.4428V3.08506L1.52787 16L0.25 14.7221L13.1649 1.80718Z"
              fill="white"
              className="group-hover:fill-dark"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
