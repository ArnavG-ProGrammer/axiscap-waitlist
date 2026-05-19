import { NextResponse } from "next/server";

const SYMBOLS = [
  "^GSPC", "^IXIC", "^DJI", "^NSEI", "^BSESN", "^FTSE", "^N225", "^VIX",
  "AAPL", "MSFT", "NVDA", "GOOGL", "META", "AMZN", "TSLA",
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "BTC-USD", "ETH-USD", "SOL-USD",
  "EURUSD=X", "USDINR=X", "GBPUSD=X",
  "GC=F", "CL=F",
];

let cache: { data: Record<string, { price: number; changePct: number }>; ts: number } | null = null;

export async function GET() {
  if (cache && Date.now() - cache.ts < 20000) {
    return NextResponse.json(cache.data);
  }

  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOLS.join(",")}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!res.ok) throw new Error(`Yahoo Finance returned ${res.status}`);

    const json = await res.json();
    const result: Record<string, { price: number; changePct: number }> = {};

    for (const quote of json.quoteResponse?.result ?? []) {
      result[quote.symbol] = {
        price: quote.regularMarketPrice ?? 0,
        changePct: quote.regularMarketChangePercent ?? 0,
      };
    }

    cache = { data: result, ts: Date.now() };
    return NextResponse.json(result);
  } catch (err) {
    console.error("[AXISCAP] Ticker fetch error:", err);
    // Return empty data with dashes
    const fallback: Record<string, { price: number; changePct: number }> = {};
    for (const s of SYMBOLS) {
      fallback[s] = { price: 0, changePct: 0 };
    }
    return NextResponse.json(fallback);
  }
}
