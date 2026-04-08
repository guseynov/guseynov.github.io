import { FC } from 'react';
import classNames from 'classnames';
import { OctaveControlsProps } from './interfaces';
import './styles.scss';

const OctaveControls: FC<OctaveControlsProps> = ({
  octave,
  octaveChangeCallback,
  minOctave,
  maxOctave,
}) => {
  return (
    <div className="octaves" aria-label="Octave controls">
      <button
        type="button"
        onClick={() => octaveChangeCallback(-1)}
        className={classNames('octave-btn', {
          isDisabled: octave === minOctave,
        })}
        disabled={octave === minOctave}
        aria-label="Decrease octave"
      >
        Oct -
      </button>
      <output className="octave-readout" aria-live="polite">
        {octave}
      </output>
      <button
        type="button"
        onClick={() => octaveChangeCallback(1)}
        className={classNames('octave-btn', {
          isDisabled: octave === maxOctave,
        })}
        disabled={octave === maxOctave}
        aria-label="Increase octave"
      >
        Oct +
      </button>
    </div>
  );
};

export default OctaveControls;
