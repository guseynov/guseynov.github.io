import { Note } from 'tone/build/esm/core/type/Units';
import { CSSProperties } from 'react';

export interface NoteProps {
  noteName: string;
  isSharp: boolean;
  isActive: boolean;
  style?: CSSProperties;
  playNoteCallback: (noteName: Note) => void;
  stopNoteCallback: () => void;
}
