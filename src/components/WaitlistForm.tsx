"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Copy, Check } from "lucide-react";

function CountUp({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  useState(() => {
    let frame = 0;
    const total = 40;
    const step = () => {
      frame++;
      setVal(Math.round((frame / total) * target));
      if (frame < total) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  return <>{val}</>;
}

export default function WaitlistForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: "",
    interest_area: "",
    referral_source: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ position: number; email: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email || !form.role || !form.interest_area) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.status === 409) {
        setError("You're already on the list — check your inbox for your confirmation.");
        return;
      }
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again or email arnavsgoyal@gmail.com");
        return;
      }

      setSuccess({ position: data.position, email: form.email });
    } catch {
      setError("Something went wrong. Try again or email arnavsgoyal@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-axis-bg border border-axis-border rounded px-4 py-3.5 font-mono text-[14px] text-white placeholder-axis-text3 focus:border-axis-teal focus:outline-none transition-colors";

  const selectClass =
    "w-full bg-axis-bg border border-axis-border rounded px-4 py-3.5 font-mono text-[14px] text-white focus:border-axis-teal focus:outline-none transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23525e72%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]";

  const copyLink = () => {
    navigator.clipboard.writeText("https://axiscap-waitlist.vercel.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="signup" className="py-[120px] px-6">
      <div className="max-w-[560px] mx-auto">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <CheckCircle className="w-16 h-16 text-axis-teal mb-6" />
              <h2 className="font-sans font-light text-[28px] text-white mb-2">
                You&apos;re on the list.
              </h2>
              <p className="font-sans font-light text-[64px] text-axis-teal leading-none mt-4 mb-4">
                #<CountUp target={success.position} />
              </p>
              <p className="font-mono text-[14px] text-axis-text2 mt-4 leading-[1.6]">
                We sent a confirmation to {success.email}.
                <br />
                Watch for early access details.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "Just joined the AXISCAP waitlist — an institutional-grade research terminal for the next gen. Check it out:"
                  )}&url=${encodeURIComponent("https://axiscap-waitlist.vercel.app")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] tracking-[1px] text-axis-text2 hover:text-axis-teal transition-colors px-4 py-2 border border-axis-border rounded"
                >
                  SHARE ON X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    "https://axiscap-waitlist.vercel.app"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] tracking-[1px] text-axis-text2 hover:text-axis-teal transition-colors px-4 py-2 border border-axis-border rounded"
                >
                  LINKEDIN
                </a>
                <button
                  onClick={copyLink}
                  className="font-mono text-[12px] tracking-[1px] text-axis-text2 hover:text-axis-teal transition-colors px-4 py-2 border border-axis-border rounded flex items-center gap-2"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "COPIED" : "COPY LINK"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-sans font-semibold text-[36px] md:text-[52px] text-white text-center tracking-[-1px] leading-tight">
                JOIN THE WAITLIST
              </h2>
              <p className="font-mono text-[15px] text-axis-text2 text-center mt-4 leading-[1.6]">
                Be first to access AXISCAP when we open. Early members get 3 months of premium free.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
                <input
                  type="text"
                  placeholder="Your full name"
                  className={inputClass}
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <select
                  className={selectClass}
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="Student">Student</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Trader">Trader</option>
                  <option value="Founder">Founder</option>
                  <option value="Investor">Investor</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  className={selectClass}
                  value={form.interest_area}
                  onChange={(e) => setForm({ ...form, interest_area: e.target.value })}
                >
                  <option value="" disabled>
                    Primary interest
                  </option>
                  <option value="Equity">Equity</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Forex">Forex</option>
                  <option value="Macro">Macro</option>
                  <option value="All of the above">All of the above</option>
                </select>
                <input
                  type="text"
                  placeholder="How did you hear about us? (optional)"
                  className={inputClass}
                  value={form.referral_source}
                  onChange={(e) => setForm({ ...form, referral_source: e.target.value })}
                />

                {error && (
                  <p className="font-mono text-[13px] text-axis-red text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-axis-teal text-black font-mono text-[14px] tracking-[2px] uppercase py-4 rounded hover:scale-[1.02] hover:brightness-110 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    "REQUEST ACCESS →"
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
