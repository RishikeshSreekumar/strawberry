import katex from "katex";
import { Fragment } from "react";

/**
 * Renders plain text with inline math: anything between $...$ goes
 * through KaTeX in inline mode. Works in both server and client trees.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\$([^$]+)\$/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 0 ? (
          <Fragment key={i}>{part}</Fragment>
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
