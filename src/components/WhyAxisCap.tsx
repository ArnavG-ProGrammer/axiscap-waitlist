"use client";

import { motion } from "framer-motion";
import { LineChart, Brain, Zap } from "lucide-react";

const cards = [
  {
    icon: LineChart,
    title: "Institutional-grade data",
    body: "Live markets across NSE, BSE, NYSE, NASDAQ. Forex, crypto, commodities. All in one terminal.",
    gradient: "from-axis-teal/10 to-transparent",
  },
  {
    icon: Brain,
    title: "AI-powered insights",
    body: "Gemini analyzes every stock. Risk, growth, momentum — grounded in real data, zero hallucinations.",
    gradient: "from-axis-blue/10 to-transparent",
  },
  {
    icon: Zap,
    title: "Built for action",
    body: "DCF valuation, strategy backtesting, technical indicators, comparison overlays. Tools that actually work.",
    gradient: "from-axis-amber/10 to-transparent",
  },
];

export default function WhyAxisCap() {
  return (
    <section className="relative py-[120px] md:py-[160px] px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,230,172,0.03) 0%, transparent 70%)",
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
            WHY AXISCAP
          </span>
          <h2 className="font-sans font-light text-[32px] md:text-[56px] text-white leading-tight max-w-[800px] mx-auto">
            Built for serious operators.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative glass glass-hover rounded-xl p-8 overflow-hidden"
            >
              {/* Top gradient glow on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center mb-6">
                  <card.icon className="w-5 h-5 text-axis-teal" />
                </div>
                <h3 className="font-sans font-medium text-[20px] text-white mb-3 tracking-[-0.01em]">
                  {card.title}
                </h3>
                <p className="font-mono text-[12px] text-axis-text2 leading-[1.8]">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
