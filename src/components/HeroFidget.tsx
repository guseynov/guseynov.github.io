import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import * as THREE from "three";

interface FidgetAudio {
  context: AudioContext;
  play: (kind: "tick" | "snap", intensity: number, pan: number) => void;
  dispose: () => void;
}

interface FidgetState {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  velocity: number;
  pointerActive: boolean;
  soundEnabled: boolean;
  lastSoundAt: number;
  visible: boolean;
}

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function createFidgetAudio(): FidgetAudio | null {
  const AudioContextConstructor =
    window.AudioContext ?? (window as AudioWindow).webkitAudioContext;

  if (!AudioContextConstructor) {
    return null;
  }

  const context = new AudioContextConstructor();
  const master = context.createGain();
  master.gain.value = 0.24;
  master.connect(context.destination);

  const noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.18), context.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);

  for (let index = 0; index < noiseData.length; index += 1) {
    noiseData[index] = (Math.random() * 2 - 1) * (1 - index / noiseData.length);
  }

  const connectOutput = (gain: GainNode, pan: number) => {
    if ("createStereoPanner" in context) {
      const panner = context.createStereoPanner();
      panner.pan.value = clamp(pan, -0.72, 0.72);
      gain.connect(panner);
      panner.connect(master);
      return;
    }

    gain.connect(master);
  };

  const play = (kind: "tick" | "snap", intensity: number, pan: number) => {
    if (context.state === "suspended") {
      void context.resume();
    }

    const now = context.currentTime;
    const amount = clamp(intensity, 0.12, 1);
    const output = context.createGain();
    output.gain.setValueAtTime(0.0001, now);
    connectOutput(output, pan);

    const click = context.createBufferSource();
    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = kind === "snap" ? 1900 + amount * 1100 : 2600 + amount * 1600;
    filter.Q.value = kind === "snap" ? 3.4 : 5.2;
    click.buffer = noiseBuffer;
    click.connect(filter);
    filter.connect(output);

    if (kind === "snap") {
      const low = context.createOscillator();
      const lowGain = context.createGain();
      low.type = "triangle";
      low.frequency.setValueAtTime(128 + amount * 80, now);
      low.frequency.exponentialRampToValueAtTime(72 + amount * 24, now + 0.12);
      lowGain.gain.setValueAtTime(0.0001, now);
      lowGain.gain.exponentialRampToValueAtTime(0.22 * amount, now + 0.01);
      lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      low.connect(lowGain);
      lowGain.connect(output);
      low.start(now);
      low.stop(now + 0.2);

      output.gain.exponentialRampToValueAtTime(0.34 * amount, now + 0.006);
      output.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      click.start(now);
      click.stop(now + 0.12);
      return;
    }

    const ping = context.createOscillator();
    ping.type = "square";
    ping.frequency.setValueAtTime(620 + amount * 720, now);
    ping.frequency.exponentialRampToValueAtTime(440 + amount * 280, now + 0.045);
    ping.connect(output);

    output.gain.exponentialRampToValueAtTime(0.11 * amount, now + 0.004);
    output.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    ping.start(now);
    ping.stop(now + 0.07);
    click.start(now);
    click.stop(now + 0.045);
  };

  return {
    context,
    play,
    dispose: () => {
      void context.close();
    },
  };
}

function makePin(angle: number, radius: number, length: number) {
  const group = new THREE.Group();
  const pinMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd9d9d4,
    metalness: 0.82,
    roughness: 0.26,
    clearcoat: 0.42,
  });
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, length, 18), pinMaterial);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.07, 24, 16), pinMaterial);
  pin.rotation.z = Math.PI / 2;
  pin.position.x = radius + length * 0.5;
  cap.position.x = radius + length;
  group.add(pin, cap);
  group.rotation.z = angle;
  return group;
}

export function HeroFidget() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<FidgetAudio | null>(null);
  const stateRef = useRef<FidgetState>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    velocity: 0,
    pointerActive: false,
    soundEnabled: false,
    lastSoundAt: 0,
    visible: true,
  });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [webglReady, setWebglReady] = useState(true);

  const playFeedback = useCallback((kind: "tick" | "snap", intensity: number, pan: number) => {
    if (!stateRef.current.soundEnabled) {
      return;
    }

    audioRef.current?.play(kind, intensity, pan);
  }, []);

  const toggleSound = useCallback(async () => {
    if (soundEnabled) {
      stateRef.current.soundEnabled = false;
      setSoundEnabled(false);
      audioRef.current?.play("tick", 0.22, 0);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = createFidgetAudio();
    }

    if (!audioRef.current) {
      return;
    }

    await audioRef.current.context.resume();
    stateRef.current.soundEnabled = true;
    setSoundEnabled(true);
    audioRef.current.play("snap", 0.86, 0);
  }, [soundEnabled]);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.16, 5.2);

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
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    const rotor = new THREE.Group();
    const beadOrbit = new THREE.Group();
    scene.add(root);
    root.add(rotor, beadOrbit);

    const metal = new THREE.MeshPhysicalMaterial({
      color: 0xeeeeea,
      metalness: 0.74,
      roughness: 0.2,
      clearcoat: 0.7,
      clearcoatRoughness: 0.18,
    });
    const darkMetal = new THREE.MeshPhysicalMaterial({
      color: 0x151515,
      metalness: 0.68,
      roughness: 0.32,
      clearcoat: 0.44,
    });
    const ghost = new THREE.MeshBasicMaterial({
      color: 0xf5f5f0,
      transparent: true,
      opacity: 0.16,
      wireframe: true,
    });

    const ringGeometry = new THREE.TorusGeometry(1.02, 0.034, 18, 156);
    const thickRingGeometry = new THREE.TorusGeometry(0.58, 0.058, 22, 132);
    const haloGeometry = new THREE.TorusGeometry(1.34, 0.006, 8, 180);

    const outerRing = new THREE.Mesh(ringGeometry, metal);
    const innerRing = new THREE.Mesh(thickRingGeometry, darkMetal);
    const crossRing = new THREE.Mesh(ringGeometry, metal);
    const haloA = new THREE.Mesh(haloGeometry, ghost);
    const haloB = new THREE.Mesh(haloGeometry, ghost);

    outerRing.rotation.x = Math.PI / 2;
    crossRing.rotation.y = Math.PI / 2;
    innerRing.rotation.x = Math.PI / 2;
    haloA.rotation.x = Math.PI / 2.55;
    haloB.rotation.y = Math.PI / 2.35;
    rotor.add(outerRing, crossRing, innerRing, haloA, haloB);

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 2), metal);
    const coreWire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.355, 1), ghost);
    rotor.add(core, coreWire);

    for (let index = 0; index < 12; index += 1) {
      rotor.add(makePin((index / 12) * Math.PI * 2, 0.42, index % 2 === 0 ? 0.9 : 0.66));
    }

    const beadMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf7f7f2,
      metalness: 0.45,
      roughness: 0.16,
      transmission: 0.12,
      clearcoat: 0.84,
    });

    for (let index = 0; index < 18; index += 1) {
      const bead = new THREE.Mesh(new THREE.SphereGeometry(index % 3 === 0 ? 0.052 : 0.037, 22, 14), beadMaterial);
      const angle = (index / 18) * Math.PI * 2;
      bead.position.set(Math.cos(angle) * 1.58, Math.sin(angle) * 1.58, (index % 2 === 0 ? 1 : -1) * 0.1);
      beadOrbit.add(bead);
    }

    const grid = new THREE.GridHelper(4.4, 22, 0x777777, 0x252525);
    grid.position.y = -1.62;
    grid.rotation.x = Math.PI / 2;
    root.add(grid);

    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(3.6, 2.8, 4.2);
    const rim = new THREE.PointLight(0xffffff, 7.5, 8);
    rim.position.set(-2.6, -1.2, 2.2);
    const ambient = new THREE.AmbientLight(0xffffff, 0.42);
    scene.add(key, rim, ambient);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(width));
      const nextHeight = Math.max(1, Math.floor(height));
      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
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
      const delta = Math.min(0.033, (now - then) / 1000);
      then = now;

      state.currentX += (state.targetX - state.currentX) * 0.08;
      state.currentY += (state.targetY - state.currentY) * 0.08;
      state.velocity *= 0.93;

      if (state.visible) {
        const idleSpeed = reducedMotion ? 0.04 : 0.32;
        const push = reducedMotion ? 0.08 : 0.32;
        rotor.rotation.x = state.currentY * 0.44;
        rotor.rotation.y += delta * (idleSpeed + state.velocity * 0.012);
        rotor.rotation.z = state.currentX * -0.28;
        beadOrbit.rotation.z -= delta * (0.22 + state.velocity * 0.006);
        beadOrbit.rotation.x = state.currentY * 0.18;
        core.rotation.x += delta * (0.24 + state.velocity * 0.01);
        core.rotation.y += delta * (0.34 + push);
        root.rotation.y = state.currentX * 0.24;
        root.position.x = state.currentX * 0.22;
        root.position.y = state.currentY * -0.16;
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
      ringGeometry.dispose();
      thickRingGeometry.dispose();
      haloGeometry.dispose();
      metal.dispose();
      darkMetal.dispose();
      ghost.dispose();
      beadMaterial.dispose();
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

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      const state = stateRef.current;
      const previousX = state.targetX;
      const previousY = state.targetY;
      const speed = Math.hypot(x - previousX, y - previousY);
      state.targetX = clamp(x, -1, 1);
      state.targetY = clamp(y, -1, 1);
      state.velocity = clamp(state.velocity + speed * 22, 0, 48);

      if (state.soundEnabled && speed > 0.035 && event.timeStamp - state.lastSoundAt > 76) {
        state.lastSoundAt = event.timeStamp;
        playFeedback("tick", clamp(speed * 4.5, 0.12, 0.78), state.targetX);
      }
    },
    [playFeedback],
  );

  const handlePointerLeave = useCallback(() => {
    const state = stateRef.current;
    state.pointerActive = false;
    state.targetX = 0;
    state.targetY = 0;
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      stateRef.current.pointerActive = true;
      stateRef.current.velocity = clamp(stateRef.current.velocity + 18, 0, 64);
      playFeedback("snap", 0.88, stateRef.current.targetX);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [playFeedback],
  );

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    stateRef.current.pointerActive = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  return (
    <div
      className="hero-fidget"
      aria-label="Interactive WebGL kinetic fidget"
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div ref={mountRef} className="hero-fidget__canvas" aria-hidden="true" />
      {!webglReady ? (
        <div className="hero-fidget__fallback" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
      <div className="hero-fidget__hud" aria-hidden="true">
        <span>WEBGL FIDGET</span>
        <span>POINTER-DRIVEN</span>
      </div>
      <button
        type="button"
        className="hero-fidget__sound control-tap-target"
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
        <span>{soundEnabled ? "Sound on" : "Enable sound"}</span>
      </button>
    </div>
  );
}
