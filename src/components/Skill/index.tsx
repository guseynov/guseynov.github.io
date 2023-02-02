import { SkillProps } from './interfaces';

export const Skill = ({ title }: SkillProps) => {
  return (
    <span className="px-10 py-4 rounded-full uppercase border-gray text-gray border mr-3 mb-3 hover:border-white hover:text-white hover:rotate-12 transition-all">
      {title}
    </span>
  );
};
