import { ProjectItemProps } from './interfaces';

export const ProjectItem = ({
  icons,
  title,
  skills,
  projectLink,
  codeLink,
}: ProjectItemProps) => {
  return (
    <div className="simple-glass rounded-3xl p-8 h-full flex flex-col justify-between hover:bg-white/5 transition-colors duration-300">
      <div>
        <div className="flex mb-6">
          {icons.map((icon, index) => (
            <img
              key={`icon-${index}`}
              className="mr-3 w-8 h-8 opacity-80"
              src={`/${icon}.svg`}
              alt=""
            />
          ))}
        </div>
        <p className="text-2xl font-outfit font-bold text-white mb-4 leading-tight">
          {title}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((skill) => (
            <div
              key={`skill-${skill}`}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-outfit text-xs font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-auto">
        <a
          className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-outfit text-sm font-medium flex justify-center items-center transition-all duration-300"
          href={projectLink}
          target="_blank"
          rel="noreferrer"
        >
          Project
          <svg
            className="ml-2 w-3 h-3"
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1649 1.80718H0.888936V0H16.25V15.3611H14.4428V3.08506L1.52787 16L0.25 14.7221L13.1649 1.80718Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a
          className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white/80 font-outfit text-sm font-medium flex justify-center items-center transition-all duration-300"
          href={codeLink}
          target="_blank"
          rel="noreferrer"
        >
          Code
          <svg
            className="ml-2 w-3 h-3"
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1649 1.80718H0.888936V0H16.25V15.3611H14.4428V3.08506L1.52787 16L0.25 14.7221L13.1649 1.80718Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
