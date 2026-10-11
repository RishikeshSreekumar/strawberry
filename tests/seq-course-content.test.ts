import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { LessonSeed } from "@/modules/content/chapter-0-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { Interactive } from "@/modules/content/components/interactives";
import {
  seqClosedSum,
  seqCompile,
  seqExpressionError,
  seqMeans,
  seqSumToInfinity,
  seqTable,
  seqTerm,
} from "@/modules/content/lib/seq";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";
import { seqChapter0Lessons } from "@/modules/content/seq-chapter-0-content";
import { seqChapter1Lessons } from "@/modules/content/seq-chapter-1-content";
import { seqChapter2Lessons } from "@/modules/content/seq-chapter-2-content";
import { seqChapter3Lessons } from "@/modules/content/seq-chapter-3-content";
import { seqChapter4Lessons } from "@/modules/content/seq-chapter-4-content";
import { seqChapter5Lessons } from "@/modules/content/seq-chapter-5-content";
import {
  allLatex,
  CONTROL_CHARS,
  hasBareSemicolon,
  richTextStrings,
} from "./helpers/lesson-text";

// ---------- course content ----------

const chapters: { index: number; lessons: LessonSeed[]; count: number }[] = [
  { index: 0, lessons: seqChapter0Lessons, count: 6 },
  { index: 1, lessons: seqChapter1Lessons, count: 6 },
  { index: 2, lessons: seqChapter2Lessons, count: 6 },
  { index: 3, lessons: seqChapter3Lessons, count: 6 },
  { index: 4, lessons: seqChapter4Lessons, count: 7 },
  { index: 5, lessons: seqChapter5Lessons, count: 6 },
];

describe("sequences-series content", () => {
  for (const { index, lessons, count } of chapters) {
    describe(`seq chapter ${index}`, () => {
      it(`has ${count} lessons in order with unique slugs and numbered plain-text titles`, () => {
        expect(lessons.map((l) => l.position)).toEqual(
          Array.from({ length: count }, (_, i) => i + 1),
        );
        expect(new Set(lessons.map((l) => l.slug)).size).toBe(lessons.length);
        lessons.forEach((l, i) => {
          expect(l.title, l.slug).toMatch(new RegExp(`^${index}\\.${i + 1} · \\S`));
          expect(l.title, l.slug).not.toContain("$");
          expect(l.title, l.slug).not.toContain("\\");
        });
      });

      it("ends with a mastery lesson", () => {
        const last = lessons[lessons.length - 1];
        expect(last.slug).toBe(`chapter-${index}-mastery`);
        expect(last.title).toBe(`${index}.${lessons.length} · Chapter ${index} Mastery`);
        expect(
          last.blocks.some((b) => (b.type === "quiz" || b.type === "numeric") && b.variant === "mastery"),
        ).toBe(true);
      });

      it("has enough questions, each with a hint and a well-formed id", () => {
        let numeric = 0;
        let multiple = 0;
        for (const lesson of lessons) {
          const questions = lesson.blocks.filter((b) => b.type === "quiz" || b.type === "numeric");
          expect(questions.length, lesson.slug).toBeGreaterThanOrEqual(8);
          for (const q of questions) {
            expect(q.hint, `${lesson.slug}: ${q.question}`).toBeTruthy();
            expect(q.id, `${lesson.slug}: ${q.question}`).toMatch(
              new RegExp(`^seq${index}-${lesson.position}-q\\d+$`),
            );
            if (q.type === "numeric") numeric++;
            if (q.type === "quiz" && q.multiple) multiple++;
          }
        }
        expect(numeric).toBeGreaterThanOrEqual(6);
        expect(multiple).toBeGreaterThanOrEqual(5);
      });

      it("gives every quiz option feedback and every single-correct quiz exactly one answer", () => {
        for (const lesson of lessons) {
          for (const b of lesson.blocks) {
            if (b.type !== "quiz") continue;
            const correct = b.options.filter((o) => o.correct).length;
            if (b.multiple) expect(correct, b.id).toBeGreaterThanOrEqual(1);
            else expect(correct, b.id).toBe(1);
            for (const o of b.options) expect(o.feedback, `${b.id}: ${o.text}`).toBeTruthy();
          }
        }
      });

      it("structures every teaching lesson with headings and worked examples", () => {
        for (const lesson of lessons.slice(0, -1)) {
          const headings = lesson.blocks.filter((b) => b.type === "heading").length;
          const examples = lesson.blocks.filter((b) => b.type === "worked-example");
          expect(headings, lesson.slug).toBeGreaterThanOrEqual(2);
          expect(examples.length, lesson.slug).toBeGreaterThanOrEqual(2);
          for (const ex of examples) {
            expect(ex.id ?? "", lesson.slug).toMatch(new RegExp(`^seq${index}-${lesson.position}-we\\d+$`));
          }
        }
      });

      it("has valid KaTeX everywhere, with no stray escape characters", () => {
        for (const lesson of lessons) {
          const math = allLatex(lesson.blocks);
          for (const { latex, display } of math) {
            expect(
              () => katex.renderToString(latex, { displayMode: display, throwOnError: true }),
              `${lesson.slug}: ${latex}`,
            ).not.toThrow();
            expect(hasBareSemicolon(latex), `${lesson.slug}: ${latex}`).toBe(false);
          }
          for (const text of [...richTextStrings(lesson.blocks), ...math.map((m) => m.latex)]) {
            expect(text, lesson.slug).not.toMatch(CONTROL_CHARS);
          }
        }
      });

      for (const lesson of lessons) {
        it(`renders ${lesson.slug} without runtime errors`, () => {
          const html = renderToString(createElement(BlockRenderer, { blocks: lesson.blocks }));
          expect(html.length).toBeGreaterThan(500);
          expect(html).not.toContain("NaN");
        });
      }
    });
  }

  it("question and worked-example ids are unique across the course", () => {
    const ids = chapters.flatMap((c) =>
      c.lessons.flatMap((l) =>
        l.blocks.flatMap((b) =>
          b.type === "quiz" || b.type === "numeric" || b.type === "worked-example" ? [b.id] : [],
        ),
      ),
    );
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("uses both new interactives somewhere in the course", () => {
    const used = new Set(
      chapters.flatMap((c) =>
        c.lessons.flatMap((l) => l.blocks.flatMap((b) => (b.type === "interactive" ? [b.config.component] : []))),
      ),
    );
    expect(used.has("seq-progression-lab")).toBe(true);
    expect(used.has("seq-means-lab")).toBe(true);
  });
});

// ---------- helpers ----------

describe("seq helpers", () => {
  const brute = (term: (k: number) => number, n: number) => seqTable(term, n).sums[n - 1];

  it("computes AP, GP, HP and AGP terms", () => {
    const p = { a: 2, d: 3, r: 0.5 };
    expect(seqTerm("ap", p, 10)).toBe(29);
    expect(seqTerm("gp", p, 4)).toBeCloseTo(0.25);
    expect(seqTerm("hp", { a: 1, d: 1, r: 1 }, 4)).toBeCloseTo(0.25);
    expect(seqTerm("hp", { a: -2, d: 1, r: 1 }, 3)).toBeNaN();
    expect(seqTerm("agp", { a: 1, d: 1, r: 2 }, 3)).toBe(12);
  });

  it("matches the closed-form sums against brute force", () => {
    for (const p of [
      { a: 2, d: 3, r: 0.5 },
      { a: -1, d: 0.5, r: -0.8 },
      { a: 5, d: -2, r: 1.3 },
      { a: 1, d: 2, r: 1 },
    ]) {
      for (const n of [1, 2, 7, 20]) {
        for (const kind of ["ap", "gp", "agp"] as const) {
          expect(seqClosedSum(kind, p, n)).toBeCloseTo(brute((k) => seqTerm(kind, p, k), n), 6);
        }
      }
    }
    expect(seqClosedSum("ap", { a: 1, d: 1, r: 0 }, 100)).toBe(5050);
    expect(seqClosedSum("hp", { a: 1, d: 1, r: 0 }, 3)).toBeNaN();
  });

  it("gives sums to infinity only when they exist", () => {
    expect(seqSumToInfinity("gp", { a: 3, d: 0, r: 0.5 })).toBeCloseTo(6);
    expect(seqSumToInfinity("gp", { a: 3, d: 0, r: -1 })).toBeNaN();
    expect(seqSumToInfinity("gp", { a: 3, d: 0, r: 1.2 })).toBeNaN();
    // 1 + 2/2 + 3/4 + 4/8 + ... = 4
    expect(seqSumToInfinity("agp", { a: 1, d: 1, r: 0.5 })).toBeCloseTo(4);
    expect(seqSumToInfinity("agp", { a: 1, d: 1, r: 0.5 })).toBeCloseTo(brute((k) => k / 2 ** (k - 1), 200), 8);
    expect(seqSumToInfinity("ap", { a: 1, d: 1, r: 0 })).toBeNaN();
    expect(seqSumToInfinity("hp", { a: 1, d: 1, r: 0 })).toBeNaN();
  });

  it("evaluates authored general terms in k", () => {
    const t = seqCompile("1/(k*(k+1))");
    expect(brute(t, 99)).toBeCloseTo(0.99);
    expect(seqCompile("(-1)^(k+1)")(4)).toBe(-1);
    expect(seqExpressionError("1/k^2")).toBeNull();
    expect(seqExpressionError("1/x")).toMatch(/expression in k/);
    expect(seqExpressionError("fact(k)")).toMatch(/expression in k/);
  });

  it("computes the three means with G^2 = AH", () => {
    const { am, gm, hm } = seqMeans(9, 4);
    expect([am, gm, hm]).toEqual([6.5, 6, 72 / 13]);
    expect(gm * gm).toBeCloseTo(am * hm);
    expect(seqMeans(-1, 4).am).toBeNaN();
  });
});

// ---------- interactives ----------

function render(config: Record<string, unknown>): string {
  const [block] = parseLessonBlocks([{ type: "interactive", config }]);
  if (block.type !== "interactive") throw new Error("expected an interactive block");
  return renderToString(createElement(Interactive, { config: block.config }));
}

const parses = (config: Record<string, unknown>) => {
  try {
    parseLessonBlocks([{ type: "interactive", config }]);
    return true;
  } catch {
    return false;
  }
};

describe("seq interactives", () => {
  it("rejects bad configs", () => {
    expect(parses({ component: "seq-progression-lab", kinds: [] })).toBe(false);
    expect(parses({ component: "seq-progression-lab", kinds: ["ap"], n: { min: 1, max: 100, step: 1, initial: 10 } })).toBe(false);
    expect(parses({ component: "seq-progression-lab", kinds: ["ap"], n: { min: 1, max: 20, step: 0.5, initial: 10 } })).toBe(false);
    expect(parses({ component: "seq-progression-lab", series: [{ label: "x", expr: "1/x", latex: "x" }] })).toBe(false);
    expect(parses({ component: "seq-progression-lab", kinds: ["ap"], a: { min: 5, max: 1, step: 1, initial: 2 } })).toBe(false);
    expect(parses({ component: "seq-means-lab", a: { min: -1, max: 5, step: 1, initial: 2 } })).toBe(false);
    expect(parses({ component: "seq-means-lab", fixed: "ratio" })).toBe(false);
  });

  it.each([
    { component: "seq-progression-lab" },
    { component: "seq-progression-lab", kinds: ["ap"], view: "terms", d: { min: -3, max: 3, step: 0.5, initial: -2 } },
    {
      component: "seq-progression-lab",
      kinds: ["gp"],
      r: { min: -1.5, max: 1.5, step: 0.05, initial: 1.5 },
      n: { min: 1, max: 60, step: 1, initial: 60 },
    },
    { component: "seq-progression-lab", kinds: ["gp"], r: { min: -1.5, max: 1.5, step: 0.05, initial: -1 } },
    {
      component: "seq-progression-lab",
      kinds: ["hp"],
      a: { min: -5, max: 5, step: 1, initial: -2 },
      d: { min: -2, max: 2, step: 1, initial: 1 },
    },
    { component: "seq-progression-lab", kinds: ["agp"], view: "sums" },
    {
      component: "seq-progression-lab",
      kinds: [],
      series: [
        { label: "telescoping", expr: "1/(k*(k+1))", latex: "\\frac{1}{k(k+1)}", limit: 1 },
        { label: "harmonic", expr: "1/k", latex: "\\frac{1}{k}" },
      ],
      view: "sums",
    },
    { component: "seq-means-lab" },
    { component: "seq-means-lab", a: { min: 0.5, max: 12, step: 0.5, initial: 5 }, b: { min: 0.5, max: 12, step: 0.5, initial: 5 } },
    { component: "seq-means-lab", fixed: "sum", showHm: false },
    { component: "seq-means-lab", fixed: "product" },
  ])("renders $component without NaN", (config) => {
    const html = render(config);
    expect(html.length).toBeGreaterThan(500);
    expect(html).not.toContain("NaN");
  });

  it("renders an author caption through RichText", () => {
    const html = render({ component: "seq-means-lab", caption: "Check **this** against $x^2$." });
    expect(html).toContain("<strong>this</strong>");
    expect(html).not.toContain("**");
  });
});
