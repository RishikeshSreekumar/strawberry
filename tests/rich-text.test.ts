import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { mathSpans, RichText } from "@/modules/content/components/rich-text";

function render(text: string) {
  return renderToStaticMarkup(createElement(RichText, { text }));
}

describe("RichText", () => {
  it("renders bold and italic in plain text", () => {
    expect(render("a **b** c *d*")).toBe("a <strong>b</strong> c <em>d</em>");
  });

  it("lets bold wrap inline math", () => {
    const html = render("**Why $1/r^2$?** Because");
    expect(html).not.toContain("*");
    expect(html).toMatch(/^<strong>Why <\/strong><strong><span><span class="katex">/);
    expect(html).toContain("<strong>?</strong> Because");
  });

  it("keeps an unpaired marker as literal text", () => {
    expect(render("5 * 3 = 15")).toBe("5 * 3 = 15");
    expect(render("a ** b")).toBe("a ** b");
  });

  it("renders $$...$$ as display math with no stray dollar signs", () => {
    const html = render("So\n$$x^2 = 4,$$\nand $y$ too.");
    expect(html).not.toContain("$");
    expect(html).toContain('<span class="block overflow-x-auto"><span class="katex-display">');
    expect(html.match(/class="katex"/g)).toHaveLength(2);
  });

  it("lists math spans with their display mode", () => {
    expect(mathSpans("a $$x$$ b $y$ and $$z$$")).toEqual([
      { latex: "x", display: true },
      { latex: "y", display: false },
      { latex: "z", display: true },
    ]);
  });

  it("ignores asterisks inside math", () => {
    const html = render("$a^*$ and *b*");
    expect(html).toContain("<em>b</em>");
    expect(html).toContain("katex");
  });
});
