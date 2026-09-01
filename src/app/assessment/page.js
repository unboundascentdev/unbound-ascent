"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BOOKING_URL } from "@/data/content";
import styles from "./assessment.module.css";

const questions = [
  { q: "How often does your business require your attention outside normal work hours?", opts: ["Almost never", "Once or twice a week", "A few times per week", "Almost every day", "Multiple times every day"] },
  { q: "If you took a completely unplugged 7-day vacation tomorrow, what would happen?", opts: ["The business would operate normally", "A few things would need my attention afterward", "Some important things would likely stall", "Major issues would arise", "Everything would come to a halt"] },
  { q: "How often do team members come to you for decisions they could probably make themselves?", opts: ["Rarely", "Occasionally", "Weekly", "Daily", "Constantly"] },
  { q: "At the end of a typical week, how often do you feel you spent your time on the wrong things?", opts: ["Almost never", "Occasionally", "About half the time", "Frequently", "Almost always"] },
  { q: "How would you describe your current workload?", opts: ["Very manageable", "Busy but manageable", "Frequently overwhelming", "Constantly overwhelming", "I'm barely keeping up"] },
  { q: "How often are you putting out unexpected fires?", opts: ["Rarely", "A few times per month", "Weekly", "Several times per week", "Daily"] },
  { q: "How easy would it be to hand off 25% of your responsibilities?", opts: ["Very easy", "Somewhat easy", "Possible but difficult", "Very difficult", "Nearly impossible"] },
  { q: "How much of your business exists only in your head?", opts: ["Almost none", "A small amount", "Some important parts", "Most important parts", "Nearly everything"] },
  { q: "When did you last have uninterrupted time to think strategically about the business?", opts: ["This week", "Within the last month", "Within the last 3 months", "More than 3 months ago", "I honestly can't remember"] },
  { q: "Which statement best describes how you currently feel about your business?", opts: ["I feel in control", "I feel busy but optimistic", "I feel stretched thin", "I feel trapped by the business", "Things would fall apart without my constant involvement"] },
];

const points = [10, 8, 6, 3, 0];

function getResult(score) {
  if (score <= 40) return {
    tier: "Founder Dependency is High",
    color: "#EF4444",
    description: "Your business relies heavily on your time, attention, and decision-making. Growth is likely creating more pressure instead of more freedom.",
    insight: "Most decisions are still traveling to you because the authority to resolve them has not moved far enough into the business.",
    cta: "Let's identify exactly where that dependency lives and what one change would create the most immediate relief.",
  };
  if (score <= 70) return {
    tier: "Founder Dependency is Moderate",
    color: "#F59E0B",
    description: "You've built some leverage, but key areas of the business still depend too heavily on you.",
    insight: "The dependency is usually concentrated in one or two areas. Finding those pressure points is the fastest route to being able to step away.",
    cta: "Let's pinpoint which areas are creating the most drag and what moves when you address them.",
  };
  return {
    tier: "Founder Dependency is Low",
    color: "#10B981",
    description: "You've created systems, delegation, and structure that reduce the business's dependency on you.",
    insight: "The next challenge is role evolution—making sure your involvement changes as the business grows.",
    cta: "Let's make sure your role is evolving with the business so you're focused where it actually matters.",
  };
}

function readMessageData(data) {
  if (typeof data !== "string") return data;
  try { return JSON.parse(data); } catch { return null; }
}

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stage, setStage] = useState("questions");
  const [savedScore, setSavedScore] = useState(null);
  const advanceTimer = useRef(null);
  const formFrame = useRef(null);
  const answerScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const score = savedScore ?? answerScore;
  const scoreRef = useRef(score);
  const result = getResult(score);
  const isLocalPreview = process.env.NODE_ENV === "development";

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("assessment-complete") !== "1") return;

    if (window.self !== window.top) {
      window.parent.postMessage({ type: "assessmentRedirectComplete" }, "*");
      return;
    }

    const storedScore = Number(window.sessionStorage.getItem("assessmentScore"));
    if (Number.isFinite(storedScore)) {
      window.setTimeout(() => {
        setSavedScore(storedScore);
        setStage("results");
      }, 0);
    }
  }, []);

  useEffect(() => {
    function handleMessage(event) {
      if (event.source !== formFrame.current?.contentWindow) return;
      const data = readMessageData(event.data);
      const eventName = String(
        data?.type || data?.event || data?.eventType || data?.action || data?.data?.type || ""
      ).toLowerCase().replace(/[^a-z]/g, "");
      if (eventName.includes("formsubmit") || eventName === "assessmentredirectcomplete") {
        track("assessment_email_submitted", { score: scoreRef.current });
        setStage("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  function selectAnswer(optionIndex) {
    if (Object.keys(answers).length === 0) track("assessment_started");
    setAnswers((previous) => ({ ...previous, [currentQuestion]: points[optionIndex] }));
    if (currentQuestion < questions.length - 1) {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
      advanceTimer.current = window.setTimeout(() => setCurrentQuestion((question) => question + 1), 220);
    }
  }

  function showEmailGate() {
    if (Object.keys(answers).length !== questions.length) return;
    track("assessment_completed", { score });
    window.sessionStorage.setItem("assessmentScore", String(score));
    setStage("email");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAssessment() {
    setAnswers({});
    setSavedScore(null);
    setCurrentQuestion(0);
    setStage("questions");
    window.sessionStorage.removeItem("assessmentScore");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (stage === "email") return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.emailGate} aria-labelledby="email-gate-title">
          <p className={styles.eyebrow}>Your assessment is complete</p>
          <h1 id="email-gate-title" className={styles.gateTitle}>Your founder-dependency score is ready.</h1>
          <p className={styles.gateSubtitle}>Enter your email to see your score, what it means, and the first pressure point to address.</p>
          <div className={styles.valueList}>
            <span>✓ Your score out of 100</span><span>✓ What your score reveals</span><span>✓ The best next step</span>
          </div>
          <div className={styles.gateForm}>
            <iframe
              ref={formFrame}
              src="https://link.unboundascent.com/widget/form/LUsgmsmOLNcrYlQ3hAV3"
              className={styles.formFrame}
              id="inline-LUsgmsmOLNcrYlQ3hAV3"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-activation-type="alwaysActivated"
              data-deactivation-type="neverDeactivate"
              data-form-name="Assessment Email Gate"
              data-height="435"
              data-layout-iframe-id="inline-LUsgmsmOLNcrYlQ3hAV3"
              data-form-id="LUsgmsmOLNcrYlQ3hAV3"
              title="Enter your email to view assessment results"
            />
          </div>
          <p className={styles.gateNote}>No spam. Just your result and practical guidance for stepping away without the business suffering.</p>
          {isLocalPreview && <button type="button" className={styles.previewResults} onClick={() => setStage("results")}>Preview results locally</button>}
        </section>
      </main>
      <Footer />
    </>
  );

  if (stage === "results") return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.result} aria-labelledby="result-tier">
          <p className={styles.scoreLabel}>Your Founder Dependency Score</p>
          <p className={styles.scoreNumber} style={{ color: result.color }}>{score}<span> / 100</span></p>
          <h1 id="result-tier" className={styles.tier} style={{ color: result.color }}>{result.tier}</h1>
          <p className={styles.description}>{result.description}</p>
          <div className={styles.insightBox}>
            <p className={styles.insightLabel}>What this usually means</p>
            <p className={styles.insightText}>{result.insight}</p>
          </div>
          <p className={styles.ctaText}>{result.cta}</p>
          <a href={BOOKING_URL} className={styles.ctaBtn} onClick={() => track("assessment_booking_clicked", { score, tier: result.tier })}>Book Your Founder Load Audit →</a>
          <p className={styles.ctaNote}>30 minutes. No pitch. Just clarity on what to fix first.</p>
          <button type="button" className={styles.retake} onClick={resetAssessment}>Retake the assessment</button>
        </section>
      </main>
      <Footer />
    </>
  );

  const question = questions[currentQuestion];
  const selectedPoint = answers[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.assessmentShell} aria-labelledby="assessment-title">
          <header className={styles.header}>
            <p className={styles.eyebrow}>Free 2-minute assessment</p>
            <h1 id="assessment-title" className={styles.title}>Can your business run without you?</h1>
            <p className={styles.subtitle}>Find out why switching off still feels risky—and where the business depends on you most.</p>
          </header>
          <div className={styles.progressHeader}><span>Question {currentQuestion + 1} of {questions.length}</span><span>{Math.round(progress)}% complete</span></div>
          <div className={styles.progress} aria-hidden="true"><div className={styles.progressBar} style={{ width: `${progress}%` }} /></div>
          <div className={styles.questionCard} key={currentQuestion}>
            <p className={styles.questionText}>{question.q}</p>
            <div className={styles.options}>
              {question.opts.map((option, optionIndex) => (
                <button key={option} type="button" className={`${styles.option} ${selectedPoint === points[optionIndex] ? styles.selected : ""}`} onClick={() => selectAnswer(optionIndex)}>
                  <span className={styles.optionMarker}>{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.controls}>
            <button type="button" className={styles.back} onClick={() => setCurrentQuestion((value) => Math.max(0, value - 1))} disabled={currentQuestion === 0}>← Back</button>
            {isLastQuestion && <button type="button" className={styles.submit} onClick={showEmailGate} disabled={answeredCount !== questions.length}>Get My Score →</button>}
          </div>
          <p className={styles.privacyNote}>Private and pressure-free. Your answers are used only to calculate your result.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
