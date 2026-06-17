import { useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uiText } from '../data/translations';
import styles from './TransitionSection.module.css';

const COUNTDOWN_TARGET = new Date(2030, 0, 1, 0, 0, 0).getTime();
const HOME_LOGO_SRC = '/sportpark-home-logo.svg';
const HOME_LOGO_EN_SRC = '/sportpark-home-logo-en.svg';
const HOME_LOGO_WIDTH = 800;
const HOME_LOGO_HEIGHT = 191;
const DESKTOP_DAY_WIDTH = 1680;
const DESKTOP_DAY_HEIGHT = 936;
const DESKTOP_NIGHT_WIDTH = 5504;
const DESKTOP_NIGHT_HEIGHT = 3072;
const MOBILE_BREAKPOINT = '(max-width: 760px)';
const HERO_DAY_WEBP_SRC_SET =
  '/sportpark-photo-2026-05-19-1280.webp?v=1 1280w, /sportpark-photo-2026-05-19-1680.webp?v=1 1680w';
const HERO_DAY_MOBILE_WEBP_SRC_SET =
  '/sportpark-photo-mobile-2026-05-28-480.webp?v=1 480w, /sportpark-photo-mobile-2026-05-28-768.webp?v=1 768w, /sportpark-photo-mobile-2026-05-28-1200.webp?v=1 1200w';
const HERO_DAY_MOBILE_FALLBACK_SRC_SET =
  '/sportpark-photo-mobile-2026-05-28-1200.jpg?v=1 1200w';
const HERO_NIGHT_WEBP_SRC_SET =
  '/sportpark-photo-night-2026-05-19-1280.webp?v=1 1280w, /sportpark-photo-night-2026-05-19-1920.webp?v=1 1920w';
const HERO_NIGHT_MOBILE_WEBP_SRC_SET =
  '/sportpark-photo-mobile-night-2026-05-28-480.webp?v=1 480w, /sportpark-photo-mobile-night-2026-05-28-768.webp?v=1 768w, /sportpark-photo-mobile-night-2026-05-28-1200.webp?v=1 1200w';
const HERO_NIGHT_MOBILE_FALLBACK_SRC_SET =
  '/sportpark-photo-mobile-night-2026-05-28-1200.jpg?v=1 1200w';

function interpolate(value, inputMin, inputMax, outputMin, outputMax) {
  if (value <= inputMin) {
    return outputMin;
  }

  if (value >= inputMax) {
    return outputMax;
  }

  const progress = (value - inputMin) / (inputMax - inputMin);
  return outputMin + progress * (outputMax - outputMin);
}

function interpolateSeries(value, inputRange, outputRange) {
  if (inputRange.length !== outputRange.length || inputRange.length === 0) {
    return outputRange.at(-1) ?? 0;
  }

  if (value <= inputRange[0]) {
    return outputRange[0];
  }

  for (let index = 1; index < inputRange.length; index += 1) {
    if (value <= inputRange[index]) {
      return interpolate(
        value,
        inputRange[index - 1],
        inputRange[index],
        outputRange[index - 1],
        outputRange[index],
      );
    }
  }

  return outputRange[outputRange.length - 1];
}

function getCountdownParts(labels = uiText.nl.countdownUnits) {
  const remainingMs = Math.max(COUNTDOWN_TARGET - Date.now(), 0);
  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    {
      label: labels[0],
      value: String(days),
    },
    {
      label: labels[1],
      value: String(hours).padStart(2, '0'),
    },
    {
      label: labels[2],
      value: String(minutes).padStart(2, '0'),
    },
    {
      label: labels[3],
      value: String(seconds).padStart(2, '0'),
    },
  ];
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="3.1" fill="currentColor" />
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      >
        <path d="M10 1.9v2.2M10 15.9v2.2M18.1 10h-2.2M4.1 10H1.9" />
        <path d="m15.8 4.2-1.5 1.5M5.7 14.3l-1.5 1.5M15.8 15.8l-1.5-1.5M5.7 5.7 4.2 4.2" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path
        d="M12.4 1.9a7.8 7.8 0 1 0 5.7 13.1 7.2 7.2 0 0 1-2.6.5 7.6 7.6 0 0 1-7.6-7.6c0-2.2.9-4.2 2.4-5.7-.4-.1-1.1-.3-1.6-.3a8 8 0 0 1 3.7 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TransitionSection({
  dayImageSrc,
  isNightMode,
  language = 'nl',
  mobileDayImageSrc,
  mobileNightImageSrc,
  nightImageSrc,
  onClose,
  onJumpToSolution,
  onPinSolution,
  onToggleNightMode,
  pinnedSolution,
  pinnedSolutionId,
  solutions,
}) {
  const copy = uiText[language] ?? uiText.nl;
  const homeLogoSrc = language === 'en' ? HOME_LOGO_EN_SRC : HOME_LOGO_SRC;
  const sectionRef = useRef(null);
  const revealRef = useRef(null);
  const cardRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const suppressCloseUntilRef = useRef(0);
  const isPinnedRef = useRef(false);
  const isInteractiveRef = useRef(false);
  const supportsHoverRef = useRef(false);

  const reduceMotion = useReducedMotion();

  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 760px)').matches
      : false,
  );
  const [mobileViewportMode, setMobileViewportMode] = useState('start');
  const [hoveredSolutionId, setHoveredSolutionId] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [revealSize, setRevealSize] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 3074, height: 2045 });
  const [countdownParts, setCountdownParts] = useState(() =>
    getCountdownParts(copy.countdownUnits),
  );
  const [shouldLoadNightAssets, setShouldLoadNightAssets] = useState(() => isNightMode);

  const hoveredSolution = useMemo(
    () => solutions.find((solution) => solution.id === hoveredSolutionId) ?? null,
    [hoveredSolutionId, solutions],
  );

  const displayedSolution = pinnedSolution ?? hoveredSolution;
  const isPinned = displayedSolution?.id === pinnedSolutionId && pinnedSolutionId !== null;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;

      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const scrollSpan = Math.max(sectionRef.current.offsetHeight - viewportHeight, 1);
      const nextProgress = Math.min(Math.max(-rect.top / scrollSpan, 0), 1);

      if (isMobileLayout) {
        const nextViewportMode =
          rect.bottom <= viewportHeight ? 'released' : rect.top <= 0 ? 'fixed' : 'start';

        setMobileViewportMode((currentValue) =>
          currentValue === nextViewportMode ? currentValue : nextViewportMode,
        );
      } else {
        setMobileViewportMode((currentValue) =>
          currentValue === 'desktop' ? currentValue : 'desktop',
        );
      }

      setProgressValue((currentValue) => {
        if (Math.abs(currentValue - nextProgress) < 0.001) {
          return currentValue;
        }

        return nextProgress;
      });
    };

    const requestUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.visualViewport?.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.visualViewport?.removeEventListener('resize', requestUpdate);
    };
  }, [isMobileLayout]);

  useEffect(() => {
    setCountdownParts(getCountdownParts(copy.countdownUnits));

    const intervalId = window.setInterval(() => {
      setCountdownParts(getCountdownParts(copy.countdownUnits));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [copy.countdownUnits]);

  useEffect(() => {
    if (!isNightMode || shouldLoadNightAssets) {
      return undefined;
    }

    setShouldLoadNightAssets(true);
    return undefined;
  }, [isNightMode, shouldLoadNightAssets]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 760px)');

    const updateMobileLayout = () => {
      setIsMobileLayout(mediaQuery.matches);
    };

    updateMobileLayout();
    mediaQuery.addEventListener('change', updateMobileLayout);

    return () => {
      mediaQuery.removeEventListener('change', updateMobileLayout);
    };
  }, []);

  useEffect(() => {
    isPinnedRef.current = isPinned;
  }, [isPinned]);

  useEffect(() => {
    isInteractiveRef.current = progressValue >= 0.66;
  }, [progressValue]);

  useEffect(() => {
    if (pinnedSolutionId !== null) {
      setHoveredSolutionId(null);
    }
  }, [pinnedSolutionId]);

  useEffect(() => {
    if (!revealRef.current || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      const { width, height } = entry.contentRect;
      setRevealSize({ width, height });
    });

    observer.observe(revealRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const updateHoverSupport = () => {
      supportsHoverRef.current = mediaQuery.matches;
    };

    updateHoverSupport();
    mediaQuery.addEventListener('change', updateHoverSupport);

    return () => {
      mediaQuery.removeEventListener('change', updateHoverSupport);
    };
  }, []);

  useEffect(() => {
    if (!displayedSolution) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;

      if (cardRef.current?.contains(target)) {
        return;
      }

      if (target.closest('[data-hotspot-trigger="true"]')) {
        return;
      }

      setHoveredSolutionId(null);
      onClose();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [displayedSolution, onClose]);

  useEffect(() => {
    if (!displayedSolution) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setHoveredSolutionId(null);
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [displayedSolution, onClose]);

  const clearPendingClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    if (!supportsHoverRef.current || isPinnedRef.current || !isInteractiveRef.current) {
      return;
    }

    if (Date.now() < suppressCloseUntilRef.current) {
      return;
    }

    clearPendingClose();

    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      setHoveredSolutionId(null);
    }, 220);
  };

  const coverMetrics = useMemo(() => {
    if (!revealSize.width || !revealSize.height || !imageSize.width || !imageSize.height) {
      return null;
    }

    const scale = Math.max(
      revealSize.width / imageSize.width,
      revealSize.height / imageSize.height,
    );

    const width = imageSize.width * scale;
    const height = imageSize.height * scale;

    return {
      width,
      height,
      offsetX: (revealSize.width - width) / 2,
      offsetY: (revealSize.height - height) / 2,
    };
  }, [imageSize.height, imageSize.width, revealSize.height, revealSize.width]);

  /*
    Belangrijk:
    Hieronder gebruiken mobiel en desktop dezelfde animatie-flow.
    isMobileLayout wordt dus NIET meer gebruikt om de animatie anders te maken.
    Alleen mobiele afbeeldingen en mobiele hotspot-coördinaten blijven bestaan.
  */

  const introOpacity = interpolateSeries(
    progressValue,
    [0, 0.16, 0.34, 0.44],
    [1, 1, 0.24, 0],
  );

  const introY = interpolate(
    progressValue,
    0,
    1,
    0,
    reduceMotion ? -20 : -86,
  );

  const introScale = interpolate(
    progressValue,
    0,
    0.38,
    1,
    reduceMotion ? 0.988 : 0.94,
  );

  const revealOpacity = interpolateSeries(
    progressValue,
    [0.04, 0.18, 0.32],
    [0, 0.24, 1],
  );

  const revealWidth = interpolateSeries(
    progressValue,
    [0, 0.58, 0.86, 1],
    [58, 100, 100, 100],
  );

  const revealHeight = interpolateSeries(
    progressValue,
    [0, 0.58, 0.86, 1],
    [40, 100, 100, 100],
  );

  const revealRadius = interpolateSeries(
    progressValue,
    [0, 0.46, 0.66, 1],
    [34, 18, 0, 0],
  );

  const revealShadow = interpolateSeries(
    progressValue,
    [0, 0.64, 1],
    [0.46, 0.18, 0.1],
  );

  const imageScale = interpolateSeries(
    progressValue,
    [0, 0.56, 0.82, 1],
    reduceMotion
      ? [1, 1.006, 1.01, 1.005]
      : [1, 1.018, 1.028, 1.014],
  );

  const imageY = interpolateSeries(
    progressValue,
    [0, 0.56, 0.82, 1],
    reduceMotion
      ? [8, 2, -2, -4]
      : [28, 2, -6, -12],
  );

  const imageOpacity = interpolateSeries(
    progressValue,
    [0.08, 0.24, 0.38],
    [0, 0.42, 1],
  );

  const vignetteOpacity = interpolateSeries(
    progressValue,
    [0, 0.74, 1],
    [0.08, 0.18, 0.3],
  );

  const outroShadeOpacity = interpolateSeries(
    progressValue,
    [0.82, 1],
    [0, 1],
  );

  const hotspotLayerOpacity = interpolateSeries(
    progressValue,
    [0.66, 0.74, 1],
    [0, 1, 1],
  );

  const homeScrollCueOpacity = interpolateSeries(
    progressValue,
    [0, 0.18, 0.28, 0.38],
    [1, 1, 0.45, 0],
  );

  const scrollCueOpacity = interpolateSeries(
    progressValue,
    [0.64, 0.72, 0.9, 0.98],
    [0, 1, 1, 0],
  );

  const visualScale = imageScale;
  const visualTranslateY = imageY;
  const isInteractive = progressValue >= 0.66;

  const shouldRenderNightImage = shouldLoadNightAssets || isNightMode;
  const usesFallbackNightImage = shouldRenderNightImage && nightImageSrc === dayImageSrc;

  const openHotspot = (hotspotId) => {
    if (!isInteractive || pinnedSolutionId !== null) {
      return;
    }

    clearPendingClose();
    setHoveredSolutionId(hotspotId);
  };

  const activateHotspot = (hotspotId) => {
    if (!isInteractive || pinnedSolutionId === hotspotId) {
      return;
    }

    clearPendingClose();
    suppressCloseUntilRef.current = Date.now() + 420;
    setHoveredSolutionId(null);
    onPinSolution(hotspotId);
  };

  const getRenderedPoint = (hotspot) => {
    const hotspotX =
      isMobileLayout && typeof hotspot.mobileX === 'number' ? hotspot.mobileX : hotspot.x;

    const hotspotY =
      isMobileLayout && typeof hotspot.mobileY === 'number' ? hotspot.mobileY : hotspot.y;

    if (!coverMetrics) {
      return {
        left: `${hotspotX}%`,
        top: `${hotspotY}%`,
      };
    }

    const baseX = coverMetrics.offsetX + (hotspotX / 100) * coverMetrics.width;
    const baseY = coverMetrics.offsetY + (hotspotY / 100) * coverMetrics.height;
    const centerX = revealSize.width / 2;
    const centerY = revealSize.height / 2;

    return {
      left: `${centerX + visualScale * (baseX - centerX)}px`,
      top: `${centerY + visualScale * (baseY - centerY) + visualTranslateY}px`,
    };
  };

  const cardPlacement = displayedSolution ? getRenderedPoint(displayedSolution) : undefined;

  const previewMedia =
    displayedSolution?.media?.find((item) => item?.type === 'image' && item?.src) ?? null;

  const cardClassName = displayedSolution
    ? [
        styles.popup,
        displayedSolution.x > 55 ? styles.alignRight : styles.alignLeft,
        displayedSolution.y > 58 ? styles.alignTop : styles.alignBottom,
      ].join(' ')
    : styles.popup;

  const revealStyle = {
    opacity: revealOpacity,
    width: `${revealWidth}vw`,
    height: `${revealHeight}vh`,
    borderRadius: `${revealRadius}px`,
    boxShadow: `0 28px 72px rgba(6, 12, 12, ${revealShadow})`,
  };

  const imageStyle = {
    transform: `translate3d(0, ${imageY}px, 0) scale(${imageScale})`,
    transformOrigin: 'center center',
  };

  const imageStageStyle = {
    opacity: imageOpacity,
    ...imageStyle,
  };

  const introCardStyle = {
    opacity: introOpacity,
    transform: `translate3d(0, ${introY}px, 0) scale(${introScale})`,
    transformOrigin: 'center center',
  };

  const themeToggleStyle = {
    opacity: interpolateSeries(progressValue, [0.16, 0.3, 1], [0, 1, 1]),
    pointerEvents: revealOpacity > 0.16 ? 'auto' : 'none',
  };

  const countdownStyle = {
    opacity: interpolateSeries(progressValue, [0.16, 0.3, 1], [0, 1, 1]),
  };

  const introLayerStyle = {
    opacity: 1,
    pointerEvents: progressValue < 0.3 ? 'auto' : 'none',
  };
  const viewportClassName = [
    styles.viewport,
    isMobileLayout ? styles.viewportMobile : '',
    isMobileLayout && mobileViewportMode === 'fixed' ? styles.viewportMobileFixed : '',
    isMobileLayout && mobileViewportMode === 'released' ? styles.viewportMobileReleased : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleImageLoad = (event) => {
    const target = event.currentTarget;

    if (target.naturalWidth && target.naturalHeight) {
      setImageSize({
        width: target.naturalWidth,
        height: target.naturalHeight,
      });
    }
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={viewportClassName}>
        <div className={styles.parkLayer}>
          <div
            ref={revealRef}
            className={styles.parkReveal}
            style={revealStyle}
          >
            <div className={styles.parkImageStage} style={imageStageStyle}>
              <div
                className={`${styles.parkImageLayer} ${
                  !isNightMode ? styles.parkImageLayerVisible : ''
                }`}
              >
                <picture>
                  {mobileDayImageSrc ? (
                    <>
                      <source
                        media={MOBILE_BREAKPOINT}
                        srcSet={HERO_DAY_MOBILE_WEBP_SRC_SET}
                        type="image/webp"
                        sizes="100vw"
                      />
                      <source
                        media={MOBILE_BREAKPOINT}
                        srcSet={HERO_DAY_MOBILE_FALLBACK_SRC_SET}
                        sizes="100vw"
                      />
                    </>
                  ) : null}
                  <source
                    srcSet={HERO_DAY_WEBP_SRC_SET}
                    type="image/webp"
                    sizes="100vw"
                  />
                  <img
                    alt={copy.heroDayAlt}
                    className={styles.parkImage}
                    decoding="async"
                    data-pin-no-hover="true"
                    data-pin-nopin="true"
                    height={DESKTOP_DAY_HEIGHT}
                    loading="eager"
                    nopin="nopin"
                    src={dayImageSrc}
                    sizes="(max-width: 760px) 82vw, 100vw"
                    width={DESKTOP_DAY_WIDTH}
                    onLoad={handleImageLoad}
                  />
                </picture>
              </div>

              <div
                className={`${styles.parkImageLayer} ${
                  isNightMode ? styles.parkImageLayerVisible : ''
                }`}
              >
                {shouldRenderNightImage ? (
                  <picture>
                    {mobileNightImageSrc ? (
                      <>
                        <source
                          media={MOBILE_BREAKPOINT}
                          srcSet={HERO_NIGHT_MOBILE_WEBP_SRC_SET}
                          type="image/webp"
                          sizes="100vw"
                        />
                        <source
                          media={MOBILE_BREAKPOINT}
                          srcSet={HERO_NIGHT_MOBILE_FALLBACK_SRC_SET}
                          sizes="100vw"
                        />
                      </>
                    ) : null}
                    <source
                      srcSet={HERO_NIGHT_WEBP_SRC_SET}
                      type="image/webp"
                      sizes="100vw"
                    />
                    <img
                      alt={copy.heroNightAlt}
                      className={`${styles.parkImage} ${
                        usesFallbackNightImage ? styles.fallbackNightImage : ''
                      }`}
                      decoding="async"
                      data-pin-no-hover="true"
                      data-pin-nopin="true"
                      height={DESKTOP_NIGHT_HEIGHT}
                      loading="lazy"
                      nopin="nopin"
                      src="/sportpark-photo-night-2026-05-19-1920.jpg?v=1"
                      sizes="(max-width: 760px) 82vw, 100vw"
                      width={DESKTOP_NIGHT_WIDTH}
                    />
                  </picture>
                ) : null}
              </div>
            </div>

            <div
              className={styles.vignette}
              style={{ opacity: vignetteOpacity }}
            />

            <div
              className={styles.outroShade}
              style={{ opacity: outroShadeOpacity }}
            />

            <div className={styles.topUi}>
              <div className={styles.countdownBar} style={countdownStyle}>
                <span className={styles.countdownLabel}>
                  {copy.countdownLabel}
                </span>

                <div className={styles.countdownItems}>
                  {countdownParts.map((item) => (
                    <div key={item.label} className={styles.countdownItem}>
                      <span className={styles.countdownValue}>{item.value}</span>
                      <span className={styles.countdownUnit}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.themeControls} style={themeToggleStyle}>
                <span
                  className={`${styles.themeStatus} ${
                    isNightMode ? styles.themeStatusActive : ''
                  }`}
                >
                  {isNightMode ? copy.solarOn : copy.solarOff}
                </span>

                <button
                  aria-label={
                    isNightMode
                      ? copy.switchToDay
                      : copy.switchToNight
                  }
                  aria-pressed={isNightMode}
                  className={`${styles.themeToggle} ${
                    isNightMode ? styles.themeToggleNight : ''
                  }`}
                  type="button"
                  onClick={onToggleNightMode}
                >
                  <span className={styles.themeToggleThumb} />
                  <span className={styles.themeToggleIcon}>
                    <SunIcon />
                  </span>
                  <span className={styles.themeToggleIcon}>
                    <MoonIcon />
                  </span>
                </button>
              </div>
            </div>

            <div
              aria-hidden="true"
              className={styles.scrollCue}
              style={{ opacity: scrollCueOpacity }}
            >
              <span className={styles.scrollCueLabel}>{copy.scrollFurther}</span>
              <span className={styles.scrollCueArrow}>
                <span className={styles.scrollCueStem} />
                <span className={styles.scrollCueHead} />
              </span>
            </div>

            <div
              aria-hidden={!isInteractive}
              className={`${styles.hotspotLayer} ${
                isInteractive ? styles.hotspotLayerVisible : ''
              }`}
              style={{
                opacity: hotspotLayerOpacity,
                pointerEvents: isInteractive ? 'auto' : 'none',
              }}
            >
              {solutions.map((hotspot, index) => {
                const isPreview = displayedSolution?.id === hotspot.id;
                const isPinnedHotspot = pinnedSolutionId === hotspot.id;

                return (
                  <button
                    key={hotspot.id}
                    aria-expanded={isPinnedHotspot}
                    aria-label={hotspot.title}
                    className={`${styles.hotspot} ${
                      isPreview ? styles.hotspotPreview : ''
                    } ${isPinnedHotspot ? styles.hotspotActive : ''}`}
                    data-hotspot-trigger="true"
                    style={{
                      ...getRenderedPoint(hotspot),
                      transitionDelay: `${index * 70}ms`,
                    }}
                    tabIndex={isInteractive ? 0 : -1}
                    type="button"
                    onFocus={() => openHotspot(hotspot.id)}
                    onBlur={scheduleClose}
                    onMouseEnter={() => openHotspot(hotspot.id)}
                    onMouseLeave={scheduleClose}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      activateHotspot(hotspot.id);
                    }}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      activateHotspot(hotspot.id);
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      activateHotspot(hotspot.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        activateHotspot(hotspot.id);
                      }
                    }}
                  >
                    <span className={styles.hotspotCore} />
                    <span className={styles.hotspotPulse} />
                  </button>
                );
              })}
            </div>

            {isInteractive && displayedSolution ? (
              <article
                ref={cardRef}
                className={cardClassName}
                style={{ ...cardPlacement, pointerEvents: 'auto' }}
                onMouseEnter={clearPendingClose}
                onMouseLeave={scheduleClose}
                onPointerEnter={clearPendingClose}
                onPointerLeave={scheduleClose}
              >
                <div className={styles.popupMedia}>
                  {previewMedia ? (
                    <img
                      alt={previewMedia.alt ?? displayedSolution.title}
                      className={styles.popupImage}
                      decoding="async"
                      data-pin-no-hover="true"
                      data-pin-nopin="true"
                      loading="lazy"
                      nopin="nopin"
                      src={previewMedia.src}
                      style={{
                        objectPosition: previewMedia.objectPosition ?? 'center center',
                      }}
                    />
                  ) : null}

                  <div className={styles.popupImageShade} />

                  <div className={styles.popupTitleBadge}>
                    <span className={styles.popupLabel}>{copy.hotspotLabel}</span>
                    <h3>{displayedSolution.title}</h3>
                  </div>

                  {isPinned ? (
                    <button
                      aria-label={copy.closeHotspot}
                      className={styles.closeButton}
                      type="button"
                      onClick={() => {
                        setHoveredSolutionId(null);
                        onClose();
                      }}
                    >
                      x
                    </button>
                  ) : null}
                </div>

                <div className={styles.popupFooter}>
                  <span className={styles.popupFooterLabel}>{copy.viewSolution}</span>

                  <button
                    className={styles.popupLink}
                    type="button"
                    onClick={() => onJumpToSolution(displayedSolution.id)}
                  >
                    <span>{copy.goToSolution}</span>
                    <svg
                      aria-hidden="true"
                      className={styles.popupLinkIcon}
                      viewBox="0 0 18 18"
                    >
                      <path
                        d="M4.25 9h8.5M9.75 4.25 14.5 9l-4.75 4.75"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ) : null}
          </div>
        </div>

        <div className={styles.introLayer} style={introLayerStyle}>
          <div
            aria-hidden="true"
            className={`${styles.scrollCue} ${styles.homeScrollCue}`}
            style={{ opacity: homeScrollCueOpacity }}
          >
            <span className={styles.scrollCueLabel}>{copy.scrollFurther}</span>
            <span className={styles.scrollCueArrow}>
              <span className={styles.scrollCueStem} />
              <span className={styles.scrollCueHead} />
            </span>
          </div>

          <div className={styles.homeBrand} style={introCardStyle}>
            <img
              alt={copy.homeLogoAlt}
              className={styles.homeBrandLogo}
              decoding="async"
              fetchpriority="high"
              height={HOME_LOGO_HEIGHT}
              src={homeLogoSrc}
              width={HOME_LOGO_WIDTH}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransitionSection;
