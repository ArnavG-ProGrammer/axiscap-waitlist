"use client";

import { motion } from "framer-motion";

const modules = [
  { name: "Dashboard", desc: "Live portfolio, alerts, institutional feed in one view" },
  { name: "Surf Market", desc: "Browse global markets with real-time charts and indicators" },
  { name: "Portfolio", desc: "Track holdings, allocation, P&L, risk across asset classes" },
  { name: "Transactions", desc: "Full audit trail of every trade and rebalance" },
  { name: "Assets", desc: "Cross-class exposure: equities, FX, crypto, commodities" },
  { name: "FX Converter", desc: "Real-time cross-matrix pricing from global liquidity hubs" },
  { name: "Macro News", desc: "Filtered financial news with sentiment signals" },
  { name: "Screener", desc: "Filter securities by valuation, momentum, technicals" },
  { name: "Heatmap", desc: "Visual map of NSE, BSE, US markets — sector-grouped" },
  { name: "Econ Calendar", desc: "Fed meetings, GDP, CPI, earnings — globally tracked" },
];

export default function ModulesGrid() {
  // Split into two columns for desktop
  const left = modules.slice(0, 5);
  const right = modules.slice(5, 10);

  const ModuleRow = ({ mod, index }: { mod: typeof modules[0]; index: number }) => (
    <div className="flex items-baseline gap-5 py-6 border-b border-ax-border hover:bg-ax-bg-subtle transition-colors duration-150 px-4 -mx-4 rounded">
      <span className="font-mono text-[14px] text-ax-text-dim tabular-nums shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="font-medium text-[18px] md:text-[20px] text-white shrink-0 min-w-[140px]">
        {mod.name}
      </span>
      <span className="text-[14px] text-ax-text-muted hidden md:inline">
        {mod.desc}
      </span>
    </div>
  );

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
            10 MODULES
          </p>
          <h2 className="font-light text-[36px] md:text-[56px] text-white leading-tight tracking-[-1.5px]">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile: single column */}
          <div className="md:hidden">
            {modules.map((mod, i) => (
              <ModuleRow key={i} mod={mod} index={i} />
            ))}
          </div>

          {/* Desktop: two columns */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-x-12">
            <div>
              {left.map((mod, i) => (
                <ModuleRow key={i} mod={mod} index={i} />
              ))}
            </div>
            <div>
              {right.map((mod, i) => (
                <ModuleRow key={i} mod={mod} index={i + 5} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
