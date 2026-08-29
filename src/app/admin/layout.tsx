import Link from "next/link";
import { requireEditor } from "@/modules/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireEditor();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold">
              🍓 Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/admin/courses"
                className="text-muted-foreground hover:text-foreground"
              >
                Courses
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin/users"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Users
                </Link>
              )}
            </nav>
          </div>
          <Link
            href="/courses"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to app
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
