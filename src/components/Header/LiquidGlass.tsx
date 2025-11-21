import { useEffect, useState } from 'react';

interface LiquidGlassProps {
  id?: string;
  intensity?: number;
}

export const LiquidGlass = ({ id = 'liquid-glass', intensity = 15 }: LiquidGlassProps) => {
  const [displacementMap, setDisplacementMap] = useState<string>('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Helper to map -1..1 to 0..255
    const mapToColor = (val: number) => Math.floor((val + 1) * 127.5);

    // Simple convex surface function (like a lens)
    // We'll create a horizontal bar shape for the header
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        // Normalize coordinates -1 to 1
        const nx = (x / width) * 2 - 1;
        const ny = (y / height) * 2 - 1;

        // Distance from center
        // For a header, we care mostly about the vertical curve (top/bottom edges)
        // but let's do a subtle overall curve
        
        // Let's try a shape that simulates a glass bar
        // We want the edges to refract more
        
        // Simple squircle-like profile for Y axis (since it's a header bar)
        // We want the top and bottom to curve in
        const distY = Math.abs(ny);
        const distX = Math.abs(nx);
        
        // Calculate normal vector (derivative of surface height)
        // Surface height h = (1 - dist^n)^(1/n) roughly
        // Let's use a simple approximation:
        // As we get closer to edge (1), slope increases
        
        // X displacement (Red)
        let dx = 0;
        // Y displacement (Green)
        let dy = 0;

        // Apply a curve at the edges
        const edgeThreshold = 0.8;
        
        if (distY > edgeThreshold) {
             // 0 to 1 range within the edge zone
             const t = (distY - edgeThreshold) / (1 - edgeThreshold);
             // Curve normal points away from center
             dy = t * Math.sign(ny); 
        }
        
        // Add some X refraction at the very ends if we want, but for a full-width header
        // it might look weird if it's not full width. 
        // Let's assume full width for now, so mostly Y refraction.

        // Encode into RGBA
        // R = X displacement
        // G = Y displacement
        // B = unused
        // A = alpha (opacity of the map itself doesn't matter much for the filter input, usually 255)

        data[i] = mapToColor(dx);     // R
        data[i + 1] = mapToColor(dy); // G
        data[i + 2] = 127;            // B (neutral)
        data[i + 3] = 255;            // A
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setDisplacementMap(canvas.toDataURL());
  }, []);

  if (!displacementMap) return null;

  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }}
    >
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feImage
            href={displacementMap}
            result="displacement-map"
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacement-map"
            scale={intensity}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          {/* Optional: Add specular lighting for extra glassiness */}
          {/* <feSpecularLighting
            in="displacement-map"
            surfaceScale={2}
            specularConstant={1}
            specularExponent={20}
            lightingColor="#ffffff"
            result="specular"
          >
            <fePointLight x="500" y="-100" z="200" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" /> */}
        </filter>
      </defs>
    </svg>
  );
};
