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
    <section className="relative py-[120px] md:py-[160px] px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(74,158,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[4px] text-axis-amber uppercase mb-6">
            10 MODULES
          </span>
          <h2 className="font-sans font-light text-[32px] md:text-[56px] text-white leading-tight">
            One terminal. Everything you need.
          </h2>
          <p className="font-mono text-[13px] text-axis-text2 max-w-[650px] mx-auto mt-5 leading-[1.7]">
            From live markets to backtesting, every tool a professional analyst
            uses — accessible, fast, beautifully designed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {modules.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative glass glass-hover rounded-lg p-6 overflow-hidden cursor-default"
            >
              {/* Subtle top edge highlight */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-axis-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <p className="font-mono text-[10px] tracking-[2px] text-axis-text3 mb-2 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-sans font-medium text-[17px] md:text-[18px] text-white tracking-[-0.3px]">
                  {name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
