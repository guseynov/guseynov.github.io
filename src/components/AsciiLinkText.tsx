import { clsx } from "clsx";
import { useEffect, useRef } from "react";

const noiseCharacters = "#%*+={}[]/\\|";
const formingCharacters = "01/\\|_-=+:.";
const frameInterval = 1000 / 30;

type Glyph = {
  character: string;
  element: HTMLSpanElement;
  x: number;
  y: number;
  energy: number;
  decay: number;
};

type AsciiLinkTextProps = {
  children: string;
  className?: string;
};

export function AsciiLinkText({ children, className }: AsciiLinkTextProps) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const sourceRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const label = labelRef.current;
    const source = sourceRef.current;
    const overlay = overlayRef.current;
    const link = label?.closest("a");

    if (!label || !source || !overlay || !link) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    let glyphs: Glyph[] = [];
    let frameId = 0;
    let lastFrame = 0;
    let radius = 0;
    let previousPointer: { x: number; y: number; time: number } | null = null;

    const reset = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrame = 0;
      previousPointer = null;
      label.removeAttribute("data-ascii-active");
      glyphs = [];
      overlay.replaceChildren();
    };

    const measure = () => {
      const text = source.firstChild;
      if (!text) return;

      const bounds = label.getBoundingClientRect();
      const fontSize = Number.parseFloat(window.getComputedStyle(label).fontSize);
      radius = Math.max(22, Math.min(100, fontSize * 2.4));
      const range = document.createRange();
      const fragment = document.createDocumentFragment();
      let offset = 0;

      // Measure the intact text run so proportional fonts and kerning stay put.
      glyphs = Array.from(children, (character, index) => {
        range.setStart(text, offset);
        offset += character.length;
        range.setEnd(text, offset);
        const rect = range.getBoundingClientRect();
        const element = document.createElement("span");
        element.textContent = character;
        element.className = "absolute top-0 text-center";
        element.style.left = `${rect.left - bounds.left}px`;
        element.style.width = `${rect.width}px`;
        fragment.append(element);

        return {
          character,
          element,
          x: rect.left - bounds.left + rect.width / 2,
          y: rect.top - bounds.top + rect.height / 2,
          energy: 0,
          decay: 340 + (index % 4) * 45,
        };
      });

      overlay.replaceChildren(fragment);
    };

    const animate = (time: number) => {
      if (time - lastFrame < frameInterval) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      const elapsed = lastFrame ? time - lastFrame : frameInterval;
      lastFrame = time;
      let isActive = false;

      glyphs.forEach((glyph, index) => {
        glyph.energy = Math.max(0, glyph.energy - elapsed / glyph.decay);
        let character = glyph.character;

        if (glyph.energy > 0) {
          isActive = true;
          const tick = Math.floor(time / (45 + (index % 3) * 13));
          const seed = (tick * 17 + index * 31) >>> 0;

          if (glyph.energy > 0.55) {
            character = noiseCharacters[seed % noiseCharacters.length];
          } else if (glyph.energy > 0.2) {
            character = formingCharacters[seed % formingCharacters.length];
          } else if (glyph.energy > 0.08 && seed % 3 === 0) {
            character = glyph.character.toUpperCase();
          }
        }

        if (glyph.element.textContent !== character) {
          glyph.element.textContent = character;
        }
      });

      if (isActive) {
        label.setAttribute("data-ascii-active", "");
        frameId = window.requestAnimationFrame(animate);
      } else {
        reset();
      }
    };

    const disturb = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        reducedMotion.matches ||
        !finePointer.matches ||
        document.hidden
      ) return;

      if (!glyphs.length) measure();

      const bounds = label.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const time = performance.now();
      let speed = 0;

      if (previousPointer) {
        const distance = Math.hypot(x - previousPointer.x, y - previousPointer.y);
        speed = Math.min(1, distance / Math.max(1, time - previousPointer.time));
      }

      previousPointer = { x, y, time };
      const reach = radius * (1 + speed * 0.35);
      let disturbed = false;

      glyphs.forEach((glyph) => {
        // Keep spaces, arrows and punctuation intact as navigation cues.
        if (!/[a-z0-9]/i.test(glyph.character)) return;

        const distance = Math.hypot(glyph.x - x, (glyph.y - y) * 1.35);
        const proximity = Math.max(0, 1 - distance / reach);
        if (!proximity) return;

        glyph.energy = Math.max(glyph.energy, Math.pow(proximity, 0.65));
        disturbed = true;
      });

      if (disturbed && !frameId) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const leave = () => {
      previousPointer = null;
    };

    const resizeObserver = new ResizeObserver(reset);
    resizeObserver.observe(label);
    link.addEventListener("pointerenter", disturb);
    link.addEventListener("pointermove", disturb);
    link.addEventListener("pointerleave", leave);
    link.addEventListener("pointercancel", reset);
    link.addEventListener("click", reset);
    reducedMotion.addEventListener("change", reset);
    finePointer.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    document.fonts.addEventListener("loadingdone", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });

    return () => {
      reset();
      resizeObserver.disconnect();
      link.removeEventListener("pointerenter", disturb);
      link.removeEventListener("pointermove", disturb);
      link.removeEventListener("pointerleave", leave);
      link.removeEventListener("pointercancel", reset);
      link.removeEventListener("click", reset);
      reducedMotion.removeEventListener("change", reset);
      finePointer.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
      document.fonts.removeEventListener("loadingdone", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
    };
  }, [children]);

  return (
    <span
      className={clsx("relative inline-block whitespace-pre", className)}
      ref={labelRef}
    >
      <span data-ascii-source ref={sourceRef}>{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        data-ascii-overlay
        ref={overlayRef}
      />
    </span>
  );
}
