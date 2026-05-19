"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

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
  const [success, setSuccess] = useState<{ email: string } | null>(null);

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

      setSuccess({ email: form.email });
    } catch {
      setError("Something went wrong. Try again or email arnavsgoyal@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-black border border-ax-border-strong rounded-md px-4 py-3.5 text-[15px] text-white placeholder-ax-text-dim focus:border-ax-green focus:outline-none transition-colors duration-200";

  const selectClass =
    "w-full bg-black border border-ax-border-strong rounded-md px-4 py-3.5 text-[15px] text-white focus:border-ax-green focus:outline-none transition-colors duration-200 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]";

  return (
    <section id="signup" className="py-[120px] md:py-[160px] px-6">
      <div className="max-w-[560px] mx-auto">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-ax-card border border-ax-border rounded-lg p-12 text-center"
            >
              <div className="w-10 h-10 rounded-full border border-ax-green flex items-center justify-center mx-auto mb-6">
                <Check className="w-5 h-5 text-ax-green" />
              </div>
              <h2 className="font-semibold text-[28px] text-white mb-3">
                Access requested.
              </h2>
              <p className="text-[15px] text-ax-text-muted leading-[1.6]">
                Confirmation sent to {success.email}.
                <br />
                We&apos;ll be in touch ahead of launch.
              </p>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-block mt-8 text-[13px] font-medium text-white hover:underline"
              >
                Return to top &uarr;
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <p className="text-[11px] text-ax-text-dim tracking-[3px] uppercase mb-4">
                  ACCESS
                </p>
                <h2 className="font-light text-[36px] md:text-[56px] text-white leading-tight tracking-[-1.5px]">
                  Request terminal access.
                </h2>
                <p className="text-[16px] text-ax-text-muted mt-4 leading-[1.6] max-w-[600px]">
                  Early waitlist members receive priority onboarding and 3 months of premium at launch.
                </p>
              </div>

              <div className="bg-ax-card border border-ax-border rounded-lg p-8 md:p-12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[12px] font-medium text-ax-text-muted tracking-[1px] uppercase mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className={inputClass}
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-ax-text-muted tracking-[1px] uppercase mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-ax-text-muted tracking-[1px] uppercase mb-2">
                      ROLE
                    </label>
                    <select
                      className={selectClass}
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      <option value="" disabled>Select your role</option>
                      <option value="Student">Student</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Trader">Trader</option>
                      <option value="Founder">Founder</option>
                      <option value="Investor">Investor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-ax-text-muted tracking-[1px] uppercase mb-2">
                      PRIMARY INTEREST
                    </label>
                    <select
                      className={selectClass}
                      value={form.interest_area}
                      onChange={(e) => setForm({ ...form, interest_area: e.target.value })}
                    >
                      <option value="" disabled>Select your primary interest</option>
                      <option value="Equity">Equity</option>
                      <option value="Crypto">Crypto</option>
                      <option value="Forex">Forex</option>
                      <option value="Macro">Macro</option>
                      <option value="All of the above">All of the above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-ax-text-muted tracking-[1px] uppercase mb-2">
                      REFERRAL <span className="text-ax-text-dim">(OPTIONAL)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Twitter, friend, search..."
                      className={inputClass}
                      value={form.referral_source}
                      onChange={(e) => setForm({ ...form, referral_source: e.target.value })}
                    />
                  </div>

                  {error && (
                    <p className="text-[13px] text-ax-red text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-white text-black font-semibold text-[14px] tracking-[1px] uppercase py-[18px] rounded-md hover:bg-[#F0F0F0] disabled:opacity-50 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        PROCESSING
                      </>
                    ) : (
                      "REQUEST ACCESS →"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
