import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ArrowDown,
  Compass,
  Sunrise,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import {
  ACTIVITIES_HERO_IMAGE,
  ACTIVITIES_INTRO,
  ACTIVITIES_STATS,
  ACTIVITIES_BY_CATEGORY,
} from "../data/activitiesData";

/* ------------------------------------------------------------------ */
/*  Brand palette (per-file Tailwind arbitrary values)                 */
/*    navy #1a1a1a  deep-navy #111111  gold #008c8c                    */
/*    gold-soft #008c8c  santorini #5a9bbf  ivory #f7f7f5              */
/* ------------------------------------------------------------------ */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay, duration: 1.2, ease: "easeOut" },
});

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[700px] w-full overflow-hidden bg-ocean pt-[78px] lg:pt-[118px]">
      <div className="absolute inset-x-0 bottom-0 top-[78px] overflow-hidden lg:top-[118px]">
        <motion.img
          {...fadeIn()}
          src={ACTIVITIES_HERO_IMAGE}
          alt="Discovery Samal Resort — Activities & Recreation"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/15 to-ocean/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean/70 via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(5,13,31,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 lg:px-12 lg:pb-28">
        <motion.div {...fadeUp(0.1)}>
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-teal">
            <span className="h-px w-10 bg-teal" />
            {ACTIVITIES_INTRO.preTitle}
          </p>
        </motion.div>

        <motion.h1
          {...fadeUp(0.2)}
          className="max-w-4xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-[88px]"
        >
          Where leisure
          <br />
          <span className="italic text-teal">meets adventure</span>.
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-8 max-w-xl text-[15px] leading-[1.85] text-white/75"
        >
          Twenty curated experiences across wellness, water, sport, and scenery
          — composed for guests with a taste for the unhurried, luminous side of
          Samal Island and the Davao Gulf.
        </motion.p>

        <motion.div
          {...fadeUp(0.45)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#activities-collection"
            className="group inline-flex items-center gap-3 bg-teal px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ocean transition-all hover:bg-teal"
          >
            Explore the Experiences
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <Link
            to="/booking"
            className="group inline-flex items-center gap-3 border border-white/30 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-all hover:border-teal hover:text-teal"
          >
            Plan Your Stay
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.4em] text-white/50">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  INTRO                                                              */
/* ================================================================== */
function Intro() {
  return (
    <section className="relative bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div {...fadeUp()} className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-charcoal">
              <span className="h-px w-10 bg-teal" />
              The Resort Day
            </p>
            <h2 className="font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[56px]">
              The unpretentiously
              <br />
              <span className="italic text-teal">luxurious extras</span>.
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="lg:col-span-7">
            <p className="font-serif text-[19px] leading-[1.85] text-charcoal/85 lg:text-[21px]">
              {ACTIVITIES_INTRO.body}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {ACTIVITIES_STATS.map((s) => (
                <div
                  key={s.label}
                  className="border-l border-charcoal/15 pl-5"
                >
                  <p className="font-serif text-3xl text-charcoal lg:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-charcoal/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ACTIVITY CARD                                                      */
/* ================================================================== */
function ActivityCard({ activity, index, onOpenLightbox }) {
  const cover = activity.images[0];
  return (
    <motion.article
      {...fadeUp((index % 3) * 0.08)}
      className="group flex flex-col bg-white"
    >
      <button
        onClick={() => onOpenLightbox(activity, 0)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-ocean"
      >
        <img
          src={cover}
          alt={activity.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean/55 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-30" />
        {activity.images.length > 1 && (
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-ocean/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-teal" />
            {activity.images.length} Photos
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col px-1 pt-7">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-teal">
          <span className="h-px w-6 bg-teal" />
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-serif text-2xl leading-[1.15] text-charcoal lg:text-[26px]">
          {activity.name}
        </h3>
        <p className="mt-2 font-serif text-base italic text-teal">
          {activity.tagline}
        </p>
        <p className="mt-4 flex-1 text-[14px] leading-[1.85] text-charcoal/75">
          {activity.description}
        </p>
        <button
          onClick={() => onOpenLightbox(activity, 0)}
          className="group/btn mt-6 inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal transition-colors hover:text-teal"
        >
          View Gallery
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

/* ================================================================== */
/*  CATEGORY BAND                                                      */
/* ================================================================== */
function CategoryBand({ category, indexInPage, onOpenLightbox }) {
  const tinted = indexInPage % 2 === 1;
  return (
    <section
      className={`relative py-20 lg:py-28 ${
        tinted ? "bg-white" : "bg-ivory"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div {...fadeUp()} className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-charcoal">
            <span className="h-px w-10 bg-teal" />
            {category.caption} Ã‚· {String(indexInPage + 1).padStart(2, "0")}
          </p>
          <h2 className="font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[52px]">
            {category.label}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {category.items.map((a, i) => (
            <ActivityCard
              key={a.slug}
              activity={a}
              index={i}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CATEGORIES COLLECTION                                              */
/* ================================================================== */
function CategoriesCollection({ onOpenLightbox }) {
  return (
    <div id="activities-collection" className="relative">
      <div className="bg-ivory pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-charcoal">
              <span className="h-px w-10 bg-teal" />
              The Experiences
            </p>
            <h2 className="font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[56px]">
              Four worlds.{" "}
              <span className="italic text-teal">One coastline.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.85] text-charcoal/70">
              Wellness sanctuaries, sea-edged pools, sunlit courts, and luminous
              gardens — the resort opens itself in chapters, each shaped for a
              different mood of the day.
            </p>
          </motion.div>
        </div>
      </div>

      {ACTIVITIES_BY_CATEGORY.map((cat, i) => (
        <CategoryBand
          key={cat.id}
          category={cat}
          indexInPage={i}
          onOpenLightbox={onOpenLightbox}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  TIMELINE — A day at the resort                                     */
/* ================================================================== */
const TIMELINE = [
  {
    icon: Sunrise,
    time: "Sunrise",
    title: "A walk along the boardwalk",
    note: "Begin the day with a coastal stroll, coffee in hand.",
  },
  {
    icon: Sun,
    time: "Late Morning",
    title: "Pool, court, or studio",
    note: "Choose the beachfront Infinity Pool, a tennis rally, or a session at The Spa.",
  },
  {
    icon: Sunset,
    time: "Golden Hour",
    title: "Watersports & private beach",
    note: "Paddle the cove or settle into the sand as the sea turns gold.",
  },
  {
    icon: Moon,
    time: "Evening",
    title: "Gardens of light",
    note: "End the day at Haribar Lounge with cocktails and a sunset over the Davao Gulf.",
  },
];

function Timeline() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(201,163,107,0.55) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(90,155,191,0.55) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div {...fadeUp()} className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-teal">
            <span className="h-px w-10 bg-teal" />A Day at Discovery Samal
          </p>
          <h2 className="font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[52px]">
            From first light to
            <br />
            <span className="italic text-teal">lantern glow</span>.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {TIMELINE.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                {...fadeUp(i * 0.08)}
                key={t.title}
                className="border-t border-white/15 pt-6"
              >
                <Icon className="h-6 w-6 text-teal" />
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-teal">
                  {t.time}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-[1.2] text-white">
                  {t.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.85] text-white/70">
                  {t.note}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  LIGHTBOX                                                           */
/* ================================================================== */
function Lightbox({ item, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex || 0);
  const total = item?.images?.length || 0;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    setIndex(startIndex || 0);
  }, [startIndex, item]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ocean/96 backdrop-blur-sm"
    >
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-5 lg:px-10">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-teal">
            Experience
          </p>
          <p className="mt-1 font-serif text-xl text-white">{item.name}</p>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[12px] tracking-[0.2em] text-white/60">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-teal hover:text-teal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {total > 1 && (
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-teal hover:text-teal lg:left-8 lg:h-14 lg:w-14"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        src={item.images[index]}
        alt={`${item.name} ${index + 1}`}
        className="max-h-[80vh] max-w-[88vw] object-contain"
      />

      {total > 1 && (
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-teal hover:text-teal lg:right-8 lg:h-14 lg:w-14"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </motion.div>
  );
}

/* ================================================================== */
/*  FINAL CTA                                                          */
/* ================================================================== */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ocean py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(201,163,107,0.4) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(90,155,191,0.5) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        <motion.div {...fadeUp()}>
          <p className="mb-6 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-teal">
            <span className="h-px w-10 bg-teal" />
            Plan Your Stay
            <span className="h-px w-10 bg-teal" />
          </p>
          <h2 className="font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            The coastline
            <br />
            <span className="italic text-teal">is waiting.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-[1.85] text-white/70">
            Reserve a stay at Discovery Samal Resort and unlock the full
            collection — from The Spa wellness rituals to sunset cocktails at
            Haribar Lounge.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-3 bg-teal px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ocean transition-all hover:bg-teal"
            >
              <Compass className="h-4 w-4" />
              Reserve Your Stay
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/30 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-all hover:border-teal hover:text-teal"
            >
              Speak with Concierge
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function Activities() {
  const [lightbox, setLightbox] = useState({ item: null, index: 0 });

  const open = (item, index) => setLightbox({ item, index });
  const close = () => setLightbox({ item: null, index: 0 });

  return (
    <main className="bg-ivory text-charcoal">
      <Hero />
      <Intro />
      <CategoriesCollection onOpenLightbox={open} />
      <Timeline />
      <FinalCTA />

      <AnimatePresence>
        {lightbox.item && (
          <Lightbox
            item={lightbox.item}
            startIndex={lightbox.index}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
