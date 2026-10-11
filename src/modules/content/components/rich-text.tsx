import katex from "katex";
import { Fragment, type ReactNode } from "react";

type Token =
  | { kind: "text"; value: string }
  | { kind: "math"; value: string }
  | { kind: "display"; value: string }
  | { kind: "marker"; value: "**" | "*" };

/**
 * Every math span in a rich-text string: `$$...$$` (display) first, then
 * `$...$` (inline) in what remains. Shared by the renderer and content tests.
 */
export function mathSpans(text: string): { latex: string; display: boolean }[] {
  return tokenize(text).flatMap((t) =>
    t.kind === "math" || t.kind === "display"
      ? [{ latex: t.value, display: t.kind === "display" }]
      : [],
  );
}

/**
 * Splits text into plain runs, $$...$$ display math, $...$ inline math and
 * emphasis markers. Markers are paired in order (like the old `**[^*]+**` /
 * `*[^*]+*` regex); an unpaired marker, or a pair with nothing between it,
 * stays literal text.
 */
function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  text.split(/\$\$([^$]+)\$\$/g).forEach((chunk, c) => {
    if (c % 2 === 1) {
      tokens.push({ kind: "display", value: chunk });
      return;
    }
    chunk.split(/\$([^$]+)\$/g).forEach((part, i) => {
      if (i % 2 === 1) {
        tokens.push({ kind: "math", value: part });
        return;
      }
      for (const piece of part.split(/(\*\*|\*)/g)) {
        if (piece === "**" || piece === "*") tokens.push({ kind: "marker", value: piece });
        else if (piece) tokens.push({ kind: "text", value: piece });
      }
    });
  });

  for (const marker of ["**", "*"] as const) {
    let open = -1;
    tokens.forEach((token, i) => {
      if (token.kind !== "marker" || token.value !== marker) return;
      if (open === -1) {
        open = i;
      } else if (i === open + 1) {
        // "**" with nothing inside (or "* *"): not emphasis.
        tokens[open] = { kind: "text", value: marker };
        open = i;
      } else {
        open = -1;
      }
    });
    if (open !== -1) tokens[open] = { kind: "text", value: marker };
  }
  return tokens;
}

/**
 * Renders text with math and inline markdown emphasis: anything between
 * $...$ goes through KaTeX in inline mode ($$...$$ in display mode), and `**bold**` /
 * `*italic*` become <strong> / <em>. Emphasis may wrap math, e.g.
 * `**Why $1/r^2$?**`. Works in both server and client trees.
 */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let bold = false;
  let italic = false;

  tokenize(text).forEach((token, i) => {
    if (token.kind === "marker") {
      if (token.value === "**") bold = !bold;
      else italic = !italic;
      return;
    }
    let node: ReactNode =
      token.kind === "math" || token.kind === "display" ? (
        <span
          key={i}
          // Display math is a block-level span (valid inside <p>), scrolling
          // sideways on narrow screens like a math block.
          className={token.kind === "display" ? "block overflow-x-auto" : undefined}
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(token.value, {
              displayMode: token.kind === "display",
              throwOnError: false,
            }),
          }}
        />
      ) : (
        <Fragment key={i}>{token.value}</Fragment>
      );
    if (italic) node = <em key={`i${i}`}>{node}</em>;
    if (bold) node = <strong key={`b${i}`}>{node}</strong>;
    nodes.push(node);
  });

  return <>{nodes}</>;
}
