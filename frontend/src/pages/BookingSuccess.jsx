import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  Bed,
  Hash,
  MapPin,
  Download,
  Mail,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Sun,
  Waves,
  Compass,
} from "lucide-react";
import toast from "react-hot-toast";
import { getBookingById, downloadReceipt } from "../services/api";
import { brand } from "../lib/brand";

const fmtMoney = (n) => `₱${Number(n || 0).toLocaleString("en-PH")}`;

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const PREP_TIPS = [
  {
    icon: Sun,
    title: "Pack lightly",
    detail:
      "Linen, swimwear, and one set for golden-hour dinners on the terrace.",
  },
  {
    icon: Waves,
    title: "Slow into island time",
    detail:
      "Plan an unhurried first day — a dip, a long lunch, a sunset on the sand.",
  },
  {
    icon: Compass,
    title: "Tell us your favourites",
    detail:
      "Reply to your confirmation email so the concierge can prepare your stay.",
  },
];

export default function BookingSuccess() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getBookingById(id)
      .then((res) => setBooking(res.data.data || res.data))
      .catch(() => setBooking(null));
  }, [id]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await downloadReceipt(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `DiscoverySamalResort-Receipt-${booking?.bookingRef || id}.pdf`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Receipt download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-warm-white">
        <div className="text-center">
          <div className="w-9 h-9 border border-teal/30 border-t-teal rounded-full animate-spin mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.3em] uppercase text-charcoal/40">
            Confirming your stay
          </p>
        </div>
      </div>
    );
  }

  const guestFirstName = (booking.guestName || "").split(" ")[0] || "Guest";

  return (
    <div className="bg-warm-white">
      {/* ----- Cinematic celebratory hero ----- */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden bg-teal-dark">
        <img
          src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1920"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/75" />

        {/* Subtle celebratory sparkles */}
        <CelebrationOverlay />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 w-full text-white text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[11px] tracking-[0.4em] uppercase text-white/75 font-medium"
            >
              Reservation Confirmed
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl mt-6 leading-[1.05]"
            >
              You're escaping to paradise, {guestFirstName}.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-7 text-white/80 max-w-xl mx-auto leading-relaxed font-light text-lg"
            >
              Your villa is held. The sea is waiting. Our concierge will be in
              touch shortly with everything you need for a calm, beautiful
              arrival.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-10 inline-flex items-center gap-3 border border-white/30 px-6 py-3 backdrop-blur-sm"
            >
              <Hash size={14} className="text-white/70" />
              <span className="text-[10px] tracking-[0.32em] uppercase text-white/60">
                Reference
              </span>
              <span className="font-mono text-white/95 text-sm">
                {booking.bookingRef || booking._id?.slice(-10).toUpperCase()}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----- Reservation summary ----- */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Villa preview */}
            <div className="lg:col-span-5">
              {booking.room?.images?.[0] && (
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={booking.room.images[0]}
                    alt={booking.room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="mt-6 text-[11px] tracking-[0.32em] uppercase text-tan font-medium">
                {booking.room?.category}
              </p>
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl text-teal-dark">
                {booking.room?.name}
              </h2>
              <p className="mt-3 text-charcoal/55 text-sm flex items-center gap-2">
                <MapPin size={13} className="text-tan" />
                Samal Island, Davao del Norte
              </p>
            </div>

            {/* Stay details */}
            <div className="lg:col-span-7">
              <p className="text-[11px] tracking-[0.32em] uppercase text-tan font-medium">
                Your Stay
              </p>
              <h3 className="mt-3 font-serif text-3xl text-teal-dark">
                Reservation details
              </h3>

              <dl className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-10">
                <Detail
                  icon={CalendarDays}
                  label="Check-in"
                  value={fmtDate(booking.checkIn)}
                  sub="From 2:00 PM"
                />
                <Detail
                  icon={CalendarDays}
                  label="Check-out"
                  value={fmtDate(booking.checkOut)}
                  sub="By 11:00 AM"
                />
                <Detail
                  icon={Bed}
                  label="Length of stay"
                  value={`${booking.nights} night${booking.nights > 1 ? "s" : ""}`}
                />
                <Detail
                  icon={Users}
                  label="Guests"
                  value={`${booking.numberOfGuests} guest${
                    booking.numberOfGuests > 1 ? "s" : ""
                  }`}
                />
                <Detail
                  icon={Mail}
                  label="Confirmation sent to"
                  value={booking.guestEmail}
                />
                <Detail
                  icon={Phone}
                  label="Concierge contact"
                  value={booking.guestPhone}
                />
              </dl>

              <div className="mt-10 pt-8 border-t border-charcoal/10 flex items-baseline justify-between">
                <span className="text-[10px] tracking-[0.28em] uppercase text-charcoal/45 font-medium">
                  Total reserved
                </span>
                <span className="font-serif text-4xl text-teal-dark">
                  {fmtMoney(booking.totalAmount)}
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 min-w-[200px] bg-teal text-white px-7 py-4 text-[11px] tracking-[0.28em] uppercase font-semibold hover:bg-teal-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {downloading ? "Preparing…" : "Download receipt"}
                  {!downloading && <Download size={14} />}
                </button>
                <a
                  href={`https://wa.me/${(brand.phone || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi! I just reserved ${booking.room?.name || "a villa"} — ref ${booking.bookingRef || booking._id}. Looking forward to my stay.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] bg-[#25D366] text-white px-7 py-4 text-[11px] tracking-[0.28em] uppercase font-semibold hover:bg-[#1da851] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} /> Message concierge
                </a>
                <Link
                  to="/"
                  className="flex-1 min-w-[200px] border border-charcoal/20 text-charcoal/75 px-7 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-charcoal/5 transition-colors flex items-center justify-center gap-2"
                >
                  Return home <ChevronRight size={14} />
                </Link>
              </div>

              <p className="mt-6 flex items-center gap-2 text-[11px] text-charcoal/55">
                <ShieldCheck size={13} className="text-teal" />A confirmation
                email is on its way to {booking.guestEmail}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----- Travel preparation ----- */}
      <section className="py-24 lg:py-28 bg-seafoam/40">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-[11px] tracking-[0.32em] uppercase text-tan font-medium">
              Before you arrive
            </p>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl text-teal-dark leading-tight">
              A gentle prelude.
            </h2>
            <p className="mt-5 text-charcoal/60 leading-relaxed font-light">
              Three small things to set the tone for an unhurried, beautiful
              stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {PREP_TIPS.map(({ icon: Icon, title, detail }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <Icon size={26} strokeWidth={1.4} className="text-teal" />
                <h3 className="mt-5 font-serif text-2xl text-teal-dark">
                  {title}
                </h3>
                <p className="mt-3 text-charcoal/65 leading-relaxed font-light">
                  {detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----- Concierge sign-off ----- */}
      <section className="py-24 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Sparkles
            size={26}
            strokeWidth={1.3}
            className="mx-auto text-tan opacity-80"
          />
          <p className="mt-7 font-serif text-3xl lg:text-4xl text-teal-dark italic font-light leading-relaxed">
            “We can't wait to welcome you. Until then — rest, dream, and travel
            slowly.”
          </p>
          <p className="mt-8 text-[11px] tracking-[0.3em] uppercase text-charcoal/55">
            The Discovery Samal Concierge
          </p>
          <div className="mt-10 inline-flex items-center gap-2 text-sm text-charcoal/60">
            <Mail size={14} className="text-tan" />
            {brand.email}
          </div>
        </div>
      </section>
    </div>
  );
}

function Detail({ icon: Icon, label, value, sub }) {
  return (
    <div className="flex items-start gap-4">
      <Icon size={16} className="text-tan mt-1 shrink-0" strokeWidth={1.6} />
      <div>
        <p className="text-[10px] tracking-[0.28em] uppercase text-charcoal/45 font-medium">
          {label}
        </p>
        <p className="mt-1.5 text-charcoal/85">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-charcoal/45">{sub}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Subtle celebration: drifting sparkles over the hero                  */
/* ------------------------------------------------------------------ */
function CelebrationOverlay() {
  const sparkles = Array.from({ length: 14 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((_, i) => {
        const left = (i * 73) % 100;
        const delay = (i % 6) * 0.45;
        const size = 6 + (i % 4) * 3;
        return (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 0.85, 0] }}
            transition={{
              duration: 7 + (i % 5),
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ left: `${left}%`, width: size, height: size }}
            className="absolute bottom-0 rounded-full bg-tan/70 blur-[1px]"
          />
        );
      })}
    </div>
  );
}
