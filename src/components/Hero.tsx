"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

function Particles() {
  const particles = useRef(
    Array.from({ length: 14 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 20 + Math.random() * 25,
      delay: Math.random() * 8,
      size: 1 + Math.random() * 2,
      opacity: 0.08 + Math.random() * 0.15,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, rgba(0,230,172,${p.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 8}px rgba(0,230,172,${p.opacity * 0.5})`,
          }}
          animate={{
            x: [0, 40, -30, 10, 0],
            y: [0, -35, 20, -10, 0],
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
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-[#030508]" />

      {/* Large radial glow — top center */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,230,172,0.06) 0%, rgba(0,230,172,0.02) 30%, transparent 65%)",
        }}
      />

      {/* Secondary glow — bottom right */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(74,158,255,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "grid-drift 40s linear infinite",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(3,5,8,0.9) 100%)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise absolute inset-0 pointer-events-none" />

      <Particles />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Logo with glow */}
        <motion.div
          variants={fadeUp}
          className="relative"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <div
            className="absolute inset-0 blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, rgba(0,230,172,0.4), transparent 70%)" }}
          />
          <Image
            src="/axiscap-logo.png"
            alt="AXISCAP"
            width={280}
            height={80}
            className="relative w-[180px] md:w-[260px] drop-shadow-[0_0_30px_rgba(0,230,172,0.2)]"
            preload
          />
        </motion.div>

        {/* Tagline badge */}
        <motion.div variants={fadeUp} className="mt-8">
          <span className="inline-block glass rounded-full px-5 py-2 font-mono text-[11px] md:text-[12px] text-axis-teal tracking-[5px] uppercase">
            DATA × INTELLIGENCE
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          className="mt-12 md:mt-16 font-sans font-light text-[38px] md:text-[68px] lg:text-[80px] leading-[1.05] text-white tracking-[-0.02em]"
        >
          The Institutional
          <br />
          <span className="teal-text-glow text-axis-teal">Research Terminal</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={fadeUp}
          className="mt-6 md:mt-8 font-sans font-light text-[15px] md:text-[20px] text-axis-text2 max-w-xl leading-relaxed"
        >
          Built for the next generation of quants, traders, and analysts.
        </motion.p>

        {/* CTA Button — glass style */}
        <motion.a
          variants={fadeUp}
          href="#signup"
          className="group mt-10 md:mt-14 relative inline-flex items-center gap-3 overflow-hidden rounded-lg bg-axis-teal/10 border border-axis-teal/30 px-10 py-4 font-mono text-[13px] tracking-[2px] uppercase text-axis-teal hover:bg-axis-teal/20 hover:border-axis-teal/50 hover:shadow-[0_0_40px_rgba(0,230,172,0.15)] transition-all duration-300"
        >
          <span className="relative z-10">Request Access</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
        </motion.a>

        {/* Waitlist count */}
        <motion.p variants={fadeUp} className="mt-5 font-mono text-[12px] text-axis-text3">
          {count === null
            ? "..."
            : count === 0
            ? "Be the first on the waitlist."
            : `Join ${count}+ on the waitlist`}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
        style={{ animation: "bounce-arrow 2.5s ease-in-out infinite" }}
      >
        <span className="font-mono text-[9px] tracking-[3px] text-axis-text3 uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-axis-text3" />
      </div>
    </section>
  );
}
