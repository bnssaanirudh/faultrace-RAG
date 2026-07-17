'use client';

import Link from 'next/link';
import { Zap, Github, Linkedin } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: "Methodology",
    links: [
      { label: "Overview", href: "/#method" },
      { label: "Oracle Protocol", href: "#" },
      { label: "Shapley Attribution", href: "#" },
      { label: "Coverage Bounds", href: "#" }
    ]
  },
  {
    title: "Benchmark",
    links: [
      { label: "Live Demo", href: "/demo" },
      { label: "Corpus Worlds", href: "/dashboard/worlds" },
      { label: "Model Leaderboard", href: "#" }
    ]
  },
  {
    title: "Research",
    links: [
      { label: "Read the Paper", href: "#" },
      { label: "Experimental Design", href: "#" },
      { label: "Patent Pending", href: "#" }
    ]
  },
  {
    title: "Team",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-neon">
                <Zap className="h-3 w-3 text-black" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">FaultTrace-RAG</span>
            </Link>
            <p className="text-xs text-slate-500 mb-6 max-w-xs">
              Counterfactual Fault Localization for Corpus-Level LLM Analytics Pipelines.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          {FOOTER_LINKS.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-bold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-neon transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} FaultTrace-RAG Research Project. All rights reserved.
          </div>
          <div className="flex gap-6 type-mono text-[10px] text-slate-600 uppercase">
            <Link href="#" className="hover:text-slate-400">Terms</Link>
            <Link href="#" className="hover:text-slate-400">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
