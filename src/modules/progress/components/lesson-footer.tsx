"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markLessonCompletedAction } from "../actions";

type Neighbor = { href: string; title: string } | null;

export function LessonFooter({
  lessonId,
  isCompleted,
  prev,
  next,
}: {
  lessonId: string;
  isCompleted: boolean;
  prev: Neighbor;
  next: Neighbor;
}) {
  const [completed, setCompleted] = useState(isCompleted);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function markComplete() {
    startTransition(async () => {
      const result = await markLessonCompletedAction(lessonId);
      if (result.ok) {
        setCompleted(true);
        // Re-render server components (chapter layout) so the sidebar's
        // progress icons pick up the newly completed lesson.
        router.refresh();
      }
    });
  }

  return (
    <footer className="mt-10 space-y-6 border-t pt-6">
      <div className="flex justify-center">
        {completed ? (
          <p className="flex items-center gap-2 text-sm font-medium text-success">
            <CircleCheck className="size-4" aria-hidden />
            Lesson completed
          </p>
        ) : (
          <Button onClick={markComplete} disabled={isPending}>
            {isPending ? "Saving…" : "Mark lesson complete"}
          </Button>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            transitionTypes={["nav-back"]}
            className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Previous
            </p>
            <p className="mt-1 font-medium group-hover:text-primary">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div aria-hidden />
        )}
        {next && (
          <Link
            href={next.href}
            transitionTypes={["nav-forward"]}
            className="group rounded-xl border bg-card p-4 text-right transition-colors hover:border-primary/40"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Next
            </p>
            <p className="mt-1 font-medium group-hover:text-primary">
              {next.title}
            </p>
          </Link>
        )}
      </div>
    </footer>
  );
}
