import { useRef, useEffect, useState, useCallback } from 'react';
import FocusOverlay from './FocusOverlay';
import ControlsBar from './ControlsBar';
import { useFocusWindow } from '../hooks/useFocusWindow';
import { useAutoScroll } from '../hooks/useAutoScroll';
import styles from './Reader.module.css';

export default function Reader({
  article,
  fontSize,
  linesCount,
  focusEnabled,
  autoEnabled,
  setAutoEnabled,
  autoSpeed,
  setAutoSpeed,
}) {
  const wrapperRef = useRef(null);
  const scrollerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const { focusY, setFocusY, moveFocus, onMouseMove, windowHeight } =
    useFocusWindow({ wrapperRef, scrollerRef, fontSize, linesCount });

  useEffect(() => {
    setFocusY(100);
    setScrollTop(0);
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, [article?.id, setFocusY]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [moveFocus]);

  useAutoScroll({ enabled: autoEnabled, speed: autoSpeed, onTick: () => moveFocus(1) });

  const handleScroll = useCallback((e) => setScrollTop(e.target.scrollTop), []);

  const wrapperH = wrapperRef.current?.clientHeight ?? 0;
  const maxY = Math.max(0, wrapperH - windowHeight - 40);
  const maxScroll =
    (scrollerRef.current?.scrollHeight ?? 0) - (scrollerRef.current?.clientHeight ?? 0);
  const totalRange = maxScroll + maxY;
  const progress =
    totalRange > 0 ? Math.min(100, Math.round(((scrollTop + focusY) / totalRange) * 100)) : 0;

  return (
    <div
      className={styles.readerWrap}
      ref={wrapperRef}
      onMouseMove={focusEnabled ? onMouseMove : undefined}
      role="region"
      aria-label="Lector de artículo"
    >
      <div
        className={styles.readerContent}
        ref={scrollerRef}
        onScroll={handleScroll}
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
      >
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.meta}>{article.meta}</p>
        <hr className={styles.separator} />
        {article.paragraphs.map((p, i) => (
          <p key={i} className={styles.paragraph}>{p}</p>
        ))}
      </div>

      {focusEnabled && (
        <FocusOverlay focusY={focusY} windowHeight={windowHeight} />
      )}

      <ControlsBar
        moveFocus={moveFocus}
        progress={progress}
        autoEnabled={autoEnabled}
        setAutoEnabled={setAutoEnabled}
        autoSpeed={autoSpeed}
        setAutoSpeed={setAutoSpeed}
      />
    </div>
  );
}
