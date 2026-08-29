import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, inArray, asc } from "drizzle-orm";
import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { listChapters } from "@/modules/content/services/content-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createChapterAction,
  createLessonAction,
  setCourseStatusAction,
} from "../actions";

export default async function AdminCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);
  if (!course) notFound();

  const chapterList = await listChapters(db, course.id);
  const lessonList =
    chapterList.length === 0
      ? []
      : await db
          .select()
          .from(lessons)
          .where(
            inArray(
              lessons.chapterId,
              chapterList.map((c) => c.id),
            ),
          )
          .orderBy(asc(lessons.position), asc(lessons.title));

  const toggleStatus = course.status === "published" ? "draft" : "published";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-sm text-muted-foreground">/{course.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={course.status === "published" ? "default" : "secondary"}
            className="capitalize"
          >
            {course.status}
          </Badge>
          <form
            action={setCourseStatusAction.bind(null, course.id, toggleStatus)}
          >
            <Button
              type="submit"
              variant={course.status === "published" ? "outline" : "default"}
            >
              {course.status === "published" ? "Unpublish" : "Publish course"}
            </Button>
          </form>
        </div>
      </div>

      {chapterList.map((chapter) => (
        <section key={chapter.id} className="space-y-3 rounded-lg border p-4">
          <h2 className="font-semibold">
            {chapter.position}. {chapter.title}
          </h2>
          <ul className="space-y-1">
            {lessonList
              .filter((l) => l.chapterId === chapter.id)
              .map((lesson) => (
                <li key={lesson.id} className="flex items-center gap-2">
                  <Link
                    href={`/admin/lessons/${lesson.id}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {lesson.title}
                  </Link>
                  {lesson.publishedVersionId ? (
                    <Badge>live</Badge>
                  ) : (
                    <Badge variant="secondary">unpublished</Badge>
                  )}
                </li>
              ))}
          </ul>
          <form
            action={createLessonAction.bind(null, course.id, chapter.id)}
            className="flex gap-2"
          >
            <Input name="title" placeholder="New lesson title" required />
            <Input
              name="position"
              type="number"
              placeholder="Pos"
              className="w-20"
            />
            <Button type="submit" variant="outline">
              Add lesson
            </Button>
          </form>
        </section>
      ))}

      <section className="rounded-lg border border-dashed p-4">
        <h2 className="mb-3 font-semibold">New chapter</h2>
        <form
          action={createChapterAction.bind(null, course.id)}
          className="flex gap-2"
        >
          <Input name="title" placeholder="Chapter title" required />
          <Input
            name="position"
            type="number"
            placeholder="Pos"
            className="w-20"
          />
          <Button type="submit" variant="outline">
            Add chapter
          </Button>
        </form>
      </section>
    </div>
  );
}
