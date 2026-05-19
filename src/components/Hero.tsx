"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

function Particles() {
  const particles = useRef(
    Array.from({ length: 10 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 2 + Math.random() * 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-axis-teal"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.2,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,212,160,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,160,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,160,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "grid-drift 30s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      <Particles />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} style={{ animation: "float 6s ease-in-out infinite" }}>
          <Image
            src="/axiscap-logo.png"
            alt="AXISCAP"
            width={280}
            height={80}
            className="w-[200px] md:w-[280px] drop-shadow-[0_0_20px_rgba(0,212,160,0.3)]"
            preload
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-mono text-[14px] text-axis-teal tracking-[6px] uppercase"
        >
          DATA × INTELLIGENCE
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-[60px] font-sans font-light text-[44px] md:text-[72px] leading-[1.05] text-white tracking-tight"
        >
          The Institutional Research Terminal
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-sans font-light text-[16px] md:text-[22px] text-axis-text2"
        >
          Built for the next generation of quants, traders, and analysts.
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="#signup"
          className="mt-12 inline-block bg-axis-teal text-black font-mono text-[14px] tracking-[2px] uppercase px-10 py-4 rounded hover:scale-105 transition-transform duration-200"
        >
          REQUEST ACCESS →
        </motion.a>

        <motion.p variants={fadeUp} className="mt-6 font-mono text-[13px] text-axis-text3">
          {count === null
            ? "..."
            : count === 0
            ? "Be the first."
            : `Join ${count}+ on the waitlist`}
        </motion.p>
      </motion.div>

      {/* Scroll arrow */}
      <div
        className="absolute bottom-8 z-10"
        style={{ animation: "bounce-arrow 2s ease-in-out infinite" }}
      >
        <ChevronDown className="w-6 h-6 text-axis-text3" />
      </div>
    </section>
  );
}
