import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { AudioLines, Volume2, VolumeX } from "lucide-react";
import * as THREE from "three";

interface StringAudio {
  context: AudioContext;
  play: (frequency: number, intensity: number, pan: number) => void;
  dispose: () => void;
}

interface SoundPreset {
  decay: number;
  filterBase: number;
  filterSweep: number;
  master: number;
  primary: OscillatorType;
  secondary: OscillatorType;
  scale: number[];
}

interface SonicString {
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  material: THREE.MeshBasicMaterial;
  points: THREE.Vector2[];
  frequency: number;
  width: number;
  baseOpacity: number;
  armed: boolean;
  pulse: number;
  proximity: number;
  lastHitAt: number;
  phase: number;
}

interface InstrumentState {
  pointer: THREE.Vector2;
  target: THREE.Vector2;
  soundEnabled: boolean;
  visible: boolean;
}

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

type HeroWindow = Window &
  typeof globalThis & {
    __heroLineHits?: number;
  };

const STRING_COUNT = 12;
const STRING_POINTS = 72;
const HIT_DISTANCE = 0.062;
const REARM_DISTANCE = 0.15;
const STRING_SPAN_X = 4.4;
const STRING_SEQUENCE = [
  246.94, // B
  293.66, // D
  329.63, // E
  440, // A
  440, // A
  392, // G
  369.99, // F#
  293.66, // D
  293.66, // D
  440, // A
  277.18, // C#
  293.66, // D
];
const SOUND_PRESETS: SoundPreset[] = [
  {
    decay: 0.72,
    filterBase: 2100,
    filterSweep: 1200,
    master: 0.18,
    primary: "sine",
    secondary: "triangle",
    scale: STRING_SEQUENCE,
  },
  {
    decay: 0.48,
    filterBase: 2800,
    filterSweep: 1700,
    master: 0.14,
    primary: "triangle",
    secondary: "sine",
    scale: STRING_SEQUENCE,
  },
  {
    decay: 0.9,
    filterBase: 1700,
    filterSweep: 900,
    master: 0.2,
    primary: "sine",
    secondary: "sawtooth",
    scale: STRING_SEQUENCE,
  },
  {
    decay: 0.62,
    filterBase: 2400,
    filterSweep: 1450,
    master: 0.16,
    primary: "square",
    secondary: "sine",
    scale: STRING_SEQUENCE,
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

function distanceToSegment(point: THREE.Vector2, start: THREE.Vector2, end: THREE.Vector2) {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;

  if (lengthSquared === 0) {
    return point.distanceTo(start);
  }

  const t = clamp(
    ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) / lengthSquared,
    0,
    1,
  );

  return Math.hypot(point.x - (start.x + t * segmentX), point.y - (start.y + t * segmentY));
}

function distanceToPolyline(point: THREE.Vector2, points: THREE.Vector2[]) {
  let closest = Number.POSITIVE_INFINITY;

  for (let index = 0; index < points.length - 1; index += 1) {
    closest = Math.min(closest, distanceToSegment(point, points[index], points[index + 1]));
  }

  return closest;
}

function createRibbonGeometry(points: THREE.Vector2[], width: number) {
  const positions = new Float32Array(points.length * 2 * 3);
  const indices: number[] = [];

  for (let index = 0; index < points.length - 1; index += 1) {
    const leftA = index * 2;
    const rightA = leftA + 1;
    const leftB = leftA + 2;
    const rightB = leftA + 3;

    indices.push(leftA, rightA, leftB, rightA, rightB, leftB);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  updateRibbonGeometry(geometry, points, width, 0, 0, 0, 0);
  return geometry;
}

function updateRibbonGeometry(
  geometry: THREE.BufferGeometry,
  points: THREE.Vector2[],
  width: number,
  pulse: number,
  proximity: number,
  time: number,
  phase: number,
) {
  const position = geometry.getAttribute("position") as THREE.BufferAttribute;
  const values = position.array as Float32Array;
  const amplitude = pulse * 0.052 + proximity * 0.026;

  for (let index = 0; index < points.length; index += 1) {
    const previous = points[Math.max(0, index - 1)];
    const current = points[index];
    const next = points[Math.min(points.length - 1, index + 1)];
    const tangentX = next.x - previous.x;
    const tangentY = next.y - previous.y;
    const length = Math.hypot(tangentX, tangentY) || 1;
    const normalX = -tangentY / length;
    const normalY = tangentX / length;
    const travel = index / (points.length - 1);
    const wave = Math.sin(travel * Math.PI * 5.4 + time * 0.006 + phase) * amplitude;
    const stringWidth = width * (1 + pulse * 1.8 + proximity * 0.8);
    const x = current.x + normalX * wave;
    const y = current.y + normalY * wave;
    const leftOffset = index * 6;
    const rightOffset = leftOffset + 3;

    values[leftOffset] = x + normalX * stringWidth;
    values[leftOffset + 1] = y + normalY * stringWidth;
    values[leftOffset + 2] = 0;
    values[rightOffset] = x - normalX * stringWidth;
    values[rightOffset + 1] = y - normalY * stringWidth;
    values[rightOffset + 2] = 0;
  }

  position.needsUpdate = true;
  geometry.computeBoundingSphere();
}

function pickSoundPreset() {
  return SOUND_PRESETS[Math.floor(Math.random() * SOUND_PRESETS.length)];
}

function createStringAudio(preset: SoundPreset): StringAudio | null {
  const AudioContextConstructor =
    window.AudioContext ?? (window as AudioWindow).webkitAudioContext;

  if (!AudioContextConstructor) {
    return null;
  }

  const context = new AudioContextConstructor();
  const master = context.createGain();
  master.gain.value = preset.master;
  master.connect(context.destination);

  const play = (frequency: number, intensity: number, pan: number) => {
    if (context.state === "suspended") {
      void context.resume();
    }

    const now = context.currentTime;
    const amount = clamp(intensity, 0.16, 1);
    const output = context.createGain();
    const tone = context.createOscillator();
    const overtone = context.createOscillator();
    const filter = context.createBiquadFilter();

    output.gain.setValueAtTime(0.0001, now);
    output.gain.exponentialRampToValueAtTime(0.24 * amount, now + 0.012);
    output.gain.exponentialRampToValueAtTime(0.0001, now + preset.decay);

    if ("createStereoPanner" in context) {
      const panner = context.createStereoPanner();
      panner.pan.value = clamp(pan, -0.8, 0.8);
      output.connect(panner);
      panner.connect(master);
    } else {
      output.connect(master);
    }

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(preset.filterBase + amount * preset.filterSweep, now);
    filter.Q.value = 0.62;

    tone.type = preset.primary;
    tone.frequency.setValueAtTime(frequency * (1 + amount * 0.012), now);
    tone.frequency.exponentialRampToValueAtTime(frequency * 0.985, now + 0.32);

    overtone.type = preset.secondary;
    overtone.frequency.setValueAtTime(frequency * 2.006, now);

    tone.connect(filter);
    overtone.connect(filter);
    filter.connect(output);
    tone.start(now);
    overtone.start(now);
    tone.stop(now + preset.decay + 0.04);
    overtone.stop(now + Math.min(0.42, preset.decay * 0.62));
  };

  return {
    context,
    play,
    dispose: () => {
      void context.close();
    },
  };
}

function createStringPoints(index: number) {
  const points: THREE.Vector2[] = [];
  const lane = index / (STRING_COUNT - 1);
  const baseY = mix(0.66, -0.66, lane);
  const slope = Math.sin(index * 1.17) * 0.34;
  const bow = (index % 2 === 0 ? 1 : -1) * mix(0.05, 0.2, Math.abs(lane - 0.5) * 2);

  for (let pointIndex = 0; pointIndex < STRING_POINTS; pointIndex += 1) {
    const t = pointIndex / (STRING_POINTS - 1);
    const x = mix(-STRING_SPAN_X, STRING_SPAN_X, t);
    const y =
      baseY +
      (t - 0.5) * slope +
      Math.sin(t * Math.PI) * bow +
      Math.sin((t * Math.PI * 2) + index * 0.9) * 0.018;

    points.push(new THREE.Vector2(x, y));
  }

  return points;
}

function createSonicStrings(scale: number[]) {
  const group = new THREE.Group();
  const strings: SonicString[] = [];
  for (let index = 0; index < STRING_COUNT; index += 1) {
    const points = createStringPoints(index);
    const width = index === 4 || index === 6 ? 0.0072 : 0.0056;
    const geometry = createRibbonGeometry(points, width);
    const material = new THREE.MeshBasicMaterial({
      color: 0xf4f4ef,
      transparent: true,
      opacity: 0.145 + (index % 3) * 0.018,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -index * 0.002;
    group.add(mesh);
    strings.push({
      mesh,
      material,
      points,
      frequency: scale[index],
      width,
      baseOpacity: material.opacity,
      armed: true,
      pulse: 0,
      proximity: 0,
      lastHitAt: 0,
      phase: index * 0.72,
    });
  }

  return { group, strings };
}

export function HeroFidget() {
  const presetRef = useRef<SoundPreset>(pickSoundPreset());
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<StringAudio | null>(null);
  const stringsRef = useRef<SonicString[]>([]);
  const stateRef = useRef<InstrumentState>({
    pointer: new THREE.Vector2(0.72, 0),
    target: new THREE.Vector2(0.72, 0),
    soundEnabled: false,
    visible: true,
  });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [webglReady, setWebglReady] = useState(true);

  const playString = useCallback((frequency: number, intensity: number, pan: number) => {
    if (!stateRef.current.soundEnabled) {
      return;
    }

    audioRef.current?.play(frequency, intensity, pan);
  }, []);

  const toggleSound = useCallback(async () => {
    if (soundEnabled) {
      stateRef.current.soundEnabled = false;
      setSoundEnabled(false);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = createStringAudio(presetRef.current);
    }

    if (!audioRef.current) {
      return;
    }

    await audioRef.current.context.resume();
    stateRef.current.soundEnabled = true;
    setSoundEnabled(true);
  }, [soundEnabled]);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglReady(false);
      return undefined;
    }

    setWebglReady(true);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    const { group: stringGroup, strings } = createSonicStrings(presetRef.current.scale);
    root.add(stringGroup);
    scene.add(root);
    stringsRef.current = strings;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(width));
      const nextHeight = Math.max(1, Math.floor(height));
      renderer.setSize(nextWidth, nextHeight, false);

      const aspect = nextWidth / nextHeight;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(mount);

    let frameId = 0;
    let then = performance.now();

    const animate = (now: number) => {
      const state = stateRef.current;
      const delta = Math.min(0.034, (now - then) / 1000);
      then = now;

      state.pointer.lerp(state.target, reducedMotion ? 0.08 : 0.16);

      if (state.visible) {
        stringGroup.position.set(0, 0, 0);

        strings.forEach((item) => {
          const proximityDistance = distanceToPolyline(state.pointer, item.points);
          item.proximity = mix(item.proximity, clamp(1 - proximityDistance / 0.2, 0, 1), 0.12);
          item.pulse = Math.max(0, item.pulse - delta * 2.2);
          item.material.opacity = clamp(item.baseOpacity + item.proximity * 0.16 + item.pulse * 0.48, 0.1, 0.72);
          updateRibbonGeometry(item.mesh.geometry, item.points, item.width, item.pulse, item.proximity, now, item.phase);
        });

        renderer.render(scene, camera);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      strings.forEach((item) => {
        item.mesh.geometry.dispose();
        item.material.dispose();
      });
      stringsRef.current = [];
    };
  }, []);

  useEffect(() => {
    stateRef.current.soundEnabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(
    () => () => {
      audioRef.current?.dispose();
    },
    [],
  );

  const updatePointer = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const bounds = root.getBoundingClientRect();
      const aspect = bounds.width / bounds.height;
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2 * aspect;
      const y = -(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
      const state = stateRef.current;
      const speed = Math.hypot(x - state.target.x, y - state.target.y);
      const now = event.timeStamp;

      state.target.set(x, y);

      stringsRef.current.forEach((item) => {
        const distance = distanceToPolyline(state.target, item.points);

        if (distance > REARM_DISTANCE) {
          item.armed = true;
        }

        if (!item.armed || distance > HIT_DISTANCE || now - item.lastHitAt < 125) {
          return;
        }

        item.lastHitAt = now;
        item.armed = false;
        item.pulse = 1;
        (window as HeroWindow).__heroLineHits = ((window as HeroWindow).__heroLineHits ?? 0) + 1;
        playString(item.frequency, clamp(0.26 + speed * 3.2, 0.22, 1), x / aspect);
      });
    },
    [playString],
  );

  const handlePointerLeave = useCallback(() => {
    stateRef.current.target.set(0.72, 0);
  }, []);

  return (
    <div ref={rootRef} className="hero-fidget" aria-label="Interactive sound geometry">
      <div ref={mountRef} className="hero-fidget__canvas" aria-hidden="true" />
      {!webglReady ? (
        <div className="hero-fidget__fallback" aria-hidden="true">
          {Array.from({ length: STRING_COUNT }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      ) : null}
      <div
        className="hero-fidget__interaction"
        aria-label="Pointer sound field"
        onPointerLeave={handlePointerLeave}
        onPointerMove={updatePointer}
      />
      <button
        type="button"
        className="hero-fidget__sound control-tap-target"
        aria-label={soundEnabled ? "Sound on" : "Enable sound"}
        aria-pressed={soundEnabled}
        onClick={(event) => {
          event.stopPropagation();
          void toggleSound();
        }}
      >
        {soundEnabled ? (
          <Volume2 aria-hidden="true" className="h-4 w-4" />
        ) : (
          <VolumeX aria-hidden="true" className="h-4 w-4" />
        )}
        <AudioLines aria-hidden="true" className="h-4 w-4" />
        <span>{soundEnabled ? "Sound on" : "Sound"}</span>
      </button>
    </div>
  );
}
