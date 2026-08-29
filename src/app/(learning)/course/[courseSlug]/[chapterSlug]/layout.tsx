import { notFound } from "next/navigation";
import { db } from "@/db";
import { requireUser } from "@/modules/auth/session";
import {
  getCourseBySlug,
  getCourseOutline,
} from "@/modules/content/services/content-service";
import { getCourseProgress } from "@/modules/progress/services/progress-service";
import { CourseSidebar } from "@/modules/content/components/course-sidebar";

// The sidebar lives in this layout (not the lesson page) so it is fetched
// once and its DOM persists across lesson-to-lesson navigation.
export default async function ChapterLayout({
  children,
  params,
}: LayoutProps<"/course/[courseSlug]/[chapterSlug]">) {
  const { courseSlug } = await params;
  const user = await requireUser();
  const course = await getCourseBySlug(db, courseSlug);
  if (!course || course.status !== "published") notFound();

  const [outline, progress] = await Promise.all([
    getCourseOutline(db, course.id),
    getCourseProgress(db, { userId: user.id, courseId: course.id }),
  ]);

  return (
    <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-4">
          <CourseSidebar
            outline={outline}
            courseSlug={courseSlug}
            courseTitle={course.title}
            progressEntries={progress.map((p) => [p.lessonId, p.status])}
          />
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
