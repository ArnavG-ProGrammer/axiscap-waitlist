"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is AXISCAP?",
    a: "A research terminal built for retail quants, students, and independent analysts. AXISCAP brings institutional-grade tooling — live data, valuation models, backtesting, and AI-grounded insights — to operators who don't have Bloomberg-level budgets.",
  },
  {
    q: "When does access open?",
    a: "Launch is June 28, 2026. Waitlist members receive access in priority order during the first two weeks.",
  },
  {
    q: "How much does it cost?",
    a: "The core terminal is free. Premium features — extended backtesting, real-time data feeds, advanced AI analysis, multi-portfolio simulation — are available on a paid tier. Waitlist members receive 3 months of premium complimentary at launch.",
  },
  {
    q: "Where does the data come from?",
    a: "Market data from Yahoo Finance, Alpha Vantage, and direct exchange APIs. Insider activity from SEC EDGAR (US) and SEBI PIT disclosures (India). AI analysis from Google Gemini, constrained to real input data — no hallucinated metrics.",
  },
  {
    q: "Can I invest?",
    a: "AXISCAP is not currently raising. For strategic partnerships, contact arnavsgoyal@gmail.com.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-[120px] md:py-[160px] px-6">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[11px] text-ax-text-dim tracking-[3px] uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-light text-[36px] md:text-[56px] text-white leading-tight tracking-[-1.5px]">
            Common questions.
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-ax-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="font-medium text-[18px] text-white pr-4">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <ChevronDown className="w-4 h-4 text-ax-text-dim" />
                </span>
              </button>
              {open === i && (
                <div className="pb-6">
                  <p className="text-[15px] text-ax-text-muted leading-[1.7]">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
