import { readdirSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { beforeAll, describe, expect, it } from "vitest";
import { slugifyHeading } from "@/modules/content/lib/headings";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import {
  allLatex,
  allStrings,
  CONTROL_CHARS,
  hasBareSemicolon,
  interactiveNonCaptionStrings,
} from "./helpers/lesson-text";

/**
 * Content lint: lessons need internal structure. A long unbroken run of
 * prose blocks is a wall of text; break it with a heading, a math block,
 * a worked-example, a callout, a quiz or an interactive.
 */

const MAX_TEXT_RUN = 6;

const contentDir = join(__dirname, "../src/modules/content");

type LoadedLesson = {
  file: string;
  slug: string;
  title?: string;
  blocks: LessonBlock[];
};

/** Every lesson in every *-content.ts file. */
async function loadAllLessons(): Promise<LoadedLesson[]> {
  const files = readdirSync(contentDir).filter((f) => f.endsWith("-content.ts"));
  const lessons: LoadedLesson[] = [];
  for (const file of files) {
    const mod: Record<string, unknown> = await import(join(contentDir, file));
    for (const value of Object.values(mod)) {
      if (!Array.isArray(value)) continue;
      for (const lesson of value as { slug?: string; title?: string; blocks?: LessonBlock[] }[]) {
        if (lesson?.slug && lesson.blocks) {
          lessons.push({ file, slug: lesson.slug, title: lesson.title, blocks: lesson.blocks });
        }
      }
    }
  }
  return lessons;
}

/**
 * Length of the longest run of consecutive "text" blocks. Every other block
 * type (math, callout, worked-example, quiz, ...) breaks the run.
 */
function longestTextRun(blocks: LessonBlock[]): number {
  let longest = 0;
  let run = 0;
  for (const block of blocks) {
    run = block.type === "text" ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  return longest;
}

describe("lesson structure", () => {
  let lessons: LoadedLesson[] = [];
  beforeAll(async () => {
    lessons = await loadAllLessons();
    // Imports every *-content.ts file; slow under a full parallel run.
  }, 60_000);

  it("loads every lesson", () => {
    expect(lessons.length).toBeGreaterThan(300);
  });

  it(`has no run of more than ${MAX_TEXT_RUN} consecutive text blocks`, () => {
    const walls = lessons
      .map((l) => ({ lesson: `${l.file} ${l.slug}`, run: longestTextRun(l.blocks) }))
      .filter((l) => l.run > MAX_TEXT_RUN);
    expect(walls).toEqual([]);
  });

  it("has non-empty, unique heading slugs within each lesson", () => {
    const problems: string[] = [];
    for (const { file, slug, blocks } of lessons) {
      const seen = new Set<string>();
      for (const block of blocks) {
        if (block.type !== "heading") continue;
        const id = slugifyHeading(block.text);
        if (!id) problems.push(`${file} ${slug}: heading "${block.text}" has an empty slug`);
        else if (seen.has(id)) problems.push(`${file} ${slug}: duplicate heading slug "${id}"`);
        seen.add(id);
      }
    }
    expect(problems).toEqual([]);
  });

  it("does not end a lesson on a heading or stack headings back to back", () => {
    const problems: string[] = [];
    for (const { file, slug, blocks } of lessons) {
      blocks.forEach((block, i) => {
        if (block.type !== "heading") return;
        const next = blocks[i + 1];
        if (!next) problems.push(`${file} ${slug}: ends on a heading`);
        else if (next.type === "heading" && (next.level ?? 2) <= (block.level ?? 2)) {
          problems.push(`${file} ${slug}: empty section "${block.text}"`);
        }
      });
    }
    expect(problems).toEqual([]);
  });

  it("never puts a level-3 heading before the first level-2 heading", () => {
    const problems: string[] = [];
    for (const { file, slug, blocks } of lessons) {
      for (const block of blocks) {
        if (block.type !== "heading") continue;
        if ((block.level ?? 2) === 2) break;
        problems.push(`${file} ${slug}: "${block.text}" is level 3 before any level 2`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("all inline ($...$) and display ($$...$$) math in rich text (interactive captions included), math blocks and worked-example step latex is valid KaTeX", () => {
    const problems: string[] = [];
    for (const { file, slug, blocks } of lessons) {
      for (const { latex, display } of allLatex(blocks)) {
        try {
          katex.renderToString(latex, { displayMode: display, throwOnError: true });
        } catch (e) {
          problems.push(`${file} ${slug}: ${latex} (${(e as Error).message})`);
        }
      }
    }
    expect(problems).toEqual([]);
    // Renders every math span in every course: well past the 5s default.
  }, 60_000);

  it("keeps $...$ math out of interactive fields other than the caption (they are not rendered through RichText)", () => {
    const problems: string[] = [];
    for (const { file, slug, blocks } of lessons) {
      for (const text of interactiveNonCaptionStrings(blocks)) {
        if (text.includes("$")) problems.push(`${file} ${slug}: ${JSON.stringify(text)}`);
      }
    }
    expect(problems).toEqual([]);
  });

  // KaTeX's throwOnError misses both escape traps below, so they get their
  // own checks across every course and every text-bearing field.
  it("has no control characters from single-backslash escapes (\\frac, \\times, \\vec, ...) in any block field or lesson title", () => {
    const problems: string[] = [];
    for (const { file, slug, title, blocks } of lessons) {
      for (const text of [...allStrings(title), ...allStrings(blocks)]) {
        if (CONTROL_CHARS.test(text)) {
          problems.push(`${file} ${slug}: ${JSON.stringify(text.slice(0, 120))}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('has no bare ";" in math (a single-backslash "\\;" loses its backslash)', () => {
    const problems: string[] = [];
    for (const { file, slug, blocks } of lessons) {
      for (const { latex } of allLatex(blocks)) {
        if (hasBareSemicolon(latex)) problems.push(`${file} ${slug}: ${latex}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("counts a worked-example as a non-text block that breaks a text run", () => {
    const text: LessonBlock = { type: "text", content: "x" };
    const example: LessonBlock = {
      type: "worked-example",
      problem: "p",
      steps: [{ text: "s" }],
    };
    expect(longestTextRun([text, text, example, text])).toBe(2);
  });

  it("counts a numeric question as a non-text block that breaks a text run", () => {
    const text: LessonBlock = { type: "text", content: "x" };
    const numeric: LessonBlock = {
      type: "numeric",
      variant: "practice",
      question: "q",
      answer: 1,
    };
    expect(longestTextRun([text, text, numeric, text])).toBe(2);
  });
});
