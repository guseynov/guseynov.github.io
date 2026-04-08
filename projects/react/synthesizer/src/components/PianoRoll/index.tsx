import { FC, ReactNode } from 'react';

import { PianoRollProps } from './interfaces';
import NoteComponent from '../Note';
import { NOTES } from '../../constants';
import './styles.scss';

const PianoRoll: FC<PianoRollProps> = ({
  octave,
  activeNote,
  playNoteCallback,
  stopNoteCallback,
}) => {
  const whiteNotes: ReactNode[] = [];
  const blackNotes: ReactNode[] = [];
  const totalWhiteKeys = 15;
  const whiteWidth = 100 / totalWhiteKeys;
  let whiteIndex = 0;

  for (let offset = 0; offset < 2; offset += 1) {
    NOTES.forEach((note, index) => {
      const noteName = note + (octave + offset);
      const isSharp = note.includes('#');

      if (isSharp) {
        const left = (whiteIndex * whiteWidth) - (whiteWidth * 0.34);

        blackNotes.push(
          <NoteComponent
            key={`note-${index}-${offset}`}
            noteName={noteName}
            isSharp
            isActive={activeNote === noteName}
            style={{ left: `${left}%` }}
            playNoteCallback={playNoteCallback}
            stopNoteCallback={stopNoteCallback}
          />
        );
      } else {
        whiteNotes.push(
          <NoteComponent
            key={`note-${index}-${offset}`}
            noteName={noteName}
            isSharp={false}
            isActive={activeNote === noteName}
            playNoteCallback={playNoteCallback}
            stopNoteCallback={stopNoteCallback}
          />
        );
        whiteIndex += 1;
      }
    });
  }

  const lastNote = `C${octave + 2}`;
  whiteNotes.push(
    <NoteComponent
      key="note-last"
      noteName={lastNote}
      isSharp={false}
      isActive={activeNote === lastNote}
      playNoteCallback={playNoteCallback}
      stopNoteCallback={stopNoteCallback}
    />
  );

  return (
    <div className="keyboard-wrap">
      <div className="keyboard" role="group" aria-label="Playable piano keys">
        <div className="keyboard__white">{whiteNotes}</div>
        <div className="keyboard__black" aria-hidden="true">
          {blackNotes}
        </div>
      </div>
    </div>
  );
};

export default PianoRoll;
