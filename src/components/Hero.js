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
          <p className={styles.body}>{hero.bodyP1}</p><p className={styles.body}>{hero.bodyP2}</p>
          <div className={styles.ctaGroup}>
            <a href={BOOKING_URL} className={styles.bookingBtn} target="_blank" rel="noopener noreferrer">{hero.cta} →</a>
            <div><a href="/assessment" className={styles.assessmentBtn}>{hero.assessmentCta} →</a><p className={styles.assessmentNote}>{hero.assessmentLink}</p></div>
          </div>
          <p className={styles.note}>{hero.ctaNote}</p>
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
