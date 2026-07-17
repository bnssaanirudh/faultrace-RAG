'use client';

import Link from 'next/link';

export function ClosingCTA() {
  return (
    <section className="py-32 bg-neon relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-15 trace-lattice" />
      
      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <h2 className="type-heading-sp text-4xl md:text-6xl text-black font-bold mb-8">
          See Which Component Actually Failed.
        </h2>
        
        <p className="text-black/80 text-lg mb-12 max-w-2xl mx-auto font-medium">
          Stop guessing why your pipeline returned the wrong answer. Run a live trace and isolate the exact point of failure.
        </p>

        <Link
          href="/demo"
          className="inline-flex items-center justify-center rounded bg-black px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-105 type-mono uppercase tracking-wide"
        >
          Launch Live Demo →
        </Link>
      </div>
    </section>
  );
}
