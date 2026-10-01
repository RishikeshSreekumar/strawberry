import katex from "katex";
import { BookOpen, Info, Lightbulb, PlayCircle, TriangleAlert } from "lucide-react";
import type { CalloutBlock, LessonBlock, VideoBlock } from "../schemas/blocks";
import { Interactive } from "./interactives";
import { QuizBlockView } from "./quiz-block";
import { RichText } from "./rich-text";

const calloutStyles: Record<
  CalloutBlock["variant"],
  { frame: string; icon: string; Icon: typeof Info }
> = {
  info: {
    frame: "border-callout-info/40 bg-callout-info/5",
    icon: "text-callout-info",
    Icon: Info,
  },
  tip: {
    frame: "border-callout-tip/40 bg-callout-tip/5",
    icon: "text-callout-tip",
    Icon: Lightbulb,
  },
  warning: {
    frame: "border-callout-warning/40 bg-callout-warning/5",
    icon: "text-callout-warning",
    Icon: TriangleAlert,
  },
  definition: {
    frame: "border-callout-definition/40 bg-callout-definition/5",
    icon: "text-callout-definition",
    Icon: BookOpen,
  },
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

function VideoBlockView({ block }: { block: VideoBlock }) {
  return (
    <figure className="overflow-hidden rounded-xl border bg-card">
      {block.title && (
        <figcaption className="flex items-center gap-2 border-b px-4 py-2.5 font-semibold">
          <PlayCircle className="size-4 shrink-0 text-primary" aria-hidden />
          {block.title}
        </figcaption>
      )}
      <video
        className="aspect-video w-full bg-muted"
        src={block.src}
        poster={block.poster}
        controls
        playsInline
        preload="metadata"
      />
      {block.caption && (
        <p className="px-4 py-2.5 text-sm text-muted-foreground">
          <RichText text={block.caption} />
        </p>
      )}
    </figure>
  );
}

export function BlockRenderer({
  blocks,
  lessonId,
}: {
  blocks: LessonBlock[];
  /** When set (student pages), quiz attempts are recorded for this lesson. */
  lessonId?: string;
}) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <p key={i} className="leading-7 whitespace-pre-wrap">
                <RichText text={block.content} />
              </p>
            );
          case "math":
            return <MathBlockView key={i} latex={block.latex} />;
          case "callout": {
            const { frame, icon, Icon } = calloutStyles[block.variant];
            return (
              <div key={i} className={`rounded-xl border p-4 ${frame}`}>
                {block.title && (
                  <p className="mb-1 flex items-center gap-2 font-semibold">
                    <Icon className={`size-4 shrink-0 ${icon}`} aria-hidden />
                    <span>
                      <RichText text={block.title} />
                    </span>
                  </p>
                )}
                <p className="leading-7 whitespace-pre-wrap">
                  <RichText text={block.content} />
                </p>
              </div>
            );
          }
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="border-b-2 px-3 py-2 text-left font-semibold"
                        >
                          <RichText text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k} className="border-b px-3 py-2">
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "video":
            return <VideoBlockView key={i} block={block} />;
          case "quiz":
            return <QuizBlockView key={i} block={block} lessonId={lessonId} />;
          case "interactive":
            return <Interactive key={i} config={block.config} />;
        }
      })}
    </div>
  );
}
