/**
 * Chapter and lesson titles are authored with their number baked in
 * ("Chapter 0 · Angles and Ratios", "0.1 · The Unreachable Measurement").
 * Splitting the number off lets the UI show it as a label and give the
 * text itself the room.
 */
export function splitNumberedTitle(title: string): {
  number: string | null;
  text: string;
} {
  const match = /^(?:chapter\s+)?(\d+(?:\.\d+)*)\s*·\s*(.+)$/i.exec(title.trim());
  return match
    ? { number: match[1], text: match[2] }
    : { number: null, text: title };
}

/**
 * Course titles read "Name: tagline" ("Matrices: Grids That Move Space").
 * Splits on the first colon so cards can lead with the name.
 */
export function splitCourseTitle(title: string): {
  name: string;
  tagline: string | null;
} {
  const i = title.indexOf(":");
  if (i <= 0) return { name: title, tagline: null };
  const tagline = title.slice(i + 1).trim();
  return {
    name: title.slice(0, i).trim(),
    // Standalone, the tagline reads as its own line ("from Counting…").
    tagline: tagline ? tagline[0].toUpperCase() + tagline.slice(1) : null,
  };
}
