"use client";

import { PencilLine } from "lucide-react";
import { useId, useRef, useState } from "react";
import { parseTextStructure } from "../lib/text-structure";
import { nextShown, primaryReveal } from "../lib/worked-example-reveal";
import type { WorkedExampleBlock, WorkedExampleStep } from "../schemas/blocks";
import { DataTable } from "./data-table";
import { DisplayMath } from "./display-math";
import { RichText } from "./rich-text";
import { StructuredText } from "./structured-text";

/**
 * One step's content, in the order text, table, latex. The screen-reader "Step N:" prefix sits inside the
 * step's opening paragraph when there is one, so it is read together with
 * the text rather than as a separate fragment.
 */
function StepBody({ step, n }: { step: WorkedExampleStep; n: number }) {
  const prefix = <span className="sr-only">{`Step ${n}: `}</span>;
  const nodes = step.text ? parseTextStructure(step.text) : [];
  const single = nodes.length === 1 && nodes[0].kind === "paragraph" ? nodes[0] : null;
  return (
    <div className="min-w-0 flex-1 space-y-1">
      {single ? (
        <p className="leading-7 whitespace-pre-wrap">
          {prefix}
          <RichText text={single.text} />
        </p>
      ) : (
        <>
          {prefix}
          {step.text && <StructuredText content={step.text} className="leading-7" />}
        </>
      )}
      {step.table && <DataTable table={step.table} />}
      {step.latex && <DisplayMath latex={step.latex} className="overflow-x-auto py-1" />}
    </div>
  );
}

/**
 * A worked example: the problem, then its steps. With `tryFirst` (the
 * default) the steps start hidden and are revealed one at a time; hidden
 * steps and the answer stay in the DOM (display: none) and are always shown
 * when printed. Without JavaScript the reveal buttons are inert, as for
 * quizzes.
 */
export function WorkedExampleBlockView({ block }: { block: WorkedExampleBlock }) {
  const total = block.steps.length;
  const tryFirst = block.tryFirst ?? true;
  // Steps revealed so far. Only meaningful with tryFirst; without it every
  // step is always visible.
  const [shown, setShown] = useState(0);
  const visible = tryFirst ? shown : total;
  const primaryRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const stepsId = `${baseId}-steps`;
  const answerId = `${baseId}-answer`;
  const controls = block.answer ? `${stepsId} ${answerId}` : stepsId;

  const allShown = visible >= total;
  const primary = primaryReveal(visible, total);

  function onShowAll() {
    setShown(nextShown(shown, total, "all"));
    // "Show all" disappears once everything is shown; keep focus on the
    // remaining control instead of dropping it to <body>.
    primaryRef.current?.focus();
  }

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="space-y-3 rounded-xl border bg-card p-4 shadow-xs"
    >
      <p id={labelId} className="flex items-center gap-2">
        <PencilLine className="size-4 shrink-0 text-primary" aria-hidden />
        <span className="text-xs font-semibold tracking-wide text-primary uppercase">
          Worked example
        </span>
        {block.title && (
          <>
            <span className="sr-only">: </span>
            <span className="font-semibold">
              <RichText text={block.title} />
            </span>
          </>
        )}
      </p>

      <StructuredText content={block.problem} className="leading-7 font-medium" />
      {block.problemTable && <DataTable table={block.problemTable} />}

      {tryFirst && visible === 0 && (
        <p className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground print:hidden">
          <span className="font-semibold text-foreground">Try it yourself first.</span>{" "}
          Work it out on paper, then reveal the solution one step at a time.
        </p>
      )}

      <ol
        id={stepsId}
        role="list"
        aria-live="polite"
        aria-label="Solution steps"
        className="space-y-3"
      >
        {block.steps.map((step, i) => (
          <li
            key={i}
            className={`${i < visible ? "flex" : "hidden print:flex"} gap-3 border-t pt-3`}
          >
            <span
              aria-hidden
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
            >
              {i + 1}
            </span>
            <StepBody step={step} n={i + 1} />
          </li>
        ))}
      </ol>

      {block.answer && (
        // The live region is always displayed; only its content toggles, so
        // screen readers announce the answer when it appears.
        <div id={answerId} aria-live="polite">
          <div
            className={`${allShown ? "block" : "hidden print:block"} rounded-lg border border-success/40 bg-success/5 px-3 py-2`}
          >
            <p className="text-xs font-semibold tracking-wide text-success uppercase">Answer</p>
            <StructuredText content={block.answer} className="leading-7" />
          </div>
        </div>
      )}

      {tryFirst && (
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            ref={primaryRef}
            type="button"
            onClick={() => setShown(nextShown(shown, total, primary.action))}
            aria-controls={controls}
            className="rounded-md border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {primary.label}
          </button>
          {!allShown && total > 1 && (
            <button
              type="button"
              onClick={onShowAll}
              aria-controls={controls}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Show all
            </button>
          )}
          {total > 1 && (
            <span className="ml-auto text-xs text-muted-foreground">
              {`${visible} of ${total} steps shown`}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
