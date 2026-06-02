import styles from './MapOverview.module.css';

function MapOverview({ className = '' }) {
  return (
    <div className={[styles.mapVisual, className].filter(Boolean).join(' ')}>
      <svg
        aria-hidden="true"
        className={styles.mapSvg}
        viewBox="0 0 1537 1023"
      >
        <rect fill="#f7f2ea" height="1023" rx="38" width="1537" />

        <g opacity="0.45">
          <path
            d="M170 805C255 716 310 620 408 560C505 501 621 494 694 414C773 326 768 218 910 165C1016 126 1191 148 1365 109"
            fill="none"
            stroke="#c3c2b8"
            strokeDasharray="12 16"
            strokeLinecap="round"
            strokeWidth="12"
          />
          <path
            d="M116 303C235 286 298 355 438 355C624 355 679 215 866 215C1041 215 1097 332 1309 328"
            fill="none"
            stroke="#d1d0c6"
            strokeDasharray="10 14"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </g>

        <path
          d="M490 105C416 145 366 206 362 281C358 351 400 410 424 462C454 528 454 604 425 681C401 748 352 806 352 874C352 930 394 970 455 986C583 1021 734 994 821 923C917 846 913 736 887 649C853 534 815 451 845 348C871 258 954 200 1010 152"
          fill="none"
          stroke="#28585d"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="124"
        />
        <path
          d="M490 105C416 145 366 206 362 281C358 351 400 410 424 462C454 528 454 604 425 681C401 748 352 806 352 874C352 930 394 970 455 986C583 1021 734 994 821 923C917 846 913 736 887 649C853 534 815 451 845 348C871 258 954 200 1010 152"
          fill="none"
          stroke="#7eb8b0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="92"
        />

        <g fill="#d5d2c9" stroke="#d0cec3" strokeWidth="12">
          <path d="M118 829C225 748 304 672 380 613C461 550 555 495 674 459" />
          <path d="M723 492C806 535 879 598 956 702C1020 788 1077 857 1184 905" />
          <path d="M122 645C216 582 278 515 325 443C362 386 409 321 491 264" />
        </g>

        <g fill="#6e8d61" opacity="0.9">
          <circle cx="158" cy="274" r="16" />
          <circle cx="232" cy="226" r="14" />
          <circle cx="286" cy="292" r="12" />
          <circle cx="642" cy="746" r="16" />
          <circle cx="772" cy="724" r="14" />
          <circle cx="1078" cy="812" r="13" />
          <circle cx="1294" cy="688" r="16" />
          <circle cx="1174" cy="232" r="15" />
        </g>

        <g>
          <rect
            fill="#17291e"
            height="132"
            rx="16"
            transform="rotate(-10 774 363)"
            width="226"
            x="661"
            y="296"
          />
          <rect
            fill="#2f4131"
            height="92"
            rx="14"
            transform="rotate(-10 784 374)"
            width="206"
            x="674"
            y="327"
          />
        </g>

        <g fill="#95aa57" stroke="#617c34" strokeWidth="14">
          <rect height="142" rx="22" width="412" x="917" y="189" />
          <rect height="92" rx="18" width="366" x="958" y="355" />
        </g>

        <g fill="#8a8a7b" opacity="0.88">
          <rect height="22" rx="8" width="256" x="909" y="530" />
          <rect height="22" rx="8" width="256" x="917" y="567" />
          <rect height="22" rx="8" width="256" x="928" y="603" />
          <rect height="22" rx="8" width="256" x="940" y="639" />
        </g>

        <g fill="#d9d2bf" stroke="#b9b09c" strokeWidth="9">
          <rect height="174" rx="28" width="252" x="502" y="741" />
          <rect height="148" rx="28" width="162" x="1170" y="603" />
        </g>
      </svg>

      <div className={styles.badge}>Gebiedskaart</div>

      <div className={styles.legend}>
        <span>Waterstructuur</span>
        <span>Sportzones</span>
        <span>Verblijfsruimte</span>
        <span>Parkeren</span>
      </div>
    </div>
  );
}

export default MapOverview;
