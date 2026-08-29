"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveLessonDraftAction } from "../../courses/actions";

export function DraftEditor({
  lessonId,
  initialJson,
}: {
  lessonId: string;
  initialJson: string;
}) {
  const [json, setJson] = useState(initialJson);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <section className="space-y-3">
      <h2 className="font-semibold">Draft content (block JSON)</h2>
      <Textarea
        value={json}
        onChange={(e) => {
          setJson(e.target.value);
          setSaved(false);
        }}
        rows={18}
        className="font-mono text-sm"
        spellCheck={false}
      />
      {error && (
        <pre className="rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm whitespace-pre-wrap text-destructive">
          {error}
        </pre>
      )}
      {saved && <p className="text-sm text-green-600">Draft saved.</p>}
      <Button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            setSaved(false);
            const result = await saveLessonDraftAction(lessonId, json);
            if (result.ok) setSaved(true);
            else setError(result.error);
          })
        }
      >
        {isPending ? "Saving…" : "Save draft"}
      </Button>
    </section>
  );
}
