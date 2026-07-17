'use client';

import { Target, ShieldCheck, Database } from 'lucide-react';

const PROPS = [
  {
    icon: Target,
    title: "Localize, Don't Just Score",
    description: "Pinpoints exactly which pipeline stage is recoverable. Stop guessing if you need better embeddings or a better prompt."
  },
  {
    icon: ShieldCheck,
    title: "From Answer to Evidence",
    description: "Every generated number ships with a coverage certificate and a mathematically proven traceable record set."
  },
  {
    icon: Database,
    title: "Reproducible at Scale",
    description: "Nested worlds from N=10 to 5,000. Frozen protocol execution with a deterministic dual-engine gold truth."
  }
];

export function ValueProps() {
  return (
    <section className="py-24 bg-surface-1 border-t border-gunmetal">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {PROPS.map((prop, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-lg bg-black border border-gunmetal flex items-center justify-center text-neon shadow-glow-brand">
                <prop.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {prop.title}
              </h3>
              <p className="text-sm text-silver leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
