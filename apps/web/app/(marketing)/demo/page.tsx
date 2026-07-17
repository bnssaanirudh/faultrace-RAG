import { DemoShell } from '@/components/demo/DemoShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Pipeline Trace | FaultTrace-RAG',
  description: 'Run an interactive diagnostic trace over deterministic RAG pipelines.',
};

export default function Page() {
  return <DemoShell />;
}
