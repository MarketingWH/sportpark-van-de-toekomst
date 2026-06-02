import { AnimatePresence, motion } from 'framer-motion';
import styles from './InfoPanel.module.css';

function InfoPanel({ index = 0, product, total, onClose, onNext, onOpenOverview }) {
  return (
    <AnimatePresence mode="wait">
      {product ? (
        <motion.aside
          key={product.id}
          animate={{ opacity: 1, y: 0 }}
          className={styles.panel}
          exit={{ opacity: 0, y: 22 }}
          initial={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            aria-label="Sluit informatie"
            className={styles.closeButton}
            type="button"
            onClick={onClose}
          >
            x
          </button>

          <div className={styles.panelInner}>
            <section className={styles.headBlock}>
              <span className={styles.zone}>
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} {product.zone}
              </span>
              <h2>{product.title}</h2>
            </section>

            <section className={styles.copyBlock}>
              <p className={styles.summary}>{product.summary}</p>

              <div className={styles.section}>
                <span>Waarom dit werkt</span>
                <p>{product.description}</p>
              </div>
            </section>

            <section className={styles.detailBlock}>
              <div className={styles.section}>
                <span>Projectvoordelen</span>
                <ul>
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.stats}>
                {product.stats.slice(0, 4).map((stat) => (
                  <article key={stat.label} className={styles.statItem}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </article>
                ))}
              </div>

              <div className={styles.actions}>
                <button type="button" onClick={onNext}>
                  Volgende halte
                </button>
                <button type="button" onClick={onOpenOverview}>
                  Terug naar overzicht
                </button>
              </div>
            </section>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

export default InfoPanel;
