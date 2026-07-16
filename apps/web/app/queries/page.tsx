import { Suspense } from 'react';
import type { Metadata } from 'next';
import { QueriesPage } from './queries-page';

export const metadata: Metadata = { title: 'Query Library - FaultTrace RAG' };

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500 text-sm animate-pulse">Loading query library…</div>}>
      <QueriesPage />
    </Suspense>
  );
}
