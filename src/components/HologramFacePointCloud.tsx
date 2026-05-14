import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type FacePointCloudProps = {
  url?: string;
  introProgress?: number;
  pointDensity?: number;
  pointScale?: number;
};

const STRIDE = 8;

export function HologramFacePointCloud({
  url = `${import.meta.env.BASE_URL}models/alex-face-hologram-v1/face-points-photo-v4.f32.bin`,
  introProgress = 1,
  pointDensity = 0.1,
  pointScale = 1,
}: FacePointCloudProps) {
  const [data, setData] = useState<Float32Array | null>(null);
  const contourMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const meridianMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load point cloud: ${res.status}`);
        }

        return res.arrayBuffer();
      })
      .then((buffer) => {
        if (!cancelled) {
          setData(new Float32Array(buffer));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  const geometry = useMemo(() => {
    if (!data) {
      return null;
    }

    const pointGeometry = new THREE.BufferGeometry();
    const interleaved = new THREE.InterleavedBuffer(data, STRIDE);

    pointGeometry.setAttribute("position", new THREE.InterleavedBufferAttribute(interleaved, 3, 0));
    pointGeometry.setAttribute("aIntensity", new THREE.InterleavedBufferAttribute(interleaved, 1, 3));
    pointGeometry.setAttribute("aFeature", new THREE.InterleavedBufferAttribute(interleaved, 1, 4));
    pointGeometry.setAttribute("aSize", new THREE.InterleavedBufferAttribute(interleaved, 1, 5));
    pointGeometry.setAttribute("aUv", new THREE.InterleavedBufferAttribute(interleaved, 2, 6));

    pointGeometry.computeBoundingSphere();
    return pointGeometry;
  }, [data]);

  const contourGeometry = useMemo(() => {
    if (!data) {
      return null;
    }

    const rows = new Map<number, Array<{ x: number; y: number; z: number; score: number }>>();
    const rowStep = 0.062;
    const cellStep = 0.038;

    for (let i = 0; i < data.length; i += STRIDE) {
      const x = data[i];
      const y = data[i + 1];
      const z = data[i + 2];
      const intensity = data[i + 3];
      const feature = data[i + 4];
      const score = feature * 0.72 + intensity * 0.28;

      if (score < 0.22 || y < -1.34) {
        continue;
      }

      const row = Math.round(y / rowStep);
      const bucket = rows.get(row);
      const item = { x, y, z: z + 0.035, score };

      if (bucket) {
        bucket.push(item);
      } else {
        rows.set(row, [item]);
      }
    }

    const vertices: number[] = [];

    rows.forEach((points, row) => {
      if (points.length < 12 || row % 2 !== 0) {
        return;
      }

      const cells = new Map<number, { x: number; y: number; z: number; score: number; count: number }>();

      points.forEach((point) => {
        const cell = Math.round(point.x / cellStep);
        const current = cells.get(cell);

        if (!current || point.score > current.score) {
          cells.set(cell, { ...point, count: (current?.count ?? 0) + 1 });
        } else {
          current.count += 1;
        }
      });

      const line = [...cells.values()]
        .filter((point) => point.count > 1 || point.score > 0.42)
        .sort((a, b) => a.x - b.x);

      for (let i = 1; i < line.length; i += 1) {
        const previous = line[i - 1];
        const current = line[i];
        const gap = current.x - previous.x;
        const averageScore = (previous.score + current.score) * 0.5;

        if (gap > 0.15 || averageScore < 0.25) {
          continue;
        }

        vertices.push(previous.x, previous.y, previous.z, current.x, current.y, current.z);
      }
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    lineGeometry.computeBoundingSphere();
    return lineGeometry;
  }, [data]);

  const meridianGeometry = useMemo(() => {
    if (!data) {
      return null;
    }

    const columns = new Map<number, Array<{ x: number; y: number; z: number; score: number }>>();
    const columnStep = 0.19;
    const cellStep = 0.055;

    for (let i = 0; i < data.length; i += STRIDE) {
      const x = data[i];
      const y = data[i + 1];
      const z = data[i + 2];
      const intensity = data[i + 3];
      const feature = data[i + 4];
      const score = feature * 0.8 + intensity * 0.2;

      if (score < 0.32 || y < -1.18 || Math.abs(x) > 1.12) {
        continue;
      }

      const column = Math.round(x / columnStep);
      const bucket = columns.get(column);
      const item = { x, y, z: z + 0.04, score };

      if (bucket) {
        bucket.push(item);
      } else {
        columns.set(column, [item]);
      }
    }

    const vertices: number[] = [];

    columns.forEach((points, column) => {
      if (points.length < 16 || Math.abs(column) > 5) {
        return;
      }

      const cells = new Map<number, { x: number; y: number; z: number; score: number; count: number }>();

      points.forEach((point) => {
        const cell = Math.round(point.y / cellStep);
        const current = cells.get(cell);

        if (!current || point.score > current.score) {
          cells.set(cell, { ...point, count: (current?.count ?? 0) + 1 });
        } else {
          current.count += 1;
        }
      });

      const line = [...cells.values()].sort((a, b) => a.y - b.y);

      for (let i = 1; i < line.length; i += 1) {
        const previous = line[i - 1];
        const current = line[i];
        const gap = current.y - previous.y;

        if (gap > 0.16 || (previous.score + current.score) * 0.5 < 0.38) {
          continue;
        }

        vertices.push(previous.x, previous.y, previous.z, current.x, current.y, current.z);
      }
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    lineGeometry.computeBoundingSphere();
    return lineGeometry;
  }, [data]);

  useEffect(
    () => () => {
      geometry?.dispose();
      contourGeometry?.dispose();
      meridianGeometry?.dispose();
    },
    [contourGeometry, geometry, meridianGeometry],
  );

  useFrame(({ clock, pointer }) => {
    const lineOpacity = THREE.MathUtils.clamp((introProgress - 0.08) / 0.72, 0, 1);

    if (contourMaterialRef.current) {
      contourMaterialRef.current.opacity = lineOpacity * 0.72;
    }

    if (meridianMaterialRef.current) {
      meridianMaterialRef.current.opacity = lineOpacity * 0.32;
    }

    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uIntro.value = introProgress;
    materialRef.current.uniforms.uPointDensity.value = pointDensity;
    materialRef.current.uniforms.uPointScale.value = pointScale;
    materialRef.current.uniforms.uPointer.value.set(pointer.x, pointer.y);
  });

  if (!geometry || !contourGeometry || !meridianGeometry) {
    return null;
  }

  return (
    <group rotation={[0.05, 0, 0]}>
      <lineSegments geometry={contourGeometry}>
        <lineBasicMaterial
          ref={contourMaterialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#7df7ff"
          opacity={0}
        />
      </lineSegments>
      <lineSegments geometry={meridianGeometry}>
        <lineBasicMaterial
          ref={meridianMaterialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#35d7ff"
          opacity={0}
        />
      </lineSegments>
      <points geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uIntro: { value: introProgress },
            uPointDensity: { value: pointDensity },
            uPointScale: { value: pointScale },
            uPointer: { value: new THREE.Vector2() },
            uColorA: { value: new THREE.Color("#d8fbff") },
            uColorB: { value: new THREE.Color("#27bce8") },
          }}
          vertexShader={`
          attribute float aIntensity;
          attribute float aFeature;
          attribute float aSize;
          attribute vec2 aUv;

          uniform float uTime;
          uniform float uIntro;
          uniform float uPointDensity;
          uniform float uPointScale;
          uniform vec2 uPointer;

          varying float vIntensity;
          varying float vFeature;
          varying float vCropFade;
          varying float vKeep;
          varying float vScanline;

          float hash(float n) {
            return fract(sin(n) * 43758.5453123);
          }

          void main() {
            vIntensity = aIntensity;
            vFeature = aFeature;
            vKeep = step(hash(aUv.x * 8191.0 + aUv.y * 131.0), uPointDensity + aFeature * 0.42 + aIntensity * 0.03);

            vec3 formed = position;
            vCropFade = smoothstep(-1.9, -1.45, formed.y);

            float id = aUv.x * 17383.0 + aUv.y * 9417.0;
            vec3 scattered = formed + vec3(
              (hash(id * 1.17) - 0.5) * 4.5,
              (hash(id * 2.31) - 0.5) * 3.8,
              (hash(id * 3.77) - 0.5) * 2.2
            );

            float intro = smoothstep(0.0, 1.0, uIntro);
            vec3 p = mix(scattered, formed, intro);

            p.x += sin(uTime * 1.25 + formed.y * 7.0) * 0.012;
            p.y += sin(uTime * 1.05 + formed.x * 6.0) * 0.006;
            p.z += sin(uTime * 0.8 + formed.x * 4.0 + formed.y * 3.0) * 0.008;

            float scan = sin((formed.y - uTime * 0.16) * 34.0);
            p.x += scan * 0.008 * (0.45 + vFeature);

            p.x += uPointer.x * 0.045;
            p.y += uPointer.y * 0.025;

            vScanline = scan * 0.5 + 0.5;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float perspective = 1.0 / max(0.25, -mvPosition.z);
            gl_PointSize = (1.08 + aSize * 0.88 + aFeature * 2.7) * uPointScale * perspective * 2.4;
          }
          `}
          fragmentShader={`
          uniform vec3 uColorA;
          uniform vec3 uColorB;

          varying float vIntensity;
          varying float vFeature;
          varying float vCropFade;
          varying float vKeep;
          varying float vScanline;

          void main() {
            if (vKeep < 0.5) discard;

            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;

            float dotMask = smoothstep(0.5, 0.08, d);
            float featureInk = smoothstep(0.24, 0.86, vFeature);
            vec3 color = mix(uColorB, uColorA, clamp(vIntensity * 0.64 + featureInk * 0.72, 0.0, 1.0));
            float scanBoost = smoothstep(0.9, 1.0, vScanline) * 0.1;
            float alpha = dotMask * vCropFade * (0.08 + vIntensity * 0.34 + featureInk * 0.62 + scanBoost);

            gl_FragColor = vec4(color, alpha);
          }
          `}
        />
      </points>
    </group>
  );
}
