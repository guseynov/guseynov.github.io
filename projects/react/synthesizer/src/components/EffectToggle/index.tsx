import { FC } from 'react';
import { EffectToggleProps } from './interfaces';
import './styles.scss';

const EffectToggle: FC<EffectToggleProps> = ({
  name,
  effect,
  setEffect,
}): JSX.Element => {
  return (
    <div className="toggle-container">
      <label className="toggle">
        <input
          type="checkbox"
          checked={effect}
          onChange={() => setEffect(!effect)}
        />
        <span className="slider round"></span>
        <div className="toggle-names">
          <span className="name">{name}</span>
        </div>
      </label>
    </div>
  );
};

export default EffectToggle;
