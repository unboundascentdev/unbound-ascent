"use client";
import { useState } from "react";
import { nav, BOOKING_URL } from "@/data/content";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.brand}>{nav.brand}</a>

        <div className={`${styles.links} ${open ? styles.open : ""}`}>
          {nav.links.map((l) => (
            <a key={l.label} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
          <a href={BOOKING_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            {nav.cta.label}
            <span className="btn-arrow">→</span>
          </a>
        </div>

        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
        </button>
      </div>
    </nav>
  );
}
