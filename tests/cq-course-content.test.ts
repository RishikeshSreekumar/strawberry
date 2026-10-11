import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { cqChapter0Lessons } from "@/modules/content/cq-chapter-0-content";
import { cqChapter1Lessons } from "@/modules/content/cq-chapter-1-content";
import { cqChapter2Lessons } from "@/modules/content/cq-chapter-2-content";
import { cqChapter3Lessons } from "@/modules/content/cq-chapter-3-content";
import { cqChapter4Lessons } from "@/modules/content/cq-chapter-4-content";
import { cqChapter5Lessons } from "@/modules/content/cq-chapter-5-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { Interactive } from "@/modules/content/components/interactives";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";
import {
  allLatex,
  CONTROL_CHARS,
  hasBareSemicolon,
  richTextStrings,
} from "./helpers/lesson-text";

/**
 * Complex Numbers and Quadratic Equations (`complex-numbers-quadratics`,
 * prefix cq): structure, KaTeX validity, question ids, and a render smoke
 * test for every lesson and for each cq interactive mode.
 */

const chapters = [
  { name: "cq chapter 0", lessons: cqChapter0Lessons, count: 8 },
  { name: "cq chapter 1", lessons: cqChapter1Lessons, count: 8 },
  { name: "cq chapter 2", lessons: cqChapter2Lessons, count: 8 },
  { name: "cq chapter 3", lessons: cqChapter3Lessons, count: 7 },
  { name: "cq chapter 4", lessons: cqChapter4Lessons, count: 6 },
  { name: "cq chapter 5", lessons: cqChapter5Lessons, count: 7 },
];

const allLessons = chapters.flatMap((c) => c.lessons);

describe("complex-numbers-quadratics content", () => {
  chapters.forEach((chapter, index) => {
    it(`${chapter.name} has ${chapter.count} lessons in order with unique slugs`, () => {
      expect(chapter.lessons.map((l) => l.position)).toEqual(
        Array.from({ length: chapter.count }, (_, i) => i + 1),
      );
      const slugs = chapter.lessons.map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it(`${chapter.name} titles are numbered "${index}.M · Title"`, () => {
      chapter.lessons.forEach((lesson, i) => {
        expect(lesson.title.startsWith(`${index}.${i + 1} · `), lesson.title).toBe(true);
      });
    });

    it(`${chapter.name} ends with a mastery lesson`, () => {
      const last = chapter.lessons[chapter.lessons.length - 1];
      expect(last.slug).toBe(`chapter-${index}-mastery`);
      expect(last.title).toBe(`${index}.${chapter.count} · Chapter ${index} Mastery`);
      expect(
        last.blocks.some(
          (b) => (b.type === "quiz" || b.type === "numeric") && b.variant === "mastery",
        ),
      ).toBe(true);
    });
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
        // "\;" written with one backslash in TS reaches KaTeX as a bare ";".
        expect(hasBareSemicolon(latex), `${lesson.slug}: ${latex}`).toBe(false);
      }
      // A single backslash before f, t, v, b or r in the TS source ("\frac", "\bar")
      // silently becomes a control character instead of reaching KaTeX.
      for (const text of [...texts, ...math.map((m) => m.latex)]) {
        expect(text, lesson.slug).not.toMatch(CONTROL_CHARS);
      }
    }
  }, 60_000);

  it("lesson titles are plain text (titles are not rendered through KaTeX)", () => {
    for (const lesson of allLessons) {
      expect(lesson.title, lesson.slug).not.toContain("$");
    }
  });

  it("every quiz has exactly one correct option, or at least one when multiple", () => {
    for (const lesson of allLessons) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz") continue;
        const correct = block.options.filter((o) => o.correct).length;
        if (block.multiple) {
          expect(correct, `${lesson.slug}: "${block.question}"`).toBeGreaterThanOrEqual(1);
        } else {
          expect(correct, `${lesson.slug}: "${block.question}"`).toBe(1);
        }
      }
    }
  });

  it("question (quiz and numeric) ids are present, prefixed and unique across the course, and every question has a hint", () => {
    const ids: string[] = [];
    for (const lesson of allLessons) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz" && block.type !== "numeric") continue;
        expect(block.id, `${lesson.slug}: "${block.question}"`).toMatch(/^cq\d-\d+-q\d+$/);
        expect(block.hint, `${lesson.slug}: ${block.id} has no hint`).toBeTruthy();
        ids.push(block.id!);
      }
    }
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("every lesson has headings and questions, and the course mixes question types", () => {
    let multiple = 0;
    let numeric = 0;
    for (const lesson of allLessons) {
      expect(lesson.blocks.some((b) => b.type === "heading"), lesson.slug).toBe(true);
      const questions = lesson.blocks.filter((b) => b.type === "quiz" || b.type === "numeric");
      expect(questions.length, lesson.slug).toBeGreaterThanOrEqual(6);
      multiple += lesson.blocks.filter((b) => b.type === "quiz" && b.multiple).length;
      numeric += questions.filter((b) => b.type === "numeric").length;
    }
    expect(multiple).toBeGreaterThan(30);
    expect(numeric).toBeGreaterThan(60);
  });

  it("uses each new cq interactive somewhere in the course", () => {
    const used = new Set(
      allLessons.flatMap((l) =>
        l.blocks.flatMap((b) => (b.type === "interactive" ? [b.config.component] : [])),
      ),
    );
    for (const component of ["cq-quadratic-explorer", "cq-argand-plane", "cq-locus-explorer"]) {
      expect(used.has(component as never), component).toBe(true);
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

describe("cq interactives render on the server without NaN", () => {
  function render(config: Record<string, unknown>): string {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("expected an interactive block");
    return renderToString(createElement(Interactive, { config: block.config }));
  }

  const everyOverlay = [
    "conjugate",
    "negative",
    "i-times",
    "reciprocal",
    "difference",
    "quotient",
    "unit-circle",
    "polygon",
  ];

  it.each([
    { component: "cq-quadratic-explorer" },
    {
      component: "cq-quadratic-explorer",
      a: { min: -3, max: 3, step: 0.5, initial: 0 },
      showSign: true,
      readouts: ["discriminant", "roots", "vertex", "sum-product", "factored", "range"],
    },
    {
      component: "cq-quadratic-explorer",
      c: { min: -6, max: 6, step: 0.5, initial: 4 },
      markers: { k1: { min: -5, max: 5, step: 0.5, initial: 0 } },
    },
    {
      component: "cq-quadratic-explorer",
      markers: {
        k1: { min: -5, max: 5, step: 0.5, initial: -2 },
        k2: { min: -5, max: 5, step: 0.5, initial: 4 },
      },
      showSign: true,
    },
    ...["point", "sum", "product", "powers", "roots", "rotation"].map((mode) => ({
      component: "cq-argand-plane",
      mode,
      show: everyOverlay,
    })),
    { component: "cq-argand-plane", mode: "point", z1: [0, 0], show: everyOverlay },
    { component: "cq-argand-plane", mode: "roots", z1: [0, 0] },
    { component: "cq-argand-plane", mode: "powers", z1: [3, 3], n: { min: 1, max: 24, initial: 24 } },
    { component: "cq-argand-plane", mode: "rotation", z1: [0, 0], z2: [0, 0] },
    ...["circle", "bisector", "ellipse", "hyperbola", "apollonius", "arc"].map((locus) => ({
      component: "cq-locus-explorer",
      locus,
      probe: [0, 0],
      shade: true,
    })),
    { component: "cq-locus-explorer", locus: "ellipse", k: { min: 1, max: 3, step: 0.5, initial: 1 } },
    { component: "cq-locus-explorer", locus: "hyperbola", k: { min: 2, max: 3, step: 0.5, initial: 3 } },
    { component: "cq-locus-explorer", locus: "apollonius", k: { min: 0.5, max: 3, step: 0.5, initial: 1 }, probe: [0, 0] },
    { component: "cq-locus-explorer", locus: "arc", theta: { min: -90, max: 90, step: 15, initial: -90 }, probe: [2, 2] },
    { component: "cq-locus-explorer", locus: "bisector", a: [1, 1], b: [1, 1] },
  ])("$component renders", (config) => {
    const html = render(config);
    expect(html.length).toBeGreaterThan(500);
    expect(html).not.toContain("NaN");
    expect(html).not.toContain("Infinity");
  });
});
