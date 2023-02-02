import { Skill } from '../Skill';
import { ExperienceItemProps } from './interfaces';
import './styles.scss';

export const ExperienceItem = ({
  title,
  position,
  period,
  description,
  skills,
}: ExperienceItemProps) => {
  return (
    <div className="flex flex-col w-[700px] mr-9 last:mr-0 flex-shrink-0 experience-item-container relative">
      <p className="uppercase text-4xl font-medium text-white">{title}</p>
      <p className="text-3xl text-white">{position}</p>
      <p className="text-3xl text-gray mb-6">{period}</p>
      <p className="text-3xl text-white mb-8">{description}</p>
      <div className="flex flex-wrap">
        {skills.map((title) => (
          <Skill key={title} title={title} />
        ))}
      </div>
    </div>
  );
};
