import { process } from "@/data/content";
import styles from "./Process.module.css";

const colors = ["icon-badge-accent", "icon-badge-secondary", "icon-badge-tertiary"];

export default function Process() {
  return (
    <section className={`section ${styles.process}`} id="process">
      <div className="container">
        <h2 className={styles.title}>{process.title}</h2>
        <div className={styles.steps}>
          {process.steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={`icon-badge ${colors[i]} ${styles.number}`}>
                {step.number}
              </div>
              <div className={styles.connector} />
              <h3 className={styles.label}>{step.label}</h3>
              <p className={styles.desc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
