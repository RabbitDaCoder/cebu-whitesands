import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Users, Tag, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookingWidget({ isOpen, onClose }) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const fmt = (d) => d.toISOString().split("T")[0];

  const [form, setForm] = useState({
    checkIn: fmt(today),
    checkOut: fmt(tomorrow),
    rooms: 1,
    adults: 2,
    promo: "",
  });

  const handle = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="widget-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Widget panel */}
          <motion.div
            key="widget-panel"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-21 right-4 z-50 w-85 sm:right-8 sm:w-105 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-3xl border border-white/60 shadow-[0_32px_80px_-16px_rgba(0,140,140,0.22),0_8px_32px_rgba(0,0,0,0.12)]"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-teal font-semibold">
                  Make a Reservation
                </p>
                <p className="text-[13px] font-light text-slate-400 tracking-wide mt-0.5">
                  Best rate · Direct benefits
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Dates row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
                    <CalendarDays size={11} className="text-teal" />
                    Check In
                  </label>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={handle("checkIn")}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
                    <CalendarDays size={11} className="text-teal" />
                    Check Out
                  </label>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={handle("checkOut")}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
                  />
                </div>
              </div>

              {/* Occupancy */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
                  <Users size={11} className="text-teal" />
                  Occupancy
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <span className="text-[11px] text-slate-500">Rooms</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            rooms: Math.max(1, p.rooms - 1),
                          }))
                        }
                        className="w-5 h-5 rounded-full bg-teal/10 text-teal text-[14px] leading-none flex items-center justify-center hover:bg-teal/20 transition-colors font-medium"
                      >
                        −
                      </button>
                      <span className="text-[13px] font-medium text-slate-700 w-4 text-center">
                        {form.rooms}
                      </span>
                      <button
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            rooms: Math.min(10, p.rooms + 1),
                          }))
                        }
                        className="w-5 h-5 rounded-full bg-teal/10 text-teal text-[14px] leading-none flex items-center justify-center hover:bg-teal/20 transition-colors font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <span className="text-[11px] text-slate-500">Guests</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            adults: Math.max(1, p.adults - 1),
                          }))
                        }
                        className="w-5 h-5 rounded-full bg-teal/10 text-teal text-[14px] leading-none flex items-center justify-center hover:bg-teal/20 transition-colors font-medium"
                      >
                        −
                      </button>
                      <span className="text-[13px] font-medium text-slate-700 w-4 text-center">
                        {form.adults}
                      </span>
                      <button
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            adults: Math.min(10, p.adults + 1),
                          }))
                        }
                        className="w-5 h-5 rounded-full bg-teal/10 text-teal text-[14px] leading-none flex items-center justify-center hover:bg-teal/20 transition-colors font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
                  <Tag size={11} className="text-teal" />
                  Promo Code
                </label>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={form.promo}
                  onChange={handle("promo")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
                />
              </div>

              {/* Book Now */}
              <Link
                to={`/booking?checkIn=${form.checkIn}&checkOut=${form.checkOut}&rooms=${form.rooms}&adults=${form.adults}&promo=${form.promo}`}
                onClick={onClose}
                className="block w-full"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-teal py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white shadow-[0_8px_24px_-4px_rgba(0,140,140,0.45)] hover:bg-teal-dark hover:shadow-[0_12px_32px_-4px_rgba(0,140,140,0.55)] transition-all duration-300"
                >
                  Check Availability
                </motion.button>
              </Link>

              {/* Modify link */}
              <div className="text-center pt-1">
                <Link
                  to="/booking/modify"
                  onClick={onClose}
                  className="text-[10px] uppercase tracking-[0.18em] text-slate-400 hover:text-teal transition-colors underline-offset-2 hover:underline"
                >
                  Modify an Existing Booking
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
