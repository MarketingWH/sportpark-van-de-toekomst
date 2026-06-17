import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uiText } from '../data/translations';
import MediaSlider from './MediaSlider';
import styles from './SolutionShowcaseSection.module.css';

const solutionsWithPossibleSolutions = new Set([
  'waterbouw',
  'modulaire-sportvloeren',
  'fitnesspark',
  'ecoraster-pad',
  'terras',
  'speeltoestellen',
  'fietsenstalling',
  'parkeerplaats',
]);

const mobileFilterLabels = {
  'modulaire-sportvloeren': 'Sportvloeren',
  vlonderplanken: 'Vlonderplanken',
  fitnesspark: 'Fitness',
  dugout: 'Dug-out',
  kantplanken: 'Kantplanken',
  'ecoraster-pad': 'Ecoraster pad',
  terras: 'Terras',
  fietsenstalling: 'Fietsenstalling',
  parkeerplaats: 'Parkeerplaats',
  'solar-woodle': 'Solar Woodle',
};

const mobileFilterLabelsEn = {
  'modulaire-sportvloeren': 'Sports flooring',
  vlonderplanken: 'Decking',
  fitnesspark: 'Fitness',
  dugout: 'Dug-out',
  kantplanken: 'Edge boards',
  'ecoraster-pad': 'Ecoraster path',
  terras: 'Terrace',
  fietsenstalling: 'Bike parking',
  parkeerplaats: 'Parking',
  'solar-woodle': 'Solar Woodle',
};

const whitepaperUrl =
  'https://greenmatter.nl/wp-content/uploads/2025/01/Whitepaper-GreenMatter.pdf';

function renderInlineText(content, keyPrefix = 'inline') {
  if (typeof content !== 'string') {
    return '';
  }

  const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = markdownLinkPattern.exec(content)) !== null) {
    const [fullMatch, linkText, url] = match;

    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    parts.push(
      <a
        key={`${keyPrefix}-${parts.length}`}
        className={styles.inlineLink}
        href={url}
        rel="noreferrer"
        target="_blank"
      >
        {linkText}
      </a>,
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  if (parts.length === 0) {
    return content;
  }

  return <>{parts}</>;
}

function renderBenefitContent(benefit) {
  if (typeof benefit === 'string') {
    return renderInlineText(benefit, 'benefit');
  }

  if (!benefit || typeof benefit !== 'object') {
    return '';
  }

  const {
    text = '',
    linkText = '',
    url = '',
    suffix = '',
  } = benefit;

  if (!linkText || !url) {
    return renderInlineText(`${text}${suffix}`, 'benefit');
  }

  return (
    <>
      {renderInlineText(text, 'benefit-prefix')}
      <a
        className={styles.inlineLink}
        href={url}
        rel="noreferrer"
        target="_blank"
      >
        {linkText}
      </a>
      {renderInlineText(suffix, 'benefit-suffix')}
    </>
  );
}

function getSummaryParagraphs(summary) {
  if (Array.isArray(summary)) {
    return summary.filter(Boolean);
  }

  if (typeof summary === 'string' && summary.trim()) {
    return [summary];
  }

  return [];
}

const expandTransition = {
  height: {
    duration: 0.34,
    ease: [0.25, 1, 0.5, 1],
  },
  opacity: {
    duration: 0.2,
    ease: 'easeOut',
  },
};

function SolutionShowcaseSection({
  activeSolutionId,
  language = 'nl',
  onSelectSolution,
  solutions,
}) {
  const copy = uiText[language] ?? uiText.nl;
  const compactFilterLabels =
    language === 'en' ? mobileFilterLabelsEn : mobileFilterLabels;
  const [expandedSolutionId, setExpandedSolutionId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isDesktopNavDragging, setIsDesktopNavDragging] = useState(false);
  const solutionNavRef = useRef(null);
  const desktopNavDragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const suppressDesktopNavClickRef = useRef(false);

  const toggleSolutionContent = (solutionId, event) => {
    event?.currentTarget?.blur();

    setExpandedSolutionId((currentValue) =>
      currentValue === solutionId ? null : solutionId,
    );
  };

  const toggleFilter = (solutionId) => {
    setSelectedFilters((currentValue) =>
      currentValue.includes(solutionId)
        ? currentValue.filter((value) => value !== solutionId)
        : [...currentValue, solutionId],
    );
  };

  const filteredSolutions = useMemo(() => {
    if (selectedFilters.length === 0) {
      return solutions;
    }

    return solutions.filter((solution) => selectedFilters.includes(solution.id));
  }, [selectedFilters, solutions]);

  const selectedSolutionsForMail = useMemo(() => {
    if (selectedFilters.length === 0) {
      return solutions;
    }

    return solutions.filter((solution) => selectedFilters.includes(solution.id));
  }, [selectedFilters, solutions]);

  const mailSelectionHref = useMemo(() => {
    if (selectedSolutionsForMail.length === 0) {
      return '#';
    }

    const onderwerp = encodeURIComponent(copy.quoteSubject);
    const geselecteerdeProducten = selectedSolutionsForMail.map(
      (solution) => solution.title,
    );

    const bericht = encodeURIComponent(
      `Hallo GreenMatter,

Ik ben geïnteresseerd in de volgende producten:

- ${geselecteerdeProducten.join('\n- ')}

Kunnen jullie meer informatie sturen?

Met vriendelijke groet,`,
    );

    return `mailto:info@greenmatter.nl?subject=${onderwerp}&body=${encodeURIComponent(
      copy.quoteBody(geselecteerdeProducten),
    )}`;
  }, [copy, selectedSolutionsForMail]);

  const mailCtaText =
    selectedFilters.length > 0
      ? `Offerte aanvragen • ${selectedSolutionsForMail.length} ${
          selectedSolutionsForMail.length === 1 ? 'product' : 'producten'
        }`
      : 'Offerte aanvragen';

  const localizedMailCtaText =
    selectedFilters.length > 0
      ? copy.quoteButtonWithCount(selectedSolutionsForMail.length)
      : copy.quoteButton;

  const handleDesktopFilterWheel = (event) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 860) {
      return;
    }

    const { currentTarget, deltaX, deltaY } = event;

    if (Math.abs(deltaY) <= Math.abs(deltaX)) {
      return;
    }

    if (currentTarget.scrollWidth <= currentTarget.clientWidth) {
      return;
    }

    event.preventDefault();
    currentTarget.scrollLeft += deltaY;
  };

  const startDesktopNavDrag = (event) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 860) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    const currentTarget = solutionNavRef.current;

    if (!currentTarget) {
      return;
    }

    desktopNavDragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScrollLeft: currentTarget.scrollLeft,
    };

    suppressDesktopNavClickRef.current = false;
    setIsDesktopNavDragging(false);
  };

  const moveDesktopNavDrag = (event) => {
    const dragState = desktopNavDragRef.current;
    const currentTarget = solutionNavRef.current;

    if (!dragState.active || !currentTarget) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;

    if (Math.abs(deltaX) > 6 && !dragState.moved) {
      dragState.moved = true;
      suppressDesktopNavClickRef.current = true;
      setIsDesktopNavDragging(true);
    }

    if (!dragState.moved) {
      return;
    }

    event.preventDefault();
    currentTarget.scrollLeft = dragState.startScrollLeft - deltaX;
  };

  const endDesktopNavDrag = () => {
    const dragState = desktopNavDragRef.current;

    if (!dragState.active) {
      return;
    }

    desktopNavDragRef.current = {
      active: false,
      moved: false,
      startX: 0,
      startScrollLeft: 0,
    };

    window.requestAnimationFrame(() => {
      setIsDesktopNavDragging(false);
    });
  };

  const handleDesktopNavClickCapture = (event) => {
    if (!suppressDesktopNavClickRef.current) {
      return;
    }

    suppressDesktopNavClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (!expandedSolutionId) {
      return;
    }

    if (!filteredSolutions.some((solution) => solution.id === expandedSolutionId)) {
      setExpandedSolutionId(null);
    }
  }, [expandedSolutionId, filteredSolutions]);

  useEffect(() => {
    if (!activeSolutionId || selectedFilters.length === 0 || selectedFilters.includes(activeSolutionId)) {
      return;
    }

    setSelectedFilters((currentValue) => [...currentValue, activeSolutionId]);
  }, [activeSolutionId, selectedFilters]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      moveDesktopNavDrag(event);
    };

    const handleMouseUp = () => {
      endDesktopNavDrag();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.introCopy}>
          <h2>{copy.solutionsHeading}</h2>
          <p>{copy.solutionsIntro}</p>
          <p hidden>
            Bekijk hier op je gemak al onze oplossingen die wij passend vinden voor
            het sportpark van de toekomst. Ben je geïnspireerd geraakt? Klik dan
            hieronder de oplossingen aan die jou interesseren en gebruik daarna de
            mailknop. We maken het je makkelijk: er staat meteen een mailtje met
            jouw aangeklikte oplossingen klaar.
          </p>
        </div>

        <div className={styles.solutionNavBar}>
          <div
            ref={solutionNavRef}
            className={`${styles.solutionNav} ${isDesktopNavDragging ? styles.solutionNavDragging : ''}`}
            onClickCapture={handleDesktopNavClickCapture}
            onMouseDown={startDesktopNavDrag}
            onMouseLeave={() => {
              if (!desktopNavDragRef.current.active) {
                setIsDesktopNavDragging(false);
              }
            }}
            onWheel={handleDesktopFilterWheel}
          >
            {solutions.map((solution) => (
              <button
                key={solution.id}
                aria-pressed={selectedFilters.includes(solution.id)}
                className={`${styles.solutionChip} ${selectedFilters.includes(solution.id) ? styles.solutionChipActive : ''}`}
                title={solution.title}
                type="button"
                onClick={() => toggleFilter(solution.id)}
              >
                <span className={styles.chipLabelDesktop}>{solution.title}</span>
                <span className={styles.chipLabelMobile}>
                  {compactFilterLabels[solution.id] ?? solution.title}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.desktopCtaRow}>
            <a className={styles.mailChip} href={mailSelectionHref}>
              {localizedMailCtaText}
            </a>

            <a
              className={`${styles.mailChip} ${styles.whitepaperChip}`}
              href={whitepaperUrl}
              rel="noreferrer"
              target="_blank"
            >
              {copy.whitepaperButton}
            </a>
          </div>
        </div>

        <div className={styles.mobileCtaGroup}>
          <a className={styles.mobileMailCta} href={mailSelectionHref}>
            {localizedMailCtaText}
          </a>

          <a
            className={`${styles.mobileMailCta} ${styles.mobileWhitepaperCta}`}
            href={whitepaperUrl}
            rel="noreferrer"
            target="_blank"
          >
            {copy.mobileWhitepaperButton}
          </a>
        </div>
      </div>

      <div className={styles.solutionList}>
        {filteredSolutions.map((solution, index) => {
          const isExpanded = expandedSolutionId === solution.id;
          const detailsId = `solution-details-${solution.id}`;
          const summaryParagraphs = getSummaryParagraphs(solution.summary);
          const previewSummaryParagraphs = summaryParagraphs.slice(0, 1);
          const expandedSummaryParagraphs = summaryParagraphs.slice(1);
          const resolvedButtonText =
            typeof solution.buttonText === 'string' && solution.buttonText.trim()
              ? solution.buttonText.trim()
              : copy.defaultProductButton;
          const hasPossibleSolutions =
            solutionsWithPossibleSolutions.has(solution.id) &&
            Array.isArray(solution.benefits) &&
            solution.benefits.length > 0;
          const hasExpandableContent =
            expandedSummaryParagraphs.length > 0 || hasPossibleSolutions;

          return (
            <article
              key={solution.id}
              className={`${styles.solutionPanel} ${activeSolutionId === solution.id ? styles.solutionPanelActive : ''}`}
              id={`solution-${solution.id}`}
            >
              <div className={styles.mediaColumn}>
                <MediaSlider media={solution.media} title={solution.title} />
              </div>

              <div className={styles.contentColumn}>
                <div className={styles.contentCard}>
                  <span className={styles.solutionIndex}>
                    {copy.hotspotLabel} {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{solution.title}</h3>
                  <p className={styles.lead}>
                    {renderInlineText(solution.description, `${solution.id}-lead`)}
                  </p>
                  <div className={styles.summaryGroup}>
                    {previewSummaryParagraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${solution.id}-summary-${paragraphIndex}`}
                        className={styles.summary}
                      >
                        {renderInlineText(
                          paragraph,
                          `${solution.id}-summary-${paragraphIndex}`,
                        )}
                      </p>
                    ))}
                  </div>

                  {!isExpanded && hasExpandableContent ? (
                    <button
                      aria-controls={detailsId}
                      aria-expanded={false}
                      className={styles.expandButton}
                      type="button"
                      onClick={(event) => toggleSolutionContent(solution.id, event)}
                    >
                      {copy.readMore}
                    </button>
                  ) : null}

                  <AnimatePresence initial={false}>
                    {isExpanded && hasExpandableContent ? (
                      <motion.div
                        key="expanded-content"
                        id={detailsId}
                        className={styles.expandableContent}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={expandTransition}
                        style={{ originY: 0 }}
                      >
                        <motion.div
                          className={styles.expandableInner}
                          initial={{ y: -12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{
                            duration: 0.24,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                        >
                          {expandedSummaryParagraphs.length > 0 ? (
                            <div className={styles.summaryGroup}>
                              {expandedSummaryParagraphs.map((paragraph, paragraphIndex) => (
                                <p
                                  key={`${solution.id}-summary-expanded-${paragraphIndex}`}
                                  className={styles.summary}
                                >
                                  {renderInlineText(
                                    paragraph,
                                    `${solution.id}-summary-expanded-${paragraphIndex}`,
                                  )}
                                </p>
                              ))}
                            </div>
                          ) : null}

                          {hasPossibleSolutions ? (
                            <div className={styles.benefitBlock}>
                              <h4>{copy.possibleSolutions}</h4>
                              <ul>
                                {solution.benefits.map((benefit, benefitIndex) => (
                                  <li key={`${solution.id}-benefit-${benefitIndex}`}>
                                    {renderBenefitContent(benefit)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          <div className={styles.actionsRow}>
                            {solution.url ? (
                              <a
                                className={styles.externalLink}
                                href={solution.url}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {resolvedButtonText}
                              </a>
                            ) : null}

                            <button
                              aria-controls={detailsId}
                              aria-expanded
                              className={`${styles.expandButton} ${styles.collapseButton}`}
                              type="button"
                              onClick={(event) => toggleSolutionContent(solution.id, event)}
                            >
                              {copy.readLess}
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SolutionShowcaseSection;
