import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/** Inline shimmer placeholder for a single line of text */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'h-4 rounded-md bg-white/[0.05] animate-pulse',
        className,
      )}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading…"
    />
  );
}

/** A full table row of skeleton cells */
export function SkeletonRow({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-white/[0.04]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className={i === 0 ? 'w-16' : i === 1 ? 'w-48' : 'w-24'} />
        </td>
      ))}
    </tr>
  );
}

/** A stat-card shaped skeleton */
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 flex flex-col gap-3 animate-pulse',
        className,
      )}
      role="progressbar"
      aria-busy="true"
    >
      <Skeleton className="w-16 h-3" />
      <Skeleton className="w-24 h-8" />
      <Skeleton className="w-32 h-3" />
    </div>
  );
}

/** Empty-state placeholder for tables/lists */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-4">
      {icon && (
        <div className="h-12 w-12 rounded-full bg-white/[0.04] flex items-center justify-center text-slate-500">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-slate-300">{title}</p>
        {description && <p className="mt-1 text-xs text-slate-500 max-w-xs">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
