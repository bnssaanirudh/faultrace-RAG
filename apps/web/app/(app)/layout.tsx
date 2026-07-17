import { Sidebar } from '@/components/layout/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </div>
        <div className="w-full bg-amber-500/10 border-t border-amber-500/20 px-4 py-1.5 text-center">
          <p className="text-xs font-medium text-amber-500/80">
            Demo Data — For Engineering Purposes Only
          </p>
        </div>
      </main>
    </div>
  );
}
