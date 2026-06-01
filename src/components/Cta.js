import { BOOKING_URL } from "@/data/content";
import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <section className={`section ${styles.section}`} id="cta">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.cardBg} />
          <div className={styles.inner}>
            <h2 className={styles.title}>
              What would change if you weren't carrying all of this alone?
            </h2>
            <p className={styles.sub}>
              One conversation won't fix everything. But it will give you clarity
              on exactly what to change first.
            </p>
            <a
              href={BOOKING_URL}
              className={styles.btn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Free Clarity Call
              <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
