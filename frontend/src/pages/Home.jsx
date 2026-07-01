import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRooms } from "../hooks/useRooms";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  Plus,
  Minus,
  Calendar,
  Users,
} from "lucide-react";
import { brand } from "../lib/brand";
import HeroSection from "../sections/home/HeroSection";

/* --------------------------------------------------------------------- */
/*  Real Discovery Samal imagery (sourced from image-tc.galaxy.tf CDN)   */
/*  Local fallbacks live under /images/boracaysands/                      */
/* --------------------------------------------------------------------- */
const CDN = "https://image-tc.galaxy.tf";
const IMG = {
  // Hero slider � confirmed from live site HTML
  hero1: `${CDN}/wijpeg-9fnqmfelaa8mmuxnnfuylk6lr/artboard-31-1.jpg?width=1920`,
  hero2: `${CDN}/wijpeg-ew7qj5pfcn1s7px8nh2opj0hc/discovery-samal-08124.jpg?width=1920`,
  hero3: `${CDN}/wijpeg-555ut0sjmfyvv81wgcfvrcezv/diving-at-samal.jpg?width=1920`,
  // Sections
  welcome: `${CDN}/wijpeg-7929zq4qi0e75ubmqvqwx0fyh/dive-spot-ligid-island-in-samal.jpg?width=1200`,
  foodie: `${CDN}/wipng-bfd4lwzedw9f1ywur94lwqiup/morning-catch_standard.png`,
  experiences: `${CDN}/wijpeg-555ut0sjmfyvv81wgcfvrcezv/diving-at-samal.jpg?width=900`,
  events: `${CDN}/wijpeg-7929zq4qi0e75ubmqvqwx0fyh/dive-spot-ligid-island-in-samal.jpg?width=900`,
  highlights: `${CDN}/wijpeg-ew7qj5pfcn1s7px8nh2opj0hc/discovery-samal-08124.jpg?width=1200`,
  bookDirect: `${CDN}/wijpeg-9fnqmfelaa8mmuxnnfuylk6lr/artboard-31-1.jpg?width=900`,
  spa: `${CDN}/wipng-6qc8lnn7ddqcncy2q3yciev3s/samal-escape-spa_standard.png`,
  pavilion: `${CDN}/wijpeg-7929zq4qi0e75ubmqvqwx0fyh/dive-spot-ligid-island-in-samal.jpg?width=900`,
  cta: `${CDN}/wijpeg-ew7qj5pfcn1s7px8nh2opj0hc/discovery-samal-08124.jpg?width=1920`,
};

const FALLBACK = "/images/boracaysands/RCB05072-1024x682.jpg";

const FEATURE_TILES = [
  {
    label: "Dining",
    title: "Foodie Destinations",
    body: "Discover the finest restaurants on Samal Island, where every dish and beverage is prepared to perfection by our expert chefs and bartenders.",
    image: IMG.foodie,
    href: "/restaurants",
  },
  {
    label: "Experiences",
    title: "Signature Experiences",
    body: "Inspire your stay with a collection of facilities perfect for vacationers and recreation seekers. Make it an island adventure filled with pure bliss.",
    image: IMG.experiences,
    href: "/activities",
  },
  {
    label: "Events",
    title: "Events & Celebrations",
    body: "Make every detail leave a lasting moment. Look forward to momentous celebrations and delightful occasions you will fondly treasure.",
    image: IMG.events,
    href: "/events",
  },
];

const ROOM_CATALOG = [
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    tag: "Intimate Luxury � 2 Pax",
    image: IMG.hero2,
    body: "A refined sanctuary for two, where curated coastal interiors and premium amenities deliver an unhurried island retreat.",
  },
  {
    slug: "garden-rooms",
    name: "Garden Rooms",
    tag: "Garden Paradise � 4 Pax",
    image: IMG.welcome,
    body: "Surrounded by lush tropical greenery, these rooms offer natural light, garden views, and a serene connection to the landscape.",
  },
  {
    slug: "sea-rooms",
    name: "Sea Rooms",
    tag: "Ocean Horizon � 6 Pax",
    image: IMG.experiences,
    body: "Wake to uninterrupted sea vistas. These spacious rooms bring the Davao Gulf inside through generous windows and coastal design.",
  },
  {
    slug: "deluxe-pool-view-rooms",
    name: "Deluxe Pool View Rooms",
    tag: "Pool Terrace � 8 Pax",
    image: IMG.pavilion,
    body: "Perched above the resort pool, these deluxe rooms blend indoor comfort with expansive outdoor views of the shimmering waters.",
  },
  {
    slug: "villa-alon",
    name: "Villa Alon",
    tag: "Private Villa � 10 Pax",
    image: IMG.highlights,
    body: "A generously appointed private villa that accommodates families and groups in complete luxury with exclusive amenities.",
  },
  {
    slug: "villa-hali",
    name: "Villa Hali",
    tag: "Estate Villa � 16 Pax",
    image: IMG.hero3,
    body: "An expansive estate villa offering grand living spaces, multiple bedrooms, and the full complement of resort services at your doorstep.",
  },
  {
    slug: "villa-isla",
    name: "Villa Isla",
    tag: "Island Villa � 20 Pax",
    image: IMG.bookDirect,
    body: "The ultimate island gathering space � a sprawling villa where milestone celebrations and extended family retreats find their perfect setting.",
  },
  {
    slug: "villa-solana",
    name: "Villa Solana",
    tag: "Grand Villa � 30 Pax",
    image: IMG.cta,
    body: "Our most prestigious accommodation � Villa Solana commands the resort with commanding views, lavish interiors, and unmatched capacity.",
  },
];

const HIGHLIGHTS = [
  {
    tag: "Book Direct",
    title: "Up to 25% Savings",
    body: "Score exclusive website savings for your island escapade.",
    image: IMG.bookDirect,
    href: "/booking",
  },
  {
    tag: "Weekends",
    title: "Glamping Soir�e",
    body: "Elevate your weekends with Haribar Lounge's weekend barbecue feast. Fridays and Saturdays.",
    image: IMG.hero3,
    href: "/activities",
  },
  {
    tag: "Dining",
    title: "Island Dining Access",
    body: "Discover an array of culinary delights during your visits � consumable dining access.",
    image: IMG.foodie,
    href: "/restaurants",
  },
];

const DINING = [
  {
    name: "The Bistro",
    body: "Perfectly located by the villa pool � wind down with a sumptuous dish complemented by scenic views.",
    image: IMG.highlights,
  },
  {
    name: "Morning Catch",
    body: "Savor the rich and fresh taste of the ocean at our seafood specialty restaurant.",
    image: IMG.foodie,
  },
  {
    name: "Haribar Lounge",
    body: "Spend your days taking in the serene waters while sipping a cocktail or two � nothing but good times.",
    image: IMG.experiences,
  },
];

const TESTIMONIALS = [
  {
    text: "Our overall experience for the 2 day event was superb. The team was able to pull off our dream wedding weekend, down to the last detail.",
    name: "Stephanie T.",
    platform: "Tripadvisor",
    rating: 5,
  },
  {
    text: "Waking up to the Davao Gulf every morning felt surreal. The villa views are breathtaking and the service anticipated every need.",
    name: "Marco R.",
    platform: "Google Reviews",
    rating: 5,
  },
  {
    text: "Discovery Samal exceeded every expectation. The private pool, the spa, the food � everything was world-class.",
    name: "Wei L.",
    platform: "Booking.com",
    rating: 5,
  },
];

const STATS = [
  { value: "153", label: "Villas & Suites" },
  { value: "1,000", label: "Event Capacity" },
  { value: "4", label: "Meeting Rooms" },
  { value: "30 min", label: "From Davao Airport" },
];

/* --------------------------------------------------------------------- */
/*  Motion presets                                                       */
/* --------------------------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* --------------------------------------------------------------------- */
/*  Decorative thin gold motif                                            */
/* --------------------------------------------------------------------- */
function GoldMotif({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gold-light" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold-light" />
      <span className="h-px w-10 bg-gold-light" />
    </div>
  );
}

/* --------------------------------------------------------------------- */
/*  Scroll progress bar                                                   */
/* --------------------------------------------------------------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 z-9999 h-0.5 bg-gold"
    />
  );
}

/* --------------------------------------------------------------------- */
/*  Floating WhatsApp                                                    */
/* --------------------------------------------------------------------- */
function FloatingWhatsApp() {
  const message = encodeURIComponent(
    `Hello, I'd like to make a reservation at ${brand.displayName}.`,
  );
  const wa = `https://wa.me/${brand.phone.replace(/\D/g, "")}?text=${message}`;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-28 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-white/40 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* --------------------------------------------------------------------- */
/*  Promo strip (mirrors live site Happy Summer banner)                  */
/* --------------------------------------------------------------------- */
function PromoStrip() {
  return (
    <div className="bg-ocean py-2.5 text-center text-[11px] uppercase tracking-[0.3em] text-gold">
      <span>Happy Summer</span>
      <span className="mx-3 text-white/30">�</span>
      <span className="text-white/80">
        Exclusive discounts and delightful perks
      </span>
      <Link to="/offers" className="ml-3 underline-offset-4 hover:underline">
        Learn More
      </Link>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Welcome                                                    */
/* --------------------------------------------------------------------- */
function Welcome() {
  return (
    <section className="relative bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-light uppercase tracking-[0.55em] text-gold-light"
          >
            Welcome to {brand.displayName}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-8 font-serif text-3xl font-light uppercase leading-[1.15] text-charcoal sm:text-4xl lg:text-[44px]"
          >
            Your 5-star luxury resort
            <br /> in Davao, Philippines
          </motion.h2>
          <motion.div variants={fadeUp}>
            <GoldMotif className="mt-10" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-3xl text-[15px] font-light leading-loose text-charcoal/70 lg:text-[16px]"
          >
            Discovery Samal is the first and only Discovery Resort brand in
            Mindanao, offering the most magnificent views of the Davao Gulf. Set
            within a sprawling enclave of curated meeting spaces, dining
            destinations, and relaxing landscapes � it is a sanctuary built for
            both business and leisure.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-3xl text-[15px] font-light leading-loose text-charcoal/70 lg:text-[16px]"
          >
            With 153 lavish villas and plush accommodations, four intimate
            meeting rooms, and one opulent convention center for up to 1,000
            guests, every detail combines idyllic settings with the genuine
            culture of care the Discovery brand is known for.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-12">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 border-b border-black pb-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-charcoal"
            >
              Discover More{" "}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-20 grid grid-cols-2 gap-8 border-t border-black/10 pt-12 lg:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-3xl font-light text-charcoal lg:text-[42px]">
                  {s.value}
                </p>
                <p className="mt-2 text-[10px] font-light uppercase tracking-[0.3em] text-charcoal/55">
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

/* --------------------------------------------------------------------- */
/*  Section : Feature Tiles (Foodie / Experiences / Events)              */
/* --------------------------------------------------------------------- */
function FeatureTiles() {
  return (
    <section className="relative bg-beige py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10"
        >
          {FEATURE_TILES.map((tile) => (
            <motion.article
              key={tile.title}
              variants={fadeUp}
              className="group"
            >
              <Link to={tile.href} className="block">
                <div className="relative aspect-4/5 overflow-hidden bg-charcoal">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1600 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.4em] text-white">
                    <span className="h-px w-6 bg-gold" /> {tile.label}
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="font-serif text-2xl font-light uppercase leading-tight text-charcoal lg:text-[28px]">
                    {tile.title}
                  </h3>
                  <p className="mt-4 text-[14px] font-light leading-[1.85] text-charcoal/65">
                    {tile.body}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-charcoal">
                    Learn More
                    <span className="block h-px w-8 bg-gold transition-all duration-500 group-hover:w-14" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Accommodation                                              */
/* --------------------------------------------------------------------- */
function Accommodation() {
  const { data: dbRooms = [], isLoading } = useRooms({ available: true });

  // Merge database rooms with the canonical 12-room catalog. Match by slug or name.
  const merged = ROOM_CATALOG.map((cat) => {
    const found = dbRooms.find(
      (r) =>
        r.slug?.toLowerCase() === cat.slug ||
        r.name?.toLowerCase() === cat.name.toLowerCase(),
    );
    return {
      _id: found?._id,
      slug: found?.slug || cat.slug,
      name: cat.name,
      tag: cat.tag,
      body: found?.description || cat.body,
      image: found?.images?.[0] || cat.image || FALLBACK,
      capacity: found?.maxGuests || found?.capacity,
      price: found?.pricePerNight,
    };
  });

  return (
    <section className="relative bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-20 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-light uppercase tracking-[0.55em] text-gold-light"
          >
            Accommodation
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-8 font-serif text-3xl font-light uppercase leading-[1.15] text-charcoal sm:text-4xl lg:text-[44px]"
          >
            Lavishly appointed,
            <br />
            where luxury meets comfort
          </motion.h2>
          <motion.div variants={fadeUp}>
            <GoldMotif className="mt-10" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-2xl text-[15px] font-light leading-loose text-charcoal/70"
          >
            Discovery Samal offers a myriad of possibilities with its 153 lush
            villas and suites, each bringing the most distinctive luxury of
            space.
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-4/5 animate-pulse bg-beige" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rooms-slider relative"
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1.1}
              spaceBetween={20}
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".rooms-pag" }}
              navigation={{ prevEl: ".rooms-prev", nextEl: ".rooms-next" }}
              breakpoints={{
                640: { slidesPerView: 1.6, spaceBetween: 24 },
                1024: { slidesPerView: 2.4, spaceBetween: 28 },
                1280: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="pb-4!"
            >
              {merged.map((r) => (
                <SwiperSlide key={r.slug}>
                  <article className="group">
                    <div className="relative aspect-4/5 overflow-hidden bg-charcoal">
                      <img
                        src={r.image}
                        alt={r.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute left-5 top-5 text-[10px] font-light uppercase tracking-[0.35em] text-white/85">
                        {r.tag}
                      </div>
                      {r.price && (
                        <div className="absolute right-5 top-5 bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal">
                          From ?{Number(r.price).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="pt-6">
                      <h3 className="font-serif text-xl font-light uppercase leading-tight text-charcoal lg:text-[22px]">
                        {r.name}
                      </h3>
                      <p className="mt-3 text-[13.5px] font-light leading-[1.8] text-charcoal/65 line-clamp-3">
                        {r.body}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <Link
                          to={`/rooms/${r.slug}`}
                          className="group/btn inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-charcoal"
                        >
                          Read More
                          <span className="block h-px w-6 bg-gold transition-all duration-500 group-hover/btn:w-12" />
                        </Link>
                        <Link
                          to={r._id ? `/booking?room=${r._id}` : "/booking"}
                          className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold hover:text-charcoal"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-12 flex items-center justify-center gap-6">
              <button
                className="rooms-prev flex h-11 w-11 items-center justify-center border border-black/15 text-charcoal transition-colors hover:border-black hover:bg-black hover:text-white"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="rooms-pag flex items-center gap-2 [&_.swiper-pagination-bullet]:h-1.5! [&_.swiper-pagination-bullet]:w-1.5! [&_.swiper-pagination-bullet]:bg-black/20! [&_.swiper-pagination-bullet-active]:bg-gold-light!" />
              <button
                className="rooms-next flex h-11 w-11 items-center justify-center border border-black/15 text-charcoal transition-colors hover:border-black hover:bg-black hover:text-white"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/rooms"
            className="inline-flex items-center justify-center bg-ocean px-12 py-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-white transition-colors hover:bg-gold hover:text-white"
          >
            View All Villas & Suites
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Resort Highlights (Offers)                                 */
/* --------------------------------------------------------------------- */
function ResortHighlights() {
  return (
    <section className="relative overflow-hidden bg-ocean py-28 text-white lg:py-36">
      <img
        src={IMG.highlights}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-16 text-center lg:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-light uppercase tracking-[0.55em] text-gold-light"
          >
            Resort Highlights
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-8 font-serif text-3xl font-light uppercase leading-[1.15] sm:text-4xl lg:text-[44px]"
          >
            Offers & packages,
            <br />
            curated for you
          </motion.h2>
          <motion.div variants={fadeUp}>
            <GoldMotif className="mt-10" />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
        >
          {HIGHLIGHTS.map((h) => (
            <motion.article key={h.title} variants={fadeUp} className="group">
              <Link to={h.href} className="block">
                <div className="relative aspect-4/5 overflow-hidden bg-charcoal">
                  <img
                    src={h.image}
                    alt={h.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-1500 group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="text-[10px] font-light uppercase tracking-[0.4em] text-gold-light">
                      {h.tag}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-light uppercase leading-tight text-white">
                      {h.title}
                    </h3>
                    <p className="mt-3 text-[13px] font-light leading-[1.75] text-white/75">
                      {h.body}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-white">
                      Discover More
                      <span className="block h-px w-8 bg-gold transition-all duration-500 group-hover:w-14" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Spa & Pavilion split                                       */
/* --------------------------------------------------------------------- */
function SpaPavilion() {
  const blocks = [
    {
      tag: "Wellness",
      title: "Samal Escape Spa",
      body: "Close your eyes and let your mind slip away as we help you balance the senses. A soothing and rejuvenating escape in the resort's state-of-the-art spa facility.",
      image: IMG.spa,
      href: "/activities",
    },
    {
      tag: "Recreation",
      title: "Mindanao Pavilion",
      body: "Embrace pure bliss as you enjoy an array of indoor activities at the Mindanao Pavilion � perfect for groups and families.",
      image: IMG.pavilion,
      href: "/activities",
    },
  ];
  return (
    <section className="relative bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {blocks.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: i * 0.15 }}
            className="group relative h-150 overflow-hidden bg-charcoal lg:h-180"
          >
            <img
              src={b.image}
              alt={b.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-1800 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 text-white lg:p-14">
              <p className="text-[10px] font-light uppercase tracking-[0.5em] text-gold-light">
                {b.tag}
              </p>
              <h3 className="mt-4 font-serif text-3xl font-light uppercase leading-tight lg:text-[40px]">
                {b.title}
              </h3>
              <p className="mt-5 max-w-md text-[14px] font-light leading-[1.85] text-white/80">
                {b.body}
              </p>
              <Link
                to={b.href}
                className="mt-7 inline-flex items-center gap-3 border-b border-white pb-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-white"
              >
                Discover More <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Dining (3 venues)                                          */
/* --------------------------------------------------------------------- */
function Dining() {
  return (
    <section className="relative bg-beige py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-20 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-light uppercase tracking-[0.55em] text-gold-light"
          >
            Dining
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-8 font-serif text-3xl font-light uppercase leading-[1.15] text-charcoal sm:text-4xl lg:text-[44px]"
          >
            A flavorful culinary paradise
          </motion.h2>
          <motion.div variants={fadeUp}>
            <GoldMotif className="mt-10" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-3xl text-[15px] font-light leading-loose text-charcoal/70"
          >
            From seafood specialty restaurants to beachside lounges � every
            venue is a haven for fresh, distinctive, and prepared-to-perfection
            dishes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10"
        >
          {DINING.map((d) => (
            <motion.article key={d.name} variants={fadeUp} className="group">
              <div className="relative aspect-square overflow-hidden bg-charcoal">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1500 group-hover:scale-110"
                />
              </div>
              <div className="pt-7">
                <h3 className="font-serif text-2xl font-light uppercase leading-tight text-charcoal lg:text-[28px]">
                  {d.name}
                </h3>
                <p className="mt-4 text-[14px] font-light leading-[1.85] text-charcoal/65">
                  {d.body}
                </p>
                <a
                  href="https://forms.gle/JMGjSNEWNrY9UEW96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-charcoal"
                >
                  Book A Table
                  <span className="block h-px w-8 bg-gold-light transition-all duration-500 group-hover:w-14" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Testimonials                                               */
/* --------------------------------------------------------------------- */
function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-light uppercase tracking-[0.55em] text-gold-light"
          >
            Guest Stories
          </motion.p>
          <motion.div variants={fadeUp}>
            <GoldMotif className="mt-8" />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mt-12 flex items-center justify-center gap-1">
              {Array.from({ length: TESTIMONIALS[active].rating }).map(
                (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-gold-light text-gold-light"
                  />
                ),
              )}
            </div>
            <blockquote className="mt-8 font-serif text-2xl font-light italic leading-[1.6] text-charcoal sm:text-3xl lg:text-[34px]">
              "{TESTIMONIALS[active].text}"
            </blockquote>
            <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.4em] text-charcoal/70">
              {TESTIMONIALS[active].name}{" "}
              <span className="mx-2 text-gold-light">�</span>{" "}
              {TESTIMONIALS[active].platform}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-px transition-all ${idx === active ? "w-12 bg-gold-light" : "w-6 bg-black/20 hover:bg-black/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Location                                                   */
/* --------------------------------------------------------------------- */
function Location() {
  return (
    <section className="relative bg-beige py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <div className="lg:col-span-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-light uppercase tracking-[0.55em] text-gold-light"
            >
              Our Location
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-8 font-serif text-3xl font-light uppercase leading-[1.15] text-charcoal sm:text-4xl lg:text-[42px]"
            >
              Conveniently located
              <br />
              on Samal Island
            </motion.h2>
            <motion.div variants={fadeUp}>
              <span className="mt-8 block h-px w-16 bg-gold-light" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="mt-8 text-[15px] font-light leading-loose text-charcoal/70"
            >
              The resort is conveniently located on Samal Island, just 30
              minutes away from Francisco Bangoy International Airport in Davao
              City.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-[15px] font-light leading-loose text-charcoal/70"
            >
              Book your stay at {brand.displayName} and embark on a journey to
              the ultimate tropical paradise Samal Island has to offer.
            </motion.p>

            <motion.ul variants={stagger} className="mt-12 space-y-6">
              <motion.li variants={fadeUp} className="flex items-start gap-4">
                <MapPin size={16} className="mt-1 shrink-0 text-gold-light" />
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-charcoal/45">
                    Address
                  </p>
                  <p className="mt-2 text-[14px] font-light leading-[1.8] text-charcoal">
                    {brand.address}
                  </p>
                </div>
              </motion.li>
              {brand.phone && (
                <motion.li variants={fadeUp} className="flex items-start gap-4">
                  <Phone size={16} className="mt-1 shrink-0 text-gold-light" />
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-charcoal/45">
                      Reservations
                    </p>
                    <a
                      href={`tel:${brand.phone}`}
                      className="mt-2 block text-[14px] font-light text-charcoal hover:text-gold-light"
                    >
                      {brand.phone}
                    </a>
                  </div>
                </motion.li>
              )}
              <motion.li variants={fadeUp} className="flex items-start gap-4">
                <Mail size={16} className="mt-1 shrink-0 text-gold-light" />
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-charcoal/45">
                    Email
                  </p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-2 block text-[14px] font-light text-charcoal hover:text-gold-light"
                  >
                    {brand.email}
                  </a>
                </div>
              </motion.li>
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-ocean px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-white transition-colors hover:bg-gold hover:text-white"
              >
                View Resort Maps
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative lg:col-span-7"
        >
          <div className="relative aspect-5/4 overflow-hidden bg-white">
            <iframe
              title="Discovery Samal Resort location"
              src="https://www.google.com/maps?q=Island+Garden+City+of+Samal+Davao+del+Norte&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Section : Final CTA                                                  */
/* --------------------------------------------------------------------- */
function CTA() {
  return (
    <section className="relative h-[75svh] min-h-130 w-full overflow-hidden bg-charcoal text-white">
      <img
        src={IMG.cta}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/90" />
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-light uppercase tracking-[0.55em] text-gold-light"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-8 font-serif text-4xl font-light uppercase leading-[1.05] sm:text-5xl lg:text-[68px]"
          >
            Samal Island is
            <br />
            waiting for you
          </motion.h2>
          <motion.div variants={fadeUp}>
            <GoldMotif className="mt-10" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-xl text-[15px] font-light leading-[1.95] text-white/75"
          >
            Reserve your villa or suite direct � best rate guaranteed, with a
            personal welcome from the moment you arrive.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 bg-gold-light px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-charcoal transition-all hover:bg-white"
            >
              Book Now <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-white/40 px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-white transition-all hover:bg-white/10"
            >
              Contact Reservations
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/*  Page                                                                 */
/* --------------------------------------------------------------------- */
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
      <FloatingWhatsApp />
      <PromoStrip />
      <HeroSection />
      <Welcome />
      <FeatureTiles />
      <Accommodation />
      <ResortHighlights />
      <SpaPavilion />
      <Dining />
      <Testimonials />
      <Location />
      <CTA />
    </main>
  );
}
