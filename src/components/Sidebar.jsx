import styles from './Sidebar.module.css';

export default function Sidebar({ articles, activeId, onSelect, isOpen }) {
  return (
    <nav
      className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      aria-label="Lista de artículos"
    >
      <p className={styles.heading}>Artículos</p>
      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.id}>
            <button
              className={`${styles.item} ${article.id === activeId ? styles.active : ''}`}
              onClick={() => onSelect(article.id)}
              aria-current={article.id === activeId ? 'true' : undefined}
            >
              <span className={styles.title}>{article.title}</span>
              <span className={styles.meta}>{article.meta}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
