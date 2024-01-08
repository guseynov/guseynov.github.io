import { FC } from 'react';
import classNames from 'classnames';
import { OctaveControlsProps } from './interfaces';
import './styles.scss';

const OctaveControls: FC<OctaveControlsProps> = ({
  octave,
  octaveChangeCallback,
}): JSX.Element => {
  return (
    <div className="octaves">
      <button
        type="button"
        onClick={() => octaveChangeCallback(-1)}
        className={classNames('octave-btn', {
          isDisabled: octave === 0,
        })}
      >
        Oct -
      </button>
      <button
        type="button"
        onClick={() => octaveChangeCallback(1)}
        className={classNames('octave-btn', {
          isDisabled: octave === 5,
        })}
      >
        Oct +
      </button>
    </div>
  );
};

export default OctaveControls;
