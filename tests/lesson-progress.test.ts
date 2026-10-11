import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { NumericBlockView } from "@/modules/content/components/numeric-block";
import { QuizBlockView } from "@/modules/content/components/quiz-block";
import {
  canRevealNumeric,
  canRevealSelection,
  initialMultiSelectState,
  initialNumericState,
  numericInputText,
  restoredMultiSelectState,
  restoredNumeric,
  restoredSingleChoice,
  type QuestionProgress,
} from "@/modules/content/lib/question-state";
import { parseNumericInput } from "@/modules/content/lib/numeric-answer";
import {
  applyAttempt,
  createSessionProgress,
  mergeQuestionProgress,
} from "@/modules/content/lib/session-progress";
import {
  lessonBlocksSchema,
  parseLessonBlocks,
  type LessonBlock,
  type NumericBlock,
  type QuizBlock,
} from "@/modules/content/schemas/blocks";
import {
  canAutoComplete,
  lessonQuestions,
  lessonScore,
  questionProgressById,
} from "@/modules/progress/lib/lesson-score";
import type { QuestionAttemptSummary } from "@/modules/progress/services/progress-service";

const single = {
  type: "quiz",
  id: "q-single",
  variant: "practice",
  question: "2 + 2?",
  options: [
    { text: "five", feedback: "Off by one." },
    { text: "four", correct: true, feedback: "Counting works." },
    { text: "three", feedback: "Too few." },
  ],
} as const;

const multi = {
  type: "quiz",
  id: "q-multi",
  variant: "concept",
  multiple: true,
  question: "Which are vectors?",
  options: [
    { text: "velocity", correct: true, feedback: "Has direction." },
    { text: "speed", feedback: "Magnitude only." },
    { text: "force", correct: true, feedback: "Push with a direction." },
  ],
} as const;

const numeric = {
  type: "numeric",
  id: "q-num",
  variant: "mastery",
  question: "Distance fallen in $2\\,\\text{s}$?",
  answer: 19.6,
  tolerance: 0.1,
  unit: "m",
  hint: "Use $s = \\tfrac12 g t^2$.",
  solution: "Square the time, then halve.",
} as const;

const [singleBlock, multiBlock, numericBlock] = parseLessonBlocks([single, multi, numeric]) as [
  QuizBlock,
  QuizBlock,
  NumericBlock,
];

const solved = (solvedWith?: QuestionProgress["solvedWith"], wrongAttempts = 0): QuestionProgress => ({
  solved: true,
  wrongAttempts,
  solvedWith,
});
const unsolved = (wrongAttempts: number): QuestionProgress => ({ solved: false, wrongAttempts });

describe("lessonQuestions", () => {
  it("lists quiz and numeric blocks with ids, once each, flagging mastery", () => {
    const parsed = parseLessonBlocks([
      { type: "text", content: "Intro" },
      single,
      { ...single, id: undefined },
      multi,
      numeric,
    ]);
    // The schema rejects duplicate ids; unvalidated input is still safe.
    const blocks: LessonBlock[] = [...parsed, { ...numericBlock, question: "Duplicate id" }];
    expect(lessonQuestions(blocks)).toEqual([
      { id: "q-single", mastery: false },
      { id: "q-multi", mastery: false },
      { id: "q-num", mastery: true },
    ]);
    expect(lessonQuestions(parseLessonBlocks([{ type: "text", content: "x" }]))).toEqual([]);
  });
});

describe("lessonScore and canAutoComplete", () => {
  const questions = [
    { id: "a", mastery: false },
    { id: "b", mastery: true },
    { id: "c", mastery: true },
  ];

  it("counts solved questions and mastery questions separately", () => {
    expect(lessonScore(questions, new Set())).toEqual({
      correct: 0,
      total: 3,
      masteryCorrect: 0,
      masteryTotal: 2,
    });
    // Ids not in the lesson (removed questions) don't count.
    expect(lessonScore(questions, new Set(["a", "c", "gone"]))).toEqual({
      correct: 2,
      total: 3,
      masteryCorrect: 1,
      masteryTotal: 2,
    });
  });

  it("needs every mastery question, and only those, when the lesson has any", () => {
    expect(canAutoComplete(questions, new Set(["a", "b"]))).toBe(false);
    expect(canAutoComplete(questions, new Set(["b", "c"]))).toBe(true);
    expect(canAutoComplete(questions, new Set(["a", "b", "c"]))).toBe(true);
  });

  it("needs every question when there are no mastery questions", () => {
    const practice = [
      { id: "a", mastery: false },
      { id: "b", mastery: false },
    ];
    expect(canAutoComplete(practice, new Set(["a"]))).toBe(false);
    expect(canAutoComplete(practice, new Set(["a", "b"]))).toBe(true);
  });

  it("never auto-completes a lesson without questions", () => {
    expect(canAutoComplete([], new Set())).toBe(false);
    expect(canAutoComplete([], new Set(["x"]))).toBe(false);
  });
});

describe("questionProgressById", () => {
  const record = (fields: Partial<QuestionAttemptSummary["latest"]> = {}) => ({
    selectedIndex: -1,
    correct: true,
    response: null,
    attemptedAt: new Date(0),
    ...fields,
  });

  it("maps summaries to restore data in each question type's shape", () => {
    const summaries: QuestionAttemptSummary[] = [
      {
        questionId: "s",
        attempts: 2,
        wrongAttempts: 1,
        everCorrect: true,
        latest: record({ correct: false, selectedIndex: 0 }),
        latestCorrect: record({ selectedIndex: 1 }),
      },
      {
        questionId: "m",
        attempts: 1,
        wrongAttempts: 0,
        everCorrect: true,
        latest: record({ response: { selected: [0, 2] } }),
        latestCorrect: record({ response: { selected: [0, 2] } }),
      },
      {
        questionId: "n",
        attempts: 3,
        wrongAttempts: 3,
        everCorrect: false,
        latest: record({ correct: false, response: { value: 1 } }),
        latestCorrect: null,
      },
      {
        questionId: "v",
        attempts: 1,
        wrongAttempts: 0,
        everCorrect: true,
        latest: record({ response: { value: 19.6 } }),
        latestCorrect: record({ response: { value: 19.6 } }),
      },
    ];
    expect(questionProgressById(summaries)).toEqual({
      s: { solved: true, wrongAttempts: 1, solvedWith: { selectedIndex: 1 } },
      m: { solved: true, wrongAttempts: 0, solvedWith: { selected: [0, 2] } },
      n: { solved: false, wrongAttempts: 3 },
      v: { solved: true, wrongAttempts: 0, solvedWith: { value: 19.6 } },
    });
  });
});

describe("restoring question state (pure)", () => {
  it("single choice: solved shows the correct option, unsolved starts fresh", () => {
    expect(restoredSingleChoice(singleBlock.options, undefined)).toBeNull();
    expect(restoredSingleChoice(singleBlock.options, unsolved(3))).toBeNull();
    expect(restoredSingleChoice(singleBlock.options, solved({ selectedIndex: 1 }))).toBe(1);
    // Saved index no longer correct (content changed) or missing: first correct option.
    expect(restoredSingleChoice(singleBlock.options, solved({ selectedIndex: 0 }))).toBe(1);
    expect(restoredSingleChoice(singleBlock.options, solved({ selectedIndex: 9 }))).toBe(1);
    expect(restoredSingleChoice(singleBlock.options, solved())).toBe(1);
  });

  it("multi-select: solved is locked and solved; unsolved keeps the wrong count", () => {
    expect(restoredMultiSelectState(multiBlock.options, undefined)).toBe(initialMultiSelectState);
    const solvedState = restoredMultiSelectState(multiBlock.options, solved({ selected: [0, 2] }, 1));
    expect(solvedState).toEqual({
      picked: [0, 2],
      checked: true,
      lastChecked: [0, 2],
      solved: true,
      wrongChecks: 1,
      revealed: false,
    });
    // A stale saved selection falls back to the authored correct set.
    expect(restoredMultiSelectState(multiBlock.options, solved({ selected: [1] })).picked).toEqual([
      0, 2,
    ]);
    const open = restoredMultiSelectState(multiBlock.options, unsolved(2));
    expect(open).toEqual({ ...initialMultiSelectState, wrongChecks: 2 });
    expect(canRevealSelection(open)).toBe(true);
    expect(canRevealSelection(restoredMultiSelectState(multiBlock.options, unsolved(1)))).toBe(false);
  });

  it("numeric: solved shows the learner's value; unsolved is empty with the wrong count", () => {
    expect(restoredNumeric(numericBlock, undefined)).toEqual({ input: "", state: initialNumericState });
    expect(restoredNumeric(numericBlock, solved({ value: 19.55 }))).toEqual({
      input: "19.55",
      state: { result: { kind: "correct" }, wrongCount: 0, revealed: false },
    });
    // No usable saved value (legacy row, or no longer within tolerance): the authored answer.
    expect(restoredNumeric(numericBlock, solved()).input).toBe("19.6");
    expect(restoredNumeric(numericBlock, solved({ value: 3 })).input).toBe("19.6");
    const open = restoredNumeric(numericBlock, unsolved(2));
    expect(open.input).toBe("");
    expect(canRevealNumeric(open.state)).toBe(true);
  });

  it("numericInputText round-trips through the input parser", () => {
    for (const v of [0.75, -3, 19.6, 1.6e-19, 6.02e23, 0.1 + 0.2]) {
      const parsed = parseNumericInput(numericInputText(v));
      expect(parsed.ok && Math.abs(parsed.value - v) <= 1e-9 * Math.abs(v)).toBe(true);
    }
    expect(numericInputText(0.1 + 0.2)).toBe("0.3");
  });
});

describe("server render with restored progress", () => {
  const render = (el: Parameters<typeof renderToString>[0]) => renderToString(el);

  it("single choice: a solved quiz renders answered, with the correct option's feedback", () => {
    const html = render(
      createElement(QuizBlockView, { block: singleBlock, progress: solved({ selectedIndex: 1 }) }),
    );
    expect(html).toContain("Correct. ");
    expect(html).toContain("Counting works.");
    expect(html).toContain("border-success bg-success/10");
    expect(html).not.toContain("Off by one.");
    expect(html).not.toContain("Try again");
    // Answered correctly: options no longer take clicks.
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(3);
    // Same markup on every render: nothing hydration-sensitive.
    expect(
      render(createElement(QuizBlockView, { block: singleBlock, progress: solved({ selectedIndex: 1 }) })),
    ).toBe(html);
  });

  it("single choice: an unsolved quiz renders exactly like a fresh one", () => {
    const fresh = render(createElement(QuizBlockView, { block: singleBlock }));
    expect(render(createElement(QuizBlockView, { block: singleBlock, progress: unsolved(2) }))).toBe(
      fresh,
    );
    expect(fresh).not.toContain("Correct.");
  });

  it("multi-select: a solved quiz renders locked with the correct ticks", () => {
    const html = render(
      createElement(QuizBlockView, { block: multiBlock, progress: solved({ selected: [0, 2] }) }),
    );
    expect(html).toContain("Correct. You found every correct option.");
    expect(html.match(/aria-checked="true"/g)).toHaveLength(2);
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(3);
    expect(html).toContain("Has direction.");
    expect(html).not.toContain(">Check<");
    expect(html).not.toContain("Show answer");
  });

  it("multi-select: unsolved after two wrong checks renders fresh, with Show answer", () => {
    const html = render(createElement(QuizBlockView, { block: multiBlock, progress: unsolved(2) }));
    expect(html).not.toContain('aria-checked="true"');
    expect(html).toMatch(/<button[^>]*disabled=""[^>]*>Check<\/button>/);
    expect(html).toContain("Show answer");
    expect(html).not.toContain("Not quite");
  });

  it("numeric: a solved question renders the value read-only with the solution", () => {
    const html = render(
      createElement(NumericBlockView, { block: numericBlock, progress: solved({ value: 19.55 }) }),
    );
    expect(html).toMatch(/<input[^>]*value="19.55"[^>]*readOnly=""|<input[^>]*readOnly=""[^>]*value="19.55"/);
    expect(html).toContain("Correct.");
    expect(html).toContain(">Solution<");
    expect(html).toContain("Square the time, then halve.");
    expect(html).not.toContain(">Check<");
    expect(html).not.toContain("Need a hint?");
  });

  it("numeric: unsolved renders an empty input and no solution", () => {
    const html = render(createElement(NumericBlockView, { block: numericBlock, progress: unsolved(1) }));
    expect(html).toMatch(/<input[^>]*value=""/);
    expect(html).not.toContain(">Solution<");
    expect(html).not.toContain("Show solution");
    expect(html).toContain("Need a hint?");
  });

  it("BlockRenderer routes progress to questions by id and ignores it without one", () => {
    const blocks = parseLessonBlocks([single, multi, numeric, { ...single, id: undefined }]);
    const html = render(
      createElement(BlockRenderer, {
        blocks,
        lessonId: "00000000-0000-0000-0000-000000000000",
        questionProgress: {
          "q-single": solved({ selectedIndex: 1 }),
          "q-num": solved({ value: 19.6 }),
          // Not in this lesson: ignored.
          "q-gone": solved(),
        },
      }),
    );
    // The id-less copy of the single quiz stays fresh: one "Correct." for
    // the single quiz, one for numeric.
    expect(html.match(/Correct\. /g)).toHaveLength(1);
    expect(html).toContain(">Solution<");
    expect(html).not.toContain("You found every correct option");
    // Without progress (admin preview) nothing is restored.
    const preview = render(createElement(BlockRenderer, { blocks }));
    expect(preview).not.toContain("Counting works.");
    expect(preview).not.toContain(">Solution<");
  });
});

describe("session progress (Back/Forward survival)", () => {
  it("applyAttempt counts wrong attempts and records the correct answer's shape", () => {
    let p = applyAttempt(undefined, { selectedIndex: 2, correct: false });
    expect(p).toEqual({ solved: false, wrongAttempts: 1 });
    p = applyAttempt(p, { selectedIndex: 1, correct: true });
    expect(p).toEqual({ solved: true, wrongAttempts: 1, solvedWith: { selectedIndex: 1 } });
    expect(
      applyAttempt(undefined, { selectedIndex: -1, correct: true, response: { selected: [0, 2] } }),
    ).toEqual({ solved: true, wrongAttempts: 0, solvedWith: { selected: [0, 2] } });
    expect(
      applyAttempt(undefined, { selectedIndex: -1, correct: true, response: { value: 19.6 } }),
    ).toEqual({ solved: true, wrongAttempts: 0, solvedWith: { value: 19.6 } });
  });

  it("merges over the server snapshot: solved wins, newer answer wins, max wrong count", () => {
    expect(mergeQuestionProgress(undefined, undefined)).toBeUndefined();
    expect(mergeQuestionProgress(unsolved(1), undefined)).toEqual(unsolved(1));
    expect(mergeQuestionProgress(undefined, unsolved(2))).toEqual(unsolved(2));
    expect(mergeQuestionProgress(unsolved(3), solved({ value: 19.55 }, 1))).toEqual(
      solved({ value: 19.55 }, 3),
    );
    expect(mergeQuestionProgress(solved({ value: 19.6 }, 0), unsolved(2))).toEqual(
      solved({ value: 19.6 }, 2),
    );
  });

  it("is keyed by lesson and question, and tracks completed lessons", () => {
    const store = createSessionProgress({ isServer: () => false });
    store.noteAttempt("lesson-1", "q1", { selectedIndex: 0, correct: false });
    store.noteAttempt("lesson-1", "q1", { selectedIndex: 1, correct: true });
    store.noteAttempt("lesson-1", "q2", { selectedIndex: 0, correct: false });
    store.noteAttempt("lesson-2", "q1", { selectedIndex: 0, correct: false });
    expect(store.question("lesson-1", "q1")).toEqual(solved({ selectedIndex: 1 }, 1));
    expect(store.question("lesson-2", "q1")).toEqual(unsolved(1));
    expect(store.question(undefined, "q1")).toBeUndefined();
    expect(store.question("lesson-1", undefined)).toBeUndefined();
    expect(store.solvedIds("lesson-1")).toEqual(["q1"]);
    expect(store.solvedIds("lesson-3")).toEqual([]);
    expect(store.isCompleted("lesson-1")).toBe(false);
    store.noteCompleted("lesson-1");
    expect(store.isCompleted("lesson-1")).toBe(true);
    expect(store.isCompleted("lesson-2")).toBe(false);
  });
});

describe("session progress seeding and server guard", () => {
  it("seeds a question's first entry from the card's server progress", () => {
    const store = createSessionProgress({ isServer: () => false });
    // Server said 2 wrong attempts; one more wrong in this tab makes 3.
    store.noteAttempt("l", "q", { selectedIndex: 0, correct: false }, unsolved(2));
    expect(store.question("l", "q")).toEqual(unsolved(3));
    // Later attempts build on the tab's entry, not on a (stale) seed.
    store.noteAttempt("l", "q", { selectedIndex: 0, correct: false }, unsolved(0));
    expect(store.question("l", "q")).toEqual(unsolved(4));
    // A stale Back payload (still saying 2) merges to the right count.
    expect(mergeQuestionProgress(unsolved(2), store.question("l", "q"))).toEqual(unsolved(4));
    // Reveal stays available on that stale payload.
    const restored = restoredMultiSelectState(
      multiBlock.options,
      mergeQuestionProgress(unsolved(1), store.question("l", "q")),
    );
    expect(canRevealSelection(restored)).toBe(true);
  });

  it("ignores writes on the server (module state shared by all requests)", () => {
    const store = createSessionProgress({ isServer: () => true });
    store.noteAttempt("l", "q", { selectedIndex: 1, correct: true });
    store.noteCompleted("l");
    expect(store.question("l", "q")).toBeUndefined();
    expect(store.isCompleted("l")).toBe(false);
    // The default detects the server (vitest runs in node: no window).
    const defaultStore = createSessionProgress();
    defaultStore.noteAttempt("l", "q", { selectedIndex: 1, correct: true });
    expect(defaultStore.question("l", "q")).toBeUndefined();
  });
});

describe("lesson block schema: ids and zero answers", () => {
  const issues = (blocks: unknown[]) => {
    const result = lessonBlocksSchema.safeParse(blocks);
    return result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
  };
  const example = {
    type: "worked-example",
    id: "q-num",
    problem: "Find it.",
    steps: [{ text: "Do it." }],
    answer: "Done.",
  };

  it("rejects duplicate question and worked-example ids within a lesson", () => {
    expect(issues([single, multi, numeric])).toEqual([]);
    expect(issues([single, { ...numeric, id: "q-single" }])).toEqual([
      '1.id: duplicate block id "q-single" (also used by block 0)',
    ]);
    expect(issues([numeric, example])[0]).toMatch(/^1\.id: duplicate block id "q-num"/);
    // Id-less blocks never clash.
    expect(issues([{ ...single, id: undefined }, { ...single, id: undefined }])).toEqual([]);
  });

  it("an answer of 0 with relTolerance needs a positive absolute tolerance", () => {
    const zero = { ...numeric, answer: 0, tolerance: undefined, commonMistakes: undefined };
    expect(issues([{ ...zero, relTolerance: 0.01 }])).toHaveLength(1);
    expect(issues([{ ...zero, relTolerance: 0.01, tolerance: 0 }])).toHaveLength(1);
    expect(issues([{ ...zero, relTolerance: 0.01, tolerance: 0.001 }])).toEqual([]);
    // Exact zero (integer type) is fine.
    expect(issues([zero])).toEqual([]);
  });
});
