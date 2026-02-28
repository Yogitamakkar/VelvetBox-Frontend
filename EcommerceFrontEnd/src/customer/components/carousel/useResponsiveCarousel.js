import { useState, useLayoutEffect } from 'react';

export default function useResponsiveCarousel(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
