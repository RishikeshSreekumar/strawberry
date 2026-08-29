"use client";

import katex from "katex";
import { useId } from "react";

export function Latex({
  latex,
  display = false,
  className,
}: {
  latex: string;
  display?: boolean;
  className?: string;
}) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(latex, {
          displayMode: display,
          throwOnError: false,
        }),
      }}
    />
  );
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit,
}: {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="w-16 shrink-0 text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-plot"
      />
      <span className="w-20 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
        {value}
        {unit ? ` ${unit}` : ""}
      </span>
    </div>
  );
}

export function InteractiveFrame({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
