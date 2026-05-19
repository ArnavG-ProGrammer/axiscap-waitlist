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
      className="inline-flex items-center gap-2 px-5 whitespace-nowrap"
    >
      <span className="text-white font-medium text-[12px]">
        {item.symbol}
      </span>
      <span className="text-white font-mono text-[12px] tabular-nums">
        {item.price}
      </span>
      {item.changePct !== null && (
        <span
          className={`font-mono text-[11px] tabular-nums ${
            item.changePct >= 0 ? "text-ax-green" : "text-ax-red"
          }`}
        >
          {item.changePct >= 0 ? "+" : ""}
          {item.changePct.toFixed(2)}%
        </span>
      )}
    </span>
  ));

  return (
    <div
      className="w-full h-[36px] bg-ax-bg-subtle overflow-hidden flex items-center border-b border-ax-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "ticker-scroll 120s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
