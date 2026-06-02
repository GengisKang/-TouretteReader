import styles from './ControlsBar.module.css';

const SPEEDS = [
  { label: 'Lento', value: 4000 },
  { label: 'Normal', value: 2500 },
  { label: 'Rápido', value: 1500 },
];

export default function ControlsBar({
  moveFocus,
  progress,
  autoEnabled,
  setAutoEnabled,
  autoSpeed,
  setAutoSpeed,
}) {
  return (
    <div className={styles.bar} role="toolbar" aria-label="Controles de navegación">
      <button
        className={styles.navBtn}
        onClick={() => moveFocus(-1)}
        aria-label="Subir una línea"
      >
        ↑
      </button>
      <button
        className={styles.navBtn}
        onClick={() => moveFocus(1)}
        aria-label="Bajar una línea"
      >
        ↓
      </button>

      <span className={styles.progress} aria-live="polite" aria-label={`Progreso de lectura: ${progress} por ciento`}>
        {progress}% leído
      </span>

      <div className={styles.spacer} />

      <select
        className={styles.speedSelect}
        value={autoSpeed}
        onChange={(e) => setAutoSpeed(Number(e.target.value))}
        aria-label="Velocidad de avance automático"
      >
        {SPEEDS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <button
        className={`${styles.autoBtn} ${autoEnabled ? styles.autoActive : ''}`}
        onClick={() => setAutoEnabled((v) => !v)}
        aria-label={autoEnabled ? 'Pausar avance automático' : 'Iniciar avance automático'}
        aria-pressed={autoEnabled}
      >
        {autoEnabled ? '⏸ Pause' : '▶ Auto'}
      </button>
    </div>
  );
}
