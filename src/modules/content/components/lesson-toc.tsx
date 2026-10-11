import type { LessonHeading } from "../lib/headings";
import { RichText } from "./rich-text";

/**
 * "On this page" list of the lesson's level-2 headings. Plain anchor links,
 * so it works without JavaScript; the headings carry scroll-margin to clear
 * the sticky header.
 */
export function LessonToc({ entries }: { entries: LessonHeading[] }) {
  return (
    <nav aria-label="On this page" className="font-sans text-sm">
      <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      <ol className="space-y-1 border-l pl-3">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="leading-snug text-muted-foreground transition-colors hover:text-primary"
            >
              <RichText text={entry.text} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
