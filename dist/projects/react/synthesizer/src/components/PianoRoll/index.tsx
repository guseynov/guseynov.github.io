import { FC } from 'react';

import { PianoRollProps } from './interfaces';
import NoteComponent from '../Note';
import { NOTES } from '../../constants';
import './styles.scss';

const PianoRoll: FC<PianoRollProps> = ({
  octave,
  playNoteCallback,
  stopNoteCallback,
}): JSX.Element => {
  const notes: JSX.Element[] = [];
  for (let offset = 0; offset < 2; offset++) {
    NOTES.forEach((note, index) => {
      const noteName = note + (octave + offset);
      const isSharp = note.includes('#');
      notes.push(
        <NoteComponent
          key={`note-${index}-${offset}`}
          noteName={noteName}
          isSharp={isSharp}
          playNoteCallback={playNoteCallback}
          stopNoteCallback={stopNoteCallback}
        />
      );
    });
  }

  // Last note
  notes.push(
    <NoteComponent
      key={`note-0-2`}
      noteName={'C' + (octave + 2)}
      isSharp={false}
      playNoteCallback={playNoteCallback}
      stopNoteCallback={stopNoteCallback}
    />
  );

  return <div className="keyboard">{notes}</div>;
};

export default PianoRoll;
