import { ExperienceItemProps } from './interfaces';

export const ExperienceItem = ({
  title,
  position,
  period,
  points,
  skills,
}: ExperienceItemProps) => {
  return (
    <div className="flex flex-col xl:w-[700px] w-full mr-9 last:mr-0 flex-shrink-0 relative mb-20 simple-glass rounded-3xl p-8 lg:p-12">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="uppercase text-3xl font-outfit font-bold text-white mb-2">
            {title}
          </p>
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs font-outfit font-medium text-white/80 border border-white/10">
            {position}
          </span>
        </div>
        <p className="text-sm font-outfit text-white/60 mt-2">{period}</p>
      </div>

      <ul className="text-lg font-outfit font-light text-white/90 mb-8 list-disc list-inside space-y-2">
        {points.map((point: string, index) => {
          return <li key={`point-${index}`}>{point}</li>;
        })}
      </ul>

      <div className="flex flex-wrap gap-2">
        {skills.map((title: string) => (
          <div
            key={title}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 font-outfit text-xs font-medium hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};
