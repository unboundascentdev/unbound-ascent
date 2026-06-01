import styles from "./Stats.module.css";

const stats = [
  { value: "10+", label: "Hours reclaimed per week", color: "accent" },
  { value: "50+", label: "Founders coached", color: "tertiary" },
  { value: "90", label: "Day transformation plan", color: "secondary" },
  { value: "100%", label: "Free first session", color: "quaternary" },
];

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={`container ${styles.inner}`}>
        {stats.map((s, i) => (
          <div key={i} className={styles.item}>
            <span className={`${styles.value} ${styles[s.color]}`}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
