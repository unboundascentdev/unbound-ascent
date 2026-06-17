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
          <div style={{display:"flex",flexDirection:"row",gap:"24px",alignItems:"flex-start",marginBottom:"var(--space-md)"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"8px",maxWidth:"280px"}}>
              <a href={BOOKING_URL} className={styles.bookingBtn} target="_blank" rel="noopener noreferrer">{hero.cta} &rarr;</a>
              <p style={{fontSize:"0.875rem",color:"#555",margin:0}}>{hero.ctaNote}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              <a href="/assessment" className={styles.assessmentBtn}>{hero.assessmentCta} →</a>
              <p style={{fontSize:"0.875rem",color:"#555",margin:0}}>{hero.assessmentLink}</p>
            </div>
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
