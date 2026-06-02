import { useEffect, useRef } from 'react';

export function useAutoScroll({ enabled, speed, onTick }) {
  const timerRef = useRef(null);
  const enabledRef = useRef(enabled);
  const speedRef = useRef(speed);
  const onTickRef = useRef(onTick);

  useEffect(() => { enabledRef.current = enabled; }, [enabled]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { onTickRef.current = onTick; }, [onTick]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const tick = () => {
      if (!enabledRef.current) return;
      onTickRef.current();
      timerRef.current = setTimeout(tick, speedRef.current);
    };

    timerRef.current = setTimeout(tick, speedRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [enabled]);
}
