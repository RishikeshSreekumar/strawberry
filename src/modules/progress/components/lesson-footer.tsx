"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLessonProgressState, type LessonProgressState } from "../lesson-progress-context";

type Neighbor = { href: string; title: string } | null;

/**
 * Score strip, completion status and prev/next links. Completion and score
 * come from LessonProgressProvider (the lesson page wraps the footer in it).
 * The manual button stays for lessons without questions and as an
 * override; lessons with questions also complete themselves.
 */
export function LessonFooter({
  prev,
  next,
  courseHref,
}: {
  prev: Neighbor;
  next: Neighbor;
  /** Shown in place of "Next" on the course's last lesson. */
  courseHref: string;
}) {
  const progress = useLessonProgressState();

  return (
    <footer className="mt-12 space-y-6 border-t pt-8">
      {progress && <CompletionSection progress={progress} />}
      <nav aria-label="Lesson navigation" className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            transitionTypes={["nav-back"]}
            className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <ArrowLeft
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5 group-hover:text-primary"
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">Previous</span>
              <span className="block font-medium leading-snug group-hover:text-primary">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div aria-hidden className="hidden sm:block" />
        )}
        <Link
          href={next?.href ?? courseHref}
          transitionTypes={[next ? "nav-forward" : "nav-back"]}
          className="group flex items-center justify-end gap-3 rounded-xl border border-primary/30 bg-accent/40 p-4 text-right transition-colors hover:border-primary/60 hover:bg-accent/70"
        >
          <span className="min-w-0">
            <span className="block text-xs text-primary">
              {next ? "Next lesson" : "You've reached the end"}
            </span>
            <span className="block font-medium leading-snug">
              {next ? next.title : "Back to course overview"}
            </span>
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </nav>
    </footer>
  );
}

function CompletionSection({
  progress: { score, completed, completing, saveFailed, completeLesson },
}: {
  progress: LessonProgressState;
}) {
  const completedRef = useRef<HTMLParagraphElement>(null);
  const clicked = useRef(false);
  // The button unmounts on completion. After a manual click, if focus was
  // lost with it (still on the body), hand it to the "Lesson completed"
  // status. Automatic completion never moves focus.
  useEffect(() => {
    if (!completed || !clicked.current) return;
    clicked.current = false;
    const active = document.activeElement;
    if (!active || active === document.body) {
      completedRef.current?.focus({ preventScroll: true });
    }
  }, [completed]);
  // A failed manual save leaves the button in place: forget the click so a
  // later automatic completion doesn't move focus.
  useEffect(() => {
    if (saveFailed) clicked.current = false;
  }, [saveFailed]);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {score.total > 0 && (
        <p aria-live="polite" className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground tabular-nums">
            {score.correct} of {score.total}
          </span>{" "}
          {score.total === 1 ? "question" : "questions"} answered correctly
          {score.masteryTotal > 0 && (
            <>
              <span aria-hidden className="mx-2">
                ·
              </span>
              <span
                className={`font-medium tabular-nums ${
                  score.masteryCorrect === score.masteryTotal ? "text-success" : "text-primary"
                }`}
              >
                Mastery: {score.masteryCorrect}/{score.masteryTotal}
              </span>
            </>
          )}
        </p>
      )}
      {!completed && score.total > 0 && (
        <p className="text-xs text-muted-foreground">
          {score.masteryTotal > 0
            ? "Answer every mastery check correctly to complete this lesson."
            : "Answer every question correctly to complete this lesson."}
        </p>
      )}
      <div aria-live="polite">
        {completed && (
          <p
            ref={completedRef}
            tabIndex={-1}
            className="flex items-center gap-2 text-sm font-medium text-success outline-none"
          >
            <CircleCheck className="size-4" aria-hidden />
            Lesson completed
          </p>
        )}
        {!completed && saveFailed && (
          <p className="text-sm text-destructive">
            Couldn&apos;t save your progress. Use the button to try again.
          </p>
        )}
      </div>
      {!completed && (
        <Button
          // aria-disabled rather than disabled while saving: a disabled
          // button drops keyboard focus.
          aria-disabled={completing || undefined}
          onClick={() => {
            if (completing) return;
            clicked.current = true;
            completeLesson();
          }}
        >
          {completing ? "Saving…" : "Mark lesson complete"}
        </Button>
      )}
    </div>
  );
}
