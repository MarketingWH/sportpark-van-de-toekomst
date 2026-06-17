import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useMemo, useState } from 'react';
import styles from './App.module.css';
import SolutionShowcaseSection from './components/SolutionShowcaseSection';
import TransitionSection from './components/TransitionSection';
import { solutions } from './data/solutions';
import { localizeSolutions, uiText } from './data/translations';

function App() {
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [language, setLanguage] = useState('nl');

  const localizedSolutions = useMemo(
    () => localizeSolutions(solutions, language),
    [language],
  );

  const copy = uiText[language];
  const targetLanguage = language === 'nl' ? 'en' : 'nl';

  const selectedSolution = useMemo(
    () =>
      localizedSolutions.find((solution) => solution.id === selectedSolutionId) ??
      null,
    [localizedSolutions, selectedSolutionId],
  );

  const scrollToSolution = (solutionId) => {
    if (typeof document === 'undefined') {
      return;
    }

    const target = document.getElementById(`solution-${solutionId}`);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeSolution = () => {
    setSelectedSolutionId(null);
  };

  const pinSolution = (solutionId) => {
    setSelectedSolutionId(solutionId);
  };

  const jumpToSolution = (solutionId) => {
    pinSolution(solutionId);

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        scrollToSolution(solutionId);
      });
    }
  };

  return (
    <>
      <div className={styles.page}>
        <button
          aria-label={copy.languageLabel}
          className={styles.languageToggle}
          type="button"
          onClick={() =>
            setLanguage((currentLanguage) =>
              currentLanguage === 'nl' ? 'en' : 'nl',
            )
          }
        >
          <span aria-hidden="true" className={styles.languageCode}>
            {targetLanguage.toUpperCase()}
          </span>
          <span>{copy.languageToggle}</span>
        </button>

        <main className={styles.main}>
          <TransitionSection
            dayImageSrc="/sportpark-photo-2026-05-19.jpg?v=2"
            isNightMode={isNightMode}
            language={language}
            mobileDayImageSrc="/sportpark-photo-mobile-2026-05-28-1200.jpg?v=1"
            mobileNightImageSrc="/sportpark-photo-mobile-night-2026-05-28-1200.jpg?v=1"
            nightImageSrc="/sportpark-photo-night-2026-05-19-1920.jpg?v=1"
            onClose={closeSolution}
            onJumpToSolution={jumpToSolution}
            onPinSolution={pinSolution}
            onToggleNightMode={() => setIsNightMode((currentValue) => !currentValue)}
            pinnedSolution={selectedSolution}
            pinnedSolutionId={selectedSolutionId}
            solutions={localizedSolutions}
          />

          <SolutionShowcaseSection
            activeSolutionId={selectedSolutionId}
            language={language}
            onSelectSolution={jumpToSolution}
            solutions={localizedSolutions}
          />
        </main>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
