import { qualifier } from "@/data/content";
import styles from "./Qualifier.module.css";

export default function Qualifier() {
  return (
    <section className={`section ${styles.qualifier}`} id="qualifier">
      <div className="container">
        <h2 className={styles.title}>{qualifier.title}</h2>
        <div className={styles.cards}>
          {qualifier.items.map((item, i) => (
            <div key={i} className={`card ${styles.card}`}>
              <span className={styles.check}>✓</span>
              <p className={styles.text}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
