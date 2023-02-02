import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './styles.scss';
import { useWindowSize } from './hooks/useWindowSize';

type Props = {
  children: React.ReactNode;
};

const Experience = ({ children }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateSliderPaddings = () => {
    if (!sliderRef.current) return;
    const paddingValue = (window.innerWidth - 1200) / 2 + 'px';
    sliderRef.current.style.paddingLeft = paddingValue;
    sliderRef.current.style.paddingRight = paddingValue;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setInitialX(e.clientX - sliderRef.current?.offsetLeft);
    setScrollLeft(sliderRef.current?.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging || !sliderRef.current) return;
    const x = e.clientX - sliderRef.current?.offsetLeft;
    const walk = x - initialX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

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
