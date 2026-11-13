import { useEffect, useRef, useState } from 'react';
import styles from './SiteHeader.module.css';

const navAnchors = ['oplossingen', 'cases', 'downloads', 'contact'];

function ParkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path
        d="M3 16.5h14M5 16.5V9.8l5-3.6 5 3.6v6.7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M8.3 16.5v-3.6h3.4v3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      {isOpen ? (
        <path
          d="m5 5 10 10M15 5 5 15"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      ) : (
        <path
          d="M3.5 6h13M3.5 10h13M3.5 14h13"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      )}
    </svg>
  );
}

function SiteHeader({ copy, language, onToggleLanguage, selectedCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const targetLanguage = language === 'nl' ? 'en' : 'nl';

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <a
        aria-label={copy.basketAria(selectedCount)}
        className={`${styles.pill} ${styles.basket} ${selectedCount > 0 ? styles.basketFilled : ''}`}
        href="#contact"
      >
        <ParkIcon />
        <span className={styles.basketText}>
          {selectedCount > 0 ? copy.basketLabel(selectedCount) : copy.basketEmpty}
        </span>
        {selectedCount > 0 ? (
          <span aria-hidden="true" className={styles.basketCount}>
            {selectedCount}
          </span>
        ) : null}
      </a>

      <div ref={menuRef} className={styles.menuWrap}>
        <button
          ref={menuButtonRef}
          aria-controls="site-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? copy.closeMenu : copy.menu}
          className={styles.pill}
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <MenuIcon isOpen={isMenuOpen} />
          <span className={styles.hideOnSmall}>{copy.menu}</span>
        </button>

        <nav
          aria-label={copy.navLabel}
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}
          hidden={!isMenuOpen}
          id="site-menu"
        >
          <ul>
            {navAnchors.map((anchor) => (
              <li key={anchor}>
                <a href={`#${anchor}`} onClick={() => setIsMenuOpen(false)}>
                  {copy.navItems[anchor]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <button
        aria-label={copy.languageLabel}
        className={styles.pill}
        lang={targetLanguage}
        type="button"
        onClick={onToggleLanguage}
      >
        <span aria-hidden="true" className={styles.languageCode}>
          {targetLanguage.toUpperCase()}
        </span>
        <span className={styles.hideOnSmall}>{copy.languageToggle}</span>
      </button>
    </header>
  );
}

export default SiteHeader;
