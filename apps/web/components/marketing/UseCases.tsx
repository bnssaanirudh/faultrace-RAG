'use client';

import { motion } from 'framer-motion';
import { Stethoscope, Scale, FileSpreadsheet } from 'lucide-react';

export function UseCases() {
  const cases = [
    {
      icon: <Stethoscope className="w-8 h-8 text-emerald-400" />,
      title: 'Medical Q&A Systems',
      description: 'When an LLM provides incorrect medical advice, FaultTrace-RAG determines if the medical literature retrieval was inadequate, or if the model hallucinated the synthesis.',
    },
    {
      icon: <Scale className="w-8 h-8 text-blue-400" />,
      title: 'Legal Document Analysis',
      description: 'Isolate failures in complex contract parsing. Pinpoint whether the extraction step missed a liability clause or the aggregation logic failed to summarize it.',
    },
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-orange-400" />,
      title: 'Financial Analytics',
      description: 'Verify LLM-generated earnings reports. Our dual-engine architecture guarantees the underlying math is correct against deterministic Pandas backends.',
    },
  ];

  return (
    <section className="py-24 bg-black relative border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:w-2/3"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Built for High-Stakes Domains
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl">
            When answers matter, guessing why a pipeline failed is not an option. FaultTrace-RAG is designed for environments that demand provable reliability.
          </p>
        </motion.div>

        <div className="space-y-8">
          {cases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-800"
            >
              <div className="bg-zinc-900 w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-white">{useCase.title}</h3>
                <p className="text-zinc-400 text-lg">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
