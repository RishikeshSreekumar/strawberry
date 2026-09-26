import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { matricesChapter0Lessons } from "@/modules/content/matrices-chapter-0-content";
import { matricesChapter1Lessons } from "@/modules/content/matrices-chapter-1-content";
import { matricesChapter2Lessons } from "@/modules/content/matrices-chapter-2-content";
import { matricesChapter3Lessons } from "@/modules/content/matrices-chapter-3-content";
import { matricesChapter4Lessons } from "@/modules/content/matrices-chapter-4-content";
import { matricesChapter5Lessons } from "@/modules/content/matrices-chapter-5-content";
import { statisticsChapter0Lessons } from "@/modules/content/statistics-chapter-0-content";
import { statisticsChapter1Lessons } from "@/modules/content/statistics-chapter-1-content";
import { statisticsChapter2Lessons } from "@/modules/content/statistics-chapter-2-content";
import { statisticsChapter3Lessons } from "@/modules/content/statistics-chapter-3-content";
import { statisticsChapter4Lessons } from "@/modules/content/statistics-chapter-4-content";
import { statisticsChapter5Lessons } from "@/modules/content/statistics-chapter-5-content";
import { probabilityChapter0Lessons } from "@/modules/content/probability-chapter-0-content";
import { probabilityChapter1Lessons } from "@/modules/content/probability-chapter-1-content";
import { probabilityChapter2Lessons } from "@/modules/content/probability-chapter-2-content";
import { probabilityChapter3Lessons } from "@/modules/content/probability-chapter-3-content";
import { probabilityChapter4Lessons } from "@/modules/content/probability-chapter-4-content";
import { probabilityChapter5Lessons } from "@/modules/content/probability-chapter-5-content";
import { pncChapter0Lessons } from "@/modules/content/pnc-chapter-0-content";
import { pncChapter1Lessons } from "@/modules/content/pnc-chapter-1-content";
import { pncChapter2Lessons } from "@/modules/content/pnc-chapter-2-content";
import { pncChapter3Lessons } from "@/modules/content/pnc-chapter-3-content";
import { pncChapter4Lessons } from "@/modules/content/pnc-chapter-4-content";
import { pncChapter5Lessons } from "@/modules/content/pnc-chapter-5-content";
import { vectorsChapter0Lessons } from "@/modules/content/vectors-chapter-0-content";
import { vectorsChapter1Lessons } from "@/modules/content/vectors-chapter-1-content";
import { vectorsChapter2Lessons } from "@/modules/content/vectors-chapter-2-content";
import { vectorsChapter3Lessons } from "@/modules/content/vectors-chapter-3-content";
import { vectorsChapter4Lessons } from "@/modules/content/vectors-chapter-4-content";
import { vectorsChapter5Lessons } from "@/modules/content/vectors-chapter-5-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";

const newCourses = [
  {
    course: "matrices",
    chapters: [
      { name: "matrices chapter 0", lessons: matricesChapter0Lessons, count: 6 },
      { name: "matrices chapter 1", lessons: matricesChapter1Lessons, count: 7 },
      { name: "matrices chapter 2", lessons: matricesChapter2Lessons, count: 7 },
      { name: "matrices chapter 3", lessons: matricesChapter3Lessons, count: 6 },
      { name: "matrices chapter 4", lessons: matricesChapter4Lessons, count: 7 },
      { name: "matrices chapter 5", lessons: matricesChapter5Lessons, count: 6 },
    ],
  },
  {
    course: "statistics",
    chapters: [
      { name: "statistics chapter 0", lessons: statisticsChapter0Lessons, count: 7 },
      { name: "statistics chapter 1", lessons: statisticsChapter1Lessons, count: 7 },
      { name: "statistics chapter 2", lessons: statisticsChapter2Lessons, count: 7 },
      { name: "statistics chapter 3", lessons: statisticsChapter3Lessons, count: 6 },
      { name: "statistics chapter 4", lessons: statisticsChapter4Lessons, count: 8 },
      { name: "statistics chapter 5", lessons: statisticsChapter5Lessons, count: 7 },
    ],
  },
  {
    course: "probability",
    chapters: [
      { name: "probability chapter 0", lessons: probabilityChapter0Lessons, count: 6 },
      { name: "probability chapter 1", lessons: probabilityChapter1Lessons, count: 7 },
      { name: "probability chapter 2", lessons: probabilityChapter2Lessons, count: 7 },
      { name: "probability chapter 3", lessons: probabilityChapter3Lessons, count: 7 },
      { name: "probability chapter 4", lessons: probabilityChapter4Lessons, count: 6 },
      { name: "probability chapter 5", lessons: probabilityChapter5Lessons, count: 7 },
    ],
  },
  {
    course: "permutations-combinations-binomial",
    chapters: [
      { name: "pnc chapter 0", lessons: pncChapter0Lessons, count: 6 },
      { name: "pnc chapter 1", lessons: pncChapter1Lessons, count: 7 },
      { name: "pnc chapter 2", lessons: pncChapter2Lessons, count: 6 },
      { name: "pnc chapter 3", lessons: pncChapter3Lessons, count: 6 },
      { name: "pnc chapter 4", lessons: pncChapter4Lessons, count: 6 },
      { name: "pnc chapter 5", lessons: pncChapter5Lessons, count: 6 },
    ],
  },
  {
    course: "vector-algebra",
    chapters: [
      { name: "vectors chapter 0", lessons: vectorsChapter0Lessons, count: 6 },
      { name: "vectors chapter 1", lessons: vectorsChapter1Lessons, count: 6 },
      { name: "vectors chapter 2", lessons: vectorsChapter2Lessons, count: 6 },
      { name: "vectors chapter 3", lessons: vectorsChapter3Lessons, count: 6 },
      { name: "vectors chapter 4", lessons: vectorsChapter4Lessons, count: 6 },
      { name: "vectors chapter 5", lessons: vectorsChapter5Lessons, count: 6 },
    ],
  },
];

for (const { course, chapters } of newCourses) {
  const allLessons = chapters.flatMap((c) => c.lessons);

  describe(`${course} content`, () => {
    for (const chapter of chapters) {
      it(`${chapter.name} has ${chapter.count} lessons in order with unique slugs`, () => {
        expect(chapter.lessons.map((l) => l.position)).toEqual(
          Array.from({ length: chapter.count }, (_, i) => i + 1),
        );
        const slugs = chapter.lessons.map((l) => l.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
      });

      it(`${chapter.name} ends with a mastery lesson`, () => {
        const last = chapter.lessons[chapter.lessons.length - 1];
        expect(last.title).toMatch(/Mastery/);
        expect(
          last.blocks.some((b) => b.type === "quiz" && b.variant === "mastery"),
        ).toBe(true);
      });
    }

    it("every quiz has exactly one correct option", () => {
      for (const lesson of allLessons) {
        for (const block of lesson.blocks) {
          if (block.type !== "quiz") continue;
          const correct = block.options.filter((o) => o.correct).length;
          expect(correct, `${lesson.slug}: "${block.question}"`).toBe(1);
        }
      }
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
