import { SkillProps } from './interfaces';

export const Skill = ({ title }: SkillProps) => {
  return (
    <span className="px-8 py-2 xl:px-10 xl:py-4 rounded-full uppercase border-gray text-gray border xl:mr-3 mr-2 mb-2 xl:mb-3 hover:border-white hover:text-white hover:rotate-12 transition-all text-sm xl:text-md">
      {title}
    </span>
  );
};
