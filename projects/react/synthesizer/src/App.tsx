import * as Tone from 'tone';
import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Note } from 'tone/build/esm/core/type/NoteUnits';
import PianoRoll from './components/PianoRoll';
import './App.scss';
import OctaveControls from './components/OctaveControls';
import EffectToggle from './components/EffectToggle';
import Select from './components/Select/Index';

function App() {
  const [octave, setOctave] = useState(2);
  const [sound, setSound] = useState('synth');

  const [reverb, setReverb] = useState(false);
  const [chorus, setChorus] = useState(false);
  const [vibrato, setVibrato] = useState(false);
  const [phaser, setPhaser] = useState(false);
  const [delay, setDelay] = useState(false);
  const [tremolo, setTremolo] = useState(false);
  const [distortion, setDistortion] = useState(false);
  const [pitchShift, setPitchShift] = useState(false);

  const reverbRef = useRef(new Tone.Reverb());
  const chorusRef = useRef(new Tone.Chorus());
  const tremoloRef = useRef(new Tone.Tremolo());
  const vibratoRef = useRef(new Tone.Vibrato());
  const phaserRef = useRef(new Tone.Phaser());
  const delayRef = useRef(new Tone.PingPongDelay());
  const distortionRef = useRef(new Tone.Distortion());
  const pitchShiftRef = useRef(new Tone.PitchShift());

  const synthOrInstrument = useRef<
    | Tone.Synth
    | Tone.PluckSynth
    | Tone.FMSynth
    | Tone.MembraneSynth
    | Tone.MetalSynth
    | Tone.AMSynth
    | Tone.DuoSynth
    | Tone.MonoSynth
  >();

  useEffect(() => {
    if (synthOrInstrument.current) {
      synthOrInstrument.current?.dispose();
    }

    switch (sound) {
      case 'synth':
        synthOrInstrument.current = new Tone.Synth();
        break;
      case 'pluck':
        synthOrInstrument.current = new Tone.PluckSynth();
        break;
      case 'fmsynth':
        synthOrInstrument.current = new Tone.FMSynth();
        break;
      case 'membrane':
        synthOrInstrument.current = new Tone.MembraneSynth();
        break;
      case 'metal':
        synthOrInstrument.current = new Tone.MetalSynth();
        break;
      case 'amsynth':
        synthOrInstrument.current = new Tone.AMSynth();
        break;
      case 'duosynth':
        synthOrInstrument.current = new Tone.DuoSynth();
        break;
      case 'monosynth':
        synthOrInstrument.current = new Tone.MonoSynth();
        break;
    }

    synthOrInstrument.current?.chain(
      reverbRef.current,
      chorusRef.current,
      vibratoRef.current,
      phaserRef.current,
      delayRef.current,
      tremoloRef.current,
      distortionRef.current,
      pitchShiftRef.current,
      Tone.Destination
    );
  }, [sound]);

  useLayoutEffect(() => {
    reverbRef.current.wet.value = reverb ? 1 : 0;
    chorusRef.current.wet.value = chorus ? 1 : 0;
    vibratoRef.current.wet.value = vibrato ? 1 : 0;
    phaserRef.current.wet.value = phaser ? 1 : 0;
    delayRef.current.wet.value = delay ? 1 : 0;
    tremoloRef.current.wet.value = tremolo ? 1 : 0;
    distortionRef.current.wet.value = distortion ? 1 : 0;
    pitchShiftRef.current.wet.value = pitchShift ? 1 : 0;
  }, [reverb, chorus, vibrato, phaser, delay, tremolo, distortion, pitchShift]);

  useLayoutEffect(() => {
    tremoloRef.current.wet.value = tremolo ? 1 : 0;
  }, [tremolo]);

  const playNoteCallback = useCallback(
    (note: Note) => {
      const now = Tone.now();
      synthOrInstrument.current?.triggerAttack(note, now);
    },
    [synthOrInstrument]
  );

  const octaveChangeCallback = useCallback(
    (offset: number) => {
      setOctave((oldValue) => oldValue + offset);
    },
    [setOctave]
  );

  const stopNoteCallback = useCallback(
    () => synthOrInstrument.current?.triggerRelease(),
    [synthOrInstrument]
  );

  return (
    <div className="App">
      <div className="base">
        <div className="controls">
          <OctaveControls
            octaveChangeCallback={octaveChangeCallback}
            octave={octave}
          />
          <Select
            value={sound}
            onChange={(event) => {
              setSound(event.target.value);
            }}
            options={[
              { value: 'synth', label: 'Synth' },
              { value: 'pluck', label: 'Pluck Synth' },
              { value: 'fmsynth', label: 'FM Synth' },
              { value: 'membrane', label: 'Membrane Synth' },
              { value: 'metal', label: 'Metal Synth' },
              { value: 'amsynth', label: 'AM Synth' },
              { value: 'duosynth', label: 'Duo Synth' },
              { value: 'monosynth', label: 'Mono Synth' },
            ]}
          />
          <div className="toggles">
            <EffectToggle name="Reverb" effect={reverb} setEffect={setReverb} />
            <EffectToggle name="Chorus" effect={chorus} setEffect={setChorus} />
            <EffectToggle name="Phaser" effect={phaser} setEffect={setPhaser} />
            <EffectToggle name="Delay" effect={delay} setEffect={setDelay} />
            <EffectToggle
              name="Tremolo"
              effect={tremolo}
              setEffect={setTremolo}
            />
            <EffectToggle
              name="Vibrato"
              effect={vibrato}
              setEffect={setVibrato}
            />
            <EffectToggle
              name="Distortion"
              effect={distortion}
              setEffect={setDistortion}
            />
            <EffectToggle
              name="Pitch Shift"
              effect={pitchShift}
              setEffect={setPitchShift}
            />
          </div>
        </div>
        <PianoRoll
          octave={octave}
          playNoteCallback={playNoteCallback}
          stopNoteCallback={stopNoteCallback}
        />
      </div>
    </div>
  );
}

export default App;
