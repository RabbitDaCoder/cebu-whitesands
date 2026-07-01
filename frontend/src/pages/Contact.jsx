import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Check,
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  Crown,
  Calendar,
  Users,
  Globe,
  MessageCircle,
  Sparkles,
  Star,
  Clock,
} from "lucide-react";
import {
  CONTACT_HERO_IMAGE,
  CONCIERGE_IMAGE,
  SOCIAL_PREVIEW_IMAGES,
  CONTACT_HERO,
  WELCOME,
  INQUIRY_TYPES,
  COUNTRIES,
  GUEST_OPTIONS,
  CONTACT_CHANNELS,
  LOCATIONS,
  CONCIERGE,
  FAQ,
  SOCIAL,
} from "../data/contactData";
import { brand } from "../lib/brand";

/* ------------------------------------------------------------------ */
/*  Brand palette — Discovery Samal                                      */
/*    cream   #f7f7f5                                                  */
/*    brown   #1a1a1a   (deep brown — primary text & dark panels)      */
/*    orange  #008c8c   (accent CTA)                                   */
/*    orangeD #006d6d   (accent hover)                                 */
/*    deep    #111111   (cinematic overlay / footer)                   */
/* ------------------------------------------------------------------ */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay, duration: 1.1, ease: "easeOut" },
});

const CHANNEL_ICONS = {
  phone: Phone,
  mail: Mail,
  sparkles: Sparkles,
  crown: Crown,
};

/* ================================================================== */
/*  HERO — Cinematic, parallax                                         */
/* ================================================================== */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.35]);

  return (
    <section className="relative h-svh min-h-170 w-full overflow-hidden bg-ocean">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={CONTACT_HERO_IMAGE}
          alt="Discovery Samal — Samal Island Resort"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-b from-ocean/55 via-ocean/40 to-ocean/95" />
      <div className="absolute inset-0 bg-linear-to-r from-ocean/60 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
        className="absolute left-1/2 top-28 z-10 -translate-x-1/2"
      >
        <div className="flex items-center gap-3 border border-teal/50 bg-ocean/35 px-5 py-2 text-[10px] uppercase tracking-[0.4em] text-ivory backdrop-blur-md">
          <Star className="h-3 w-3 fill-teal text-teal" />
          <span>24/7 Concierge · Discovery Samal</span>
          <Star className="h-3 w-3 fill-teal text-teal" />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-28 lg:px-12 lg:pb-36"
      >
        <motion.p
          {...fadeIn(0.5)}
          className="mb-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal"
        >
          <span className="h-px w-12 bg-teal/60" />
          {CONTACT_HERO.preTitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1.1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="max-w-5xl font-serif text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl xl:text-[88px]"
        >
          {CONTACT_HERO.title}{" "}
          <span className="italic text-teal">
            {CONTACT_HERO.titleAccent}
          </span>
          .
        </motion.h1>

        <motion.p
          {...fadeIn(0.9)}
          className="mt-8 max-w-xl text-base leading-relaxed text-ivory/80 lg:text-lg"
        >
          {CONTACT_HERO.body}
        </motion.p>

        <motion.div
          {...fadeIn(1.05)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact-form"
            className="group inline-flex items-center gap-3 bg-teal px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ocean transition-all hover:bg-[#006d6d] hover:text-ivory hover:shadow-[0_20px_60px_-15px_rgba(212,133,0,0.6)]"
          >
            Contact Concierge
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <Link
            to="/booking"
            className="group inline-flex items-center gap-3 border border-ivory/30 bg-ivory/5 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory backdrop-blur transition hover:border-teal hover:bg-ivory/10"
          >
            Reserve Your Stay
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Floating quick-info glass pills */}
        <motion.div
          {...fadeIn(1.25)}
          className="mt-10 hidden flex-wrap items-center gap-3 sm:flex"
        >
          <a
            href={`tel:${(brand.phone || "").replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2.5 border border-ivory/15 bg-ocean/40 px-4 py-2.5 text-[12px] text-ivory/85 backdrop-blur-md transition hover:border-teal/60 hover:text-teal"
          >
            <Phone className="h-3.5 w-3.5 text-teal" />
            {brand.phone}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex items-center gap-2.5 border border-ivory/15 bg-ocean/40 px-4 py-2.5 text-[12px] text-ivory/85 backdrop-blur-md transition hover:border-teal/60 hover:text-teal"
          >
            <Mail className="h-3.5 w-3.5 text-teal" />
            {brand.email}
          </a>
          <span className="inline-flex items-center gap-2.5 border border-ivory/15 bg-ocean/40 px-4 py-2.5 text-[12px] text-ivory/85 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-teal" />
            Samal Island, Davao del Norte
          </span>
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
/*  WELCOME                                                            */
/* ================================================================== */
function Welcome() {
  return (
    <section className="relative bg-ivory py-24 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
        <motion.p
          {...fadeUp()}
          className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#006d6d]"
        >
          <span className="h-px w-10 bg-teal" />
          {WELCOME.preTitle}
          <span className="h-px w-10 bg-teal" />
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="font-serif text-4xl leading-tight text-charcoal lg:text-5xl"
        >
          {WELCOME.title}{" "}
          <span className="italic text-teal">{WELCOME.titleAccent}</span>.
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-charcoal/70 lg:text-lg"
        >
          {WELCOME.body}
        </motion.p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  LUXURY CONTACT CHANNELS                                            */
/* ================================================================== */
function ChannelCards() {
  return (
    <section className="relative bg-ivory pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          {...fadeUp()}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#006d6d]">
              <span className="h-px w-10 bg-teal" />
              Direct Channels
            </p>
            <h2 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Reach the right team,{" "}
              <span className="italic text-teal">straight away</span>.
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-7">
          {CONTACT_CHANNELS.map((c, i) => {
            const Icon = CHANNEL_ICONS[c.iconKey] || Mail;
            return (
              <motion.div
                {...fadeUp((i % 2) * 0.08)}
                key={c.id}
                className="group relative overflow-hidden border border-charcoal/10 bg-white/70 p-8 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_30px_70px_-30px_rgba(90,35,14,0.35)] lg:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,133,0,0.22) 0%, transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center border border-teal/40 bg-teal/10 transition-colors group-hover:bg-teal group-hover:text-ocean">
                    <Icon className="h-5 w-5 text-[#006d6d] transition-colors group-hover:text-ocean" />
                  </div>
                  <h3 className="mt-7 font-serif text-2xl text-charcoal lg:text-[28px]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                    {c.blurb}
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-charcoal/10 pt-6">
                    {c.items.map((it) => (
                      <li
                        key={it.label + it.value}
                        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13.5px]"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-charcoal/55">
                          {it.label}
                        </span>
                        <a
                          href={it.href}
                          className="break-all text-charcoal transition-colors hover:text-teal"
                        >
                          {it.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONCIERGE CONTACT FORM                                             */
/* ================================================================== */
function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required,
  textarea,
  icon: Icon,
}) {
  const Tag = textarea ? "textarea" : "input";
  const hasValue = value && String(value).length > 0;
  return (
    <div className="group relative">
      <Tag
        id={name}
        name={name}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        required={required}
        rows={textarea ? 5 : undefined}
        autoComplete="off"
        className={`peer w-full border border-ivory/15 bg-ivory/4 px-5 ${
          Icon ? "pl-12" : ""
        } ${
          textarea ? "pt-7 pb-3" : "pt-6 pb-2"
        } text-sm text-ivory placeholder-transparent backdrop-blur-md outline-none transition-all focus:border-teal focus:bg-ivory/8`}
        placeholder={label}
      />
      {Icon && (
        <Icon className="pointer-events-none absolute left-4 top-5 h-4 w-4 text-teal/70" />
      )}
      <label
        htmlFor={name}
        className={`pointer-events-none absolute origin-top-left text-[11px] font-semibold uppercase tracking-[0.25em] transition-all ${
          Icon ? "left-12" : "left-5"
        } ${
          hasValue
            ? "top-2 scale-[0.85] text-teal"
            : "top-5 text-ivory/55 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:text-teal"
        }`}
      >
        {label}
        {required && <span className="ml-1 text-teal">*</span>}
      </label>
    </div>
  );
}

function FloatingSelect({
  label,
  name,
  value,
  onChange,
  options,
  required,
  icon: Icon,
}) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`peer w-full appearance-none border border-ivory/15 bg-ivory/4 ${
          Icon ? "pl-12" : "pl-5"
        } pr-12 pt-7 pb-2 text-sm text-ivory backdrop-blur-md outline-none transition-all focus:border-teal focus:bg-ivory/8`}
      >
        <option value="" className="bg-ocean">
          Selectâ€¦
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ocean">
            {o}
          </option>
        ))}
      </select>
      {Icon && (
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal/70" />
      )}
      <label
        htmlFor={name}
        className={`pointer-events-none absolute top-2 origin-top-left scale-[0.85] text-[11px] font-semibold uppercase tracking-[0.25em] ${
          Icon ? "left-12" : "left-5"
        } ${value ? "text-teal" : "text-ivory/55"}`}
      >
        {label}
        {required && <span className="ml-1 text-teal">*</span>}
      </label>
      <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/50" />
    </div>
  );
}

function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    arrival: "",
    departure: "",
    guests: "",
    inquiry: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((d) => ({ ...d, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulated submit — wire to backend endpoint when available.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setTimeout(() => setStatus("idle"), 5000);
    setData({
      name: "",
      email: "",
      phone: "",
      country: "",
      arrival: "",
      departure: "",
      guests: "",
      inquiry: "",
      message: "",
      consent: false,
    });
  };

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-ocean py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -left-40 top-0 h-130 w-130 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(212,133,0,0.45) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-130 w-130 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(175,76,15,0.55) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
        <motion.div {...fadeUp()} className="mb-14 text-center">
          <p className="mb-5 inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
            <span className="h-px w-10 bg-teal" />
            Concierge Inquiry
            <span className="h-px w-10 bg-teal" />
          </p>
          <h2 className="font-serif text-4xl leading-tight text-ivory sm:text-5xl lg:text-[56px]">
            Tell us how we can{" "}
            <span className="italic text-teal">be of service</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/65">
            Share your travel details and our reservations team will craft a
            personalised itinerary — reply within one business day.
          </p>
        </motion.div>

        <motion.form
          {...fadeUp(0.1)}
          onSubmit={submit}
          className="border border-ivory/10 bg-ocean/40 p-7 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] sm:p-10 lg:p-12"
        >
          <div className="grid gap-5 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FloatingInput
                label="Full Name"
                name="name"
                value={data.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <FloatingInput
                label="Email Address"
                name="email"
                type="email"
                value={data.email}
                onChange={onChange}
                required
                icon={Mail}
              />
            </div>
            <div className="sm:col-span-3">
              <FloatingInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={onChange}
                icon={Phone}
              />
            </div>
            <div className="sm:col-span-3">
              <FloatingSelect
                label="Country"
                name="country"
                value={data.country}
                onChange={onChange}
                options={COUNTRIES}
                icon={Globe}
              />
            </div>
            <div className="sm:col-span-2">
              <FloatingInput
                label="Arrival Date"
                name="arrival"
                type="date"
                value={data.arrival}
                onChange={onChange}
                icon={Calendar}
              />
            </div>
            <div className="sm:col-span-2">
              <FloatingInput
                label="Departure Date"
                name="departure"
                type="date"
                value={data.departure}
                onChange={onChange}
                icon={Calendar}
              />
            </div>
            <div className="sm:col-span-2">
              <FloatingSelect
                label="Guests"
                name="guests"
                value={data.guests}
                onChange={onChange}
                options={GUEST_OPTIONS}
                icon={Users}
              />
            </div>
            <div className="sm:col-span-6">
              <FloatingSelect
                label="Inquiry Type"
                name="inquiry"
                value={data.inquiry}
                onChange={onChange}
                options={INQUIRY_TYPES}
                required
              />
            </div>
            <div className="sm:col-span-6">
              <FloatingInput
                label="Message"
                name="message"
                value={data.message}
                onChange={onChange}
                required
                textarea
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-[1.7] text-ivory/65 sm:col-span-6">
              <input
                type="checkbox"
                name="consent"
                checked={data.consent}
                onChange={onChange}
                className="mt-0.5 h-4 w-4 accent-teal"
              />
              <span>
                Yes — I allow {brand.displayName} to contact me regarding this
                inquiry and to send occasional updates about stays, events, and
                experiences. You may unsubscribe at any time.
              </span>
            </label>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-3 bg-teal px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ocean transition-all hover:bg-[#006d6d] hover:text-ivory hover:shadow-[0_20px_60px_-15px_rgba(212,133,0,0.7)] disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sendingâ€¦
                </>
              ) : status === "success" ? (
                <>
                  <Check className="h-4 w-4" />
                  Inquiry Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Inquiry
                </>
              )}
            </button>
            <a
              href={`tel:${(brand.phone || "").replace(/\s/g, "")}`}
              className="group inline-flex items-center gap-3 border border-ivory/30 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory transition-all hover:border-teal hover:text-teal"
            >
              <Phone className="h-4 w-4" />
              Speak With Concierge
            </a>
          </div>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex items-center gap-3 border border-teal/40 bg-teal/10 px-5 py-4 text-[13px] text-teal"
              >
                <Sparkles className="h-4 w-4" />
                Thank you — a concierge will be in touch within one business
                day.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  LOCATION — premium map experience                                  */
/* ================================================================== */
function LocationBand() {
  const loc = LOCATIONS[0];
  return (
    <section className="relative bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div {...fadeUp()} className="mb-14 max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#006d6d]">
            <span className="h-px w-10 bg-teal" />
            Our Location
          </p>
          <h2 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Steps from{" "}
            <span className="italic text-teal">Samal Island</span>.
          </h2>
        </motion.div>

        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Map */}
          <motion.div
            {...fadeUp()}
            className="relative overflow-hidden border border-charcoal/10 bg-ocean shadow-[0_30px_80px_-30px_rgba(90,35,14,0.35)] lg:col-span-8"
          >
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
              <iframe
                title={`${loc.name} map`}
                src={loc.mapEmbed}
                loading="lazy"
                className="absolute inset-0 h-full w-full"
                style={{ filter: "grayscale(0.25) contrast(1.05)" }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-teal/20" />
            </div>

            {/* Floating address card */}
            <div className="absolute bottom-6 left-6 right-6 max-w-md border border-ivory/20 bg-ocean/85 p-6 backdrop-blur-xl lg:bottom-8 lg:left-8">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-none text-teal" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-teal">
                    {loc.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/85">
                    {loc.addressLines.join(", ")}
                  </p>
                  <a
                    href={loc.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-teal transition hover:text-ivory"
                  >
                    Open in Maps
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nearby highlights */}
          <motion.div
            {...fadeUp(0.15)}
            className="flex flex-col justify-center lg:col-span-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#006d6d]">
              Nearby Highlights
            </p>
            <h3 className="mt-3 font-serif text-2xl text-charcoal lg:text-3xl">
              {loc.name}
            </h3>

            <ul className="mt-7 space-y-5 border-t border-charcoal/15 pt-7">
              {loc.landmarks.map((lm, i) => (
                <motion.li
                  key={lm}
                  {...fadeUp(0.05 * i)}
                  className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/80"
                >
                  <span className="mt-1.5 inline-flex h-6 w-6 flex-none items-center justify-center border border-teal/40 bg-teal/10 text-[10px] font-semibold text-[#006d6d]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-0.5">{lm}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-1 gap-2 border-t border-charcoal/15 pt-7">
              <a
                href={`tel:${(brand.phone || "").replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-charcoal transition hover:text-teal"
              >
                <Phone className="h-4 w-4 text-teal" />
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 text-sm text-charcoal transition hover:text-teal"
              >
                <Mail className="h-4 w-4 text-teal" />
                {brand.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONCIERGE EXPERIENCE                                               */
/* ================================================================== */
function ConciergeBand() {
  return (
    <section className="relative overflow-hidden bg-ocean py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <motion.div
          {...fadeIn()}
          className="relative aspect-4/5 overflow-hidden lg:col-span-6"
        >
          <img
            src={CONCIERGE_IMAGE}
            alt="Discovery Samal concierge"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-2000 ease-out hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-ocean/55 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 border border-teal/60 bg-ocean/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory backdrop-blur-md">
            <Clock className="h-3 w-3 text-teal" />
            24/7 Service
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="flex flex-col justify-center lg:col-span-6"
        >
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
            <span className="h-px w-10 bg-teal" />
            {CONCIERGE.preTitle}
          </p>
          <h2 className="font-serif text-4xl leading-tight text-ivory sm:text-5xl lg:text-[52px]">
            {CONCIERGE.title}
            <br />
            <span className="italic text-teal">
              {CONCIERGE.titleAccent}
            </span>
            .
          </h2>
          <p className="mt-7 text-base leading-relaxed text-ivory/75">
            {CONCIERGE.body}
          </p>

          <ul className="mt-9 space-y-4">
            {CONCIERGE.bullets.map((b, i) => (
              <motion.li
                key={b}
                {...fadeUp(0.05 * i)}
                className="flex items-start gap-3 text-ivory/85"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-none bg-teal" />
                <span className="text-sm leading-relaxed">{b}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-3 border border-teal/50 bg-teal/10 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-teal transition hover:bg-teal hover:text-ocean"
            >
              <MessageCircle className="h-4 w-4" />
              Request the Concierge
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FAQ                                                                */
/* ================================================================== */
function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-charcoal/15">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left lg:py-7"
      >
        <span className="font-serif text-lg text-charcoal transition-colors group-hover:text-teal lg:text-xl">
          {q}
        </span>
        <span
          className={`flex h-9 w-9 flex-none items-center justify-center border transition-all ${
            isOpen
              ? "rotate-180 border-teal bg-teal/10 text-teal"
              : "border-charcoal/30 text-charcoal"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-12 text-[14.5px] leading-relaxed text-charcoal/75">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <motion.div {...fadeUp()} className="text-center">
          <p className="mb-5 inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#006d6d]">
            <span className="h-px w-10 bg-teal" />
            Quick Concierge Help
            <span className="h-px w-10 bg-teal" />
          </p>
          <h2 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl lg:text-[52px]">
            Answers,{" "}
            <span className="italic text-teal">before you ask</span>.
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="mt-12 border border-charcoal/10 bg-white/60 px-6 backdrop-blur-md sm:px-10"
        >
          {FAQ.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SOCIAL — immersive preview grid                                    */
/* ================================================================== */
function Social() {
  return (
    <section className="relative overflow-hidden bg-ocean py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div {...fadeUp()} className="mb-14 text-center">
          <p className="mb-5 inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-teal">
            <span className="h-px w-10 bg-teal" />
            Stay Connected
            <span className="h-px w-10 bg-teal" />
          </p>
          <h2 className="font-serif text-4xl leading-tight text-ivory sm:text-5xl lg:text-[52px]">
            Experience Samal Island{" "}
            <span className="italic text-teal">through our guests</span>.
          </h2>
        </motion.div>

        {/* Preview grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {SOCIAL_PREVIEW_IMAGES.map((src, i) => (
            <motion.a
              key={src}
              href={SOCIAL[0]?.href}
              target="_blank"
              rel="noreferrer"
              {...fadeUp(i * 0.05)}
              className="group relative aspect-square overflow-hidden border border-ivory/10"
            >
              <img
                src={src}
                alt="Guest moment at Discovery Samal"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1600 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ocean/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ArrowUpRight className="h-6 w-6 text-ivory" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SOCIAL.map((s, i) => {
            const Icon = MessageCircle;
            return (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                {...fadeUp(0.1 + i * 0.08)}
                className="group flex items-center justify-between gap-4 border border-ivory/10 bg-ocean/40 px-6 py-5 backdrop-blur-md transition hover:border-teal/60 hover:bg-ocean/70"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center border border-teal/40 bg-teal/10 transition-colors group-hover:bg-teal group-hover:text-ocean">
                    <Icon className="h-5 w-5 text-teal transition-colors group-hover:text-ocean" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal">
                      Follow us on
                    </p>
                    <p className="mt-1 font-serif text-xl text-ivory">
                      {s.name}{" "}
                      <span className="text-sm text-ivory/55">
                        {s.handle}
                      </span>
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ivory/55 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
              </motion.a>
            );
          })}
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
    <section className="relative overflow-hidden">
      <img
        src={CONTACT_HERO_IMAGE}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-[2px]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ocean/85 via-ocean/75 to-ocean/95" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center lg:px-12 lg:py-44">
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
          Your luxury escape{" "}
          <span className="italic text-teal">starts here</span>.
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ivory/75"
        >
          Whether you are planning a quiet retreat, a milestone celebration, or
          a corporate gathering — our team is one message away.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/booking"
            className="group inline-flex items-center gap-3 bg-teal px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ocean transition hover:bg-[#006d6d] hover:text-ivory hover:shadow-[0_20px_60px_-15px_rgba(212,133,0,0.7)]"
          >
            Reserve Your Escape
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 border border-ivory/30 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory transition hover:border-teal hover:text-teal"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STICKY MOBILE RESERVE CTA                                          */
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
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-charcoal/15 bg-ocean/95 px-3 py-3 backdrop-blur-xl lg:hidden"
        >
          <a
            href={`tel:${(brand.phone || "").replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-2 border border-ivory/25 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory transition hover:border-teal hover:text-teal"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
          <Link
            to="/booking"
            className="flex items-center justify-center gap-2 bg-teal px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean transition hover:bg-[#006d6d] hover:text-ivory"
          >
            Reserve
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function Contact() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = "Contact Discovery Samal Resort · Luxury Island Resort";
    return () => {
      document.title = prev;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-ivory text-charcoal">
      <Hero />
      <Welcome />
      <ChannelCards />
      <ContactForm />
      <LocationBand />
      <ConciergeBand />
      <Faq />
      <Social />
      <FinalCTA />

      <StickyMobileCTA visible={showSticky} />
    </main>
  );
}
