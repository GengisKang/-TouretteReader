import { useState, useCallback, useRef } from 'react';

export function useFocusWindow({ wrapperRef, scrollerRef, fontSize, linesCount }) {
  const lineHeight = fontSize * 1.85;
  const windowHeight = linesCount * lineHeight + 8;

  const lineHeightRef = useRef(lineHeight);
  const windowHeightRef = useRef(windowHeight);
  lineHeightRef.current = lineHeight;
  windowHeightRef.current = windowHeight;

  const [focusY, setFocusY] = useState(100);

  const getMaxY = useCallback(() => {
    if (!wrapperRef.current) return 400;
    return Math.max(0, wrapperRef.current.clientHeight - windowHeightRef.current - 40);
  }, [wrapperRef]);

  const moveFocus = useCallback(
    (dir) => {
      const lh = lineHeightRef.current;
      const maxY = getMaxY();
      setFocusY((prev) => {
        const next = prev + dir * lh;
        if (dir > 0 && next > maxY) {
          if (scrollerRef?.current) {
            scrollerRef.current.scrollTop += lh;
          }
          return maxY;
        }
        if (dir < 0 && prev <= 40) {
          if (scrollerRef?.current && scrollerRef.current.scrollTop > 0) {
            scrollerRef.current.scrollTop = Math.max(
              0,
              scrollerRef.current.scrollTop - lh
            );
          }
          return 40;
        }
        return Math.max(40, Math.min(maxY, next));
      });
    },
    [getMaxY, scrollerRef]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const relY = e.clientY - rect.top - windowHeightRef.current / 2;
      const maxY = getMaxY();
      setFocusY(Math.max(0, Math.min(maxY, relY)));
    },
    [wrapperRef, getMaxY]
  );

  return { focusY, setFocusY, moveFocus, onMouseMove, lineHeight, windowHeight };
}
