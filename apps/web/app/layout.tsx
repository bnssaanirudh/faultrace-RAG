import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FaultTrace-RAG — Counterfactual Fault Localization for LLM Pipelines',
    template: '%s | FaultTrace-RAG',
  },
  description:
    'FaultTrace-RAG pinpoints which pipeline component failed — Retrieval, Extraction, or Aggregation — using deterministic oracle swaps and Shapley-style attribution.',
  keywords: ['LLM', 'RAG', 'fault localization', 'analytics', 'benchmarking', 'counterfactual'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
