"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const total = 50;
    const step = () => {
      frame++;
      setDisplay(Math.round((frame / total) * value));
      if (frame < total) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function LiveStats() {
  const [count, setCount] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const fetchCount = () => {
      fetch("/api/stats")
        .then((r) => r.json())
        .then((d) => setCount(d.count ?? 0))
        .catch(() => {});
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE;
    if (launchDate) {
      const diff = Math.max(
        0,
        Math.ceil((new Date(launchDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      );
      setDaysLeft(diff);
    }
  }, []);

  const stats = [
    { value: count, label: "Waitlist Signups" },
    { value: daysLeft, label: "Days Until Launch" },
    { value: 10, label: "Modules Built" },
  ];

  return (
    <section className="py-[120px] px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <p className="font-sans font-light text-[72px] md:text-[96px] text-axis-teal leading-none">
              <AnimatedNumber value={stat.value} />
            </p>
            <p className="font-mono text-[13px] tracking-[3px] uppercase text-axis-text2 mt-4">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
