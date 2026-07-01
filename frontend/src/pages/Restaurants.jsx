import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import {
  RESTAURANTS,
  RESTAURANTS_HERO_IMAGE,
  RESTAURANTS_INTRO,
} from "../data/restaurantsData";

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
    <section className="relative h-[80vh] min-h-140 w-full overflow-hidden">
      <img
        src={RESTAURANTS_HERO_IMAGE}
        alt="Discovery Samal Resort Dining"
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
          Restaurants & Bars
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="font-serif text-5xl uppercase leading-tight tracking-wide text-white sm:text-6xl lg:text-7xl"
        >
          Best Restaurants
          <br />
          in Samal Island
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-4 max-w-xl text-[15px] text-white/80"
        >
          A Flavorful Culinary Paradise
        </motion.p>
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
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
        <motion.p
          {...fadeUp()}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
        >
          Culinary Experience
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="mb-8 font-serif text-4xl uppercase tracking-wide text-charcoal"
        >
          Dine in Paradise
        </motion.h2>
        <motion.p
          {...fadeUp(0.15)}
          className="text-[16px] leading-[1.9] text-[#555]"
        >
          {RESTAURANTS_INTRO}
        </motion.p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  RESTAURANT CARD — alternating layout                               */
/* ================================================================== */
function RestaurantCard({ restaurant, index, onOpenLightbox }) {
  const isEven = index % 2 === 0;
  return (
    <section className={`py-16 lg:py-24 ${isEven ? "bg-white" : "bg-ivory"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 ${
            !isEven ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Image */}
          <motion.div {...fadeUp()} className="lg:[direction:ltr]">
            <button
              onClick={() => onOpenLightbox(restaurant, 0)}
              className="group relative block aspect-4/3 w-full overflow-hidden"
            >
              <img
                src={restaurant.images[0]}
                alt={restaurant.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp(0.1)} className="lg:[direction:ltr]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
              {restaurant.cuisine}
            </p>
            <h2 className="font-serif text-4xl uppercase tracking-wide text-charcoal lg:text-5xl">
              {restaurant.name}
            </h2>
            <p className="mt-3 font-serif text-lg italic text-[#555]">
              {restaurant.tagline}
            </p>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#555]">
              {restaurant.description}
            </p>

            {/* Highlights */}
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {restaurant.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 text-[13px] text-[#555]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#e5e5e5] pt-5">
              <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[#666]">
                <Clock className="h-4 w-4 text-teal" />
                {restaurant.hours}
              </span>
              <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[#666]">
                <MapPin className="h-4 w-4 text-teal" />
                {restaurant.location}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-teal px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#006d6d]"
              >
                Book A Table
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {restaurant.images.length > 1 && (
                <button
                  onClick={() => onOpenLightbox(restaurant, 0)}
                  className="inline-flex items-center gap-2 border border-teal px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-teal transition-colors hover:bg-teal hover:text-white"
                >
                  View Photos
                </button>
              )}
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
function Lightbox({ restaurant, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex || 0);
  const total = restaurant?.images?.length || 0;
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => { setIndex(startIndex || 0); }, [startIndex, restaurant]);

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

  if (!restaurant) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/92"
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
        src={restaurant.images[index]}
        alt={`${restaurant.name} ${index + 1}`}
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
    <section className="bg-teal py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          {...fadeUp()}
          className="font-serif text-4xl uppercase tracking-wide text-white"
        >
          Reserve Your Table
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="mt-4 text-[15px] leading-relaxed text-white/85"
        >
          Dine in paradise — our team is ready to arrange your perfect island
          dining experience at Discovery Samal Resort.
        </motion.p>
        <motion.div
          {...fadeUp(0.2)}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-teal transition-colors hover:bg-white/90"
          >
            Contact Us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 border border-white/60 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:border-white"
          >
            Book Your Stay
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function Restaurants() {
  const [lightbox, setLightbox] = useState({ restaurant: null, index: 0 });
  const open = (restaurant, index) => setLightbox({ restaurant, index });
  const close = () => setLightbox({ restaurant: null, index: 0 });

  return (
    <main className="text-charcoal">
      <Hero />
      <Intro />
      {RESTAURANTS.map((r, i) => (
        <RestaurantCard
          key={r.slug}
          restaurant={r}
          index={i}
          onOpenLightbox={open}
        />
      ))}
      <CTA />
      <AnimatePresence>
        {lightbox.restaurant && (
          <Lightbox
            restaurant={lightbox.restaurant}
            startIndex={lightbox.index}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </main>
  );
}



