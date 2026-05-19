"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bell } from "lucide-react";

const NAV_ITEMS = ["Dashboard", "Surf Market", "Portfolio", "Transactions", "Heatmap", "Screener"];

const CLOCKS = [
  { label: "NYC", time: "09:41:22" },
  { label: "LON", time: "14:41:22" },
  { label: "FRA", time: "15:41:22" },
  { label: "MUM", time: "20:11:22" },
  { label: "TOK", time: "23:41:22" },
];

const STATS = [
  { label: "S&P 500", value: "5,832.40", change: "+0.74%", positive: true },
  { label: "NASDAQ", value: "16,274.94", change: "+1.12%", positive: true },
  { label: "NIFTY 50", value: "22,438.10", change: "-0.31%", positive: false },
  { label: "VIX", value: "13.11", change: "-2.1%", positive: false, note: "Low Volatility" },
];

const CHART_MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const CHART_PRICES = ["₹2,950", "₹2,850", "₹2,750", "₹2,650"];
const TIMEFRAMES = ["1D", "1W", "1M", "3M", "1Y", "MAX"];

// A realistic uptrending curve for RELIANCE
const CHART_PATH = "M 0 180 C 30 170, 60 160, 90 155 C 120 150, 150 140, 180 120 C 210 100, 240 110, 270 95 C 300 80, 330 85, 360 70 C 390 55, 420 60, 450 45 C 480 35, 510 25, 540 20";
const FILL_PATH = CHART_PATH + " L 540 200 L 0 200 Z";

function AnimatedChart() {
  const ref = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (isInView && ref.current && !drawn) {
      const length = ref.current.getTotalLength();
      ref.current.style.strokeDasharray = `${length}`;
      ref.current.style.strokeDashoffset = `${length}`;
      ref.current.getBoundingClientRect(); // force reflow
      ref.current.style.transition = "stroke-dashoffset 1.5s ease-out";
      ref.current.style.strokeDashoffset = "0";
      setDrawn(true);
    }
  }, [isInView, drawn]);

  return (
    <div ref={containerRef} className="relative w-full h-[200px] md:h-[240px] bg-black rounded-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <span className="text-[14px] font-medium text-white">RELIANCE.NS</span>
        <span className="font-mono text-[14px] text-white tabular-nums">₹2,890.42</span>
        <span className="font-mono text-[12px] text-ax-green tabular-nums">+1.47%</span>
      </div>

      {/* Chart SVG */}
      <svg viewBox="0 0 540 200" className="w-full h-[140px] md:h-[170px] px-2" preserveAspectRatio="none">
        {/* Grid lines */}
        {[50, 100, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2="540" y2={y} stroke="#1F1F1F" strokeWidth="0.5" />
        ))}
        {/* Fill */}
        <path
          d={FILL_PATH}
          fill="url(#greenGrad)"
          opacity={drawn ? 0.15 : 0}
          style={{ transition: "opacity 1.5s ease-out" }}
        />
        {/* Line */}
        <path
          ref={ref}
          d={CHART_PATH}
          fill="none"
          stroke="#00FF88"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* X-axis labels */}
      <div className="absolute bottom-1 left-4 right-4 flex justify-between">
        {CHART_MONTHS.map((m) => (
          <span key={m} className="font-mono text-[10px] text-ax-text-dim">{m}</span>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute top-10 right-3 flex flex-col justify-between h-[130px] md:h-[160px]">
        {CHART_PRICES.map((p) => (
          <span key={p} className="font-mono text-[10px] text-ax-text-dim">{p}</span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1280px] mx-auto px-6 md:px-8 mt-20 mb-[120px]"
    >
      {/* Dashboard card */}
      <div
        className="relative bg-ax-card border border-ax-border rounded-xl overflow-hidden"
        style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}
      >
        {/* LIVE PREVIEW tag */}
        <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ax-green" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-medium text-ax-green tracking-[2px] uppercase">LIVE PREVIEW</span>
        </div>

        {/* Top strip */}
        <div className="flex items-center justify-between h-[44px] px-4 border-b border-ax-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-ax-border-strong flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">AX</span>
            </div>
            <span className="text-[13px] font-semibold text-white hidden sm:inline">AXISCAP</span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            {CLOCKS.map((c) => (
              <div key={c.label} className="flex items-center gap-1.5">
                <span className="text-[10px] text-ax-text-dim uppercase tracking-[1px]">{c.label}</span>
                <span className="font-mono text-[11px] text-white tabular-nums">{c.time}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-ax-text-dim" />
            <div className="w-7 h-7 rounded-full bg-ax-border-strong flex items-center justify-center">
              <span className="text-[10px] font-semibold text-white">AR</span>
            </div>
          </div>
        </div>

        {/* Sub-strip ticker */}
        <div className="h-[32px] bg-ax-bg-subtle border-b border-ax-border flex items-center overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "ticker-scroll 100s linear infinite" }}>
            {[
              { s: "AAPL", p: "213.42", c: "+0.82%" },
              { s: "NVDA", p: "878.36", c: "+2.14%" },
              { s: "MSFT", p: "425.12", c: "+0.53%" },
              { s: "GOOGL", p: "174.80", c: "-0.28%" },
              { s: "META", p: "502.61", c: "+1.37%" },
              { s: "AMZN", p: "186.49", c: "+0.91%" },
              { s: "TSLA", p: "178.22", c: "-1.15%" },
              { s: "BTC-USD", p: "67,842", c: "+3.21%" },
              { s: "ETH-USD", p: "3,812", c: "+2.47%" },
              { s: "RELIANCE", p: "2,890", c: "+1.47%" },
              { s: "TCS", p: "3,945", c: "+0.62%" },
              { s: "HDFCBANK", p: "1,612", c: "-0.18%" },
            ].flatMap((t, _, arr) => [t, ...arr]).map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-4 whitespace-nowrap">
                <span className="text-[11px] font-medium text-white">{t.s}</span>
                <span className="font-mono text-[11px] text-white tabular-nums">{t.p}</span>
                <span className={`font-mono text-[10px] tabular-nums ${t.c.startsWith("+") ? "text-ax-green" : "text-ax-red"}`}>{t.c}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main body */}
        <div className="flex min-h-[420px] md:min-h-[480px]">
          {/* Sidebar — hidden on mobile */}
          <div className="hidden md:flex flex-col w-[160px] border-r border-ax-border py-3 px-2 shrink-0">
            {NAV_ITEMS.map((item) => (
              <div
                key={item}
                className={`px-3 py-2 rounded text-[13px] font-medium ${
                  item === "Dashboard"
                    ? "bg-white text-black"
                    : "text-ax-text-muted hover:text-white"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Center */}
          <div className="flex-1 p-4 md:p-5 min-w-0">
            <h3 className="text-[18px] font-semibold text-white mb-4">Market Overview</h3>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-black border border-ax-border rounded-md p-3 md:p-4">
                  <p className="text-[11px] font-medium text-ax-text-muted tracking-[1px] uppercase mb-1">
                    {stat.label}
                  </p>
                  <p className="font-mono text-[20px] md:text-[24px] text-white tabular-nums leading-tight">
                    {stat.value}
                  </p>
                  <p className={`font-mono text-[12px] tabular-nums mt-1 ${stat.positive ? "text-ax-green" : "text-ax-red"}`}>
                    {stat.positive ? "↗" : "↘"} {stat.change}
                    {stat.note && <span className="text-ax-text-dim ml-1.5 text-[10px] font-sans">({stat.note})</span>}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <AnimatedChart />

            {/* Timeframe pills */}
            <div className="flex items-center gap-1 mt-3">
              {TIMEFRAMES.map((tf) => (
                <span
                  key={tf}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                    tf === "1M"
                      ? "text-white border-b-2 border-ax-green"
                      : "text-ax-text-dim"
                  }`}
                >
                  {tf}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — hidden on mobile */}
          <div className="hidden lg:flex flex-col w-[220px] border-l border-ax-border p-4 shrink-0">
            <p className="text-[11px] font-medium text-ax-text-muted tracking-[1px] uppercase mb-3">
              AI Insights
            </p>
            <div className="bg-black border border-ax-border rounded-md p-3 mb-4">
              <span className="text-[9px] font-medium text-ax-green tracking-[1px] uppercase">GROUNDED</span>
              <p className="text-[12px] text-white leading-[1.5] mt-2">
                RELIANCE shows strong upward momentum. Q4 revenue grew 18%. Energy segment outperforming.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              {[
                { label: "Risk Level", value: "LOW", green: true },
                { label: "Growth Outlook", value: "BULLISH", green: true },
                { label: "P/E Ratio", value: "28.1x", green: false },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-ax-text-muted">{row.label}</span>
                  <span className={`font-mono text-[12px] tabular-nums ${row.green ? "text-ax-green" : "text-white"}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
