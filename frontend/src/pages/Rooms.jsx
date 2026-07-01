import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BedDouble,
  Users,
  Maximize2,
  Sparkles,
  CalendarDays,
  Tag,
  ShieldCheck,
  Wifi,
  Coffee,
  Waves,
  Snowflake,
} from "lucide-react";
import { useRooms } from "../hooks/useRooms";
import { useBookingSettings } from "../hooks/useBookingSettings";
import { brand } from "../lib/brand";

const HERO_IMAGE =
  "https://image-tc.galaxy.tf/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg?width=1920";

const COMMON_AMENITIES = [
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Coffee, label: "Coffee & Tea" },
  { icon: Snowflake, label: "Air-Conditioned" },
  { icon: ShieldCheck, label: "In-room Safe" },
];

const STATS = [
  { value: "400", label: "Sqm Largest Suite" },
  { value: "5?", label: "Curated Amenities" },
  { value: "180�", label: "Beach-view Rooms" },
];

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

function formatPeso(value) {
  const n = Number(value || 0);
  return `?${n.toLocaleString()}`;
}

/* ================================================================== */
/*  HERO � cinematic full-bleed                                        */
/* ================================================================== */
function Hero() {
  return (
    <section className="relative h-[85vh] min-h-150 w-full overflow-hidden bg-ocean">
      <motion.img
        {...fadeIn()}
        src={HERO_IMAGE}
        alt="Discovery Samal Resort Rooms & Suites"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ocean/80 via-ocean/15 to-ocean/95" />
      <div className="absolute inset-0 bg-linear-to-r from-ocean/60 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-32 lg:px-10">
        <motion.p
          {...fadeUp(0.1)}
          className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
        >
          <span className="h-px w-10 bg-teal/70" />
          Rooms & Suites
        </motion.p>
        <motion.h1
          {...fadeUp(0.2)}
          className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          A stay worth
          <br />
          <span className="italic text-teal">remembering.</span>
        </motion.h1>
        <motion.p
          {...fadeUp(0.35)}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg"
        >
          From warm beachside classics to the signature Luxury Villa &mdash; eight
          rooms shaped around the unhurried pace of Samal Island.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-teal/60 to-transparent" />
    </section>
  );
}

/* ================================================================== */
/*  BOOKING WIDGET � floating glass band overlapping hero              */
/* ================================================================== */
function BookingWidget({ maxGuests = 8 }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const params = new URLSearchParams();
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (guests) params.set("guests", guests);
  const href = params.toString() ? `/booking?${params.toString()}` : "/booking";

  const guestOptions = Array.from({ length: maxGuests }, (_, i) => i + 1);

  return (
    <section className="relative z-20 -mt-24 px-6 lg:px-10">
      <motion.div
        {...fadeUp()}
        className="mx-auto max-w-6xl border border-white/10 bg-ocean/85 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:p-8"
      >
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-teal">
          ? Reserve your stay
        </p>
        <form
          className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="Check-in" icon={CalendarDays}>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
            />
          </Field>
          <Field label="Check-out" icon={CalendarDays}>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
            />
          </Field>
          <Field label="Guests" icon={Users}>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-sm text-white focus:outline-none [&>option]:text-ocean"
            >
              {guestOptions.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </Field>
          <Link
            to={href}
            className="group flex items-center justify-center gap-2 bg-teal px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ocean transition hover:bg-teal"
          >
            Check Availability
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </form>
      </motion.div>
    </section>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div className="border border-white/10 bg-white/5 px-4 py-3">
      <p className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/55">
        <Icon className="h-3 w-3 text-teal" /> {label}
      </p>
      {children}
    </div>
  );
}

/* ================================================================== */
/*  EDITORIAL INTRO � manifesto + stats                                */
/* ================================================================== */
function Intro() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-24 lg:px-10">
        <motion.div {...fadeUp()}>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
            <span className="h-px w-10 bg-teal" />
            Eight rooms, one horizon
          </p>
          <h2 className="mb-7 font-serif text-4xl leading-tight text-charcoal lg:text-5xl">
            island living,
            <br />
            <span className="italic text-teal">beautifully done.</span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-charcoal/70">
            <p>
              Soft white sand. Warm turquoise water. Evenings that glow gold
              over the Davao Gulf. Every room at {brand.displayName} was shaped
              around one idea � that true rest comes when the place you stay in
              feels as unhurried as the island itself.
            </p>
            <p>
              Whether you choose a welcoming Classic Room or the signature
              Luxury Villa, you arrive to the same promise: thoughtful comfort,
              generous space, and the sound of the surf carrying through your
              open doors.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-charcoal/60">
            {COMMON_AMENITIES.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-teal" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          className="grid grid-cols-2 gap-px bg-charcoal/10"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-ivory p-8 text-center lg:p-10">
              <p className="font-serif text-4xl text-teal lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-charcoal/55">
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
/*  ROOM CARD � luxury alternating editorial                           */
/* ================================================================== */
function RoomCard({ room, index }) {
  const reversed = index % 2 === 1;
  const original = Number(
    room.originalPricePerNight ?? room.pricePerNight ?? 0,
  );
  const effective = Number(
    room.effectivePricePerNight ?? room.discountPrice ?? original,
  );
  const hasPromo = effective < original;
  const image =
    room.images?.[0] ||
    "https://d1lmdmhhbtmxsa.cloudfront.net/original_images/RCB05072-1024x682.jpg";

  return (
    <motion.article
      {...fadeUp(0.05)}
      className="group grid items-stretch gap-0 overflow-hidden border border-charcoal/8 bg-white lg:grid-cols-2"
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          reversed ? "lg:order-2" : ""
        } h-72 lg:h-auto lg:min-h-115`}
      >
        <img
          src={image}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ocean/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        {hasPromo && (
          <div className="absolute left-5 top-5 bg-teal px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-ocean">
            {room.discountLabel || "Best Rate"}
          </div>
        )}
        <div className="absolute bottom-5 right-5 bg-ocean/85 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-teal backdrop-blur">
          {room.category || "Stay"}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col justify-between gap-7 p-8 lg:p-12">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-teal">
            ? {room.location || "Samal Island, Davao del Norte"}
          </p>
          <h3 className="mb-3 font-serif text-3xl leading-tight text-charcoal lg:text-4xl">
            {room.name}
          </h3>
          {room.tagline && (
            <p className="mb-5 font-serif text-base italic text-teal">
              {room.tagline}
            </p>
          )}
          <p className="mb-6 text-sm leading-relaxed text-charcoal/65">
            {room.description}
          </p>

          {/* Specs row */}
          <div className="mb-6 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-charcoal/10 py-4 text-xs text-charcoal/70">
            {room.size && (
              <span className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-teal" />
                {room.size}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-teal" />
              Up to {room.maxGuests || room.occupancy || 2} guests
            </span>
            {room.bedType && (
              <span className="flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-teal" />
                {room.bedType}
              </span>
            )}
          </div>

          {/* Highlights */}
          {Array.isArray(room.features) && room.features.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-charcoal/65">
              {room.features.slice(0, 6).map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-teal" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price + CTA */}
        <div className="border-t border-charcoal/10 pt-6">
          <div className="mb-5 flex items-baseline gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-charcoal/45">
              From
            </span>
            {hasPromo && (
              <span className="text-sm text-charcoal/35 line-through">
                {formatPeso(original)}
              </span>
            )}
            <span className="font-serif text-3xl text-charcoal">
              {formatPeso(effective)}
            </span>
            <span className="text-xs text-charcoal/50">/ night</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/rooms/${room.slug}`}
              className="flex flex-1 items-center justify-center gap-2 border border-charcoal px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal transition hover:bg-charcoal hover:text-white"
            >
              View Details
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to={
                room._id
                  ? `/booking?room=${room._id}`
                  : `/booking?room=${room.slug}`
              }
              className="flex flex-1 items-center justify-center gap-2 bg-teal px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ocean transition hover:bg-teal"
            >
              <Tag className="h-3.5 w-3.5" />
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ================================================================== */
/*  ROOMS GRID                                                         */
/* ================================================================== */
function RoomsGrid({ rooms, isLoading, isError, refetch }) {
  if (isLoading) {
    return (
      <div className="space-y-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid h-115 animate-pulse gap-0 border border-charcoal/8 bg-white lg:grid-cols-2"
          >
            <div className="bg-charcoal/8" />
            <div className="space-y-4 p-10">
              <div className="h-3 w-24 bg-charcoal/10" />
              <div className="h-8 w-2/3 bg-charcoal/12" />
              <div className="h-3 w-full bg-charcoal/8" />
              <div className="h-3 w-5/6 bg-charcoal/8" />
              <div className="h-12 w-full bg-charcoal/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border border-red-200 bg-red-50 px-8 py-12 text-center">
        <p className="mb-4 text-sm text-red-700">
          Unable to load rooms right now.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-700 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="border border-charcoal/10 bg-white px-8 py-16 text-center">
        <p className="font-serif text-2xl text-charcoal/70">
          No rooms are currently available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 lg:space-y-16">
      {rooms.map((room, i) => (
        <RoomCard
          key={room._id || room.slug || room.name}
          room={room}
          index={i}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  INCLUSIONS BAND                                                    */
/* ================================================================== */
function Inclusions() {
  const items = [
    "Breakfast, lunch & dinner buffet for the registered occupancy",
    "Welcome fruit, cookies & complimentary bottled water",
    "Pool, beachfront & multipurpose pavilion access",
    "Complimentary Wi-Fi across the resort",
    "Welcome drinks on arrival",
    "Pet-friendly accommodations available",
  ];

  return (
    <section className="relative overflow-hidden bg-ocean py-24 text-white lg:py-32">
      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-charcoal/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp()} className="mb-14 max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
            <span className="h-px w-10 bg-teal" />
            Included with every stay
          </p>
          <h2 className="font-serif text-4xl leading-tight lg:text-5xl">
            Indulgence,
            <span className="italic text-teal"> taken care of.</span>
          </h2>
        </motion.div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp(i * 0.05)}
              className="flex items-start gap-4 bg-ocean p-7"
            >
              <span className="mt-1 inline-block h-8 w-8 shrink-0 border border-teal/40 text-center font-serif text-sm leading-7 text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-white/80">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FINAL CTA                                                          */
/* ================================================================== */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ivory py-28 lg:py-36">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-teal),transparent_50%)]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.p
          {...fadeUp()}
          className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
        >
          <span className="h-px w-10 bg-teal" />
          The island is waiting
          <span className="h-px w-10 bg-teal" />
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-serif text-4xl leading-tight text-charcoal lg:text-6xl"
        >
          Choose your <span className="italic text-teal">island stay</span>
          .
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal/65"
        >
          Speak with our reservations team for tailored packages, multi-night
          rates, and special celebrations on the beach.
        </motion.p>
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/booking"
            className="group flex items-center gap-3 bg-charcoal px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-ocean"
          >
            Reserve a Room
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/contact"
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal underline-offset-8 transition hover:underline"
          >
            Speak with Concierge
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function Rooms() {
  const {
    data: rooms = [],
    isLoading,
    isError,
    refetch,
  } = useRooms({
    available: true,
  });

  // Sort by price ascending so the editorial flow feels natural
  const sorted = useMemo(() => {
    return [...rooms].sort(
      (a, b) => Number(a.pricePerNight || 0) - Number(b.pricePerNight || 0),
    );
  }, [rooms]);

  // Use the admin-configured max guests per booking setting
  const { data: bookingSettings } = useBookingSettings();
  const maxGuests = bookingSettings?.maxGuestsPerBooking ?? 50;

  return (
    <div className="bg-ivory">
      <Hero />
      <BookingWidget maxGuests={maxGuests} />
      <Intro />

      <section className="bg-ivory pb-28 lg:pb-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div {...fadeUp()} className="mb-14 text-center">
            <p className="mb-4 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
              <span className="h-px w-10 bg-teal" />
              Curated stays
              <span className="h-px w-10 bg-teal" />
            </p>
            <h2 className="font-serif text-4xl text-charcoal lg:text-5xl">
              Find your <span className="italic text-teal">view</span>.
            </h2>
          </motion.div>

          <RoomsGrid
            rooms={sorted}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
          />
        </div>
      </section>

      <Inclusions />
      <FinalCTA />
    </div>
  );
}
