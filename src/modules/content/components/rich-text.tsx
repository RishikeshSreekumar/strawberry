import katex from "katex";
import { Fragment, type ReactNode } from "react";

/** `**bold**` and `*italic*` inside a math-free text segment. */
function renderEmphasis(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(
        <Fragment key={`${keyPrefix}-t${last}`}>
          {text.slice(last, match.index)}
        </Fragment>,
      );
    }
    nodes.push(
      match[1] !== undefined ? (
        <strong key={`${keyPrefix}-b${match.index}`}>{match[1]}</strong>
      ) : (
        <em key={`${keyPrefix}-i${match.index}`}>{match[2]}</em>
      ),
    );
    last = pattern.lastIndex;
  }
  if (last < text.length) {
    nodes.push(
      <Fragment key={`${keyPrefix}-t${last}`}>{text.slice(last)}</Fragment>,
    );
  }
  return nodes;
}

/**
 * Renders text with inline math and inline markdown emphasis: anything
 * between $...$ goes through KaTeX in inline mode, and `**bold**` /
 * `*italic*` in the surrounding text become <strong> / <em>.
 * Works in both server and client trees.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\$([^$]+)\$/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 0 ? (
          <Fragment key={i}>{renderEmphasis(part, String(i))}</Fragment>
        ) : (
          <span
            key={i}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(part, {
                displayMode: false,
                throwOnError: false,
              }),
            }}
          />
        ),
      )}
    </>
  );
}
