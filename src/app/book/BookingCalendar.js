"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { track } from "@vercel/analytics";
import styles from "./book.module.css";

const CALENDAR_URL = "https://link.unboundascent.com/widget/booking/rttJmfp2ZZY42nJcEw0L";
const PASSTHROUGH_FIELDS = [
  "assessment_score",
  "assessment_status",
  "primary_profile",
  "secondary_profile",
  "assessment_completed_at",
  "assessment_first_completed_at",
  "assessment_latest_completed_at",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function safeTrack(name, properties = {}) {
  try {
    track(name, properties);
  } catch {
    // Booking must remain usable when analytics is unavailable.
  }
}

export default function BookingCalendar() {
  const iframeRef = useRef(null);
  const bookedRef = useRef(false);

  useEffect(() => {
    const pageParams = new URLSearchParams(window.location.search);
    const calendar = new URL(CALENDAR_URL);
    PASSTHROUGH_FIELDS.forEach((field) => {
      const value = pageParams.get(field);
      if (value) calendar.searchParams.set(field, value);
    });
    if (iframeRef.current) iframeRef.current.src = calendar.toString();
    safeTrack("owner_load_review_page_viewed", {
      assessment_score: pageParams.get("assessment_score") || "unavailable",
      primary_profile: pageParams.get("primary_profile") || "unavailable",
      source: pageParams.get("source") || "direct",
    });

    function handleMessage(event) {
      if (event.source !== iframeRef.current?.contentWindow || bookedRef.current) return;
      const raw = typeof event.data === "string" ? event.data : JSON.stringify(event.data || {});
      const eventName = raw.toLowerCase().replace(/[^a-z]/g, "");
      if (!eventName.includes("appointmentbooked") && !eventName.includes("bookingsuccess") && !eventName.includes("calendarscheduled")) return;
      bookedRef.current = true;
      safeTrack("owner_load_review_booked", {
        assessment_score: pageParams.get("assessment_score") || "unavailable",
        primary_profile: pageParams.get("primary_profile") || "unavailable",
      });
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section id="calendar" className={styles.calendarSection} aria-labelledby="calendar-title">
      <div className={styles.calendarHeading}>
        <p className={styles.eyebrow}>Choose a time</p>
        <h2 id="calendar-title">Book your Owner Load Review</h2>
      </div>
      <div className={styles.calendarWrap}>
        <iframe
          ref={iframeRef}
          src={CALENDAR_URL}
          scrolling="no"
          id="rttJmfp2ZZY42nJcEw0L_owner_load_review"
          title="Choose a time for your Owner Load Review"
        />
      </div>
      <Script id="owner-load-calendar-embed" src="https://link.unboundascent.com/js/form_embed.js" strategy="afterInteractive" />
    </section>
  );
}
