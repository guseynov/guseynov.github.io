import { FC } from 'react';
import classNames from 'classnames';
import { Note } from 'tone/build/esm/core/type/NoteUnits';

import { NoteProps } from './interfaces';
import './styles.scss';

const NoteComponent: FC<NoteProps> = ({
  noteName,
  isSharp,
  playNoteCallback,
  stopNoteCallback,
}): JSX.Element => {
  return (
    <button
      type="button"
      key={noteName}
      className={classNames('note', { 'note--sharp': isSharp })}
      onMouseDown={() => playNoteCallback(noteName as Note)}
      onMouseUp={stopNoteCallback}
    ></button>
  );
};

export default NoteComponent;
