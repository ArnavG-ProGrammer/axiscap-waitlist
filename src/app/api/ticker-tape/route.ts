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

async function fetchQuote(symbol: string): Promise<{ price: number; changePct: number } | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const meta = json.chart?.result?.[0]?.meta;
    if (!meta) return null;

    const price = meta.regularMarketPrice ?? 0;
    const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? price;
    const changePct = prevClose !== 0 ? ((price - prevClose) / prevClose) * 100 : 0;

    return { price, changePct };
  } catch {
    return null;
  }
}

export async function GET() {
  if (cache && Date.now() - cache.ts < 30000) {
    return NextResponse.json(cache.data);
  }

  const result: Record<string, { price: number; changePct: number }> = {};

  // Fetch all symbols in parallel
  const promises = SYMBOLS.map(async (symbol) => {
    const data = await fetchQuote(symbol);
    if (data) {
      result[symbol] = data;
    }
  });

  await Promise.all(promises);

  // Only cache if we got at least some data
  if (Object.keys(result).length > 0) {
    cache = { data: result, ts: Date.now() };
  }

  return NextResponse.json(result);
}
