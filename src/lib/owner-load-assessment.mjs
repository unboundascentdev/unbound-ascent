export const ANSWER_POINTS = [10, 8, 6, 3, 0];

export const CATEGORY_ORDER = [
  "business_continuity",
  "decision_ownership",
  "operational_systems",
  "focus_capacity",
  "success_alignment",
];

export const QUESTIONS = [
  {
    category: "business_continuity",
    question: "How often does the business require your attention outside the hours you intended to work?",
    options: ["Almost never", "A few times per month", "Once or twice per week", "Most days", "Several times per day"],
  },
  {
    category: "business_continuity",
    question: "If you took a completely unplugged seven day vacation tomorrow, what would most likely happen?",
    options: [
      "The business would operate normally",
      "A small backlog would be waiting, but nothing would require me",
      "Some important work or decisions would wait for me",
      "Significant problems would probably require my attention",
      "The business would stall or begin to fall apart",
    ],
  },
  {
    category: "decision_ownership",
    question: "How often do people wait for your decision or approval before they can move forward?",
    options: ["Rarely", "A few times per month", "About once per week", "Most days", "Several times per day"],
  },
  {
    category: "decision_ownership",
    question: "If someone took over 25 percent of your current responsibilities next week, which statement would be most accurate?",
    options: [
      "The responsibilities already have clear owners, expectations, and decision boundaries",
      "The handoff would require only a small amount of context",
      "The handoff is possible, but I would need to stay closely involved at first",
      "The handoff would be difficult because too much judgment or context still lives with me",
      "The handoff would seriously disrupt the business",
    ],
  },
  {
    category: "operational_systems",
    question: "How much critical business knowledge exists only in your head, private notes, or message history?",
    options: ["Almost none", "A small amount", "Some important parts", "Most critical parts", "Nearly everything important"],
  },
  {
    category: "operational_systems",
    question: "When a recurring problem appears, what usually happens?",
    options: [
      "The team follows a clear process and involves me only when an escalation rule applies",
      "A process exists, but the team occasionally needs my input",
      "Someone usually asks me what to do",
      "I frequently step in and take over",
      "I am the only person who can reliably solve it",
    ],
  },
  {
    category: "focus_capacity",
    question: "How many major change or growth priorities are receiving serious attention from you right now?",
    options: ["One", "Two", "Three", "Four", "Five or more"],
    note: "Count major initiatives, not routine operations. Examples include hiring, launching a service, entering a market, rebuilding a process, or pursuing a major partnership.",
  },
  {
    category: "focus_capacity",
    question: "At the end of a typical week, how often has urgent work displaced the most important work you intended to do?",
    options: ["Almost never", "Occasionally", "About half the time", "Frequently", "Almost always"],
  },
  {
    category: "success_alignment",
    question: "How often does the business interrupt time or commitments at home that you intended to protect?",
    options: ["Almost never", "Less than once per month", "A few times per month", "A few times per week", "Almost every day"],
  },
  {
    category: "success_alignment",
    question: "How clearly have you defined what business success must make possible in your life outside work?",
    options: [
      "Very clearly, and I use it to guide business decisions",
      "Clearly, although I do not always protect it",
      "I have a general idea, but it is not specific",
      "I rarely use my life outside work to evaluate business decisions",
      "I have not defined it",
    ],
  },
];

export const CATEGORIES = {
  business_continuity: {
    name: "Business continuity",
    profile: "The Always On Owner",
    teaser: "Your business still has a direct line to your attention when you intend to be unavailable.",
    headline: "Your business still has a direct line to your attention.",
    meaning: "Time away remains risky because normal work, exceptions, or emergencies can pull you back in. You may have dependable people and working processes, but the business has not established a clear boundary between situations the team owns and situations that genuinely require you.",
    why: "Remaining reachable can feel like responsible leadership because it prevents delays and protects clients. The cost is that the business never has to develop a complete response without you.",
    action: "List the three situations most likely to interrupt your next day off. Give each situation a named owner, a response rule, and a specific threshold for contacting you. Then test the rules during one protected block of time.",
    watch: "Do not begin by handing off every task. Remove one reason the business needs access to you.",
  },
  decision_ownership: {
    name: "Decision ownership",
    profile: "The Default Decision Maker",
    teaser: "Too many decisions still require your judgment or approval before work can move.",
    headline: "Your judgment is still part of too many workflows.",
    meaning: "People may be capable of completing the work, but they still wait for your interpretation, approval, or reassurance before moving forward. The team has tasks. You still own the decisions that make those tasks possible.",
    why: "Answering quickly often feels more efficient than teaching the decision. Over time, that speed trains the business to return to you whenever the situation is not obvious.",
    action: "Keep a decision log for five working days. Record every decision or approval brought to you. Choose the most repeated one and create a boundary the team can use without asking, including the condition that requires escalation.",
    watch: "Delegation without decision boundaries creates more questions, not more ownership.",
  },
  operational_systems: {
    name: "Operational systems",
    profile: "The Human Operating System",
    teaser: "Important knowledge and problem solving still depend on information you personally carry.",
    headline: "The business is using your memory and problem solving as infrastructure.",
    meaning: "Important context, quality standards, exceptions, and fixes still live in your head or private messages. Other people can help, but they need access to what you know before they can handle recurring work reliably.",
    why: "Because you can solve the problem faster, documenting or teaching the process may feel inefficient. The same problem then returns to you the next time it appears.",
    action: "Choose the next recurring problem you solve. Turn your response into a short checklist with a clear finish condition. Have someone else use the checklist while you observe where the instructions are incomplete.",
    watch: "Do not attempt to document the entire business. Capture the next repeated problem while the details are fresh.",
  },
  focus_capacity: {
    name: "Focus and capacity",
    profile: "The Split Focus Builder",
    teaser: "Urgency and competing priorities are deciding where your attention goes.",
    headline: "Urgency and competing priorities are deciding where your attention goes.",
    meaning: "Your time may be full, but progress is spread across too many fronts. Important work repeatedly loses to incoming demands, and switching between priorities increases the amount of time and mental energy each one requires.",
    why: "Keeping several initiatives active can feel safer because no opportunity is being abandoned. The result is slower progress and less evidence about which priority actually deserves more investment.",
    action: "Choose one result that matters most during the next 30 days. Pause or reduce one competing initiative, protect a 90 minute block for the priority, and decide in advance what is allowed to interrupt it.",
    watch: "A more disciplined calendar cannot solve a priority list that is too large.",
  },
  success_alignment: {
    name: "Success alignment",
    profile: "The Misaligned Achiever",
    teaser: "Business decisions are not consistently protecting the life you want the business to support.",
    headline: "Your business decisions are not consistently protecting the life you want the business to support.",
    meaning: "The business may be stable or growing, but personal commitments remain negotiable whenever work applies enough pressure. Without a clear definition of what success must make possible outside work, business demands win individual decisions by default.",
    why: "This pattern does not mean that you lack discipline or ambition. It means that the business has measurable targets while your personal priorities may not have equally clear decision rules.",
    action: "Write three conditions that business success must protect outside work. Choose one upcoming business decision and evaluate it against those conditions before considering speed, revenue, or convenience.",
    watch: "The goal is not lower ambition. The goal is to give ambition clear constraints.",
  },
};

export const ALIGNED_OPERATOR = {
  profile: "The Aligned Operator",
  headline: "Your business has meaningful independence from your constant involvement.",
  meaning: "The business can operate through normal work and many exceptions without relying on your immediate attention. You have created ownership, systems, and boundaries that give you real choice about where your energy goes.",
  why: "Growth can quietly rebuild owner dependency. New services, new people, and new opportunities often begin as owner held work before clear ownership and decision rules are established.",
  action: "Schedule one full day when you are intentionally unavailable. Record every question, decision, or exception that reaches you. Use the list to strengthen the weakest category shown in your result.",
  watch: "Do not treat a strong score as proof that the work is finished. Protect the structure as the business changes.",
};

export const SCORE_STATUSES = [
  {
    min: 0,
    max: 40,
    status: "High owner dependence",
    color: "#EF4444",
    description: "Your business relies heavily on your availability, judgment, or memory. Growth may be adding pressure because the business still uses you as part of the operating system. Time away is likely to create interruptions, stalled decisions, or uncertainty.",
  },
  {
    min: 41,
    max: 70,
    status: "Moderate owner dependence",
    color: "#F59E0B",
    description: "Your business can handle some normal work without you, but important decisions, exceptions, or competing priorities still pull you back in. The next level of freedom will come from transferring ownership, not simply completing tasks faster.",
  },
  {
    min: 71,
    max: 100,
    status: "Low owner dependence",
    color: "#10B981",
    description: "Your business has meaningful independence from your constant involvement. Your next task is to protect that structure as you grow and strengthen the area with the lowest category score.",
  },
];

function joinWithAnd(values) {
  if (values.length <= 1) return values[0] || "";
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

export function getScoreStatus(score) {
  return SCORE_STATUSES.find((item) => score >= item.min && score <= item.max);
}

export function calculateAssessmentResult(answerInput) {
  const answers = Array.isArray(answerInput)
    ? answerInput
    : QUESTIONS.map((_, index) => answerInput?.[index]);

  if (answers.length !== QUESTIONS.length || answers.some((value) => !ANSWER_POINTS.includes(value))) {
    throw new Error("A complete result requires ten valid assessment answers.");
  }

  const score = answers.reduce((sum, value) => sum + value, 0);
  const categoryResults = CATEGORY_ORDER.map((key, order) => {
    const questionIndexes = QUESTIONS.reduce((indexes, question, index) => {
      if (question.category === key) indexes.push(index);
      return indexes;
    }, []);
    const questionScores = questionIndexes.map((index) => answers[index]);
    return {
      key,
      order,
      ...CATEGORIES[key],
      questionIndexes,
      questionScores,
      score: questionScores.reduce((sum, value) => sum + value, 0) * 5,
    };
  });

  const minimumCategoryScore = Math.min(...categoryResults.map((item) => item.score));
  const primaryCategories = categoryResults.filter((item) => item.score === minimumCategoryScore);
  const nextScore = Math.min(
    ...categoryResults.filter((item) => item.score > minimumCategoryScore).map((item) => item.score)
  );
  const secondaryCategories = Number.isFinite(nextScore)
    ? categoryResults.filter((item) => item.score === nextScore)
    : [];
  const actionCategory = [...primaryCategories].sort((left, right) => {
    const weakestQuestionDifference = Math.min(...left.questionScores) - Math.min(...right.questionScores);
    return weakestQuestionDifference || left.order - right.order;
  })[0];
  const isAlignedOperator = score >= 80 && categoryResults.every((item) => item.score >= 70);
  const status = getScoreStatus(score);
  const primaryProfiles = isAlignedOperator
    ? [ALIGNED_OPERATOR.profile]
    : primaryCategories.map((item) => item.profile);
  const nextCategories = isAlignedOperator ? primaryCategories : secondaryCategories;

  return {
    score,
    status,
    categoryResults,
    minimumCategoryScore,
    isAlignedOperator,
    primaryCategories,
    primaryProfiles,
    primaryProfileLabel: joinWithAnd(primaryProfiles),
    primaryCategoryLabel: joinWithAnd(primaryCategories.map((item) => item.name)),
    secondaryCategories: nextCategories,
    secondaryProfiles: nextCategories.map((item) => item.profile),
    secondaryProfileLabel: joinWithAnd(nextCategories.map((item) => item.profile)),
    secondaryCategoryLabel: joinWithAnd(nextCategories.map((item) => item.name)),
    actionCategory,
    resultContent: isAlignedOperator ? ALIGNED_OPERATOR : actionCategory,
  };
}

export function parseTrackingContext(search = "", referrer = "", siteOrigin = "") {
  const params = new URLSearchParams(search);
  const utm = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
  };
  let referringHost = "";
  try {
    if (referrer) referringHost = new URL(referrer).hostname;
  } catch {
    referringHost = "";
  }
  let siteHost = "";
  try {
    if (siteOrigin) siteHost = new URL(siteOrigin).hostname;
  } catch {
    siteHost = "";
  }
  const source = params.get("source") || utm.utm_source || (referringHost && referringHost !== siteHost ? referringHost : "direct");
  return { source, ...utm };
}

export function buildResultParameters(result, tracking, completion) {
  return {
    assessment_score: String(result.score),
    assessment_status: result.status.status,
    primary_profile: result.primaryProfileLabel,
    secondary_profile: result.secondaryProfileLabel,
    assessment_completed_at: completion.latest,
    assessment_first_completed_at: completion.first,
    assessment_latest_completed_at: completion.latest,
    source: tracking.source,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_term: tracking.utm_term,
    utm_content: tracking.utm_content,
  };
}

export function appendParameters(url, values) {
  const [base, hash = ""] = url.split("#");
  const separator = base.includes("?") ? "&" : "?";
  const query = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  const suffix = query.toString();
  return `${base}${suffix ? separator + suffix : ""}${hash ? `#${hash}` : ""}`;
}
