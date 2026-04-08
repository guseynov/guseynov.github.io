import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Wind } from "lucide-react";
import "./bubble.scss";

type Step = {
  label: string;
  duration: number;
  scale: number;
};

type Preset = {
  id: string;
  name: string;
  description: string;
  steps: Step[];
};

const PRESETS: Preset[] = [
  {
    id: "balanced",
    name: "Balanced",
    description: "A steady, even rhythm for a calm reset.",
    steps: [
      { label: "breathe in", duration: 4000, scale: 1.08 },
      { label: "hold", duration: 2000, scale: 1.08 },
      { label: "breathe out", duration: 4000, scale: 0.86 },
    ],
  },
  {
    id: "box",
    name: "Box",
    description: "Equal phases for focus and regulation.",
    steps: [
      { label: "breathe in", duration: 4000, scale: 1.08 },
      { label: "hold", duration: 4000, scale: 1.08 },
      { label: "breathe out", duration: 4000, scale: 0.86 },
      { label: "hold low", duration: 4000, scale: 0.86 },
    ],
  },
  {
    id: "unwind",
    name: "Unwind",
    description: "Longer exhales to bring the tempo down.",
    steps: [
      { label: "breathe in", duration: 4000, scale: 1.08 },
      { label: "hold", duration: 2000, scale: 1.08 },
      { label: "breathe out", duration: 6000, scale: 0.86 },
    ],
  },
];

function getTotalCycleDuration(steps: Step[]) {
  return steps.reduce((total, step) => total + step.duration, 0);
}

function getBoundaryProgresses(steps: Step[]) {
  const totalDuration = getTotalCycleDuration(steps);

  if (totalDuration === 0) {
    return [0];
  }

  const progresses = [0];
  let elapsedCursor = 0;

  for (let index = 0; index < steps.length - 1; index += 1) {
    elapsedCursor += steps[index].duration;
    progresses.push(elapsedCursor / totalDuration);
  }

  return progresses;
}

function getCycleState(steps: Step[], elapsed: number) {
  let elapsedCursor = 0;
  let previousScale = steps[steps.length - 1]?.scale ?? 1;

  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];
    const stepEnd = elapsedCursor + step.duration;

    if (elapsed < stepEnd || index === steps.length - 1) {
      const stepElapsed = elapsed - elapsedCursor;
      const progress = step.duration === 0 ? 1 : Math.min(Math.max(stepElapsed / step.duration, 0), 1);
      const interpolatedScale = previousScale + (step.scale - previousScale) * progress;

      return {
        stepIndex: index,
        step,
        nextStep: steps[(index + 1) % steps.length],
        stepElapsed,
        progress,
        scale: interpolatedScale,
      };
    }

    elapsedCursor = stepEnd;
    previousScale = step.scale;
  }

  return {
    stepIndex: 0,
    step: steps[0],
    nextStep: steps[1] ?? steps[0],
    stepElapsed: 0,
    progress: 0,
    scale: steps[0]?.scale ?? 1,
  };
}

export function Bubble() {
  const [activePresetId, setActivePresetId] = useState(PRESETS[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedInCycle, setElapsedInCycle] = useState(0);

  const frameRef = useRef<number | null>(null);
  const cycleStartRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef(0);

  const activePreset = PRESETS.find((preset) => preset.id === activePresetId) ?? PRESETS[0];
  const steps = activePreset.steps;
  const totalCycleDuration = getTotalCycleDuration(steps);
  const boundaryProgresses = getBoundaryProgresses(steps);
  const cycleState = getCycleState(steps, elapsedInCycle);
  const step = cycleState.step;
  const rotationAngle = totalCycleDuration === 0 ? 0 : (elapsedInCycle / totalCycleDuration) * 360;

  useEffect(() => {
    pausedElapsedRef.current = elapsedInCycle;
  }, [elapsedInCycle]);

  useEffect(() => {
    pausedElapsedRef.current = 0;
    cycleStartRef.current = null;
    setElapsedInCycle(0);
  }, [activePresetId]);

  useEffect(() => {
    if (totalCycleDuration === 0) {
      return undefined;
    }

    if (isPaused) {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      pausedElapsedRef.current = elapsedInCycle;
      cycleStartRef.current = null;
      return undefined;
    }

    const tick = (timestamp: number) => {
      if (cycleStartRef.current === null) {
        cycleStartRef.current = timestamp - pausedElapsedRef.current;
      }

      const nextElapsed = (timestamp - cycleStartRef.current) % totalCycleDuration;
      setElapsedInCycle(nextElapsed);
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isPaused, totalCycleDuration]);

  return (
    <section className="bubble-shell" aria-label="Breathing Bubble">
      <div className="bubble-shell__layout">
        <div className="bubble-shell__panel bubble-shell__panel--copy">
          <header className="bubble-shell__intro">
            <p className="bubble-shell__eyebrow">Focused Reset</p>
            <h1 className="bubble-shell__title">Breathing Bubble</h1>
            <p className="bubble-shell__lede bubble-shell__lede--desktop">
              A minimal breathing loop tuned for a short reset. Follow the bubble and let the pace
              stay steady.
            </p>
          </header>

          <p className="bubble-shell__technique">
            <span className="bubble-shell__technique-label">
              <Wind className="bubble-shell__technique-icon" aria-hidden="true" />
              Technique
            </span>
            <span className="bubble-shell__technique-name">{activePreset.name}</span>
            <span className="bubble-shell__technique-description">{activePreset.description}</span>
          </p>
        </div>

        <div className="bubble-shell__panel bubble-shell__panel--experience">
          <div className="bubble-shell__stage">
            <div
              className={`bubble ${isPaused ? "bubble--paused" : ""}`}
              style={
                {
                  "--bubble-scale": cycleState.scale,
                  "--bubble-rotation-angle": `${rotationAngle}deg`,
                } as React.CSSProperties
              }
              role="img"
              aria-label={`Breathing prompt: ${step.label}`}
            >
              <div className="bubble__outer">
                <span className="bubble__box" aria-hidden="true">
                  <span className="bubble__point bubble__point--current"></span>
                </span>
                {boundaryProgresses.map((progress, index) => (
                  <span
                    key={`${activePreset.id}-${progress}`}
                    className="bubble__marker"
                    style={{ "--marker-angle": `${progress * 360}deg` } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    <span
                      className={`bubble__point ${
                        index === 0 ? "bubble__point--marker-start" : "bubble__point--marker"
                      }`}
                    ></span>
                  </span>
                ))}
                <div className="bubble__inner">
                  <div className="bubble__copy">
                    <p className="bubble__eyebrow">Now</p>
                    <p className="bubble__text" aria-live="polite">
                      {step.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bubble-shell__controls">
            <div className="bubble-shell__presets" role="tablist" aria-label="Breathing patterns">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  role="tab"
                  aria-selected={preset.id === activePreset.id}
                  className={`bubble-shell__preset ${
                    preset.id === activePreset.id ? "bubble-shell__preset--active" : ""
                  }`}
                  onClick={() => setActivePresetId(preset.id)}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="bubble-shell__toggle"
              onClick={() => setIsPaused((currentState) => !currentState)}
              aria-pressed={isPaused}
            >
              {isPaused ? (
                <Play className="bubble-shell__toggle-icon" aria-hidden="true" />
              ) : (
                <Pause className="bubble-shell__toggle-icon" aria-hidden="true" />
              )}
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
