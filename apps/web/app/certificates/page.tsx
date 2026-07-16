'use client';

import { useEffect, useState } from 'react';
import { api, Run } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { ArtifactHash } from '@/components/ui/artifact-hash';
import { EmptyState } from '@/components/ui/skeleton';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { JsonViewer } from '@/components/ui/json-viewer';
import {
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  Info,
  ArrowRight,
  Database,
} from 'lucide-react';
import Link from 'next/link';
import { formatDate, formatMs } from '@/lib/utils';

interface Observation {
  stage: string;
  kind: string;
  value: number | null;
  denominator: number | null;
}

interface Certificate {
  certificate_id: string;
  run_id: string;
  policy_id: string;
  policy_version: string;
  decision: string;
  reason_codes: string[];
  coverage_ratio: number | null;
  observations: Observation[];
  certificate_hash: string;
  issued_at: string;
}

const DECISION_META: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  CERTIFIED:    { label: 'CERTIFIED',    icon: <ShieldCheck className="h-4 w-4" />, cls: 'text-teal-400' },
  ABSTAIN:      { label: 'ABSTAIN',      icon: <ShieldAlert className="h-4 w-4" />, cls: 'text-yellow-400' },
  UNCERTIFIED:  { label: 'UNCERTIFIED',  icon: <ShieldAlert className="h-4 w-4" />, cls: 'text-red-400' },
};

export default function CertificatesPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [cert, setCert] = useState<Certificate | null>(null);
  const [certLoading, setCertLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await api.listRuns(undefined, undefined, 1, 50);
      setRuns(res.items.filter(r => r.status === 'completed'));
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function loadCert(run: Run) {
    setSelectedRun(run);
    setCert(null);
    setCertLoading(true);
    try {
      const c = await api.getRunCertificate(run.run_id);
      setCert(c);
    } catch {
      setCert(null);
    } finally {
      setCertLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const decision = cert?.decision ?? null;
  const decisionMeta = decision ? (DECISION_META[decision] ?? null) : null;

  return (
    <div className="p-8 animate-fade-in text-slate-100 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-5 w-5 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">WP8</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Coverage Certificates</h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Immutable evidence certificates showing requirement vs. observation matrix,
            policy decisions, and reason codes. Only CERTIFIED answers are presented.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Policy notice */}
      <div className="rounded-xl border border-teal-500/20 bg-teal-600/5 p-4 flex gap-3">
        <Info className="h-4 w-4 text-teal-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-teal-300">CERTIFIED</strong> = evidence coverage ≥ 1.0 (all required records seen, extraction complete). &nbsp;
          <strong className="text-yellow-300">ABSTAIN</strong> = policy triggered (unknown scope or missing rows). &nbsp;
          <strong className="text-red-300">UNCERTIFIED</strong> = coverage below threshold. Gauges are omitted for unknown denominators.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300 ring-1 ring-red-500/25">{error}</div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Run list */}
        <div className="col-span-4">
          <Card padding="none">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Completed Runs</h2>
              <Badge variant="neutral">{runs.length}</Badge>
            </div>
            <div className="divide-y divide-white/[0.04] max-h-[65vh] overflow-y-auto scrollbar-thin">
              {loading && Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-4 py-3 animate-pulse flex gap-3">
                  <div className="h-4 w-12 rounded bg-white/[0.05]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-28 rounded bg-white/[0.05]" />
                    <div className="h-2.5 w-16 rounded bg-white/[0.04]" />
                  </div>
                </div>
              ))}
              {!loading && runs.length === 0 && (
                <EmptyState
                  icon={<Database className="h-5 w-5" />}
                  title="No completed runs"
                  description="Run the guided demo to generate certified evidence."
                />
              )}
              {!loading && runs.map(run => (
                <button
                  key={run.run_id}
                  onClick={() => loadCert(run)}
                  className={`w-full text-left px-4 py-3 transition-colors flex items-start gap-3 ${
                    selectedRun?.run_id === run.run_id
                      ? 'bg-teal-600/10 border-l-2 border-teal-500'
                      : 'hover:bg-white/[0.03] border-l-2 border-transparent'
                  }`}
                >
                  <StatusBadge
                    status={run.is_correct ? 'CORRECT' : run.is_correct === false ? 'INCORRECT' : 'UNKNOWN'}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-orange-400 truncate">{run.run_id.slice(0, 14)}…</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {run.pipeline_id.split('-')[0]} · {formatMs(run.latency_ms)}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 flex-shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Certificate detail */}
        <div className="col-span-8 space-y-6">
          {!selectedRun && (
            <Card>
              <EmptyState
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Select a run"
                description="Click a completed run to view its coverage certificate and policy decision."
              />
            </Card>
          )}

          {selectedRun && certLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 rounded-xl bg-white/[0.03] animate-pulse" />
              ))}
            </div>
          )}

          {selectedRun && !certLoading && (
            <ErrorBoundary>
              {cert === null ? (
                <Card>
                  <EmptyState
                    icon={<ShieldAlert className="h-6 w-6" />}
                    title="Certificate unavailable"
                    description="This run may not have generated a certificate yet. Try a run with full gold comparison."
                  />
                </Card>
              ) : (
                <>
                  {/* Decision banner */}
                  <div className={`rounded-xl border p-5 flex items-center gap-4 ${
                    decision === 'CERTIFIED'
                      ? 'border-teal-500/30 bg-teal-600/8'
                      : decision === 'ABSTAIN'
                        ? 'border-yellow-500/30 bg-yellow-600/8'
                        : 'border-red-500/30 bg-red-600/8'
                  }`}>
                    <div className={decisionMeta?.cls ?? 'text-slate-400'}>
                      {decisionMeta?.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-lg font-bold ${decisionMeta?.cls ?? 'text-slate-300'}`}>
                        {cert.decision}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Policy: <code className="text-slate-300 font-mono">{cert.policy_id}</code> v{cert.policy_version}
                      </p>
                    </div>
                    {cert.coverage_ratio !== null && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">
                          {(cert.coverage_ratio * 100).toFixed(0)}%
                        </p>
                        <p className="text-[10px] text-slate-500">coverage ratio</p>
                      </div>
                    )}
                  </div>

                  {/* Reason codes */}
                  {cert.reason_codes?.length > 0 && (
                    <Card>
                      <div className="px-5 py-4 border-b border-white/[0.06]">
                        <h3 className="text-sm font-semibold text-white">Reason Codes</h3>
                      </div>
                      <div className="p-4 flex flex-wrap gap-2">
                        {cert.reason_codes.map(code => (
                          <code
                            key={code}
                            className="text-xs font-mono bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 text-slate-300"
                          >
                            {code}
                          </code>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Observation matrix */}
                  {cert.observations?.length > 0 && (
                    <Card padding="none">
                      <div className="px-5 py-4 border-b border-white/[0.06]">
                        <h3 className="text-sm font-semibold text-white">Requirement vs. Observation Matrix</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Each row is an evidence observation from a pipeline stage.
                        </p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/[0.06]">
                              {['Stage', 'Kind', 'Observed', 'Denominator', 'Ratio'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {cert.observations.map((obs, i) => {
                              const ratio = obs.value !== null && obs.denominator
                                ? obs.value / obs.denominator
                                : null;
                              return (
                                <tr key={i} className="table-row-hover">
                                  <td className="px-4 py-3">
                                    <code className="text-xs font-mono text-orange-300 bg-orange-500/10 rounded px-1.5 py-0.5">
                                      {obs.stage}
                                    </code>
                                  </td>
                                  <td className="px-4 py-3 text-xs text-slate-400">{obs.kind}</td>
                                  <td className="px-4 py-3 text-xs font-mono text-white">
                                    {obs.value ?? <span className="text-slate-600">—</span>}
                                  </td>
                                  <td className="px-4 py-3 text-xs font-mono text-slate-400">
                                    {obs.denominator ?? <span className="text-slate-600">Unknown</span>}
                                  </td>
                                  <td className="px-4 py-3">
                                    {ratio !== null ? (
                                      <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                          <div
                                            className={`h-full rounded-full ${ratio >= 1 ? 'bg-teal-500' : ratio >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                            style={{ width: `${Math.min(100, ratio * 100)}%` }}
                                          />
                                        </div>
                                        <span className="text-xs font-mono text-slate-300">
                                          {(ratio * 100).toFixed(0)}%
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-xs text-slate-600">Unknown</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  )}

                  {/* Certificate identity */}
                  <Card>
                    <div className="px-5 py-4 border-b border-white/[0.06]">
                      <h3 className="text-sm font-semibold text-white">Certificate Identity</h3>
                    </div>
                    <div className="p-4 space-y-3 text-xs">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 w-32 flex-shrink-0">Certificate ID</span>
                        <ArtifactHash hash={cert.certificate_id} visibleChars={20} />
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 w-32 flex-shrink-0">Hash</span>
                        <ArtifactHash hash={cert.certificate_hash} />
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 w-32 flex-shrink-0">Issued at</span>
                        <span className="font-mono text-slate-300">{formatDate(cert.issued_at)}</span>
                      </div>
                      <div className="pt-3 border-t border-white/[0.06]">
                        <Link href={`/runs/${cert.run_id}/trace`}>
                          <Button size="sm" variant="ghost">View Full Trace →</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>

                  {/* Raw JSON */}
                  <div>
                    <p className="section-heading">Raw Certificate JSON</p>
                    <JsonViewer data={cert} initialDepth={2} />
                  </div>
                </>
              )}
            </ErrorBoundary>
          )}
        </div>
      </div>
    </div>
  );
}
