import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { loginAdmin } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { brand } from "../lib/brand";

const HERO_IMAGE =
  "https://discoverysamal.com/wp-content/uploads/2026/03/RCB05408.jpg";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginAdmin({
        email: form.email,
        password: form.password,
      });
      const { token, admin, refreshToken: rt } = res.data.data;
      login(token, admin, rt);
      toast.success("Welcome back");
      navigate("/owner", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-ivory">
      {/* ─── LEFT: cinematic resort visual ──────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-ocean">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
          src={HERO_IMAGE}
          alt={brand.displayName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean/85 via-ocean/55 to-ocean/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean/95 via-transparent to-transparent" />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(0,140,140,0.5) 0%, transparent 55%)",
          }}
        />

        {/* Top brand strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="absolute top-10 left-12 z-10 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-teal flex items-center justify-center text-ocean font-serif font-bold text-sm">
            {brand.initials}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-ivory/60">
              Admin Portal
            </p>
            <p className="font-serif text-sm text-ivory mt-0.5">
              {brand.displayName}
            </p>
          </div>
        </motion.div>

        {/* Floating glass badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute top-32 right-10 z-10 flex items-center gap-2 border border-ivory/15 bg-ocean/40 backdrop-blur-xl px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-ivory/80"
        >
          <Sparkles className="w-3 h-3 text-teal" />
          Secure Concierge Access
        </motion.div>

        {/* Welcome content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-12 pb-16 max-w-md">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-teal mb-5 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-teal" />
            Welcome Back
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.9,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className="font-serif text-4xl xl:text-5xl text-ivory leading-[1.1]"
          >
            Manage your{" "}
            <span className="italic text-teal">island sanctuary</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="mt-6 text-sm text-ivory/70 leading-relaxed"
          >
            Manage reservations, rooms, special offers, and guest experiences —
            all from a single elegant workspace.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-ivory/15"
          >
            {[
              { v: "24/7", l: "Concierge" },
              { v: "100%", l: "Beachfront" },
              { v: "5★", l: "Service" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-2xl text-ivory">{s.v}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/55 mt-1">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom hairline accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
      </div>

      {/* ─── RIGHT: login form ──────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:py-16 relative">
        {/* subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, var(--color-ocean) 0%, transparent 60%), radial-gradient(circle at 80% 80%, var(--color-teal) 0%, transparent 60%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative w-full max-w-md"
        >
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 bg-ocean flex items-center justify-center text-ivory font-serif font-bold text-sm">
              {brand.initials}
            </div>
            <p className="font-serif text-sm text-ocean">
              {brand.displayName}
            </p>
          </div>

          {/* Card */}
          <div className="relative border border-ocean/10 bg-white/80 backdrop-blur-xl shadow-[0_30px_80px_-40px_rgba(17,17,17,0.35)] p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 border border-teal/40 bg-teal/10 flex items-center justify-center">
                <Lock size={16} className="text-[#006d6d]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#006d6d]">
                  Sign In
                </p>
                <h2 className="font-serif text-2xl text-ocean mt-1 leading-none">
                  Admin Access
                </h2>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50/80 text-red-700 text-sm px-4 py-3"
                >
                  <AlertCircle size={16} className="mt-0.5 flex-none" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="group relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean/40 group-focus-within:text-teal transition-colors"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="Email address"
                  className="w-full border border-ocean/15 bg-white pl-11 pr-4 py-3.5 text-sm text-ocean placeholder-ocean/35 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all"
                />
              </div>

              {/* Password */}
              <div className="group relative">
                <Lock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean/40 group-focus-within:text-teal transition-colors"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  placeholder="Password"
                  className="w-full border border-ocean/15 bg-white pl-11 pr-12 py-3.5 text-sm text-ocean placeholder-ocean/35 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-ocean/45 hover:text-teal transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-ocean/70 select-none">
                  <span className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) =>
                        setForm({ ...form, remember: e.target.checked })
                      }
                      className="peer absolute opacity-0 w-4 h-4"
                    />
                    <span className="w-4 h-4 border border-ocean/25 bg-white peer-checked:bg-teal peer-checked:border-teal flex items-center justify-center transition-colors">
                      <svg
                        viewBox="0 0 12 12"
                        className="w-2.5 h-2.5 text-ocean opacity-0 peer-checked:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    </span>
                  </span>
                  Keep me signed in
                </label>
                <span className="flex items-center gap-1 text-ocean/50">
                  <Shield size={11} /> Encrypted
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.28em] py-4 hover:bg-ocean transition-all disabled:opacity-60 flex items-center justify-center gap-3 mt-2"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-teal/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  aria-hidden
                />
                <span className="relative flex items-center gap-3">
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In Securely
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-ocean/40">
            {brand.displayName} · Concierge Suite
          </p>
        </motion.div>
      </div>
    </div>
  );
}
