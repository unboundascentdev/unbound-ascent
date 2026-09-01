"use client";
import { useState } from "react";
import Link from "next/link";
import { nav } from "@/data/content";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>{nav.brand}</Link>

        <div
          id="mobile-nav-menu"
          className={`${styles.links} ${open ? styles.open : ""}`}
        >
          {nav.links.map((l) => (
            <Link key={l.label} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
          <Link href={nav.cta.href} className="btn btn-primary">
            {nav.cta.label}
            <span className="btn-arrow">→</span>
          </Link>
        </div>

        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
        </button>
      </div>
    </nav>
  );
}
