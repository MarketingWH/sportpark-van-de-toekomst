import { motion } from 'framer-motion';
import styles from './Controls.module.css';

function Controls({
  freeExplore,
  products,
  selectedId,
  started,
  tourActive,
  onOpenOverview,
  onSelectProduct,
  onStartTour,
  onToggleFreeExplore,
}) {
  if (!started) {
    return null;
  }

  return (
    <>
      <motion.aside
        animate={{ opacity: 1, x: 0 }}
        className={styles.routeRail}
        initial={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.34, delay: 0.1 }}
      >
        <span className={styles.routeLabel}>Route</span>

        <div className={styles.routeItems}>
          {products.map((product, index) => {
            const isActive = selectedId === product.id;

            return (
              <button
                key={product.id}
                className={`${styles.routeItem} ${isActive ? styles.routeItemActive : ''}`}
                type="button"
                onClick={() => onSelectProduct(product.id)}
              >
                <span className={styles.routeMeta}>
                  <small>{product.zone}</small>
                  <strong>{product.shortLabel}</strong>
                </span>
                <span className={styles.routeIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </motion.aside>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={styles.controlDock}
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.34, delay: 0.16 }}
      >
        <button
          className={`${styles.controlButton} ${tourActive ? styles.controlButtonActive : ''}`}
          type="button"
          onClick={onStartTour}
        >
          Rondleiding
        </button>
        <button
          className={`${styles.controlButton} ${freeExplore ? styles.controlButtonActive : ''}`}
          type="button"
          onClick={onToggleFreeExplore}
        >
          Vrij verkennen
        </button>
        <button className={styles.controlButton} type="button" onClick={onOpenOverview}>
          Terug naar overzicht
        </button>
      </motion.div>

      <div className={styles.discoverHint}>Selecteer een zone of gebruik de rondleiding</div>
    </>
  );
}

export default Controls;
