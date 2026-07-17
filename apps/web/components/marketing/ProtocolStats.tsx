'use client';

export function ProtocolStats() {
  return (
    <section className="py-20 bg-neon relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 trace-lattice" />
      
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 justify-between items-center text-black">
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="type-heading-sp text-3xl font-bold mb-2">What We Measure</h2>
            <p className="font-medium opacity-80">Protocol commitments, not just claims.</p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-12 lg:gap-24 justify-center md:justify-end flex-1">
            <div className="flex flex-col items-center md:items-start">
              <div className="type-mono text-5xl font-bold tracking-tighter mb-2">
                10<span className="text-2xl opacity-70">→</span>5k
              </div>
              <div className="text-xs uppercase font-bold tracking-widest opacity-80">
                Nested Worlds
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="type-mono text-5xl font-bold tracking-tighter mb-2">
                5
              </div>
              <div className="text-xs uppercase font-bold tracking-widest opacity-80">
                Research Questions
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="type-mono text-5xl font-bold tracking-tighter mb-2">
                0
              </div>
              <div className="text-xs uppercase font-bold tracking-widest opacity-80">
                Weak Labels
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
