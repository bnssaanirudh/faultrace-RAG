'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Activity,
  BarChart3,
  Database,
  Gauge,
  Globe,
  HelpCircle,
  Play,
  Settings,
  Zap,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Overview', icon: Gauge },
  { href: '/datasets', label: 'Datasets', icon: Database },
  { href: '/worlds', label: 'Corpus Worlds', icon: Globe },
  { href: '/queries', label: 'Query Library', icon: HelpCircle },
  { href: '/run-lab', label: 'Run Lab', icon: Zap },
  { href: '/runs', label: 'Run History', icon: Play },
  { href: '/experiments', label: 'Experiments', icon: BarChart3 },
  { href: '/settings', label: 'System & Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-white/[0.06] bg-surface-1/50 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.3)]">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-tight text-white">FaultTrace</p>
          <p className="text-[10px] font-medium text-orange-400 tracking-wider">RAG Analytics</p>
        </div>
      </div>

      <div className="mx-4 mb-4 h-px bg-white/[0.06]" />

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Navigation
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150',
                isActive
                  ? 'bg-orange-600/10 text-orange-400 ring-inset ring-1 ring-orange-500/20'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
              )}
            >
              <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-orange-400' : 'text-slate-500')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Version footer */}
      <div className="px-5 py-4">
        <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-slate-400">v0.7.0 — Prompt 7</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-600 leading-relaxed">
            Attribution & Certification UI
          </p>
        </div>
      </div>
    </aside>
  );
}
