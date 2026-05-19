import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-ax-border">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 — Brand */}
          <div>
            <Image
              src="/axiscap-logo.png"
              alt="AXISCAP"
              width={28}
              height={28}
              className="w-7 h-7 object-contain mb-3"
            />
            <p className="font-semibold text-[14px] text-white">AXISCAP</p>
            <p className="text-[12px] text-ax-text-dim mt-1">
              Institutional Research Terminal
            </p>
          </div>

          {/* Column 2 — Contact */}
          <div>
            <p className="text-[11px] font-medium text-ax-text-dim tracking-[2px] uppercase mb-4">
              CONTACT
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:arnavsgoyal@gmail.com"
                className="text-[13px] text-white hover:underline"
              >
                arnavsgoyal@gmail.com
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-ax-text-muted hover:text-white transition-colors duration-150"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-ax-text-muted hover:text-white transition-colors duration-150"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Column 3 — Launch */}
          <div>
            <p className="text-[11px] font-medium text-ax-text-dim tracking-[2px] uppercase mb-4">
              LAUNCH
            </p>
            <p className="text-[14px] font-medium text-white">June 28, 2026</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-ax-green"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="text-[12px] text-ax-text-muted">
                Waitlist open
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ax-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-ax-text-dim">© 2026 AXISCAP</p>
          <p className="text-[12px] text-ax-text-dim">Built by Arnav Goyal</p>
        </div>
      </div>
    </footer>
  );
}
