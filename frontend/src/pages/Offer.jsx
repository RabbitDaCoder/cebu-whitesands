import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  GlassWater,
  Coffee,
  Percent,
  Bus,
  Ticket,
  Wine,
  Flower2,
  Clock,
  Star,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { SPECIAL_OFFERS, getOfferBySlug } from "../data/specialOffers";
import { brand } from "../lib/brand";

/* ------------------------------------------------------------------ */
/*  Brand palette (from discoverysamal.com)                              */
/*    cream   #f7f7f5                                                  */
/*    brown   #1a1a1a   (deep brown â€” primary text & dark panels)      */
/*    orange  #008c8c   (accent CTA)                                   */
/*    orangeD #006d6d   (accent hover)                                 */
/*    deep    #111111   (cinematic overlay / footer)                   */
/* ------------------------------------------------------------------ */

/* Auto-map inclusion phrases to icons */
const INCLUSION_ICONS = [
  { match: /welcome|drink/i, icon: GlassWater },
  { match: /breakfast|buffet/i, icon: Coffee },
  { match: /discount|restaurant|%/i, icon: Percent },
  { match: /van|transfer|jetty|airport|port/i, icon: Bus },
  { match: /hop-?on|day pass|pass|ho-ho/i, icon: Ticket },
  { match: /sunset|cocktail|wine/i, icon: Wine },
  { match: /massage|spa|wellness/i, icon: Flower2 },
  { match: /check-?in|check-?out|early|late/i, icon: Clock },
];

function iconFor(text) {
  const found = INCLUSION_ICONS.find((m) => m.match.test(text));
  return found ? found.icon : Sparkles;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { delay, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay, duration: 1.1, ease: "easeOut" },
});

function formatPeso(n) {
  return `â‚±${Number(n || 0).toLocaleString()}`;
}

/* ================================================================== */
/*  HERO â€” Cinematic, parallax                                         */
/* ================================================================== */
function CinematicHero({ onExplore }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative h-svh min-h-170 w-full overflow-hidden bg-ocean">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://image-tc.galaxy.tf/wijpeg-aeexb9m4bu60ndq3vcdnb7l9o/discovery-samal-08124-2_standard.jpg"
          alt="Samal Island shoreline"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-b from-ocean/45 via-ocean/35 to-ocean/95" />
      <div className="absolute inset-0 bg-linear-to-r from-ocean/60 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
        className="absolute left-1/2 top-28 z-10 -translate-x-1/2"
      >
        <div className="flex items-center gap-3 border border-teal/50 bg-ocean/35 px-5 py-2 text-[10px] uppercase tracking-[0.4em] text-ivory backdrop-blur-md">
          <Star className="h-3 w-3 fill-teal text-teal" />
          <span>Discovery Samal · Limited Time Offers</span>
          <Star className="h-3 w-3 fill-teal text-teal" />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-10"
      >
        <motion.p
          {...fadeIn(0.6)}
          className="mb-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal"
        >
          <span className="h-px w-12 bg-teal/60" />
          Escape Into Paradise
          <span className="h-px w-12 bg-teal/60" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1.1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="font-serif text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-[88px]"
        >
          Curated Stays.
          <br />
          <span className="italic text-teal">Unforgettable</span> Moments.
        </motion.h1>

        <motion.p
          {...fadeIn(0.9)}
          className="mt-10 max-w-2xl text-base leading-relaxed text-ivory/75 lg:text-lg"
        >
          Luxury beachfront experiences hand-crafted by Discovery Samal Resort â€”
          for couples seeking quiet solace, and groups gathering for shared
          island moments on Samal Island.
        </motion.p>

        <motion.div
          {...fadeIn(1.1)}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={onExplore}
            className="group inline-flex items-center gap-3 bg-teal px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ocean transition-all hover:bg-[#006d6d] hover:text-ivory hover:shadow-[0_20px_60px_-15px_rgba(212,133,0,0.6)]"
          >
            Explore Offers
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            to="/booking"
            className="group inline-flex items-center gap-3 border border-ivory/30 bg-ivory/5 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory backdrop-blur transition hover:border-teal hover:bg-ivory/10"
          >
            Reserve Experience
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-ivory/55"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="block h-10 w-px bg-linear-to-b from-teal to-transparent"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-teal/60 to-transparent" />
    </section>
  );
}

/* ================================================================== */
/*  INTRO                                                              */
/* ================================================================== */
function StoryIntro() {
  return (
    <section className="bg-ivory py-24 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.p
          {...fadeUp()}
          className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#006d6d]"
        >
          <span className="h-px w-10 bg-teal" />
          The Sands Collection
          <span className="h-px w-10 bg-teal" />
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-serif text-4xl leading-tight text-charcoal lg:text-5xl"
        >
          Beyond a stay.{" "}
          <span className="italic text-teal">An experience.</span>
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-charcoal/65 lg:text-lg"
        >
          Each package below is composed with intention â€” from the moment you
          arrive at the jetty port to the final sunset cocktail by the shore.
          Book direct for our most generous inclusions, available exclusively to
          direct guests.
        </motion.p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  OFFER SHOWCASE                                                     */
/* ================================================================== */
function OfferShowcase({ offer, index }) {
  if (offer.layoutVariant === "fullscreen-floating") {
    return <FullscreenFloatingOffer offer={offer} />;
  }
  const reverse = index % 2 === 1;
  return <ImageSideOffer offer={offer} reverse={reverse} />;
}

function ImageSideOffer({ offer, reverse }) {
  return (
    <section id={offer.slug} className="relative bg-ivory py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-12 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div {...fadeUp()} className="relative lg:col-span-7">
            <div className="relative overflow-hidden bg-ocean">
              <img
                src={offer.heroImage}
                alt={offer.title}
                className="aspect-4/5 w-full object-cover transition-transform duration-2000 ease-out hover:scale-[1.04] lg:aspect-5/6"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ocean/45 via-transparent to-transparent" />
              {offer.badge && (
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 border border-teal/60 bg-ocean/40 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-ivory backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-teal" />
                  {offer.badge}
                </div>
              )}
            </div>
            {offer.gallery?.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {offer.gallery.slice(0, 4).map((src, i) => (
                  <motion.div
                    key={src + i}
                    {...fadeUp(0.1 + i * 0.05)}
                    className="aspect-square overflow-hidden bg-ocean"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1400 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="lg:col-span-5">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#006d6d]">
              <span className="h-px w-10 bg-teal" />
              {offer.subtitle}
            </p>
            <h2 className="font-serif text-4xl leading-tight text-charcoal lg:text-5xl">
              {offer.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal/70">
              {offer.description}
            </p>

            <InclusionGrid items={offer.inclusions} />
            <PricingBlock offer={offer} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FullscreenFloatingOffer({ offer }) {
  return (
    <section
      id={offer.slug}
      className="relative overflow-hidden bg-ocean py-20 lg:py-32"
    >
      <img
        src={offer.heroImage}
        alt={offer.title}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ocean/80 via-ocean/55 to-ocean/90" />
      <div className="absolute inset-0 bg-linear-to-r from-ocean/70 via-transparent to-ocean/40" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <motion.div {...fadeUp()} className="lg:col-span-5 lg:pt-12">
          {offer.badge && (
            <div className="mb-6 inline-flex items-center gap-2 border border-teal/60 bg-ocean/40 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-ivory backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-teal" />
              {offer.badge}
            </div>
          )}
          <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
            <span className="h-px w-10 bg-teal/70" />
            {offer.subtitle}
          </p>
          <h2 className="font-serif text-4xl leading-tight text-ivory lg:text-6xl">
            {offer.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">
            {offer.description}
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="lg:col-span-7">
          <div className="border border-ivory/15 bg-ocean/40 p-8 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] lg:p-12">
            <div className="h-px w-full bg-linear-to-r from-transparent via-teal to-transparent" />
            <p className="mt-7 mb-2 text-[10px] uppercase tracking-[0.4em] text-teal">
              Included in this experience
            </p>
            <h3 className="font-serif text-2xl text-ivory lg:text-3xl">
              {offer.title.split("·")[0].trim()} Inclusions
            </h3>

            <InclusionGrid items={offer.inclusions} dark />

            <div className="mt-8 border-t border-ivory/10 pt-8">
              <PricingBlock offer={offer} dark />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  INCLUSION GRID                                                     */
/* ================================================================== */
function InclusionGrid({ items, dark = false }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-px bg-charcoal/10 sm:grid-cols-2">
      {items.map((text, i) => {
        const Icon = iconFor(text);
        return (
          <motion.div
            key={text + i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className={`group flex items-start gap-3 px-4 py-4 transition-colors ${
              dark
                ? "bg-ocean/60 hover:bg-ocean/80"
                : "bg-white hover:bg-ivory"
            }`}
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center border transition-colors ${
                dark
                  ? "border-teal/40 bg-teal/10 group-hover:bg-teal/20"
                  : "border-teal/30 bg-ivory group-hover:border-teal"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${dark ? "text-teal" : "text-[#006d6d]"}`}
              />
            </span>
            <span
              className={`pt-1 text-sm leading-snug ${
                dark ? "text-ivory/85" : "text-charcoal/80"
              }`}
            >
              {text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/*  PRICING BLOCK                                                      */
/* ================================================================== */
function PricingBlock({ offer, dark = false }) {
  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.4em] ${
              dark ? "text-teal" : "text-[#006d6d]"
            }`}
          >
            {offer.priceLabel}
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <span
              className={`font-serif text-5xl leading-none lg:text-6xl ${
                dark ? "text-ivory" : "text-charcoal"
              }`}
            >
              {formatPeso(offer.priceAmount)}
            </span>
            <span
              className={`text-sm ${
                dark ? "text-ivory/55" : "text-charcoal/55"
              }`}
            >
              {offer.priceUnit}
            </span>
          </div>
        </div>
        <div
          className={`inline-block border px-3 py-2 text-[10px] uppercase tracking-[0.3em] ${
            dark
              ? "border-ivory/20 text-ivory/75"
              : "border-charcoal/20 text-charcoal/65"
          }`}
        >
          {offer.duration}
        </div>
      </div>

      {offer.priceFootnote && (
        <p
          className={`mt-3 text-xs italic ${
            dark ? "text-ivory/55" : "text-charcoal/55"
          }`}
        >
          {offer.priceFootnote}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          to={offer.ctaPrimaryLink}
          className="group inline-flex items-center justify-center gap-2 bg-teal px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ocean transition hover:bg-[#006d6d] hover:text-ivory hover:shadow-[0_18px_50px_-15px_rgba(212,133,0,0.6)]"
        >
          {offer.ctaPrimaryLabel}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        {offer.ctaSecondaryLabel && (
          <Link
            to={offer.ctaSecondaryLink}
            className={`inline-flex items-center justify-center gap-2 border px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] transition ${
              dark
                ? "border-ivory/30 text-ivory hover:border-teal hover:bg-ivory/5"
                : "border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            }`}
          >
            {offer.ctaSecondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  DISCOVERY RAIL                                                     */
/* ================================================================== */
function OfferDiscoveryRail({ offers, onJump }) {
  return (
    <section className="bg-ocean py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          {...fadeUp()}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
              <span className="h-px w-10 bg-teal" />
              Discover Offers
            </p>
            <h2 className="font-serif text-4xl text-ivory lg:text-5xl">
              Choose your{" "}
              <span className="italic text-teal">island chapter</span>.
            </h2>
          </div>
          <Link
            to="/booking"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory/75 transition hover:text-teal"
          >
            Reserve Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:-mx-10 lg:px-10">
          {offers.map((offer, i) => (
            <motion.button
              type="button"
              key={offer.id}
              onClick={() => onJump(offer.slug)}
              {...fadeUp(i * 0.08)}
              className="group relative w-[78vw] shrink-0 snap-start overflow-hidden border border-ivory/10 bg-ocean text-left transition-colors hover:border-teal/50 sm:w-105"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={offer.heroImage}
                  alt={offer.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1600 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ocean via-ocean/30 to-transparent" />
                {offer.badge && (
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-teal/60 bg-ocean/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] text-ivory backdrop-blur-md">
                    {offer.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-teal">
                  {offer.subtitle}
                </p>
                <h3 className="font-serif text-2xl text-ivory">
                  {offer.title}
                </h3>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/55">
                      {offer.priceLabel}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-ivory">
                      {formatPeso(offer.priceAmount)}
                      <span className="ml-1 text-xs text-ivory/55">
                        {offer.priceUnit}
                      </span>
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center border border-ivory/20 text-ivory transition group-hover:border-teal group-hover:bg-teal group-hover:text-ocean">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CLOSING CTA                                                        */
/* ================================================================== */
function ClosingCTA() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="https://discoverysamal.com/wp-content/uploads/2026/03/RCB05425.jpg"
        alt="Samal Island sunset"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-[2px]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ocean/85 via-ocean/70 to-ocean/95" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center lg:px-10 lg:py-44">
        <motion.p
          {...fadeUp()}
          className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal"
        >
          <span className="h-px w-10 bg-teal" />
          Your Escape Awaits
          <span className="h-px w-10 bg-teal" />
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-serif text-4xl leading-tight text-ivory lg:text-6xl"
        >
          Wake up steps away from
          <br />
          Samal Island's{" "}
          <span className="italic text-teal">white sand paradise</span>.
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/75"
        >
          Book direct for our most generous inclusions. Limited rooms, attentive
          service, and an island ready to receive you.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/booking"
            className="group inline-flex items-center gap-3 bg-teal px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ocean transition hover:bg-[#006d6d] hover:text-ivory hover:shadow-[0_20px_60px_-15px_rgba(212,133,0,0.7)]"
          >
            Reserve Your Escape
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`tel:${(brand.phone || "").replace(/\s/g, "")}`}
            className="inline-flex items-center gap-3 border border-ivory/30 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory backdrop-blur transition hover:border-teal hover:bg-ivory/5"
          >
            <Phone className="h-3.5 w-3.5" />
            {brand.phone}
          </a>
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.3em] text-ivory/55"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-teal" />
            Samal Island, Davao del Norte
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-teal" />
            {brand.email}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STICKY MOBILE CTA                                                  */
/* ================================================================== */
function StickyMobileCTA({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/15 bg-ocean/95 px-4 py-3 backdrop-blur-xl lg:hidden"
        >
          <Link
            to="/booking"
            className="flex w-full items-center justify-center gap-2 bg-teal px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ocean transition hover:bg-[#006d6d] hover:text-ivory"
          >
            Reserve Now
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function Offer() {
  const { slug } = useParams();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (slug && getOfferBySlug(slug)) {
      const el = document.getElementById(slug);
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          400,
        );
      }
    }
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prev = document.title;
    document.title = "Special Offers · Discovery Samal Resort";
    return () => {
      document.title = prev;
    };
  }, []);

  const handleExplore = () => {
    document
      .getElementById(SPECIAL_OFFERS[0]?.slug)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleJump = (s) => {
    document
      .getElementById(s)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-ivory">
      <CinematicHero onExplore={handleExplore} />
      <StoryIntro />

      {SPECIAL_OFFERS.map((offer, i) => (
        <OfferShowcase key={offer.id} offer={offer} index={i} />
      ))}

      <OfferDiscoveryRail offers={SPECIAL_OFFERS} onJump={handleJump} />
      <ClosingCTA />

      <StickyMobileCTA visible={showSticky} />
    </div>
  );
}


