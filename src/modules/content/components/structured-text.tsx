import {
  parseTextStructure,
  type TextList,
  type TextNode,
} from "../lib/text-structure";
import { RichText } from "./rich-text";

function ListView({ list }: { list: TextList }) {
  const items = list.items.map((item, i) => (
    <li key={i} className="pl-1 whitespace-pre-wrap">
      <RichText text={item.text} />
      {item.children.map((child, j) => (
        <ListView key={j} list={child} />
      ))}
    </li>
  ));
  return list.ordered ? (
    <ol
      start={list.start === 1 ? undefined : list.start}
      className="list-decimal space-y-1 pl-6 marker:text-muted-foreground"
    >
      {items}
    </ol>
  ) : (
    <ul className="list-disc space-y-1 pl-6 marker:text-muted-foreground">
      {items}
    </ul>
  );
}

function NodeView({ node }: { node: TextNode }) {
  if (node.kind === "list") return <ListView list={node} />;
  return (
    <p className="whitespace-pre-wrap">
      <RichText text={node.text} />
    </p>
  );
}

/**
 * Text/callout content as paragraphs and lists (see lib/text-structure.ts),
 * each run through RichText. Newlines inside a paragraph or list item still
 * break lines. A single paragraph renders as one <p>, exactly as before.
 */
export function StructuredText({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const nodes = parseTextStructure(content);
  if (nodes.length === 1 && nodes[0].kind === "paragraph") {
    return (
      <p className={`${className} whitespace-pre-wrap`}>
        <RichText text={nodes[0].text} />
      </p>
    );
  }
  return (
    <div className={`${className} space-y-4`}>
      {nodes.map((node, i) => (
        <NodeView key={i} node={node} />
      ))}
    </div>
  );
}
