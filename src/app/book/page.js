import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "./BookingCalendar";
import styles from "./book.module.css";

export const metadata = {
  title: "Owner Load Review | Unbound Ascent",
  description: "A thirty minute working conversation to identify what the business should stop depending on you for first.",
};

export default function Book() {
  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Thirty minute working conversation</p>
          <h1 className={styles.title}>Decide what the business should stop depending on you for first</h1>
          <p className={styles.subtitle}>We will use your Owner Load result to identify the responsibility, decision, or recurring problem creating the most pressure and define the first step for transferring it.</p>
          <a className={styles.chooseButton} href="#calendar">Choose a Time <span>↓</span></a>
        </header>

        <section className={styles.reviewDetails} aria-labelledby="review-details-title">
          <h2 id="review-details-title">What happens during the review</h2>
          <ul>
            <li>Clarify the result you want the business to produce during the next six to twelve months.</li>
            <li>Identify where your time and attention are currently being consumed.</li>
            <li>Test whether your current priorities and decisions support both the business goal and the life you want it to make possible.</li>
            <li>Choose one pressure point to transfer, reduce, or redesign first.</li>
          </ul>
          <div className={styles.expectation}>
            <h3>A practical working conversation</h3>
            <p>You will leave with a clear first move. If I believe I can help beyond the review, I will explain the relevant option and you can decide whether it fits.</p>
          </div>
        </section>

        <BookingCalendar />
      </main>
      <Footer />
    </>
  );
}
