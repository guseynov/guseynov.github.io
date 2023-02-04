import { Note } from 'tone/build/esm/core/type/Units';

export interface PianoRollProps {
  octave: number;
  playNoteCallback: (noteName: Note) => void;
  stopNoteCallback: () => void;
}
