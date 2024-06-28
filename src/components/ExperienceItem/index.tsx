import { Skill } from '../Skill';
import { ExperienceItemProps } from './interfaces';
import './styles.scss';

export const ExperienceItem = ({
  title,
  position,
  period,
  points,
  skills,
}: ExperienceItemProps) => {
  return (
    <div className="flex flex-col xl:w-[700px] w-full mr-9 last:mr-0 flex-shrink-0 experience-item-container relative mb-20">
      <p className="uppercase text-3xl font-medium text-white">{title}</p>
      <span className="border self-start my-2 px-8 uppercase py-2 text-xs font-light border-white rounded-full text-white">
        {position}
      </span>
      <p className="text-md font-light text-gray mb-4">{period}</p>
      <ul className="xl:text-lg font-thin text-white mb-8 list-disc list-inside">
        {points.map((point: string, index) => {
          return <li key={`point-${index}`}>{point}</li>;
        })}
      </ul>
      <div className="flex flex-wrap">
        {skills.map((title: string) => (
          <Skill key={title} title={title} />
        ))}
      </div>
    </div>
  );
};
