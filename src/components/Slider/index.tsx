import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { useWindowSize } from './hooks/useWindowSize';

type Props = {
  children: React.ReactNode;
};

const Experience = ({ children }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [distance, setDistance] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const friction = 0.95;

  const updateSliderPaddings = () => {
    if (!sliderRef.current) return;
    const paddingValue = (window.innerWidth - 1200) / 2 + 'px';
    sliderRef.current.style.paddingLeft = paddingValue;
    sliderRef.current.style.paddingRight = paddingValue;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setLastX(e.clientX);
    setVelocity(0);
    setLastTime(Date.now());
    setDistance(0);
    // Cancel any ongoing inertia effect
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      setAnimationFrameId(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    const newVelocity = distance / (Date.now() - lastTime);

    setVelocity(newVelocity);
  };

  const applyScroll = (amount: number) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft += amount;
  };

  useEffect(() => {
    if (Math.abs(velocity) < 0.01) {
      return;
    }

    // Start the inertia effect
    const animate = () => {
      if (Math.abs(velocity) < 0.01) {
        return;
      }
      applyScroll(velocity);
      setVelocity(velocity * friction);
      setAnimationFrameId(requestAnimationFrame(animate));
    };
    setAnimationFrameId(requestAnimationFrame(animate));
  }, [velocity, friction]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging || !sliderRef.current) return;

    const x = e.clientX;
    const walk = lastX - x;
    setDistance(distance + walk);
    setLastX(x);
    applyScroll(walk);

    const now = Date.now();
    setLastTime(now);
  };

  useEffect(() => {
    return () => {
      // Cleanup: cancel the animation frame on unmount
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animationFrameId]);

  const windowSize = useWindowSize();

  useEffect(updateSliderPaddings, []);
  useEffect(updateSliderPaddings, [windowSize]);

  return (
    <div className="relative">
      <div
        className="mt-5 flex overflow-x-scroll slider"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
    </div>
  );
};

export default Experience;
