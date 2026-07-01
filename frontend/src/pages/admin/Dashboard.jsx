import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BedDouble,
  CalendarDays,
  Clock,
  CreditCard,
  DollarSign,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Plus,
  Tag,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { getDashboard } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

/* ─── Helpers ──────────────────────────────────────────────── */
const peso = (n) =>
  typeof n === "number"
    ? `₱${n.toLocaleString("en-PH", { maximumFractionDigits: 0 })}`
    : "₱0";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
});

/* ─── Skeleton ─────────────────────────────────────────────── */
function StatSkeleton() {
  return (
    <div className="border border-ocean/10 bg-white p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="w-11 h-11 bg-ivory animate-pulse" />
        <div className="w-10 h-3 bg-ivory animate-pulse" />
      </div>
      <div className="w-20 h-7 bg-ivory animate-pulse mb-2" />
      <div className="w-24 h-3 bg-ivory animate-pulse" />
    </div>
  );
}

/* ─── Stat card ────────────────────────────────────────────── */
function StatCard({ card, index }) {
  const Icon = card.icon;
  const content = (
    <div className="group relative overflow-hidden border border-ocean/10 bg-white p-6 hover:border-teal/40 hover:shadow-[0_20px_45px_-25px_rgba(11,122,138,0.35)] transition-all duration-300">
      {/* Glow */}
      <div
        className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(11,122,138,0.22) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-11 h-11 flex items-center justify-center border ${card.iconClass}`}
          >
            <Icon className="w-[18px] h-[18px]" />
          </div>
          {card.link && (
            <ArrowUpRight className="w-4 h-4 text-ocean/25 group-hover:text-teal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          )}
        </div>
        <p className="font-serif text-[26px] lg:text-[30px] text-ocean leading-none mb-2">
          {card.value}
        </p>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[10px] text-ocean/50 uppercase tracking-[0.22em] font-medium">
            {card.label}
          </p>
          {card.delta && (
            <span
              className={`flex items-center gap-0.5 text-[10px] font-semibold ${
                card.delta.startsWith("-") ? "text-red-500" : "text-emerald-600"
              }`}
            >
              <TrendingUp className="w-2.5 h-2.5" />
              {card.delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div {...fadeUp(0.05 * index)}>
      {card.link ? <Link to={card.link}>{content}</Link> : content}
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function Dashboard() {
  const { admin } = useAuth();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data.data))
      .catch(() => setErr(true));
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const cards = data
    ? [
        {
          label: "Total Rooms",
          value: data.totalRooms ?? 0,
          icon: BedDouble,
          iconClass: "border-teal/30 bg-teal/10 text-teal-dark",
          link: "/owner/rooms",
        },
        {
          label: "Available Now",
          value: data.availableRooms ?? 0,
          icon: CheckCircle,
          iconClass: "border-emerald-300/40 bg-emerald-50 text-emerald-600",
          link: "/owner/rooms",
        },
        {
          label: "Total Bookings",
          value: data.totalBookings ?? 0,
          icon: CalendarDays,
          iconClass: "border-ocean/20 bg-ocean/5 text-ocean",
          link: "/owner/bookings",
        },
        {
          label: "Pending Bookings",
          value: data.pendingBookings ?? 0,
          icon: Clock,
          iconClass: "border-amber-300/40 bg-amber-50 text-amber-600",
          link: "/owner/bookings",
        },
        {
          label: "Awaiting Payment",
          value: data.pendingPayments ?? 0,
          icon: CreditCard,
          iconClass: "border-orange-300/40 bg-orange-50 text-orange-600",
          link: "/owner/payments",
        },
        {
          label: "Total Revenue",
          value: peso(data.totalRevenue),
          icon: DollarSign,
          iconClass: "border-teal/30 bg-teal/10 text-teal-dark",
        },
      ]
    : [];

  const quickActions = [
    { label: "Add Room", icon: Plus, to: "/owner/rooms", accent: true },
    { label: "Review Payments", icon: CreditCard, to: "/owner/payments" },
    { label: "New Discount", icon: Tag, to: "/owner/discounts" },
    { label: "All Bookings", icon: CalendarDays, to: "/owner/bookings" },
  ];

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* ─── Greeting hero ─── */}
      <motion.section
        {...fadeUp(0)}
        className="relative overflow-hidden border border-ocean/10 bg-gradient-to-br from-ocean via-ocean to-ocean text-ivory p-7 lg:p-10"
      >
        {/* Decorative glows */}
        <div
          className="absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(11,122,138,0.35) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-10 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(10,94,108,0.3) 0%, transparent 60%)",
          }}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-teal font-semibold flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              {today}
            </p>
            <h1 className="font-serif text-3xl lg:text-[40px] leading-tight mt-3">
              {greeting},{" "}
              <span className="italic text-teal">
                {admin?.name?.split(" ")[0] || "Concierge"}
              </span>
              .
            </h1>
            <p className="text-sm text-ivory/65 max-w-lg mt-3 leading-relaxed">
              Here's a quick snapshot of your resort's operations — bookings,
              payments, and inventory at a glance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/owner/bookings"
              className="group inline-flex items-center gap-2 bg-teal text-ocean px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-ivory transition-colors"
            >
              View Bookings
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/owner/payments"
              className="inline-flex items-center gap-2 border border-ivory/25 text-ivory px-5 py-3 text-[11px] uppercase tracking-[0.22em] hover:border-teal hover:text-teal transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Review Payments
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ─── Stats ─── */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold">
              Overview
            </p>
            <h2 className="font-serif text-2xl text-ocean mt-1">
              Operations at a glance
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {!data && !err
            ? Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)
            : cards.map((c, i) => (
                <StatCard key={c.label} card={c} index={i} />
              ))}
        </div>
      </section>

      {/* ─── Quick actions + Recent bookings ─── */}
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
        {/* Quick actions */}
        <motion.section {...fadeUp(0.1)} className="lg:col-span-1">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold">
                Quick Actions
              </p>
              <h2 className="font-serif text-xl text-ocean mt-1">
                Jump back in
              </h2>
            </div>
          </div>

          <div className="border border-ocean/10 bg-white divide-y divide-ocean/8">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  to={a.to}
                  className="group flex items-center gap-4 px-5 py-4 hover:bg-ivory/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                      a.accent
                        ? "border-teal/40 bg-teal/10 text-teal-dark group-hover:bg-teal group-hover:text-ocean"
                        : "border-ocean/15 text-ocean/70 group-hover:border-teal/50 group-hover:text-teal"
                    }`}
                  >
                    <Icon className="w-[17px] h-[17px]" />
                  </div>
                  <span className="text-sm text-ocean font-medium flex-1">
                    {a.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-ocean/30 group-hover:text-teal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </motion.section>

        {/* Recent bookings */}
        <motion.section {...fadeUp(0.15)} className="lg:col-span-2">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold">
                Activity
              </p>
              <h2 className="font-serif text-xl text-ocean mt-1">
                Recent bookings
              </h2>
            </div>
            <Link
              to="/owner/bookings"
              className="text-[10px] uppercase tracking-[0.22em] text-teal-dark font-semibold hover:text-teal transition-colors inline-flex items-center gap-1.5"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="border border-ocean/10 bg-white">
            {data?.recentBookings?.length > 0 ? (
              <>
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-ocean/8 bg-ivory/40">
                  <p className="col-span-4 text-[9px] text-ocean/50 uppercase tracking-[0.22em] font-semibold">
                    Guest
                  </p>
                  <p className="col-span-4 text-[9px] text-ocean/50 uppercase tracking-[0.22em] font-semibold">
                    Room
                  </p>
                  <p className="col-span-2 text-[9px] text-ocean/50 uppercase tracking-[0.22em] font-semibold">
                    Check-in
                  </p>
                  <p className="col-span-2 text-[9px] text-ocean/50 uppercase tracking-[0.22em] font-semibold text-right">
                    Status
                  </p>
                </div>
                {data.recentBookings.map((b, i) => (
                  <motion.div
                    key={b._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                    className={`grid md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-ivory/40 transition-colors ${
                      i < data.recentBookings.length - 1
                        ? "border-b border-ocean/8"
                        : ""
                    }`}
                  >
                    <div className="md:col-span-4 flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 flex-none bg-gradient-to-br from-teal/15 to-teal-dark/15 border border-teal/25 text-teal-dark flex items-center justify-center text-[10px] font-semibold">
                        {b.guestName
                          ?.split(" ")
                          .slice(0, 2)
                          .map((s) => s[0]?.toUpperCase())
                          .join("") || "G"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ocean truncate">
                          {b.guestName}
                        </p>
                        <p className="text-[10px] font-mono text-ocean/40 truncate">
                          {b.bookingRef}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-4 min-w-0">
                      <p className="text-sm text-ocean/80 truncate">
                        {b.room?.name || "—"}
                      </p>
                      {b.room?.category && (
                        <p className="text-[10px] text-ocean/40 uppercase tracking-[0.15em] mt-0.5">
                          {b.room.category}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-ocean/70">
                        {b.checkIn
                          ? new Date(b.checkIn).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </p>
                    </div>
                    <div className="md:col-span-2 md:text-right">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                          b.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : b.status === "cancelled"
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : err ? (
              <div className="px-6 py-16 text-center">
                <p className="text-sm text-red-500">
                  Failed to load bookings. Please refresh.
                </p>
              </div>
            ) : !data ? (
              <div className="px-6 py-16 text-center text-ocean/45 text-sm">
                Loading…
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="w-12 h-12 bg-ivory border border-ocean/10 flex items-center justify-center mx-auto mb-4">
                  <Inbox className="w-5 h-5 text-ocean/35" />
                </div>
                <p className="font-serif text-lg text-ocean">
                  No reservations yet
                </p>
                <p className="text-sm text-ocean/55 mt-1">
                  New guest bookings will appear here.
                </p>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
