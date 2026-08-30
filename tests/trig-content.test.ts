import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapterLessons } from "@/modules/content/chapter-0-content";
import { chapter1Lessons } from "@/modules/content/chapter-1-content";
import { trigChapter0Lessons } from "@/modules/content/trig-chapter-0-content";
import { trigChapter1Lessons } from "@/modules/content/trig-chapter-1-content";
import { trigChapter2Lessons } from "@/modules/content/trig-chapter-2-content";
import { trigChapter3Lessons } from "@/modules/content/trig-chapter-3-content";
import { trigChapter4Lessons } from "@/modules/content/trig-chapter-4-content";
import { trigChapter5Lessons } from "@/modules/content/trig-chapter-5-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";

const trigChapters = [
  { name: "trig chapter 0", lessons: trigChapter0Lessons, count: 7 },
  { name: "trig chapter 1", lessons: trigChapter1Lessons, count: 7 },
  { name: "trig chapter 2", lessons: trigChapter2Lessons, count: 7 },
  { name: "trig chapter 3", lessons: trigChapter3Lessons, count: 7 },
  { name: "trig chapter 4", lessons: trigChapter4Lessons, count: 5 },
  { name: "trig chapter 5", lessons: trigChapter5Lessons, count: 7 },
];

const allTrigLessons = trigChapters.flatMap((c) => c.lessons);

describe("trigonometry content", () => {
  for (const chapter of trigChapters) {
    it(`${chapter.name} has ${chapter.count} lessons in order with unique slugs`, () => {
      expect(chapter.lessons.map((l) => l.position)).toEqual(
        Array.from({ length: chapter.count }, (_, i) => i + 1),
      );
      const slugs = chapter.lessons.map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  }

  it("every quiz id is globally unique across all courses", () => {
    const ids: string[] = [];
    for (const lesson of [
      ...chapterLessons,
      ...chapter1Lessons,
      ...allTrigLessons,
    ]) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz") continue;
        expect(block.id, `${lesson.slug}: "${block.question}"`).toBeTruthy();
        ids.push(block.id!);
      }
    }
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every quiz has exactly one correct option", () => {
    for (const lesson of allTrigLessons) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz") continue;
        const correct = block.options.filter((o) => o.correct).length;
        expect(correct, `${lesson.slug}: "${block.question}"`).toBe(1);
      }
    }
  });

  for (const lesson of allTrigLessons) {
    it(`renders ${lesson.slug} without runtime errors`, () => {
      const html = renderToString(
        createElement(BlockRenderer, { blocks: lesson.blocks }),
      );
      expect(html.length).toBeGreaterThan(500);
      expect(html).not.toContain("NaN");
    });
  }
});
