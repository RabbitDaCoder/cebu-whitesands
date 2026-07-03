import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useRooms } from "../hooks/useRooms";
import { ArrowRight, MapPin, Phone, Mail, Star } from "lucide-react";
import { brand } from "../lib/brand";
import HeroSection from "../sections/home/HeroSection";

const WS = "https://homesweb.staah.net";
const IMG = {
  rooms1: `${WS}/imagelibrary/big_1702967760_8689_heritagedeluxe1.jpg`,
  rooms2: `${WS}/imagelibrary/big_1702966945_8689_WhiteSandsResort2019119.jpg`,
  rooms3: `${WS}/imagelibrary/big_1702975136_8689_1.png`,
  rooms4: `${WS}/imagelibrary/big_1705900556_8689_WhiteSandsResort201944.jpg`,
  rooms5: `${WS}/imagelibrary/big_1702975987_8689_WhiteSandsResort2019307.jpg`,
  rooms6: `${WS}/imagelibrary/big_1702976465_8689_untitled-23.jpg`,
  rooms7: `${WS}/imagelibrary/big_1702977955_8689_WhiteSandsResort201933.jpg`,
  rooms8: `${WS}/imagelibrary/big_1732177969_8689_Mabuhaygrandluxeroom1.jpg`,
  dining1: `${WS}/8689/1706233575_8689_patio.jpg`,
  dining2: `${WS}/8689/1709537342_8689_patio_B.jpg`,
  spa: `${WS}/8689/1714188411_8689_anahata-spa_4.jpg`,
  events: `${WS}/8689/1703322544_8689_WEBSITEEVENTS.jpg`,
  hero1: `${WS}/imagelibrary/1705044784_8689_IMG_1655.jpg`,
  hero2: `${WS}/imagelibrary/1705046332_8689_anahata-25.jpg`,
  hero3: `${WS}/imagelibrary/1705046481_8689_fullresearial1.jpg`,
  hero4: `${WS}/imagelibrary/1704415237_8689_WhiteSandsResort201933.jpg`,
  cta: `${WS}/imagelibrary/1705046481_8689_fullresearial1.jpg`,
  about: `${WS}/8689/1704673021_8689_WhiteSands_Resort_2019_(184)_(2).jpg`,
};
const FALLBACK = "/images/boracaysands/RCB05072-1024x682.jpg";

const STATS = [
  { value: "153", label: "Villas & Suites" },
  { value: "1,000", label: "Event Capacity" },
  { value: "4", label: "Meeting Rooms" },
  { value: "30 min", label: "From Cebu Airport" },
];

const ROOM_CATALOG = [
  { slug: "deluxe", name: "Deluxe", image: IMG.rooms1 },
  { slug: "grandluxe-room", name: "Grandluxe Room", image: IMG.rooms2 },
  { slug: "premier-room", name: "Premier Room", image: IMG.rooms3 },
  { slug: "ocean-view-suite", name: "Ocean View Suite", image: IMG.rooms4 },
  { slug: "family-room", name: "Family Room", image: IMG.rooms5 },
  { slug: "family-suite", name: "Family Suite", image: IMG.rooms6 },
  {
    slug: "panoramic-view-suite",
    name: "Panoramic View Suite",
    image: IMG.rooms7,
  },
  { slug: "grand-luxe-plus", name: "Grand Luxe Plus", image: IMG.rooms8 },
];

const FEATURES = [
  {
    label: "Dining",
    title: "Patio Gavino Restaurant",
    body: "Savor fresh Filipino and international cuisine in a relaxed beachfront setting with stunning sea views.",
    image: IMG.dining1,
    href: "/restaurants",
  },
  {
    label: "Wellness",
    title: "Anahata Spa",
    body: "Restore balance of body, mind and spirit with our bespoke massage, facial and wellness journey treatments.",
    image: IMG.spa,
    href: "/spa",
  },
  {
    label: "Events",
    title: "Events & Celebrations",
    body: "From intimate gatherings to grand corporate events and dream weddings — we set the perfect stage.",
    image: IMG.events,
    href: "/events",
  },
];

const TESTIMONIALS = [
  {
    text: "The rooms were spotless and the staff went above and beyond. Waking up to the sound of the waves every morning was pure bliss. Will absolutely return.",
    name: "Haruki Tanaka",
    origin: "Tokyo, Japan",
    platform: "TripAdvisor",
    rating: 5,
  },
  {
    text: "We celebrated our anniversary here and it was magical. The Anahata Spa treatment was a highlight — so relaxing and professionally done.",
    name: "Sofia Reyes",
    origin: "Manila, Philippines",
    platform: "Google Reviews",
    rating: 5,
  },
  {
    text: "Genuinely one of the best beach resorts I\u2019ve stayed in. The pool, the food at Patio Gavino, the warm hospitality — everything exceeded my expectations.",
    name: "James Okonkwo",
    origin: "Lagos, Nigeria",
    platform: "Booking.com",
    rating: 5,
  },
  {
    text: "Perfect escape from the city. The resort grounds are beautiful, rooms are well-maintained, and the team is incredibly welcoming. Mactan Island at its finest.",
    name: "Camille Dubois",
    origin: "Paris, France",
    platform: "TripAdvisor",
    rating: 5,
  },
  {
    text: "We held our company retreat here and it was seamless from start to finish. The event team handled every detail. Highly recommend for group stays.",
    name: "David Chen",
    origin: "Singapore",
    platform: "Google Reviews",
    rating: 5,
  },
  {
    text: "Beautiful beachfront location, excellent value for money, and service that feels genuinely personal. A hidden gem on Mactan Island.",
    name: "Emily Harrison",
    origin: "New York, USA",
    platform: "Booking.com",
    rating: 5,
  },
  {
    text: "The resort is exactly as pictured and the staff are incredibly warm. The Anahata Spa and beachfront dining made it an unforgettable trip.",
    name: "Amara Mensah",
    origin: "Accra, Ghana",
    platform: "TripAdvisor",
    rating: 5,
  },
  {
    text: "Stayed for a week with my family. Kids loved the pool and the beach activities. Parents loved the spa and the food. Perfect for all ages.",
    name: "Marco Bianchi",
    origin: "Milan, Italy",
    platform: "Google Reviews",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function Divider() {
  return <div className="mx-auto mt-4 h-px w-16 bg-[#651D4C]" />;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-[#651D4C]"
    />
  );
}

function SocialSidebar() {
  return (
    <aside className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col lg:flex">
      <a
        href={brand.facebookPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-11 w-11 items-center justify-center bg-[#3b5998] text-white transition-all duration-300 hover:w-32"
        aria-label="Facebook"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 shrink-0"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
        <span className="ml-2 hidden text-[9px] font-semibold uppercase tracking-wider group-hover:inline">
          Facebook
        </span>
      </a>
      <a
        href={brand.instagramUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-11 w-11 items-center justify-center bg-[#c13584] text-white transition-all duration-300 hover:w-32"
        aria-label="Instagram"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
        <span className="ml-2 hidden text-[9px] font-semibold uppercase tracking-wider group-hover:inline">
          Instagram
        </span>
      </a>
      <a
        href={`mailto:${brand.email}`}
        className="group flex h-11 w-11 items-center justify-center bg-[#651D4C] text-white transition-all duration-300 hover:w-32"
        aria-label="Email"
      >
        <Mail className="h-4 w-4 shrink-0" />
        <span className="ml-2 hidden text-[9px] font-semibold uppercase tracking-wider group-hover:inline">
          Email
        </span>
      </a>
      <a
        href={`tel:${brand.phone}`}
        className="group flex h-11 w-11 items-center justify-center bg-[#4a1538] text-white transition-all duration-300 hover:w-32"
        aria-label="Call"
      >
        <Phone className="h-4 w-4 shrink-0" />
        <span className="ml-2 hidden text-[9px] font-semibold uppercase tracking-wider group-hover:inline">
          Call
        </span>
      </a>
    </aside>
  );
}

function FloatingWhatsApp() {
  const msg = encodeURIComponent(
    `Hello, I'd like to make a reservation at ${brand.displayName}.`,
  );
  const wa = `https://wa.me/${brand.phone.replace(/\D/g, "")}?text=${msg}`;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-white/40 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

function BookingBar() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(1);
  return (
    <div className="relative z-20 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-stretch divide-x divide-gray-200">
        <div className="flex min-w-[140px] flex-1 flex-col justify-center px-6 py-4">
          <label className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            Check In
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 bg-transparent text-[13px] font-medium text-gray-700 focus:outline-none"
          />
        </div>
        <div className="flex items-center px-4 text-gray-300 text-lg">→</div>
        <div className="flex min-w-[140px] flex-1 flex-col justify-center px-6 py-4">
          <label className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            Check Out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 bg-transparent text-[13px] font-medium text-gray-700 focus:outline-none"
          />
        </div>
        <div className="flex min-w-[160px] flex-1 flex-col justify-center px-6 py-4">
          <label className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            Room
          </label>
          <div className="mt-1 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-700"
            >
              −
            </button>
            <span className="text-[13px] font-medium text-gray-700">
              1 Room, {guests} Adult{guests > 1 ? "s" : ""}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(10, g + 1))}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-700"
            >
              +
            </button>
          </div>
        </div>
        <Link
          to={`/booking?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
          className="flex items-center justify-center bg-[#651D4C] px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#4a1538]"
        >
          Search
        </Link>
      </div>
    </div>
  );
}

function Welcome() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-[13px] font-semibold uppercase tracking-[0.35em] text-[#333333]"
          >
            Welcome to {brand.displayName}
          </motion.h2>
          <Divider />
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-[#555555]"
          >
            Cebu Whitesand Resort is the first and only Discovery Resort brand
            in Mindanao, offering the most magnificent views of the Cebu waters.
            A sanctuary built for both business and leisure.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#555555]"
          >
            With 153 lavish villas and plush accommodations, four intimate
            meeting rooms, and one opulent convention center for up to 1,000
            guests — every detail combines idyllic settings with the genuine
            culture of care the Discovery brand is known for.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 gap-6 border-t border-gray-100 pt-10 lg:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-[#651D4C]">{s.value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function RoomsGrid() {
  const { data: rooms = [], isLoading } = useRooms({ available: true });

  return (
    <section className="bg-white pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.35em] text-[#333333]">
            Rooms
          </h2>
          <Divider />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-square animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <article
                key={r._id || r.slug}
                className="group relative aspect-square cursor-pointer overflow-hidden bg-gray-900"
              >
                {r.images?.[0] && (
                  <img
                    src={r.images[0]}
                    alt={r.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/60" />
                <div className="absolute inset-x-0 top-0 -translate-y-full p-5 transition-all duration-500 group-hover:translate-y-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                    {r.name}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-all duration-500 group-hover:translate-y-0">
                  <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                    <Link
                      to={`/rooms/${r.slug}`}
                      className="border-b border-white/50 pb-0.5 hover:border-white"
                    >
                      View Room
                    </Link>
                    <span className="text-white/40">|</span>
                    <Link
                      to={r._id ? `/booking?room=${r._id}` : "/booking"}
                      className="border-b border-white/50 pb-0.5 hover:border-white"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            to="/rooms"
            className="inline-flex items-center justify-center border border-[#651D4C] px-10 py-3.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#651D4C] transition-colors hover:bg-[#651D4C] hover:text-white"
          >
            View All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureTiles() {
  return (
    <section className="bg-[#f8f5f2] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.35em] text-[#333333]">
            Resort Highlights
          </h2>
          <Divider />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="group"
            >
              <Link to={f.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/90">
                    {f.label}
                  </div>
                </div>
                <div className="pt-6">
                  <h3 className="text-[15px] font-semibold uppercase tracking-wide text-[#333333]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[#555555]">
                    {f.body}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#651D4C]">
                    Discover More
                    <span className="block h-px w-8 bg-[#651D4C] transition-all duration-500 group-hover:w-14" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaEvents() {
  const blocks = [
    {
      tag: "Wellness",
      title: "Anahata Spa",
      body: "Close your eyes and let your mind slip away as we help you balance the senses. A soothing and rejuvenating spa escape.",
      image: IMG.spa,
      href: "/spa",
    },
    {
      tag: "Events",
      title: "Events & Celebrations",
      body: "Where grandiose moments take centerstage. Perfect for weddings, corporate events, and milestone celebrations.",
      image: IMG.events,
      href: "/events",
    },
  ];
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {blocks.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: i * 0.15 }}
            className="group relative h-[420px] overflow-hidden bg-gray-900 lg:h-[520px]"
          >
            <img
              src={b.image}
              alt={b.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white lg:p-12">
              <p className="text-[9px] font-semibold uppercase tracking-[0.45em] text-white/70">
                {b.tag}
              </p>
              <h3 className="mt-3 text-2xl font-semibold uppercase tracking-wide lg:text-3xl">
                {b.title}
              </h3>
              <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/75">
                {b.body}
              </p>
              <Link
                to={b.href}
                className="mt-6 inline-flex items-center gap-3 border-b border-white/50 pb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white hover:border-white"
              >
                Discover More <ArrowRight size={12} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[#f8f5f2] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.35em] text-[#333333]">
          Guest Stories
        </h2>
        <Divider />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: TESTIMONIALS[active].rating }).map(
                (_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-[#651D4C] text-[#651D4C]"
                  />
                ),
              )}
            </div>
            <blockquote className="mt-7 text-xl font-light leading-relaxed text-[#333333] lg:text-2xl">
              “{TESTIMONIALS[active].text}”
            </blockquote>
            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-400">
              {TESTIMONIALS[active].name}{" "}
              <span className="mx-2 text-[#651D4C]">·</span>{" "}
              {TESTIMONIALS[active].origin}{" "}
              <span className="mx-2 text-gray-300">·</span>{" "}
              {TESTIMONIALS[active].platform}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-px transition-all ${idx === active ? "w-10 bg-[#651D4C]" : "w-5 bg-gray-300 hover:bg-gray-500"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.35em] text-[#333333]">
            Our Location
          </h2>
          <Divider />
          <h3 className="mt-8 text-2xl font-semibold uppercase tracking-wide text-[#333333] lg:text-3xl">
            Conveniently located
            <br />
            on Cebu
          </h3>
          <p className="mt-6 text-[14px] leading-relaxed text-[#555555]">
            The resort is conveniently located on Cebu, just 30 minutes away
            from Mactan-Cebu International Airport in Cebu City.
          </p>
          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#651D4C]" />
              <span className="text-[13.5px] leading-relaxed text-[#555555]">
                {brand.address}
              </span>
            </li>
            {brand.phone && (
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0 text-[#651D4C]" />
                <a
                  href={`tel:${brand.phone}`}
                  className="text-[13.5px] text-[#555555] hover:text-[#651D4C]"
                >
                  {brand.phone}
                </a>
              </li>
            )}
            <li className="flex items-center gap-3">
              <Mail size={15} className="shrink-0 text-[#651D4C]" />
              <a
                href={`mailto:${brand.email}`}
                className="text-[13.5px] text-[#555555] hover:text-[#651D4C]"
              >
                {brand.email}
              </a>
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-10 inline-flex w-fit items-center justify-center border border-[#651D4C] px-10 py-3.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#651D4C] transition-colors hover:bg-[#651D4C] hover:text-white"
          >
            View Resort Maps
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="aspect-[4/3] overflow-hidden"
        >
          <iframe
            title="Cebu Whitesand Resort location"
            src="https://maps.google.com/maps?ll=10.28656,123.9989&z=17&t=m&hl=en-US&gl=US&mapclient=apiv3&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-gray-900">
      <img
        src={IMG.cta}
        alt="Cebu Whitesand Resort aerial view"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/70"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-4xl font-semibold uppercase tracking-wide text-white lg:text-5xl"
          >
            Cebu is
            <br />
            waiting for you
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-3 h-px w-16 bg-white/50"
          />
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-lg text-[14px] leading-relaxed text-white/75"
          >
            Reserve your villa or suite direct — best rate guaranteed, with a
            personal welcome from the moment you arrive.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 bg-[#651D4C] px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white transition-colors hover:bg-[#4a1538]"
            >
              Book Now <ArrowRight size={13} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-white/50 px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white transition-all hover:bg-white/10"
            >
              Contact Reservations
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.replace("#", ""));
    if (target)
      window.requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
  }, [hash]);

  return (
    <main className="bg-white">
      <ScrollProgress />
      <HeroSection />
      <BookingBar />
      <Welcome />
      <RoomsGrid />
      <FeatureTiles />
      <SpaEvents />
      <Testimonials />
      <Location />
      <CTA />
    </main>
  );
}
