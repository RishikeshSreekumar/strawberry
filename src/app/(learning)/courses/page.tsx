import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { courses } from "@/db/schema";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function CoursesPage() {
  const published = await db
    .select()
    .from(courses)
    .where(eq(courses.status, "published"));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses</h1>
      {published.length === 0 ? (
        <p className="text-muted-foreground">
          No courses published yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {published.map((course) => (
            <Link key={course.id} href={`/course/${course.slug}`}>
              <Card className="h-full transition-colors hover:bg-accent/50">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  {course.description && (
                    <CardDescription>{course.description}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
