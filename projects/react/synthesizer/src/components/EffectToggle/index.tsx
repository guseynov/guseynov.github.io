import { FC } from 'react';
import { EffectToggleProps } from './interfaces';
import './styles.scss';

const EffectToggle: FC<EffectToggleProps> = ({
  name,
  effect,
  setEffect,
}) => {
  return (
    <button
      type="button"
      className={`effect-toggle${effect ? ' is-active' : ''}`}
      onClick={setEffect}
      aria-pressed={effect}
    >
      <span className="effect-toggle__text">
        <span className="effect-toggle__name">{name}</span>
        <span className="effect-toggle__state">{effect ? 'On' : 'Off'}</span>
      </span>
      <span className="effect-toggle__switch" aria-hidden="true">
        <span className="effect-toggle__thumb" />
      </span>
    </button>
  );
};

export default EffectToggle;
