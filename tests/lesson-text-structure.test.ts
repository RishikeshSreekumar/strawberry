import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import {
  lessonHeadings,
  lessonToc,
  slugifyHeading,
} from "@/modules/content/lib/headings";
import { parseTextStructure } from "@/modules/content/lib/text-structure";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";

const item = (text: string) => ({ text, children: [] });

describe("parseTextStructure", () => {
  it("keeps a plain block as one paragraph, single newlines included", () => {
    expect(parseTextStructure("Line one\nline two")).toEqual([
      { kind: "paragraph", text: "Line one\nline two" },
    ]);
  });

  it("splits paragraphs on blank lines (including whitespace-only lines)", () => {
    expect(parseTextStructure("First.\n\nSecond.\n  \n\nThird.")).toEqual([
      { kind: "paragraph", text: "First." },
      { kind: "paragraph", text: "Second." },
      { kind: "paragraph", text: "Third." },
    ]);
  });

  it("parses an ordered list after a lead-in line", () => {
    expect(
      parseTextStructure("Steps:\n1. **Find** the root.\n2. **Place** it."),
    ).toEqual([
      { kind: "paragraph", text: "Steps:" },
      {
        kind: "list",
        ordered: true,
        start: 1,
        items: [item("**Find** the root."), item("**Place** it.")],
      },
    ]);
  });

  it("accepts 1) markers and keeps the first number as the start", () => {
    expect(parseTextStructure("3) three\n4) four")).toEqual([
      { kind: "list", ordered: true, start: 3, items: [item("three"), item("four")] },
    ]);
  });

  it("parses -, * and • bullets as one unordered list", () => {
    expect(parseTextStructure("- a\n* b\n• $c$")).toEqual([
      { kind: "list", ordered: false, start: 1, items: [item("a"), item("b"), item("$c$")] },
    ]);
  });

  it("treats '- ' followed by a digit as a bullet", () => {
    expect(parseTextStructure("- 0 women: $6$.\n- 1 woman: $60$.")).toEqual([
      {
        kind: "list",
        ordered: false,
        start: 1,
        items: [item("0 women: $6$."), item("1 woman: $60$.")],
      },
    ]);
  });

  it("does not treat emphasis, negative numbers or decimals as list markers", () => {
    const content = [
      "**Bold lead.** text",
      "*Why this step:* reason",
      "**1. Anticommutativity** is a bold heading-ish line",
      "-3 < x holds",
      "−5 is negative",
      "0.5 is a half",
      "2.5 m/s² is fast",
      "*",
      "- ",
      "1.",
    ].join("\n");
    expect(parseTextStructure(content)).toEqual([
      { kind: "paragraph", text: content },
    ]);
  });

  it("ends a list at a blank line or a non-indented plain line", () => {
    expect(parseTextStructure("1. a\n2. b\nSo the answer is 3.\n\n- c")).toEqual([
      { kind: "list", ordered: true, start: 1, items: [item("a"), item("b")] },
      { kind: "paragraph", text: "So the answer is 3." },
      { kind: "list", ordered: false, start: 1, items: [item("c")] },
    ]);
  });

  it("starts a new list when the list kind changes", () => {
    expect(parseTextStructure("1. a\n- b")).toEqual([
      { kind: "list", ordered: true, start: 1, items: [item("a")] },
      { kind: "list", ordered: false, start: 1, items: [item("b")] },
    ]);
  });

  it("joins an indented plain line onto the previous item", () => {
    expect(
      parseTextStructure("1. Count all.\n   *Why this step:* complement.\n2. Subtract."),
    ).toEqual([
      {
        kind: "list",
        ordered: true,
        start: 1,
        items: [item("Count all.\n*Why this step:* complement."), item("Subtract.")],
      },
    ]);
  });

  it("nests indented items under the previous item", () => {
    expect(
      parseTextStructure("1. Translate.\n2. List the cases:\n   - A true\n   - B true\n3. Add:"),
    ).toEqual([
      {
        kind: "list",
        ordered: true,
        start: 1,
        items: [
          item("Translate."),
          {
            text: "List the cases:",
            children: [
              { kind: "list", ordered: false, start: 1, items: [item("A true"), item("B true")] },
            ],
          },
          item("Add:"),
        ],
      },
    ]);
  });

  it("measures nesting from the list's own indent, not column 0", () => {
    expect(parseTextStructure("Options:\n  - a\n  - b\n  - c")).toEqual([
      { kind: "paragraph", text: "Options:" },
      { kind: "list", ordered: false, start: 1, items: [item("a"), item("b"), item("c")] },
    ]);
    expect(parseTextStructure("  1. a\n     - sub\n  2. b")).toEqual([
      {
        kind: "list",
        ordered: true,
        start: 1,
        items: [
          { text: "a", children: [{ kind: "list", ordered: false, start: 1, items: [item("sub")] }] },
          item("b"),
        ],
      },
    ]);
  });

  it("collapses deeper indents into the single nesting level", () => {
    expect(parseTextStructure("- a\n  - b\n      - c")).toEqual([
      {
        kind: "list",
        ordered: false,
        start: 1,
        items: [
          {
            text: "a",
            children: [{ kind: "list", ordered: false, start: 1, items: [item("b"), item("c")] }],
          },
        ],
      },
    ]);
  });

  it("keeps indented display math inside its list item", () => {
    const nodes = parseTextStructure("1. Add:\n   $$x = 1,$$\n   a series.\n2. Done.");
    expect(nodes).toEqual([
      {
        kind: "list",
        ordered: true,
        start: 1,
        items: [item("Add:\n$$x = 1,$$\na series."), item("Done.")],
      },
    ]);
  });

  it("keeps leading spaces of indented lines outside lists", () => {
    expect(parseTextStructure("Total:\n   $6$")).toEqual([
      { kind: "paragraph", text: "Total:\n   $6$" },
    ]);
  });
});

describe("heading slugs", () => {
  it("slugifies text, dropping emphasis, punctuation and LaTeX commands", () => {
    expect(slugifyHeading("Worked examples")).toBe("worked-examples");
    expect(slugifyHeading("**Why** $1/r^2$?")).toBe("why-1-r-2");
    expect(slugifyHeading("Torque as $\\vec r \\times \\vec F$")).toBe("torque-as-r-f");
    expect(slugifyHeading("Computing a 2×2 inverse")).toBe("computing-a-2-2-inverse");
    expect(slugifyHeading("Lagrange's identity")).toBe("lagrange-s-identity");
    expect(slugifyHeading("Café θ")).toBe("cafe-θ");
    expect(slugifyHeading("$\\to$")).toBe("");
  });

  it("dedupes ids within a lesson and falls back to 'section'", () => {
    const blocks = parseLessonBlocks([
      { type: "heading", text: "Examples" },
      { type: "text", content: "x" },
      { type: "heading", text: "Examples", level: 3 },
      { type: "heading", text: "examples!" },
      { type: "heading", text: "$\\to$" },
    ]);
    expect(lessonHeadings(blocks).map((h) => [h.index, h.id, h.level])).toEqual([
      [0, "examples", 2],
      [2, "examples-2", 3],
      [3, "examples-3", 2],
      [4, "section", 2],
    ]);
  });

  it("only builds a table of contents from two or more level-2 headings", () => {
    const one = parseLessonBlocks([
      { type: "heading", text: "Only" },
      { type: "heading", text: "Sub", level: 3 },
    ]);
    expect(lessonToc(lessonHeadings(one))).toEqual([]);
    const two = parseLessonBlocks([
      { type: "heading", text: "A" },
      { type: "heading", text: "Sub", level: 3 },
      { type: "heading", text: "B" },
    ]);
    expect(lessonToc(lessonHeadings(two)).map((h) => h.id)).toEqual(["a", "b"]);
  });
});

describe("BlockRenderer structure", () => {
  const render = (input: unknown[]) =>
    renderToString(createElement(BlockRenderer, { blocks: parseLessonBlocks(input) }));

  it("renders a single-paragraph text block as one <p>", () => {
    const html = render([{ type: "text", content: "Hello\nworld" }]);
    expect(html).toBe(
      '<div class="space-y-6"><p class="leading-7 whitespace-pre-wrap">Hello\nworld</p></div>',
    );
  });

  it("renders paragraphs and lists in text and callout blocks", () => {
    const html = render([
      { type: "text", content: "Intro\n\n1. one\n2. two\n\nOutro" },
      { type: "callout", variant: "tip", content: "Remember:\n- a\n- b" },
    ]);
    expect(html).toContain('<ol class="list-decimal');
    expect(html).toMatch(/<li[^>]*>one<\/li>/);
    expect(html).toContain('<ul class="list-disc');
    expect(html).toContain(">Intro</p>");
    expect(html).toContain(">Outro</p>");
    expect(html).toContain(">Remember:</p>");
  });

  it("sets the start number of a continued ordered list", () => {
    expect(render([{ type: "text", content: "3. three\n4. four" }])).toContain('start="3"');
  });

  it("renders headings with ids and a TOC after a leading video", () => {
    const html = render([
      { type: "video", src: "/videos/x.mp4" },
      { type: "text", content: "Intro" },
      { type: "heading", text: "First part" },
      { type: "text", content: "x" },
      { type: "heading", text: "Detail", level: 3 },
      { type: "heading", text: "Second part" },
      { type: "text", content: "y" },
    ]);
    expect(html).toMatch(/<h2 id="first-part" class="scroll-mt-20[^"]*">First part<\/h2>/);
    expect(html).toMatch(/<h3 id="detail" class="scroll-mt-20[^"]*">Detail<\/h3>/);
    expect(html).toContain('href="#first-part"');
    expect(html).toContain('href="#second-part"');
    expect(html).not.toContain('href="#detail"');
    const video = html.indexOf("<video");
    const toc = html.indexOf('aria-label="On this page"');
    const intro = html.indexOf(">Intro<");
    expect(video).toBeLessThan(toc);
    expect(toc).toBeLessThan(intro);
  });

  it("omits the TOC with fewer than two level-2 headings", () => {
    const html = render([
      { type: "heading", text: "Only one" },
      { type: "text", content: "x" },
    ]);
    expect(html).toContain('id="only-one"');
    expect(html).not.toContain("On this page");
  });
});
