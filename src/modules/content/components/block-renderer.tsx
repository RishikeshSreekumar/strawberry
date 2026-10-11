import { BookOpen, Info, Lightbulb, PlayCircle, TriangleAlert } from "lucide-react";
import { Fragment } from "react";
import { lessonHeadings, lessonToc, type LessonHeading } from "../lib/headings";
import type { QuestionProgress } from "../lib/question-state";
import type { CalloutBlock, LessonBlock, VideoBlock } from "../schemas/blocks";
import { DataTable } from "./data-table";
import { DisplayMath } from "./display-math";
import { Interactive } from "./interactives";
import { LessonToc } from "./lesson-toc";
import { NumericBlockView } from "./numeric-block";
import { QuizBlockView } from "./quiz-block";
import { RichText } from "./rich-text";
import { StructuredText } from "./structured-text";
import { WorkedExampleBlockView } from "./worked-example-block";

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

function HeadingBlockView({ heading }: { heading: LessonHeading }) {
  const text = <RichText text={heading.text} />;
  // scroll-mt clears the sticky site header (h-14) on anchor jumps.
  return heading.level === 2 ? (
    <h2
      id={heading.id}
      className="scroll-mt-20 pt-4 text-xl font-semibold tracking-tight"
    >
      {text}
    </h2>
  ) : (
    <h3
      id={heading.id}
      className="scroll-mt-20 pt-2 text-lg font-semibold tracking-tight"
    >
      {text}
    </h3>
  );
}

function BlockView({
  block,
  heading,
  lessonId,
  progress,
}: {
  block: LessonBlock;
  /** Resolved id/level for a heading block. */
  heading?: LessonHeading;
  lessonId?: string;
  /** Saved progress for a question block. */
  progress?: QuestionProgress;
}) {
  switch (block.type) {
    case "text":
      return <StructuredText content={block.content} className="leading-7" />;
    case "heading":
      return heading ? <HeadingBlockView heading={heading} /> : null;
    case "math":
      return <DisplayMath latex={block.latex} className="overflow-x-auto py-2" />;
    case "callout": {
      const { frame, icon, Icon } = calloutStyles[block.variant];
      return (
        <div className={`rounded-xl border p-4 ${frame}`}>
          {block.title && (
            <p className="mb-1 flex items-center gap-2 font-semibold">
              <Icon className={`size-4 shrink-0 ${icon}`} aria-hidden />
              <span>
                <RichText text={block.title} />
              </span>
            </p>
          )}
          <StructuredText content={block.content} className="leading-7" />
        </div>
      );
    }
    case "table":
      return <DataTable table={block} />;
    case "video":
      return <VideoBlockView block={block} />;
    case "quiz":
      return <QuizBlockView block={block} lessonId={lessonId} progress={progress} />;
    case "numeric":
      return <NumericBlockView block={block} lessonId={lessonId} progress={progress} />;
    case "worked-example":
      return <WorkedExampleBlockView block={block} />;
    case "interactive":
      return <Interactive config={block.config} />;
  }
}

/**
 * Question cards and worked examples hold state, so they are keyed by id:
 * if republished content inserts or reorders blocks, a card's state never
 * lands on a different question. Other blocks are stateless enough for the
 * index.
 */
function blockKey(block: LessonBlock, i: number): string {
  if (block.type === "quiz" || block.type === "numeric") {
    return block.id ? `${block.type}:${block.id}` : `${block.type}@${i}`;
  }
  if (block.type === "worked-example" && block.id) return `worked-example:${block.id}`;
  return String(i);
}

function questionProgressFor(
  block: LessonBlock,
  byId: Record<string, QuestionProgress> | undefined,
): QuestionProgress | undefined {
  if (!byId || (block.type !== "quiz" && block.type !== "numeric") || !block.id) return undefined;
  return Object.hasOwn(byId, block.id) ? byId[block.id] : undefined;
}

export function BlockRenderer({
  blocks,
  lessonId,
  questionProgress,
}: {
  blocks: LessonBlock[];
  /** When set (student pages), question attempts are recorded for this lesson. */
  lessonId?: string;
  /**
   * The learner's saved progress by question id (student pages), restored
   * into the question cards' initial state. Props only, so the server
   * render and hydration agree.
   */
  questionProgress?: Record<string, QuestionProgress>;
}) {
  const headings = lessonHeadings(blocks);
  const headingAt = new Map(headings.map((h) => [h.index, h]));
  const toc = lessonToc(headings);
  // "On this page" goes after a leading overview video, else at the top.
  const tocAt = toc.length > 0 ? (blocks[0]?.type === "video" ? 1 : 0) : -1;

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <Fragment key={blockKey(block, i)}>
          {i === tocAt && <LessonToc entries={toc} />}
          <BlockView
            block={block}
            heading={headingAt.get(i)}
            lessonId={lessonId}
            progress={questionProgressFor(block, questionProgress)}
          />
        </Fragment>
      ))}
    </div>
  );
}
