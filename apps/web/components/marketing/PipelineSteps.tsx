'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Database, FileJson, Calculator, Zap } from 'lucide-react';

const STEPS = [
  {
    id: 'r',
    num: '01',
    title: 'Retrieve (R)',
    desc: 'Full-scope map or top-k selection over the corpus world.',
    icon: Database
  },
  {
    id: 'e',
    num: '02',
    title: 'Extract (E)',
    desc: 'Schema rows pulled from every in-scope record, validated and cached.',
    icon: FileJson
  },
  {
    id: 'a',
    num: '03',
    title: 'Aggregate (A)',
    desc: 'Deterministic computation via allow-listed reference functions — not model arithmetic.',
    icon: Calculator
  },
  {
    id: 'attr',
    num: '04',
    title: 'Attribute',
    desc: 'Oracle-replacement loop feeds back into R/E/A to mathematically isolate the failure.',
    icon: Zap,
    isSpecial: true
  }
];

export function PipelineSteps() {
  const [activeStep, setActiveStep] = useState('r');

  return (
    <section className="py-24 bg-surface-0 border-y border-gunmetal">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="type-heading-sp text-3xl md:text-4xl text-white mb-12">
              Observe. Swap. Attribute.
            </h2>
            
            <div className="space-y-4">
              {STEPS.map(step => {
                const isActive = activeStep === step.id;
                return (
                  <div
                    key={step.id}
                    onMouseEnter={() => setActiveStep(step.id)}
                    className={cn(
                      "p-6 rounded-xl cursor-pointer transition-all duration-300 border",
                      isActive 
                        ? step.isSpecial 
                          ? "bg-neon/10 border-neon/30 shadow-glow-brand" 
                          : "bg-white/[0.04] border-gunmetal"
                        : "bg-transparent border-transparent hover:border-gunmetal opacity-50 hover:opacity-100"
                    )}
                  >
                    <div className="flex gap-4">
                      <div className="type-mono text-xl font-bold text-slate-500 pt-1">
                        {step.num}
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-xl font-bold mb-2 flex items-center gap-2",
                          isActive ? (step.isSpecial ? "text-neon" : "text-white") : "text-slate-400"
                        )}>
                          {step.title}
                          <step.icon className="w-4 h-4 opacity-50" />
                        </h3>
                        <p className={cn(
                          "text-sm transition-colors",
                          isActive ? "text-slate-300" : "text-slate-500"
                        )}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visualization Side */}
          <div className="h-[500px] rounded-2xl bg-black border border-white/10 p-8 flex flex-col justify-center relative overflow-hidden trace-lattice">
            {/* Dynamic content based on active step */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              {activeStep === 'r' && (
                <div className="animate-fade-in">
                  <Database className="w-24 h-24 text-slate-600 mb-6 mx-auto" />
                  <div className="type-mono text-sm text-slate-400">Selecting D_R ⊆ D</div>
                  <div className="mt-4 w-full max-w-xs mx-auto grid grid-cols-4 gap-2">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={cn("h-4 rounded-sm", i < 6 ? "bg-white/40" : "bg-white/10")} />
                    ))}
                  </div>
                </div>
              )}
              {activeStep === 'e' && (
                <div className="animate-fade-in">
                  <FileJson className="w-24 h-24 text-slate-600 mb-6 mx-auto" />
                  <div className="type-mono text-sm text-slate-400">f_E(d_i) → r_i</div>
                  <div className="mt-6 flex flex-col gap-2 w-full max-w-xs mx-auto">
                    <div className="bg-white/10 text-[10px] type-mono p-2 rounded text-left text-emerald-400">{"{ \"val\": 42.5 }"}</div>
                    <div className="bg-white/10 text-[10px] type-mono p-2 rounded text-left text-emerald-400">{"{ \"val\": 17.2 }"}</div>
                    <div className="bg-red-500/20 border border-red-500/50 text-[10px] type-mono p-2 rounded text-left text-red-400">SyntaxError: EOF</div>
                  </div>
                </div>
              )}
              {activeStep === 'a' && (
                <div className="animate-fade-in">
                  <Calculator className="w-24 h-24 text-slate-600 mb-6 mx-auto" />
                  <div className="type-mono text-sm text-slate-400">f_A(R_E) → y</div>
                  <div className="mt-8 text-4xl font-bold text-white">59.7</div>
                </div>
              )}
              {activeStep === 'attr' && (
                <div className="animate-fade-in">
                  <Zap className="w-24 h-24 text-neon mb-6 mx-auto animate-pulse" />
                  <div className="type-mono text-sm text-neon">Oracle Replacement Protocol</div>
                  <div className="mt-6 flex flex-col gap-3 w-full max-w-xs mx-auto">
                    <div className="flex justify-between items-center bg-black border border-white/10 p-2 rounded">
                      <span className="type-mono text-xs text-slate-400">ϕ_R</span>
                      <span className="type-mono text-xs text-white">0.05</span>
                    </div>
                    <div className="flex justify-between items-center bg-neon/10 border border-neon p-2 rounded shadow-glow-brand">
                      <span className="type-mono text-xs text-neon">ϕ_E</span>
                      <span className="type-mono text-xs font-bold text-neon">0.92</span>
                    </div>
                    <div className="flex justify-between items-center bg-black border border-white/10 p-2 rounded">
                      <span className="type-mono text-xs text-slate-400">ϕ_A</span>
                      <span className="type-mono text-xs text-white">0.03</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
