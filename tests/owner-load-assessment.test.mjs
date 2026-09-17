import test from "node:test";
import assert from "node:assert/strict";

import {
  ANSWER_POINTS,
  CATEGORY_ORDER,
  QUESTIONS,
  appendParameters,
  buildResultParameters,
  calculateAssessmentResult,
  getScoreStatus,
  parseTrackingContext,
} from "../src/lib/owner-load-assessment.mjs";

const resultFor = (answers) => calculateAssessmentResult(answers);

test("all ten questions use the blueprint scoring direction", () => {
  assert.equal(QUESTIONS.length, 10);
  assert.deepEqual(ANSWER_POINTS, [10, 8, 6, 3, 0]);
  QUESTIONS.forEach((question) => assert.equal(question.options.length, 5));
});

test("each of the five categories contains exactly two questions", () => {
  assert.equal(CATEGORY_ORDER.length, 5);
  CATEGORY_ORDER.forEach((category) => {
    assert.equal(QUESTIONS.filter((question) => question.category === category).length, 2);
  });
});

test("score ranges include every boundary", () => {
  assert.equal(getScoreStatus(0).status, "High owner dependence");
  assert.equal(getScoreStatus(40).status, "High owner dependence");
  assert.equal(getScoreStatus(41).status, "Moderate owner dependence");
  assert.equal(getScoreStatus(70).status, "Moderate owner dependence");
  assert.equal(getScoreStatus(71).status, "Low owner dependence");
  assert.equal(getScoreStatus(100).status, "Low owner dependence");
});

test("all five primary pressure profiles can be produced", () => {
  const expected = [
    "The Always On Owner",
    "The Default Decision Maker",
    "The Human Operating System",
    "The Split Focus Builder",
    "The Misaligned Achiever",
  ];
  expected.forEach((profile, categoryIndex) => {
    const answers = Array(10).fill(10);
    answers[categoryIndex * 2] = 0;
    answers[categoryIndex * 2 + 1] = 0;
    const result = resultFor(answers);
    assert.equal(result.primaryProfileLabel, profile);
    assert.equal(result.isAlignedOperator, false);
  });
});

test("the Aligned Operator requires score 80+ and every category 70+", () => {
  const aligned = resultFor(Array(10).fill(8));
  assert.equal(aligned.score, 80);
  assert.equal(aligned.isAlignedOperator, true);
  assert.equal(aligned.primaryProfileLabel, "The Aligned Operator");

  const weakCategory = resultFor([10, 3, 10, 10, 10, 10, 10, 10, 10, 10]);
  assert.equal(weakCategory.score, 93);
  assert.equal(weakCategory.categoryResults[0].score, 65);
  assert.equal(weakCategory.isAlignedOperator, false);
  assert.equal(weakCategory.primaryProfileLabel, "The Always On Owner");
});

test("two-way ties are retained as co-primary profiles", () => {
  const result = resultFor([0, 0, 0, 0, 10, 10, 10, 10, 10, 10]);
  assert.deepEqual(result.primaryProfiles, ["The Always On Owner", "The Default Decision Maker"]);
  assert.equal(result.primaryCategories.length, 2);
  assert.equal(result.secondaryProfileLabel, "The Human Operating System, The Split Focus Builder, and The Misaligned Achiever");
});

test("multi-category ties are retained without an invisible tie breaker", () => {
  const result = resultFor([0, 0, 0, 0, 0, 0, 10, 10, 10, 10]);
  assert.equal(result.primaryCategories.length, 3);
  assert.deepEqual(result.primaryProfiles, [
    "The Always On Owner",
    "The Default Decision Maker",
    "The Human Operating System",
  ]);
});

test("tie action priority uses the weakest individual answer before category order", () => {
  const result = resultFor([3, 3, 0, 6, 10, 10, 10, 10, 10, 10]);
  assert.equal(result.categoryResults[0].score, 30);
  assert.equal(result.categoryResults[1].score, 30);
  assert.equal(result.actionCategory.profile, "The Default Decision Maker");
});

test("tie action priority falls back to assessment order", () => {
  const result = resultFor([3, 3, 3, 3, 10, 10, 10, 10, 10, 10]);
  assert.equal(result.actionCategory.profile, "The Always On Owner");
});

test("category scores are the two answers multiplied by five", () => {
  const result = resultFor([10, 8, 6, 3, 0, 10, 8, 6, 3, 0]);
  assert.deepEqual(result.categoryResults.map((category) => category.score), [90, 45, 50, 70, 15]);
  assert.equal(result.score, 54);
});

test("source and UTM tracking are captured with sensible precedence", () => {
  assert.deepEqual(
    parseTrackingContext("?source=referral&utm_source=linkedin&utm_campaign=fall", "https://example.org/post", "https://www.unboundascent.com"),
    {
      source: "referral",
      utm_source: "linkedin",
      utm_medium: "",
      utm_campaign: "fall",
      utm_term: "",
      utm_content: "",
    }
  );
  assert.equal(parseTrackingContext("", "https://partner.example/path", "https://www.unboundascent.com").source, "partner.example");
  assert.equal(parseTrackingContext("", "https://www.unboundascent.com/", "https://www.unboundascent.com").source, "direct");
});

test("hidden result fields and booking parameters preserve required values", () => {
  const result = resultFor([10, 8, 6, 3, 0, 10, 8, 6, 3, 0]);
  const values = buildResultParameters(
    result,
    { source: "linkedin", utm_source: "linkedin", utm_medium: "social", utm_campaign: "owner-load", utm_term: "", utm_content: "post-a" },
    { first: "2026-09-17T12:00:00.000Z", latest: "2026-09-17T12:00:00.000Z" }
  );
  assert.equal(values.assessment_score, "54");
  assert.equal(values.assessment_status, "Moderate owner dependence");
  assert.equal(values.primary_profile, "The Misaligned Achiever");
  assert.equal(values.assessment_completed_at, "2026-09-17T12:00:00.000Z");
  const url = new URL(appendParameters("/book#calendar", values), "https://www.unboundascent.com");
  assert.equal(url.pathname, "/book");
  assert.equal(url.hash, "#calendar");
  assert.equal(url.searchParams.get("assessment_score"), "54");
  assert.equal(url.searchParams.get("utm_campaign"), "owner-load");
});
