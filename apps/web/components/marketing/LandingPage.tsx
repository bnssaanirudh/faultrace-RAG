'use client';

import { Navbar } from './Navbar';
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

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon/30 selection:text-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturedStrip />
        <OverviewSection />
        <ValueProps />
        
        <div id="method">
          <ComparisonAccordion />
          <PipelineSteps />
        </div>
        
        <CapabilitiesGrid />
        
        <div id="benchmark">
          <ProtocolStats />
          <ResearchQuestions />
        </div>
        
        <ForTeams />
        <LiveCounter />
        <ClosingCTA />
      </main>

      <Footer />
    </div>
  );
}
