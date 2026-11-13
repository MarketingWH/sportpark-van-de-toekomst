import { casefolderUrl } from './SolutionShowcaseSection';
import styles from './Sections.module.css';

const caseImageSrc = `/media/solutions/${encodeURIComponent('Modulaire sportvloeren')}/${encodeURIComponent(
  'Modulaire sportvloer Haarlem OG.webp',
)}`;

function CaseSection({ copy }) {
  const text = copy.caseSection;

  return (
    <section aria-labelledby="cases-heading" className={`${styles.section} ${styles.caseSection}`} id="cases">
      <div className={styles.inner}>
        <div className={styles.caseGrid}>
          <figure className={styles.caseMedia}>
            <img
              alt={text.imageAlt}
              decoding="async"
              height="900"
              loading="lazy"
              src={caseImageSrc}
              width="1200"
            />
          </figure>

          <div className={styles.caseBody}>
            <span className={styles.eyebrow}>{text.eyebrow}</span>
            <h2 id="cases-heading">{text.heading}</h2>
            <p className={styles.lead}>{text.intro}</p>

            <dl className={styles.stats}>
              {text.stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>

            <blockquote className={styles.quote}>
              <p>“{text.quote}”</p>
              <footer>
                <strong>{text.quoteAuthor}</strong>, {text.quoteRole}
              </footer>
            </blockquote>

            <a
              className={styles.primaryLink}
              href={casefolderUrl}
              rel="noreferrer"
              target="_blank"
            >
              {text.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseSection;
