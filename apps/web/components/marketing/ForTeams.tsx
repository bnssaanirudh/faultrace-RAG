'use client';

import { CheckCircle2 } from 'lucide-react';

const TEAMS = [
  {
    title: "For Reviewers",
    tagline: "Total Reproducibility",
    points: [
      "Frozen protocol execution logs",
      "Cryptographically verified nested worlds",
      "Deterministic dual-engine gold truth"
    ]
  },
  {
    title: "For Engineers",
    tagline: "Safe Execution",
    points: [
      "Hardened FastAPI sandbox environment",
      "No network, shell, or write access",
      "Interactive Next.js trace inspector"
    ]
  },
  {
    title: "For Researchers",
    tagline: "Extensible Architecture",
    points: [
      "Oracle lattice component swaps",
      "Automated ablation scripts",
      "Pre-configured tracking for RQ1-RQ5"
    ]
  }
];

export function ForTeams() {
  return (
    <section className="py-24 bg-surface-0 border-y border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="type-heading-sp text-3xl md:text-5xl text-white mb-6">
            Built For The Whole Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAMS.map((team, idx) => (
            <div key={idx} className="bg-surface-1 p-8 rounded-xl border border-white/10">
              <div className="type-mono text-[10px] uppercase text-neon mb-4">
                [{team.tagline}]
              </div>
              <h3 className="text-2xl font-bold text-white mb-8">
                {team.title}
              </h3>
              
              <ul className="space-y-4">
                {team.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
