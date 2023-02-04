import { Note } from 'tone/build/esm/core/type/Units';

export interface NoteProps {
  noteName: string;
  isSharp: boolean;
  playNoteCallback: (noteName: Note) => void;
  stopNoteCallback: () => void;
}
