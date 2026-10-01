import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RichText } from "@/modules/content/components/rich-text";

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

  it("ignores asterisks inside math", () => {
    const html = render("$a^*$ and *b*");
    expect(html).toContain("<em>b</em>");
    expect(html).toContain("katex");
  });
});
