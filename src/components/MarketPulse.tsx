"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface SparkData {
  symbol: string;
  label: string;
  changePct: number;
}

// Generate a random sparkline path based on trend direction
function sparklinePath(positive: boolean): string {
  const points: number[] = [];
  let y = 12;
  for (let i = 0; i < 12; i++) {
    const drift = positive ? -0.3 : 0.3;
    y = Math.max(2, Math.min(22, y + drift + (Math.random() - 0.5) * 4));
    points.push(y);
  }
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * 5.5} ${p}`).join(" ");
}

function Sparkline({ positive, animate }: { positive: boolean; animate: boolean }) {
  const path = useRef(sparklinePath(positive));
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (animate && pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
      pathRef.current.getBoundingClientRect();
      pathRef.current.style.transition = "stroke-dashoffset 1s ease-out";
      pathRef.current.style.strokeDashoffset = "0";
    }
  }, [animate]);

  return (
    <svg viewBox="0 0 60 24" className="w-[60px] h-[24px]">
      <path
        ref={pathRef}
        d={path.current}
        fill="none"
        stroke={positive ? "#00FF88" : "#FF4444"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SYMBOLS: { symbol: string; label: string }[] = [
  { symbol: "^GSPC", label: "S&P 500" },
  { symbol: "^IXIC", label: "NASDAQ" },
  { symbol: "^NSEI", label: "NIFTY 50" },
  { symbol: "BTC-USD", label: "BTC" },
  { symbol: "GC=F", label: "GOLD" },
  { symbol: "EURUSD=X", label: "EUR/USD" },
];

export default function MarketPulse() {
  const [data, setData] = useState<SparkData[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/ticker-tape")
        .then((r) => r.json())
        .then((d: Record<string, { price: number; changePct: number }>) => {
          setData(
            SYMBOLS.map((s) => ({
              symbol: s.symbol,
              label: s.label,
              changePct: d[s.symbol]?.changePct ?? 0,
            }))
          );
        })
        .catch(() => {});
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (data.length === 0) return null;

  return (
    <section className="py-[60px] px-6">
      <div ref={ref} className="max-w-[800px] mx-auto bg-ax-card border border-ax-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-ax-green" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-medium text-ax-green tracking-[2px] uppercase">MARKETS LIVE</span>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {data.map((item) => (
            <div key={item.symbol} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-medium text-white">{item.label}</span>
              <Sparkline positive={item.changePct >= 0} animate={isInView} />
              <span className={`font-mono text-[10px] tabular-nums ${item.changePct >= 0 ? "text-ax-green" : "text-ax-red"}`}>
                {item.changePct >= 0 ? "+" : ""}{item.changePct.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
