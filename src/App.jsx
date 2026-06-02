import { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Reader from './components/Reader';
import { articles } from './data/articles';
import styles from './App.module.css';

export default function App() {
  const [fontSize, setFontSize] = useState(18);
  const [linesCount, setLinesCount] = useState(2);
  const [focusEnabled, setFocusEnabled] = useState(true);
  const [autoEnabled, setAutoEnabled] = useState(false);
  const [autoSpeed, setAutoSpeed] = useState(2500);
  const [activeId, setActiveId] = useState(articles[0].id);

  const activeArticle = articles.find((a) => a.id === activeId);

  const handleSelect = (id) => {
    setActiveId(id);
    setAutoEnabled(false);
  };

  return (
    <div className={styles.app}>
      <TopBar
        fontSize={fontSize}
        setFontSize={setFontSize}
        linesCount={linesCount}
        setLinesCount={setLinesCount}
        focusEnabled={focusEnabled}
        setFocusEnabled={setFocusEnabled}
      />
      <div className={styles.body}>
        <Sidebar articles={articles} activeId={activeId} onSelect={handleSelect} />
        <Reader
          article={activeArticle}
          fontSize={fontSize}
          linesCount={linesCount}
          focusEnabled={focusEnabled}
          autoEnabled={autoEnabled}
          setAutoEnabled={setAutoEnabled}
          autoSpeed={autoSpeed}
          setAutoSpeed={setAutoSpeed}
        />
      </div>
    </div>
  );
}
