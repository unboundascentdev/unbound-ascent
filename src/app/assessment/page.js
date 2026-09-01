"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BOOKING_URL } from "@/data/content";
import styles from "./assessment.module.css";

const questions = [
  { category: "continuity", q: "How often does your business require your attention outside normal work hours?", opts: ["Almost never", "Once or twice a week", "A few times per week", "Almost every day", "Multiple times every day"] },
  { category: "continuity", q: "If you took a completely unplugged 7-day vacation tomorrow, what would happen?", opts: ["The business would operate normally", "A few things would need my attention afterward", "Some important things would likely stall", "Major issues would arise", "Everything would come to a halt"] },
  { category: "ownership", q: "How often do team members come to you for decisions they could probably make themselves?", opts: ["Rarely", "Occasionally", "Weekly", "Daily", "Constantly"] },
  { category: "capacity", q: "At the end of a typical week, how often do you feel you spent your time on the wrong things?", opts: ["Almost never", "Occasionally", "About half the time", "Frequently", "Almost always"] },
  { category: "capacity", q: "How would you describe your current workload?", opts: ["Very manageable", "Busy but manageable", "Frequently overwhelming", "Constantly overwhelming", "I'm barely keeping up"] },
  { category: "systems", q: "How often are you putting out unexpected fires?", opts: ["Rarely", "A few times per month", "Weekly", "Several times per week", "Daily"] },
  { category: "ownership", q: "How easy would it be to hand off 25% of your responsibilities?", opts: ["Very easy", "Somewhat easy", "Possible but difficult", "Very difficult", "Nearly impossible"] },
  { category: "systems", q: "How much of your business exists only in your head?", opts: ["Almost none", "A small amount", "Some important parts", "Most important parts", "Nearly everything"] },
  { category: "capacity", q: "When did you last have uninterrupted time to think strategically about the business?", opts: ["This week", "Within the last month", "Within the last 3 months", "More than 3 months ago", "I honestly can't remember"] },
  { category: "continuity", q: "Which statement best describes how you currently feel about your business?", opts: ["I feel in control", "I feel busy but optimistic", "I feel stretched thin", "I feel trapped by the business", "Things would fall apart without my constant involvement"] },
];

const points = [10, 8, 6, 3, 0];

const dependencyAreas = {
  continuity: { name: "Business continuity", meaning: "Time away still carries risk because important work or exceptions are likely to pull you back in.", action: "List the three situations most likely to interrupt your next day off. Give each one a named owner and a clear escalation rule." },
  ownership: { name: "Decision ownership", meaning: "Your team can execute, but too many decisions still depend on your judgment or approval.", action: "Track every decision brought to you for five working days. Transfer the most repeated decision with a boundary the team can use without asking." },
  systems: { name: "Operational systems", meaning: "Critical knowledge and problem-solving may still live in your head instead of in a repeatable operating system.", action: "Document the next recurring problem you solve as a short checklist, then have someone else use it while you observe." },
  capacity: { name: "Founder capacity", meaning: "Urgent work is consuming the time and attention you need for leadership, strategy, and growth.", action: "Protect one 90-minute strategy block this week and remove or reassign the task most likely to take it away." },
};

function getDependencySignals(answers) {
  const totals = {};
  questions.forEach((question, index) => {
    const value = answers[index];
    if (typeof value !== "number") return;
    const current = totals[question.category] || { points: 0, count: 0 };
    totals[question.category] = { points: current.points + value, count: current.count + 1 };
  });
  return Object.entries(totals)
    .map(([key, value]) => ({ key, score: Math.round((value.points / (value.count * 10)) * 100), ...dependencyAreas[key] }))
    .sort((a, b) => a.score - b.score);
}

function getResult(score) {
  if (score <= 40) return {
    tier: "Founder Dependency is High",
    color: "#EF4444",
    description: "Your business relies heavily on your time, attention, and decision-making. Growth is likely creating more pressure instead of more freedom.",
  };
  if (score <= 70) return {
    tier: "Founder Dependency is Moderate",
    color: "#F59E0B",
    description: "Normal operations have some leverage, but important decisions, exceptions, or problems can still pull you back in.",
  };
  return {
    tier: "Founder Dependency is Low",
    color: "#10B981",
    description: "You've created systems, delegation, and structure that reduce the business's dependency on you.",
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
  const dependencySignals = getDependencySignals(answers);
  const primarySignal = dependencySignals[0];
  const secondarySignal = dependencySignals[1];
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
    const storedAnswers = window.sessionStorage.getItem("assessmentAnswers");
    if (Number.isFinite(storedScore)) {
      window.setTimeout(() => {
        if (storedAnswers) {
          try { setAnswers(JSON.parse(storedAnswers)); } catch { /* Keep the score when answer detail is unavailable. */ }
        }
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
    window.sessionStorage.setItem("assessmentAnswers", JSON.stringify(answers));
    setStage("email");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAssessment() {
    setAnswers({});
    setSavedScore(null);
    setCurrentQuestion(0);
    setStage("questions");
    window.sessionStorage.removeItem("assessmentScore");
    window.sessionStorage.removeItem("assessmentAnswers");
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
          <p className={styles.scoreLabel}>Your Business Independence Score</p>
          <p className={styles.scoreNumber} style={{ color: result.color }}>{score}<span> / 100</span></p>
          <p className={styles.scoreDirection}>Higher score = less founder dependency</p>
          <h1 id="result-tier" className={styles.tier} style={{ color: result.color }}>{result.tier}</h1>
          <p className={styles.description}>{result.description}</p>
          <div className={styles.scoreScale} aria-label="Score range: high dependency from 0 to 40, moderate dependency from 41 to 70, and low dependency from 71 to 100">
            <span className={score <= 40 ? styles.activeRange : ""}>0–40 High</span>
            <span className={score > 40 && score <= 70 ? styles.activeRange : ""}>41–70 Moderate</span>
            <span className={score > 70 ? styles.activeRange : ""}>71–100 Low</span>
          </div>
          {primarySignal ? <div className={styles.diagnosis}>
            <p className={styles.insightLabel}>Your strongest dependency signal</p>
            <h2>{primarySignal.name}</h2>
            <p>{primarySignal.meaning}</p>
            {secondarySignal ? <p className={styles.secondarySignal}><strong>Also worth watching:</strong> {secondarySignal.name}</p> : null}
          </div> : null}
          {primarySignal ? <div className={styles.actionBox}>
            <p className={styles.insightLabel}>One step to take this week</p>
            <p>{primarySignal.action}</p>
          </div> : null}
          <div className={styles.auditBridge}>
            <h2>Turn your result into a practical plan</h2>
            <p>In your Founder Load Audit, we’ll pinpoint the pressure point creating the most dependency and identify what to transfer first.</p>
          </div>
          <a href={BOOKING_URL} className={styles.ctaBtn} onClick={() => track("assessment_booking_clicked", { score, tier: result.tier, primarySignal: primarySignal?.key || "unavailable" })}>Show Me What to Fix First →</a>
          <p className={styles.ctaNote}>30 minutes. No pitch. Leave with clarity on your first priority.</p>
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
