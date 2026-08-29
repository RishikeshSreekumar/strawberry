import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapterLessons } from "@/modules/content/chapter-0-content";
import { chapter1Lessons } from "@/modules/content/chapter-1-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";

describe("chapter 1 content", () => {
  it("has all eleven lessons in order", () => {
    expect(chapter1Lessons.map((l) => l.position)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ]);
    const slugs = chapter1Lessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every quiz has a globally unique id (across chapters 0 and 1)", () => {
    const ids: string[] = [];
    for (const lesson of [...chapterLessons, ...chapter1Lessons]) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz") continue;
        expect(block.id, `${lesson.slug}: "${block.question}"`).toBeTruthy();
        ids.push(block.id!);
      }
    }
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every quiz has exactly one correct option", () => {
    for (const lesson of chapter1Lessons) {
      for (const block of lesson.blocks) {
        if (block.type !== "quiz") continue;
        const correct = block.options.filter((o) => o.correct).length;
        expect(correct, `${lesson.slug}: "${block.question}"`).toBe(1);
      }
    }
  });

  for (const lesson of chapter1Lessons) {
    it(`renders ${lesson.slug} without runtime errors`, () => {
      const html = renderToString(
        createElement(BlockRenderer, { blocks: lesson.blocks }),
      );
      expect(html.length).toBeGreaterThan(500);
      // Interactives evaluate their expressions at initial state; a broken
      // expression or config surfaces as NaN in the markup.
      expect(html).not.toContain("NaN");
    });
  }
});
