"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const FEATURES = [
  {
    title: "Market Heatmap",
    description:
      "Live sector flow visualization across global markets. Track real-time price movements across industries with an institutional-grade treemap.",
  },
  {
    title: "DCF Valuation Engine",
    description:
      "Multi-stage Gordon Growth Discounted Cash Flow matrix powered by live proxy data adjustments. Instant intrinsic value calculations with overvalued/undervalued signals.",
  },
  {
    title: "Technical Screener",
    description:
      "Filter global securities by P/E, market cap, volume, performance, and technical indicators across US, Indian, UK, Forex, and Crypto markets.",
  },
  {
    title: "Equity Fundamentals",
    description:
      "Deep-dive terminal view with core analytics, AI analysis, composite matrix, DCF valuation, strategy backtester, and insider activity — all in one screen.",
  },
  {
    title: "Live Charting",
    description:
      "Professional charting with multiple timeframes, drawing tools, and technical indicators. Real-time price action on every listed security.",
  },
  {
    title: "Institutional FX Engine",
    description:
      "Ultra-low latency real-time cross-matrix pricing from global liquidity hubs. Spot market, portfolio management, and multi-currency conversion.",
  },
];

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation bar */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center justify-between h-11 px-5 max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-ax-text-muted hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[13px] font-medium">BACK</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <Image
              src="/axiscap-logo.png"
              alt="AXISCAP"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="text-white text-[14px] font-semibold tracking-wide">
              AXISCAP
            </span>
          </div>
          <Link
            href="/#signup"
            className="text-[12px] font-medium text-white border border-white/20 rounded px-4 py-1.5 hover:bg-white hover:text-black transition-colors duration-200"
          >
            JOIN WAITLIST
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative pt-16 md:pt-24 pb-8 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] text-ax-text-dim tracking-[4px] uppercase mb-5"
          >
            PRODUCT OVERVIEW
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[40px] md:text-[64px] font-bold text-white tracking-[-1.5px] leading-[1.05]"
          >
            The terminal, in full.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 text-[17px] md:text-[20px] text-ax-text-muted font-light max-w-[640px] mx-auto leading-[1.6]"
          >
            A Bloomberg-style research terminal that&apos;s actually free.
            Every module shown below is live in the current build.
          </motion.p>
        </div>
      </section>

      {/* Full-width product image */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="px-4 md:px-8 pb-20"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="relative rounded-xl overflow-hidden border border-ax-border">
            <Image
              src="/product-overview.png"
              alt="AXISCAP Terminal — Full product overview showing Market Heatmap, DCF Valuation Engine, Technical Screener, Equity Fundamentals, Live Charting, and Institutional FX Engine"
              width={2400}
              height={1500}
              className="w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, 1400px"
            />
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06] pointer-events-none" />
          </div>
        </div>
      </motion.section>

      {/* Feature breakdown grid */}
      <section className="px-6 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="border-t border-ax-border pt-16 mb-12">
            <p className="text-[11px] text-ax-text-dim tracking-[4px] uppercase mb-4">
              MODULES
            </p>
            <h2 className="text-[32px] md:text-[44px] font-light text-white tracking-[-1px]">
              Six core modules. Zero hallucinated data.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ax-border rounded-lg overflow-hidden">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-ax-card p-8 md:p-10 hover:bg-ax-card-hover transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[12px] font-mono text-ax-green">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[16px] font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[14px] text-ax-text-muted leading-[1.7]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32">
        <div className="max-w-[560px] mx-auto text-center">
          <div className="border-t border-ax-border pt-16">
            <p className="text-[15px] text-ax-text-muted mb-8 leading-[1.6]">
              Early waitlist members receive priority onboarding and 3 months of
              premium access at launch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#signup"
                className="bg-white text-black font-medium text-[14px] tracking-[0.5px] px-9 py-4 rounded-md hover:bg-[#F0F0F0] transition-colors duration-200"
              >
                REQUEST ACCESS →
              </Link>
              <span className="flex items-center gap-2 text-[14px] font-medium text-ax-text-dim border border-ax-border rounded-md px-7 py-4 cursor-default">
                COMING SOON
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ax-border px-6 py-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <p className="text-[12px] text-ax-text-dim">
            &copy; 2026 AXISCAP. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-[12px] text-ax-text-dim hover:text-white transition-colors"
          >
            axiscap-waitlist.vercel.app
          </Link>
        </div>
      </footer>
    </main>
  );
}
