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
            price:
              info.price != null && info.price !== 0
                ? info.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "—",
            changePct: info.changePct ?? null,
          }))
        );
      })
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  const row = items.map((item, i) => (
    <span
      key={i}
      className="inline-flex items-center gap-2.5 px-6 whitespace-nowrap"
    >
      <span className="text-axis-amber/80 font-mono text-[10px] tracking-[1px] font-medium">
        {item.symbol}
      </span>
      <span className="text-white/80 font-mono text-[11px] tabular-nums">
        {item.price}
      </span>
      {item.changePct !== null && (
        <span
          className={`font-mono text-[10px] tabular-nums ${
            item.changePct >= 0 ? "text-axis-teal/80" : "text-axis-red/80"
          }`}
        >
          {item.changePct >= 0 ? "+" : ""}
          {item.changePct.toFixed(2)}%
        </span>
      )}
      <span className="text-white/5 ml-2">|</span>
    </span>
  ));

  return (
    <div
      className="relative w-full h-[36px] md:h-[40px] overflow-hidden flex items-center glass"
      style={{ borderLeft: "none", borderRight: "none", borderRadius: 0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030508] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030508] to-transparent z-10 pointer-events-none" />

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
