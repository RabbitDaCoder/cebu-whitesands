import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Quote,
  Waves,
  Palmtree,
  Utensils,
  Users,
  Coffee,
  Heart,
  Sparkles,
  Bed,
  MapPin,
  Plane,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { brand } from "../lib/brand";

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  Local image library (from discoverysamal.com — saved to /public)         */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const CDN = "https://image-tc.galaxy.tf";

const HERO_IMG = `https://image-tc.galaxy.tf/wijpeg-9g0c8e4jia8i8dw5hv5xd3r05/dss-website-banner-home-page-2.jpg`;
const INTRO_IMG_A = `https://image-tc.galaxy.tf/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg`;
const INTRO_IMG_B = `https://image-tc.galaxy.tf/wijpeg-e9e3fi5ee3nudxmag9mtxp6bm/aerial-1.jpg`;
const STORY_PARALLAX = `https://image-tc.galaxy.tf/wijpeg-bcuufnq3q2s8cqqkqxm28wiqw/untitled-design-4.jpg`;
const EXPERIENCE_BG = `https://image-tc.galaxy.tf/wijpeg-7jtyjnoy3zk9ji5fg7szxfttb/dss-website-banner-home-page.jpg`;
const CTA_BG = `https://image-tc.galaxy.tf/wijpeg-aeexb9m4bu60ndq3vcdnb7l9o/discovery-samal-08124-2_standard.jpg`;

const GALLERY = [
  { src: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/2BR+POOL+VILLA+LEFT+WING+3-1920w.jpeg`, span: "row-span-2", alt: "Beachfront view" },
  { src: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/3BR+Pool+Villa+10-1920w.jpeg`, span: "", alt: "Resort interior" },
  { src: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/5+BEDROOM+8-1920w.jpeg`, span: "", alt: "Premium suite" },
  { src: `https://image-tc.galaxy.tf/wijpeg-e9e3fi5ee3nudxmag9mtxp6bm/aerial-1.jpg`, span: "row-span-2", alt: "Pool lounge" },
  { src: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/6+BEDROOM+1-1920w.jpeg`, span: "", alt: "Beach view room" },
  { src: `https://image-tc.galaxy.tf/wijpeg-75f73vymu5o1t89ryvtwcmpug/girl-enjoying-the-pool-in-the-best-luxury-resort-in-davao-discovery-samal-tablet-size.jpg`, span: "", alt: "Spa & wellness" },
  { src: `https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/The+Bistro+2-1920w.jpeg`, span: "row-span-2", alt: "Sunbeds" },
  { src: `https://image-tc.galaxy.tf/wijpeg-aeexb9m4bu60ndq3vcdnb7l9o/discovery-samal-08124-2_standard.jpg`, span: "", alt: "Balcony at dusk" },
];

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  Motion variants                                                        */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  Animated counter (used in Experience section)                          */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Counter({ value, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
      else setN(value);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/*  PAGE                                                                   */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function AboutPage() {
  return (
    <main className="bg-ivory text-ocean selection:bg-teal/30">
      <HeroSection />
      <IntroductionSection />
      <StorySection />
      <WhyChooseSection />
      <ExperienceSection />
      <GallerySection />
      <TestimonialSection />
      <LocationSection />
      <FinalCTASection />
    </main>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  1. HERO                                                                */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative h-svh min-h-160 w-full overflow-hidden bg-[#111]"
    >
      {/* Cinematic background with slow zoom */}
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={HERO_IMG}
          alt="Discovery Samal Resort beachfront"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Layered gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-[#111]/55 via-[#111]/25 to-[#111]/80" />
      <div className="absolute inset-0 bg-linear-to-r from-[#111]/40 via-transparent to-transparent" />

      {/* Animated palm-shadow effect (soft moving gradient) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.18, 0.35, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_15%_85%,#2f6b3d_0%,transparent_60%)] mix-blend-multiply"
      />

      {/* Floating glassmorphism content card */}
      <div className="relative z-10 flex h-full items-center px-6 lg:px-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.5em] text-teal"
          >
            <span className="h-px w-10 bg-teal" />
            About the Resort
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            About{" "}
            <em className="font-light italic text-teal">{brand.shortName}</em>{" "}
            Resort
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-8 rounded-2xl border border-white/15 bg-white/8 px-7 py-6 backdrop-blur-xl backdrop-saturate-150"
          >
            <p className="font-light text-[17px] leading-[1.85] text-white/85 sm:text-[18px]">
              Your sanctuary of tropical elegance, comfort, and unforgettable
              experiences — where every sunrise becomes a memory and every
              sunset, a celebration.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.a
        href="#intro"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-white/70 hover:text-white"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  2. INTRODUCTION — Editorial split with overlapping images              */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function IntroductionSection() {
  return (
    <section id="intro" className="relative py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        {/* Overlapping floating images */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative lg:col-span-6 lg:h-160"
        >
          <motion.figure
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-4/5 overflow-hidden rounded-sm shadow-[0_30px_80px_-30px_rgba(17,17,17,0.35)] lg:absolute lg:left-0 lg:top-0 lg:h-130 lg:w-[64%]"
          >
            <img
              src={INTRO_IMG_A}
              alt="Resort beach view"
              className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-110"
            />
          </motion.figure>

          <motion.figure
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className="relative -mt-16 ml-auto aspect-3/4 w-[78%] overflow-hidden rounded-sm shadow-[0_40px_100px_-40px_rgba(17,17,17,0.45)] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-95 lg:w-[52%]"
          >
            <img
              src={INTRO_IMG_B}
              alt="Beachfront room"
              className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-110"
            />
          </motion.figure>

          {/* Decorative accent */}
          <motion.div
            variants={fadeIn}
            className="absolute -bottom-6 left-6 hidden h-24 w-24 rotate-12 border border-teal/40 lg:block"
          />
        </motion.div>

        {/* Storytelling text */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex flex-col justify-center lg:col-span-6"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-charcoal/70"
          >
            <span className="h-px w-10 bg-teal" />
            Introduction
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[56px]"
          >
            A refined escape where paradise{" "}
            <em className="italic text-teal">meets</em> modern luxury.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-10 space-y-6 font-light text-[16.5px] leading-[1.95] text-[#111]/75"
          >
            <p>
              Nestled in the heart of paradise, Discovery Samal Resort offers a
              refined escape where tropical beauty meets modern luxury.
            </p>
            <p>
              From breathtaking beachfront views to carefully crafted
              hospitality experiences, every moment is designed to create peace,
              comfort, and unforgettable memories.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12">
            <Link
              to="/rooms"
              className="group inline-flex items-center gap-4 border-b border-charcoal/30 pb-2 text-[12px] font-medium uppercase tracking-[0.35em] text-charcoal transition-colors hover:border-teal hover:text-teal"
            >
              Discover Our Rooms
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  3. OUR STORY — Cinematic parallax with glass text panel               */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-linear-to-b from-charcoal via-[#0a2020] to-ocean py-32 text-white lg:py-44"
    >
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-30">
        <img
          src={STORY_PARALLAX}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-charcoal/40 to-ocean" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="lg:col-span-5"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-teal"
          >
            <span className="h-px w-10 bg-teal" />
            Our Story
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            A vision born <br />
            of <em className="italic text-teal">island calm</em>.
          </motion.h2>
        </motion.div>

        {/* Glassmorphism narrative panel */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="lg:col-span-7"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-2xl sm:p-12"
          >
            <p className="font-light text-[17px] leading-[2] text-white/85">
              What began as a vision to create a peaceful island sanctuary has
              evolved into one of the most relaxing luxury resort experiences
              on Samal Island, Davao del Norte.
            </p>
            <p className="mt-6 font-light text-[17px] leading-[2] text-white/85">
              Discovery Samal Resort blends contemporary elegance with tropical
              warmth, offering guests an escape from the ordinary and a
              connection to paradise.
            </p>
          </motion.div>

          {/* Animated timeline */}
          <motion.ol
            variants={stagger}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              { year: "2018", label: "Vision begins" },
              { year: "2021", label: "Doors open" },
              { year: "Today", label: "Five-star sanctuary" },
            ].map((t) => (
              <motion.li
                key={t.year}
                variants={fadeUp}
                className="relative border-l border-teal/40 pl-5"
              >
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-teal" />
                <div className="font-serif text-2xl text-teal">
                  {t.year}
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.3em] text-white/55">
                  {t.label}
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  4. WHY CHOOSE US — Glassmorphism feature cards                         */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const FEATURES = [
  { icon: Waves, title: "Beachfront Luxury", desc: "Island beachfront location." },
  { icon: Sparkles, title: "Infinity Pool", desc: "Sunset-facing waters." },
  { icon: Bed, title: "Private Villas", desc: "Suites with sea views." },
  { icon: Utensils, title: "Fine Dining", desc: "Coastal flavors, refined." },
  { icon: Users, title: "Family Friendly", desc: "Welcoming for all ages." },
  { icon: Coffee, title: "Free Breakfast", desc: "Daily island spread." },
  { icon: Heart, title: "Premium Hospitality", desc: "Warm Filipino care." },
  { icon: Palmtree, title: "Relaxing Atmosphere", desc: "Calm by design." },
];

function WhyChooseSection() {
  return (
    <section className="relative bg-ivory py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-charcoal/70"
          >
            <span className="h-px w-10 bg-teal" />
            Why Choose Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[56px]"
          >
            The hallmarks of a{" "}
            <em className="italic text-teal">world-class</em> stay.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-xl border border-charcoal/10 bg-white/60 p-7 backdrop-blur-xl transition-all duration-500 hover:border-teal/50 hover:bg-white/90 hover:shadow-[0_25px_60px_-25px_rgba(212,160,23,0.45)]"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-teal/0 to-teal/0 opacity-0 transition-opacity duration-500 group-hover:from-teal/10 group-hover:opacity-100" />

              <motion.div
                whileHover={{ rotate: -6, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-charcoal/5 text-charcoal transition-colors group-hover:bg-teal/15 group-hover:text-teal"
              >
                <f.icon size={22} strokeWidth={1.5} />
              </motion.div>

              <h3 className="relative font-serif text-xl text-charcoal">
                {f.title}
              </h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-[#111]/60">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  5. EXPERIENCE — Full-bleed cinematic + counters                        */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const STATS = [
  { value: 153, suffix: "+", label: "Villas & Suites" },
  { value: 3, suffix: "", label: "Restaurants & Bars" },
  { value: 24, suffix: "/7", label: "Hospitality" },
  { value: 100, suffix: "%", label: "Beachfront Access" },
];

function ExperienceSection() {
  return (
    <section className="relative isolate h-svh min-h-160 w-full overflow-hidden bg-[#111] text-white">
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={EXPERIENCE_BG}
          alt="Sunset dining"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#111]/70 via-[#111]/45 to-[#111]/85" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.5em] text-teal"
          >
            <span className="h-px w-10 bg-teal" />
            The Experience
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl leading-[1.1] sm:text-6xl lg:text-7xl"
          >
            Breathtaking sunsets, <br />
            ocean breeze mornings, <br />
            <em className="italic text-teal">unforgettable</em> island
            moments.
          </motion.h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <div className="font-serif text-4xl text-teal sm:text-5xl lg:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/65">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  6. GALLERY — Masonry with lightbox                                     */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function GallerySection() {
  const [active, setActive] = useState(null); // index in GALLERY

  const close = () => setActive(null);
  const next = () => setActive((i) => (i + 1) % GALLERY.length);
  const prev = () =>
    setActive((i) => (i - 1 + GALLERY.length) % GALLERY.length);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="relative bg-ivory py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-charcoal/70"
            >
              <span className="h-px w-10 bg-teal" />
              Image Showcase
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[56px]"
            >
              A glimpse of <em className="italic text-teal">paradise</em>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md font-light text-[15px] leading-relaxed text-[#111]/65"
          >
            Wander through the moments that define a stay at {brand.displayName} — from
            golden mornings on the sand to soft-lit evenings by the pool.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
        >
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.src}
              variants={fadeUp}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-sm ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#111]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 translate-y-3 text-[11px] uppercase tracking-[0.3em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111]/95 backdrop-blur-md"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute right-6 top-6 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 z-10 rounded-full border border-white/20 bg-white/5 p-3 text-white/80 backdrop-blur hover:bg-white/15 sm:left-8"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 z-10 rounded-full border border-white/20 bg-white/5 p-3 text-white/80 backdrop-blur hover:bg-white/15 sm:right-8"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              src={GALLERY[active].src}
              alt={GALLERY[active].alt}
              className="max-h-[88vh] max-w-[92vw] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  7. TESTIMONIALS — Luxury glass carousel                                */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const TESTIMONIALS = [
  {
    quote:
      "Truly the most peaceful escape we've experienced. The staff anticipated every need — pure five-star hospitality.",
    name: "Isabella & Marco",
    detail: "Honeymoon · Italy",
  },
  {
    quote:
      "Waking up to the sound of the waves and the smell of fresh breakfast on the balcony — unforgettable.",
    name: "Sophia Tan",
    detail: "Family Stay · Singapore",
  },
  {
    quote:
      "Quiet luxury done right. Every detail felt considered, every sunset felt earned. We'll be back.",
    name: "James Whitaker",
    detail: "Solo Retreat · UK",
  },
];

function TestimonialSection() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () =>
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-ocean to-charcoal py-28 text-white lg:py-36">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#3fa7d6]/8 blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-teal"
        >
          <span className="h-px w-10 bg-teal" />
          Guest Stories
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
        >
          Words from <em className="italic text-teal">our guests</em>.
        </motion.h2>

        <div className="relative mt-16 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-white/[0.05] p-10 backdrop-blur-2xl sm:p-14"
            >
              <Quote
                size={40}
                className="mx-auto mb-6 text-teal/60"
                strokeWidth={1.2}
              />
              <blockquote className="font-serif text-2xl font-light italic leading-[1.5] text-white/90 sm:text-3xl">
                â€œ{TESTIMONIALS[idx].quote}â€
              </blockquote>
              <figcaption className="mt-8">
                <div className="font-serif text-lg text-teal">
                  {TESTIMONIALS[idx].name}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.35em] text-white/55">
                  {TESTIMONIALS[idx].detail}
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="rounded-full border border-white/20 p-2.5 text-white/70 transition hover:border-teal hover:text-teal"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === idx ? "w-8 bg-teal" : "w-2 bg-white/25"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full border border-white/20 p-2.5 text-white/70 transition hover:border-teal hover:text-teal"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  8. LOCATION — Map + floating info cards                                */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const NEARBY = [
  { icon: Waves, label: "Davao Gulf", value: "Beachfront" },
  { icon: Plane, label: "Davao Airport", value: "~30 min + ferry" },
  { icon: Utensils, label: "D'Mall Dining", value: "5 min walk" },
  { icon: MapPin, label: "Samal Island", value: "IGACOS, Davao del Norte" },
];

function LocationSection() {
  return (
    <section className="relative bg-ivory py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-14 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-charcoal/70"
          >
            <span className="h-px w-10 bg-teal" />
            Location
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[56px]"
          >
            Find us on <em className="italic text-teal">Samal Island</em>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#111]/65"
          >
            {brand.address}
          </motion.p>
        </motion.div>

        <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(17,17,17,0.35)]">
          <iframe
            title="Discovery Samal Resort location"
            src="https://www.google.com/maps?q=Samal+Island+Island+Garden+City+of+Samal+Davao+del+Norte&output=embed"
            className="h-[460px] w-full border-0 grayscale-[0.15]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating glassmorphism info panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-6 left-6 right-6 hidden rounded-xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl sm:block sm:left-8 sm:right-auto sm:max-w-md"
          >
            <h3 className="font-serif text-xl text-charcoal">
              {brand.displayName}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#111]/70">
              {brand.address}
            </p>
            <a
              href="https://www.google.com/maps?q=Samal+Island+Island+Garden+City+of+Samal+Davao+del+Norte"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-teal hover:text-charcoal"
            >
              Open in Maps <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Nearby chips */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {NEARBY.map((n) => (
            <motion.div
              key={n.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-charcoal/10 bg-white/70 p-5 backdrop-blur-xl"
            >
              <n.icon size={20} strokeWidth={1.5} className="text-teal" />
              <div className="mt-3 font-serif text-base text-charcoal">
                {n.label}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#111]/55">
                {n.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/*  9. FINAL CTA                                                           */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function FinalCTASection() {
  return (
    <section className="relative isolate h-[92svh] min-h-[560px] w-full overflow-hidden bg-[#111] text-white">
      <motion.div
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={CTA_BG}
          alt="Sunset at discoverysamal"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#111]/55 via-charcoal/40 to-[#111]/90" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-[11px] uppercase tracking-[0.5em] text-teal"
          >
            Your stay awaits
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Escape To <em className="italic text-teal">Paradise</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-xl font-light text-[17px] leading-[1.8] text-white/80"
          >
            Book your unforgettable stay at Discovery Samal Resort today — where
            the tide whispers and time slows.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <Link
              to="/booking"
              className="group inline-flex items-center gap-3 rounded-full border border-teal bg-teal px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-ocean transition-all duration-500 hover:bg-transparent hover:text-teal hover:shadow-[0_20px_60px_-20px_rgba(212,160,23,0.6)]"
            >
              Book Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/rooms"
              className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/8 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-white backdrop-blur-xl transition-all duration-500 hover:border-white hover:bg-white/15"
            >
              Explore Rooms
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



