'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const codeLines = [
  "from faulttrace_core import PipelineContext",
  "from faulttrace_pipelines.attribution import compute_shapley",
  "",
  "# Initialize pipeline context",
  "ctx = PipelineContext(dataset='amazon_reviews', model='gpt-4o')",
  "",
  "# Run counterfactual evaluation",
  "results = compute_shapley(ctx)",
  "",
  "print(results.summary())",
  "> [OUTPUT]",
  "> Retrieval Contribution: -0.42 (High Impact)",
  "> Extraction Contribution: +0.05",
  "> Aggregation Contribution: +0.02",
  "> Diagnosis: Retrieval Failure. Expand BM25 scope.",
];

export function InteractiveTerminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setDisplayedLines(codeLines.slice(0, currentLine + 1));
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Developer First Experience
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Integrate FaultTrace-RAG directly into your evaluation suites with our clean Python SDK. Automate your pipeline diagnostics and plug right into CI/CD.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
              View Documentation
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          onViewportEnter={() => setIsVisible(true)}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl shadow-blue-900/20"
        >
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex flex-1 justify-center items-center gap-2 text-zinc-500 text-xs font-mono">
              <Terminal size={12} /> faulttrace-eval.py
            </div>
          </div>
          <div className="p-6 font-mono text-sm h-[380px] overflow-y-auto">
            {displayedLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={
                  line.startsWith('>') 
                    ? line.includes('Retrieval Failure') 
                      ? 'text-red-400 mt-2' 
                      : 'text-zinc-400 mt-2' 
                    : line.startsWith('#') 
                      ? 'text-green-500/70' 
                      : 'text-blue-300'
                }
              >
                {line}
              </motion.div>
            ))}
            {isVisible && displayedLines.length < codeLines.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-white mt-1"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
