import katex from "katex";
import type { CalloutBlock, LessonBlock } from "../schemas/blocks";

const calloutStyles: Record<CalloutBlock["variant"], string> = {
  info: "border-blue-500/40 bg-blue-500/5",
  tip: "border-green-500/40 bg-green-500/5",
  warning: "border-amber-500/40 bg-amber-500/5",
  definition: "border-purple-500/40 bg-purple-500/5",
};

function MathBlockView({ latex }: { latex: string }) {
  const html = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
  });
  return (
    <div
      className="overflow-x-auto py-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function BlockRenderer({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <p key={i} className="leading-7 whitespace-pre-wrap">
                {block.content}
              </p>
            );
          case "math":
            return <MathBlockView key={i} latex={block.latex} />;
          case "callout":
            return (
              <div
                key={i}
                className={`rounded-lg border p-4 ${calloutStyles[block.variant]}`}
              >
                {block.title && (
                  <p className="mb-1 font-semibold">{block.title}</p>
                )}
                <p className="leading-7 whitespace-pre-wrap">{block.content}</p>
              </div>
            );
        }
      })}
    </div>
  );
}
