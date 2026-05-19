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
    <section className="py-[120px] px-6">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-sans font-light text-[36px] md:text-[56px] text-white text-center leading-tight mb-16">
          Frequently Asked
        </h2>

        <div className="flex flex-col gap-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-axis-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="font-sans font-medium text-[18px] text-white pr-4">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-axis-text3 shrink-0" />
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
                    <p className="font-mono text-[14px] text-axis-text2 leading-[1.7] pb-6">
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
