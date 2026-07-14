import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./book.module.css";

export const metadata = {
  title: "Book Your Founder Load Audit | Unbound Ascent",
  description: "30 minutes. No pitch. You'll leave with clarity on what's actually driving the load and where to start.",
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
        <div className={styles.calendarWrap}>
          <iframe
            src="https://link.unboundascent.com/widget/booking/rttJmfp2ZZY42nJcEw0L"
            style={{ width: "100%", border: "none", overflow: "hidden" }}
          scrolling="no"
            id="rttJmfp2ZZY42nJcEw0L_1784035611322"
          />
        </div>
      </div>
      <Footer />
      <script src="https://link.unboundascent.com/js/form_embed.js" type="text/javascript" />
    </>
  );
}
