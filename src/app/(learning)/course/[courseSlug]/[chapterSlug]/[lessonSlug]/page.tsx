import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { getPublishedLesson } from "@/modules/content/services/content-service";
import { BlockRenderer } from "@/modules/content/components/block-renderer";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    lessonSlug: string;
  }>;
}) {
  const { courseSlug, chapterSlug, lessonSlug } = await params;
  const result = await getPublishedLesson(db, {
    courseSlug,
    chapterSlug,
    lessonSlug,
  });
  if (!result) notFound();

  return (
    <article className="space-y-6">
      <div>
        <Link
          href={`/course/${result.course.slug}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {result.course.title}
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{result.lesson.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {result.chapter.title}
        </p>
      </div>
      <BlockRenderer blocks={result.blocks} />
    </article>
  );
}
