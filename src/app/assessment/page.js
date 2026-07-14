"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BOOKING_URL } from "@/data/content";
import styles from "./assessment.module.css";

const questions = [
  {
    q: "How often does your business require your attention outside of normal work hours?",
    opts: ["Almost Never", "Once or twice a week", "A few times per week", "Almost every day", "Multiple times every day"],
  },
  {
    q: "If you took a completely unplugged 7-day vacation tomorrow, what would happen?",
    opts: ["The business would operate normally", "A few things would need my attention afterward", "Some important things would likely stall", "Major issues would arise", "Everything would come to a halt"],
  },
  {
    q: "How often do team members come to you for decisions they could probably make themselves?",
    opts: ["Rarely", "Occasionally", "Weekly", "Daily", "Constantly"],
  },
  {
    q: "At the end of a typical week, how often do you feel like you spent your time on the wrong things?",
    opts: ["Almost Never", "Occasionally", "About Half the Time", "Frequently", "Almost Always"],
  },
  {
    q: "How would you describe your current workload?",
    opts: ["Very manageable", "Busy but manageable", "Frequently overwhelming", "Constantly overwhelming", "I'm barely keeping up"],
  },
  {
    q: "How often are you putting out unexpected fires?",
    opts: ["Rarely", "A few times per month", "Weekly", "Several times per week", "Daily"],
  },
  {
    q: "How easy would it be to hand off 25% of your responsibilities?",
    opts: ["Very easy", "Somewhat easy", "Possible but difficult", "Very difficult", "Nearly impossible"],
  },
  {
    q: "How much of your business exists only in your head?",
    opts: ["Almost none", "A small amount", "Some important parts", "Most important parts", "Nearly everything"],
  },
  {
    q: "When was the last time you had uninterrupted time to think strategically about the future of your business?",
    opts: ["This week", "Within the last month", "Within the last 3 months", "More than 3 months ago", "I honestly can't remember"],
  },
  {
    q: "Which statement best describes how you currently feel about your business?",
    opts: ["I feel in control", "I feel busy but optimistic", "I feel stretched thin", "I feel trapped by the business", "I feel like things would fall apart without my constant involvement"],
  },
];

const points = [10, 8, 6, 3, 0];

function getResult(score) {
  if (score <= 40) {
    return {
      tier: "Founder Dependency is High",
      color: "#EF4444",
      description: "Your business relies heavily on your time, attention, and decision-making. Growth is likely creating more pressure instead of more freedom.",
      insight: "The most common pattern at this stage is decision flow — most decisions are still traveling to you because no one else has been given clear authority to resolve them.",
      cta: "Let's identify exactly where the dependency lives and what one change would create the most immediate relief.",
    };
  }
  if (score <= 70) {
    return {
      tier: "Founder Dependency is Moderate",
      color: "#F59E0B",
      description: "You've built some leverage, but there are still key areas of the business that depend too much on you.",
      insight: "At this stage the dependency is usually concentrated in 1-2 specific areas. A single conversation is often enough to identify exactly where.",
      cta: "Let's pinpoint which areas are creating the most drag and what moves when you address them.",
    };
  }
  return {
    tier: "Founder Dependency is Low",
    color: "#10B981",
    description: "You've created systems, delegation, and structure that reduce dependency on you.",
    insight: "The next challenge at this stage is usually role evolution — making sure your involvement is where it actually needs to be as the business grows.",
    cta: "Let's make sure your role is evolving with the business so you're focused where it actually matters.",
  };
}

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const answered = Object.keys(answers).length;
  const result = getResult(score);

  function handleSelect(qIndex, optIndex) {
    setAnswers(prev => ({ ...prev, [qIndex]: points[optIndex] }));
  }

  function handleSubmit() {
    if (answered < questions.length) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className={styles.wrapper}>
          <div className={styles.result}>
            <p className={styles.scoreLabel}>Your Score</p>
            <p className={styles.scoreNumber} style={{ color: result.color }}>{score} / 100</p>
            <h2 className={styles.tier} style={{ color: result.color }}>{result.tier}</h2>
            <p className={styles.description}>{result.description}</p>
            <div className={styles.insightBox}>
              <p className={styles.insightLabel}>What this usually means</p>
              <p className={styles.insightText}>{result.insight}</p>
            </div>
            <p className={styles.ctaText}>{result.cta}</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              Book Your Founder Load Audit →
            </a>
            <p className={styles.ctaNote}>30 minutes. No pitch. Just clarity on what to fix first.</p>
            <button type="button" className={styles.retake} onClick={() => { setAnswers({}); setSubmitted(false); }}>
              Retake the assessment
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Founder Dependency Assessment</h1>
          <p className={styles.subtitle}>10 questions. Find out how structurally dependent your business is on you.</p>
        </div>

        <div className={styles.questions}>
          {questions.map((item, qIndex) => (
            <div key={qIndex} className={styles.question}>
              <p className={styles.questionNumber}>Question {qIndex + 1}</p>
              <p className={styles.questionText}>{item.q}</p>
              <div className={styles.options}>
                {item.opts.map((opt, optIndex) => (
                  <button
                    key={optIndex}
                    type="button"
                    className={`${styles.option} ${answers[qIndex] === points[optIndex] ? styles.selected : ""}`}
                    onClick={() => handleSelect(qIndex, optIndex)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.submitWrap}>
          <button
            type="button"
            className={`${styles.submit} ${answered < questions.length ? styles.disabled : ""}`}
            onClick={handleSubmit}
            disabled={answered < questions.length}
          >
            {answered < questions.length ? `Answer all questions (${questions.length - answered} remaining)` : "See My Results →"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
