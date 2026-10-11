import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { tdgChapter0Lessons } from "@/modules/content/tdg-chapter-0-content";
import { tdgChapter1Lessons } from "@/modules/content/tdg-chapter-1-content";
import { tdgChapter2Lessons } from "@/modules/content/tdg-chapter-2-content";
import { tdgChapter3Lessons } from "@/modules/content/tdg-chapter-3-content";
import { tdgChapter4Lessons } from "@/modules/content/tdg-chapter-4-content";
import { tdgChapter5Lessons } from "@/modules/content/tdg-chapter-5-content";
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
 * Three-Dimensional Geometry (`three-dimensional-geometry`, prefix tdg):
 * structure, KaTeX validity, question ids, and a render smoke test for every
 * lesson and for each tdg interactive mode.
 */

const chapters = [
  { name: "tdg chapter 0", lessons: tdgChapter0Lessons, count: 6 },
  { name: "tdg chapter 1", lessons: tdgChapter1Lessons, count: 6 },
  { name: "tdg chapter 2", lessons: tdgChapter2Lessons, count: 7 },
  { name: "tdg chapter 3", lessons: tdgChapter3Lessons, count: 6 },
  { name: "tdg chapter 4", lessons: tdgChapter4Lessons, count: 8 },
  { name: "tdg chapter 5", lessons: tdgChapter5Lessons, count: 7 },
];

const allLessons = chapters.flatMap((c) => c.lessons);

describe("three-dimensional-geometry content", () => {
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

    it(`${chapter.name} question ids carry the chapter and lesson number`, () => {
      chapter.lessons.forEach((lesson, i) => {
        for (const block of lesson.blocks) {
          if (block.type !== "quiz" && block.type !== "numeric") continue;
          expect(block.id, `${lesson.slug}: "${block.question}"`).toMatch(
            new RegExp(`^tdg${index}-${i + 1}-q\\d+$`),
          );
        }
      });
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
      // A single backslash before f, t, v, b or r in the TS source ("\frac", "\vec")
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

  it("lesson slugs are unique across the course", () => {
    const slugs = allLessons.map((l) => l.slug).filter((s) => !s.endsWith("-mastery"));
    expect(new Set(slugs).size).toBe(slugs.length);
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
        expect(block.id, `${lesson.slug}: "${block.question}"`).toMatch(/^tdg\d-\d+-q\d+$/);
        expect(block.hint, `${lesson.slug}: ${block.id} has no hint`).toBeTruthy();
        ids.push(block.id!);
      }
    }
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("every lesson has headings, worked examples and questions, and the course mixes question types", () => {
    let multiple = 0;
    let numeric = 0;
    for (const lesson of allLessons) {
      expect(lesson.blocks.some((b) => b.type === "heading"), lesson.slug).toBe(true);
      const questions = lesson.blocks.filter((b) => b.type === "quiz" || b.type === "numeric");
      expect(questions.length, lesson.slug).toBeGreaterThanOrEqual(8);
      if (!lesson.slug.endsWith("-mastery")) {
        expect(lesson.blocks.some((b) => b.type === "worked-example"), lesson.slug).toBe(true);
      }
      multiple += lesson.blocks.filter((b) => b.type === "quiz" && b.multiple).length;
      numeric += questions.filter((b) => b.type === "numeric").length;
    }
    expect(multiple).toBeGreaterThan(40);
    expect(numeric).toBeGreaterThan(120);
  });

  it("uses each new tdg interactive somewhere in the course", () => {
    const used = new Set(
      allLessons.flatMap((l) =>
        l.blocks.flatMap((b) => (b.type === "interactive" ? [b.config.component] : [])),
      ),
    );
    for (const component of ["tdg-space-viewer", "tdg-distance-lab"]) {
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

describe("tdg interactives render on the server without NaN", () => {
  function render(config: Record<string, unknown>): string {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("expected an interactive block");
    return renderToString(createElement(Interactive, { config: block.config }));
  }

  const viewerModes = ["points", "line", "two-lines", "plane", "two-planes", "line-plane"];
  const everyViewerOverlay = [
    "box",
    "projections",
    "section",
    "external",
    "centroid",
    "general-point",
    "foot",
    "image",
    "shortest-distance",
    "normal",
    "intercepts",
    "intersection",
    "projection",
  ];
  const labModes = [
    "two-points",
    "direction",
    "two-directions",
    "point-line",
    "skew-lines",
    "point-plane",
    "two-planes",
    "line-plane",
  ];
  const zero = [0, 0, 0];

  it.each([
    ...viewerModes.map((mode) => ({ component: "tdg-space-viewer", mode })),
    ...viewerModes.map((mode) => ({ component: "tdg-space-viewer", mode, show: everyViewerOverlay })),
    ...viewerModes.map((mode) => ({
      component: "tdg-space-viewer",
      mode,
      show: everyViewerOverlay,
      sliders: [
        { name: "px", min: -4, max: 4, step: 1, initial: 1 },
        { name: "py", min: -4, max: 4, step: 1, initial: 0 },
        { name: "pz", min: -4, max: 4, step: 1, initial: 2 },
        { name: "d", min: -8, max: 8, step: 1, initial: -3 },
      ],
    })),
    // Degenerate inputs: coincident points, zero directions, parallel and
    // coincident lines, a point on the line or plane, parallel planes, a
    // line parallel to (or lying in) the plane, planes with zero normals.
    ...viewerModes.map((mode) => ({
      component: "tdg-space-viewer",
      mode,
      a: zero,
      b: zero,
      c: zero,
      d: zero,
      p: zero,
      plane: [0, 0, 0, 0],
      plane2: [0, 0, 0, 0],
      show: everyViewerOverlay,
    })),
    { component: "tdg-space-viewer", mode: "points", a: [1, 1, 1], b: [1, 1, 1], m: { min: 1, max: 5, step: 1, initial: 2 }, n: { min: 1, max: 5, step: 1, initial: 2 }, show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "line", a: [1, 2, 3], b: [2, -1, 2], p: [3, 1, 5], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "two-lines", a: [1, 0, 0], b: [1, 1, 1], c: [0, 1, 0], d: [2, 2, 2], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "two-lines", a: [1, 0, 0], b: [1, 1, 1], c: [3, 2, 2], d: [2, 2, 2], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "two-lines", a: [1, 2, 3], b: [1, 0, 0], c: [1, 2, 3], d: [0, 1, 0], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "plane", plane: [1, 1, 1, -3], p: [1, 1, 1], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "plane", plane: [0, 0, 1, -2], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "plane", plane: [1, 1, 0, 0], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "two-planes", plane: [1, 2, 2, -6], plane2: [2, 4, 4, 3], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "two-planes", plane: [1, 2, 2, -6], plane2: [2, 4, 4, -12], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "line-plane", a: [0, 0, 5], b: [1, -1, 0], plane: [1, 1, 1, -3], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "line-plane", a: [3, 0, 0], b: [1, -1, 0], plane: [1, 1, 1, -3], show: everyViewerOverlay },
    { component: "tdg-space-viewer", mode: "line-plane", a: [1, 1, 1], b: [1, 1, 1], plane: [1, 1, 1, -3], show: everyViewerOverlay },
    ...labModes.map((mode) => ({ component: "tdg-distance-lab", mode })),
    ...labModes.map((mode) => ({ component: "tdg-distance-lab", mode, editable: false })),
    ...labModes.map((mode) => ({
      component: "tdg-distance-lab",
      mode,
      p1: zero,
      p2: zero,
      d1: zero,
      d2: zero,
      plane1: [0, 0, 0, 0],
      plane2: [0, 0, 0, 0],
    })),
    { component: "tdg-distance-lab", mode: "two-points", p1: [1, 2, 3], p2: [1, 2, 3] },
    { component: "tdg-distance-lab", mode: "two-points", p1: [-2, 3, 4], p2: [3, -1, -2] },
    { component: "tdg-distance-lab", mode: "two-directions", d1: [1, 2, 3], d2: [2, 4, 6] },
    { component: "tdg-distance-lab", mode: "two-directions", d1: [1, 2, 3], d2: [3, 0, -1] },
    { component: "tdg-distance-lab", mode: "point-line", p1: [1, 2, 3], p2: [1, 2, 3], d1: [1, 1, 1] },
    { component: "tdg-distance-lab", mode: "skew-lines", p1: [1, 2, 3], d1: [1, 1, 1], p2: [2, 0, 1], d2: [2, 2, 2] },
    { component: "tdg-distance-lab", mode: "skew-lines", p1: [1, 2, 3], d1: [1, 1, 1], p2: [3, 4, 5], d2: [2, 2, 2] },
    { component: "tdg-distance-lab", mode: "skew-lines", p1: [1, 0, 0], d1: [1, 0, 0], p2: [0, 1, 0], d2: [0, 1, 0] },
    { component: "tdg-distance-lab", mode: "point-plane", p1: [1, 1, 1], plane1: [1, 1, 1, -3] },
    { component: "tdg-distance-lab", mode: "two-planes", plane1: [1, 2, 2, -6], plane2: [2, 4, 4, 3] },
    { component: "tdg-distance-lab", mode: "two-planes", plane1: [1, 2, 2, -6], plane2: [-2, -4, -4, 12] },
    { component: "tdg-distance-lab", mode: "two-planes", plane1: [1, 0, 0, 0], plane2: [0, 1, 0, 0] },
    { component: "tdg-distance-lab", mode: "line-plane", p1: [3, 0, 0], d1: [1, -1, 0], plane1: [1, 1, 1, -3] },
    { component: "tdg-distance-lab", mode: "line-plane", p1: [0, 0, 5], d1: [1, -1, 0], plane1: [1, 1, 1, -3] },
    { component: "tdg-distance-lab", mode: "line-plane", p1: [0, 0, 0], d1: [1, 1, 1], plane1: [1, 1, 1, -3] },
  ])("$component $mode renders", (config) => {
    const html = render(config);
    expect(html.length).toBeGreaterThan(500);
    expect(html).not.toContain("NaN");
    expect(html).not.toContain("Infinity");
  });
});
