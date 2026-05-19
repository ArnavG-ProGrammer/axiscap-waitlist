"use client";

import { useEffect, useState } from "react";

interface TickerItem {
  symbol: string;
  price: string;
  changePct: number | null;
}

const DISPLAY_NAMES: Record<string, string> = {
  "^GSPC": "S&P 500",
  "^IXIC": "NASDAQ",
  "^DJI": "DOW",
  "^NSEI": "NIFTY",
  "^BSESN": "SENSEX",
  "^FTSE": "FTSE",
  "^N225": "NIKKEI",
  "^VIX": "VIX",
  "RELIANCE.NS": "RELIANCE",
  "TCS.NS": "TCS",
  "HDFCBANK.NS": "HDFC",
  "INFY.NS": "INFY",
  "ICICIBANK.NS": "ICICI",
  "BTC-USD": "BTC",
  "ETH-USD": "ETH",
  "SOL-USD": "SOL",
  "EURUSD=X": "EUR/USD",
  "USDINR=X": "USD/INR",
  "GBPUSD=X": "GBP/USD",
  "GC=F": "GOLD",
  "CL=F": "OIL",
};

export default function TickerTape() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("/api/ticker-tape")
      .then((r) => r.json())
      .then((data: Record<string, { price: number; changePct: number }>) => {
        setItems(
          Object.entries(data).map(([symbol, info]) => ({
            symbol: DISPLAY_NAMES[symbol] || symbol,
            price: info.price != null ? info.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—",
            changePct: info.changePct ?? null,
          }))
        );
      })
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  const row = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-2 px-5 whitespace-nowrap">
      <span className="text-axis-amber font-mono text-[11px] tracking-wide">{item.symbol}</span>
      <span className="text-white font-mono text-[11px]">{item.price}</span>
      {item.changePct !== null && (
        <span
          className={`font-mono text-[11px] ${
            item.changePct >= 0 ? "text-axis-teal" : "text-axis-red"
          }`}
        >
          {item.changePct >= 0 ? "▲" : "▼"} {Math.abs(item.changePct).toFixed(2)}%
        </span>
      )}
    </span>
  ));

  return (
    <div
      className="relative w-full h-[32px] md:h-[38px] bg-axis-bg overflow-hidden border-y border-axis-border/50 flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-axis-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-axis-bg to-transparent z-10 pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "ticker-scroll 90s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
