'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  
  return (
    <div className="pointer-events-auto fixed top-0 z-50 w-full bg-transparent p-2">
      <nav className="flex w-full items-center justify-between px-4 py-3 backdrop-blur-md bg-black/80 text-white rounded-lg border border-white/[0.06] shadow-xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="group inline-flex shrink-0 items-center gap-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neon shadow-glow-brand transition-transform group-hover:scale-105">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-white leading-none">FaultTrace</p>
              <p className="text-[9px] font-medium text-neon tracking-wider mt-0.5 leading-none">RAG Analytics</p>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1 ml-4 border-l border-white/[0.1] pl-6">
            {[
              { href: '/', label: 'Overview' },
              { href: '/#method', label: 'Method' },
              { href: '/#benchmark', label: 'Benchmark' },
              { href: '/demo', label: 'Live Demo' },
              { href: '#', label: 'Paper (PDF)' },
              { href: '#', label: 'GitHub' },
            ].map(item => (
              <Link 
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-colors hover:text-white hover:bg-white/[0.05]",
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                    ? "text-white bg-white/[0.05]" 
                    : "text-slate-400"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 type-mono-1240 uppercase text-silver hover:text-white transition-colors"
          >
            [<span>Launch Dashboard</span>]
          </Link>
          
          <Link
            href="/demo"
            className="group relative inline-flex shrink-0 items-center overflow-hidden uppercase bg-neon text-black type-mono-1240 px-4 py-[7px] gap-x-4 transition-colors duration-300 before:absolute before:inset-0 before:w-0 before:bg-white before:transition-[width] before:duration-300 hover:before:w-full hover:text-black rounded-sm"
          >
            <span className="relative z-10 transition-colors group-hover:text-black font-bold">Run the Demo</span>
            <div className="inline-block bg-black h-1.5 w-1.5 relative z-10 transition-colors duration-300 group-hover:bg-black" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
