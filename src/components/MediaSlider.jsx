import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './MediaSlider.module.css';

let youTubeApiPromise;

function getYouTubeVideoId(item) {
  if (item.youtubeId) {
    return item.youtubeId;
  }

  if (!item.url) {
    return '';
  }

  try {
    const parsed = new URL(item.url);

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }

    return parsed.searchParams.get('v') ?? '';
  } catch {
    return '';
  }
}

function getYouTubeThumbnailCandidates(item) {
  const videoId = getYouTubeVideoId(item);
  return videoId
    ? [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      ]
    : [];
}

function getYouTubeEmbedUrl(item, autoplay = false) {
  const videoId = getYouTubeVideoId(item);

  if (!videoId) {
    return '';
  }

  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: '1',
    fs: '1',
    iv_load_policy: '3',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function loadYouTubeApi() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youTubeApiPromise) {
    return youTubeApiPromise;
  }

  youTubeApiPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-youtube-iframe-api="true"]');
    const previousReadyHandler = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      resolve(window.YT);
    };

    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.dataset.youtubeIframeApi = 'true';
    script.onerror = () => reject(new Error('YouTube iframe API kon niet laden.'));
    document.head.appendChild(script);
  });

  return youTubeApiPromise;
}

function applyNextThumbnailSource(image, candidates, fallbackImageSlide) {
  const currentIndex = Number(image.dataset.thumbnailIndex ?? '0');
  const nextIndex = currentIndex + 1;

  if (nextIndex < candidates.length) {
    image.dataset.thumbnailIndex = String(nextIndex);
    image.src = candidates[nextIndex];
    return true;
  }

  if (fallbackImageSlide?.src) {
    image.dataset.thumbnailIndex = String(candidates.length);
    image.src = fallbackImageSlide.src;
    image.style.objectPosition = fallbackImageSlide.objectPosition ?? 'center center';
    return true;
  }

  return false;
}

function MediaSlider({ media, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingYouTubeIndex, setPlayingYouTubeIndex] = useState(null);
  const [youTubePlaybackState, setYouTubePlaybackState] = useState('idle');
  const playerHostRef = useRef(null);
  const youTubePlayerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchDeltaRef = useRef({ x: 0, y: 0 });

  const slides = useMemo(() => media?.filter(Boolean) ?? [], [media]);
  const activeSlide = slides[activeIndex] ?? null;
  const activeYouTubeThumbnailCandidates =
    activeSlide?.type === 'youtube' ? getYouTubeThumbnailCandidates(activeSlide) : [];
  const fallbackImageSlide = slides.find((slide) => slide?.type === 'image') ?? null;
  const isVideoSlide = activeSlide?.type === 'youtube' || activeSlide?.type === 'video';
  const isInlineYouTubePlaying =
    activeSlide?.type === 'youtube' && playingYouTubeIndex === activeIndex;
  const activeYouTubeVideoId =
    activeSlide?.type === 'youtube' ? getYouTubeVideoId(activeSlide) : '';
  const isYouTubeActivelyPlaying =
    isInlineYouTubePlaying &&
    ['playing', 'buffering', 'loading'].includes(youTubePlaybackState);
  const showInlineVideoNavigation = isInlineYouTubePlaying && !isYouTubeActivelyPlaying;
  const showFrameArrowNavigation = !isInlineYouTubePlaying;
  const showControls = slides.length > 1;

  const destroyInlineYouTubePlayer = () => {
    if (youTubePlayerRef.current?.destroy) {
      youTubePlayerRef.current.destroy();
    }

    youTubePlayerRef.current = null;

    if (playerHostRef.current) {
      playerHostRef.current.innerHTML = '';
    }
  };

  const stopInlineYouTubePlayback = () => {
    destroyInlineYouTubePlayer();
    setPlayingYouTubeIndex(null);
    setYouTubePlaybackState('idle');
  };

  const resumeInlineYouTubePlayback = () => {
    youTubePlayerRef.current?.playVideo?.();
    setYouTubePlaybackState('playing');
  };

  useEffect(() => {
    setActiveIndex(0);
    stopInlineYouTubePlayback();
  }, [slides.length, title]);

  useEffect(() => () => destroyInlineYouTubePlayer(), []);

  useEffect(() => {
    if (!isInlineYouTubePlaying || !activeYouTubeVideoId || !playerHostRef.current) {
      return undefined;
    }

    let cancelled = false;
    let mountedPlayer = null;

    setYouTubePlaybackState('loading');

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !YT?.Player || !playerHostRef.current) {
          return;
        }

        destroyInlineYouTubePlayer();

        mountedPlayer = new YT.Player(playerHostRef.current, {
          height: '100%',
          width: '100%',
          videoId: activeYouTubeVideoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            fs: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            origin: window.location.origin,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              if (cancelled) {
                return;
              }

              event.target.playVideo();
              setYouTubePlaybackState('playing');
            },
            onStateChange: (event) => {
              if (cancelled) {
                return;
              }

              switch (event.data) {
                case window.YT.PlayerState.PLAYING:
                  setYouTubePlaybackState('playing');
                  break;
                case window.YT.PlayerState.BUFFERING:
                  setYouTubePlaybackState('buffering');
                  break;
                case window.YT.PlayerState.PAUSED:
                case window.YT.PlayerState.CUED:
                case window.YT.PlayerState.UNSTARTED:
                  setYouTubePlaybackState('paused');
                  break;
                case window.YT.PlayerState.ENDED:
                  setYouTubePlaybackState('ended');
                  break;
                default:
                  break;
              }
            },
            onError: () => {
              if (!cancelled) {
                setYouTubePlaybackState('paused');
              }
            },
          },
        });

        youTubePlayerRef.current = mountedPlayer;
      })
      .catch(() => {
        if (!cancelled) {
          setYouTubePlaybackState('paused');
        }
      });

    return () => {
      cancelled = true;

      if (mountedPlayer?.destroy) {
        mountedPlayer.destroy();
      }

      if (youTubePlayerRef.current === mountedPlayer) {
        youTubePlayerRef.current = null;
      }

      if (playerHostRef.current) {
        playerHostRef.current.innerHTML = '';
      }
    };
  }, [activeYouTubeVideoId, isInlineYouTubePlaying]);

  const goToPrevious = () => {
    stopInlineYouTubePlayback();
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    stopInlineYouTubePlayback();
    setActiveIndex((currentIndex) =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const handleTouchStart = (event) => {
    if (event.touches.length !== 1 || isYouTubeActivelyPlaying) {
      touchStartRef.current = null;
      touchDeltaRef.current = { x: 0, y: 0 };
      return;
    }

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchDeltaRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (event) => {
    if (!touchStartRef.current || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    touchDeltaRef.current = {
      x: touch.clientX - touchStartRef.current.x,
      y: touch.clientY - touchStartRef.current.y,
    };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current) {
      return;
    }

    const { x, y } = touchDeltaRef.current;
    const isHorizontalSwipe = Math.abs(x) > 54 && Math.abs(x) > Math.abs(y) * 1.25;

    touchStartRef.current = null;
    touchDeltaRef.current = { x: 0, y: 0 };

    if (!isHorizontalSwipe) {
      return;
    }

    if (x < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  return (
    <div className={styles.slider}>
      <div
        className={`${styles.mediaFrame} ${
          activeSlide?.type === 'youtube' ? styles.mediaFrameYoutube : ''
        } ${isVideoSlide ? styles.mediaFrameVideo : ''}`}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        {activeSlide?.type === 'youtube' ? (
          isInlineYouTubePlaying ? (
            <>
              <iframe
                aria-hidden="true"
                className={styles.youtubeInlineFallback}
                src={getYouTubeEmbedUrl(activeSlide, false)}
                tabIndex="-1"
                title=""
              />
              <div
                className={`${styles.youtubePlayerHost} ${
                  showInlineVideoNavigation ? styles.youtubePlayerHostPaused : ''
                }`}
                ref={playerHostRef}
              />
              {showInlineVideoNavigation ? (
                <div className={styles.youtubeInteractionOverlay}>
                  <button
                    aria-label="Vorige slide"
                    className={`${styles.arrowButton} ${styles.arrowLeft} ${styles.arrowButtonOverlay}`}
                    type="button"
                    onClick={goToPrevious}
                  >
                    <svg aria-hidden="true" className={styles.arrowIcon} viewBox="0 0 24 24">
                      <path
                        d="M14.5 6.5 9 12l5.5 5.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.85"
                      />
                    </svg>
                  </button>

                  <button
                    aria-label={
                      youTubePlaybackState === 'ended'
                        ? 'Speel video opnieuw af'
                        : 'Video hervatten'
                    }
                    className={styles.youtubeResumeButton}
                    type="button"
                    onClick={resumeInlineYouTubePlayback}
                  >
                    <svg aria-hidden="true" className={styles.youtubeResumeIcon} viewBox="0 0 24 24">
                      <path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" />
                    </svg>
                  </button>

                  <button
                    aria-label="Volgende slide"
                    className={`${styles.arrowButton} ${styles.arrowRight} ${styles.arrowButtonOverlay}`}
                    type="button"
                    onClick={goToNext}
                  >
                    <svg aria-hidden="true" className={styles.arrowIcon} viewBox="0 0 24 24">
                      <path
                        d="M9.5 6.5 15 12l-5.5 5.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.85"
                      />
                    </svg>
                  </button>
                </div>
              ) : null}
              <button
                aria-label="Sluit video"
                className={styles.youtubeCloseButton}
                type="button"
                onClick={stopInlineYouTubePlayback}
              >
                x
              </button>
            </>
          ) : (
            <button
              aria-label={`Open video: ${activeSlide.title ?? title}`}
              className={styles.youtubeCard}
              type="button"
              onClick={() => {
                stopInlineYouTubePlayback();
                setPlayingYouTubeIndex(activeIndex);
              }}
            >
              <img
                alt={activeSlide.title ?? title}
                className={styles.youtubePoster}
                decoding="async"
                data-pin-no-hover="true"
                data-pin-nopin="true"
                data-thumbnail-index="0"
                loading="lazy"
                nopin="nopin"
                src={activeYouTubeThumbnailCandidates[0] ?? fallbackImageSlide?.src ?? ''}
                style={{
                  objectPosition:
                    fallbackImageSlide?.objectPosition ?? 'center center',
                }}
                onLoad={(event) => {
                  const image = event.currentTarget;
                  const usingYoutubeThumb =
                    Number(image.dataset.thumbnailIndex ?? '0') < activeYouTubeThumbnailCandidates.length;

                  if (!usingYoutubeThumb) {
                    return;
                  }

                  const isSuspiciousPlaceholder =
                    image.naturalWidth <= 160 ||
                    image.naturalHeight <= 120 ||
                    (image.naturalWidth <= 320 && image.naturalHeight <= 180);

                  if (isSuspiciousPlaceholder) {
                    applyNextThumbnailSource(
                      image,
                      activeYouTubeThumbnailCandidates,
                      fallbackImageSlide,
                    );
                  }
                }}
                onError={(event) => {
                  const image = event.currentTarget;
                  applyNextThumbnailSource(
                    image,
                    activeYouTubeThumbnailCandidates,
                    fallbackImageSlide,
                  );
                }}
              />
              <span className={styles.youtubeShade} />
              <span className={styles.youtubePlayButton} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" />
                </svg>
              </span>
              <span className={styles.youtubeMeta}>
                <span className={styles.youtubeMetaLabel}>Video</span>
                <strong>{activeSlide.title ?? title}</strong>
              </span>
              <span className={styles.youtubeBadge}>Speel video</span>
            </button>
          )
        ) : activeSlide?.type === 'video' ? (
          <video
            autoPlay
            className={styles.video}
            loop
            muted
            playsInline
            preload="metadata"
            src={activeSlide?.src}
          >
            Je browser ondersteunt deze video niet.
          </video>
        ) : (
          <img
            alt={activeSlide?.alt ?? title}
            className={styles.image}
            decoding="async"
            data-pin-no-hover="true"
            data-pin-nopin="true"
            loading="lazy"
            nopin="nopin"
            src={activeSlide?.src}
            style={{
              objectPosition: activeSlide?.objectPosition ?? 'center center',
            }}
          />
        )}

        {showControls ? (
          <>
            <button
              aria-label="Vorige slide"
              className={`${styles.arrowButton} ${styles.arrowLeft} ${
                showFrameArrowNavigation ? '' : styles.arrowButtonHidden
              }`}
              type="button"
              onClick={goToPrevious}
            >
              <svg aria-hidden="true" className={styles.arrowIcon} viewBox="0 0 24 24">
                <path
                  d="M14.5 6.5 9 12l5.5 5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.85"
                />
              </svg>
            </button>

            <button
              aria-label="Volgende slide"
              className={`${styles.arrowButton} ${styles.arrowRight} ${
                showFrameArrowNavigation ? '' : styles.arrowButtonHidden
              }`}
              type="button"
              onClick={goToNext}
            >
              <svg aria-hidden="true" className={styles.arrowIcon} viewBox="0 0 24 24">
                <path
                  d="M9.5 6.5 15 12l-5.5 5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.85"
                />
              </svg>
            </button>
          </>
        ) : null}
      </div>

      {showControls ? (
        <div className={styles.footer}>
          <div className={styles.dots}>
            {slides.map((slide, index) => (
              <button
                key={`${slide.type}-${slide.label ?? index}`}
                aria-label={`Ga naar slide ${index + 1}`}
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                type="button"
                onClick={() => {
                  stopInlineYouTubePlayback();
                  setActiveIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MediaSlider;
