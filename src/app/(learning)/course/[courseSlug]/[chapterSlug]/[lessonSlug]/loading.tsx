export default function LessonLoading() {
  // The course sidebar is rendered by the chapter layout and stays visible
  // while lesson content loads; only skeleton the article area.
  return (
    <div className="mx-auto w-full max-w-[38.25rem] animate-pulse space-y-6">
      <div className="space-y-3">
        <div className="h-4 w-64 rounded bg-muted" />
        <div className="h-9 w-2/3 rounded bg-muted" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-5 w-full rounded bg-muted" />
      ))}
      <div className="h-48 w-full rounded-xl bg-muted" />
    </div>
  );
}
