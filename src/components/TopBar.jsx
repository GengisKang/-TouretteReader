import styles from './TopBar.module.css';

const LINES_OPTIONS = [1, 2, 3];

export default function TopBar({
  fontSize,
  setFontSize,
  linesCount,
  setLinesCount,
  focusEnabled,
  setFocusEnabled,
}) {
  const decreaseFont = () => setFontSize((f) => Math.max(14, f - 1));
  const increaseFont = () => setFontSize((f) => Math.min(28, f + 1));

  return (
    <header className={styles.topBar}>
      <span className={styles.brand}>TouretteReader</span>

      <div className={styles.group}>
        <span className={styles.label}>Fuente</span>
        <button
          className={styles.iconBtn}
          onClick={decreaseFont}
          disabled={fontSize <= 14}
          aria-label="Reducir tamaño de fuente"
        >
          −
        </button>
        <span className={styles.value}>{fontSize}px</span>
        <button
          className={styles.iconBtn}
          onClick={increaseFont}
          disabled={fontSize >= 28}
          aria-label="Aumentar tamaño de fuente"
        >
          +
        </button>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>Líneas</span>
        {LINES_OPTIONS.map((n) => (
          <button
            key={n}
            className={`${styles.lineBtn} ${linesCount === n ? styles.active : ''}`}
            onClick={() => setLinesCount(n)}
            aria-label={`Mostrar ${n} línea${n > 1 ? 's' : ''}`}
            aria-pressed={linesCount === n}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        className={`${styles.focusToggle} ${focusEnabled ? styles.focusOn : ''}`}
        onClick={() => setFocusEnabled((v) => !v)}
        aria-label={focusEnabled ? 'Desactivar ventana de enfoque' : 'Activar ventana de enfoque'}
        aria-pressed={focusEnabled}
      >
        {focusEnabled ? '◉ Enfoque activo' : '○ Enfoque inactivo'}
      </button>
    </header>
  );
}
