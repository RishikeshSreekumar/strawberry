import Link from "next/link";
import { db } from "@/db";
import { listCourses } from "@/modules/content/services/content-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCourseAction } from "./actions";

export default async function AdminCoursesPage() {
  const allCourses = await listCourses(db);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Courses</h1>

      <div className="space-y-2">
        {allCourses.length === 0 && (
          <p className="text-muted-foreground">No courses yet.</p>
        )}
        {allCourses.map((course) => (
          <Link
            key={course.id}
            href={`/admin/courses/${course.id}`}
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50"
          >
            <div>
              <p className="font-medium">{course.title}</p>
              <p className="text-sm text-muted-foreground">/{course.slug}</p>
            </div>
            <Badge
              variant={course.status === "published" ? "default" : "secondary"}
              className="capitalize"
            >
              {course.status}
            </Badge>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New course</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCourseAction} className="space-y-3">
            <Input name="title" placeholder="Course title" required />
            <Textarea name="description" placeholder="Short description (optional)" />
            <Button type="submit">Create course</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
