export interface OctaveControlsProps {
  octave: number;
  octaveChangeCallback: (offset: number) => void;
  minOctave: number;
  maxOctave: number;
}
