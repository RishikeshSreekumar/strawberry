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
});
