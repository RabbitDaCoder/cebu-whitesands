import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, ArrowUp } from "lucide-react";
import { brand } from "../../lib/brand";
import { useRooms } from "../../hooks/useRooms";

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const EXPLORE_COLUMN = {
  title: "Explore",
  links: [
    { to: "/", label: "Home" },
    { to: "/about", label: "Discover" },
    { to: "/amenities", label: "Amenities" },
    { to: "/offers", label: "Offers" },
    { to: "/restaurants", label: "Dining" },
    { to: "/events", label: "Meetings & Events" },
    { to: "/contact", label: "Contact" },
  ],
};

export default function Footer({ social = {} }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: roomsData = [] } = useRooms({ available: true });
  const roomsColumn = {
    title: "Villas & Suites",
    links: (roomsData || [])
      .filter((r) => r.slug)
      .slice(0, 6)
      .map((r) => ({ to: `/rooms/${r.slug}`, label: r.name })),
  };
  const NAV_COLUMNS = [
    EXPLORE_COLUMN,
    ...(roomsColumn.links.length ? [roomsColumn] : []),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const phone = social.phone || brand.phone;
  const contactEmail = social.email || brand.email;
  const facebookUrl = social.facebookUrl || brand.facebookPageUrl;

  return (
    <footer className="relative overflow-hidden bg-ocean text-white">
      {/* Decorative teal glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-130 w-130 rounded-full bg-gold/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -top-20 h-110 w-110 rounded-full bg-teal/[0.05] blur-3xl" />

      {/* Top teal hairline */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-24 lg:px-10 lg:pb-14 lg:pt-28">
        {/* Brand + newsletter */}
        <div className="grid grid-cols-1 gap-14 border-b border-white/[0.07] pb-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex">
              <img
                src={brand.logoWhiteUrl || brand.logoUrl}
                alt={brand.displayName}
                className="h-16 w-auto object-contain brightness-0 invert sm:h-20"
              />
            </Link>
            <p className="mt-7 max-w-md text-[14px] leading-[1.95] text-white/50">
              A boutique beachfront retreat on Samal Island — where pristine
              shores, warm sea breezes, and genuine Filipino hospitality create
              your perfect island escape in Davao del Norte.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <p className="text-[10px] uppercase tracking-[0.42em] text-gold/70">
                {brand.tagline}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <h6 className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/35">
              Stay in the know
            </h6>
            <h3 className="mt-4 font-serif text-3xl leading-[1.15] sm:text-4xl">
              Letters from the{" "}
              <em className="italic text-gold">shoreline</em>.
            </h3>
            <p className="mt-4 max-w-md text-[14px] leading-[1.85] text-white/45">
              Quiet stories, seasonal offers, and member-only invitations —
              delivered a few times a year. No noise.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex max-w-lg items-end gap-4 border-b border-white/15 pb-2 transition-colors focus-within:border-gold"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent py-2 text-[14px] text-white placeholder:text-white/25 focus:outline-none"
              />
              <button
                type="submit"
                className="group flex items-center gap-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold transition-colors hover:text-white"
              >
                {submitted ? "Thank you" : "Subscribe"}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Nav columns + contact */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-3 lg:gap-14">
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <h6 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.42em] text-gold">
                {col.title}
              </h6>
              <ul className="space-y-3.5 text-[13px]">
                {col.links.map((l) => (
                  <li key={`${col.title}-${l.label}`}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center text-white/50 transition-colors hover:text-white"
                    >
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h6 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.42em] text-gold">
              Reach Us
            </h6>
            <ul className="space-y-5 text-[13px] text-white/50">
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-gold/70"
                />
                <span className="leading-relaxed">{brand.address}</span>
              </li>
              {phone && (
                <li className="flex items-center gap-3">
                  <Phone size={14} className="shrink-0 text-gold/70" />
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-gold/70" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {contactEmail}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-3">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-white/[0.12] text-white/45 transition-all duration-300 hover:border-gold hover:text-gold"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-[14px] w-[14px]" />
                </a>
              )}
              {brand.instagramUrl && (
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-white/[0.12] text-white/45 transition-all duration-300 hover:border-gold hover:text-gold"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-[14px] w-[14px]" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-10 sm:flex-row">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/25">
            © {new Date().getFullYear()} {brand.displayName} · All rights
            reserved
          </p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] text-white/25">
            <Link to="/about" className="transition-colors hover:text-white/60">
              Privacy
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <Link
              to="/contact"
              className="transition-colors hover:text-white/60"
            >
              Contact
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 transition-colors hover:text-gold"
              aria-label="Back to top"
            >
              <ArrowUp
                size={12}
                className="transition-transform group-hover:-translate-y-0.5"
              />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
