import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { LessonSeed } from "@/modules/content/chapter-0-content";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { Interactive } from "@/modules/content/components/interactives";
import {
  coneSection,
  conicEccentricity,
  conicFoci,
  conicMatrix,
  conicPoint,
  conicValue,
  focusDirectrixPoint,
  lineConicIntersections,
  lineLatex,
  polarLine,
} from "@/modules/content/components/interactives/con-geometry";
import { conChapter0Lessons } from "@/modules/content/con-chapter-0-content";
import { conChapter1Lessons } from "@/modules/content/con-chapter-1-content";
import { conChapter2Lessons } from "@/modules/content/con-chapter-2-content";
import { conChapter3Lessons } from "@/modules/content/con-chapter-3-content";
import { conChapter4Lessons } from "@/modules/content/con-chapter-4-content";
import { conChapter5Lessons } from "@/modules/content/con-chapter-5-content";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";
import {
  allLatex,
  CONTROL_CHARS,
  hasBareSemicolon,
  richTextStrings,
} from "./helpers/lesson-text";

// ---------- course content ----------

const chapters: { index: number; lessons: LessonSeed[]; count: number }[] = [
  { index: 0, lessons: conChapter0Lessons, count: 6 },
  { index: 1, lessons: conChapter1Lessons, count: 7 },
  { index: 2, lessons: conChapter2Lessons, count: 7 },
  { index: 3, lessons: conChapter3Lessons, count: 6 },
  { index: 4, lessons: conChapter4Lessons, count: 6 },
  { index: 5, lessons: conChapter5Lessons, count: 6 },
];

describe("conic-sections content", () => {
  for (const { index, lessons, count } of chapters) {
    describe(`con chapter ${index}`, () => {
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
              new RegExp(`^con${index}-${lesson.position}-q\\d+$`),
            );
            if (q.type === "numeric") numeric++;
            if (q.type === "quiz" && q.multiple) multiple++;
          }
        }
        expect(numeric).toBeGreaterThanOrEqual(10);
        expect(multiple).toBeGreaterThanOrEqual(6);
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

      it("gives every numeric question beyond one step a worked solution", () => {
        for (const lesson of lessons) {
          for (const b of lesson.blocks) {
            if (b.type !== "numeric") continue;
            expect(b.solution, b.id).toBeTruthy();
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
            expect(ex.id ?? "", lesson.slug).toMatch(new RegExp(`^con${index}-${lesson.position}-we\\d+$`));
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

  it("lesson slugs are unique across the course", () => {
    const slugs = chapters.flatMap((c) => c.lessons.map((l) => l.slug));
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("uses both new interactives somewhere in the course", () => {
    const used = new Set(
      chapters.flatMap((c) =>
        c.lessons.flatMap((l) => l.blocks.flatMap((b) => (b.type === "interactive" ? [b.config.component] : []))),
      ),
    );
    expect(used.has("con-conic-explorer")).toBe(true);
    expect(used.has("con-tangent-lab")).toBe(true);
  });
});

// ---------- geometry helpers ----------

describe("con geometry", () => {
  const close = (p: number[] | null | undefined, q: number[]) => {
    expect(p).toBeTruthy();
    p!.forEach((v, i) => expect(v).toBeCloseTo(q[i], 6));
  };

  it("places points by parameter on each conic", () => {
    close(conicPoint("parabola", 1, 1, 2), [4, 4]);
    close(conicPoint("ellipse", 5, 3, 90), [0, 3]);
    close(conicPoint("hyperbola", 3, 4, 0), [3, 0]);
    close(conicPoint("rectangular", 2, 2, 2), [4, 1]);
    expect(conicPoint("rectangular", 2, 2, 0)).toBeNull();
    expect(conicPoint("hyperbola", 3, 4, 90)).toBeNull();
  });

  it("knows eccentricities and foci", () => {
    expect(conicEccentricity("parabola", 2, 1)).toBe(1);
    expect(conicEccentricity("ellipse", 5, 3)).toBeCloseTo(0.8);
    expect(conicEccentricity("ellipse", 3, 5)).toBeCloseTo(0.8);
    expect(conicEccentricity("hyperbola", 3, 4)).toBeCloseTo(5 / 3);
    expect(conicEccentricity("rectangular", 2, 2)).toBeCloseTo(Math.SQRT2);
    close(conicFoci("parabola", 2, 1)[0], [2, 0]);
    close(conicFoci("ellipse", 5, 3)[0], [4, 0]);
    close(conicFoci("ellipse", 3, 5)[0], [0, 4]);
    close(conicFoci("hyperbola", 3, 4)[0], [5, 0]);
    close(conicFoci("rectangular", 2, 2)[0], [2 * Math.SQRT2, 2 * Math.SQRT2]);
  });

  it("gives the tangent at P as the polar of P, and the normal's second meeting point", () => {
    const M = conicMatrix("parabola", 1, 1);
    const P = conicPoint("parabola", 1, 1, 2)!;
    expect(conicValue(M, P)).toBeCloseTo(0);
    const T = polarLine(M, P);
    // tangent at t = 2 on y² = 4x: 2y = x + 4
    expect(T[0] * 4 + T[1] * 4 + T[2]).toBeCloseTo(0);
    expect(-T[0] / T[1]).toBeCloseTo(0.5);
    // the normal at t meets the parabola again at t' = −t − 2/t = −3: (9, −6)
    const normal: [number, number, number] = [T[1], -T[0], -(T[1] * P[0] - T[0] * P[1])];
    const hits = lineConicIntersections(M, normal);
    expect(hits).toHaveLength(2);
    expect(hits.some((h) => Math.abs(h[0] - 9) < 1e-6 && Math.abs(h[1] + 6) < 1e-6)).toBe(true);
  });

  it("counts tangents from a point through its chord of contact", () => {
    const M = conicMatrix("parabola", 1, 1);
    expect(lineConicIntersections(M, polarLine(M, [-1, 0]))).toHaveLength(2);
    expect(lineConicIntersections(M, polarLine(M, [1, 0]))).toHaveLength(0);
    const E = conicMatrix("ellipse", 5, 3);
    expect(conicValue(E, [0, 0])).toBeLessThan(0);
    expect(lineConicIntersections(E, polarLine(E, [5, 3]))).toHaveLength(2);
    const R = conicMatrix("rectangular", 2, 2);
    expect(conicValue(R, [4, 1])).toBeCloseTo(0);
  });

  it("writes lines readably", () => {
    expect(lineLatex([1, -2, 4])).toBe("y = 0.5x + 2");
    expect(lineLatex([1, 0, -3])).toBe("x = 3");
    expect(lineLatex([0, 2, 6])).toBe("y = -3");
  });

  it("satisfies PS = e·PM on the focus-directrix conic", () => {
    for (const e of [0.5, 1, 1.6]) {
      for (const th of [30, 100, 200]) {
        const P = focusDirectrixPoint(e, 2, th);
        if (!P) continue;
        const PS = Math.hypot(P[0], P[1]);
        const PM = Math.abs(P[0] + 2 / e);
        expect(PS).toBeCloseTo(e * PM, 6);
      }
    }
    close(focusDirectrixPoint(0, 2, 90), [0, 2]);
    expect(focusDirectrixPoint(1, 2, 0)).toBeNull();
  });

  it("names cone sections and their eccentricity", () => {
    expect(coneSection(30, 90, 1).name).toBe("circle");
    expect(coneSection(30, 60, 1).name).toBe("ellipse");
    expect(coneSection(30, 30, 1).name).toBe("parabola");
    expect(coneSection(30, 10, 1).name).toBe("hyperbola");
    expect(coneSection(30, 60, 0).name).toBe("point");
    expect(coneSection(30, 30, 0).name).toBe("line");
    expect(coneSection(30, 10, 0).name).toBe("pair of lines");
    expect(coneSection(30, 60, 1).e).toBeCloseTo(Math.cos(Math.PI / 3) / Math.cos(Math.PI / 6));
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

describe("con interactives", () => {
  it("rejects bad configs", () => {
    expect(parses({ component: "con-conic-explorer", e: { min: -1, max: 2, step: 0.1, initial: 1 } })).toBe(false);
    expect(parses({ component: "con-conic-explorer", e: { min: 0, max: 2, step: 0.1, initial: 3 } })).toBe(false);
    expect(parses({ component: "con-conic-explorer", alpha: { min: 10, max: 90, step: 5, initial: 30 } })).toBe(false);
    expect(parses({ component: "con-conic-explorer", mode: "slice" })).toBe(false);
    expect(parses({ component: "con-tangent-lab", conic: "circle" })).toBe(false);
    expect(parses({ component: "con-tangent-lab", a: { min: 0, max: 3, step: 0.5, initial: 1 } })).toBe(false);
    expect(parses({ component: "con-tangent-lab", show: ["tangent", "radical-axis"] })).toBe(false);
    expect(parses({ component: "con-tangent-lab", window: { xmin: 2, xmax: 1, ymin: -1, ymax: 1 } })).toBe(false);
  });

  it.each([
    { component: "con-conic-explorer" },
    { component: "con-conic-explorer", e: { min: 0, max: 2, step: 0.1, initial: 0 } },
    { component: "con-conic-explorer", e: { min: 0, max: 2, step: 0.1, initial: 1 }, theta: { min: -180, max: 180, step: 5, initial: 0 } },
    {
      component: "con-conic-explorer",
      e: { min: 0, max: 2.5, step: 0.1, initial: 1.6 },
      theta: { min: -180, max: 180, step: 5, initial: 10 },
      show: ["directrix", "distances", "second-focus", "centre", "latus-rectum"],
    },
    { component: "con-conic-explorer", e: { min: 0, max: 2.5, step: 0.1, initial: 0.8 }, show: ["second-focus", "centre", "latus-rectum"] },
    { component: "con-conic-explorer", mode: "cone" },
    { component: "con-conic-explorer", mode: "cone", beta: { min: 0, max: 90, step: 5, initial: 90 } },
    { component: "con-conic-explorer", mode: "cone", beta: { min: 0, max: 90, step: 5, initial: 30 } },
    { component: "con-conic-explorer", mode: "cone", beta: { min: 0, max: 90, step: 5, initial: 0 } },
    { component: "con-conic-explorer", mode: "cone", offset: { min: 0, max: 3, step: 0.5, initial: 0 } },
    { component: "con-tangent-lab" },
    {
      component: "con-tangent-lab",
      conic: "parabola",
      show: ["tangent", "normal", "focus", "directrix", "latus-rectum", "focal-chord", "focal-radii", "director-circle", "chord-of-contact", "pair-of-tangents", "midpoint-chord"],
      q: [-2, 2],
    },
    { component: "con-tangent-lab", conic: "parabola", t: { min: -3, max: 3, step: 0.1, initial: 0 }, show: ["tangent", "normal", "focal-chord"] },
    {
      component: "con-tangent-lab",
      conic: "ellipse",
      show: ["tangent", "normal", "focus", "directrix", "latus-rectum", "focal-chord", "focal-radii", "auxiliary-circle", "director-circle", "chord-of-contact", "pair-of-tangents", "midpoint-chord"],
      q: [4, 3],
    },
    { component: "con-tangent-lab", conic: "ellipse", a: { min: 1, max: 5, step: 0.5, initial: 2 }, b: { min: 1, max: 5, step: 0.5, initial: 4 }, q: [0, 0], show: ["midpoint-chord", "pair-of-tangents"] },
    {
      component: "con-tangent-lab",
      conic: "hyperbola",
      show: ["tangent", "normal", "focus", "directrix", "latus-rectum", "focal-chord", "focal-radii", "auxiliary-circle", "director-circle", "asymptotes", "chord-of-contact", "pair-of-tangents", "midpoint-chord"],
      q: [1, 0.5],
    },
    { component: "con-tangent-lab", conic: "hyperbola", t: { min: -180, max: 180, step: 5, initial: 90 } },
    { component: "con-tangent-lab", conic: "hyperbola", a: { min: 1, max: 4, step: 0.5, initial: 1 }, b: { min: 1, max: 4, step: 0.5, initial: 3 }, show: ["director-circle"] },
    {
      component: "con-tangent-lab",
      conic: "rectangular",
      show: ["tangent", "normal", "focus", "directrix", "latus-rectum", "focal-chord", "focal-radii", "asymptotes", "chord-of-contact", "pair-of-tangents", "midpoint-chord"],
      q: [1, -1],
    },
    { component: "con-tangent-lab", conic: "rectangular", t: { min: -3, max: 3, step: 0.5, initial: 0 } },
  ])("renders $component without NaN", (config) => {
    const html = render(config);
    expect(html.length).toBeGreaterThan(500);
    expect(html).not.toContain("NaN");
  });

  it("renders an author caption through RichText", () => {
    for (const component of ["con-conic-explorer", "con-tangent-lab"]) {
      const html = render({ component, caption: "Check **this** against $x^2$." });
      expect(html).toContain("<strong>this</strong>");
      expect(html).not.toContain("**");
    }
  });
});
