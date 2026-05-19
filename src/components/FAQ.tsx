"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is AXISCAP?",
    a: "AXISCAP is an institutional-grade research terminal built for retail quants, students, and active investors. Think Bloomberg, but accessible, fast, and built for the next generation.",
  },
  {
    q: "When will I get access?",
    a: "Early access rolls out in waves based on waitlist position. The first 100 members get access at launch, followed by waves of 500 every two weeks.",
  },
  {
    q: "Is it free?",
    a: "The core terminal has a free tier with daily limits. Premium features — advanced backtesting, real-time data, AI insights, comparison overlays — are on a paid tier. Waitlist members get 3 months of premium free at launch.",
  },
  {
    q: "What data sources do you use?",
    a: "Real-time market data from Yahoo Finance, Alpha Vantage, and exchange feeds. Insider activity from SEC EDGAR (US) and SEBI PIT (India). News from multiple sources. AI insights powered by Google Gemini, grounded in real data only.",
  },
  {
    q: "Can I invest in AXISCAP?",
    a: "Not yet open to outside investors. If you're a strategic partner or angel interested in early-stage fintech infrastructure, reach out at arnavsgoyal@gmail.com.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-[120px] md:py-[160px] px-6">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[4px] text-axis-amber uppercase mb-6">
            FAQ
          </span>
          <h2 className="font-sans font-light text-[32px] md:text-[56px] text-white leading-tight">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="glass-strong rounded-2xl overflow-hidden">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={i < faqs.length - 1 ? "border-b border-white/[0.05]" : ""}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-7 md:px-8 py-6 text-left hover:bg-white/[0.02] transition-colors duration-200"
              >
                <span className="font-sans font-medium text-[16px] md:text-[17px] text-white pr-4">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-axis-text3" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="font-mono text-[13px] text-axis-text2 leading-[1.8] px-7 md:px-8 pb-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
