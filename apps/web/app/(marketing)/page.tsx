import { LandingPage } from '@/components/marketing/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FaultTrace-RAG — When the answer is wrong, we tell you why.',
  description:
    'FaultTrace-RAG localizes failures in LLM analytics pipelines — Retrieval, Extraction, Aggregation — using oracle swaps and Shapley-style attribution.',
};

export default function Page() {
  return <LandingPage />;
}
