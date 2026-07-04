import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Users,
  BedDouble,
  Maximize2,
  MapPin,
  CalendarDays,
  Tag,
  Sparkles,
  Wifi,
  Coffee,
  Snowflake,
  ShieldCheck,
  Tv,
  Bath,
  Utensils,
  Waves,
  Car,
  Wind,
  Trees,
  Refrigerator,
  Droplet,
  X,
} from "lucide-react";
import { getRoomBySlug, getRooms } from "../services/api";

/* ------------------------------------------------------------------ */
/*  Brand palette                                                     */
/*    navy        #0a1f3d                                              */
/*    deep navy   #050d1f                                              */
/*    gold        #c9a36b                                              */
/*    gold soft   #d8b988                                              */
/*    santorini   #5a9bbf                                              */
/*    ivory       #f5f1e8                                              */
/* ------------------------------------------------------------------ */

const AMENITY_ICONS = {
  "air conditioner": Snowflake,
  "air conditioning": Snowflake,
  "wi-fi": Wifi,
  wifi: Wifi,
  "wi-fi access": Wifi,
  internet: Wifi,
  "tv (hd)": Tv,
  "cable tv": Tv,
  "led tv": Tv,
  tv: Tv,
  "coffee & tea": Coffee,
  coffee: Coffee,
  "in-room safety box": ShieldCheck,
  "in-room safe": ShieldCheck,
  "fire extinguisher": ShieldCheck,
  "mini refrigerator": Refrigerator,
  refrigerator: Refrigerator,
  "mini bar": Utensils,
  bar: Utensils,
  kitchen: Utensils,
  "dining table": Utensils,
  "bottled water": Droplet,
  "hot & cold shower": Bath,
  bathtub: Bath,
  "private bathtub": Bath,
  "common bathroom": Bath,
  "private pool": Waves,
  "infinity pool": Waves,
  "common infinity pool": Waves,
  parking: Car,
  "car garage": Car,
  balcony: Wind,
  "smoking area": Wind,
  bedroom: BedDouble,
  "living room": Sparkles,
  "kid friendly": Users,
  "pet friendly": Trees,
};

const iconForAmenity = (label) =>
  AMENITY_ICONS[
    String(label || "")
      .toLowerCase()
      .trim()
  ] || Sparkles;

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
  transition: { delay, duration: 1, ease: "easeOut" },
});

function formatPeso(value) {
  return `₱${Number(value || 0).toLocaleString()}`;
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function Hero({ room, onOpenGallery }) {
  const cover =
    room.images?.[0] ||
    "https://image-tc.galaxy.tf/wijpeg-9g0c8e4jia8i8dw5hv5xd3r05/dss-website-banner-home-page-2.jpg";
  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden bg-[#1a1a1a]">
      <motion.img
        {...fadeIn()}
        src={cover}
        alt={room.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/75 via-[#1a1a1a]/15 to-[#1a1a1a]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/55 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 lg:px-10">
        <motion.nav
          {...fadeUp(0.1)}
          className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/55"
        >
          <Link to="/" className="transition hover:text-[#d8b988]">
            Home
          </Link>
          <span>/</span>
          <Link to="/rooms" className="transition hover:text-[#d8b988]">
            Rooms & Villas
          </Link>
          <span>/</span>
          <span className="text-[#d8b988]">{room.name}</span>
        </motion.nav>

        <motion.p
          {...fadeUp(0.18)}
          className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d8b988]"
        >
          <span className="h-px w-10 bg-[#c9a36b]/70" />
          {room.category || "Accommodation"}
        </motion.p>
        <motion.h1
          {...fadeUp(0.28)}
          className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-[5.5rem]"
        >
          {room.name}
        </motion.h1>
        {room.tagline && (
          <motion.p
            {...fadeUp(0.4)}
            className="mt-5 max-w-2xl text-lg italic text-[#C9A96E] lg:text-xl"
          >
            {room.tagline}
          </motion.p>
        )}

        <motion.div
          {...fadeUp(0.5)}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/70"
        >
          {room.size && (
            <span className="flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-[#d8b988]" />
              {room.size}
            </span>
          )}
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#d8b988]" />
            Up to {room.maxGuests || room.occupancy || 2} guests
          </span>
          {room.bedType && (
            <span className="flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-[#d8b988]" />
              {room.bedType}
            </span>
          )}
          {room.location && (
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#d8b988]" />
              {room.location}
            </span>
          )}
        </motion.div>

        {Array.isArray(room.images) && room.images.length > 1 && (
          <motion.button
            {...fadeUp(0.6)}
            type="button"
            onClick={onOpenGallery}
            className="inline-flex w-fit items-center gap-2 border border-[#C9A96E]/50 bg-white/5 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur transition hover:bg-[#C9A96E] hover:text-[#1a1a1a]"
          >
            View Full Gallery ({room.images.length})
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent z-10" />
    </section>
  );
}

/* ================================================================== */
/*  RESERVATION CARD (sticky)                                          */
/* ================================================================== */
function ReservationCard({ room }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(String(room.maxGuests || 2));

  const original = Number(
    room.originalPricePerNight ?? room.pricePerNight ?? 0,
  );
  const effective = Number(
    room.effectivePricePerNight ?? room.discountPrice ?? original,
  );
  const hasPromo = effective < original;

  const params = new URLSearchParams();
  params.set("room", room._id || room.slug);
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (guests) params.set("guests", guests);
  const href = `/booking?${params.toString()}`;

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="border border-[#0a1f3d]/10 bg-white shadow-[0_30px_80px_-40px_rgba(10,31,61,0.25)]">
        {/* gold hairline top */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a36b] to-transparent" />

        <div className="p-7 lg:p-8">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#651D4C]">
            ✦ Reserve this stay
          </p>

          <div className="mb-7 flex items-baseline gap-3">
            {hasPromo && (
              <span className="text-sm text-[#0a1f3d]/35 line-through">
                {formatPeso(original)}
              </span>
            )}
            <span className="font-serif text-4xl text-[#651D4C]">
              {formatPeso(effective)}
            </span>
            <span className="text-xs text-[#0a1f3d]/55">/ night</span>
          </div>

          {hasPromo && (
            <div className="mb-5 inline-block bg-[#c9a36b]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0a1f3d]">
              {room.discountLabel || "Best Rate Available"}
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <SmallField label="Check-in" icon={CalendarDays}>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0a1f3d] focus:outline-none"
              />
            </SmallField>
            <SmallField label="Check-out" icon={CalendarDays}>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0a1f3d] focus:outline-none"
              />
            </SmallField>
            <SmallField label="Guests" icon={Users}>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0a1f3d] focus:outline-none"
              >
                {[...Array(Math.max(8, room.maxGuests || 2)).keys()].map(
                  (i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Guest" : "Guests"}
                    </option>
                  ),
                )}
              </select>
            </SmallField>

            <Link
              to={href}
              className="group mt-2 flex items-center justify-center gap-2 bg-[#c9a36b] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#050d1f] transition hover:bg-[#d8b988]"
            >
              <Tag className="h-3.5 w-3.5" />
              Reserve Now
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/contact"
              className="block text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0a1f3d]/55 underline-offset-8 transition hover:underline"
            >
              Or speak with concierge
            </Link>
          </form>

          <div className="mt-7 space-y-2 border-t border-[#0a1f3d]/10 pt-5 text-[11px] text-[#0a1f3d]/60">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#c9a36b]" />
              Best rate guarantee
            </p>
            <p className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#c9a36b]" />
              Buffet breakfast included
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-[#c9a36b]" />
              Free cancellation up to 48h prior
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SmallField({ label, icon: Icon, children }) {
  return (
    <div className="border border-[#0a1f3d]/15 px-4 py-3">
      <p className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#0a1f3d]/55">
        <Icon className="h-3 w-3 text-[#c9a36b]" /> {label}
      </p>
      {children}
    </div>
  );
}

/* ================================================================== */
/*  OVERVIEW + AMENITIES                                               */
/* ================================================================== */
function Overview({ room }) {
  return (
    <div className="space-y-12">
      {/* Description */}
      <motion.div {...fadeUp()}>
        <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#5a9bbf]">
          <span className="h-px w-10 bg-[#c9a36b]" />
          The stay
        </p>
        <h2 className="mb-7 font-serif text-3xl leading-tight text-[#0a1f3d] lg:text-4xl">
          A room with a <span className="italic text-[#c9a36b]">view</span>.
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-[#0a1f3d]/70">
          <p>{room.description}</p>
          {room.intro && <p>{room.intro}</p>}
        </div>
      </motion.div>

      {/* Amenities */}
      {Array.isArray(room.features) && room.features.length > 0 && (
        <motion.div {...fadeUp(0.1)}>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#5a9bbf]">
            <span className="h-px w-10 bg-[#c9a36b]" />
            In your suite
          </p>
          <h3 className="mb-7 font-serif text-2xl text-[#0a1f3d] lg:text-3xl">
            Amenities & inclusions
          </h3>
          <div className="grid gap-px bg-[#0a1f3d]/8 sm:grid-cols-2 lg:grid-cols-3">
            {room.features.map((f) => {
              const Icon = iconForAmenity(f);
              return (
                <div
                  key={f}
                  className="flex items-center gap-4 bg-white px-5 py-4 transition hover:bg-[#f5f1e8]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#c9a36b]/30 bg-[#f5f1e8]">
                    <Icon className="h-4 w-4 text-[#c9a36b]" />
                  </span>
                  <span className="text-sm text-[#0a1f3d]/75">{f}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Specs */}
      <motion.div {...fadeUp(0.15)}>
        <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#5a9bbf]">
          <span className="h-px w-10 bg-[#c9a36b]" />
          The details
        </p>
        <h3 className="mb-7 font-serif text-2xl text-[#0a1f3d] lg:text-3xl">
          Suite specifications
        </h3>
        <dl className="grid gap-px bg-[#0a1f3d]/8 sm:grid-cols-2">
          <SpecItem label="Size" value={room.size || "—"} icon={Maximize2} />
          <SpecItem
            label="Maximum Guests"
            value={`${room.maxGuests || room.occupancy || 2} guests`}
            icon={Users}
          />
          <SpecItem
            label="Bed Configuration"
            value={room.bedType || "Premium bedding"}
            icon={BedDouble}
          />
          <SpecItem
            label="Category"
            value={room.category || "Accommodation"}
            icon={Sparkles}
          />
          <SpecItem
            label="Location"
            value={room.location || "Cebu, Philippines"}
            icon={MapPin}
          />
          <SpecItem
            label="Check-in / out"
            value="2:00 PM / 12:00 NN"
            icon={CalendarDays}
          />
        </dl>
      </motion.div>
    </div>
  );
}

function SpecItem({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-4 bg-white p-6">
      <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#c9a36b]/30 bg-[#f5f1e8]">
        <Icon className="h-4 w-4 text-[#c9a36b]" />
      </span>
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0a1f3d]/55">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-[#0a1f3d]/85">{value}</dd>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  GALLERY GRID + LIGHTBOX                                            */
/* Shows ALL images uploaded from admin — beautiful editorial layout  */
/* ================================================================== */
function GallerySection({ images, onOpen }) {
  const [showAll, setShowAll] = useState(false);

  if (!Array.isArray(images) || images.length < 2) return null;

  // Layout: first 3 in feature row, rest in uniform grid (max 12 visible before "show more")
  const [feature, ...rest] = images;
  const secondary = rest.slice(0, 2);           // 2 stacked beside feature
  const overflow = rest.slice(2);               // all remaining
  const GRID_LIMIT = 6;
  const gridVisible = showAll ? overflow : overflow.slice(0, GRID_LIMIT);
  const hiddenCount = overflow.length - GRID_LIMIT;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <motion.div {...fadeUp()} className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#651D4C]">
              <span className="h-px w-8 bg-[#651D4C]" />
              Photo Gallery
            </p>
            <h2 className="font-serif text-3xl text-[#1a1a1a] lg:text-4xl">
              Inside your <span className="italic text-[#c9a36b]">room</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpen(0)}
            className="flex items-center gap-2 border border-[#1a1a1a]/20 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1a1a1a]/70 transition hover:border-[#651D4C] hover:text-[#651D4C]"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            View all {images.length} photo{images.length !== 1 ? "s" : ""}
          </button>
        </motion.div>

        {/* ── ROW 1: Feature + 2 stacked ── */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
          {/* Feature — spans 2 cols */}
          <motion.button
            {...fadeUp(0)}
            type="button"
            onClick={() => onOpen(0)}
            className="group relative overflow-hidden lg:col-span-2"
          >
            <img
              src={feature}
              alt="Room — feature photo"
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-80 lg:h-[520px]"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <ArrowUpRight className="h-3 w-3" /> Expand
            </span>
          </motion.button>

          {/* 2 stacked thumbnails */}
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
            {secondary.map((src, i) => (
              <motion.button
                {...fadeUp((i + 1) * 0.08)}
                key={src + i}
                type="button"
                onClick={() => onOpen(i + 1)}
                className="group relative overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Room photo ${i + 2}`}
                  loading="lazy"
                  className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] sm:h-40 lg:h-[252px]"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── ROW 2+: Uniform 3-col grid for all remaining ── */}
        {overflow.length > 0 && (
          <div className="mt-2 lg:mt-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:gap-3">
              {gridVisible.map((src, i) => (
                <motion.button
                  {...fadeUp(i * 0.05)}
                  key={src + i}
                  type="button"
                  onClick={() => onOpen(i + 3)}
                  className="group relative overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Room photo ${i + 4}`}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] sm:h-52"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                  {/* Show counter overlay on last visible tile if more hidden */}
                  {!showAll && i === gridVisible.length - 1 && hiddenCount > 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55">
                      <span className="font-serif text-3xl font-light text-white">+{hiddenCount}</span>
                      <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/80">more photos</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Show more / show less toggle */}
            {!showAll && hiddenCount > 0 && (
              <motion.div {...fadeUp(0.2)} className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 border border-[#651D4C] px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#651D4C] transition hover:bg-[#651D4C] hover:text-white"
                >
                  Show all {images.length} photos
                </button>
              </motion.div>
            )}
            {showAll && overflow.length > GRID_LIMIT && (
              <motion.div {...fadeUp(0.1)} className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1a1a1a]/45 underline-offset-4 hover:underline"
                >
                  Show less
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Total count label */}
        <p className="mt-6 text-right text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/30">
          {images.length} photo{images.length !== 1 ? "s" : ""} · Click to expand
        </p>
      </div>
    </section>
  );
}


function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050d1f]/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 grid h-12 w-12 place-items-center border border-white/20 text-white transition hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/20 text-white transition hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/20 text-white transition hover:bg-white/10"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <motion.img
          key={images[index]}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          src={images[index]}
          alt={`Image ${index + 1}`}
          className="max-h-[90vh] max-w-[92vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <p className="absolute bottom-6 left-0 right-0 text-center text-[11px] uppercase tracking-[0.32em] text-white/60">
          {index + 1} / {images.length}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  RELATED ROOMS                                                      */
/* ================================================================== */
function RelatedRooms({ rooms, currentSlug }) {
  const others = useMemo(
    () =>
      rooms
        .filter((r) => r.slug !== currentSlug && r.available !== false)
        .slice(0, 3),
    [rooms, currentSlug],
  );

  if (others.length === 0) return null;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#5a9bbf]">
            <span className="h-px w-10 bg-[#c9a36b]" />
            More to discover
            <span className="h-px w-10 bg-[#c9a36b]" />
          </p>
          <h2 className="font-serif text-4xl text-[#0a1f3d] lg:text-5xl">
            Other <span className="italic text-[#c9a36b]">stays</span>.
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {others.map((r, i) => {
            const original = Number(r.pricePerNight || 0);
            const effective = Number(r.discountPrice || original);
            const hasPromo = effective < original;
            return (
              <motion.article
                {...fadeUp(i * 0.08)}
                key={r._id || r.slug}
                className="group flex flex-col overflow-hidden border border-[#0a1f3d]/8 bg-white"
              >
                <Link
                  to={`/rooms/${r.slug}`}
                  className="relative block h-64 overflow-hidden"
                >
                  <img
                    src={r.images?.[0]}
                    alt={r.name}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  {hasPromo && (
                    <span className="absolute left-4 top-4 bg-[#c9a36b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#050d1f]">
                      {r.discountLabel || "Best Rate"}
                    </span>
                  )}
                </Link>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5a9bbf]">
                      {r.category || "Stay"}
                    </p>
                    <h3 className="mb-3 font-serif text-xl text-[#0a1f3d]">
                      {r.name}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#0a1f3d]/60">
                      {r.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-[#0a1f3d]/10 pt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#0a1f3d]/45">
                        From
                      </span>
                      <p className="font-serif text-xl text-[#0a1f3d]">
                        {formatPeso(effective)}
                      </p>
                    </div>
                    <Link
                      to={`/rooms/${r.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0a1f3d] transition hover:text-[#c9a36b]"
                    >
                      View
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STATIC ROOM CATALOG — fallback when API is unreachable            */
/* ================================================================== */
const WS = "https://homesweb.staah.net";
const STATIC_ROOMS = [
  {
    slug: "deluxe",
    name: "Deluxe",
    category: "Deluxe",
    tagline: "Comfortable island comfort for two",
    description:
      "Single/twin adult occupancy, max 2 kids aged 11 & below. Floor area: 30-35 sqm. Standard bed: 1 single + 1 double bed (limited King size bed rooms available).",
    pricePerNight: 3500,
    maxGuests: 4,
    size: "30-35 sqm",
    bedType: "1 Single + 1 Double bed",
    available: true,
    images: [
      WS + "/imagelibrary/big_1702967760_8689_heritagedeluxe1.jpg",
      WS + "/imagelibrary/big_1702967765_8689_heritagedeluxe2.jpg",
    ],
    features: [
      "Balcony",
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Shower",
      "Hair Dryer",
      "Electric Kettle",
      "Refrigerator",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Desk",
      "Towels & Toiletries",
    ],
  },
  {
    slug: "grandluxe-room",
    name: "Grand Luxe Room",
    category: "Luxury",
    tagline: "Elevated comfort with garden or pool views",
    description:
      "Elevated guest experience with premium furnishings and plush bedding. Features a balcony and a full suite of modern amenities ideal for couples.",
    pricePerNight: 4500,
    maxGuests: 3,
    size: "35-40 sqm",
    bedType: "1 King size bed",
    available: true,
    images: [
      WS + "/imagelibrary/big_1702966945_8689_WhiteSandsResort2019119.jpg",
    ],
    features: [
      "Balcony",
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Bathtub & Shower",
      "Hair Dryer",
      "Electric Kettle",
      "Refrigerator",
      "Bathrobes",
      "Room Slippers",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Towels & Toiletries",
    ],
  },
  {
    slug: "premier-room",
    name: "Premier Room",
    category: "Premier",
    tagline: "Spacious premier rooms with premium touches",
    description:
      "Generous well-appointed space for guests who demand a premium stay. High-quality furnishings, minibar, and direct access to resort facilities.",
    pricePerNight: 5500,
    maxGuests: 3,
    size: "40-45 sqm",
    bedType: "1 King size bed",
    available: true,
    images: [WS + "/imagelibrary/big_1702975136_8689_1.png"],
    features: [
      "Balcony",
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Bathtub & Shower",
      "Hair Dryer",
      "Electric Kettle",
      "Refrigerator",
      "Bathrobes",
      "Room Slippers",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Desk",
      "Towels & Toiletries",
    ],
  },
  {
    slug: "ocean-view-suite",
    name: "Ocean View Suite",
    category: "Luxury",
    tagline: "Breathtaking beachfront views from your balcony",
    description:
      "Single/twin occupancy, max 2 kids aged 11 & below free in room. 80 sq. m. with a balcony overlooking the beach. 1 King size bed.",
    pricePerNight: 10200,
    maxGuests: 4,
    size: "80 sqm",
    bedType: "1 King size bed",
    available: true,
    images: [
      WS + "/imagelibrary/big_1705900556_8689_WhiteSandsResort201944.jpg",
      WS + "/imagelibrary/big_1715394652_8689_SUITE_CR.jpg",
    ],
    features: [
      "Beachfront Balcony",
      "Ocean View",
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Bathtub & Shower",
      "Hair Dryer",
      "Bathrobes",
      "Room Slippers",
      "Electric Kettle",
      "Refrigerator",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Towels & Toiletries",
    ],
  },
  {
    slug: "family-room",
    name: "Family Room",
    category: "Family",
    tagline: "Spacious and welcoming for the whole family",
    description:
      "Thoughtfully designed for families — multiple beds, ample space, and all amenities needed for a relaxed stay together at Mactan Island.",
    pricePerNight: 6000,
    maxGuests: 5,
    size: "45-55 sqm",
    bedType: "2 Double beds",
    available: true,
    images: [
      WS + "/imagelibrary/big_1702975987_8689_WhiteSandsResort2019307.jpg",
    ],
    features: [
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Shower",
      "Hair Dryer",
      "Electric Kettle",
      "Refrigerator",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Desk",
      "Towels & Toiletries",
      "Kid-friendly setup",
    ],
  },
  {
    slug: "family-suite",
    name: "Family Suite",
    category: "Family",
    tagline: "A suite experience tailored for families",
    description:
      "Combines suite-level comfort with dedicated family-friendly amenities. Generous living area and multiple sleeping configurations.",
    pricePerNight: 8500,
    maxGuests: 6,
    size: "60-70 sqm",
    bedType: "1 King + 2 Single beds",
    available: true,
    images: [WS + "/imagelibrary/big_1702976465_8689_untitled-23.jpg"],
    features: [
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Bathtub & Shower",
      "Hair Dryer",
      "Bathrobes",
      "Room Slippers",
      "Electric Kettle",
      "Refrigerator",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Desk",
      "Towels & Toiletries",
      "Kid-friendly setup",
    ],
  },
  {
    slug: "panoramic-view-suite",
    name: "Panoramic View Suite",
    category: "Luxury",
    tagline: "360° panoramic views of Mactan Island and the sea",
    description:
      "Our most spectacular sea-view suite — expansive views of the Mactan Island coastline. Premium furnishings and a wrap-around balcony.",
    pricePerNight: 12000,
    maxGuests: 3,
    size: "75-85 sqm",
    bedType: "1 King size bed",
    available: true,
    images: [
      WS + "/imagelibrary/big_1702977955_8689_WhiteSandsResort201933.jpg",
    ],
    features: [
      "Panoramic Balcony",
      "Panoramic Sea View",
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Bathtub & Shower",
      "Hair Dryer",
      "Bathrobes",
      "Room Slippers",
      "Electric Kettle",
      "Refrigerator",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Towels & Toiletries",
    ],
  },
  {
    slug: "grand-luxe-plus",
    name: "Grand Luxe Plus",
    category: "Luxury",
    tagline: "The pinnacle of resort luxury at Cebu White Sands",
    description:
      "The finest room at Cebu White Sands Resort. Expansive floor plan, premium furnishings, living area, and top-tier amenities.",
    pricePerNight: 15000,
    maxGuests: 3,
    size: "85-100 sqm",
    bedType: "1 King size bed",
    available: true,
    images: [
      WS + "/imagelibrary/big_1732177969_8689_Mabuhaygrandluxeroom1.jpg",
    ],
    features: [
      "Private Balcony",
      "Panoramic Sea View",
      "Air-conditioning",
      "Free WiFi",
      "Flat Screen TV",
      "Private Bathroom",
      "Bathtub & Shower",
      "Hair Dryer",
      "Bathrobes",
      "Room Slippers",
      "Electric Kettle",
      "Refrigerator",
      "Electronic Door Lock",
      "In-room Safe",
      "Non-smoking",
      "Free Parking",
      "Desk",
      "Living Area",
      "Towels & Toiletries",
    ],
  },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function RoomDetails() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRoomBySlug(slug)
      .then((res) => {
        if (!mounted) return;
        const data = res.data?.data || res.data;
        setRoom(data || null);
      })
      .catch(() => {
        // API unreachable — show not-found state
        if (!mounted) return;
        setRoom(null);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [slug]);

  useEffect(() => {
    let mounted = true;
    getRooms({ available: true })
      .then((res) => {
        if (!mounted) return;
        const list = res.data?.data || res.data || [];
        setRelated(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        // API unreachable — show empty related rooms
        if (mounted) setRelated([]);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="grid min-h-[80vh] place-items-center bg-[#f5f1e8]">
        <div className="text-center">
          <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border border-[#c9a36b]/30 border-t-[#c9a36b]" />
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#0a1f3d]/45">
            Preparing your stay
          </p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="grid min-h-[80vh] place-items-center bg-[#f5f1e8] px-6">
        <div className="max-w-md text-center">
          <p className="mb-4 font-serif text-4xl text-[#0a1f3d]">
            This stay isn't available
          </p>
          <p className="mb-8 leading-relaxed text-[#0a1f3d]/60">
            The accommodation you were looking for can no longer be found.
            Browse our other rooms to find your retreat.
          </p>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 bg-[#0a1f3d] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#050d1f]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const images = Array.isArray(room.images) ? room.images : [];
  const openGallery = (i = 0) => setLightbox({ open: true, index: i });
  const closeGallery = () => setLightbox({ open: false, index: 0 });
  const prev = () =>
    setLightbox((s) => ({
      ...s,
      index: (s.index - 1 + images.length) % images.length,
    }));
  const next = () =>
    setLightbox((s) => ({
      ...s,
      index: (s.index + 1) % images.length,
    }));

  return (
    <div className="bg-[#f5f1e8]">
      <Hero room={room} onOpenGallery={() => openGallery(0)} />

      {/* Two-column body */}
      <section className="bg-[#f5f1e8] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:px-10">
          <div>
            <Overview room={room} />
          </div>
          <ReservationCard room={room} />
        </div>
      </section>

      <GallerySection images={images} onOpen={openGallery} />
      <RelatedRooms rooms={related} currentSlug={room.slug} />

      {/* Final CTA */}
      <section className="bg-[#0a1f3d] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <motion.h2
            {...fadeUp()}
            className="font-serif text-4xl leading-tight lg:text-5xl"
          >
            Your <span className="italic text-[#d8b988]">{room.name}</span>{" "}
            awaits.
          </motion.h2>
          <motion.div
            {...fadeUp(0.15)}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to={`/booking?room=${room._id || room.slug}`}
              className="inline-flex items-center gap-3 bg-[#c9a36b] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#050d1f] transition hover:bg-[#d8b988]"
            >
              <Tag className="h-3.5 w-3.5" />
              Reserve Now
            </Link>
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 underline-offset-8 transition hover:text-[#d8b988] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Explore Other Rooms
            </Link>
          </motion.div>
        </div>
      </section>

      {lightbox.open && (
        <Lightbox
          images={images}
          index={lightbox.index}
          onClose={closeGallery}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}
