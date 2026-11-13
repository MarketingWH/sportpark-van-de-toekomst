import styles from './Sections.module.css';

function SiteFooter({ copy }) {
  const text = copy.footer;

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} ${styles.footerGrid}`}>
        <div>
          <p className={styles.footerBrand}>GreenMatter B.V.</p>
          <p>{text.tagline}</p>
          <p className={styles.footerMotto}>Recycle the present, save the future</p>
        </div>

        <div>
          <h2>{text.contactHeading}</h2>
          <ul>
            <li>
              <a href="tel:+31252683300">+31 (0)252 683 300</a>
            </li>
            <li>
              <a href="mailto:info@greenmatter.nl">info@greenmatter.nl</a>
            </li>
            <li>
              <a href="https://nl.linkedin.com/company/greenmatter-b-v" rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2>{text.officesHeading}</h2>
          <address>
            Haverstraat 71
            <br />
            2153 GD Nieuw-Vennep
          </address>
          <address>
            Prinsengracht 2
            <br />
            8607 AD Sneek
            <br />
            <a href="tel:+31515487654">+31 (0)515 487 654</a>
          </address>
        </div>

        <div>
          <h2>{text.linksHeading}</h2>
          <ul>
            <li>
              <a href="https://greenmatter.nl/" rel="noreferrer" target="_blank">
                {text.website}
              </a>
            </li>
            <li>
              <a href="https://whplay.nl/" rel="noreferrer" target="_blank">
                {text.whplay}
              </a>
            </li>
            <li>
              <a href="https://www.greenmatter.nl/privacyverklaring/" rel="noreferrer" target="_blank">
                {text.privacy}
              </a>
            </li>
            <li>
              <a href="https://www.greenmatter.nl/leveringsvoorwaarden/" rel="noreferrer" target="_blank">
                {text.terms}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
