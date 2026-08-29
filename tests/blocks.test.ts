import { describe, expect, it } from "vitest";
import {
  lessonBlocksSchema,
  parseLessonBlocks,
} from "@/modules/content/schemas/blocks";

describe("lesson block schemas", () => {
  it("accepts a valid mixed block list", () => {
    const blocks = [
      { type: "text", content: "Hello" },
      { type: "math", latex: "x^2" },
      { type: "callout", variant: "tip", content: "Watch out" },
      { type: "callout", variant: "definition", title: "Limit", content: "..." },
    ];
    expect(parseLessonBlocks(blocks)).toEqual(blocks);
  });

  it("rejects an unknown block type", () => {
    expect(() =>
      parseLessonBlocks([{ type: "video", url: "http://x" }]),
    ).toThrow();
  });

  it("rejects empty content", () => {
    expect(() => parseLessonBlocks([{ type: "text", content: "" }])).toThrow();
    expect(() => parseLessonBlocks([{ type: "math", latex: "" }])).toThrow();
  });

  it("rejects an invalid callout variant", () => {
    expect(
      lessonBlocksSchema.safeParse([
        { type: "callout", variant: "danger", content: "x" },
      ]).success,
    ).toBe(false);
  });

  it("rejects non-array input", () => {
    expect(() => parseLessonBlocks({ type: "text", content: "x" })).toThrow();
  });

  it("accepts table blocks", () => {
    const blocks = [
      { type: "table", headers: ["x", "f(x)"], rows: [["1", "1"], ["2", "4"]] },
    ];
    expect(parseLessonBlocks(blocks)).toEqual(blocks);
  });

  it("rejects a table without rows", () => {
    expect(() =>
      parseLessonBlocks([{ type: "table", headers: ["x"], rows: [] }]),
    ).toThrow();
  });

  it("accepts quiz blocks and rejects single-option quizzes", () => {
    const quiz = {
      type: "quiz",
      variant: "practice",
      question: "2 + 2?",
      options: [
        { text: "4", correct: true, feedback: "Yes" },
        { text: "5" },
      ],
    };
    expect(parseLessonBlocks([quiz])).toEqual([quiz]);
    expect(() =>
      parseLessonBlocks([{ ...quiz, options: [{ text: "4" }] }]),
    ).toThrow();
  });

  it("quiz id is optional but must be non-empty when present", () => {
    const quiz = {
      type: "quiz",
      variant: "practice",
      question: "2 + 2?",
      options: [{ text: "4", correct: true }, { text: "5" }],
    };
    expect(parseLessonBlocks([{ ...quiz, id: "lesson-quiz-1" }])).toEqual([
      { ...quiz, id: "lesson-quiz-1" },
    ]);
    expect(parseLessonBlocks([quiz])).toEqual([quiz]);
    expect(() => parseLessonBlocks([{ ...quiz, id: "" }])).toThrow();
  });

  it("accepts interactive blocks and applies config defaults", () => {
    const parsed = parseLessonBlocks([
      {
        type: "interactive",
        config: {
          component: "function-machine",
          expr: "50 + 15*x",
          exprLatex: "50 + 15x",
          min: 0,
          max: 10,
          step: 1,
          initial: 5,
        },
      },
    ]);
    const block = parsed[0];
    if (block.type !== "interactive" || block.config.component !== "function-machine") {
      throw new Error("unexpected parse result");
    }
    expect(block.config.inputLabel).toBe("Input");
    expect(block.config.outputLabel).toBe("Output");
  });

  it("rejects an interactive with an unknown component", () => {
    expect(() =>
      parseLessonBlocks([
        { type: "interactive", config: { component: "3d-plot" } },
      ]),
    ).toThrow();
  });
});
