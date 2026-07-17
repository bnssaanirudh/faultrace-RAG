'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const COMPARISONS = [
  {
    id: 'globalqa',
    name: 'GlobalQA',
    blindspot: 'Tests whether global reasoning is possible at all, not which component recoverably failed.',
    fill: 'Nested-scale oracle replacement across R, E, A with Shapley-style attribution isolates the exact failure.'
  },
  {
    id: 'ragchecker',
    name: 'RAG Diagnostics (e.g. RAGChecker)',
    blindspot: 'Modular metrics describe symptoms (e.g. "low recall"), not causal recoverability or scope boundaries.',
    fill: 'Deterministic oracle swaps isolate exactly how much loss each stage causes independently.'
  },
  {
    id: 'e2e',
    name: 'End-to-End LLM Judges',
    blindspot: 'Assigns a holistic 1-5 score without proving if the underlying schema extraction was even faithful.',
    fill: 'Requires Pandas/DuckDB gold agreement before any query enters the benchmark.'
  }
];

export function ComparisonAccordion() {
  const [openId, setOpenId] = useState<string>('globalqa');

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="type-heading-sp text-3xl md:text-5xl text-white mb-6">
            Your Stack Is Strong — But Blind
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Existing frameworks tell you if an answer is right or wrong. FaultTrace-RAG is the only protocol that proves <span className="text-white">where the fix needs to happen.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {COMPARISONS.map(item => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className={cn(
                  "border rounded-xl overflow-hidden transition-colors duration-300",
                  isOpen ? "border-neon bg-neon/5" : "border-gunmetal bg-surface-1 hover:border-white/20"
                )}
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={cn(
                    "text-lg font-bold transition-colors",
                    isOpen ? "text-white" : "text-slate-300"
                  )}>
                    {item.name}
                  </span>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    isOpen ? "rotate-180 text-neon" : "text-slate-500"
                  )} />
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="p-6 pt-0 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-black/40 p-5 rounded-lg border border-red-500/20">
                      <div className="type-mono text-[10px] uppercase text-red-400 mb-2">[The Blindspot]</div>
                      <p className="text-sm text-slate-300">{item.blindspot}</p>
                    </div>
                    <div className="flex-1 bg-neon/10 p-5 rounded-lg border border-neon/30">
                      <div className="type-mono text-[10px] uppercase text-neon mb-2">[The FaultTrace Fix]</div>
                      <p className="text-sm text-white">{item.fill}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
