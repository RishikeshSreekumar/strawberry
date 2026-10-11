import type { TableData } from "../schemas/blocks";
import { RichText } from "./rich-text";

/**
 * Headers + rows with rich-text cells, scrolling sideways on narrow
 * screens. Used by the table block and by worked-example problem/step
 * tables. Works in both server and client trees.
 */
export function DataTable({ table }: { table: TableData }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {table.headers.map((h, j) => (
              <th key={j} className="border-b-2 px-3 py-2 text-left font-semibold">
                <RichText text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, j) => (
            <tr key={j}>
              {row.map((cell, k) => (
                <td key={k} className="border-b px-3 py-2">
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
