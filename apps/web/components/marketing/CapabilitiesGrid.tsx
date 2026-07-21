'use client';

import { Shield, Map, Wrench, SearchCode, DatabaseBackup, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const CAPABILITIES = [
  {
    icon: Shield,
    title: "Coverage Certificates",
    description: "Flags answers as unsafe or mathematically insufficient instead of letting the model be confidently wrong."
  },
  {
    icon: Map,
    title: "Full-Scope Map-Extract-Reduce",
    description: "Enumerates every in-scope record before aggregating, bypassing the silent truncation of top-k."
  },
  {
    icon: Wrench,
    title: "Bounded Repair",
    description: "Schema-validated, logged retries — no silent self-correction. If an extraction fails 3 times, it's a hard fault."
  },
  {
    icon: SearchCode,
    title: "Oracle Fault Trace",
    description: "Deterministic component swaps produce machine-readable failure attribution (Shapley values) for R, E, and A."
  },
  {
    icon: DatabaseBackup,
    title: "Dual Reference Engine",
    description: "Pandas and DuckDB must perfectly agree on the ground-truth before a query enters the benchmark."
  },
  {
    icon: Terminal,
    title: "FastAPI Sandbox",
    description: "Hardened environment: no network, shell, or write access for generated code. Safe for scale."
  }
];

export function CapabilitiesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-surface-1 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="type-heading-sp text-3xl md:text-5xl text-white mb-6">
            Everything Required For Rigorous Attribution
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CAPABILITIES.map((cap, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 rounded-xl bg-black border border-white/10 hover:border-white/30 transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <cap.icon className="w-8 h-8 text-slate-500 mb-6 group-hover:text-neon transition-colors duration-300" />
              <h3 className="text-lg font-bold text-white mb-3">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
