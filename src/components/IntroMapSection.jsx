import { motion, useReducedMotion } from 'framer-motion';
import MapOverview from './MapOverview';
import styles from './IntroMapSection.module.css';

function IntroMapSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.backdropGlow} />

      <motion.div
        className={styles.copyPanel}
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>Sportpark van de toekomst, eerst als visiekaart.</h1>
        <p>
          Begin met het gebiedsoverzicht en scroll daarna letterlijk het park in.
          Zo ontstaat een rustige, hoogwaardige introductie voordat de
          interactieve parkervaring zichtbaar wordt.
        </p>
        <span className={styles.scrollHint}>Scroll om het park te ontdekken</span>
      </motion.div>

      <motion.div
        className={styles.frameShell}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.2, 1, 0.22, 1], delay: 0.08 }}
      >
        <div className={styles.frameMat} />
        <MapOverview className={styles.frameSurface} />
      </motion.div>
    </section>
  );
}

export default IntroMapSection;
