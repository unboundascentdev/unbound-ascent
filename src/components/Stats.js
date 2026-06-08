import styles from "./Stats.module.css";
export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.quote}>&ldquo;You thought business growth would lighten your load. It added complexity instead.&rdquo;</p>
      </div>
    </section>
  );
}
