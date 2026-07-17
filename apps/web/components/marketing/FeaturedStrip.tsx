'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const FEATURED_ARTICLES = [
  {
    title: "The Hard Boundary With GlobalQA",
    href: "#",
    category: "Methodology",
    description: "Why testing global reasoning isn't enough to isolate component-level failures.",
    bgType: "orange"
  },
  {
    title: "Why Coverage Certificates Beat Confidence Scores",
    href: "#",
    category: "Research",
    description: "Confidence scores hallucinate. Coverage certificates mathematically bound the error space.",
    bgType: "gray"
  },
  {
    title: "Reading the Oracle Fault Trace",
    href: "#",
    category: "Guide",
    description: "A plain-language walkthrough of the Shapley-style attribution formula.",
    bgType: "orange"
  }
];

export function FeaturedStrip() {
  return (
    <section className="border-y border-gunmetal bg-surface-0 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-32 py-6 border-b lg:border-b-0 lg:border-r border-gunmetal flex items-center shrink-0">
            <span className="type-mono-1040 uppercase text-silver">
              Featured
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gunmetal w-full">
            {FEATURED_ARTICLES.map((article, idx) => (
              <Link 
                key={idx} 
                href={article.href}
                className="group relative flex flex-col justify-between p-6 overflow-hidden transition-colors"
              >
                {/* Hover Reveal Image / Gradient */}
                <div className={cn(
                  "absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out bg-gradient-to-br",
                  article.bgType === 'orange' ? "from-neon via-transparent to-transparent" : "from-white via-transparent to-transparent"
                )} />

                <div className="relative z-10">
                  <div className="type-mono-1040 uppercase text-neon mb-3 flex items-center gap-2">
                    [{article.category}]
                  </div>
                  <h3 className="text-sm font-bold text-platinum mb-2 leading-snug group-hover:text-white transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-silver line-clamp-2">
                    {article.description}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-2 type-mono-1040 text-silver uppercase group-hover:text-neon transition-colors relative z-10">
                  [<span>Read Article</span> <ArrowRight className="inline-block w-3 h-3 ml-1" />]
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
