export default function CourseLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl animate-pulse space-y-8">
      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-10 w-2/3 rounded bg-muted" />
        <div className="h-5 w-1/2 rounded bg-muted" />
        <div className="h-2 w-full max-w-xs rounded-full bg-muted" />
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="space-y-3 rounded-xl border p-5">
          <div className="h-6 w-1/3 rounded bg-muted" />
          <div className="h-5 w-1/2 rounded bg-muted" />
          <div className="h-5 w-2/5 rounded bg-muted" />
          <div className="h-5 w-1/2 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
