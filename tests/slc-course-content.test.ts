import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { slcChapter0Lessons } from "@/modules/content/slc-chapter-0-content";
import { slcChapter1Lessons } from "@/modules/content/slc-chapter-1-content";
import { slcChapter2Lessons } from "@/modules/content/slc-chapter-2-content";
import { slcChapter3Lessons } from "@/modules/content/slc-chapter-3-content";
import { slcChapter4Lessons } from "@/modules/content/slc-chapter-4-content";
import { slcChapter5Lessons } from "@/modules/content/slc-chapter-5-content";
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
 * Straight Lines and Circles (`straight-lines-circles`, prefix slc):
 * structure, KaTeX validity, question ids, and a render smoke test for every
 * lesson and for each slc interactive mode.
 */

const chapters = [
  { name: "slc chapter 0", lessons: slcChapter0Lessons, count: 7 },
  { name: "slc chapter 1", lessons: slcChapter1Lessons, count: 8 },
  { name: "slc chapter 2", lessons: slcChapter2Lessons, count: 6 },
  { name: "slc chapter 3", lessons: slcChapter3Lessons, count: 7 },
  { name: "slc chapter 4", lessons: slcChapter4Lessons, count: 7 },
  { name: "slc chapter 5", lessons: slcChapter5Lessons, count: 7 },
];

const allLessons = chapters.flatMap((c) => c.lessons);

describe("straight-lines-circles content", () => {
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
        expect(block.id, `${lesson.slug}: "${block.question}"`).toMatch(/^slc\d-\d+-q\d+$/);
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
      expect(questions.length, lesson.slug).toBeGreaterThanOrEqual(8);
      multiple += lesson.blocks.filter((b) => b.type === "quiz" && b.multiple).length;
      numeric += questions.filter((b) => b.type === "numeric").length;
    }
    expect(multiple).toBeGreaterThan(40);
    expect(numeric).toBeGreaterThan(120);
  });

  it("uses each new slc interactive somewhere in the course", () => {
    const used = new Set(
      allLessons.flatMap((l) =>
        l.blocks.flatMap((b) => (b.type === "interactive" ? [b.config.component] : [])),
      ),
    );
    for (const component of ["slc-line-explorer", "slc-circle-lab"]) {
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

describe("slc interactives render on the server without NaN", () => {
  function render(config: Record<string, unknown>): string {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("expected an interactive block");
    return renderToString(createElement(Interactive, { config: block.config }));
  }

  const everyLineOverlay = [
    "centroid",
    "incentre",
    "circumcentre",
    "orthocentre",
    "excentres",
    "euler-line",
    "circumcircle",
    "incircle",
    "medians",
    "altitudes",
    "external",
    "forms",
    "intercepts",
    "foot",
    "image",
    "bisectors",
    "family-fan",
  ];
  const everyCircleOverlay = [
    "general-form",
    "parametric",
    "normal",
    "tangents",
    "chord-of-contact",
    "polar",
    "midpoint-chord",
    "director-circle",
    "common-tangents",
    "radical-axis",
    "orthogonal",
  ];

  it.each([
    ...["section", "triangle", "line", "point-line", "two-lines", "family", "pair"].map((mode) => ({
      component: "slc-line-explorer",
      mode,
    })),
    ...["section", "triangle", "line", "point-line", "two-lines", "family", "pair"].map((mode) => ({
      component: "slc-line-explorer",
      mode,
      show: everyLineOverlay,
    })),
    // Degenerate inputs: coincident points, collinear triangle, vertical and horizontal lines.
    { component: "slc-line-explorer", mode: "line", a: [1, 1], b: [1, 1], show: everyLineOverlay },
    { component: "slc-line-explorer", mode: "line", a: [2, -1], b: [2, 3] },
    { component: "slc-line-explorer", mode: "line", a: [-2, 3], b: [4, 3] },
    { component: "slc-line-explorer", mode: "line", a: [0, 0], b: [2, 2] },
    { component: "slc-line-explorer", mode: "triangle", a: [0, 0], b: [1, 1], c: [2, 2], show: everyLineOverlay },
    { component: "slc-line-explorer", mode: "triangle", a: [0, 0], b: [0, 0], c: [0, 0], show: everyLineOverlay },
    { component: "slc-line-explorer", mode: "section", m: { min: 1, max: 4, step: 1, initial: 2 }, n: { min: 1, max: 4, step: 1, initial: 2 }, show: ["external"] },
    { component: "slc-line-explorer", mode: "point-line", p: [3, 2], show: everyLineOverlay },
    { component: "slc-line-explorer", mode: "point-line", a: [0, 0], b: [0, 0] },
    { component: "slc-line-explorer", mode: "two-lines", c: [-2, 1], d: [4, 4], show: ["bisectors"] },
    { component: "slc-line-explorer", mode: "two-lines", a: [0, 0], b: [0, 0], c: [0, 0], d: [0, 0], show: ["bisectors"] },
    { component: "slc-line-explorer", mode: "family", a: [0, 0], b: [2, 1], c: [0, 0], d: [4, 2], show: ["family-fan"] },
    {
      component: "slc-line-explorer",
      mode: "pair",
      coef: {
        a: { min: -5, max: 5, step: 0.5, initial: 1 },
        h: { min: -5, max: 5, step: 0.5, initial: 0 },
        b: { min: -5, max: 5, step: 0.5, initial: 1 },
      },
    },
    {
      component: "slc-line-explorer",
      mode: "pair",
      coef: {
        a: { min: -5, max: 5, step: 0.5, initial: 0 },
        h: { min: -5, max: 5, step: 0.5, initial: 0 },
        b: { min: -5, max: 5, step: 0.5, initial: 0 },
      },
    },
    {
      component: "slc-line-explorer",
      mode: "pair",
      coef: {
        a: { min: -5, max: 5, step: 0.5, initial: 2 },
        h: { min: -5, max: 5, step: 0.5, initial: 1 },
        b: { min: -5, max: 5, step: 0.5, initial: 0 },
      },
    },
    ...["circle", "line", "tangents", "two-circles", "three-circles"].map((mode) => ({
      component: "slc-circle-lab",
      mode,
    })),
    ...["circle", "line", "tangents", "two-circles", "three-circles"].map((mode) => ({
      component: "slc-circle-lab",
      mode,
      show: everyCircleOverlay,
    })),
    { component: "slc-circle-lab", mode: "tangents", p: [1, 0], show: everyCircleOverlay },
    { component: "slc-circle-lab", mode: "tangents", p: [0, 0], show: everyCircleOverlay },
    { component: "slc-circle-lab", mode: "tangents", p: [2.5, 0], show: everyCircleOverlay },
    { component: "slc-circle-lab", mode: "circle", p: [0, 0], show: everyCircleOverlay },
    { component: "slc-circle-lab", mode: "line", a: [1, 1], b: [1, 1] },
    { component: "slc-circle-lab", mode: "line", a: [-4, 2.5], b: [4, 2.5] },
    { component: "slc-circle-lab", mode: "two-circles", centre2: [0, 0], show: everyCircleOverlay },
    {
      component: "slc-circle-lab",
      mode: "two-circles",
      centre2: [4.5, 0],
      radius2: { min: 0.5, max: 5, step: 0.25, initial: 2 },
      show: everyCircleOverlay,
    },
    {
      component: "slc-circle-lab",
      mode: "two-circles",
      centre2: [0.5, 0],
      radius2: { min: 0.5, max: 5, step: 0.25, initial: 2 },
      show: everyCircleOverlay,
    },
    { component: "slc-circle-lab", mode: "two-circles", centre2: [6, 0], show: everyCircleOverlay },
    { component: "slc-circle-lab", mode: "three-circles", centre2: [3, 0], centre3: [6, 0], show: everyCircleOverlay },
    { component: "slc-circle-lab", mode: "three-circles", centre2: [0, 0], centre3: [0, 0], show: everyCircleOverlay },
  ])("$component $mode renders", (config) => {
    const html = render(config);
    expect(html.length).toBeGreaterThan(500);
    expect(html).not.toContain("NaN");
    expect(html).not.toContain("Infinity");
  });
});
