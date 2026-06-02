import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './InteractivePhoto.module.css';

function InteractivePhoto({
  activeHotspot,
  hotspots,
  imageSrc,
  immersive = false,
  isInteractive,
  isPinned,
  onClose,
  onOpenHotspot,
  onPinHotspot,
  onToggleHotspot,
}) {
  const cardRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const supportsHoverRef = useRef(false);
  const photoSurfaceRef = useRef(null);
  const [surfaceSize, setSurfaceSize] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 1537, height: 1023 });

  const clearPendingClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openHotspot = (hotspotId) => {
    if (!isInteractive) {
      return;
    }

    clearPendingClose();
    onOpenHotspot(hotspotId);
  };

  const scheduleClose = () => {
    if (!supportsHoverRef.current || isPinned || !isInteractive) {
      return;
    }

    clearPendingClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      onClose();
    }, 140);
  };

  const handleHotspotClick = (hotspotId) => {
    if (!isInteractive) {
      return;
    }

    clearPendingClose();

    if (supportsHoverRef.current) {
      onPinHotspot(hotspotId);
      return;
    }

    onToggleHotspot(hotspotId);
  };

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
      clearPendingClose();
    };
  }, []);

  useEffect(() => {
    if (!activeHotspot) {
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

      onClose();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [activeHotspot, onClose]);

  useEffect(() => {
    if (!activeHotspot) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeHotspot, onClose]);

  useEffect(() => {
    if (!immersive || !photoSurfaceRef.current || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      const { width, height } = entry.contentRect;
      setSurfaceSize({ width, height });
    });

    observer.observe(photoSurfaceRef.current);

    return () => {
      observer.disconnect();
    };
  }, [immersive]);

  const coverMetrics = useMemo(() => {
    if (!immersive || !surfaceSize.width || !surfaceSize.height || !imageSize.width || !imageSize.height) {
      return null;
    }

    const scale = Math.max(
      surfaceSize.width / imageSize.width,
      surfaceSize.height / imageSize.height,
    );

    const width = imageSize.width * scale;
    const height = imageSize.height * scale;

    return {
      width,
      height,
      offsetX: (surfaceSize.width - width) / 2,
      offsetY: (surfaceSize.height - height) / 2,
    };
  }, [immersive, imageSize.height, imageSize.width, surfaceSize.height, surfaceSize.width]);

  const getHotspotPosition = (hotspot) => {
    if (!immersive || !coverMetrics) {
      return {
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
      };
    }

    return {
      left: `${coverMetrics.offsetX + (hotspot.x / 100) * coverMetrics.width}px`,
      top: `${coverMetrics.offsetY + (hotspot.y / 100) * coverMetrics.height}px`,
    };
  };

  const cardPlacement = activeHotspot
    ? getHotspotPosition(activeHotspot)
    : undefined;

  const cardClassName = activeHotspot
    ? [
        styles.popup,
        activeHotspot.x > 55 ? styles.alignRight : styles.alignLeft,
        activeHotspot.y > 58 ? styles.alignTop : styles.alignBottom,
      ].join(' ')
    : styles.popup;

  const photoFrameClassName = [
    styles.photoFrame,
    immersive ? styles.photoFrameImmersive : '',
  ].join(' ');

  const photoStageClassName = [
    styles.photoStage,
    immersive ? styles.photoStageImmersive : '',
  ].join(' ');

  const photoMatClassName = [
    styles.photoMat,
    immersive ? styles.photoMatImmersive : '',
  ].join(' ');

  const photoSurfaceClassName = [
    styles.photoSurface,
    immersive ? styles.photoSurfaceImmersive : '',
  ].join(' ');

  const photoClassName = [styles.photo, immersive ? styles.photoImmersive : ''].join(' ');

  return (
    <section className={styles.wrapper}>
      <div className={photoFrameClassName}>
        <img
          alt=""
          aria-hidden="true"
          className={styles.photoBackdrop}
          data-pin-no-hover="true"
          data-pin-nopin="true"
          nopin="nopin"
          src={imageSrc}
        />

        <div className={styles.photoBackdropShade} />

        <div className={photoStageClassName}>
          <div className={photoMatClassName} />

          <div ref={photoSurfaceRef} className={photoSurfaceClassName}>
            <img
              alt="Overzicht van het sportpark met klimaatadaptieve productzones"
              className={photoClassName}
              data-pin-no-hover="true"
              data-pin-nopin="true"
              nopin="nopin"
              src={imageSrc}
              onLoad={(event) => {
                const target = event.currentTarget;

                if (target.naturalWidth && target.naturalHeight) {
                  setImageSize({
                    width: target.naturalWidth,
                    height: target.naturalHeight,
                  });
                }
              }}
            />

            <div
              aria-hidden={!isInteractive}
              className={`${styles.hotspotLayer} ${isInteractive ? styles.hotspotLayerVisible : ''}`}
            >
              {hotspots.map((hotspot, index) => {
                const isActive = activeHotspot?.id === hotspot.id;

                return (
                  <button
                    key={hotspot.id}
                    aria-expanded={isActive}
                    aria-label={hotspot.title}
                    className={`${styles.hotspot} ${isActive ? styles.hotspotActive : ''}`}
                    data-hotspot-trigger="true"
                    style={{
                      ...getHotspotPosition(hotspot),
                      transitionDelay: `${index * 70}ms`,
                    }}
                    tabIndex={isInteractive ? 0 : -1}
                    type="button"
                    onFocus={() => openHotspot(hotspot.id)}
                    onBlur={scheduleClose}
                    onMouseEnter={() => openHotspot(hotspot.id)}
                    onMouseLeave={scheduleClose}
                    onPointerEnter={() => openHotspot(hotspot.id)}
                    onPointerLeave={scheduleClose}
                    onClick={() => handleHotspotClick(hotspot.id)}
                  >
                    <span className={styles.hotspotCore} />
                    <span className={styles.hotspotPulse} />
                  </button>
                );
              })}
            </div>

            {isInteractive && activeHotspot ? <div className={styles.backdrop} /> : null}

            {isInteractive && activeHotspot ? (
              <article
                ref={cardRef}
                className={cardClassName}
                style={cardPlacement}
                onMouseEnter={clearPendingClose}
                onMouseLeave={scheduleClose}
                onPointerEnter={clearPendingClose}
                onPointerLeave={scheduleClose}
              >
                <button
                  aria-label="Sluit hotspotinformatie"
                  className={styles.closeButton}
                  type="button"
                  onClick={onClose}
                >
                  x
                </button>

                <div className={styles.popupBody}>
                  <span className={styles.popupLabel}>Hotspot</span>
                  <h3>{activeHotspot.title}</h3>
                  <p>{activeHotspot.description}</p>

                  {activeHotspot.image ? (
                    <img
                      alt={activeHotspot.title}
                      className={styles.popupImage}
                      data-pin-no-hover="true"
                      data-pin-nopin="true"
                      nopin="nopin"
                      src={activeHotspot.image}
                    />
                  ) : null}

                  {activeHotspot.buttonText && activeHotspot.url ? (
                    <a
                      className={styles.popupLink}
                      href={activeHotspot.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {activeHotspot.buttonText}
                    </a>
                  ) : null}
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractivePhoto;
