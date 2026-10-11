/**
 * Block-level structure for text and callout content: paragraphs and
 * markdown-style lists. Inline formatting ($math$, **bold**, *italic*) is
 * left in the strings for RichText.
 *
 * Rules:
 * - A blank line ends the current paragraph or list.
 * - A line starting "- ", "* " or "• " is an unordered item; "1. " or "1) "
 *   (1-3 digits) is an ordered item. The marker must be followed by
 *   whitespace and then text, so "**bold**", "*italic*", "-3 < x" and "0.5"
 *   never start a list.
 * - Consecutive items of the same kind form one list; an ordered list starts
 *   at its first item's number.
 * - Inside a list, a line indented 2+ spaces deeper than the list's first
 *   item continues the previous item (a new line within it), or, if it is
 *   itself an item, starts a nested list. Only one level of nesting exists:
 *   deeper indents collapse into it.
 * - Any other line belongs to a paragraph. Single newlines inside a
 *   paragraph are kept (the renderer shows them as line breaks).
 */

export type ListItem = { text: string; children: TextList[] };

export type TextList = {
  kind: "list";
  ordered: boolean;
  /** Number of the first item (ordered lists only; 1 otherwise). */
  start: number;
  items: ListItem[];
};

export type TextParagraph = { kind: "paragraph"; text: string };

export type TextNode = TextParagraph | TextList;

const ITEM = /^([ \t]*)(?:([-*•])|(\d{1,3})[.)])[ \t]+(\S.*)$/;
const NESTED_INDENT = 2;

type ItemMatch = { indent: number; ordered: boolean; number: number; text: string };

function matchItem(line: string): ItemMatch | null {
  const m = ITEM.exec(line);
  if (!m) return null;
  return {
    indent: m[1].length,
    ordered: m[3] !== undefined,
    number: m[3] !== undefined ? Number(m[3]) : 1,
    text: m[4],
  };
}

function indentOf(line: string): number {
  return line.length - line.trimStart().length;
}

function newList(item: ItemMatch): TextList {
  return {
    kind: "list",
    ordered: item.ordered,
    start: item.number,
    items: [{ text: item.text, children: [] }],
  };
}

/** Adds an item to `lists`' last list if the kind matches, else opens a new list. */
function pushItem(lists: TextList[], item: ItemMatch) {
  const last = lists.at(-1);
  if (last && last.ordered === item.ordered) {
    last.items.push({ text: item.text, children: [] });
  } else {
    lists.push(newList(item));
  }
}

function lastItem(list: TextList): ListItem {
  const item = list.items[list.items.length - 1];
  const nested = item.children.at(-1);
  return nested ? lastItem(nested) : item;
}

export function parseTextStructure(content: string): TextNode[] {
  const nodes: TextNode[] = [];
  /** The node being built: paragraph lines or a list. */
  let open: { paragraph: string[] } | { list: TextList; indent: number } | null = null;

  const close = () => {
    if (open && "paragraph" in open) nodes.push({ kind: "paragraph", text: open.paragraph.join("\n") });
    if (open && "list" in open) nodes.push(open.list);
    open = null;
  };

  for (const line of content.split("\n")) {
    const current = open;
    if (line.trim() === "") {
      close();
      continue;
    }
    const item = matchItem(line);

    if (current && "list" in current && indentOf(line) >= current.indent + NESTED_INDENT) {
      const { items } = current.list;
      if (item) pushItem(items[items.length - 1].children, item);
      else lastItem(current.list).text += `\n${line.trim()}`;
      continue;
    }

    if (item) {
      if (current && "list" in current && current.list.ordered === item.ordered) {
        current.list.items.push({ text: item.text, children: [] });
      } else {
        close();
        open = { list: newList(item), indent: item.indent };
      }
      continue;
    }

    if (current && "paragraph" in current) {
      current.paragraph.push(line);
    } else {
      close();
      open = { paragraph: [line] };
    }
  }
  close();
  return nodes;
}
