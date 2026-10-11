import katex from "katex";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Interactive } from "@/modules/content/components/interactives";
import { parseLessonBlocks } from "@/modules/content/schemas/blocks";

const CAPTION = "Check **this** against $x^2$ here.";
const xSquared = katex.renderToString("x^2", { throwOnError: false });

function render(config: Record<string, unknown>): string {
  const [block] = parseLessonBlocks([{ type: "interactive", config }]);
  if (block.type !== "interactive") throw new Error("expected an interactive block");
  return renderToString(createElement(Interactive, { config: block.config }));
}

describe("interactive captions", () => {
  // One per caption pattern: an inline `config.caption ?? "..."` child, the
  // shared CaptionRow (mfe labs), a Footer helper (omp labs) and a caption
  // computed into a variable first.
  it.each([
    { component: "unit-circle", initialAngle: 30 },
    { component: "mfe-force-lab" },
    { component: "omp-ray-bench" },
    { component: "pnc-pascal-triangle" },
  ])(
    "$component renders an author caption through RichText (KaTeX math, bold, no raw markers)",
    (config) => {
      const html = render({ ...config, caption: CAPTION });
      expect(html).toContain(xSquared);
      expect(html).toContain("<strong>this</strong>");
      expect(html).not.toContain("$");
      expect(html).not.toContain("**");
    },
  );

  it("still renders a default caption as plain text", () => {
    const html = render({ component: "unit-circle", initialAngle: 30 });
    expect(html).toContain("The blue leg is cos, the green leg is sin, and the point is (cos, sin).");
  });
});
