import { footer, nav, BOOKING_URL } from "@/data/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="squiggle-divider" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <h3 className={styles.logo}>{footer.brand}</h3>
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Menu</h4>
          {nav.links.map((l) => (
            <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
          ))}
          <a href={BOOKING_URL} className={styles.link} target="_blank" rel="noopener noreferrer">
            Book A Free Session
          </a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <a href={`mailto:${footer.email}`} className={styles.link}>{footer.email}</a>
          <a href={`tel:+18329534901`} className={styles.link}>{footer.phone}</a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>© {new Date().getFullYear()} Unbound Ascent. All rights reserved.</p>
      </div>
    </footer>
  );
}
