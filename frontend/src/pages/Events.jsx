import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import {
  EVENT_VENUES,
  EVENTS_HERO_IMAGE,
  EVENTS_INTRO,
  EVENTS_STATS,
} from "../data/eventsData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
});

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <img
        src={EVENTS_HERO_IMAGE}
        alt="Discovery Samal Resort Meetings & Events"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70" />
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-teal"
        >
          {EVENTS_INTRO.preTitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="font-serif text-5xl uppercase leading-tight tracking-wide text-white sm:text-6xl lg:text-7xl"
        >
          Excellent Facilities
          <br />
          for Excellent Moments
        </motion.h1>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  INTRO                                                              */
/* ================================================================== */
function Intro() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp()}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
              {EVENTS_INTRO.preTitle}
            </p>
            <h2 className="font-serif text-4xl uppercase leading-tight tracking-wide text-charcoal lg:text-5xl">
              {EVENTS_INTRO.title}
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex flex-col justify-between gap-8">
            <p className="text-[15px] leading-[1.9] text-[#555]">
              {EVENTS_INTRO.body}
            </p>
            <a
              href="mailto:reservations@discoverysamal.com"
              className="inline-flex w-fit items-center gap-2 bg-teal px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#006d6d]"
            >
              Request for Proposal
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-[#e5e5e5] pt-12 sm:grid-cols-4"
        >
          {EVENTS_STATS.map((s) => (
            <div key={s.label} className="border-l border-teal/30 pl-5">
              <p className="font-serif text-3xl text-teal">{s.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#777]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  VENUE CARD                                                         */
/* ================================================================== */
function VenueCard({ venue, index, onOpenLightbox }) {
  const isEven = index % 2 === 0;
  const capacityRows = [
    { key: "banquet", label: "Banquet" },
    { key: "theater", label: "Theater" },
    { key: "classroom", label: "Classroom" },
    { key: "cocktails", label: "Cocktails" },
  ].filter((r) => venue.capacity[r.key]);

  return (
    <section
      id="venues-collection"
      className={`py-16 lg:py-24 ${isEven ? "bg-ivory" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 ${
            !isEven ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Image */}
          <motion.div {...fadeUp()} className="lg:[direction:ltr]">
            <button
              onClick={() => onOpenLightbox(venue, 0)}
              className="group relative block aspect-[4/3] w-full overflow-hidden"
            >
              <img
                src={venue.images[0]}
                alt={venue.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp(0.1)} className="lg:[direction:ltr]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
              Venue 0{index + 1}
            </p>
            <h2 className="font-serif text-4xl uppercase tracking-wide text-charcoal lg:text-5xl">
              {venue.name}
            </h2>
            <p className="mt-3 font-serif text-lg italic text-[#555]">
              {venue.tagline}
            </p>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#555]">
              {venue.description}
            </p>

            {/* Capacity */}
            {capacityRows.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 rounded border border-[#e5e5e5] p-4 sm:grid-cols-4">
                {capacityRows.map((row) => (
                  <div key={row.key} className="text-center">
                    <div className="flex items-center justify-center gap-1 text-teal">
                      <Users className="h-3.5 w-3.5" />
                      <span className="font-semibold text-charcoal">
                        {venue.capacity[row.key]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#888]">
                      {row.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:reservations@discoverysamal.com"
                className="inline-flex items-center gap-2 bg-teal px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#006d6d]"
              >
                Enquire Now
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-teal px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-teal transition-colors hover:bg-teal hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  LIGHTBOX                                                           */
/* ================================================================== */
function Lightbox({ venue, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex || 0);
  const total = venue?.images?.length || 0;
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => { setIndex(startIndex || 0); }, [startIndex, venue]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  if (!venue) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center text-white/80 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>
      {total > 1 && (
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center text-white/70 hover:text-white"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}
      <motion.img
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        src={venue.images[index]}
        alt={`${venue.name} ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain"
      />
      {total > 1 && (
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center text-white/70 hover:text-white"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}
    </motion.div>
  );
}

/* ================================================================== */
/*  CTA                                                                */
/* ================================================================== */
function CTA() {
  return (
    <section className="bg-charcoal py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          {...fadeUp()}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
        >
          Plan Your Event
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-serif text-4xl uppercase tracking-wide text-white"
        >
          Let&apos;s Create Something
          <br />
          Extraordinary Together
        </motion.h2>
        <motion.p
          {...fadeUp(0.15)}
          className="mt-4 text-[15px] leading-relaxed text-white/75"
        >
          Our events team is ready to help you plan the perfect meeting,
          wedding, or celebration at Discovery Samal Resort on Samal Island.
        </motion.p>
        <motion.div
          {...fadeUp(0.2)}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:reservations@discoverysamal.com"
            className="inline-flex items-center gap-2 bg-teal px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#006d6d]"
          >
            Request for Proposal
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/40 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:border-white"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function Events() {
  const [lightbox, setLightbox] = useState({ venue: null, index: 0 });
  const open = (venue, index) => setLightbox({ venue, index });
  const close = () => setLightbox({ venue: null, index: 0 });

  return (
    <main className="text-charcoal">
      <Hero />
      <Intro />
      {EVENT_VENUES.map((v, i) => (
        <VenueCard key={v.slug} venue={v} index={i} onOpenLightbox={open} />
      ))}
      <CTA />
      <AnimatePresence>
        {lightbox.venue && (
          <Lightbox
            venue={lightbox.venue}
            startIndex={lightbox.index}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
