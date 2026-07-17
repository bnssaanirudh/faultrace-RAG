'use client';

export function OverviewSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Faint streaming document icons in background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden flex flex-col gap-8 justify-center transform -skew-y-3 scale-110">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="flex gap-8 animate-[shimmer_20s_linear_infinite]" 
            style={{ animationDirection: i % 2 === 0 ? 'normal' : 'reverse', animationDuration: `${20 + i*5}s` }}
          >
            {[...Array(20)].map((_, j) => (
              <div 
                key={j} 
                className={`w-12 h-16 border rounded ${(i * 7 + j) % 5 === 0 ? 'border-neon bg-neon/10' : 'border-slate-700 bg-slate-900'} flex-shrink-0 flex items-center justify-center`}
              >
                <div className="w-6 h-1 bg-slate-700 rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          <p className="text-xl md:text-3xl font-medium text-white leading-relaxed tracking-tight">
            LLMs are increasingly used as analytics interfaces over reviews, filings, and reports. A top-k retriever can omit the denominator. A long-context model can silently truncate. A code-writing model can compute correctly over the wrong rows — <span className="text-neon">and the final answer still looks confident.</span>
          </p>

          <div className="h-px w-24 bg-white/20" />

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            Built on a deterministic dual-reference gold engine (Pandas + DuckDB) and a formal component-attribution method, FaultTrace-RAG is designed for reviewers who won't accept a single headline accuracy number. We isolate exact failures across <span className="text-slate-200">Retrieval</span>, <span className="text-slate-200">Extraction</span>, and <span className="text-slate-200">Aggregation</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
