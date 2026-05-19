"use client";

import { motion } from "framer-motion";
import { LineChart, Brain, Zap } from "lucide-react";

const cards = [
  {
    icon: LineChart,
    title: "Institutional-grade data",
    body: "Live markets across NSE, BSE, NYSE, NASDAQ. Forex, crypto, commodities. All in one terminal.",
  },
  {
    icon: Brain,
    title: "AI-powered insights",
    body: "Gemini analyzes every stock. Risk, growth, momentum — grounded in real data, zero hallucinations.",
  },
  {
    icon: Zap,
    title: "Built for action",
    body: "DCF valuation, strategy backtesting, technical indicators, comparison overlays. Tools that actually work.",
  },
];

export default function WhyAxisCap() {
  return (
    <section className="py-[120px] px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[12px] tracking-[4px] text-axis-amber uppercase text-center mb-4">
          WHY AXISCAP
        </p>
        <h2 className="font-sans font-light text-[36px] md:text-[56px] text-white text-center max-w-[800px] mx-auto leading-tight">
          Built for serious operators.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded border border-[rgba(0,212,160,0.15)] bg-[rgba(15,25,22,0.5)] backdrop-blur-[10px] hover:border-[rgba(0,212,160,0.4)] hover:scale-[1.02] transition-all duration-200"
            >
              <card.icon className="w-8 h-8 text-axis-teal mb-5" />
              <h3 className="font-sans font-medium text-[22px] text-white mb-3">
                {card.title}
              </h3>
              <p className="font-mono text-[13px] text-axis-text2 leading-[1.6]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
