'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonViewerProps {
  data: unknown;
  /** Initial expansion depth (0 = all collapsed, 1 = top-level expanded) */
  initialDepth?: number;
  label?: string;
}

function JsonNode({
  value,
  depth,
  maxDepth,
}: {
  value: unknown;
  depth: number;
  maxDepth: number;
}) {
  const [expanded, setExpanded] = useState(depth < maxDepth);

  if (value === null) return <span className="text-slate-500 font-mono text-xs">null</span>;
  if (value === undefined) return <span className="text-slate-600 font-mono text-xs">undefined</span>;
  if (typeof value === 'boolean')
    return <span className={`font-mono text-xs ${value ? 'text-emerald-400' : 'text-red-400'}`}>{String(value)}</span>;
  if (typeof value === 'number')
    return <span className="text-orange-300 font-mono text-xs">{value}</span>;
  if (typeof value === 'string')
    return <span className="text-teal-300 font-mono text-xs">"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-500 font-mono text-xs">[]</span>;
    return (
      <span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-0.5 text-slate-400 hover:text-orange-400 transition-colors"
        >
          {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          <span className="font-mono text-xs text-slate-500">[{value.length}]</span>
        </button>
        {expanded && (
          <div className="pl-4 border-l border-white/[0.06] mt-0.5 space-y-0.5">
            {value.map((item, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-slate-600 font-mono text-[10px] pt-0.5">{i}:</span>
                <JsonNode value={item} depth={depth + 1} maxDepth={maxDepth} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-slate-500 font-mono text-xs">{'{}'}</span>;
    return (
      <span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-0.5 text-slate-400 hover:text-orange-400 transition-colors"
        >
          {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          <span className="font-mono text-xs text-slate-500">{'{'}…{'}'}</span>
        </button>
        {expanded && (
          <div className="pl-4 border-l border-white/[0.06] mt-0.5 space-y-0.5">
            {entries.map(([key, val]) => (
              <div key={key} className="flex items-start gap-1.5 flex-wrap">
                <span className="text-slate-400 font-mono text-[11px] pt-0.5 flex-shrink-0">{key}:</span>
                <JsonNode value={val} depth={depth + 1} maxDepth={maxDepth} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  return <span className="text-slate-300 font-mono text-xs">{String(value)}</span>;
}

/**
 * Collapsible, syntax-highlighted JSON viewer for research payloads and artifacts.
 * Uses depth-based auto-expansion. All values are safe-rendered (no eval).
 */
export function JsonViewer({ data, initialDepth = 1, label }: JsonViewerProps) {
  return (
    <div className="rounded-lg bg-surface-2 border border-white/[0.07] p-3 overflow-x-auto">
      {label && (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">{label}</p>
      )}
      <JsonNode value={data} depth={0} maxDepth={initialDepth} />
    </div>
  );
}
