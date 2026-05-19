"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Heatmap Preview ── */

const HEATMAP_CELLS = [
  // Row 1 — large caps
  { ticker: "RELIANCE", pct: 1.47, w: 3, h: 2 },
  { ticker: "HDFCBANK", pct: -0.18, w: 2, h: 2 },
  { ticker: "TCS", pct: 0.62, w: 2, h: 2 },
  // Row 2
  { ticker: "INFY", pct: -0.89, w: 2, h: 1 },
  { ticker: "ITC", pct: 0.34, w: 1, h: 1 },
  { ticker: "BAJFINANCE", pct: -1.21, w: 2, h: 1 },
  { ticker: "ICICIBANK", pct: 0.57, w: 2, h: 1 },
  // Row 3
  { ticker: "KOTAKBANK", pct: -0.43, w: 2, h: 1 },
  { ticker: "AXISBANK", pct: 0.91, w: 1, h: 1 },
  { ticker: "BHARTIARTL", pct: 1.73, w: 2, h: 1 },
  { ticker: "LT", pct: -0.12, w: 1, h: 1 },
  { ticker: "ADANIENT", pct: 2.18, w: 1, h: 1 },
];

function cellColor(pct: number) {
  if (pct >= 1.5) return "#0A3520";
  if (pct >= 0.5) return "#0C2D1C";
  if (pct >= 0) return "#0F2518";
  if (pct >= -0.5) return "#251510";
  if (pct >= -1) return "#2D1210";
  return "#3A1010";
}

function HeatmapPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="bg-ax-card border border-ax-border rounded-lg p-4 overflow-hidden">
      <p className="text-[10px] font-medium text-ax-text-dim tracking-[2px] uppercase mb-3">
        NSE MARKET HEATMAP · 153 STOCKS
      </p>
      <div className="grid grid-cols-7 gap-1 auto-rows-[48px]">
        {HEATMAP_CELLS.map((cell, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="rounded flex flex-col items-center justify-center"
            style={{
              backgroundColor: cellColor(cell.pct),
              gridColumn: `span ${cell.w}`,
              gridRow: `span ${cell.h}`,
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <span className="text-[11px] font-semibold text-white">{cell.ticker}</span>
            <span className={`font-mono text-[10px] tabular-nums ${cell.pct >= 0 ? "text-ax-green" : "text-ax-red"}`}>
              {cell.pct >= 0 ? "+" : ""}{cell.pct.toFixed(2)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Screener Preview ── */

const CATEGORIES = [
  {
    title: "DEEP VALUE",
    items: [
      { ticker: "META", signal: "-24.5% Discount" },
      { ticker: "PYPL", signal: "-31.2% Discount" },
    ],
  },
  {
    title: "MOMENTUM SURGE",
    items: [
      { ticker: "NVDA", signal: "Strong Buy" },
      { ticker: "AMD", signal: "Breakout" },
    ],
  },
  {
    title: "INST. DISTRIBUTION",
    items: [
      { ticker: "CVX", signal: "High Risk" },
      { ticker: "INTC", signal: "Weakness" },
    ],
  },
];

const SCREENER_ROWS = [
  { ticker: "NVDA", price: "878.36", chg: "+2.14%", vol: "42.1M", mcap: "2.16T", pe: "64.3x", positive: true },
  { ticker: "AAPL", price: "213.42", chg: "+0.82%", vol: "51.7M", mcap: "3.28T", pe: "33.1x", positive: true },
  { ticker: "MSFT", price: "425.12", chg: "+0.53%", vol: "19.4M", mcap: "3.15T", pe: "36.8x", positive: true },
  { ticker: "AMZN", price: "186.49", chg: "-0.28%", vol: "38.2M", mcap: "1.94T", pe: "58.7x", positive: false },
];

function ScreenerPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="bg-ax-card border border-ax-border rounded-lg p-4 overflow-hidden">
      <p className="text-[10px] font-medium text-ax-text-dim tracking-[2px] uppercase mb-3">
        TECHNICAL SCREENER · 7,891 MATCHES
      </p>

      {/* Category cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {CATEGORIES.map((cat, ci) => (
          <div key={ci} className="bg-black border border-ax-border rounded p-2.5">
            <p className="text-[9px] font-medium text-ax-text-dim tracking-[1px] uppercase mb-2">{cat.title}</p>
            {cat.items.map((item, ii) => (
              <div key={ii} className="flex items-center justify-between py-1">
                <span className="text-[11px] font-medium text-white">{item.ticker}</span>
                <span className={`text-[10px] ${ci === 2 ? "text-ax-red" : "text-ax-green"}`}>{item.signal}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ax-border">
              {["TICKER", "PRICE", "CHG%", "VOL", "MKT CAP", "P/E"].map((h) => (
                <th key={h} className="text-[10px] font-medium text-ax-text-dim tracking-[1px] uppercase py-2 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCREENER_ROWS.map((row, ri) => (
              <motion.tr
                key={ri}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + ri * 0.08, duration: 0.4 }}
                className="border-b border-ax-border/50"
              >
                <td className="text-[12px] font-medium text-white py-2.5 pr-3">{row.ticker}</td>
                <td className="font-mono text-[12px] text-white tabular-nums pr-3">{row.price}</td>
                <td className={`font-mono text-[12px] tabular-nums pr-3 ${row.positive ? "text-ax-green" : "text-ax-red"}`}>{row.chg}</td>
                <td className="font-mono text-[12px] text-ax-text-muted tabular-nums pr-3">{row.vol}</td>
                <td className="font-mono text-[12px] text-ax-text-muted tabular-nums pr-3">{row.mcap}</td>
                <td className="font-mono text-[12px] text-white tabular-nums pr-3">{row.pe}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Stock Detail Preview ── */

const CANDLES = [
  { o: 60, c: 40, h: 30, l: 65 }, { o: 40, c: 50, h: 25, l: 55 },
  { o: 50, c: 35, h: 20, l: 55 }, { o: 35, c: 45, h: 18, l: 50 },
  { o: 45, c: 30, h: 15, l: 50 }, { o: 30, c: 38, h: 12, l: 42 },
  { o: 38, c: 25, h: 10, l: 42 }, { o: 25, c: 35, h: 8, l: 40 },
  { o: 35, c: 20, h: 5, l: 38 }, { o: 20, c: 28, h: 3, l: 32 },
  { o: 28, c: 15, h: 2, l: 32 }, { o: 15, c: 22, h: 5, l: 28 },
  { o: 22, c: 12, h: 2, l: 26 }, { o: 12, c: 18, h: 3, l: 22 },
  { o: 18, c: 10, h: 2, l: 22 }, { o: 10, c: 15, h: 3, l: 18 },
];

function StockDetailPreview() {
  return (
    <div className="bg-ax-card border border-ax-border rounded-lg p-4 overflow-hidden">
      {/* Ticker header */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[16px] font-semibold text-white">REC LIMITED</span>
          <span className="text-[12px] text-ax-text-muted">(RECLTD.NS)</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1 flex-wrap">
          <span className="font-mono text-[22px] text-white tabular-nums">₹334.25</span>
          <span className="font-mono text-[13px] text-ax-green tabular-nums">+₹0.55 (+0.16%)</span>
          <span className="text-[11px] text-ax-text-dim">Market Price (INR)</span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { label: "EPS (TTM)", value: "₹61.80", green: true },
          { label: "FORWARD EPS", value: "₹71.10", green: false },
          { label: "P/E (TTM)", value: "5.41x", green: false },
          { label: "FORWARD P/E", value: "4.70x", green: false },
        ].map((m) => (
          <div key={m.label} className="bg-black border border-ax-border rounded p-2.5">
            <p className="text-[9px] text-ax-text-dim tracking-[1px] uppercase">{m.label}</p>
            <p className={`font-mono text-[14px] tabular-nums mt-1 ${m.green ? "text-ax-green" : "text-white"}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-ax-border mb-4 overflow-x-auto">
        {["Terminal Overview", "AI Analysis", "Compare Matrix", "DCF Valuation", "Backtester"].map((tab, i) => (
          <span
            key={tab}
            className={`whitespace-nowrap text-[11px] font-medium px-3 py-2 ${
              i === 0 ? "text-white border-b-2 border-ax-green" : "text-ax-text-dim"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Candlestick chart */}
      <div className="relative h-[120px] md:h-[160px] bg-black rounded border border-ax-border overflow-hidden">
        <svg viewBox="0 0 320 100" className="w-full h-full" preserveAspectRatio="none">
          {CANDLES.map((c, i) => {
            const x = 10 + i * 19;
            const isGreen = c.c < c.o;
            const bodyTop = Math.min(c.o, c.c);
            const bodyH = Math.abs(c.o - c.c);
            return (
              <g key={i}>
                <line x1={x + 3.5} y1={c.h} x2={x + 3.5} y2={c.l} stroke={isGreen ? "#00FF88" : "#FF4444"} strokeWidth="1" />
                <rect x={x} y={bodyTop} width="7" height={Math.max(bodyH, 1)} fill={isGreen ? "#00FF88" : "#FF4444"} rx="0.5" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Indicator pills */}
      <div className="flex items-center gap-2 mt-3">
        {["EMA", "VWAP", "MACD"].map((ind) => (
          <span key={ind} className="flex items-center gap-1.5 text-[10px] font-medium text-ax-text-muted bg-black border border-ax-border rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-ax-green" />
            {ind}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ── */

const BLOCKS = [
  {
    number: "01",
    title: "Market heatmaps for every exchange.",
    body: "Visual sector-grouped overviews of NSE, BSE, and US markets. 153 stocks per exchange, live proportional analysis.",
    Visual: HeatmapPreview,
  },
  {
    number: "02",
    title: "Screen 7,800+ securities by valuation, momentum, and technicals.",
    body: "Filter by P/E, market cap, RSI, MACD, volume, EPS, and 40+ other metrics. Saved screens auto-refresh.",
    Visual: ScreenerPreview,
  },
  {
    number: "03",
    title: "Every stock, fully dissected.",
    body: "Core analytics, equity fundamentals, valuation models, insider activity, and AI-grounded analysis — one page per security.",
    Visual: StockDetailPreview,
  },
];

export default function FeatureWalkthrough() {
  return (
    <section className="py-[120px] md:py-[160px] px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[11px] text-ax-text-dim tracking-[3px] uppercase mb-4">
            THE TERMINAL
          </p>
          <h2 className="font-light text-[36px] md:text-[56px] text-white leading-tight tracking-[-1.5px]">
            Designed for serious operators.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-[120px]">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col gap-10 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              } md:items-start md:gap-16`}
            >
              {/* Text */}
              <div className="md:w-[40%] md:sticky md:top-32 shrink-0">
                <span className="font-mono text-[14px] text-ax-text-dim">{block.number}</span>
                <h3 className="font-semibold text-[28px] md:text-[36px] text-white tracking-[-1px] leading-tight mt-3 mb-4">
                  {block.title}
                </h3>
                <p className="text-[16px] text-ax-text-muted leading-[1.6]">
                  {block.body}
                </p>
              </div>

              {/* Visual */}
              <div className="md:w-[60%] min-w-0">
                <block.Visual />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
