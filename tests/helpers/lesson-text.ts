import { mathSpans } from "@/modules/content/components/rich-text";
import type { LessonBlock, TableData } from "@/modules/content/schemas/blocks";

/**
 * Text collectors shared by the content lint tests. The switches are
 * exhaustive: adding a block type without deciding what text it renders
 * fails to type-check here.
 */

function assertNever(block: never): never {
  throw new Error(`unhandled block type: ${JSON.stringify(block)}`);
}

const opt = (s: string | undefined): string[] => (s === undefined ? [] : [s]);

/** Header and body cells of an optional table (each cell is RichText). */
const tableCells = (t: TableData | undefined): string[] =>
  t === undefined ? [] : [...t.headers, ...t.rows.flat()];

/**
 * Every string the BlockRenderer passes through RichText / StructuredText,
 * including interactive captions.
 */
export function richTextStrings(blocks: LessonBlock[]): string[] {
  return blocks.flatMap((block): string[] => {
    switch (block.type) {
      case "text":
        return [block.content];
      case "heading":
        return [block.text];
      case "callout":
        return [block.content, ...opt(block.title)];
      case "table":
        return tableCells(block);
      case "video":
        return opt(block.caption);
      case "quiz":
        return [
          block.question,
          ...opt(block.hint),
          ...block.options.flatMap((o) => [o.text, ...opt(o.feedback)]),
        ];
      case "numeric":
        return [
          block.question,
          ...opt(block.unit),
          ...opt(block.hint),
          ...opt(block.solution),
          ...(block.commonMistakes ?? []).map((m) => m.feedback),
        ];
      case "worked-example":
        return [
          block.problem,
          ...opt(block.title),
          ...opt(block.answer),
          ...tableCells(block.problemTable),
          ...block.steps.flatMap((s) => [...opt(s.text), ...tableCells(s.table)]),
        ];
      case "interactive":
        // Every interactive renders its caption (author-supplied or default)
        // through RichText; its other strings are plain text or raw LaTeX.
        return "caption" in block.config ? opt(block.config.caption) : [];
      case "math":
        return [];
      default:
        return assertNever(block);
    }
  });
}

/**
 * Raw LaTeX the BlockRenderer hands straight to KaTeX in display mode
 * (outside RichText): math blocks and worked-example step `latex`.
 */
export function displayLatexStrings(blocks: LessonBlock[]): string[] {
  return blocks.flatMap((block) => {
    if (block.type === "math") return [block.latex];
    if (block.type === "worked-example") return block.steps.flatMap((s) => opt(s.latex));
    return [];
  });
}

/** Every LaTeX source in the blocks: rich-text math spans plus display LaTeX. */
export function allLatex(blocks: LessonBlock[]): { latex: string; display: boolean }[] {
  return [
    ...richTextStrings(blocks).flatMap((t) => mathSpans(t)),
    ...displayLatexStrings(blocks).map((latex) => ({ latex, display: true })),
  ];
}

/**
 * Every string value anywhere in the blocks, including interactive configs
 * (labels, captions, exprLatex, ...) and video paths.
 */
export function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(allStrings);
  return [];
}

/**
 * Interactive config strings other than the caption: labels, names, expr,
 * exprLatex, ... These render as plain text, SVG text or raw KaTeX input,
 * never through RichText, so a `$...$` in them would show literally.
 */
export function interactiveNonCaptionStrings(blocks: LessonBlock[]): string[] {
  return blocks.flatMap((block) =>
    block.type === "interactive"
      ? Object.entries(block.config).flatMap(([key, value]) =>
          key === "caption" ? [] : allStrings(value),
        )
      : [],
  );
}

/**
 * A single backslash before f, t, v, b or r in a TS string ("\frac",
 * "\times", "\beta", "\rho", "\vec") silently becomes a control character
 * instead of reaching KaTeX; KaTeX's throwOnError does not catch it.
 */
export const CONTROL_CHARS = /[\t\f\v\b\r]/;

/**
 * "\;" written with one backslash in TS reaches KaTeX as a bare ";", which
 * KaTeX renders as a literal semicolon without complaint. Returns true when
 * `latex` has a semicolon that isn't part of a "\;" spacing command.
 */
export function hasBareSemicolon(latex: string): boolean {
  return latex.replace(/\\;/g, "").includes(";");
}
