import type { LessonBlock } from "../schemas/blocks";

/**
 * URL-fragment slug for a heading: math kept as its plain characters
 * (LaTeX commands dropped), emphasis markers and punctuation removed,
 * lowercased, words joined by "-". Unicode letters survive, so "θ" stays.
 */
export function slugifyHeading(text: string): string {
  return text
    .replace(/\\[a-zA-Z]+/g, " ")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export type LessonHeading = {
  /** Index of the heading block in the lesson's blocks. */
  index: number;
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Every heading in a lesson with its anchor id. Ids are unique within the
 * lesson: a repeated slug gets "-2", "-3", ...; an empty one becomes
 * "section". The BlockRenderer and the table of contents both use this, so
 * links and targets always agree.
 */
export function lessonHeadings(blocks: LessonBlock[]): LessonHeading[] {
  const used = new Set<string>();
  const headings: LessonHeading[] = [];
  blocks.forEach((block, index) => {
    if (block.type !== "heading") return;
    const base = slugifyHeading(block.text) || "section";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    headings.push({ index, id, text: block.text, level: block.level ?? 2 });
  });
  return headings;
}

/** Table-of-contents entries: the level-2 headings, shown when there are 2+. */
export function lessonToc(headings: LessonHeading[]): LessonHeading[] {
  const top = headings.filter((h) => h.level === 2);
  return top.length >= 2 ? top : [];
}
