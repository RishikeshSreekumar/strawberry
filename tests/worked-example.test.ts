import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { WorkedExampleBlockView } from "@/modules/content/components/worked-example-block";
import { lessonHeadings, lessonToc } from "@/modules/content/lib/headings";
import { nextShown, primaryReveal } from "@/modules/content/lib/worked-example-reveal";
import {
  lessonBlocksSchema,
  parseLessonBlocks,
  type WorkedExampleBlock,
} from "@/modules/content/schemas/blocks";

const example = {
  type: "worked-example",
  id: "trig-4-2-pattern-1",
  title: "Pattern 1: $\\sin x = k$",
  problem: "Solve $2\\sin x = 1$ for $0 \\le x < 2\\pi$.",
  steps: [
    { text: "Isolate the sine.", latex: "\\sin x = \\tfrac{1}{2}" },
    { latex: "x = \\tfrac{\\pi}{6} \\text{ or } x = \\pi - \\tfrac{\\pi}{6}" },
    { text: "Sine is positive in:\n- quadrant I\n- quadrant II" },
  ],
  answer: "$x = \\pi/6$ or $x = 5\\pi/6$",
} as const;

const valid = (block: unknown) => lessonBlocksSchema.safeParse([block]).success;

describe("worked-example schema", () => {
  it("accepts a full worked example unchanged", () => {
    expect(parseLessonBlocks([example])).toEqual([example]);
  });

  it("accepts the minimal shape and tryFirst: false", () => {
    expect(valid({ type: "worked-example", problem: "p", steps: [{ text: "s" }] })).toBe(true);
    expect(valid({ type: "worked-example", problem: "p", steps: [{ latex: "x" }], tryFirst: false })).toBe(true);
  });

  it("rejects a missing or blank problem", () => {
    expect(valid({ type: "worked-example", steps: [{ text: "s" }] })).toBe(false);
    expect(valid({ type: "worked-example", problem: "  ", steps: [{ text: "s" }] })).toBe(false);
  });

  it("rejects missing or empty steps", () => {
    expect(valid({ type: "worked-example", problem: "p" })).toBe(false);
    expect(valid({ type: "worked-example", problem: "p", steps: [] })).toBe(false);
  });

  it("rejects a step with neither text nor latex, or a blank one", () => {
    expect(valid({ type: "worked-example", problem: "p", steps: [{}] })).toBe(false);
    expect(valid({ type: "worked-example", problem: "p", steps: [{ table: undefined }] })).toBe(false);
    expect(valid({ type: "worked-example", problem: "p", steps: [{ text: "" }] })).toBe(false);
    expect(valid({ type: "worked-example", problem: "p", steps: [{ latex: " " }] })).toBe(false);
    expect(valid({ type: "worked-example", problem: "p", steps: [{ text: "ok" }, {}] })).toBe(false);
  });

  it("accepts a problemTable and table-only or mixed table steps", () => {
    const table = { headers: ["$x$", "$f$"], rows: [["1", "3"], ["2", "5"]] };
    const block = {
      type: "worked-example",
      problem: "Find the mean.",
      problemTable: table,
      steps: [
        { table: { headers: ["$x$", "$f$", "$fx$"], rows: [["1", "3", "3"]] } },
        { text: "Sum the columns.", table, latex: "\\bar x = 13/8" },
      ],
    };
    expect(parseLessonBlocks([block])).toEqual([block]);
  });

  it("rejects malformed tables in steps or problemTable", () => {
    const base = { type: "worked-example", problem: "p", steps: [{ text: "s" }] };
    expect(valid({ ...base, steps: [{ table: { headers: [], rows: [["1"]] } }] })).toBe(false);
    expect(valid({ ...base, steps: [{ table: { headers: ["x"], rows: [] } }] })).toBe(false);
    expect(valid({ ...base, problemTable: { headers: ["x"] } })).toBe(false);
    expect(valid({ ...base, problemTable: { headers: ["x"], rows: [[1]] } })).toBe(false);
  });

  it("rejects blank title/answer and a non-boolean tryFirst", () => {
    const base = { type: "worked-example", problem: "p", steps: [{ text: "s" }] };
    expect(valid({ ...base, title: "" })).toBe(false);
    expect(valid({ ...base, answer: " " })).toBe(false);
    expect(valid({ ...base, tryFirst: "yes" })).toBe(false);
  });
});

describe("worked-example reveal logic", () => {
  it("steps through, shows all, and resets", () => {
    expect(nextShown(0, 3, "next")).toBe(1);
    expect(nextShown(2, 3, "next")).toBe(3);
    expect(nextShown(3, 3, "next")).toBe(3);
    expect(nextShown(1, 3, "all")).toBe(3);
    expect(nextShown(3, 3, "reset")).toBe(0);
  });

  it("labels the primary button by progress", () => {
    expect(primaryReveal(0, 3)).toEqual({ label: "Show first step", action: "next" });
    expect(primaryReveal(1, 3)).toEqual({ label: "Next step", action: "next" });
    expect(primaryReveal(3, 3)).toEqual({ label: "Hide solution", action: "reset" });
    expect(primaryReveal(0, 1)).toEqual({ label: "Show solution", action: "next" });
    expect(primaryReveal(1, 1)).toEqual({ label: "Hide solution", action: "reset" });
  });
});

describe("WorkedExampleBlockView server render", () => {
  const render = (block: WorkedExampleBlock) =>
    renderToString(createElement(WorkedExampleBlockView, { block }));
  const [block] = parseLessonBlocks([example]) as [WorkedExampleBlock];

  it("renders title, problem and KaTeX, with steps hidden behind a try-first prompt", () => {
    const html = render(block);
    expect(html).toContain("Worked example");
    expect(html).toContain('class="katex"'); // inline math in title/problem
    expect(html).toContain("katex-display"); // step latex
    expect(html).toContain("Try it yourself first.");
    expect(html).toContain("Show first step");
    expect(html).toContain("Show all");
    expect(html).toContain("0 of 3 steps shown");
    expect(html).toContain('aria-live="polite"');
    // Every step and the answer are in the DOM, hidden on screen but printed.
    const steps = html.match(/<li class="[^"]*"/g) ?? [];
    expect(steps.filter((li) => li.includes("hidden print:flex"))).toHaveLength(3);
    expect(html).toContain("Isolate the sine.");
    expect(html).toMatch(/class="hidden print:block[^"]*"[^>]*><p[^>]*>Answer<\/p>/);
    // Step text keeps StructuredText lists.
    expect(html).toContain('<ul class="list-disc');
    // Reveal controls point at the steps list.
    const listId = html.match(/<ol id="([^"]+)"/)?.[1];
    expect(listId).toBeTruthy();
    const answerId = html.match(/<div id="([^"]+)" aria-live="polite">/)?.[1];
    expect(answerId).toBeTruthy();
    expect(html).toContain(`aria-controls="${listId} ${answerId}"`);
    // The screen-reader step label sits inside the step's paragraph.
    expect(html).toContain('<p class="leading-7 whitespace-pre-wrap"><span class="sr-only">Step 1: </span>Isolate the sine.</p>');
  });

  it("renders the problem table visibly and step tables hidden with their step", () => {
    const html = render({
      ...block,
      problemTable: { headers: ["$x$", "Count"], rows: [["1", "4"]] },
      steps: [
        { text: "Tabulate.", table: { headers: ["$fx$"], rows: [["**12**"]] }, latex: "\\Sigma fx = 12" },
      ],
    });
    const tables = html.match(/<table/g) ?? [];
    expect(tables).toHaveLength(2);
    // Problem table comes before the steps list, outside any hidden step.
    expect(html.indexOf("<table")).toBeLessThan(html.indexOf("<ol"));
    expect(html).toContain(">Count</th>");
    expect(html).toContain("<strong>12</strong>");
    // Step order: text, table, latex — all inside the hidden step.
    const step = html.slice(html.indexOf('<li class="hidden print:flex'), html.indexOf("</li>"));
    const [t, tab, tex] = ["Tabulate.", "<table", "katex-display"].map((x) => step.indexOf(x));
    expect(t).toBeGreaterThan(-1);
    expect(t).toBeLessThan(tab);
    expect(tab).toBeLessThan(tex);
  });

  it("points aria-controls at the steps alone when there is no answer", () => {
    const html = render({ ...block, answer: undefined });
    const listId = html.match(/<ol id="([^"]+)"/)?.[1];
    expect(html).toContain(`aria-controls="${listId}"`);
  });

  it("shows every step and the answer, with no controls, when tryFirst is false", () => {
    const html = render({ ...block, tryFirst: false });
    expect(html).not.toContain("hidden print:");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("Try it yourself first");
    expect(html).toContain(">Answer</p>");
  });

  it("labels a one-step example's button 'Show solution' and omits 'Show all'", () => {
    const html = render({ ...block, steps: [{ text: "Just do it." }] });
    expect(html).toContain("Show solution");
    expect(html).not.toContain("Show all");
  });

  it("renders deterministically (no hydration-sensitive output)", () => {
    expect(render(block)).toBe(render(block));
  });

  it("renders inside BlockRenderer without disturbing headings or the TOC", () => {
    const blocks = parseLessonBlocks([
      { type: "heading", text: "Solving equations" },
      { type: "text", content: "Intro" },
      example,
      { type: "heading", text: "Practice" },
      { type: "text", content: "More" },
    ]);
    expect(lessonToc(lessonHeadings(blocks)).map((h) => h.id)).toEqual([
      "solving-equations",
      "practice",
    ]);
    const html = renderToString(createElement(BlockRenderer, { blocks }));
    expect(html).toContain('href="#solving-equations"');
    expect(html).toContain('href="#practice"');
    expect(html).toContain("Show first step");
    expect(html).not.toMatch(/<h[23][^>]*>[^<]*Pattern 1/);
  });
});
