import { cn } from '@/lib/utils';

/**
 * Canonical status vocabulary for FaultTrace-RAG.
 * Use ONLY these values across all pages and components.
 * Colours:
 *   CERTIFIED        → teal  (verified evidence coverage)
 *   CORRECT          → emerald (answer matches gold)
 *   ABSTAIN          → yellow (policy-driven non-answer)
 *   RUNNING/PENDING  → orange (in-progress)
 *   INCORRECT        → red   (answer wrong vs gold)
 *   UNCERTIFIED      → red   (coverage failed)
 *   FAILED           → red   (pipeline error)
 *   UNKNOWN          → slate (no information)
 */
export type StatusValue =
  | 'CERTIFIED'
  | 'CORRECT'
  | 'ABSTAIN'
  | 'RUNNING'
  | 'PENDING'
  | 'INCORRECT'
  | 'UNCERTIFIED'
  | 'FAILED'
  | 'UNKNOWN'
  | string;  // allow raw pipeline strings

const STATUS_STYLES: Record<string, string> = {
  CERTIFIED:    'bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/30',
  CORRECT:      'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
  ABSTAIN:      'bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/30',
  RUNNING:      'bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30',
  PENDING:      'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20',
  INCORRECT:    'bg-red-500/15 text-red-300 ring-1 ring-red-500/30',
  UNCERTIFIED:  'bg-red-500/15 text-red-300 ring-1 ring-red-500/30',
  FAILED:       'bg-red-500/15 text-red-300 ring-1 ring-red-500/30',
  UNKNOWN:      'bg-white/[0.05] text-slate-400 ring-1 ring-white/10',
  // pipeline status aliases
  completed:    'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
  failed:       'bg-red-500/15 text-red-300 ring-1 ring-red-500/30',
  running:      'bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30',
  pending:      'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20',
};

interface StatusBadgeProps {
  status: StatusValue;
  className?: string;
  /** Override display label (default: uppercased status value) */
  label?: string;
  /** Show an animated dot before the label for live states */
  animated?: boolean;
}

/**
 * Single canonical status badge for all FaultTrace-RAG status values.
 * Replaces ad-hoc badge classes scattered across pages.
 */
export function StatusBadge({ status, className, label, animated }: StatusBadgeProps) {
  const key = String(status).toUpperCase() in STATUS_STYLES
    ? String(status).toUpperCase()
    : status in STATUS_STYLES
      ? status
      : 'UNKNOWN';

  const styles = STATUS_STYLES[key] ?? STATUS_STYLES.UNKNOWN;
  const isLive = ['RUNNING', 'running'].includes(String(status));

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles,
        className,
      )}
      role="status"
      aria-label={`Status: ${label ?? status}`}
    >
      {(animated ?? isLive) && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {label ?? String(status).toUpperCase()}
    </span>
  );
}
