import styles from './FocusOverlay.module.css';

function UtpMark() {
  return (
    <div className={styles.utpMark}>
      <span className={styles.utpLetters}>UTP</span>
      <span className={styles.utpName}>Universidad Tecnológica de Pereira</span>
    </div>
  );
}

export default function FocusOverlay({ focusY, windowHeight }) {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.overlayTop} style={{ height: `${focusY}px` }}>
        <UtpMark />
      </div>
      <div className={styles.focusWindow} style={{ height: `${windowHeight}px` }} />
      <div className={styles.overlayBottom}>
        <UtpMark />
      </div>
    </div>
  );
}
