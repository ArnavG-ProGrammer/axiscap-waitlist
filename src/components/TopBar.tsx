"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ZONES = [
  { label: "NYC", tz: "America/New_York" },
  { label: "LON", tz: "Europe/London" },
  { label: "FRA", tz: "Europe/Berlin" },
  { label: "MUM", tz: "Asia/Kolkata" },
  { label: "TOK", tz: "Asia/Tokyo" },
];

export default function TopBar() {
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const update = () => {
      setTimes(
        ZONES.map((z) =>
          new Date().toLocaleTimeString("en-US", {
            timeZone: z.tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
        )
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="flex items-center justify-between h-11 px-5 max-w-[1400px] mx-auto">
        {/* Left — Logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/axiscap-logo.png"
            alt="AXISCAP"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span className="text-white text-[14px] font-semibold tracking-wide hidden sm:inline">
            AXISCAP
          </span>
        </div>

        {/* Center — World clocks */}
        <div className="hidden md:flex items-center gap-6">
          {ZONES.map((z, i) => (
            <div key={z.label} className="flex items-center gap-2">
              <span className="text-[11px] text-ax-text-dim uppercase tracking-[1px]">
                {z.label}
              </span>
              <span className="text-[12px] text-white font-mono tabular-nums">
                {times[i] || "--:--:--"}
              </span>
            </div>
          ))}
        </div>

        {/* Right — CTA */}
        <a
          href="#signup"
          className="text-[12px] font-medium text-white border border-white/20 rounded px-4 py-1.5 hover:bg-white hover:text-black transition-colors duration-200"
        >
          JOIN WAITLIST
        </a>
      </div>
    </div>
  );
}
