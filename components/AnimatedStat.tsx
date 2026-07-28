'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type AnimatedStatProps = {
  value: number;
  suffix?: string;
  durationMs?: number;
};

export function AnimatedStat({ value, suffix = '', durationMs = 1200 }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [durationMs, hasStarted, value]);

  const formattedValue = useMemo(
    () => new Intl.NumberFormat('en-US').format(displayValue),
    [displayValue]
  );

  return (
    <strong ref={elementRef}>
      {formattedValue}
      {suffix}
    </strong>
  );
}
