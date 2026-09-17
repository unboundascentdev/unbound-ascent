"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BOOKING_URL } from "@/data/content";
import {
  ALIGNED_OPERATOR,
  ANSWER_POINTS,
  QUESTIONS,
  appendParameters,
  buildResultParameters,
  calculateAssessmentResult,
  parseTrackingContext,
} from "@/lib/owner-load-assessment.mjs";
import styles from "./assessment.module.css";

const FORM_URL = "https://link.unboundascent.com/widget/form/LUsgmsmOLNcrYlQ3hAV3";
const STORAGE_KEY = "ownerLoadAssessmentV2";
const FIRST_COMPLETION_KEY = "ownerLoadAssessmentFirstCompletedAt";

function trackEvent(name, properties = {}) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never interrupt the assessment experience.
  }
}

function readMessageData(data) {
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function ProfileDetails({ profile, aligned = false }) {
  return (
    <article className={styles.profileCard}>
      <p className={styles.insightLabel}>{aligned ? "Owner Load Profile" : profile.name}</p>
      <h3>{profile.profile}</h3>
      <p className={styles.profileHeadline}>{profile.headline}</p>
      <div className={styles.profileCopy}>
        <h4>What the result means</h4>
        <p>{profile.meaning}</p>
        <h4>{aligned ? "Why this still requires attention" : "Why the pattern persists"}</h4>
        <p>{profile.why}</p>
        <h4>Watch for this</h4>
        <p>{profile.watch}</p>
      </div>
    </article>
  );
}

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stage, setStage] = useState("intro");
  const [tracking, setTracking] = useState({ source: "direct", utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "" });
  const [completion, setCompletion] = useState(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [restoreError, setRestoreError] = useState(false);
  const advanceTimer = useRef(null);
  const formFrame = useRef(null);
  const pageViewTracked = useRef(false);
  const fullResultTracked = useRef(false);
  const resultRef = useRef(null);
  const result = useMemo(() => {
    if (Object.keys(answers).length !== QUESTIONS.length) return null;
    try {
      return calculateAssessmentResult(answers);
    } catch {
      return null;
    }
  }, [answers]);
  const isLocalPreview = process.env.NODE_ENV === "development";

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  useEffect(() => {
    const currentTracking = parseTrackingContext(window.location.search, document.referrer, window.location.origin);
    window.setTimeout(() => setTracking(currentTracking), 0);
    if (!pageViewTracked.current) {
      pageViewTracked.current = true;
      trackEvent("assessment_page_viewed", currentTracking);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("assessment-complete") !== "1") return;
    if (window.self !== window.top) {
      window.parent.postMessage({ type: "assessmentRedirectComplete" }, "*");
      return;
    }

    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      window.setTimeout(() => setRestoreError(true), 0);
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      calculateAssessmentResult(parsed.answers);
      window.setTimeout(() => {
        setAnswers(parsed.answers);
        setTracking(parsed.tracking || currentTracking);
        setCompletion(parsed.completion);
        setStage("results");
      }, 0);
    } catch {
      window.setTimeout(() => setRestoreError(true), 0);
    }
  }, []);

  useEffect(() => {
    if (stage !== "questions") return;
    trackEvent("assessment_question_reached", { question: currentQuestion + 1 });
  }, [currentQuestion, stage]);

  useEffect(() => {
    if (stage !== "results" || !result || fullResultTracked.current) return;
    fullResultTracked.current = true;
    trackEvent("assessment_full_result_viewed", {
      score: result.score,
      status: result.status.status,
      primary_profile: result.primaryProfileLabel,
    });
  }, [result, stage]);

  useEffect(() => {
    function handleMessage(event) {
      if (event.source !== formFrame.current?.contentWindow) return;
      const data = readMessageData(event.data);
      const eventName = String(data?.type || data?.event || data?.eventType || data?.action || data?.data?.type || "")
        .toLowerCase()
        .replace(/[^a-z]/g, "");
      if (!eventName.includes("formsubmit") && eventName !== "assessmentredirectcomplete") return;
      const currentResult = resultRef.current;
      if (!currentResult) return;
      trackEvent("assessment_email_submitted", {
        score: currentResult.score,
        status: currentResult.status.status,
        primary_profile: currentResult.primaryProfileLabel,
      });
      setStage("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  function startAssessment() {
    setRestoreError(false);
    setStage("questions");
    setCurrentQuestion(0);
    trackEvent("assessment_started", tracking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function completeAssessment(nextAnswers) {
    const nextResult = calculateAssessmentResult(nextAnswers);
    const latest = new Date().toISOString();
    const first = window.localStorage.getItem(FIRST_COMPLETION_KEY) || latest;
    window.localStorage.setItem(FIRST_COMPLETION_KEY, first);
    const nextCompletion = { first, latest };
    const payload = { answers: nextAnswers, tracking, completion: nextCompletion };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setCompletion(nextCompletion);
    resultRef.current = nextResult;
    trackEvent("assessment_completed", {
      score: nextResult.score,
      status: nextResult.status.status,
      primary_profile: nextResult.primaryProfileLabel,
      source: tracking.source,
    });
    setStage("email");
    setIsAdvancing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectAnswer(optionIndex) {
    if (isAdvancing) return;
    const nextAnswers = { ...answers, [currentQuestion]: ANSWER_POINTS[optionIndex] };
    setAnswers(nextAnswers);
    setIsAdvancing(true);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      if (currentQuestion === QUESTIONS.length - 1) {
        completeAssessment(nextAnswers);
      } else {
        setCurrentQuestion((question) => question + 1);
        setIsAdvancing(false);
      }
    }, 260);
  }

  function goBack() {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setIsAdvancing(false);
    if (currentQuestion === 0) {
      setStage("intro");
    } else {
      setCurrentQuestion((value) => value - 1);
    }
  }

  function reviewAnswers() {
    setStage("questions");
    setCurrentQuestion(QUESTIONS.length - 1);
    setIsAdvancing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function revealPreviewResult() {
    if (!result) return;
    trackEvent("assessment_email_submitted", { score: result.score, preview: true });
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAssessment() {
    setAnswers({});
    setCurrentQuestion(0);
    setCompletion(null);
    setStage("intro");
    setRestoreError(false);
    fullResultTracked.current = false;
    resultRef.current = null;
    window.sessionStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const resultParameters = result && completion ? buildResultParameters(result, tracking, completion) : null;
  const formUrl = resultParameters ? appendParameters(FORM_URL, resultParameters) : FORM_URL;
  const bookingUrl = resultParameters ? appendParameters(`${BOOKING_URL}#calendar`, resultParameters) : `${BOOKING_URL}#calendar`;

  if (stage === "intro") return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.introCard} aria-labelledby="assessment-title">
          <p className={styles.eyebrow}>Free two minute assessment for established business owners</p>
          <h1 id="assessment-title" className={styles.title}>Can your business grow without keeping you mentally on call?</h1>
          <p className={styles.subtitle}>Find out where the business still depends on your time, judgment, or attention and what to change first so growth stops following you home.</p>
          <div className={styles.receives} aria-label="What you will receive">
            <span>✓ Your Business Independence Score</span>
            <span>✓ The pressure point creating the most owner dependence</span>
            <span>✓ One practical action to take during the next seven days</span>
          </div>
          {restoreError ? <p className={styles.restoreError}>We could not restore a complete result on this device. Retake the assessment to generate it again.</p> : null}
          <button type="button" className={styles.primaryButton} onClick={startAssessment}>Start My Assessment <span>→</span></button>
          <p className={styles.audienceLine}>Built for owners with a functioning business who want continued growth without constant availability.</p>
          <p className={styles.privacyNote}>Your answers are used to calculate and personalize your result. After you finish, you can enter your email to receive the complete result and action plan.</p>
        </section>
        <section className={styles.supporting} aria-labelledby="supporting-title">
          <h2 id="supporting-title">A stable business should create more choice, not permanent access to you</h2>
          <p>Many owners solve the visible business problems and still cannot switch off. Decisions wait for them. Important knowledge remains in their head. Urgent work keeps replacing the work they intended to do. Time at home becomes recovery time or another place to think about the business.</p>
          <p>The Owner Load Assessment shows where that pressure is coming from. It looks at business continuity, decision ownership, operational systems, focus, and whether the business is supporting the life the owner intended to build.</p>
        </section>
      </main>
      <Footer />
    </>
  );

  if (stage === "email" && result) return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.emailGate} aria-labelledby="email-gate-title">
          <p className={styles.eyebrow}>Assessment complete</p>
          <h1 id="email-gate-title" className={styles.gateTitle}>
            Your primary pressure {result.primaryCategories.length > 1 ? "points are" : "point is"} {result.primaryCategoryLabel}
          </h1>
          <div className={styles.teasers}>
            {result.primaryCategories.map((category) => <p key={category.key}>{category.teaser}</p>)}
          </div>
          <div className={styles.gateDivider} />
          <h2>Where should I send your complete result?</h2>
          <p className={styles.gateSubtitle}>Enter your first name and email to reveal your Business Independence Score, complete Owner Load Profile, secondary pressure point, and seven day action plan. Your result will appear immediately and will also be sent to your inbox.</p>
          <div className={styles.gateForm}>
            <iframe
              ref={formFrame}
              src={formUrl}
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
              title="Enter your first name and email to reveal your complete result"
            />
          </div>
          <p className={styles.consentLine}>By submitting, you agree to receive your assessment result and practical emails from Unbound Ascent. You can unsubscribe at any time.</p>
          <p className={styles.integrationWarning}>Privacy Policy and Terms links in the connected form must be replaced before this preview is published.</p>
          <button type="button" className={styles.reviewAnswers} onClick={reviewAnswers}>← Review my answers</button>
          {isLocalPreview ? <button type="button" className={styles.previewResults} onClick={revealPreviewResult}>Preview complete result locally</button> : null}
        </section>
      </main>
      <Footer />
    </>
  );

  if (stage === "results" && result) {
    const profileCategories = result.isAlignedOperator
      ? []
      : [result.actionCategory, ...result.primaryCategories.filter((category) => category.key !== result.actionCategory.key)];
    return (
      <>
        <Navbar />
        <main className={styles.resultWrapper}>
          <section className={styles.result} aria-labelledby="result-status">
            <p className={styles.scoreLabel}>Your Business Independence Score</p>
            <p className={styles.scoreNumber} style={{ color: result.status.color }}>{result.score}<span> / 100</span></p>
            <p className={styles.scoreDirection}>Higher score means the business can operate with less direct owner involvement.</p>
            <h1 id="result-status" className={styles.tier} style={{ color: result.status.color }}>{result.status.status}</h1>
            <p className={styles.description}>{result.status.description}</p>
            <div className={styles.scoreScale} aria-label="Score range: high owner dependence from 0 to 40, moderate owner dependence from 41 to 70, and low owner dependence from 71 to 100">
              <span className={result.score <= 40 ? styles.activeRange : ""}>0–40 High</span>
              <span className={result.score > 40 && result.score <= 70 ? styles.activeRange : ""}>41–70 Moderate</span>
              <span className={result.score > 70 ? styles.activeRange : ""}>71–100 Low</span>
            </div>

            <div className={styles.profileIntro}>
              <p className={styles.insightLabel}>Your Owner Load Profile</p>
              {result.isAlignedOperator ? <h2>The Aligned Operator</h2> : result.primaryProfiles.length > 1 ? (
                <h2>Your owner load is split between {result.primaryProfileLabel}.</h2>
              ) : <h2>{result.primaryProfileLabel}</h2>}
            </div>

            {result.isAlignedOperator ? (
              <ProfileDetails profile={ALIGNED_OPERATOR} aligned />
            ) : profileCategories.map((profile) => <ProfileDetails key={profile.key} profile={profile} />)}

            {result.secondaryCategories.length ? <div className={styles.secondaryResult}>
              <p className={styles.insightLabel}>{result.isAlignedOperator ? "Next area to protect or improve" : "Also worth watching"}</p>
              {result.isAlignedOperator ? (
                <p>Your lowest remaining {result.secondaryCategories.length > 1 ? "areas are" : "area is"} <strong>{result.secondaryCategoryLabel}</strong>. Protecting this {result.secondaryCategories.length > 1 ? "structure" : "area"} will help keep owner dependence from returning as the business grows.</p>
              ) : (
                <p>Your secondary pressure {result.secondaryCategories.length > 1 ? "points are" : "point is"} <strong>{result.secondaryCategoryLabel}</strong>. {result.secondaryCategories.length > 1 ? "They are" : "It is"} not creating as much pressure as your primary profile, but {result.secondaryCategories.length > 1 ? "they may" : "it may"} become the next constraint as the business grows.</p>
              )}
            </div> : null}

            <div className={styles.actionBox}>
              <p className={styles.insightLabel}>Your seven day action</p>
              <p>{result.isAlignedOperator ? ALIGNED_OPERATOR.action : result.actionCategory.action}</p>
            </div>

            <div className={styles.reviewInvitation}>
              <h2>Turn your result into a transfer plan</h2>
              <p>During an Owner Load Review, we will identify the responsibility, decision, or recurring problem that should stop depending on you first. You will leave with a clear first move. If I believe I can help beyond the review, I will explain what that could look like.</p>
              <a href={bookingUrl} className={styles.primaryButton} onClick={() => trackEvent("owner_load_review_clicked", { score: result.score, status: result.status.status, primary_profile: result.primaryProfileLabel })}>Build My Transfer Plan <span>→</span></a>
              <p className={styles.ctaNote}>Thirty minutes. Practical and pressure free.</p>
            </div>
            <button type="button" className={styles.retake} onClick={resetAssessment}>Retake the assessment</button>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const selectedPoint = answers[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.assessmentShell} aria-labelledby="question-title">
          <header className={styles.questionHeader}>
            <p className={styles.eyebrow}>Owner Load Assessment</p>
            <div className={styles.progressHeader}><span>Question {currentQuestion + 1} of {QUESTIONS.length}</span><span>{Math.round(progress)}% complete</span></div>
            <div className={styles.progress} aria-hidden="true"><div className={styles.progressBar} style={{ width: `${progress}%` }} /></div>
          </header>
          <div className={styles.questionCard} key={currentQuestion}>
            <h1 id="question-title" className={styles.questionText}>{question.question}</h1>
            {question.note ? <p className={styles.questionNote}>{question.note}</p> : null}
            <div className={styles.options}>
              {question.options.map((option, optionIndex) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.option} ${selectedPoint === ANSWER_POINTS[optionIndex] ? styles.selected : ""}`}
                  onClick={() => selectAnswer(optionIndex)}
                  disabled={isAdvancing}
                >
                  <span className={styles.optionMarker}>{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.controls}>
            <button type="button" className={styles.back} onClick={goBack}>← Back</button>
            <span>Choose one answer to continue</span>
          </div>
          <p className={styles.privacyNote}>Your answers are used to calculate and personalize your result. You can go back and change an answer before submitting your email.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
