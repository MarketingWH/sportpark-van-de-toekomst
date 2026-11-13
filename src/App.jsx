import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';
import CaseSection from './components/CaseSection';
import DownloadsSection from './components/DownloadsSection';
import RequestForm from './components/RequestForm';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import SolutionShowcaseSection from './components/SolutionShowcaseSection';
import TransitionSection from './components/TransitionSection';
import { solutions } from './data/solutions';
import { localizeSolutions, uiText } from './data/translations';

const SELECTION_STORAGE_KEY = 'sportpark-selectie';

function readStoredSelection() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(SELECTION_STORAGE_KEY) ?? '[]');
    const knownIds = new Set(solutions.map((solution) => solution.id));
    return Array.isArray(stored) ? stored.filter((id) => knownIds.has(id)) : [];
  } catch {
    return [];
  }
}

function App() {
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isRainMode, setIsRainMode] = useState(false);
  const [language, setLanguage] = useState('nl');
  const [selectedIds, setSelectedIds] = useState(() =>
    typeof window === 'undefined' ? [] : readStoredSelection(),
  );

  const localizedSolutions = useMemo(
    () => localizeSolutions(solutions, language),
    [language],
  );

  const copy = uiText[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(selectedIds));
    } catch {
      // Opslaan is een extraatje; zonder localStorage werkt alles gewoon.
    }
  }, [selectedIds]);

  const toggleSelected = useCallback((solutionId) => {
    setSelectedIds((current) =>
      current.includes(solutionId)
        ? current.filter((id) => id !== solutionId)
        : [...current, solutionId],
    );
  }, []);

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
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
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
    <MotionConfig reducedMotion="user">
      <a className={styles.skipLink} href="#oplossingen">
        {copy.skipLink}
      </a>

      <SiteHeader
        copy={copy}
        language={language}
        selectedCount={selectedIds.length}
        onToggleLanguage={() =>
          setLanguage((currentLanguage) => (currentLanguage === 'nl' ? 'en' : 'nl'))
        }
      />

      <div className={styles.page}>
        <main className={styles.main} id="main">
          <TransitionSection
            dayImageSrc="/sportpark-photo-2026-05-19.jpg?v=2"
            isNightMode={isNightMode}
            isRainMode={isRainMode}
            language={language}
            mobileDayImageSrc="/sportpark-photo-mobile-2026-05-28-1200.jpg?v=1"
            mobileNightImageSrc="/sportpark-photo-mobile-night-2026-05-28-1200.jpg?v=1"
            nightImageSrc="/sportpark-photo-night-2026-05-19-1920.jpg?v=1"
            onClose={closeSolution}
            onJumpToSolution={jumpToSolution}
            onPinSolution={pinSolution}
            onToggleNightMode={() => setIsNightMode((currentValue) => !currentValue)}
            onToggleRainMode={() => setIsRainMode((currentValue) => !currentValue)}
            pinnedSolution={selectedSolution}
            pinnedSolutionId={selectedSolutionId}
            solutions={localizedSolutions}
          />

          <SolutionShowcaseSection
            activeSolutionId={selectedSolutionId}
            language={language}
            selectedIds={selectedIds}
            solutions={localizedSolutions}
            onToggleSelected={toggleSelected}
          />

          <CaseSection copy={copy} />

          <DownloadsSection copy={copy} language={language} solutions={localizedSolutions} />

          <RequestForm
            copy={copy}
            language={language}
            selectedIds={selectedIds}
            solutions={localizedSolutions}
            onToggleSelected={toggleSelected}
          />
        </main>

        <SiteFooter copy={copy} />
      </div>
      <Analytics />
      <SpeedInsights />
    </MotionConfig>
  );
}

export default App;
