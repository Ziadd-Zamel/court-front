/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// hooks/useCountAnimation.ts
import { useState, useEffect } from 'react';

interface UseCountAnimationOptions {
  duration?: number;
  easing?: (t: number) => number;
}

const defaultEasing = (t: number): number => 1 - Math.pow(1 - t, 3);

export const useCountAnimation = (
  endValue: number,
  options: UseCountAnimationOptions = {}
): number => {
  const { duration = 1500, easing = defaultEasing } = options;
  const [count, setCount] = useState(endValue);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    const startValue = count;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        setCount(Math.floor(startValue + (endValue - startValue) * easing(progress)));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration, easing]);

  return count;
};