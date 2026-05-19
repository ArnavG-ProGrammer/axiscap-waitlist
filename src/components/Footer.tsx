import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Top edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-axis-teal/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-[60px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Image
              src="/axiscap-logo.png"
              alt="AXISCAP"
              width={36}
              height={36}
              className="w-9 h-9 object-contain opacity-60"
            />
            <span className="font-mono text-[9px] tracking-[4px] text-axis-text3 uppercase">
              DATA × INTELLIGENCE
            </span>
          </div>

          {/* Center */}
          <div className="flex items-center gap-6">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-axis-text3 hover:text-axis-teal transition-colors duration-200"
            >
              X / Twitter
            </a>
            <span className="text-white/10">|</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-axis-text3 hover:text-axis-teal transition-colors duration-200"
            >
              LinkedIn
            </a>
            <span className="text-white/10">|</span>
            <a
              href="mailto:arnavsgoyal@gmail.com"
              className="font-mono text-[11px] text-axis-text3 hover:text-axis-teal transition-colors duration-200 flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3" />
              Email
            </a>
          </div>

          {/* Right */}
          <p className="font-mono text-[10px] text-axis-text3/60">
            © 2026 AXISCAP. Built by Arnav Goyal.
          </p>
        </div>
      </div>
    </footer>
  );
}
