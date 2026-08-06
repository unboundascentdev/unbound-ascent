import { hero, BOOKING_URL } from "@/data/content";
import styles from "./Hero.module.css";
export default function Hero() {
  return (
    <section className={`section ${styles.hero}`} id="hero">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            {hero.headline}
            <br />
            <span className={styles.subline}>{hero.subline}</span>
          </h1>
          <p className={styles.body}>{hero.bodyP1}</p>
          <p className={styles.body}>{hero.bodyP2}</p>
          <div className={styles.ctaWrap}>
            <a
              href={BOOKING_URL}
              className={`${styles.bookingBtn} ${styles.ctaBook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.cta} &rarr;
            </a>
            <a href="/assessment" className={`${styles.assessmentBtn} ${styles.ctaAssessment}`}>
              {hero.assessmentCta} →
            </a>
            <p className={styles.ctaBookNote}>{hero.ctaNote}</p>
            <p className={styles.ctaAssessmentNote}>{hero.assessmentLink}</p>
          </div>
        </div>
        <div className={styles.imageWrap}>
          <div className={styles.frameBg} />
          <div className={styles.frameAccent} />
          <div className={styles.imageFrame}>
            <img
              src="/chris_hero.avif"
              alt="Chris Bustos - Founder Coach"
              className={styles.image}
            />
          </div>
          <div className={styles.decoCircle} />
          <div className={styles.decoSquare} />
        </div>
      </div>
    </section>
  );
}
