import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { NumericBlockView } from "@/modules/content/components/numeric-block";
import { QuizBlockView } from "@/modules/content/components/quiz-block";
import {
  correctOptionIndices,
  isSelectionCorrect,
  normalizeSelection,
  optionVerdicts,
} from "@/modules/content/lib/quiz-grading";
import {
  canCheckSelection,
  canRevealNumeric,
  canRevealSelection,
  checkNumeric,
  checkSelection,
  editNumeric,
  initialMultiSelectState,
  initialNumericState,
  multiSelectLocked,
  multiSelectView,
  retrySelection,
  revealNumeric,
  revealSelection,
  toggleOption,
  type MultiSelectState,
  type NumericState,
} from "@/modules/content/lib/question-state";
import { quizDisplayOrder } from "@/modules/content/lib/quiz-shuffle";
import {
  lessonBlocksSchema,
  parseLessonBlocks,
  type NumericBlock,
  type QuizBlock,
} from "@/modules/content/schemas/blocks";
import { quizAttemptSchema } from "@/modules/progress/attempt-schema";

const valid = (block: unknown) => lessonBlocksSchema.safeParse([block]).success;
const issues = (block: unknown) => {
  const result = lessonBlocksSchema.safeParse([block]);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};

const multi = {
  type: "quiz",
  id: "jee-multi-1",
  variant: "practice",
  multiple: true,
  question: "Which are vectors?",
  options: [
    { text: "velocity", correct: true, feedback: "Has direction." },
    { text: "speed", feedback: "Magnitude only." },
    { text: "force", correct: true },
    { text: "work", feedback: "A scalar (dot product)." },
  ],
} as const;

const numeric = {
  type: "numeric",
  id: "jee-num-1",
  variant: "mastery",
  question: "A ball falls for $2\\,\\text{s}$ from rest. Distance?",
  answer: 19.6,
  tolerance: 0.1,
  unit: "$\\text{m}$",
  hint: "Use $s = \\tfrac12 g t^2$.",
  solution: "$s = \\tfrac12 (9.8)(2)^2 = 19.6$ m.\n\n- square the time\n- halve",
  commonMistakes: [{ answer: 9.8, feedback: "Square the time." }],
} as const;

describe("quiz schema: single vs multiple correct", () => {
  const single = {
    type: "quiz",
    variant: "practice",
    question: "2 + 2?",
    options: [{ text: "4", correct: true }, { text: "5" }],
  };

  it("accepts a single-correct quiz without the flag (and with multiple: false)", () => {
    expect(valid(single)).toBe(true);
    expect(valid({ ...single, multiple: false })).toBe(true);
  });

  it("rejects more than one correct option without multiple: true", () => {
    const twoCorrect = { ...single, options: [{ text: "4", correct: true }, { text: "2²", correct: true }] };
    expect(valid(twoCorrect)).toBe(false);
    expect(issues(twoCorrect).join()).toMatch(/multiple: true/);
    expect(valid({ ...twoCorrect, multiple: false })).toBe(false);
    expect(valid({ ...twoCorrect, multiple: true })).toBe(true);
  });

  it("rejects a quiz with no correct option, with or without the flag", () => {
    const none = { ...single, options: [{ text: "4" }, { text: "5" }] };
    expect(valid(none)).toBe(false);
    expect(valid({ ...none, multiple: true })).toBe(false);
  });

  it("allows multiple: true with one correct option (JEE 'one or more correct') or all correct", () => {
    expect(valid({ ...single, multiple: true })).toBe(true);
    expect(
      valid({ ...single, multiple: true, options: [{ text: "a", correct: true }, { text: "b", correct: true }] }),
    ).toBe(true);
  });

  it("accepts the full multiple-correct example unchanged", () => {
    expect(parseLessonBlocks([multi])).toEqual([multi]);
    expect(valid({ ...multi, multiple: "yes" })).toBe(false);
  });
});

describe("numeric schema", () => {
  it("accepts a full numeric block unchanged, and the minimal shape", () => {
    expect(parseLessonBlocks([numeric])).toEqual([numeric]);
    expect(valid({ type: "numeric", variant: "practice", question: "q", answer: 7 })).toBe(true);
    expect(valid({ type: "numeric", variant: "practice", question: "q", answer: -1.6e-19, relTolerance: 0.01 })).toBe(true);
  });

  it("rejects missing/blank question, missing or non-finite answer, bad variant", () => {
    const base = { type: "numeric", variant: "practice", question: "q", answer: 1 };
    expect(valid({ ...base, question: " " })).toBe(false);
    expect(valid({ ...base, answer: undefined })).toBe(false);
    expect(valid({ ...base, answer: "1" })).toBe(false);
    expect(valid({ ...base, answer: Infinity })).toBe(false);
    expect(valid({ ...base, answer: NaN })).toBe(false);
    expect(valid({ ...base, variant: "exam" })).toBe(false);
    expect(valid({ ...base, id: "" })).toBe(false);
  });

  it("rejects negative tolerances and relTolerance above 1", () => {
    const base = { type: "numeric", variant: "practice", question: "q", answer: 1 };
    expect(valid({ ...base, tolerance: -0.1 })).toBe(false);
    expect(valid({ ...base, relTolerance: -0.01 })).toBe(false);
    expect(valid({ ...base, relTolerance: 5 })).toBe(false);
    expect(valid({ ...base, tolerance: 0, relTolerance: 1 })).toBe(true);
  });

  it("rejects blank unit/hint/solution and empty or blank common mistakes", () => {
    const base = { type: "numeric", variant: "practice", question: "q", answer: 1 };
    expect(valid({ ...base, unit: "" })).toBe(false);
    expect(valid({ ...base, hint: " " })).toBe(false);
    expect(valid({ ...base, solution: "" })).toBe(false);
    expect(valid({ ...base, commonMistakes: [] })).toBe(false);
    expect(valid({ ...base, commonMistakes: [{ answer: 2, feedback: " " }] })).toBe(false);
    expect(valid({ ...base, commonMistakes: [{ answer: 2, feedback: "x", tolerance: -1 }] })).toBe(false);
  });

  it("requires an absolute tolerance when the answer is 0 and relTolerance is set", () => {
    const zero = { type: "numeric", variant: "practice", question: "q", answer: 0 };
    expect(valid(zero)).toBe(true);
    expect(valid({ ...zero, relTolerance: 0.01 })).toBe(false);
    expect(issues({ ...zero, relTolerance: 0.01 }).join()).toMatch(/absolute tolerance/);
    expect(valid({ ...zero, relTolerance: 0.01, tolerance: 0.001 })).toBe(true);
    expect(valid({ ...zero, relTolerance: 0 })).toBe(true);
    expect(valid({ ...zero, answer: 5, relTolerance: 0.01 })).toBe(true);
  });

  it("rejects a common mistake the correct-answer check would already accept", () => {
    const base = { type: "numeric", variant: "practice", question: "q", answer: 10, tolerance: 0.5 };
    expect(valid({ ...base, commonMistakes: [{ answer: 10.4, feedback: "x" }] })).toBe(false);
    expect(valid({ ...base, commonMistakes: [{ answer: 10.6, feedback: "x" }] })).toBe(true);
    expect(
      valid({ ...base, tolerance: undefined, relTolerance: 0.1, commonMistakes: [{ answer: 11, feedback: "x" }] }),
    ).toBe(false);
  });
});

describe("multi-select grading", () => {
  const options = [{ correct: true }, {}, { correct: true }, { correct: false }];

  it("finds the correct authored indices", () => {
    expect(correctOptionIndices(options)).toEqual([0, 2]);
  });

  it("is correct only when the selected set equals the correct set", () => {
    expect(isSelectionCorrect(options, [0, 2])).toBe(true);
    expect(isSelectionCorrect(options, [2, 0])).toBe(true);
    expect(isSelectionCorrect(options, new Set([2, 0, 2]))).toBe(true);
    expect(isSelectionCorrect(options, [0])).toBe(false); // missed one
    expect(isSelectionCorrect(options, [0, 1, 2])).toBe(false); // extra wrong
    expect(isSelectionCorrect(options, [0, 1, 2, 3])).toBe(false); // select-all
    expect(isSelectionCorrect(options, [])).toBe(false);
    expect(isSelectionCorrect(options, [1, 3])).toBe(false);
  });

  it("normalizes selections to sorted unique indices", () => {
    expect(normalizeSelection([3, 1, 3, 0])).toEqual([0, 1, 3]);
  });

  it("labels each option hit / wrong / missed / neutral", () => {
    expect(optionVerdicts(options, [0, 1])).toEqual(["hit", "wrong", "missed", "neutral"]);
  });
});

describe("multi-select state: a wrong Check never reveals the answer", () => {
  // Authored: 0 correct, 1 wrong, 2 correct, 3 wrong.
  const options = [
    { correct: true, feedback: "f0" },
    { feedback: "f1" },
    { correct: true, feedback: "f2" },
    { feedback: "f3" },
  ];
  const tick = (state: MultiSelectState, ...indices: number[]) =>
    indices.reduce(toggleOption, state);
  const check = (state: MultiSelectState) => checkSelection(state, options);

  it("ignores Check with nothing ticked", () => {
    expect(check(initialMultiSelectState)).toEqual({ state: initialMultiSelectState });
  });

  it("marks only ticked options and says what kind of mistake, without counts", () => {
    // One right tick, one wrong tick, one correct option missing.
    const { state, attempt } = check(tick(initialMultiSelectState, 0, 1));
    expect(attempt).toEqual({ correct: false, selected: [0, 1] });
    const view = multiSelectView(state, options);
    expect(view.verdicts).toEqual(["hit", "wrong", null, null]);
    expect(view.showFeedback).toEqual([false, true, false, false]);
    expect(view.status).toBe("both");

    expect(multiSelectView(check(tick(initialMultiSelectState, 0)).state, options).status).toBe("missing");
    expect(multiSelectView(check(tick(initialMultiSelectState, 0, 2, 3)).state, options).status).toBe("wrong-ticks");
  });

  it("locks options while a result shows; Try again keeps ticks and clears verdicts", () => {
    const { state } = check(tick(initialMultiSelectState, 0, 1));
    expect(multiSelectLocked(state)).toBe(true);
    expect(toggleOption(state, 2)).toBe(state);
    const retry = retrySelection(state);
    expect(retry.picked).toEqual([0, 1]);
    expect(multiSelectView(retry, options).status).toBe("open");
    expect(multiSelectView(retry, options).verdicts).toEqual([null, null, null, null]);
    expect(toggleOption(retry, 1).picked).toEqual([0]);
  });

  it("after Try again, re-checking the same ticks is not another attempt", () => {
    const first = check(tick(initialMultiSelectState, 1)).state;
    expect(first.lastChecked).toEqual([1]);
    const retry = retrySelection(first);
    expect(canCheckSelection(retry)).toBe(false);
    expect(check(retry)).toEqual({ state: retry });
    // Untick and re-tick the same option: still the same selection.
    expect(canCheckSelection(tick(retry, 1, 1))).toBe(false);
    // A changed selection can be checked again.
    const changed = tick(retry, 3);
    expect(canCheckSelection(changed)).toBe(true);
    expect(check(changed).attempt).toEqual({ correct: false, selected: [1, 3] });
    expect(canCheckSelection(initialMultiSelectState)).toBe(false);
  });

  it("offers Show answer only after two wrong Checks, then marks missed options with feedback", () => {
    let state = check(tick(initialMultiSelectState, 1)).state;
    expect(canRevealSelection(state)).toBe(false);
    expect(revealSelection(state)).toBe(state);
    state = check(tick(retrySelection(state), 1, 3)).state;
    expect(state.picked).toEqual([3]);
    expect(state.wrongChecks).toBe(2);
    expect(canRevealSelection(state)).toBe(true);

    state = revealSelection(state);
    const view = multiSelectView(state, options);
    expect(view.status).toBe("revealed");
    expect(view.verdicts).toEqual(["missed", null, "missed", "wrong"]);
    expect(view.showFeedback).toEqual([true, false, true, true]);
  });

  it("Show answer grades the last checked ticks, not later unchecked edits", () => {
    let state = check(tick(initialMultiSelectState, 1)).state;
    state = check(tick(retrySelection(state), 3)).state;
    // Try again, tick another option, then reveal without checking.
    state = tick(retrySelection(state), 0);
    expect(state.picked).toEqual([0, 1, 3]);
    state = revealSelection(state);
    expect(state.picked).toEqual([1, 3]);
    expect(multiSelectView(state, options).verdicts).toEqual(["missed", "wrong", "missed", "wrong"]);
    // Nothing checked yet this visit (restored wrong count): nothing graded.
    const restored = revealSelection({ ...initialMultiSelectState, picked: [1], wrongChecks: 2 });
    expect(restored.picked).toEqual([]);
    expect(multiSelectView(restored, options).verdicts).toEqual(["missed", null, "missed", null]);
  });

  it("records nothing after the answer is revealed (options stay locked)", () => {
    let state = check(tick(initialMultiSelectState, 1)).state;
    state = revealSelection(check(tick(retrySelection(state), 3)).state);
    expect(retrySelection(state)).toBe(state);
    expect(toggleOption(state, 0)).toBe(state);
    expect(check(state).attempt).toBeUndefined();
  });

  it("a correct Check shows feedback on the ticked options and locks for good", () => {
    const { state, attempt } = check(tick(initialMultiSelectState, 2, 0));
    expect(attempt).toEqual({ correct: true, selected: [0, 2] });
    const view = multiSelectView(state, options);
    expect(view.status).toBe("correct");
    expect(view.verdicts).toEqual(["hit", null, "hit", null]);
    expect(view.showFeedback).toEqual([true, false, true, false]);
    expect(retrySelection(state)).toBe(state);
    expect(canRevealSelection(state)).toBe(false);
  });
});

describe("numeric state", () => {
  const spec = { answer: 19.6, tolerance: 0.1, commonMistakes: [{ answer: 9.8, feedback: "square t" }] };
  const check = (state: NumericState, input: string) => checkNumeric(state, input, spec);

  it("records a wrong attempt once, however often the same input is checked", () => {
    const first = check(initialNumericState, "5");
    expect(first.attempt).toEqual({ correct: false, value: 5 });
    expect(first.state.wrongCount).toBe(1);
    const again = check(first.state, "5");
    expect(again.attempt).toBeUndefined();
    expect(again.state).toBe(first.state);
  });

  it("does not count or record unparseable input; editing clears the message", () => {
    const { state, attempt } = check(initialNumericState, "5 m");
    expect(attempt).toBeUndefined();
    expect(state.result?.kind).toBe("invalid");
    expect(state.wrongCount).toBe(0);
    expect(editNumeric(state).result).toBeNull();
  });

  it("matches common mistakes and offers the reveal after two wrong attempts", () => {
    let { state } = check(initialNumericState, "9.8");
    expect(state.result).toEqual({ kind: "wrong", mistake: spec.commonMistakes[0] });
    expect(canRevealNumeric(state)).toBe(false);
    expect(revealNumeric(state)).toBe(state);
    state = check(editNumeric(state), "3").state;
    expect(canRevealNumeric(state)).toBe(true);
    expect(revealNumeric(state).revealed).toBe(true);
  });

  it("stops recording after the reveal but still grades the learner's input", () => {
    let { state } = check(initialNumericState, "1");
    state = check(editNumeric(state), "2").state;
    state = revealNumeric(state);
    const after = check(editNumeric(state), "19.6");
    expect(after.attempt).toBeUndefined();
    expect(after.state.result).toEqual({ kind: "correct" });
  });

  it("keeps a correct result through edits and never offers a reveal after it", () => {
    const { state, attempt } = check(initialNumericState, "98/5");
    expect(attempt).toEqual({ correct: true, value: 19.6 });
    expect(editNumeric(state)).toBe(state);
    expect(canRevealNumeric({ ...state, wrongCount: 5 })).toBe(false);
  });
});

describe("attempt input validation", () => {
  const base = {
    lessonId: "8f14e45f-ceea-467a-9575-6f0d6a0b5c1e",
    questionId: "q1",
    correct: true,
  };
  const ok = (input: unknown) => quizAttemptSchema.safeParse(input).success;

  it("keeps the single-correct shape working", () => {
    expect(ok({ ...base, selectedIndex: 2 })).toBe(true);
    expect(ok({ ...base, selectedIndex: 51 })).toBe(false);
  });

  it("accepts multi-select and numeric responses with selectedIndex -1", () => {
    expect(ok({ ...base, selectedIndex: -1, response: { selected: [0, 2] } })).toBe(true);
    expect(ok({ ...base, selectedIndex: -1, response: { value: -1.6e-19 } })).toBe(true);
  });

  it("requires selectedIndex -1 exactly when a response is sent", () => {
    expect(ok({ ...base, selectedIndex: -1 })).toBe(false);
    expect(ok({ ...base, selectedIndex: 0, response: { value: 3 } })).toBe(false);
    expect(ok({ ...base, selectedIndex: -2, response: { value: 3 } })).toBe(false);
  });

  it("rejects malformed responses", () => {
    const r = (response: unknown) => ok({ ...base, selectedIndex: -1, response });
    expect(r({ selected: [] })).toBe(false);
    expect(r({ selected: [2, 0] })).toBe(false); // unsorted
    expect(r({ selected: [1, 1] })).toBe(false); // duplicate
    expect(r({ selected: [0.5] })).toBe(false);
    expect(r({ selected: [-1] })).toBe(false);
    expect(r({ value: Infinity })).toBe(false);
    expect(r({ value: "3" })).toBe(false);
    expect(r({ value: 3, selected: [0] })).toBe(false);
    expect(r({})).toBe(false);
  });
});

describe("QuizBlockView with multiple: true (server render)", () => {
  const [block] = parseLessonBlocks([multi]) as [QuizBlock];
  const html = renderToString(createElement(QuizBlockView, { block }));

  it("labels the checkbox group with the question", () => {
    const groupLabel = html.match(/role="group" aria-labelledby="([^"]+)"/)?.[1];
    expect(groupLabel).toBeTruthy();
    expect(html).toMatch(new RegExp(`<p id="${groupLabel}"[^>]*>Which are vectors\\?`));
    expect(html).not.toContain("Show answer");
  });

  it("renders checkboxes, the select-all instruction and a disabled Check button", () => {
    expect(html.match(/role="checkbox"/g)).toHaveLength(4);
    expect(html.match(/aria-checked="false"/g)).toHaveLength(4);
    expect(html).toContain("Select all that apply");
    expect(html).toMatch(/<button[^>]*disabled=""[^>]*>Check<\/button>/);
    // Feedback stays hidden until Check.
    expect(html).not.toContain("Has direction.");
  });

  it("shuffles the options with the same seeded order as single-correct quizzes", () => {
    const order = quizDisplayOrder(4, "jee-multi-1");
    const rendered = block.options
      .map((o, i) => ({ i, at: html.indexOf(`>${o.text}<`) }))
      .sort((a, b) => a.at - b.at)
      .map((x) => x.i);
    expect(rendered).toEqual(order);
  });

  it("keeps the single-correct quiz markup (buttons, no checkboxes, no Check)", () => {
    const single = renderToString(
      createElement(QuizBlockView, {
        block: { ...block, multiple: undefined, options: [{ text: "a", correct: true }, { text: "b" }] },
      }),
    );
    expect(single).not.toContain('role="checkbox"');
    expect(single).not.toContain(">Check<");
  });
});

describe("NumericBlockView (server render)", () => {
  const [block] = parseLessonBlocks([numeric]) as [NumericBlock];
  const render = (b: NumericBlock) => renderToString(createElement(NumericBlockView, { block: b }));
  const html = render(block);

  it("renders the question with KaTeX, an input, the unit and a Check button", () => {
    expect(html).toContain("Mastery check");
    expect(html).toContain('class="katex"');
    expect(html).toMatch(/<input[^>]*type="text"/);
    expect(html).toContain('placeholder="e.g. 2.5, -3/4, 1.6e-19"');
    expect(html).toMatch(/>Check<\/button>/);
    expect(html).toContain("Need a hint?");
    expect(html).toContain('aria-live="polite"');
  });

  it("describes the input by the question, unit and feedback; not invalid before a check", () => {
    const describedBy = html.match(/<input[^>]*aria-describedby="([^"]+)"/)?.[1].split(" ");
    expect(describedBy).toHaveLength(3);
    const unitId = describedBy![1];
    expect(html).toContain(`<span id="${unitId}" class="text-sm">`);
    expect(html).not.toContain("aria-invalid");
    const bare = render({ ...block, unit: undefined });
    expect(bare.match(/<input[^>]*aria-describedby="([^"]+)"/)?.[1].split(" ")).toHaveLength(2);
  });

  it("hides the answer, solution and mistake feedback before any attempt", () => {
    expect(html).not.toContain("19.6");
    expect(html).not.toContain("Square the time.");
    expect(html).not.toContain("Show solution");
    expect(html).not.toContain(">Solution<");
  });

  it("renders deterministically and without a unit when none is given", () => {
    expect(render(block)).toBe(html);
    const bare = render({ ...block, unit: undefined });
    expect(bare.match(/class="katex"/g)?.length).toBeLessThan(html.match(/class="katex"/g)!.length);
  });

  it("renders inside BlockRenderer alongside a multiple-correct quiz", () => {
    const out = renderToString(
      createElement(BlockRenderer, { blocks: parseLessonBlocks([{ type: "text", content: "Intro" }, multi, numeric]) }),
    );
    expect(out).toContain("Select all that apply");
    expect(out).toContain('placeholder="e.g. 2.5, -3/4, 1.6e-19"');
    expect(out).not.toContain("NaN");
  });
});
