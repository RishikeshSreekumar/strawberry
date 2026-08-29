import { ViewTransition } from "react";
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
import { Breadcrumbs } from "@/components/breadcrumbs";

export default async function CoursesPage() {
  const published = await db
    .select()
    .from(courses)
    .where(eq(courses.status, "published"));

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="space-y-3">
          <Breadcrumbs items={[{ label: "Courses" }]} />
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        </div>
        {published.length === 0 ? (
          <p className="text-muted-foreground">
            No courses published yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {published.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                transitionTypes={["nav-forward"]}
              >
                <Card className="h-full transition-all hover:border-primary/40 hover:bg-accent/30 hover:shadow-sm">
                  <CardHeader>
                    <ViewTransition
                      name={`course-${course.slug}`}
                      share="morph"
                      default="none"
                    >
                      <CardTitle>{course.title}</CardTitle>
                    </ViewTransition>
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
    </ViewTransition>
  );
}
