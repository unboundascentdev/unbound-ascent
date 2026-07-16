"use client";
import { useEffect } from "react";
import styles from "./book.module.css";

export default function BookingCalendar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.unboundascent.com/js/form_embed.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.calendarWrap}>
      <iframe
        src="https://link.unboundascent.com/widget/booking/rttJmfp2ZZY42nJcEw0L"
        style={{ width: "100%", border: "none", overflow: "hidden" }}
        scrolling="no"
        id="rttJmfp2ZZY42nJcEw0L_1784035611322"
      />
    </div>
  );
}
