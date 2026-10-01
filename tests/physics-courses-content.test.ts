import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { mfeChapter0Lessons } from "@/modules/content/mfe-chapter-0-content";
import { mfeChapter1Lessons } from "@/modules/content/mfe-chapter-1-content";
import { mfeChapter2Lessons } from "@/modules/content/mfe-chapter-2-content";
import { mfeChapter3Lessons } from "@/modules/content/mfe-chapter-3-content";
import { mfeChapter4Lessons } from "@/modules/content/mfe-chapter-4-content";
import { mfeChapter5Lessons } from "@/modules/content/mfe-chapter-5-content";
import { mrgChapter0Lessons } from "@/modules/content/mrg-chapter-0-content";
import { mrgChapter1Lessons } from "@/modules/content/mrg-chapter-1-content";
import { mrgChapter2Lessons } from "@/modules/content/mrg-chapter-2-content";
import { mrgChapter3Lessons } from "@/modules/content/mrg-chapter-3-content";
import { mrgChapter4Lessons } from "@/modules/content/mrg-chapter-4-content";
import { mrgChapter5Lessons } from "@/modules/content/mrg-chapter-5-content";
import { owtChapter0Lessons } from "@/modules/content/owt-chapter-0-content";
import { owtChapter1Lessons } from "@/modules/content/owt-chapter-1-content";
import { owtChapter2Lessons } from "@/modules/content/owt-chapter-2-content";
import { owtChapter3Lessons } from "@/modules/content/owt-chapter-3-content";
import { owtChapter4Lessons } from "@/modules/content/owt-chapter-4-content";
import { owtChapter5Lessons } from "@/modules/content/owt-chapter-5-content";
import { emChapter0Lessons } from "@/modules/content/em-chapter-0-content";
import { emChapter1Lessons } from "@/modules/content/em-chapter-1-content";
import { emChapter2Lessons } from "@/modules/content/em-chapter-2-content";
import { emChapter3Lessons } from "@/modules/content/em-chapter-3-content";
import { emChapter4Lessons } from "@/modules/content/em-chapter-4-content";
import { emChapter5Lessons } from "@/modules/content/em-chapter-5-content";
import { ompChapter0Lessons } from "@/modules/content/omp-chapter-0-content";
import { ompChapter1Lessons } from "@/modules/content/omp-chapter-1-content";
import { ompChapter2Lessons } from "@/modules/content/omp-chapter-2-content";
import { ompChapter3Lessons } from "@/modules/content/omp-chapter-3-content";
import { ompChapter4Lessons } from "@/modules/content/omp-chapter-4-content";
import { ompChapter5Lessons } from "@/modules/content/omp-chapter-5-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import type { LessonBlock } from "@/modules/content/schemas/blocks";

/** Every string the BlockRenderer passes through RichText. */
function richTextStrings(blocks: LessonBlock[]): string[] {
  return blocks.flatMap((block) => {
    switch (block.type) {
      case "text":
        return [block.content];
      case "callout":
        return [block.content, ...(block.title ? [block.title] : [])];
      case "table":
        return [...block.headers, ...block.rows.flat()];
      case "quiz":
        return [
          block.question,
          ...(block.hint ? [block.hint] : []),
          ...block.options.flatMap((o) => [o.text, ...(o.feedback ? [o.feedback] : [])]),
        ];
      default:
        return [];
    }
  });
}

const physicsCourses = [
  {
    course: "motion-forces-energy",
    prefix: "mfe",
    chapters: [
      { name: "mfe chapter 0", lessons: mfeChapter0Lessons, count: 7 },
      { name: "mfe chapter 1", lessons: mfeChapter1Lessons, count: 7 },
      { name: "mfe chapter 2", lessons: mfeChapter2Lessons, count: 7 },
      { name: "mfe chapter 3", lessons: mfeChapter3Lessons, count: 8 },
      { name: "mfe chapter 4", lessons: mfeChapter4Lessons, count: 7 },
      { name: "mfe chapter 5", lessons: mfeChapter5Lessons, count: 7 },
    ],
  },
  {
    course: "momentum-rotation-gravitation",
    prefix: "mrg",
    chapters: [
      { name: "mrg chapter 0", lessons: mrgChapter0Lessons, count: 7 },
      { name: "mrg chapter 1", lessons: mrgChapter1Lessons, count: 8 },
      { name: "mrg chapter 2", lessons: mrgChapter2Lessons, count: 7 },
      { name: "mrg chapter 3", lessons: mrgChapter3Lessons, count: 6 },
      { name: "mrg chapter 4", lessons: mrgChapter4Lessons, count: 7 },
      { name: "mrg chapter 5", lessons: mrgChapter5Lessons, count: 7 },
    ],
  },
  {
    course: "oscillations-waves-thermal",
    prefix: "owt",
    chapters: [
      { name: "owt chapter 0", lessons: owtChapter0Lessons, count: 8 },
      { name: "owt chapter 1", lessons: owtChapter1Lessons, count: 7 },
      { name: "owt chapter 2", lessons: owtChapter2Lessons, count: 7 },
      { name: "owt chapter 3", lessons: owtChapter3Lessons, count: 8 },
      { name: "owt chapter 4", lessons: owtChapter4Lessons, count: 8 },
      { name: "owt chapter 5", lessons: owtChapter5Lessons, count: 7 },
    ],
  },
  {
    course: "electricity-and-magnetism",
    prefix: "em",
    chapters: [
      { name: "em chapter 0", lessons: emChapter0Lessons, count: 8 },
      { name: "em chapter 1", lessons: emChapter1Lessons, count: 8 },
      { name: "em chapter 2", lessons: emChapter2Lessons, count: 7 },
      { name: "em chapter 3", lessons: emChapter3Lessons, count: 8 },
      { name: "em chapter 4", lessons: emChapter4Lessons, count: 8 },
      { name: "em chapter 5", lessons: emChapter5Lessons, count: 8 },
    ],
  },
  {
    course: "optics-and-modern-physics",
    prefix: "omp",
    chapters: [
      { name: "omp chapter 0", lessons: ompChapter0Lessons, count: 8 },
      { name: "omp chapter 1", lessons: ompChapter1Lessons, count: 8 },
      { name: "omp chapter 2", lessons: ompChapter2Lessons, count: 8 },
      { name: "omp chapter 3", lessons: ompChapter3Lessons, count: 7 },
      { name: "omp chapter 4", lessons: ompChapter4Lessons, count: 8 },
      { name: "omp chapter 5", lessons: ompChapter5Lessons, count: 8 },
    ],
  },
];

for (const { course, prefix, chapters } of physicsCourses) {
  const allLessons = chapters.flatMap((c) => c.lessons);

  describe(`${course} content`, () => {
    chapters.forEach((chapter, index) => {
      it(`${chapter.name} has ${chapter.count} lessons in order with unique slugs`, () => {
        expect(chapter.lessons.map((l) => l.position)).toEqual(
          Array.from({ length: chapter.count }, (_, i) => i + 1),
        );
        const slugs = chapter.lessons.map((l) => l.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
      });

      it(`${chapter.name} ends with a mastery lesson`, () => {
        const last = chapter.lessons[chapter.lessons.length - 1];
        expect(last.slug).toBe(`chapter-${index}-mastery`);
        expect(last.title).toMatch(/Mastery/);
        expect(
          last.blocks.some((b) => b.type === "quiz" && b.variant === "mastery"),
        ).toBe(true);
      });
    });

    it("all inline and display math is valid KaTeX, with no stray escape characters", () => {
      for (const lesson of allLessons) {
        const texts = richTextStrings(lesson.blocks);
        const math = [
          ...texts.flatMap((t) => [...t.matchAll(/\$([^$]+)\$/g)].map((m) => m[1])),
          ...lesson.blocks.flatMap((b) => (b.type === "math" ? [b.latex] : [])),
        ];
        for (const latex of math) {
          expect(() => katex.renderToString(latex, { throwOnError: true }), `${lesson.slug}: ${latex}`).not.toThrow();
          // "\;" written with one backslash in TS reaches KaTeX as a bare ";".
          expect(latex.replace(/\\;/g, ""), `${lesson.slug}: ${latex}`).not.toContain(";");
        }
        // A single backslash before f, t, v, b or r in the TS source ("\frac", "\times")
        // silently becomes a control character instead of reaching KaTeX.
        for (const text of [...texts, ...math]) {
          expect(text, lesson.slug).not.toMatch(/[\t\f\v\b\r]/);
        }
      }
    });

    it("lesson titles are plain text (titles are not rendered through KaTeX)", () => {
      for (const lesson of allLessons) {
        expect(lesson.title, lesson.slug).not.toContain("$");
      }
    });

    it("every quiz has exactly one correct option", () => {
      for (const lesson of allLessons) {
        for (const block of lesson.blocks) {
          if (block.type !== "quiz") continue;
          const correct = block.options.filter((o) => o.correct).length;
          expect(correct, `${lesson.slug}: "${block.question}"`).toBe(1);
        }
      }
    });

    it("quiz ids are present, prefixed and unique across the course", () => {
      const ids: string[] = [];
      for (const lesson of allLessons) {
        for (const block of lesson.blocks) {
          if (block.type !== "quiz") continue;
          expect(block.id, `${lesson.slug}: "${block.question}"`).toMatch(
            new RegExp(`^${prefix}\\d-\\d+-q\\d+$`),
          );
          ids.push(block.id!);
        }
      }
      expect(ids.length).toBe(new Set(ids).size);
    });

    for (const lesson of allLessons) {
      it(`renders ${lesson.slug} without runtime errors`, () => {
        const html = renderToString(
          createElement(BlockRenderer, { blocks: lesson.blocks }),
        );
        expect(html.length).toBeGreaterThan(500);
        expect(html).not.toContain("NaN");
      });
    }
  });
}
