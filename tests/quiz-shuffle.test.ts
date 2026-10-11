import { readdirSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { beforeAll, describe, expect, it } from "vitest";
import { QuizBlockView } from "@/modules/content/components/quiz-block";
import {
  quizDisplayOrder,
  quizShuffleSeed,
} from "@/modules/content/lib/quiz-shuffle";
import type { LessonBlock, QuizBlock } from "@/modules/content/schemas/blocks";

const contentDir = join(__dirname, "../src/modules/content");

type CourseQuiz = { course: string; file: string; block: QuizBlock };

/** Every quiz block in every content file, tagged with its course prefix. */
async function loadAllQuizzes(): Promise<CourseQuiz[]> {
  const files = readdirSync(contentDir).filter((f) => f.endsWith("-content.ts"));
  const quizzes: CourseQuiz[] = [];
  for (const file of files) {
    // chapter-N-content.ts is the original calculus course.
    const course = file.replace(/-?chapter-\d+-content\.ts$/, "") || "calculus";
    const mod: Record<string, unknown> = await import(join(contentDir, file));
    for (const value of Object.values(mod)) {
      if (!Array.isArray(value)) continue;
      for (const lesson of value as { blocks?: LessonBlock[] }[]) {
        for (const block of lesson.blocks ?? []) {
          if (block.type === "quiz") quizzes.push({ course, file, block });
        }
      }
    }
  }
  return quizzes;
}

describe("quizDisplayOrder", () => {
  it("is deterministic for a given seed", () => {
    expect(quizDisplayOrder(4, "pr0-1-q3")).toEqual(
      quizDisplayOrder(4, "pr0-1-q3"),
    );
  });

  it("varies with the seed", () => {
    const orders = new Set(
      Array.from({ length: 50 }, (_, i) =>
        quizDisplayOrder(4, `quiz-${i}`).join(","),
      ),
    );
    expect(orders.size).toBeGreaterThan(10);
  });

  it("always returns a permutation of the authored indices", () => {
    for (let count = 1; count <= 8; count++) {
      for (let s = 0; s < 200; s++) {
        const order = quizDisplayOrder(count, `seed-${s}`);
        expect([...order].sort((a, b) => a - b)).toEqual(
          Array.from({ length: count }, (_, i) => i),
        );
      }
    }
  });

  it("keeps authored order when shuffle is off", () => {
    expect(quizDisplayOrder(4, "anything", false)).toEqual([0, 1, 2, 3]);
  });

  it("seeds from the id, falling back to the question text", () => {
    expect(quizShuffleSeed({ id: "q1", question: "What?" })).toBe("q1");
    const a = quizShuffleSeed({ question: "What is 2 + 2?" });
    expect(a).toBe(quizShuffleSeed({ question: "What is 2 + 2?" }));
    expect(a).not.toBe(quizShuffleSeed({ question: "What is 3 + 3?" }));
  });
});

describe("QuizBlockView option order", () => {
  const block: QuizBlock = {
    type: "quiz",
    id: "shuffle-render-test",
    variant: "practice",
    question: "Pick one",
    options: [
      { text: "opt-zero", correct: true },
      { text: "opt-one" },
      { text: "opt-two" },
      { text: "opt-three" },
    ],
  };

  function renderedOrder(b: QuizBlock): number[] {
    const html = renderToString(createElement(QuizBlockView, { block: b }));
    return b.options
      .map((o, i) => ({ i, at: html.indexOf(o.text) }))
      .sort((x, y) => x.at - y.at)
      .map((x) => x.i);
  }

  it("renders options in the seeded display order (slot → authored index)", () => {
    const order = quizDisplayOrder(4, "shuffle-render-test");
    expect(order).not.toEqual([0, 1, 2, 3]);
    expect(renderedOrder(block)).toEqual(order);
    // Rendering twice (server, then hydration) gives the same order.
    expect(renderedOrder(block)).toEqual(renderedOrder(block));
  });

  it("renders authored order when shuffle is false", () => {
    expect(renderedOrder({ ...block, shuffle: false })).toEqual([0, 1, 2, 3]);
  });
});

describe("quiz content", () => {
  let quizzes: CourseQuiz[] = [];
  beforeAll(async () => {
    quizzes = await loadAllQuizzes();
    // Imports every *-content.ts file; slow under a full parallel run.
  }, 60_000);

  it("finds the quiz blocks", () => {
    expect(quizzes.length).toBeGreaterThan(1000);
  });

  // Authored order put ~62% of correct answers first overall (near 100% in
  // some courses); a fair shuffle of 3–4 options gives roughly 25–33%.
  it("no longer puts the correct answer in one slot more than 45% of the time", () => {
    const byCourse = new Map<string, number[]>();
    const overall: number[] = [];
    for (const { course, block } of quizzes) {
      if (block.options.length < 3) continue;
      const correct = block.options.findIndex((o) => o.correct);
      const order = quizDisplayOrder(
        block.options.length,
        quizShuffleSeed(block),
        block.shuffle ?? true,
      );
      const slot = order.indexOf(correct);
      const counts = byCourse.get(course) ?? [];
      counts[slot] = (counts[slot] ?? 0) + 1;
      byCourse.set(course, counts);
      overall[slot] = (overall[slot] ?? 0) + 1;
    }
    for (const [course, counts] of [...byCourse, ["all", overall] as const]) {
      const total = counts.reduce((a, b) => a + (b ?? 0), 0);
      const max = Math.max(...counts.map((c) => c ?? 0));
      expect(max / total, `${course}: ${counts.join("/")}`).toBeLessThanOrEqual(
        0.45,
      );
    }
  });

  it("shuffled quizzes have no options that refer to other options by position", () => {
    const positional = [
      /\b(all|none|both|neither|any|either) of the (above|below|preceding|previous|following)\b/i,
      /\b(above|preceding|previous|following|first|second|third|last|other) (two |three )?(options?|choices?|answers?)\b/i,
      // Bare letters must be uppercase so prose like "2 choices a piece" passes.
      /\b(?:[Oo]ptions?|[Cc]hoices?)\s*(?:\([a-dA-D1-4]\)|[A-D1-4])(?=[\s,.)]|$)/,
      /^\(?[a-d]\)\s*(and|or|&)\s*\(?[a-d]\)/i,
    ];
    const offenders = quizzes
      .filter(({ block }) => block.shuffle !== false)
      .flatMap(({ file, block }) =>
        block.options
          .filter((o) => positional.some((re) => re.test(o.text)))
          .map((o) => `${file} ${block.id}: ${o.text}`),
      );
    expect(offenders).toEqual([]);
  });
});
