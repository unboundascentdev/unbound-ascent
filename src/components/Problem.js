import { problem } from "@/data/content";
import styles from "./Problem.module.css";

const icons = ["", "", "", ""];
const shadows = ["card-accent", "card-secondary", "card-tertiary", "card-quaternary"];

export default function Problem() {
  return (
    <section className={`section ${styles.problem}`} id="problem">
      <div className="container">
        <h2 className={styles.title}>{problem.title}</h2>
        <div className={styles.grid}>
          {problem.points.map((point, i) => (
            <div key={i} className={`card ${shadows[i]} ${styles.card}`}>
              <p className={styles.text}>{point}</p>
            </div>
          ))}
        </div>
        <p className={styles.closer}>{problem.closer}</p>
      </div>
    </section>
  );
}
