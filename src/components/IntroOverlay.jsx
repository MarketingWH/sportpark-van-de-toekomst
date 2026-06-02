import { AnimatePresence, motion } from 'framer-motion';
import styles from './IntroOverlay.module.css';

const navItems = [
  'Over het park',
  'Productzones',
  'Klimaatadaptatie',
  'Circulariteit',
];

const chapterDots = ['01', '02', '03', '04'];

function IntroOverlay({ visible, onStartFreeExplore, onStartTour }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.overlay}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.34 }}
        >
          <div className={styles.heroBackdrop} />
          <div className={styles.heroShade} />

          <header className={styles.header}>
            <div className={styles.logoWrap}>
              <div className={styles.logoMark}>
                <span />
                <span />
                <span />
              </div>
              <span className={styles.logoText}>Sportpark van de Toekomst</span>
            </div>

            <nav className={styles.nav}>
              {navItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>

            <span className={styles.menuHint}>Menu</span>
          </header>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className={styles.hero}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <span className={styles.kicker}>Interactieve productpresentatie</span>
            <div className={styles.titleRule} />
            <h1>
              Sportpark
              <br />
              van de Toekomst
            </h1>
            <p>
              Een immersive digital twin
              <br />
              waarin water, klimaatadaptatie en circulaire
              <br />
              sportinfrastructuur samenkomen in een hoogwaardige parkbeleving.
            </p>

            <div className={styles.actions}>
              <button className={styles.primaryAction} type="button" onClick={onStartTour}>
                Start rondleiding
              </button>
              <button className={styles.secondaryAction} type="button" onClick={onStartFreeExplore}>
                Vrij verkennen
              </button>
            </div>
          </motion.section>

          <div className={styles.scrollHint}>Scroll om te ontdekken</div>

          <aside className={styles.dotRail}>
            {chapterDots.map((dot) => (
              <span key={dot}>{dot}</span>
            ))}
          </aside>

          <section className={styles.bottomBand}>
            <div className={styles.bottomHeadline}>
              <span>Hoofdverhaal</span>
              <h2>
                WATER, SPORT,
                <br />
                LANDSCHAP.
              </h2>
            </div>

            <div className={styles.bottomCopy}>
              <p>
                Het sportpark wordt gepresenteerd als een samenhangend systeem:
                waterlijnen, bruggen, verblijfsplekken, mobiliteit en
                productzones grijpen logisch in elkaar zonder de rust van het
                landschappelijke geheel te verliezen.
              </p>
            </div>
          </section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default IntroOverlay;
