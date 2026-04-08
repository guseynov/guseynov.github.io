import { FC } from 'react';
import classNames from 'classnames';
import { Note } from 'tone/build/esm/core/type/NoteUnits';

import { NoteProps } from './interfaces';
import './styles.scss';

const NoteComponent: FC<NoteProps> = ({
  noteName,
  isSharp,
  isActive,
  style,
  playNoteCallback,
  stopNoteCallback,
}) => {
  return (
    <button
      type="button"
      className={classNames('note', {
        'note--sharp': isSharp,
        'note--active': isActive,
      })}
      style={style}
      aria-label={`Play ${noteName}`}
      onPointerDown={() => {
        void playNoteCallback(noteName as Note);
      }}
      onPointerUp={stopNoteCallback}
      onPointerCancel={stopNoteCallback}
      onPointerLeave={stopNoteCallback}
    >
      {!isSharp ? <span className="note__label">{noteName}</span> : null}
    </button>
  );
};

export default NoteComponent;
