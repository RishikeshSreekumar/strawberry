import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { LessonSeed } from "@/modules/content/chapter-0-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { Interactive } from "@/modules/content/components/interactives";
import {
  srfCompile,
  srfEquivalenceClosure,
  srfFunctionCounts,
  srfFunctionReport,
  srfRelationReport,
  srfShadedRegions,
} from "@/modules/content/lib/srf";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";
import { srfChapter0Lessons } from "@/modules/content/srf-chapter-0-content";
import { srfChapter1Lessons } from "@/modules/content/srf-chapter-1-content";
import { srfChapter2Lessons } from "@/modules/content/srf-chapter-2-content";
import { srfChapter3Lessons } from "@/modules/content/srf-chapter-3-content";
import { srfChapter4Lessons } from "@/modules/content/srf-chapter-4-content";
import { srfChapter5Lessons } from "@/modules/content/srf-chapter-5-content";
import {
  allLatex,
  CONTROL_CHARS,
  hasBareSemicolon,
  richTextStrings,
} from "./helpers/lesson-text";

// ---------- course content ----------

const chapters: { index: number; lessons: LessonSeed[]; count: number }[] = [
  { index: 0, lessons: srfChapter0Lessons, count: 6 },
  { index: 1, lessons: srfChapter1Lessons, count: 7 },
  { index: 2, lessons: srfChapter2Lessons, count: 7 },
  { index: 3, lessons: srfChapter3Lessons, count: 7 },
  { index: 4, lessons: srfChapter4Lessons, count: 7 },
  { index: 5, lessons: srfChapter5Lessons, count: 7 },
];

describe("sets-relations-functions content", () => {
  for (const { index, lessons, count } of chapters) {
    describe(`srf chapter ${index}`, () => {
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
              new RegExp(`^srf${index}-${lesson.position}-q\\d+$`),
            );
            if (q.type === "numeric") numeric++;
            if (q.type === "quiz" && q.multiple) multiple++;
          }
        }
        expect(numeric).toBeGreaterThanOrEqual(6);
        expect(multiple).toBeGreaterThanOrEqual(5);
      });

      it("structures every teaching lesson with headings and worked examples", () => {
        for (const lesson of lessons.slice(0, -1)) {
          const headings = lesson.blocks.filter((b) => b.type === "heading").length;
          const examples = lesson.blocks.filter((b) => b.type === "worked-example");
          expect(headings, lesson.slug).toBeGreaterThanOrEqual(2);
          expect(examples.length, lesson.slug).toBeGreaterThanOrEqual(2);
          for (const ex of examples) {
            expect(ex.id ?? "", lesson.slug).toMatch(new RegExp(`^srf${index}-${lesson.position}-we\\d+$`));
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

  it("question ids are unique across the course", () => {
    const ids = chapters.flatMap((c) =>
      c.lessons.flatMap((l) =>
        l.blocks.flatMap((b) => (b.type === "quiz" || b.type === "numeric" ? [b.id] : [])),
      ),
    );
    expect(ids.length).toBe(new Set(ids).size);
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

describe("srf helpers", () => {
  it("shades set expressions region by region", () => {
    expect(srfShadedRegions("A|B", 2)).toEqual(["A", "B", "AB"]);
    expect(srfShadedRegions("(A|B)'", 2)).toEqual([""]);
    expect(srfShadedRegions("A^B", 2)).toEqual(["A", "B"]);
    expect(srfShadedRegions("A-B", 2)).toEqual(["A"]);
    expect(srfShadedRegions("A&(B|C)", 3)).toEqual(["AB", "AC", "ABC"]);
    expect(srfShadedRegions("A'&B'", 2)).toEqual(srfShadedRegions("(A|B)'", 2));
    expect(srfShadedRegions("U", 2)).toEqual(["", "A", "B", "AB"]);
    expect(srfShadedRegions("0", 3)).toEqual([]);
    expect(typeof srfShadedRegions("A|C", 2)).toBe("string");
    expect(typeof srfShadedRegions("A+B", 2)).toBe("string");
  });

  it("evaluates the special functions and inverse-trig branches", () => {
    expect(srfCompile("floor(x)")(-1.5)).toBe(-2);
    expect(srfCompile("floor(3*(1/3))")(0)).toBe(1);
    expect(srfCompile("frac(x)")(-1.25)).toBeCloseTo(0.75);
    expect(srfCompile("sgn(x)")(0)).toBe(0);
    expect(srfCompile("acot(x)")(-1)).toBeCloseTo((3 * Math.PI) / 4);
    expect(srfCompile("asec(x)")(-2)).toBeCloseTo((2 * Math.PI) / 3);
    expect(srfCompile("acsc(x)")(0.5)).toBeNaN();
    expect(srfCompile("1/x")(0)).toBeNaN();
    expect(() => srfCompile("foo(x)")).toThrow();
  });

  it("checks relation properties with witnesses", () => {
    const set = ["1", "2", "3"];
    const r = srfRelationReport(set, [
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["1", "2"],
    ]);
    expect(r.reflexive.ok).toBe(true);
    expect(r.symmetric.witness).toEqual(["1", "2"]);
    expect(r.antisymmetric.ok).toBe(true);
    expect(r.transitive.ok).toBe(true);
    const closure = srfEquivalenceClosure(set, [["1", "2"]]);
    const eq = srfRelationReport(set, closure);
    expect(eq.equivalence).toBe(true);
    expect(eq.classes).toEqual([["1", "2"], ["3"]]);
    expect(closure.length).toBe(5);
  });

  it("checks functions and counts them", () => {
    const rep = srfFunctionReport(["1", "2", "3"], ["a", "b"], [
      ["1", "a"],
      ["2", "a"],
      ["3", "b"],
    ]);
    expect(rep.isFunction && rep.surjective && !rep.injective).toBe(true);
    expect(rep.collision).toEqual(["1", "2"]);
    expect(srfFunctionCounts(4, 3)).toEqual({ all: 81, injective: 0, surjective: 36 });
    expect(srfFunctionCounts(3, 3)).toEqual({ all: 27, injective: 6, surjective: 6 });
  });
});

describe("srf interactives", () => {
  it("rejects bad configs", () => {
    expect(parses({ component: "srf-venn-diagram", sets: 2, expressions: [{ expr: "A|C", latex: "A" }] })).toBe(false);
    expect(parses({ component: "srf-venn-diagram", sets: 2, counts: { ABC: 1 } })).toBe(false);
    expect(parses({ component: "srf-mapping-explorer", domain: ["1"], pairs: [["1", "2"]] })).toBe(false);
    expect(parses({ component: "srf-graph-lab", functions: [{ label: "f", expr: "bad(x)", latex: "f" }], window: { xmin: -1, xmax: 1, ymin: -1, ymax: 1 } })).toBe(false);
  });

  it.each([
    { component: "srf-venn-diagram" },
    {
      component: "srf-venn-diagram",
      sets: 3,
      counts: { "": 5, A: 10, B: 8, C: 6, AB: 3, AC: 2, BC: 4, ABC: 1 },
      expressions: [
        { expr: "A|B|C", latex: "A \\cup B \\cup C" },
        { expr: "(A&B)-C", latex: "(A \\cap B) - C" },
      ],
      initialExpression: 0,
      showInclusionExclusion: true,
    },
    { component: "srf-mapping-explorer", domain: ["1", "2", "3"], pairs: [["1", "1"], ["1", "2"]] },
    {
      component: "srf-mapping-explorer",
      mode: "function",
      domain: ["1", "2", "3"],
      codomain: ["a", "b"],
      pairs: [["1", "a"], ["2", "b"], ["3", "b"]],
      showCounts: true,
    },
    {
      component: "srf-graph-lab",
      functions: [
        { label: "[x]", expr: "floor(x)", latex: "[x]" },
        { label: "sgn", expr: "sgn(x)", latex: "\\operatorname{sgn} x" },
        { label: "1/x", expr: "1/x", latex: "\\frac{1}{x}" },
      ],
      transforms: ["none", "abs", "abs-x", "floor", "frac"],
      window: { xmin: -4, xmax: 4, ymin: -3, ymax: 3 },
      probe: 1,
    },
    {
      component: "srf-graph-lab",
      functions: [{ label: "sin", expr: "sin(x)", latex: "\\sin x", branch: { min: -Math.PI / 2, max: Math.PI / 2 } }],
      transforms: ["inverse", "none"],
      window: { xmin: -3.2, xmax: 3.2, ymin: -2, ymax: 2 },
      probe: 0.5,
    },
  ])("renders $component without NaN", (config) => {
    const html = render(config);
    expect(html.length).toBeGreaterThan(500);
    expect(html).not.toContain("NaN");
  });
});
