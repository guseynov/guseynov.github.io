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
    <div className="flex flex-col w-[700px] mr-9 last:mr-0 flex-shrink-0 experience-item-container relative mb-20">
      <p className="uppercase text-4xl font-medium text-white">{title}</p>
      <p className="text-3xl text-white">{position}</p>
      <p className="text-3xl text-gray mb-6">{period}</p>
      <ul className="text-3xl text-white mb-8 list-disc list-inside">
        {points.map((point: string) => {
          return <li>{point}</li>;
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
