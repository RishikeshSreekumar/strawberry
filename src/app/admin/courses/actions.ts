"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { requireEditor } from "@/modules/auth/session";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "@/modules/content/services/content-service";

export async function createCourseAction(formData: FormData) {
  await requireEditor();
  const input = z
    .object({ title: z.string().min(1), description: z.string().optional() })
    .parse({
      title: formData.get("title"),
      description: formData.get("description") || undefined,
    });
  const course = await createCourse(db, input);
  revalidatePath("/admin/courses");
  redirect(`/admin/courses/${course.id}`);
}

export async function setCourseStatusAction(
  courseId: string,
  status: "draft" | "published" | "archived",
) {
  await requireEditor();
  await db
    .update(courses)
    .set({ status, updatedAt: new Date() })
    .where(eq(courses.id, courseId));
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/courses");
}

export async function createChapterAction(courseId: string, formData: FormData) {
  await requireEditor();
  const input = z
    .object({ title: z.string().min(1), position: z.coerce.number().int() })
    .parse({
      title: formData.get("title"),
      position: formData.get("position") || 0,
    });
  await createChapter(db, { courseId, ...input });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function createLessonAction(
  courseId: string,
  chapterId: string,
  formData: FormData,
) {
  await requireEditor();
  const input = z
    .object({ title: z.string().min(1), position: z.coerce.number().int() })
    .parse({
      title: formData.get("title"),
      position: formData.get("position") || 0,
    });
  await createLesson(db, { chapterId, ...input });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function saveLessonDraftAction(
  lessonId: string,
  blocksJson: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await requireEditor();
  let blocks: unknown;
  try {
    blocks = JSON.parse(blocksJson);
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
  try {
    await saveLessonDraft(db, { lessonId, blocks, userId: user.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, error: z.prettifyError(e) };
    }
    throw e;
  }
  revalidatePath(`/admin/lessons/${lessonId}`);
  return { ok: true };
}

export async function publishLessonVersionAction(
  lessonId: string,
  versionId: string,
) {
  await requireEditor();
  await publishLessonVersion(db, versionId);
  revalidatePath(`/admin/lessons/${lessonId}`);
}
