import { useRef, useEffect, useCallback } from 'react';
import { DraggableOptions, DraggableRef } from './interfaces';

const FRICTION = 0.95;

export function useDraggable(options: DraggableOptions = {}): DraggableRef {
  const state = useRef({
    isDragging: false,
    lastCursorPos: 0,
    velocity: 0,
    lastMoveTime: Date.now(),
    scrollDirection:
      options.direction === 'horizontal' ? 'horizontal' : 'vertical',
  });

  const elementRef = useRef<HTMLElement | null>(null);

  const isEnabled = options.enabled !== false;
  const useInertia = options.inertia !== false;

  const applyInertia = useCallback((initialTime: number = Date.now()) => {
    if (
      Math.abs(state.current.velocity) > 0.1 &&
      initialTime - state.current.lastMoveTime < 100
    ) {
      if (elementRef.current) {
        if (state.current.scrollDirection === 'vertical') {
          elementRef.current.scrollTop -= state.current.velocity;
        } else {
          elementRef.current.scrollLeft -= state.current.velocity;
        }
      }
      state.current.velocity *= FRICTION;
      requestAnimationFrame(() => applyInertia(initialTime));
    } else {
      state.current.velocity = 0;
    }
  }, []);

  const onMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if (!state.current.isDragging) return;

    const currentPos =
      state.current.scrollDirection === 'vertical'
        ? event.clientY
        : event.clientX;
    const delta = currentPos - state.current.lastCursorPos;
    state.current.lastCursorPos = currentPos;
    state.current.velocity = delta;

    if (elementRef.current) {
      if (state.current.scrollDirection === 'vertical') {
        elementRef.current.scrollTop -= delta;
      } else {
        elementRef.current.scrollLeft -= delta;
      }
    }

    state.current.lastMoveTime = Date.now();
  }, []);

  const startDragging = useCallback(
    (event: MouseEvent) => {
      state.current.lastCursorPos =
        state.current.scrollDirection === 'vertical'
          ? event.clientY
          : event.clientX;
      state.current.isDragging = true;
      state.current.velocity = 0;
      document.addEventListener('mousemove', onMouseMove);
    },
    [onMouseMove]
  );

  const stopDragging = useCallback(() => {
    state.current.isDragging = false;
    if (useInertia) applyInertia();
    document.removeEventListener('mousemove', onMouseMove);
  }, [useInertia, applyInertia, onMouseMove]);

  useEffect(() => {
    state.current.scrollDirection =
      options.direction === 'horizontal' ? 'horizontal' : 'vertical';
  }, [options.direction]);

  useEffect(() => {
    const el = elementRef.current;
    if (isEnabled && el) {
      Array.from(el.children).forEach((item) => {
        (item as HTMLElement).style.userSelect = 'none';
      });

      el.addEventListener('mousedown', startDragging);
      document.addEventListener('mouseup', stopDragging);

      return () => {
        el.removeEventListener('mousedown', startDragging);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, [isEnabled, startDragging, stopDragging, onMouseMove]);

  return elementRef;
}
