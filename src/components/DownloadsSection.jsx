import { useCallback, useEffect, useRef, useState } from 'react';
import {
  casefolderUrl,
  getShortSolutionName,
  whitepaperUrl,
} from './SolutionShowcaseSection';
import styles from './Sections.module.css';

function ArrowIcon({ direction }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d={direction === 'left' ? 'M14.5 6 8.5 12l6 6' : 'm9.5 6 6 6-6 6'}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function DownloadsSection({ copy, language, solutions }) {
  const text = copy.downloadsSection;
  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });

  // Alle downloads van de pagina, elke pdf maar één keer
  const seen = new Set();
  const items = [
    { href: whitepaperUrl, title: text.whitepaper, note: text.whitepaperNote },
    { href: casefolderUrl, title: text.casefolder, note: text.casefolderNote },
    ...solutions.flatMap((solution) =>
      (solution.downloads ?? []).map((download) => ({
        href: download.url,
        title: download.label ?? `Flyer ${getShortSolutionName(solution, language)}`,
        note: download.type === 'bestek' ? text.bestekNote : text.flyerNote,
      })),
    ),
  ].filter((item) => {
    const key = item.href.replace('://www.', '://');
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  const updateArrows = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScroll({
      previous: track.scrollLeft > 4,
      next: track.scrollLeft < maxScroll - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    updateArrows();
    track.addEventListener('scroll', updateArrows, { passive: true });
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);

    return () => {
      track.removeEventListener('scroll', updateArrows);
      observer.disconnect();
    };
  }, [updateArrows, items.length]);

  const scrollByPage = (direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector('li');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    const perPage = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    track.scrollBy({
      left: direction * step * perPage,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      aria-labelledby="downloads-heading"
      className={`${styles.section} ${styles.sectionAlt}`}
      id="downloads"
    >
      <div className={styles.inner}>
        <div className={styles.downloadHeader}>
          <div>
            <h2 id="downloads-heading">{text.heading}</h2>
            <p className={styles.lead}>{text.intro}</p>
          </div>

          <div className={styles.sliderArrows}>
            <button
              aria-controls="downloads-track"
              aria-label={text.previous}
              className={styles.sliderArrow}
              disabled={!canScroll.previous}
              type="button"
              onClick={() => scrollByPage(-1)}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              aria-controls="downloads-track"
              aria-label={text.next}
              className={styles.sliderArrow}
              disabled={!canScroll.next}
              type="button"
              onClick={() => scrollByPage(1)}
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <ul ref={trackRef} className={styles.downloadTrack} id="downloads-track">
          {items.map((item) => (
            <li key={item.href}>
              <a
                className={styles.downloadCard}
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className={styles.downloadIcon}>
                  PDF
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <span className={styles.downloadNote}>{item.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DownloadsSection;
