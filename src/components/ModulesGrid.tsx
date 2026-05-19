"use client";

import { motion } from "framer-motion";

const modules = [
  "Dashboard",
  "Surf Market",
  "Portfolio",
  "Transactions",
  "Assets",
  "FX Converter",
  "Macro News",
  "Screener",
  "Heatmap",
  "Econ Calendar",
];

export default function ModulesGrid() {
  return (
    <section className="py-[120px] px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[12px] tracking-[4px] text-axis-amber uppercase text-center mb-4">
          10 MODULES
        </p>
        <h2 className="font-sans font-light text-[36px] md:text-[56px] text-white text-center leading-tight">
          One terminal. Everything you need.
        </h2>
        <p className="font-mono text-[14px] text-axis-text2 text-center max-w-[700px] mx-auto mt-4 leading-[1.6]">
          From live markets to backtesting, every tool a professional analyst
          uses — accessible, fast, beautifully designed.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-16">
          {modules.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="p-7 rounded border border-[rgba(0,212,160,0.15)] bg-[rgba(15,25,22,0.6)] hover:border-[rgba(0,212,160,0.4)] hover:shadow-[inset_0_0_20px_rgba(0,212,160,0.05)] transition-all duration-200"
            >
              <p className="font-mono text-[11px] tracking-[1px] text-axis-text3 mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-sans font-medium text-[20px] text-white tracking-[-0.3px]">
                {name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
