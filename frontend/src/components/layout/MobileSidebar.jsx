import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { X, ChevronDown, MapPin, Phone, Mail } from "lucide-react";

// Inline SVGs for social icons not available in this lucide-react version
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
import { brand } from "../../lib/brand";

const MENU_ITEMS = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "Discover",
    sub: [
      { to: "/about", label: "The Destination" },
      { to: "/about#resort", label: "The Resort" },
      { to: "/about#maps", label: "Resort Maps" },
      { to: "/about#boat-schedule", label: "Boat Schedule" },
      { to: "/activities", label: "Experiences" },
      { to: "/about#blog", label: "Blog" },
      { to: "/gallery", label: "Gallery" },
      { to: "/about#location", label: "Location & Getting Here" },
    ],
  },
  { to: "/rooms", label: "Villas & Suites" },
  { to: "/offers", label: "Offers" },
  { to: "/restaurants", label: "Dining" },
  {
    to: "/events",
    label: "Meetings & Events",
    sub: [
      { to: "/events", label: "Samal Grand Ballroom" },
      { to: "/events#meetings", label: "Meetings" },
      { to: "/events#beach-wedding", label: "Beach Wedding" },
      { to: "/events#destination-weddings", label: "Destination Weddings" },
      { to: "/events#corporate", label: "Corporate Events" },
      { to: "/events#social", label: "Social Events" },
    ],
  },
  { to: "https://www.mydiscovery.ph/", label: "Loyalty", external: true },
  { to: "/contact", label: "Contact Us" },
];

export default function MobileSidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (label) =>
    setExpanded((p) => (p === label ? null : label));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 bg-slate-900"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.div
            key="sidebar-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-70 w-full max-w-105 flex flex-col bg-white shadow-[-24px_0_80px_rgba(0,0,0,0.18)]"
          >
            {/* Header */}
            <div className="flex h-19 shrink-0 items-center justify-between border-b border-slate-100 px-7">
              <Link to="/" onClick={onClose}>
                <img
                  src={brand.logoUrl}
                  alt={brand.displayName}
                  className="h-9 w-auto"
                />
              </Link>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Teal accent line */}
            <div className="h-0.5 w-full bg-linear-to-r from-teal via-teal-300 to-transparent" />

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-7 py-6">
              <ul className="space-y-0">
                {MENU_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.05,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {item.sub ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={`w-full flex items-center justify-between border-b border-slate-100 py-4 text-left font-medium tracking-wide transition-colors ${
                            pathname.startsWith(item.to)
                              ? "text-teal"
                              : "text-slate-700 hover:text-teal"
                          }`}
                        >
                          <span className="text-[18px] font-light">
                            {item.label}
                          </span>
                          <motion.div
                            animate={{
                              rotate: expanded === item.label ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} className="text-slate-400" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              {item.sub.map((sub) => (
                                <li key={sub.to}>
                                  <Link
                                    to={sub.to}
                                    onClick={onClose}
                                    className="flex items-center gap-2.5 py-2.5 pl-3 text-[12px] uppercase tracking-[0.15em] text-slate-400 hover:text-teal transition-colors border-b border-slate-50"
                                  >
                                    <span className="w-4 h-px bg-teal/30" />
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : item.external ? (
                      <a
                        href={item.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="block border-b border-slate-100 py-4 text-[18px] font-light tracking-wide text-slate-700 hover:text-teal transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className={`block border-b border-slate-100 py-4 text-[18px] font-light tracking-wide transition-colors ${
                          pathname === item.to
                            ? "text-teal"
                            : "text-slate-700 hover:text-teal"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Book Now */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.35 }}
                className="mt-8"
              >
                <Link to="/booking" onClick={onClose}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center rounded-2xl bg-teal py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_8px_24px_-4px_rgba(0,140,140,0.4)] hover:bg-teal-dark transition-all duration-300"
                  >
                    Book Now
                  </motion.div>
                </Link>
              </motion.div>
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="shrink-0 border-t border-slate-100 px-7 py-5"
            >
              {/* Social icons */}
              <div className="flex items-center gap-4 mb-4">
                <a
                  href={brand.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-teal hover:text-white transition-all duration-200"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.instagram.com/discoverysamal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-teal hover:text-white transition-all duration-200"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC56wQWVq1prM15Df7dHir-Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-teal hover:text-white transition-all duration-200"
                >
                  <YoutubeIcon />
                </a>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2 text-[11px] text-slate-400">
                  <MapPin
                    size={11}
                    className="mt-0.5 shrink-0 text-teal"
                  />
                  <span>Samal Island, Davao del Norte, Philippines</span>
                </div>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-teal transition-colors"
                >
                  <Phone size={11} className="text-teal" />
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-teal transition-colors"
                >
                  <Mail size={11} className="text-teal" />
                  {brand.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
