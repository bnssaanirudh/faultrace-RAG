'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

const RQS = [
  {
    id: "rq1",
    title: "RQ1: Efficacy of Diagnostic Replacement",
    question: "Can an LLM isolate specific component failures (R, E, A) in a multi-stage RAG pipeline through iterative replacement?",
    expectation: "Expect diagnostic replacement to isolate errors successfully, but struggle when complex feature interactions occur across stages."
  },
  {
    id: "rq2",
    title: "RQ2: Scalability of Component Isolation",
    question: "How does the accuracy of component-level failure isolation degrade as corpus size increases (N=10 → 5,000)?",
    expectation: "Expect a non-linear degradation in isolation accuracy as scale increases, highlighting the vulnerability of standard RAG architectures to noise."
  },
  {
    id: "rq3",
    title: "RQ3: Model Family Diagnostic Variation",
    question: "Do different model families exhibit systematic differences in their failure modes across R, E, and A?",
    expectation: "Expect distinct error profiles: generic models failing more at Extraction (schema adherence), and coding models failing at Aggregation (edge case logic)."
  },
  {
    id: "rq4",
    title: "RQ4: Prompt Volatility",
    question: "How robust is the pipeline to semantically equivalent but syntactically varied queries?",
    expectation: "Expect minor prompt variations to disproportionately affect the Extraction stage compared to Retrieval or Aggregation."
  },
  {
    id: "rq5",
    title: "RQ5: Coverage Certification",
    question: "Can we issue mathematical coverage certificates that reliably predict pipeline success, reducing reliance on uncalibrated LLM confidence?",
    expectation: "Expect coverage certificates to consistently outperform LLM self-confidence in predicting accurate pipeline execution."
  }
];

export function ResearchQuestions() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="type-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
            Experimental Design
          </div>
          <h2 className="type-heading-sp text-3xl md:text-5xl text-white mb-6">
            The Research Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RQS.map((rq) => {
            const isExpanded = expandedId === rq.id;
            return (
              <div 
                key={rq.id} 
                className={cn(
                  "border rounded-xl p-6 transition-all duration-300",
                  isExpanded ? "border-neon bg-neon/5" : "border-white/10 bg-surface-1 hover:border-white/20"
                )}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {rq.title}
                  </h3>
                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : rq.id)}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                  >
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                
                <p className="text-sm text-slate-400 mb-4">
                  {rq.question}
                </p>

                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="pt-4 border-t border-white/10">
                    <div className="type-mono text-[10px] uppercase text-neon mb-2">
                      [Expectation]
                    </div>
                    <p className="text-xs text-slate-300">
                      {rq.expectation}
                    </p>
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
