import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { calcChapter2Lessons } from "@/modules/content/calc-chapter-2-content";
import { calcChapter3Lessons } from "@/modules/content/calc-chapter-3-content";
import { calcChapter4Lessons } from "@/modules/content/calc-chapter-4-content";
import { calcChapter5Lessons } from "@/modules/content/calc-chapter-5-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { Interactive } from "@/modules/content/components/interactives";
import { signChanges, safeFn, tangentAt } from "@/modules/content/components/interactives/calc-shared";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";
import { allLatex, CONTROL_CHARS, hasBareSemicolon, richTextStrings } from "./helpers/lesson-text";

/**
 * Calculus Chapters 2–5 (differential calculus, JEE depth), seeded into the
 * existing `calculus` course by scripts/seed-calculus.ts. Chapters 0–1 have
 * their own tests (chapter-0-content.test.ts, chapter-1-content.test.ts).
 */
const chapters = [
  { number: 2, lessons: calcChapter2Lessons, count: 7 },
  { number: 3, lessons: calcChapter3Lessons, count: 8 },
  { number: 4, lessons: calcChapter4Lessons, count: 7 },
  { number: 5, lessons: calcChapter5Lessons, count: 8 },
];
const allLessons = chapters.flatMap((c) => c.lessons);

describe("calculus chapters 2–5 content", () => {
  for (const chapter of chapters) {
    it(`chapter ${chapter.number} has ${chapter.count} lessons in order with unique slugs and numbered titles`, () => {
      expect(chapter.lessons.map((l) => l.position)).toEqual(
        Array.from({ length: chapter.count }, (_, i) => i + 1),
      );
      const slugs = chapter.lessons.map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      chapter.lessons.forEach((lesson, i) => {
        expect(lesson.title.startsWith(`${chapter.number}.${i + 1} · `), lesson.title).toBe(true);
      });
    });

    it(`chapter ${chapter.number} ends with a mastery lesson`, () => {
      const last = chapter.lessons[chapter.lessons.length - 1];
      expect(last.slug).toBe(`chapter-${chapter.number}-mastery`);
      expect(last.title).toBe(`${chapter.number}.${chapter.count} · Chapter ${chapter.number} Mastery`);
      expect(
        last.blocks.some((b) => (b.type === "quiz" || b.type === "numeric") && b.variant === "mastery"),
      ).toBe(true);
    });

    it(`chapter ${chapter.number} has plenty of questions, with multiple-correct and numeric types`, () => {
      const questions = chapter.lessons.flatMap((l) =>
        l.blocks.filter((b) => b.type === "quiz" || b.type === "numeric"),
      );
      expect(questions.length).toBeGreaterThanOrEqual(chapter.count * 8);
      expect(questions.some((b) => b.type === "numeric")).toBe(true);
      expect(questions.some((b) => b.type === "quiz" && b.multiple)).toBe(true);
      for (const lesson of chapter.lessons) {
        const n = lesson.blocks.filter((b) => b.type === "quiz" || b.type === "numeric").length;
        expect(n, lesson.slug).toBeGreaterThanOrEqual(6);
      }
    });
  }

  it("all inline and display math is valid KaTeX, with no stray escape characters", () => {
    for (const lesson of allLessons) {
      const texts = richTextStrings(lesson.blocks);
      const math = allLatex(lesson.blocks);
      for (const { latex, display } of math) {
        expect(
          () => katex.renderToString(latex, { displayMode: display, throwOnError: true }),
          `${lesson.slug}: ${latex}`,
        ).not.toThrow();
        expect(hasBareSemicolon(latex), `${lesson.slug}: ${latex}`).toBe(false);
      }
      for (const text of [...texts, ...math.map((m) => m.latex)]) {
        expect(text, lesson.slug).not.toMatch(CONTROL_CHARS);
      }
    }
  });

  it("lesson titles are plain text (titles are not rendered through KaTeX)", () => {
    for (const lesson of allLessons) {
      expect(lesson.title, lesson.slug).not.toContain("$");
      expect(lesson.title, lesson.slug).not.toContain("\\");
    }
  });

  it("every quiz has exactly one correct option, or at least one when multiple", () => {
    for (const lesson of allLessons) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz") continue;
        const correct = block.options.filter((o) => o.correct).length;
        if (block.multiple) expect(correct, `${lesson.slug}: "${block.question}"`).toBeGreaterThanOrEqual(1);
        else expect(correct, `${lesson.slug}: "${block.question}"`).toBe(1);
      }
    }
  });

  it("question ids are calc<chapter>-<lesson>-q<k>, match their lesson, and are unique across the course", () => {
    const ids: string[] = [];
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        for (const block of lesson.blocks) {
          if (block.type !== "quiz" && block.type !== "numeric") continue;
          expect(block.id, `${lesson.slug}: "${block.question}"`).toMatch(
            new RegExp(`^calc${chapter.number}-${lesson.position}-q\\d+$`),
          );
          ids.push(block.id!);
        }
      }
    }
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("every question has a hint", () => {
    for (const lesson of allLessons) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz" && block.type !== "numeric") continue;
        expect(block.hint, `${lesson.slug}: ${block.id}`).toBeTruthy();
      }
    }
  });

  it("every non-mastery lesson has headings and at least one worked example", () => {
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons.slice(0, -1)) {
        expect(lesson.blocks.some((b) => b.type === "heading"), lesson.slug).toBe(true);
        expect(lesson.blocks.some((b) => b.type === "worked-example"), lesson.slug).toBe(true);
      }
    }
  });

  for (const lesson of allLessons) {
    it(`renders ${lesson.slug} without runtime errors`, () => {
      const html = renderToString(createElement(BlockRenderer, { blocks: lesson.blocks }));
      expect(html.length).toBeGreaterThan(500);
      expect(html).not.toContain("NaN");
    });
  }
});

function render(config: Record<string, unknown>): string {
  const [block] = parseLessonBlocks([{ type: "interactive", config }]);
  if (block.type !== "interactive") throw new Error("expected an interactive block");
  return renderToString(createElement(Interactive, { config: block.config }));
}

const plainText = (html: string) =>
  html.replace(/<!-- -->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("calc interactives", () => {
  it("tangentAt classifies smooth points, corners and vertical tangents", () => {
    const square = tangentAt(safeFn("x^2"), 1);
    expect(square.kind).toBe("smooth");
    expect(square.slope).toBeCloseTo(2, 4);
    const corner = tangentAt(safeFn("abs(x)"), 0);
    expect(corner.kind).toBe("corner");
    expect(corner.left).toBeCloseTo(-1, 4);
    expect(corner.right).toBeCloseTo(1, 4);
    expect(tangentAt(safeFn("abs(x)^(2/3)"), 0).kind).toBe("vertical");
    expect(tangentAt(safeFn("1/x", [0]), 0).kind).toBe("undefined");
  });

  it("signChanges finds roots, corners and skips poles", () => {
    expect(signChanges(safeFn("3*x^2 - 3"), -3, 3).map((p) => p.x)).toEqual([-1, 1]);
    // An undefined point (NaN) between finite values is a corner, not a pole.
    const undefinedAt0 = signChanges(safeFn("x/abs(x)", [0]), -2, 2);
    expect(undefinedAt0).toHaveLength(1);
    expect(undefinedAt0[0].zero).toBe(false);
    expect(Math.abs(undefinedAt0[0].x)).toBeLessThan(1e-6);
    const corner = signChanges(safeFn("x/abs(x)"), -2, 2.1);
    expect(corner).toHaveLength(1);
    expect(corner[0].zero).toBe(false);
    expect(signChanges(safeFn("1 - 1/x^2", [0]), -4, 4).map((p) => p.x)).toEqual([-1, 1]);
  });

  it("calc-tangent-explorer renders the corner verdict, the f′ panel and the MVT chord", () => {
    const corner = plainText(
      render({
        component: "calc-tangent-explorer",
        expr: "abs(x)",
        exprLatex: "|x|",
        window: { xmin: -3, xmax: 3, ymin: -1, ymax: 3 },
        x0: { min: -2, max: 2, step: 0.1, initial: 0 },
      }),
    );
    expect(corner).toContain("Corner.");
    const smooth = render({
      component: "calc-tangent-explorer",
      expr: "x^2",
      exprLatex: "x^2",
      derivExpr: "2*x",
      derivLatex: "2x",
      showDerivative: true,
      window: { xmin: -2, xmax: 2, ymin: -1, ymax: 4 },
      x0: { min: -2, max: 2, step: 0.1, initial: 1 },
      secant: { min: -1, max: 1, step: 0.1, initial: 0.5 },
      caption: "Drag **here**.",
    });
    expect(smooth).not.toContain("NaN");
    expect(plainText(smooth)).toContain("Lower graph");
    expect(smooth).toContain("<strong>here</strong>");
    const mvt = plainText(
      render({
        component: "calc-tangent-explorer",
        expr: "x^3 - 3*x",
        exprLatex: "x^3 - 3x",
        derivExpr: "3*x^2 - 3",
        window: { xmin: -3, xmax: 3, ymin: -4, ymax: 4 },
        x0: { min: -2, max: 2, step: 0.1, initial: 0.5 },
        chord: { a: -2, b: 2 },
      }),
    );
    expect(mvt).toContain("c ≈ -1.155, 1.155");
  });

  it("calc-sign-chart classifies extrema and inflections and runs the closed-interval method", () => {
    const cubic = plainText(
      render({
        component: "calc-sign-chart",
        expr: "x^3 - 3*x",
        exprLatex: "x^3 - 3x",
        window: { xmin: -3, xmax: 3, ymin: -4, ymax: 4 },
        initial: 0.5,
      }),
    );
    expect(cubic).toContain("x = -1: local max, f = 2");
    expect(cubic).toContain("x = 1: local min, f = -2");
    expect(cubic).toContain("x = 0: inflection");
    const flat = plainText(
      render({
        component: "calc-sign-chart",
        expr: "x^3",
        exprLatex: "x^3",
        window: { xmin: -2, xmax: 2, ymin: -3, ymax: 3 },
        initial: 1,
      }),
    );
    expect(flat).toContain("f′ = 0, no extremum");
    const closed = render({
      component: "calc-sign-chart",
      expr: "x^4 - 2*x^2",
      exprLatex: "x^4 - 2x^2",
      derivExpr: "4*x^3 - 4*x",
      secondDerivExpr: "12*x^2 - 4",
      window: { xmin: -2, xmax: 2.5, ymin: -2, ymax: 9 },
      interval: { a: -0.5, b: 2 },
      initial: 0.5,
    });
    expect(closed).not.toContain("NaN");
    expect(plainText(closed)).toContain("8 (abs max)");
    expect(plainText(closed)).toContain("-1 (abs min)");
    const corners = plainText(
      render({
        component: "calc-sign-chart",
        expr: "abs(x^2 - 1)",
        exprLatex: "|x^2 - 1|",
        window: { xmin: -2, xmax: 2, ymin: -1, ymax: 3 },
        rows: ["first"],
        initial: 0.5,
      }),
    );
    expect(corners).toContain("x = -1: local min (corner)");
    expect(corners).toContain("x = 0: local max, f = 1");
    expect(corners).toContain("x = 1: local min (corner)");
    const pole = plainText(
      render({
        component: "calc-sign-chart",
        expr: "x + 1/x",
        exprLatex: "x + 1/x",
        excluded: [0],
        window: { xmin: -4, xmax: 4, ymin: -6, ymax: 6 },
        initial: 1,
      }),
    );
    expect(pole).not.toContain("no extremum");
    expect(pole).toContain("x = -1: local max");
    expect(pole).toContain("x = 1: local min");
  });
});
