import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import { brand } from "../../lib/brand";

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Slide data â€” images sourced from example.html
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const CDN = "https://image-tc.galaxy.tf";
const SLIDES = [
  {
    id: 1,
    desktop: `${CDN}/wijpeg-9g0c8e4jia8i8dw5hv5xd3r05/dss-website-banner-home-page-2.jpg?width=1920`,
    mobile: `${CDN}/wijpeg-3gvt51m6p7qhmq6msr8eugyv8/website-mobile-banner-size-1.jpg?height=700`,
    eyebrow: "Independence Day Travel Sale",
    heading: "Enjoy up to 50%\nSavings!",
    cta: "Learn More",
    ctaHref: "/offers",
  },
  {
    id: 2,
    desktop: `${CDN}/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg?width=1920`,
    mobile: `${CDN}/wijpeg-3n0zecnifh2pnrs8f5hqiy63u/website-mobile-banner-size.jpg?height=700`,
    eyebrow: "Happy Summer",
    heading: "Experience exclusive discounts\ncoupled with delightful perks!",
    cta: "Learn More",
    ctaHref: "/offers",
  },
  {
    id: 3,
    desktop: `${CDN}/wijpeg-bcuufnq3q2s8cqqkqxm28wiqw/untitled-design-4.jpg?width=1920`,
    mobile: `${CDN}/wijpeg-bcuufnq3q2s8cqqkqxm28wiqw/untitled-design-4.jpg?width=1920`,
    eyebrow: "Samal Grand Ballroom",
    heading: "Where grandiose moments\ntake centerstage.",
    cta: "Discover More",
    ctaHref: "/events",
  },
  {
    id: 4,
    desktop: `${CDN}/wijpeg-17ogtqpq3qj4s6r2rl3gu0mse/9.jpg?width=1920`,
    mobile: `${CDN}/wijpeg-17ogtqpq3qj4s6r2rl3gu0mse/9.jpg?width=1920`,
    eyebrow: "Samal Island",
    heading: "Every getaway\nfulfilled.",
    cta: "View Offers",
    ctaHref: "/offers",
  },
  {
    id: 5,
    desktop: `${CDN}/wijpeg-7jtyjnoy3zk9ji5fg7szxfttb/dss-website-banner-home-page.jpg?width=1920`,
    mobile: `${CDN}/wijpeg-7jtyjnoy3zk9ji5fg7szxfttb/dss-website-banner-home-page.jpg?width=1920`,
    eyebrow: "Fine Dining & Flavours",
    heading: "Every craving\nfulfilled.",
    cta: "View Dining Options",
    ctaHref: "/restaurants",
  },
  {
    id: 6,
    desktop: `${CDN}/wijpeg-e9e3fi5ee3nudxmag9mtxp6bm/aerial-1.jpg?width=1920`,
    mobile: `${CDN}/wijpeg-e9e3fi5ee3nudxmag9mtxp6bm/aerial-1.jpg?width=1920`,
    eyebrow: "Book Direct",
    heading: "Get up to 50% Savings\non Best Available Rates",
    cta: "Book Now",
    ctaHref: "/booking",
  },
  {
    id: 7,
    desktop: `${CDN}/wipng-790j8v5mbshq758qtyy9hjlol/1.png?width=1920`,
    mobile: `${CDN}/wipng-790j8v5mbshq758qtyy9hjlol/1.png?width=1920`,
    eyebrow: "Event Venues",
    heading: "Every moment\nfulfilled.",
    cta: "View Event Venues",
    ctaHref: "/events",
  },
];

const AUTOPLAY_INTERVAL = 6000;

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Today's default dates for booking widget
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function getDefaultDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fmt = (d) => d.toISOString().slice(0, 10);
  return { checkIn: fmt(today), checkOut: fmt(tomorrow) };
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   HeroSection
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const timerRef = useRef(null);

  const { checkIn: defaultCheckIn, checkOut: defaultCheckOut } =
    getDefaultDates();
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [promo, setPromo] = useState("");

  const count = SLIDES.length;

  const go = useCallback(
    (idx, dir) => {
      setDirection(dir);
      setCurrent((idx + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, next]);

  // Touch/swipe
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const handleBook = () => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      rooms,
      guests,
      promo,
    });
    window.location.href = `/booking?${params}`;
  };

  const slide = SLIDES[current];

  /* slide variants */
  const variants = {
    enter: (dir) => ({ opacity: 0, scale: 1.04, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, scale: 0.98, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section
      className="relative h-screen min-h-150 w-full overflow-hidden bg-slate-900 text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* â”€â”€ Slides â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.06] }}
            transition={{
              duration: AUTOPLAY_INTERVAL / 1000 + 1.6,
              ease: "linear",
            }}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={slide.mobile} />
              <img
                src={slide.desktop}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
              />
            </picture>
          </motion.div>

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/40" />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* â”€â”€ Hero Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Main text â€” lower-third */}
        <div className="flex flex-1 items-end">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 pb-28 sm:pb-32 lg:pb-36">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.1em" }}
                  animate={{ opacity: 1, letterSpacing: "0.4em" }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70"
                >
                  {slide.eyebrow}
                </motion.p>

                {/* Heading */}
                <h1 className="font-serif text-4xl font-light leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl xl:text-[72px]">
                  {slide.heading.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h1>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-8"
                >
                  <Link to={slide.ctaHref}>
                    <motion.span
                      whileHover={{
                        scale: 1.04,
                        boxShadow: "0 12px 32px -4px rgba(0,140,140,0.55)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2.5 rounded-full bg-teal px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_6px_24px_-4px_rgba(0,140,140,0.5)] transition-colors hover:bg-teal-dark"
                    >
                      {slide.cta}
                      <ChevronRight size={13} />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* â”€â”€ Bottom row: scroll cue + controls â”€â”€â”€â”€ */}
        <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Scroll hint */}
            <a
              href="#discover"
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/50 transition-colors hover:text-white/90 sm:flex"
            >
              <ChevronDown size={13} className="animate-bounce" />
              Scroll to explore
            </a>

            {/* Slide counter + prev/next */}
            <div className="flex items-center gap-5">
              {/* Counter */}
              <div className="flex items-center gap-2 text-[11px] font-light tracking-[0.2em] text-white/60">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.3 }}
                    className="text-white font-semibold text-sm"
                  >
                    {String(current + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="w-8 h-px bg-white/30" />
                <span>{String(count).padStart(2, "0")}</span>
              </div>

              {/* Pause / play */}
              <button
                onClick={() => setPaused((p) => !p)}
                className="text-[10px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
              >
                {paused ? "Play" : "Pause"}
              </button>

              {/* Arrows */}
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/70 backdrop-blur-sm transition-all hover:border-white/60 hover:text-white hover:bg-white/10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={next}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/70 backdrop-blur-sm transition-all hover:border-white/60 hover:text-white hover:bg-white/10"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {!paused && (
            <motion.div
              key={current}
              className="absolute bottom-0 left-6 right-6 h-px bg-white/15 lg:left-10 lg:right-10"
            >
              <motion.div
                className="h-full bg-teal"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: AUTOPLAY_INTERVAL / 1000,
                  ease: "linear",
                }}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* â”€â”€ Floating Booking Widget â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* Desktop: fixed top-right floating card */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-72 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 mb-0.5">
              Discovery Samal
            </p>
            <p className="text-[13px] font-semibold text-white">
              Make a Reservation
            </p>
          </div>

          <div className="px-6 py-5 space-y-4">
            {/* Check In */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1.5">
                Check In
              </label>
              <input
                type="date"
                value={checkIn}
                min={defaultCheckIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2.5 text-[12px] text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors scheme-dark"
              />
            </div>

            {/* Rooms & Guests */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1.5">
                  Rooms
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-2 py-2">
                  <button
                    onClick={() => setRooms((r) => Math.max(1, r - 1))}
                    className="p-0.5 text-white/60 hover:text-white transition-colors"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="flex-1 text-center text-[12px] text-white font-medium">
                    {rooms}
                  </span>
                  <button
                    onClick={() => setRooms((r) => r + 1)}
                    className="p-0.5 text-white/60 hover:text-white transition-colors"
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1.5">
                  Guests
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-2 py-2">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="p-0.5 text-white/60 hover:text-white transition-colors"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="flex-1 text-center text-[12px] text-white font-medium">
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests((g) => g + 1)}
                    className="p-0.5 text-white/60 hover:text-white transition-colors"
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
            </div>

            {/* Promo code */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1.5">
                Promo Code
              </label>
              <input
                type="text"
                placeholder="Optional"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2.5 text-[12px] text-white placeholder-white/30 focus:outline-none focus:border-teal transition-colors"
              />
            </div>

            {/* Book Now */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px_32px_-4px_rgba(0,140,140,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBook}
              className="w-full rounded-2xl bg-teal py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_6px_24px_-4px_rgba(0,140,140,0.5)] transition-colors hover:bg-teal-dark"
            >
              Book Now
            </motion.button>

            {/* Modify booking */}
            <Link
              to="/booking/modify"
              className="block text-center text-[10px] text-white/40 hover:text-white/80 transition-colors tracking-wide"
            >
              Modify Booking
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mobile: booking widget toggle + bottom sheet */}
      <div className="absolute bottom-20 right-5 z-30 lg:hidden">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setWidgetOpen(true)}
          className="rounded-full bg-teal px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_6px_24px_-4px_rgba(0,140,140,0.5)]"
        >
          Book Now
        </motion.button>
      </div>

      {/* Mobile booking bottom sheet */}
      <AnimatePresence>
        {widgetOpen && (
          <>
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900"
              onClick={() => setWidgetOpen(false)}
            />
            <motion.div
              key="sheet-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 inset-x-0 z-50 rounded-t-3xl bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-24px_64px_rgba(0,0,0,0.4)] px-6 pt-5 pb-10"
            >
              {/* Handle */}
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/20" />

              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-white/50 text-center">
                Make a Reservation
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
                      Check In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={defaultCheckIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2.5 text-[12px] text-white focus:outline-none focus:border-teal scheme-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
                      Check Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2.5 text-[12px] text-white focus:outline-none focus:border-teal scheme-dark"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
                      Rooms
                    </label>
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-2 py-2.5">
                      <button
                        onClick={() => setRooms((r) => Math.max(1, r - 1))}
                        className="text-white/60 hover:text-white"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="flex-1 text-center text-[12px] text-white">
                        {rooms}
                      </span>
                      <button
                        onClick={() => setRooms((r) => r + 1)}
                        className="text-white/60 hover:text-white"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
                      Guests
                    </label>
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-2 py-2.5">
                      <button
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="text-white/60 hover:text-white"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="flex-1 text-center text-[12px] text-white">
                        {guests}
                      </span>
                      <button
                        onClick={() => setGuests((g) => g + 1)}
                        className="text-white/60 hover:text-white"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2.5 text-[12px] text-white placeholder-white/30 focus:outline-none focus:border-teal"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBook}
                  className="w-full rounded-2xl bg-teal py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_6px_24px_-4px_rgba(0,140,140,0.5)] hover:bg-teal-dark transition-colors"
                >
                  Book Now
                </motion.button>
                <Link
                  to="/booking/modify"
                  className="block text-center text-[10px] text-white/40 hover:text-white/70 transition-colors"
                >
                  Modify Booking
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* â”€â”€ Slide dots â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-20 flex items-center gap-2 lg:hidden">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-teal" : "w-1.5 bg-white/30"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
