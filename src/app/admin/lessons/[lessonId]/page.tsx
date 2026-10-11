import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { chapters, lessons } from "@/db/schema";
import { listLessonVersions } from "@/modules/content/services/content-service";
import { Badge } from "@/components/ui/badge";
import { DraftEditor } from "./draft-editor";
import { publishLessonVersionAction } from "../../courses/actions";
import { Button } from "@/components/ui/button";

const EXAMPLE_BLOCKS = [
  { type: "text", content: "Write your lesson here." },
  { type: "heading", text: "A section heading" },
  { type: "math", latex: "\\frac{d}{dx} x^2 = 2x" },
  { type: "callout", variant: "tip", content: "You can mix blocks freely." },
  {
    type: "worked-example",
    title: "Worked example 1",
    problem: "Differentiate $f(x) = 3x^2 + 5x$.",
    steps: [
      { text: "Differentiate term by term with the power rule.", latex: "\\frac{d}{dx}(3x^2) = 6x, \\quad \\frac{d}{dx}(5x) = 5" },
      { text: "Add the pieces." },
    ],
    answer: "$f'(x) = 6x + 5$",
  },
  {
    type: "quiz",
    id: "example-q1",
    variant: "practice",
    question: "What is $\\frac{d}{dx} x^3$?",
    options: [
      { text: "$3x^2$", correct: true, feedback: "Power rule: bring down the 3." },
      { text: "$x^2$", feedback: "Don't forget the coefficient." },
      { text: "$3x^3$", feedback: "The exponent drops by one." },
    ],
  },
  {
    type: "quiz",
    id: "example-q2",
    variant: "concept",
    multiple: true,
    question: "Which functions are differentiable at $x = 0$?",
    options: [
      { text: "$x^2$", correct: true },
      { text: "$|x|$", feedback: "It has a corner at $0$." },
      { text: "$\\sin x$", correct: true },
      { text: "$\\sqrt[3]{x}$", feedback: "Its tangent is vertical at $0$." },
    ],
  },
  {
    type: "numeric",
    id: "example-q3",
    variant: "practice",
    question: "A ball is dropped from rest. How far does it fall in $2\\,\\text{s}$? Take $g = 9.8\\,\\text{m/s}^2$.",
    answer: 19.6,
    tolerance: 0.1,
    unit: "m",
    hint: "Use $s = \\tfrac{1}{2} g t^2$.",
    commonMistakes: [
      { answer: 9.8, feedback: "That's $\\tfrac{1}{2} g t$; time must be squared." },
      { answer: 39.2, feedback: "You dropped the $\\tfrac{1}{2}$." },
    ],
    solution: "$s = \\tfrac{1}{2} g t^2 = \\tfrac{1}{2}(9.8)(2)^2 = 19.6\\,\\text{m}$.",
  },
];

export default async function AdminLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const [lesson] = await db
    .select()
    .from(lessons)
    .where(eq(lessons.id, lessonId))
    .limit(1);
  if (!lesson) notFound();

  const [chapter] = await db
    .select()
    .from(chapters)
    .where(eq(chapters.id, lesson.chapterId))
    .limit(1);

  const versions = await listLessonVersions(db, lesson.id);
  const latest = versions[0];
  const draftBlocks =
    latest?.status === "draft" ? latest.blocks : (latest?.blocks ?? EXAMPLE_BLOCKS);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/admin/courses/${chapter.courseId}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to course
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
        <p className="text-sm text-muted-foreground">{chapter.title}</p>
      </div>

      <DraftEditor
        lessonId={lesson.id}
        initialJson={JSON.stringify(draftBlocks, null, 2)}
      />

      <section className="space-y-2">
        <h2 className="font-semibold">Versions</h2>
        {versions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No versions yet — save a draft first.
          </p>
        )}
        <ul className="space-y-2">
          {versions.map((v) => (
            <li
              key={v.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">v{v.version}</span>
                <Badge
                  variant={v.status === "published" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {v.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {v.createdAt.toLocaleString()}
                </span>
              </div>
              {v.status === "draft" && (
                <form
                  action={publishLessonVersionAction.bind(null, lesson.id, v.id)}
                >
                  <Button type="submit" size="sm">
                    Publish
                  </Button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
