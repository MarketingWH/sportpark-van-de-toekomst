import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import InteractivePhoto from './InteractivePhoto';
import styles from './SportparkSection.module.css';

function SportparkSection({
  activeHotspot,
  hotspots,
  imageSrc,
  isPinned,
  onActiveChange,
  onClose,
  onOpenHotspot,
  onPinHotspot,
  onToggleHotspot,
}) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(viewportRef, { amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.45,
  });

  const scale = useTransform(smoothProgress, [0, 0.45, 1], [0.98, 1.01, 1.05]);
  const y = useTransform(smoothProgress, [0, 1], [36, -32]);

  useEffect(() => {
    onActiveChange(isInView);
  }, [isInView, onActiveChange]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={viewportRef} className={styles.viewport}>
        <motion.div
          className={styles.viewerWrap}
          style={reduceMotion ? undefined : { scale, y }}
        >
          <InteractivePhoto
            activeHotspot={activeHotspot}
            hotspots={hotspots}
            imageSrc={imageSrc}
            immersive
            isInteractive={isInView}
            isPinned={isPinned}
            onClose={onClose}
            onOpenHotspot={onOpenHotspot}
            onPinHotspot={onPinHotspot}
            onToggleHotspot={onToggleHotspot}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default SportparkSection;
