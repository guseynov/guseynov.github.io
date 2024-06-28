import { useEffect } from 'react';
import './styles.scss';
import { useWindowSize } from './hooks/useWindowSize';
import { useDraggable } from './hooks/useDraggable';

type Props = {
  children: React.ReactNode;
};

const Experience = ({ children }: Props) => {
  const sliderRef = useDraggable({
    enabled: true,
    direction: 'horizontal',
    inertia: true,
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const updateSliderPaddings = () => {
    if (!sliderRef.current) return;
    if (window.innerWidth < 1200) {
      sliderRef.current.style.paddingLeft = '';
      sliderRef.current.style.paddingRight = '';
      return;
    }
    const paddingValue = (window.innerWidth - 1200) / 2 + 'px';
    sliderRef.current.style.paddingLeft = paddingValue;
    sliderRef.current.style.paddingRight = paddingValue;
  };

  const windowSize = useWindowSize();

  useEffect(updateSliderPaddings, []);
  useEffect(updateSliderPaddings, [windowSize]);

  return (
    <div className="relative">
      <div
        className="mt-5 flex overflow-x-scroll slider xl:px-0 px-8"
        ref={sliderRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Experience;
