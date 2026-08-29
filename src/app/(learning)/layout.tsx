import Link from "next/link";
import { requireUser } from "@/modules/auth/session";
import { SignOutButton } from "@/app/pending/sign-out-button";
import { StrawberryLogo } from "@/components/logo";

export default async function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const isStaff = user.role === "admin" || user.role === "editor";

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header
        className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur"
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <Link
            href="/courses"
            className="flex items-center gap-2 font-semibold tracking-tight text-primary"
          >
            <StrawberryLogo className="size-5" />
            Strawberry
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {isStaff && (
              <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                Admin
              </Link>
            )}
            <span className="hidden text-muted-foreground sm:inline">
              {user.name}
            </span>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
