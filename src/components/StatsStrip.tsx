"use client";

const stats = [
  { number: "10", label: "Core modules" },
  { number: "12", label: "Global exchanges" },
  { number: "7,800+", label: "Securities covered" },
  { number: "0", label: "Hallucinated values" },
];

export default function StatsStrip() {
  return (
    <section className="py-[60px] px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`text-center py-6 md:py-0 ${
              i < stats.length - 1 ? "md:border-r md:border-ax-border" : ""
            }`}
          >
            <p className="font-light text-[48px] md:text-[80px] text-white leading-none tabular-nums">
              {stat.number}
            </p>
            <p className="text-[12px] font-medium text-ax-text-muted tracking-[2px] uppercase mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
