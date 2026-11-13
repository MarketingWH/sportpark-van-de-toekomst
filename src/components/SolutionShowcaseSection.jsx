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
  'solar-woodle': 'Solar',
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
  'solar-woodle': 'Solar',
};

const goalIds = ['klimaatadaptatie', 'inclusie', 'sport'];
const brandPrefixes = ['GreenMatter', 'W&H', 'Ecoraster', 'Solar', 'Dug'];

export function getShortSolutionName(solution, language) {
  const labels = language === 'en' ? mobileFilterLabelsEn : mobileFilterLabels;
  const name = labels[solution.id] ?? solution.title;

  if (brandPrefixes.some((prefix) => name.startsWith(prefix))) {
    return name;
  }

  return name.charAt(0).toLowerCase() + name.slice(1);
}

export const whitepaperUrl =
  'https://greenmatter.nl/wp-content/uploads/2025/01/Whitepaper-GreenMatter.pdf';
export const casefolderUrl = '/downloads/casefolder-onze-gezellen-2026.pdf';

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
  onToggleSelected,
  selectedIds = [],
  solutions,
}) {
  const copy = uiText[language] ?? uiText.nl;
  const compactFilterLabels =
    language === 'en' ? mobileFilterLabelsEn : mobileFilterLabels;
  const [expandedSolutionId, setExpandedSolutionId] = useState(null);
  const [activeGoal, setActiveGoal] = useState(null);
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

  const filteredSolutions = useMemo(() => {
    if (!activeGoal) {
      return solutions;
    }

    return solutions.filter((solution) => solution.goals?.includes(activeGoal));
  }, [activeGoal, solutions]);

  const quoteCtaText =
    selectedIds.length > 0
      ? copy.quoteButtonWithCount(selectedIds.length)
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
    <section aria-labelledby="oplossingen-heading" className={styles.section} id="oplossingen">
      <div className={styles.intro}>
        <div className={styles.introCopy}>
          <h2 id="oplossingen-heading" tabIndex={-1}>{copy.solutionsHeading}</h2>
          <p>{copy.solutionsIntro}</p>
        </div>

        <div aria-label={copy.goalsLabel} className={styles.goalFilter} role="group">
          <span aria-hidden="true" className={styles.goalFilterLabel}>
            {copy.goalsLabel}
          </span>
          <button
            aria-pressed={activeGoal === null}
            className={`${styles.goalChip} ${activeGoal === null ? styles.goalChipActive : ''}`}
            type="button"
            onClick={() => setActiveGoal(null)}
          >
            {copy.goalAll}
          </button>
          {goalIds.map((goalId) => (
            <button
              key={goalId}
              aria-pressed={activeGoal === goalId}
              className={`${styles.goalChip} ${activeGoal === goalId ? styles.goalChipActive : ''}`}
              type="button"
              onClick={() => setActiveGoal((current) => (current === goalId ? null : goalId))}
            >
              <span aria-hidden="true" className={`${styles.goalDot} ${styles[`goal_${goalId}`] ?? ''}`} />
              {copy.goals[goalId]}
            </button>
          ))}
        </div>

        <div className={styles.solutionNavBar}>
          <div
            ref={solutionNavRef}
            aria-label={copy.chipsLabel}
            role="group"
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
                aria-pressed={selectedIds.includes(solution.id)}
                className={`${styles.solutionChip} ${selectedIds.includes(solution.id) ? styles.solutionChipActive : ''}`}
                title={solution.title}
                type="button"
                onClick={() => onToggleSelected(solution.id)}
              >
                <span className={styles.chipLabelDesktop}>{solution.title}</span>
                <span className={styles.chipLabelMobile}>
                  {compactFilterLabels[solution.id] ?? solution.title}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.desktopCtaRow}>
            <a className={styles.mailChip} href="#contact">
              {quoteCtaText}
            </a>

            <a
              className={`${styles.mailChip} ${styles.whitepaperChip}`}
              href={whitepaperUrl}
              rel="noreferrer"
              target="_blank"
            >
              {copy.whitepaperButton}
            </a>
            <a
              className={`${styles.mailChip} ${styles.whitepaperChip}`}
              href={casefolderUrl}
              rel="noreferrer"
              target="_blank"
            >
              {copy.casefolderButton}
            </a>
          </div>
        </div>

        <div className={styles.mobileCtaGroup}>
          <a className={styles.mobileMailCta} href="#contact">
            {quoteCtaText}
          </a>

          <a
            className={`${styles.mobileMailCta} ${styles.mobileWhitepaperCta}`}
            href={whitepaperUrl}
            rel="noreferrer"
            target="_blank"
          >
            {copy.mobileWhitepaperButton}
          </a>
          <a
            className={`${styles.mobileMailCta} ${styles.mobileWhitepaperCta} ${styles.mobileCasefolderCta}`}
            href={casefolderUrl}
            rel="noreferrer"
            target="_blank"
          >
            {copy.casefolderButton}
          </a>
        </div>
      </div>

      <div className={styles.solutionList}>
        {filteredSolutions.length === 0 ? (
          <p className={styles.noResults}>{copy.noResults}</p>
        ) : null}
        {filteredSolutions.map((solution) => {
          const index = solutions.indexOf(solution);
          const isSelected = selectedIds.includes(solution.id);
          const shortName = getShortSolutionName(solution, language);
          const isExpanded = expandedSolutionId === solution.id;
          const detailsId = `solution-details-${solution.id}`;
          const summaryParagraphs = getSummaryParagraphs(solution.summary);
          const previewSummaryParagraphs = summaryParagraphs.slice(0, 1);
          const expandedSummaryParagraphs = summaryParagraphs.slice(1);
          const hasPossibleSolutions =
            solutionsWithPossibleSolutions.has(solution.id) &&
            !(language === 'en' && solution.id === 'speeltoestellen') &&
            Array.isArray(solution.benefits) &&
            solution.benefits.length > 0;
          const hasExpandableContent =
            expandedSummaryParagraphs.length > 0 || hasPossibleSolutions;

          const parkButton = (
            <button
              aria-label={
                isSelected
                  ? copy.removeFromParkAria(solution.title)
                  : copy.addToParkAria(solution.title)
              }
              aria-pressed={isSelected}
              className={`${styles.addButton} ${isSelected ? styles.addButtonActive : ''}`}
              type="button"
              onClick={() => onToggleSelected(solution.id)}
            >
              <span aria-hidden="true" className={styles.addButtonIcon}>
                {isSelected ? '✓' : '+'}
              </span>
              {isSelected ? copy.addedToPark : copy.addToPark}
            </button>
          );

          // Na het toevoegen direct door kunnen naar het aanvraagformulier
          const quoteLink = isSelected ? (
            <a className={styles.quoteLink} href="#contact">
              {copy.quoteButton}
              <span aria-hidden="true"> →</span>
            </a>
          ) : null;

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
                  {solution.goals?.length ? (
                    <ul aria-label={copy.goalsLabel} className={styles.goalTags}>
                      {solution.goals.map((goalId) => (
                        <li key={goalId} className={styles.goalTag}>
                          <span aria-hidden="true" className={`${styles.goalDot} ${styles[`goal_${goalId}`] ?? ''}`} />
                          {copy.goals[goalId]}
                        </li>
                      ))}
                    </ul>
                  ) : null}
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

                  {solution.impact?.length ? (
                    <div className={styles.impactBlock}>
                      <h4>{copy.impactHeading}</h4>
                      <dl className={styles.impactList}>
                        {solution.impact.map((item) => (
                          <div key={item.label}>
                            <dt>{item.value}</dt>
                            <dd>{item.label}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}

                  {/* Uitgeklapt staan deze knoppen onderaan, in plaats van de oude productlink */}
                  {!isExpanded || !hasExpandableContent ? (
                  <div className={styles.cardActions}>
                    {parkButton}
                    {quoteLink}

                    {hasExpandableContent ? (
                      <button
                        aria-controls={detailsId}
                        aria-expanded={false}
                        className={styles.expandButton}
                        type="button"
                        onClick={(event) => toggleSolutionContent(solution.id, event)}
                      >
                        {copy.readMoreAbout(shortName)}
                      </button>
                    ) : null}
                  </div>
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

                          {solution.downloads?.length ? (
                            <div className={styles.benefitBlock}>
                              <h4>{copy.downloadsHeading}</h4>
                              <ul className={styles.downloadList}>
                                {solution.downloads.map((download) => (
                                  <li key={download.url}>
                                    <a
                                      className={styles.inlineLink}
                                      href={download.url}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      {download.label ?? `Flyer ${shortName} (pdf)`}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          <div className={styles.actionsRow}>
                            <div className={styles.cardActions}>
                              {parkButton}
                              {quoteLink}
                            </div>

                            <button
                              aria-controls={detailsId}
                              aria-expanded
                              className={`${styles.expandButton} ${styles.collapseButton}`}
                              type="button"
                              onClick={(event) => toggleSolutionContent(solution.id, event)}
                            >
                              {copy.readLessAbout(shortName)}
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
