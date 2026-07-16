'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ArtifactHashProps {
  hash: string;
  label?: string;
  /** Number of characters to show before truncating */
  visibleChars?: number;
}

/**
 * Displays an artifact hash truncated with a copy-to-clipboard button.
 * Full hash visible on hover via title attribute.
 */
export function ArtifactHash({ hash, label, visibleChars = 12 }: ArtifactHashProps) {
  const [copied, setCopied] = useState(false);

  const truncated = hash.length > visibleChars
    ? `${hash.slice(0, visibleChars)}…`
    : hash;

  async function copyHash() {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <span className="inline-flex items-center gap-1.5 group">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {label}:
        </span>
      )}
      <code
        className="text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] rounded px-1.5 py-0.5 cursor-default"
        title={hash}
      >
        {truncated}
      </code>
      <button
        onClick={copyHash}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-slate-500 hover:text-orange-400"
        aria-label={`Copy hash: ${hash}`}
        title="Copy full hash"
      >
        {copied
          ? <Check className="h-3 w-3 text-emerald-400" />
          : <Copy className="h-3 w-3" />
        }
      </button>
    </span>
  );
}
