import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "./BookingCalendar";
import styles from "./book.module.css";

export const metadata = {
  title: "Book Your Founder Load Audit | Unbound Ascent",
  description: "30 minutes. No pitch. You'll leave knowing exactly what's tethering you to the business and where to start.",
};

export default function Book() {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Book Your Founder Load Audit</h1>
          <p className={styles.subtitle}>30 minutes. No pitch. You'll leave knowing exactly what's tethering you to the business and where to start.</p>
        </div>
        <BookingCalendar />
      </div>
      <Footer />
    </>
  );
}
