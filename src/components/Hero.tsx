"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 overflow-hidden">
      {/* Layer 1 — Faded dashboard background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/og-image.png"
          alt=""
          fill
          className="object-cover opacity-[0.55] md:opacity-[0.70]"
          style={{
            filter: "blur(1px) saturate(0.8) brightness(0.7)",
          }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Layer 2 — Radial vignette overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Layer 3 — Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] z-[2]"
        style={{
          background: "linear-gradient(to bottom, transparent, #000000)",
        }}
      />

      {/* Layer 4 — Subtle green glow behind logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Waitlist pill — top left */}
      <motion.div
        {...fadeIn(0)}
        className="absolute top-10 left-6 md:left-10 flex items-center gap-2 z-10"
      >
        <span
          className="w-2 h-2 rounded-full bg-ax-green"
          style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
        />
        <span className="text-[11px] font-medium text-white tracking-[2px] uppercase border border-white/15 rounded-full px-3 py-1">
          WAITLIST
        </span>
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <motion.div {...fadeIn(0.08)}>
          <Image
            src="/axiscap-logo.png"
            alt="AXISCAP"
            width={180}
            height={180}
            className="w-[120px] md:w-[180px]"
            preload
          />
        </motion.div>

        <motion.h1
          {...fadeIn(0.16)}
          className="mt-10 text-[48px] md:text-[64px] font-bold text-white tracking-[-1px] leading-[1.05]"
        >
          AXISCAP
        </motion.h1>

        <motion.p
          {...fadeIn(0.24)}
          className="mt-3 text-[18px] md:text-[24px] font-light text-ax-text-muted"
        >
          Institutional Research Terminal
        </motion.p>

        <motion.a
          {...fadeIn(0.32)}
          href="#signup"
          className="mt-14 inline-block bg-white text-black font-medium text-[14px] tracking-[0.5px] px-9 py-4 rounded-md hover:bg-[#F0F0F0] transition-colors duration-200"
        >
          REQUEST ACCESS →
        </motion.a>

        <motion.p
          {...fadeIn(0.4)}
          className="mt-6 text-[13px] text-ax-text-dim"
        >
          Limited early access. Launch June 28, 2026.
        </motion.p>
      </div>

      {/* Bottom separator — on top of fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-ax-border z-[3]" />
    </section>
  );
}
