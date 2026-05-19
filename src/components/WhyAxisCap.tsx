"use client";

import { motion } from "framer-motion";

const cards = [
  {
    label: "01 · DATA",
    title: "Real-time market intelligence",
    body: "Live coverage across NYSE, NASDAQ, NSE, BSE. Forex, crypto, and commodities surfaced through a single unified terminal.",
  },
  {
    label: "02 · INTELLIGENCE",
    title: "Grounded AI analysis",
    body: "Every insight pulls from live financial data — no hallucinations, no fabricated numbers. Risk, valuation, and momentum signals built on real inputs.",
  },
  {
    label: "03 · EXECUTION",
    title: "Institutional-grade tooling",
    body: "DCF valuation models, strategy backtesting, technical screening, and portfolio analytics — designed for serious operators, not retail dashboards.",
  },
];

export default function WhyAxisCap() {
  return (
    <section className="py-[120px] md:py-[160px] px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[11px] text-ax-text-dim tracking-[3px] uppercase mb-4">
            WHY AXISCAP
          </p>
          <h2 className="font-light text-[36px] md:text-[56px] text-white leading-tight tracking-[-1.5px]">
            Built for serious operators.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="bg-ax-card border border-ax-border rounded-lg p-10 hover:border-ax-border-strong transition-colors duration-200"
            >
              <p className="text-[11px] text-ax-text-dim tracking-[2px] uppercase mb-5">
                {card.label}
              </p>
              <h3 className="font-semibold text-[24px] md:text-[28px] text-white mb-4 tracking-[-0.5px]">
                {card.title}
              </h3>
              <p className="text-[15px] text-ax-text-muted leading-[1.6]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
