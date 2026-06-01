import { about, BOOKING_URL } from "@/data/content";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className={`container ${styles.inner}`}>
        <div className={styles.imageWrap}>
          <div className={styles.imageFrame}>
            <img
              src="/chris_about.avif"
              alt="Chris Bustos"
              className={styles.image}
            />
          </div>
          <div className={styles.decoCircle} />
        </div>
        <div className={styles.content}>
          <span className="tag">{about.title}</span>
          <p className={styles.body}>{about.body}</p>
          <p className={styles.bg}>{about.background}</p>
          <a
            href={BOOKING_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {about.cta}
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
