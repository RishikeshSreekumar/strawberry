import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  label,
  className,
}: {
  /** 0–100. */
  value: number;
  /** Accessible name, e.g. "Course progress". */
  label: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("h-1.5 overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          clamped === 100 ? "bg-success" : "bg-primary",
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
