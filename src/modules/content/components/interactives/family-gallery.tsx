"use client";

import { useState } from "react";
import type { z } from "zod";
import type { familyGallerySchema } from "../../schemas/blocks";
import { FunctionPlot } from "./function-plot";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof familyGallerySchema>;

export function FamilyGallery({ config }: { config: Config }) {
  const [index, setIndex] = useState(0);
  const family = config.families[index];

  return (
    <InteractiveFrame title="Function families">
      <div className="flex flex-wrap gap-2">
        {config.families.map((f, i) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
              i === index
                ? "border-plot bg-plot/10 text-plot"
                : "bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <FunctionPlot
        window={config.window}
        curves={[
          {
            expr: family.expr,
            excluded: family.excluded,
            xmin: family.xminOverride,
          },
        ]}
      />
      <div className="text-center">
        <Latex latex={`f(x) = ${family.latex}`} display />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        No need to memorize these — just make sure none of them is a stranger
        when it shows up later.
      </p>
    </InteractiveFrame>
  );
}
