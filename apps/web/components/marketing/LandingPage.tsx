'use client';

import { useState } from 'react';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeaturedStrip } from './FeaturedStrip';
import { OverviewSection } from './OverviewSection';
import { ValueProps } from './ValueProps';
import { ComparisonAccordion } from './ComparisonAccordion';
import { PipelineSteps } from './PipelineSteps';
import { CapabilitiesGrid } from './CapabilitiesGrid';
import { ProtocolStats } from './ProtocolStats';
import { ResearchQuestions } from './ResearchQuestions';
import { ForTeams } from './ForTeams';
import { LiveCounter } from './LiveCounter';
import { ClosingCTA } from './ClosingCTA';
import { Footer } from './Footer';
import { ArchitectureDeepDive } from './ArchitectureDeepDive';
import { UseCases } from './UseCases';
import { InteractiveTerminal } from './InteractiveTerminal';
import { FAQSection } from './FAQSection';

const THEMES = [
  { id: 'volcanic', name: 'Volcanic', color: '#FF6A2B' },
  { id: 'ocean', name: 'Ocean', color: '#3B82F6' },
  { id: 'emerald', name: 'Emerald', color: '#10B981' },
  { id: 'amethyst', name: 'Amethyst', color: '#8B5CF6' }
];

const BACKGROUNDS = [
  { id: 'deep', name: 'Deep Hue' },
  { id: 'black', name: 'Pure Black' },
  { id: 'slate', name: 'Slate' },
  { id: 'navy', name: 'Navy' },
];

export function LandingPage() {
  const [theme, setTheme] = useState(THEMES[0].id);
  const [bgStyle, setBgStyle] = useState(BACKGROUNDS[0].id);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  return (
    <div data-accent={theme} data-bg={bgStyle} className="min-h-screen bg-theme-bg text-white selection:bg-theme-accent/30 selection:text-white transition-colors duration-700 ease-in-out relative">
      <Navbar />
      
      {/* Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <AnimatePresence>
            {showThemeMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bottom-full right-0 mb-4 p-4 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl flex flex-col gap-4 w-48"
              >
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 px-2">Accent Color</div>
                  <div className="flex flex-col gap-1">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/5 ${theme === t.id ? 'bg-white/10' : ''}`}
                      >
                        <div className="w-4 h-4 rounded-full border border-white/20 shadow-[0_0_10px_currentColor]" style={{ color: t.color, backgroundColor: t.color }}></div>
                        <span className="text-sm font-medium">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 px-2">Background</div>
                  <div className="flex flex-col gap-1">
                    {BACKGROUNDS.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBgStyle(b.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/5 ${bgStyle === b.id ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                      >
                        <span className="text-sm font-medium">{b.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 text-slate-300 flex items-center justify-center shadow-lg hover:text-white hover:border-white/30 transition-all hover:scale-110"
          >
            <Palette size={20} />
          </button>
        </div>
      </div>

      <main>
        <HeroSection />
        <FeaturedStrip />
        <OverviewSection />
        <ValueProps />
        
        <div id="method">
          <ComparisonAccordion />
          <PipelineSteps />
          <ArchitectureDeepDive />
        </div>
        
        <CapabilitiesGrid />
        <UseCases />
        <InteractiveTerminal />
        
        <div id="benchmark">
          <ProtocolStats />
          <ResearchQuestions />
        </div>
        
        <ForTeams />
        <LiveCounter />
        <FAQSection />
        <ClosingCTA />
      </main>

      <Footer />
    </div>
  );
}
