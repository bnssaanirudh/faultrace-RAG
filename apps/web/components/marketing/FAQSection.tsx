'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is Counterfactual Fault Localization?",
    answer: "Instead of guessing what went wrong, we temporarily replace pipeline components (Retrieval, Extraction, Aggregation) with perfect 'oracles'. By comparing the outputs, we can mathematically prove which component caused the failure."
  },
  {
    question: "Do I need to rewrite my entire RAG pipeline?",
    answer: "No. FaultTrace-RAG is designed to sit alongside your existing evaluation stack. You just need to wrap your pipeline steps so we can inject our oracles during testing."
  },
  {
    question: "What is a 'Coverage Certificate'?",
    answer: "A coverage certificate is a mathematical guarantee that an LLM's answer is reliable based on lexical ambiguity and trace evidence. If the certificate fails, the system will flag the answer as 'Untrustable'."
  },
  {
    question: "Can this run locally?",
    answer: "Yes, FaultTrace-RAG is open-source and designed to run entirely locally using our dual DuckDB/Pandas gold engine. Your proprietary data never has to leave your servers."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-black border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-zinc-800/50 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-zinc-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 pt-2 text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
