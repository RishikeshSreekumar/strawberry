import katex from "katex";

/**
 * LaTeX rendered by KaTeX in display mode, scrolling sideways when wide.
 * KaTeX's string output is deterministic, so this is safe in both server
 * and client trees (no hydration mismatch).
 */
export function DisplayMath({
  latex,
  className = "overflow-x-auto py-2",
}: {
  latex: string;
  className?: string;
}) {
  const html = katex.renderToString(latex, { displayMode: true, throwOnError: false });
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
