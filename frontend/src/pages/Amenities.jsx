import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wifi,
  Waves,
  Wind,
  Sparkles,
  UtensilsCrossed,
  BedDouble,
  Eye,
  Umbrella,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  ArrowRight,
} from "lucide-react";
import { brand } from "../lib/brand";

/* ────────────────────────────────────────────────────────────────────────────
   Luxury Amenities · Cinematic redesign
   Palette anchored to brand.palette with luxe gold + warm cream + deep brown.
   ──────────────────────────────────────────────────────────────────────────── */

const CDN = "https://image-tc.galaxy.tf";

const HERO_IMG = `https://image-tc.galaxy.tf/wijpeg-9g0c8e4jia8i8dw5hv5xd3r05/dss-website-banner-home-page-2.jpg`;

const INTRO_COLLAGE = [
  `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/The+Bistro+2-1920w.jpeg`,
  `https://image-tc.galaxy.tf/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg`,
  `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/2BR+POOL+VILLA+LEFT+WING+3-1920w.jpeg`,
];

const SHOWCASES = [
  {
    id: "pool",
    eyebrow: "Aqua Sanctuary",
    title: "Infinity Pool Experience",
    description:
      "Glide into mirrored waters that melt into the horizon. Our infinity pool is a sanctuary of stillness — designed for slow mornings, golden afternoons, and quiet moonlit dips.",
    bullets: [
      "Dedicated kids' shallow pool",
      "Adult-only loungers & cabanas",
      "Open until 10PM under the stars",
    ],
    image: `https://image-tc.galaxy.tf/wijpeg-bcuufnq3q2s8cqqkqxm28wiqw/untitled-design-4.jpg`,
    accent: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/2BR+Pool+Villa+r-Wing+5-1920w.jpeg`,
    align: "right",
  },
  {
    id: "restaurant",
    eyebrow: "Coastal Gastronomy",
    title: "Restaurant & Bar",
    description:
      "Ocean-to-table dining where Filipino soul meets contemporary craft. Craft cocktails, sunset wines, and slow plates served beneath swaying palms.",
    bullets: [
      "Beachfront fine-dining pavilion",
      "Signature cocktails & vintage cellar",
      "Private chef's table on request",
    ],
    image: `https://image-tc.galaxy.tf/wipng-cn1xwe8oz6c74bztnpequs8sy/3_standard.png`,
    accent: `https://image-tc.galaxy.tf/wijpeg-c18fahf956puhoiw93d1h3jxn/haribar-lounge-interior_standard.jpg`,
    align: "left",
  },
  {
    id: "spa",
    eyebrow: "Quiet Restoration",
    title: "Spa & Wellness",
    description:
      "A hushed enclave of warm stone, candlelight, and the faint scent of ylang-ylang. Rituals are crafted to dissolve travel, time, and tension.",
    bullets: [
      "Traditional Hilot & deep-tissue rituals",
      "Couples' suites with private gardens",
      "Hand-blended botanical oils",
    ],
    image: `https://image-tc.galaxy.tf/wijpeg-7jtyjnoy3zk9ji5fg7szxfttb/dss-website-banner-home-page.jpg`,
    accent: `https://image-tc.galaxy.tf/wijpeg-e9e3fi5ee3nudxmag9mtxp6bm/aerial-1.jpg`,
    align: "right",
  },
  {
    id: "beachfront",
    eyebrow: "Beachfront on Samal Island",
    title: "Beachfront Lounge Beds",
    description:
      "Linen canopies. Powder-soft sand. The Sulu Sea unfurling at your feet. Sun-warmed lounge beds reserved exclusively for our in-house guests.",
    bullets: [
      "Reserved daybeds & cabanas",
      "In-bed cocktail & light bites service",
      "Sunset turndown ritual",
    ],
    image: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/The+Bistro+2-1920w.jpeg`,
    accent: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/6+BEDROOM+1-1920w.jpeg`,
    align: "left",
  },
  {
    id: "balcony",
    eyebrow: "Suspended Above the Sand",
    title: "Private Balcony",
    description:
      "Step beyond your suite into open sky. Floor-to-ceiling glass dissolves the boundary between sanctuary and sea — a private theatre for sunrise and sunset alike.",
    bullets: [
      "Floor-to-ceiling ocean glass",
      "Hand-woven lounger & breakfast nook",
      "Curated turndown amenities",
    ],
    image: `https://image-tc.galaxy.tf/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg`,
    accent: `https://image-tc.galaxy.tf/wijpeg-aeexb9m4bu60ndq3vcdnb7l9o/discovery-samal-08124-2_standard.jpg`,
    align: "right",
  },
];

const HIGHLIGHTS = [
  { icon: Wifi, label: "Free High-Speed WiFi", note: "Estate-wide fibre" },
  { icon: Umbrella, label: "Beachfront Access", note: "Steps from sand" },
  { icon: Waves, label: "Infinity Pool", note: "Sunrise to 10PM" },
  { icon: Sparkles, label: "Spa & Wellness", note: "Signature rituals" },
  { icon: UtensilsCrossed, label: "Fine Dining", note: "Ocean-to-table" },
  { icon: Wind, label: "Climate Control", note: "Whisper-quiet air" },
  { icon: BedDouble, label: "24/7 Room Service", note: "Curated in-suite" },
  { icon: Eye, label: "Ocean Views", note: "From every suite" },
];

const GALLERY = [
  { src: `https://image-tc.galaxy.tf/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg`, span: "row-span-2" },
  { src: `https://image-tc.galaxy.tf/wijpeg-e9e3fi5ee3nudxmag9mtxp6bm/aerial-1.jpg`, span: "" },
  { src: `https://image-tc.galaxy.tf/wijpeg-9g0c8e4jia8i8dw5hv5xd3r05/dss-website-banner-home-page-2.jpg`, span: "" },
  { src: `https://image-tc.galaxy.tf/wijpeg-bcuufnq3q2s8cqqkqxm28wiqw/untitled-design-4.jpg`, span: "row-span-2" },
  { src: `https://image-tc.galaxy.tf/wijpeg-7jtyjnoy3zk9ji5fg7szxfttb/dss-website-banner-home-page.jpg`, span: "" },
  { src: `https://image-tc.galaxy.tf/wijpeg-17ogtqpq3qj4s6r2rl3gu0mse/9.jpg`, span: "" },
  { src: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/2BR+POOL+VILLA+LEFT+WING+3-1920w.jpeg`, span: "" },
  { src: `https://image-tc.galaxy.tf/wipng-790j8v5mbshq758qtyy9hjlol/1.png`, span: "row-span-2" },
  { src: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/The+Bistro+2-1920w.jpeg`, span: "" },
  { src: `https://image-tc.galaxy.tf/wijpeg-aeexb9m4bu60ndq3vcdnb7l9o/discovery-samal-08124-2_standard.jpg`, span: "" },
  { src: `https://image-tc.galaxy.tf/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg`, span: "" },
  { src: `https://image-tc.galaxy.tf/wijpeg-3gvt51m6p7qhmq6msr8eugyv8/website-mobile-banner-size-1.jpg`, span: "" },
];

const TESTIMONIALS = [
  {
    quote:
      "From the infinity pool at dusk to the candlelit spa rituals, every detail feels considered. A true sanctuary on Samal Island.",
    name: "Isabella M.",
    origin: "London, UK",
    rating: 5,
  },
  {
    quote:
      "The most thoughtful service I've experienced in Asia. Our private balcony breakfasts watching the sunrise will stay with me forever.",
    name: "Hiroshi T.",
    origin: "Kyoto, Japan",
    rating: 5,
  },
  {
    quote:
      "A rare blend of quiet luxury and warm Filipino soul. The beachfront daybeds and sunset cocktails were utter perfection.",
    name: "Sofia & Marco",
    origin: "Milan, Italy",
    rating: 5,
  },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Happy Guests" },
  { value: 24, suffix: "/7", label: "Hospitality" },
  { value: 100, suffix: "%", label: "Beachfront Access" },
  { value: 5, suffix: "★", label: "Premium Comfort" },
];

/* ─── small utilities ─────────────────────────────────────────────────────── */

function useCounter(target, inView, duration = 1800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return v;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── page ────────────────────────────────────────────────────────────────── */

export default function AmenitiesPage() {
  return (
    <main className="bg-ivory text-ocean overflow-x-hidden">
      <Hero />
      <Intro />
      <Showcases />
      <Highlights />
      <Gallery />
      <Testimonials />
      <Stats />
      <FinalCTA />
    </main>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0a0604] text-white"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Discovery Samal luxury amenities"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/30 to-[#0a0604]/90" />
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/30" />

      <Particles />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal"
        >
          Discovery Samal · Samal Island
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          <span className="block">Luxury</span>
          <span className="block italic text-teal">Amenities</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg"
        >
          Experience tropical comfort, deep relaxation, and world-class
          hospitality — woven into every quiet moment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#amenities"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md transition hover:border-teal hover:bg-teal hover:text-ocean"
          >
            Explore Amenities
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <Link
            to="/booking"
            className="group inline-flex items-center gap-2 rounded-full bg-teal px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_20px_60px_-15px_rgba(212,133,0,0.6)] transition hover:bg-[#006d6d]"
          >
            Book Your Stay
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const size = 2 + ((i * 7) % 4);
        const delay = (i % 6) * 0.6;
        const duration = 9 + (i % 5);
        return (
          <motion.span
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
            }}
            className="absolute rounded-full bg-teal/70 shadow-[0_0_8px_rgba(232,194,107,0.8)]"
          />
        );
      })}
    </div>
  );
}

/* ─── Intro ───────────────────────────────────────────────────────────────── */

function Intro() {
  return (
    <section
      id="amenities"
      className="relative py-28 sm:py-36 lg:py-44 bg-ivory"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative h-[520px] sm:h-[600px]"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="absolute left-0 top-0 h-[70%] w-[70%] overflow-hidden rounded-[2px] shadow-2xl"
          >
            <img
              src={INTRO_COLLAGE[0]}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={1}
            className="absolute right-0 top-[20%] h-[55%] w-[55%] overflow-hidden rounded-[2px] border-8 border-ivory shadow-2xl"
          >
            <img
              src={INTRO_COLLAGE[1]}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="absolute bottom-0 left-[15%] h-[40%] w-[45%] overflow-hidden rounded-[2px] border-8 border-ivory shadow-2xl"
          >
            <img
              src={INTRO_COLLAGE[2]}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -right-2 bottom-8 z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-ocean text-center text-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)]"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-teal">
              Since
            </span>
            <span className="font-serif text-3xl text-teal">2008</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
          >
            The Sands Experience
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-serif text-4xl leading-[1.1] text-ocean sm:text-5xl lg:text-6xl"
          >
            Every detail, <br />
            <span className="italic text-charcoal">
              designed for serenity.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-8 text-lg leading-relaxed text-ocean/75"
          >
            At {brand.displayName}, every detail is designed to invite stillness
            — from sun-soaked lounges and infinity waters to candle-lit spa
            rituals and ocean-front suites. We craft moments, not just stays.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-6 text-lg leading-relaxed text-ocean/75"
          >
            Step into a private corner of Samal where time slows, hospitality
            is intuitive, and the rhythm of the sea sets the pace of your day.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-10 flex items-center gap-6"
          >
            <div className="h-px w-16 bg-teal" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-charcoal">
              {brand.tagline}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Showcases ───────────────────────────────────────────────────────────── */

function Showcases() {
  return (
    <div className="bg-ivory">
      {SHOWCASES.map((s, i) => (
        <ShowcaseBlock key={s.id} item={s} index={i} />
      ))}
    </div>
  );
}

function ShowcaseBlock({ item, index }) {
  const dark = index % 2 === 1;
  const isRight = item.align === "right";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-24 sm:py-32 lg:py-40 ${
        dark ? "bg-ocean text-white" : "bg-ivory text-ocean"
      }`}
    >
      <div
        className={`pointer-events-none absolute -z-0 h-[600px] w-[600px] rounded-full blur-[120px] ${
          dark ? "bg-teal/10" : "bg-teal/15"
        } ${isRight ? "-left-40 top-20" : "-right-40 top-20"}`}
      />

      <div
        className={`relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 ${
          isRight ? "" : "lg:[&>*:first-child]:order-2"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[480px] sm:h-[560px] lg:h-[640px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
            <motion.img
              src={item.image}
              alt={item.title}
              style={{ y: imgY }}
              className="h-[115%] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className={`absolute hidden h-48 w-64 overflow-hidden rounded-[2px] border-[6px] shadow-2xl md:block ${
              dark ? "border-ocean" : "border-ivory"
            } ${
              isRight
                ? "-right-6 -bottom-10 lg:-right-12"
                : "-left-6 -bottom-10 lg:-left-12"
            }`}
          >
            <img
              src={item.accent}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div
            className={`absolute left-6 top-6 rounded-full border px-4 py-2 backdrop-blur-md ${
              dark
                ? "border-white/20 bg-white/10 text-white"
                : "border-white/40 bg-white/30 text-ocean"
            }`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
              0{index + 1} · {item.eyebrow}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={fadeUp}
            className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] ${
              dark ? "text-teal" : "text-teal"
            }`}
          >
            {item.eyebrow}
          </motion.p>
          <motion.h3
            variants={fadeUp}
            custom={1}
            className={`font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl ${
              dark ? "text-white" : "text-ocean"
            }`}
          >
            {item.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span
              className={`italic ${dark ? "text-teal" : "text-charcoal"}`}
            >
              {item.title.split(" ").slice(-1)}
            </span>
          </motion.h3>
          <motion.p
            variants={fadeUp}
            custom={2}
            className={`mt-7 text-lg leading-relaxed ${
              dark ? "text-white/75" : "text-ocean/75"
            }`}
          >
            {item.description}
          </motion.p>

          <motion.ul variants={fadeUp} custom={3} className="mt-10 space-y-4">
            {item.bullets.map((b) => (
              <li key={b} className="flex items-start gap-4">
                <span
                  className={`mt-2 h-px w-8 flex-none ${
                    dark ? "bg-teal" : "bg-teal"
                  }`}
                />
                <span
                  className={`text-base ${
                    dark ? "text-white/85" : "text-ocean/80"
                  }`}
                >
                  {b}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} custom={4} className="mt-12">
            <Link
              to="/booking"
              className={`group inline-flex items-center gap-3 border-b pb-2 text-[11px] font-semibold uppercase tracking-[0.35em] transition ${
                dark
                  ? "border-teal text-teal hover:text-white"
                  : "border-teal text-teal hover:text-ocean"
              }`}
            >
              Reserve Your Experience
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Highlights ─────────────────────────────────────────────────────────── */

function Highlights() {
  return (
    <section className="relative overflow-hidden bg-[#0a0604] py-28 text-white sm:py-36">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(212,133,0,0.25), transparent 50%), radial-gradient(circle at 80% 70%, rgba(232,194,107,0.18), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
          >
            Experience Highlights
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-serif text-4xl leading-[1.1] sm:text-5xl"
          >
            Curated for <span className="italic text-teal">comfort.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, label, note }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: i * 0.06,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition hover:border-teal/40 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-teal/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-teal/30 bg-teal/10 text-teal transition group-hover:scale-110 group-hover:bg-teal group-hover:text-ocean">
                <Icon size={22} strokeWidth={1.4} />
              </div>
              <h4 className="font-serif text-xl text-white">{label}</h4>
              <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-white/50">
                {note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ─────────────────────────────────────────────────────────────── */

function Gallery() {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-ivory py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
            >
              Visual Journey
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-4xl leading-[1.1] text-ocean sm:text-5xl lg:text-6xl"
            >
              A taste of{" "}
              <span className="italic text-charcoal">paradise.</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-sm text-[15px] leading-relaxed text-ocean/70"
          >
            Wander through frames of warm afternoons, quiet corners, and
            unhurried indulgence at Discovery Samal.
          </motion.p>
        </motion.div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.src + i}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 8) * 0.05, duration: 0.7 }}
              className={`group relative overflow-hidden rounded-[2px] ${g.span}`}
            >
              <img
                src={g.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md">
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        open={open !== null}
        index={open}
        items={GALLERY}
        onClose={() => setOpen(null)}
        onPrev={() => setOpen((i) => (i - 1 + GALLERY.length) % GALLERY.length)}
        onNext={() => setOpen((i) => (i + 1) % GALLERY.length)}
      />
    </section>
  );
}

function Lightbox({ open, index, items, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 md:left-8"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 md:right-8"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
          <motion.img
            key={index}
            src={items[index]?.src}
            alt=""
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-h-[88vh] max-w-[92vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────────── */

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((x) => (x + 1) % TESTIMONIALS.length),
      6500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-white sm:py-36">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(https://image-tc.galaxy.tf/wijpeg-e9e3fi5ee3nudxmag9mtxp6bm/aerial-1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/95 via-charcoal/85 to-ocean" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
        >
          Whispered Praise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 font-serif text-4xl leading-[1.1] sm:text-5xl"
        >
          Stories from{" "}
          <span className="italic text-teal">our guests.</span>
        </motion.h2>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/15 bg-white/[0.06] p-10 backdrop-blur-xl sm:p-14"
            >
              <div className="mb-6 flex justify-center gap-1 text-teal">
                {Array.from({ length: TESTIMONIALS[i].rating }).map((_, k) => (
                  <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-serif text-2xl italic leading-relaxed text-white/95 sm:text-3xl">
                &ldquo;{TESTIMONIALS[i].quote}&rdquo;
              </p>
              <div className="mt-10">
                <p className="font-serif text-lg text-teal">
                  {TESTIMONIALS[i].name}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/60">
                  {TESTIMONIALS[i].origin}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Show testimonial ${k + 1}`}
              className={`h-px transition-all ${
                k === i
                  ? "w-12 bg-teal"
                  : "w-6 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ───────────────────────────────────────────────────────────────── */

function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} inView={inView} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, inView, delay }) {
  const value = useCounter(stat.value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8 }}
      className="text-center"
    >
      <div className="font-serif text-5xl text-charcoal sm:text-6xl lg:text-7xl">
        {value}
        <span className="text-teal">{stat.suffix}</span>
      </div>
      <div className="mx-auto mt-4 h-px w-10 bg-teal" />
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ocean/70">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ─── Final CTA ───────────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="relative h-[90svh] min-h-[560px] w-full overflow-hidden bg-[#0a0604] text-white">
      <motion.img
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        src={`https://image-tc.galaxy.tf/wijpeg-aeexb9m4bu60ndq3vcdnb7l9o/discovery-samal-08124-2_standard.jpg`}
        alt="Sunset over Samal Island"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/55 to-black/85" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal"
        >
          Your Invitation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          Escape into <span className="italic text-teal">paradise.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg"
        >
          Reserve your stay and let the rhythm of the sea, the warmth of our
          hospitality, and the quiet luxury of Discovery Samal unfold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            to="/booking"
            className="group inline-flex items-center gap-2 rounded-full bg-teal px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_20px_60px_-15px_rgba(212,133,0,0.7)] transition hover:bg-[#006d6d]"
          >
            Book Now
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/rooms"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md transition hover:border-teal hover:bg-teal hover:text-ocean"
          >
            Explore Rooms
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-2 text-white/60">
          <div className="h-12 w-px bg-white/30" />
          <p className="text-[10px] uppercase tracking-[0.4em]">
            {brand.address.split(",").slice(0, 2).join(",")}
          </p>
        </div>
      </div>
    </section>
  );
}


