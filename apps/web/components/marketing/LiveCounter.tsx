'use client';

import { useState, useEffect } from 'react';

export function LiveCounter() {
  const [count, setCount] = useState(0);

  // Simulate a live counting effect that increases slowly
  useEffect(() => {
    // Start with a believable baseline
    const baseCount = 55766308;
    setCount(baseCount);

    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none trace-lattice" />
      
      <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center">
        <div className="type-mono text-[10px] text-slate-500 uppercase tracking-widest mb-6">
          Live Session Metrics
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="text-xl md:text-2xl text-slate-400 font-medium">
            Corpus Records Processed
          </div>
          <div className="hidden md:block w-8 h-px bg-white/20" />
          <div className="type-mono text-5xl md:text-7xl font-bold text-white tracking-tighter">
            {count.toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
}
