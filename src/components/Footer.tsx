import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-axis-teal/30">
      <div className="max-w-6xl mx-auto px-6 py-[60px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Image src="/axiscap-logo.png" alt="AXISCAP" width={40} height={40} className="w-10 h-10 object-contain" />
            <span className="font-mono text-[10px] tracking-[4px] text-axis-text3 uppercase">
              DATA × INTELLIGENCE
            </span>
          </div>

          {/* Center */}
          <div className="flex items-center gap-6">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-axis-text2 hover:text-axis-teal transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-axis-text2 hover:text-axis-teal transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:arnavsgoyal@gmail.com"
              className="font-mono text-[12px] text-axis-text2 hover:text-axis-teal transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3" />
              Email
            </a>
          </div>

          {/* Right */}
          <p className="font-mono text-[11px] text-axis-text3">
            © 2026 AXISCAP. Built by Arnav Goyal.
          </p>
        </div>
      </div>
    </footer>
  );
}
