import { useMemo, useState } from 'react';
import styles from './App.module.css';
import SolutionShowcaseSection from './components/SolutionShowcaseSection';
import TransitionSection from './components/TransitionSection';
import { solutions } from './data/solutions';

function App() {
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);

  const selectedSolution = useMemo(
    () => solutions.find((solution) => solution.id === selectedSolutionId) ?? null,
    [selectedSolutionId],
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
    <div className={styles.page}>
      <main className={styles.main}>
        <TransitionSection
          dayImageSrc="/sportpark-photo-2026-05-19.jpg?v=2"
          isNightMode={isNightMode}
          mobileDayImageSrc="/sportpark-photo-mobile-2026-05-28-1200.jpg?v=1"
          mobileNightImageSrc="/sportpark-photo-mobile-night-2026-05-28-1200.jpg?v=1"
          nightImageSrc="/sportpark-photo-night-2026-05-19-1920.jpg?v=1"
          onClose={closeSolution}
          onJumpToSolution={jumpToSolution}
          onPinSolution={pinSolution}
          onToggleNightMode={() => setIsNightMode((currentValue) => !currentValue)}
          pinnedSolution={selectedSolution}
          pinnedSolutionId={selectedSolutionId}
          solutions={solutions}
        />

        <SolutionShowcaseSection
          activeSolutionId={selectedSolutionId}
          onSelectSolution={jumpToSolution}
          solutions={solutions}
        />
      </main>
    </div>
  );
}

export default App;
