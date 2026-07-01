import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { brand } from "../../lib/brand";
import NavDropdown from "./NavDropdown";
import MobileSidebar from "./MobileSidebar";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "Discover",
    dropdown: [
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
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimerRef = useRef(null);
  const isHome = pathname === "/";

  // Transparent only on the homepage hero
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const openDropdown = (to) => {
    clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(to);
  };
  const closeDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 130);
  };

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: isTransparent
            ? "rgba(255,255,255,0)"
            : "rgba(255,255,255,0.97)",
          backdropFilter: isTransparent ? "blur(0px)" : "blur(24px)",
          boxShadow: isTransparent
            ? "0 0 0 0 rgba(0,0,0,0)"
            : "0 4px 32px -8px rgba(13,51,71,0.14), 0 1px 0 rgba(13,51,71,0.06)",
        }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav className="mx-auto flex h-19 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link to="/" className="shrink-0 relative z-10">
            <motion.img
              key={isTransparent ? "white" : "color"}
              src={isTransparent ? brand.logoWhiteUrl : brand.logoUrl}
              alt={brand.displayName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="h-10 w-auto object-contain sm:h-11"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => {
              const isActive =
                pathname === item.to ||
                item.dropdown?.some((d) => pathname === d.to);
              const hasDropdown = !!item.dropdown;

              return (
                <li
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => hasDropdown && openDropdown(item.to)}
                  onMouseLeave={() => hasDropdown && closeDropdown()}
                >
                  <Link
                    to={item.to}
                    className={`group relative inline-flex items-center gap-1 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isTransparent
                        ? isActive
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : isActive
                          ? "text-teal"
                          : "text-slate-500 hover:text-teal"
                    }`}
                  >
                    {item.label}
                    {hasDropdown && (
                      <motion.div
                        animate={{
                          rotate: activeDropdown === item.to ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={11} className="opacity-60" />
                      </motion.div>
                    )}
                    {/* Active underline */}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 ${
                        isActive ? "w-5" : "w-0 group-hover:w-5"
                      }`}
                    />
                  </Link>

                  {hasDropdown && (
                    <NavDropdown
                      items={item.dropdown}
                      isOpen={activeDropdown === item.to}
                      onMouseEnter={() => openDropdown(item.to)}
                      onMouseLeave={closeDropdown}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Book Now CTA - desktop only */}
            <Link to="/booking" className="hidden lg:block">
              <motion.div
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 12px 32px -4px rgba(184,148,60,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center rounded-full bg-gold px-6 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_6px_20px_-4px_rgba(184,148,60,0.3)] transition-colors duration-300 hover:bg-gold-dark"
              >
                Book Now
              </motion.div>
            </Link>

            {/* Hamburger - mobile only */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className={`rounded-full p-2 transition-colors lg:hidden ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </nav>

        {/* Bottom accent line when scrolled */}
        <motion.div
          animate={{ opacity: isTransparent ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent"
        />
      </motion.header>

      {/* Mobile / Full-menu Sidebar */}
      <MobileSidebar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
