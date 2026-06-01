import { testimonials } from "@/data/content";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={`section ${styles.testimonials}`} id="testimonials">
      <div className="container">
        <h2 className={styles.title}>{testimonials.title}</h2>
        <p className={styles.sub}>Real words from real founders who stopped carrying it all.</p>
        <div className={styles.grid}>
          {testimonials.items.map((t, i) => (
            <div key={i} className={styles.bubble}>
              <div className={styles.card}>
                <p className={styles.quote}>"{t.quote}"</p>
              </div>
              <div className={styles.tail} />
              <div className={styles.author}>
                <div className={styles.avatar}>{t.name.charAt(0)}</div>
                <div>
                  <p className={styles.name}>{t.name}</p>
                  {t.role && <p className={styles.role}>{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
