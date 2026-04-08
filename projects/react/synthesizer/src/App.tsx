import * as Tone from 'tone';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Note } from 'tone/build/esm/core/type/NoteUnits';
import PianoRoll from './components/PianoRoll';
import './App.scss';
import OctaveControls from './components/OctaveControls';
import EffectToggle from './components/EffectToggle';
import Select from './components/Select/Index';

type InstrumentId =
  | 'synth'
  | 'pluck'
  | 'fmsynth'
  | 'membrane'
  | 'metal'
  | 'amsynth'
  | 'duosynth'
  | 'monosynth';

type EffectId =
  | 'reverb'
  | 'chorus'
  | 'vibrato'
  | 'phaser'
  | 'delay'
  | 'tremolo'
  | 'distortion'
  | 'pitchShift';

type EffectState = Record<EffectId, boolean>;

type InstrumentInstance =
  | Tone.Synth
  | Tone.PluckSynth
  | Tone.FMSynth
  | Tone.MembraneSynth
  | Tone.MetalSynth
  | Tone.AMSynth
  | Tone.DuoSynth
  | Tone.MonoSynth;

type WettableEffect = {
  wet: {
    value: number;
  };
  dispose: () => void;
};

type StartableEffect = WettableEffect & {
  start?: () => void;
};

const MIN_OCTAVE = 0;
const MAX_OCTAVE = 5;

const instrumentOptions = [
  { value: 'synth', label: 'Synth' },
  { value: 'pluck', label: 'Pluck Synth' },
  { value: 'fmsynth', label: 'FM Synth' },
  { value: 'membrane', label: 'Membrane Synth' },
  { value: 'metal', label: 'Metal Synth' },
  { value: 'amsynth', label: 'AM Synth' },
  { value: 'duosynth', label: 'Duo Synth' },
  { value: 'monosynth', label: 'Mono Synth' },
] as const satisfies { value: InstrumentId; label: string }[];

const effectLabels: { id: EffectId; label: string }[] = [
  { id: 'reverb', label: 'Reverb' },
  { id: 'chorus', label: 'Chorus' },
  { id: 'phaser', label: 'Phaser' },
  { id: 'delay', label: 'Delay' },
  { id: 'tremolo', label: 'Tremolo' },
  { id: 'vibrato', label: 'Vibrato' },
  { id: 'distortion', label: 'Distortion' },
  { id: 'pitchShift', label: 'Pitch Shift' },
];

const defaultEffects: EffectState = {
  reverb: false,
  chorus: false,
  vibrato: false,
  phaser: false,
  delay: false,
  tremolo: false,
  distortion: false,
  pitchShift: false,
};

function createInstrument(id: InstrumentId): InstrumentInstance {
  switch (id) {
    case 'pluck':
      return new Tone.PluckSynth();
    case 'fmsynth':
      return new Tone.FMSynth();
    case 'membrane':
      return new Tone.MembraneSynth();
    case 'metal':
      return new Tone.MetalSynth();
    case 'amsynth':
      return new Tone.AMSynth();
    case 'duosynth':
      return new Tone.DuoSynth();
    case 'monosynth':
      return new Tone.MonoSynth();
    case 'synth':
    default:
      return new Tone.Synth();
  }
}

function App() {
  const [octave, setOctave] = useState(2);
  const [instrument, setInstrument] = useState<InstrumentId>('synth');
  const [effects, setEffects] = useState<EffectState>(defaultEffects);
  const [audioReady, setAudioReady] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    'Click, tap, or use the keyboard to start the audio engine.'
  );

  const instrumentRef = useRef<InstrumentInstance | null>(null);
  const activeNoteRef = useRef<string | null>(null);
  const modulationStartedRef = useRef(false);
  const audioInitializedRef = useRef(false);

  const reverbRef = useRef<Tone.Reverb | null>(null);
  const chorusRef = useRef<Tone.Chorus | null>(null);
  const tremoloRef = useRef<Tone.Tremolo | null>(null);
  const vibratoRef = useRef<Tone.Vibrato | null>(null);
  const phaserRef = useRef<Tone.Phaser | null>(null);
  const delayRef = useRef<Tone.PingPongDelay | null>(null);
  const distortionRef = useRef<Tone.Distortion | null>(null);
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null);
  const outputGainRef = useRef<Tone.Gain | null>(null);
  const limiterRef = useRef<Tone.Limiter | null>(null);

  const effectRefs = useMemo(
    () => ({
      reverb: reverbRef,
      chorus: chorusRef,
      vibrato: vibratoRef,
      phaser: phaserRef,
      delay: delayRef,
      tremolo: tremoloRef,
      distortion: distortionRef,
      pitchShift: pitchShiftRef,
    }),
    []
  );

  const syncEffects = useCallback(() => {
    (Object.entries(effectRefs) as [EffectId, React.MutableRefObject<StartableEffect | null>][])
      .forEach(([effectId, effectRef]) => {
        if (effectRef.current) {
          effectRef.current.wet.value = effects[effectId] ? 1 : 0;
        }
      });
  }, [effectRefs, effects]);

  const rebuildInstrument = useCallback(
    (nextInstrumentId: InstrumentId) => {
      if (
        !audioInitializedRef.current ||
        !reverbRef.current ||
        !chorusRef.current ||
        !vibratoRef.current ||
        !phaserRef.current ||
        !delayRef.current ||
        !tremoloRef.current ||
        !distortionRef.current ||
        !pitchShiftRef.current ||
        !outputGainRef.current ||
        !limiterRef.current
      ) {
        return;
      }

      instrumentRef.current?.dispose();

      const nextInstrument = createInstrument(nextInstrumentId);
      instrumentRef.current = nextInstrument;
      nextInstrument.chain(
        reverbRef.current,
        chorusRef.current,
        vibratoRef.current,
        phaserRef.current,
        delayRef.current,
        tremoloRef.current,
        distortionRef.current,
        pitchShiftRef.current,
        outputGainRef.current,
        limiterRef.current,
        Tone.Destination
      );
    },
    []
  );

  const initializeAudio = useCallback(() => {
    if (audioInitializedRef.current) {
      return;
    }

    reverbRef.current = new Tone.Reverb({ decay: 2.8, preDelay: 0.08 });
    chorusRef.current = new Tone.Chorus({ frequency: 2.2, delayTime: 3.5, depth: 0.55 });
    tremoloRef.current = new Tone.Tremolo({ frequency: 7, depth: 0.45 });
    vibratoRef.current = new Tone.Vibrato({ frequency: 5, depth: 0.14 });
    phaserRef.current = new Tone.Phaser({ frequency: 0.7, octaves: 3, baseFrequency: 320 });
    delayRef.current = new Tone.PingPongDelay({ delayTime: '8n', feedback: 0.25 });
    distortionRef.current = new Tone.Distortion({ distortion: 0.2, wet: 0 });
    pitchShiftRef.current = new Tone.PitchShift({ pitch: 7, wet: 0 });
    outputGainRef.current = new Tone.Gain(0.72);
    limiterRef.current = new Tone.Limiter(-1);

    audioInitializedRef.current = true;
    syncEffects();
    rebuildInstrument(instrument);
  }, [instrument, rebuildInstrument, syncEffects]);

  const ensureAudioReady = useCallback(async () => {
    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    initializeAudio();

    if (!modulationStartedRef.current) {
      chorusRef.current?.start?.();
      tremoloRef.current?.start?.();
      modulationStartedRef.current = true;
    }

    if (!audioReady) {
      setAudioReady(true);
      setStatusMessage('Audio ready. Hold notes, stack effects, and change instruments live.');
    }
  }, [audioReady, initializeAudio]);

  useEffect(() => {
    if (audioInitializedRef.current) {
      rebuildInstrument(instrument);
    }
  }, [instrument, rebuildInstrument]);

  useEffect(() => {
    if (audioInitializedRef.current) {
      syncEffects();
    }
  }, [syncEffects]);

  useEffect(() => {
    return () => {
      instrumentRef.current?.dispose();
      Object.values(effectRefs).forEach((effectRef) => effectRef.current?.dispose());
      outputGainRef.current?.dispose();
      limiterRef.current?.dispose();
    };
  }, [effectRefs]);

  const stopCurrentNote = useCallback(() => {
    if (!activeNoteRef.current) {
      return;
    }

    instrumentRef.current?.triggerRelease?.();
    activeNoteRef.current = null;
    setActiveNote(null);
  }, []);

  const playNote = useCallback(
    async (note: Note) => {
      await ensureAudioReady();

      if (activeNoteRef.current === note) {
        return;
      }

      if (activeNoteRef.current) {
        instrumentRef.current?.triggerRelease?.();
      }

      instrumentRef.current?.triggerAttack(note, Tone.now());
      activeNoteRef.current = note;
      setActiveNote(note);
      setStatusMessage(`Playing ${note}`);
    },
    [ensureAudioReady]
  );

  const octaveChangeCallback = useCallback((offset: number) => {
    setOctave((previous) =>
      Math.min(MAX_OCTAVE, Math.max(MIN_OCTAVE, previous + offset))
    );
  }, []);

  const toggleEffect = useCallback((effectId: EffectId) => {
    setEffects((previous) => ({
      ...previous,
      [effectId]: !previous[effectId],
    }));
  }, []);

  useEffect(() => {
    const keyMap: Record<string, string> = {
      a: `C${octave}`,
      w: `C#${octave}`,
      s: `D${octave}`,
      e: `D#${octave}`,
      d: `E${octave}`,
      f: `F${octave}`,
      t: `F#${octave}`,
      g: `G${octave}`,
      y: `G#${octave}`,
      h: `A${octave}`,
      u: `A#${octave}`,
      j: `B${octave}`,
      k: `C${octave + 1}`,
      o: `C#${octave + 1}`,
      l: `D${octave + 1}`,
      p: `D#${octave + 1}`,
      ';': `E${octave + 1}`,
      "'": `F${octave + 1}`,
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        octaveChangeCallback(1);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        octaveChangeCallback(-1);
        return;
      }

      const mappedNote = keyMap[event.key.toLowerCase()];
      if (!mappedNote) {
        return;
      }

      event.preventDefault();
      void playNote(mappedNote as Note);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (keyMap[event.key.toLowerCase()]) {
        stopCurrentNote();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', stopCurrentNote);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', stopCurrentNote);
    };
  }, [octave, octaveChangeCallback, playNote, stopCurrentNote]);

  return (
    <main className="app-shell">
      <section className="synth-panel" aria-label="Browser synthesizer">
        <header className="hero">
          <div>
            <p className="eyebrow">Browser instrument</p>
            <h1>Synthesizer</h1>
            <p className="hero-copy">
              A compact playable synth with live effects, touch-friendly keys,
              and a cleaner studio-style control surface.
            </p>
          </div>
          <div className="status-card" aria-live="polite">
            <span className={`status-dot${audioReady ? ' is-live' : ''}`} aria-hidden="true" />
            <div>
              <p className="status-label">Engine</p>
              <p className="status-value">{audioReady ? 'Ready' : 'Standby'}</p>
            </div>
            <p className="status-copy">{statusMessage}</p>
          </div>
        </header>

        <section className="control-grid">
          <div className="control-card control-card--primary">
            <div className="control-heading">
              <p className="section-label">Instrument</p>
              <span className="section-meta">Live switch</span>
            </div>
            <Select
              label="Choose instrument"
              value={instrument}
              onChange={(event) => {
                setInstrument(event.target.value as InstrumentId);
                setStatusMessage(`Instrument changed to ${event.target.selectedOptions[0]?.label ?? 'custom'}.`);
              }}
              options={instrumentOptions}
            />
            <OctaveControls
              octaveChangeCallback={octaveChangeCallback}
              octave={octave}
              minOctave={MIN_OCTAVE}
              maxOctave={MAX_OCTAVE}
            />
          </div>

          <fieldset className="control-card">
            <legend className="section-label">Effects</legend>
            <p className="effects-copy">Keep it sparse or stack a dense chain. Every toggle updates the same audio graph.</p>
            <div className="toggles">
              {effectLabels.map(({ id, label }) => (
                <EffectToggle
                  key={id}
                  name={label}
                  effect={effects[id]}
                  setEffect={() => toggleEffect(id)}
                />
              ))}
            </div>
          </fieldset>
        </section>

        <section className="keyboard-section">
          <div className="keyboard-header">
            <div>
              <p className="section-label">Keyboard</p>
              <p className="keyboard-copy">
                Play with mouse, touch, or computer keys. `A` through `;` covers the visible range, and arrows shift octaves.
              </p>
            </div>
            <div className="keyboard-meta">
              <span>Current octave</span>
              <strong>{octave}</strong>
            </div>
          </div>

          <PianoRoll
            octave={octave}
            activeNote={activeNote}
            playNoteCallback={playNote}
            stopNoteCallback={stopCurrentNote}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
