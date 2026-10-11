import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { Interactive } from "@/modules/content/components/interactives";
import { safeFn } from "@/modules/content/components/interactives/calc-shared";
import { riemann, simpson } from "@/modules/content/components/interactives/integ-shared";
import { integChapter0Lessons } from "@/modules/content/integ-chapter-0-content";
import { integChapter1Lessons } from "@/modules/content/integ-chapter-1-content";
import { integChapter2Lessons } from "@/modules/content/integ-chapter-2-content";
import { integChapter3Lessons } from "@/modules/content/integ-chapter-3-content";
import { integChapter4Lessons } from "@/modules/content/integ-chapter-4-content";
import { integChapter5Lessons } from "@/modules/content/integ-chapter-5-content";
import { integChapter6Lessons } from "@/modules/content/integ-chapter-6-content";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";
import { allLatex, CONTROL_CHARS, hasBareSemicolon, richTextStrings } from "./helpers/lesson-text";

/**
 * Integral Calculus and Differential Equations (`integral-calculus`,
 * prefix integ), seeded by scripts/seed-integral-calculus.ts; outline in
 * integ_course.md.
 */
const chapters = [
  { number: 0, lessons: integChapter0Lessons, count: 6 },
  { number: 1, lessons: integChapter1Lessons, count: 7 },
  { number: 2, lessons: integChapter2Lessons, count: 7 },
  { number: 3, lessons: integChapter3Lessons, count: 7 },
  { number: 4, lessons: integChapter4Lessons, count: 7 },
  { number: 5, lessons: integChapter5Lessons, count: 6 },
  { number: 6, lessons: integChapter6Lessons, count: 8 },
];
const allLessons = chapters.flatMap((c) => c.lessons);

describe("integral calculus content", () => {
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
        expect(n, lesson.slug).toBeGreaterThanOrEqual(8);
      }
    });
  }

  it("lesson slugs are unique across the course", () => {
    const slugs = allLessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

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

  it("question ids are integ<chapter>-<lesson>-q<k>, match their lesson, and are unique across the course", () => {
    const ids: string[] = [];
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        for (const block of lesson.blocks) {
          if (block.type !== "quiz" && block.type !== "numeric") continue;
          expect(block.id, `${lesson.slug}: "${block.question}"`).toMatch(
            new RegExp(`^integ${chapter.number}-${lesson.position}-q\\d+$`),
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

  it("uses each of the course's interactives", () => {
    const used = new Set(
      allLessons.flatMap((l) => l.blocks.flatMap((b) => (b.type === "interactive" ? [b.config.component] : []))),
    );
    for (const c of ["integ-riemann-sum", "integ-area-between", "integ-slope-field"]) {
      expect(used.has(c as never), c).toBe(true);
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

describe("integ interactives", () => {
  it("simpson and riemann sums agree with known integrals", () => {
    expect(simpson(safeFn("x^2"), 0, 3)).toBeCloseTo(9, 8);
    expect(simpson(safeFn("sin(x)"), 0, Math.PI)).toBeCloseTo(2, 8);
    expect(riemann(safeFn("x^2"), 0, 1, 4, "right").total).toBeCloseTo(30 / 64, 10);
    expect(riemann(safeFn("x^2"), 0, 1, 4, "left").total).toBeCloseTo(14 / 64, 10);
    expect(riemann(safeFn("x"), 0, 2, 5, "trapezoid").total).toBeCloseTo(2, 10);
    expect(riemann(safeFn("x^2"), 0, 2, 2, "midpoint").total).toBeCloseTo(2.5, 10);
  });

  it("integ-riemann-sum renders sums, the exact value and the accumulation mode", () => {
    const html = render({
      component: "integ-riemann-sum",
      expr: "x^2",
      exprLatex: "x^2",
      window: { xmin: -0.5, xmax: 1.5, ymin: -0.5, ymax: 1.5 },
      a: 0,
      b: 1,
      n: { min: 1, max: 50, initial: 4 },
      methods: ["right", "left", "midpoint"],
      exact: 1 / 3,
      exactLatex: "\\tfrac13",
    });
    expect(html).not.toContain("NaN");
    expect(plainText(html)).toContain("Right sum, 4 strips");
    const acc = render({
      component: "integ-riemann-sum",
      expr: "sin(x)",
      exprLatex: "\\sin x",
      window: { xmin: 0, xmax: 7, ymin: -1.5, ymax: 1.5 },
      a: 0,
      b: 6.28,
      accumulate: true,
      caption: "Drag **x**.",
    });
    expect(acc).not.toContain("NaN");
    expect(acc).toContain("<strong>x</strong>");
    expect(plainText(acc)).toContain("Signed area so far");
  });

  it("integ-area-between finds crossings and separates signed integral from area", () => {
    const crossing = plainText(
      render({
        component: "integ-area-between",
        f: "x",
        fLatex: "x",
        g: "x^3",
        gLatex: "x^3",
        a: -1,
        b: 1,
        window: { xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5 },
      }),
    );
    expect(crossing).not.toContain("NaN");
    expect(crossing).toContain("cross inside the interval at x ≈ 0");
    expect(crossing).toContain("≈ 0.5");
    const touching = plainText(
      render({
        component: "integ-area-between",
        f: "abs(x^2 - 1)",
        fLatex: "|x^2 - 1|",
        a: -2,
        b: 2,
        window: { xmin: -2.5, xmax: 2.5, ymin: -1, ymax: 4 },
      }),
    );
    expect(touching).not.toContain("changes sign");
    expect(touching).toContain("do not cross inside");
    expect(touching).toContain("≈ 4");
    const sideways = render({
      component: "integ-area-between",
      variable: "y",
      f: "y + 4",
      fLatex: "y + 4",
      g: "y^2/2",
      gLatex: "\\tfrac{y^2}{2}",
      a: -2,
      b: 4,
      window: { xmin: -1, xmax: 9, ymin: -3, ymax: 5 },
    });
    expect(sideways).not.toContain("NaN");
    expect(plainText(sideways)).toContain("≈ 18");
    expect(plainText(sideways)).toContain("horizontal strips");
  });

  it("integ-slope-field draws the field and a solution through the start point", () => {
    const html = render({
      component: "integ-slope-field",
      expr: "x - y",
      exprLatex: "x - y",
      window: { xmin: -3, xmax: 3, ymin: -3, ymax: 3 },
      x0: { min: -3, max: 3, step: 0.1, initial: 0 },
      y0: { min: -3, max: 3, step: 0.1, initial: 1 },
      curves: [{ x: 0, y: -1 }],
    });
    expect(html).not.toContain("NaN");
    expect(html).toContain("<path");
    expect(plainText(html)).toContain("Slope field");
  });
});
