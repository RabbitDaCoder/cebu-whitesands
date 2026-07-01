import { useState, useEffect } from "react";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Tag,
  ExternalLink,
  Bell,
  Search,
  Shield,
  Loader2,
  Share2,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { brand } from "../lib/brand";

/* Samal Island admin palette
   cream    #f7f7f5
   ivory    #f7f7f5  (page bg)
   brown    #111111  (sidebar)
   espresso #111111  (sidebar deep)
   orange   #008c8c  (accent)
   orangeD  #006d6d                                                    */

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { to: "/owner", label: "Dashboard", icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/owner/bookings", label: "Bookings", icon: CalendarDays },
      { to: "/owner/payments", label: "Payments", icon: CreditCard },
      { to: "/owner/rooms", label: "Rooms", icon: BedDouble },
      { to: "/owner/discounts", label: "Discounts", icon: Tag },
    ],
  },
  {
    label: "Configuration",
    items: [
      { to: "/owner/settings", label: "Settings", icon: Settings },
      { to: "/owner/social", label: "Social & Contact", icon: Share2 },
    ],
  },
];

const ALL_LINKS = NAV_GROUPS.flatMap((g) => g.items);

export default function AdminLayout() {
  const { admin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-ocean/15 rounded-full" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-teal rounded-full animate-spin" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-ocean/55">
            Loading concierge suite
          </p>
        </div>
      </div>
    );
  }

  if (!admin) {
    navigate("/owner/login", { replace: true });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/owner/login", { replace: true });
  };

  const currentPage =
    ALL_LINKS.find((l) =>
      l.end ? pathname === l.to : pathname.startsWith(l.to),
    )?.label || "Admin";

  const initials = (admin?.name || admin?.email || "A")
    .split(/[\s@.]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  const SidebarContent = ({ isCollapsed }) => (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div
        className={`h-[72px] flex items-center border-b border-ivory/8 ${
          isCollapsed ? "justify-center px-2" : "px-6"
        }`}
      >
        <Link
          to="/owner"
          className={`flex items-center gap-3 ${isCollapsed ? "" : "flex-1"}`}
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-ocean font-serif font-bold text-sm shadow-[0_8px_24px_-8px_rgba(11,122,138,0.6)]">
            {brand.initials}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="font-serif text-[15px] text-ivory leading-none truncate">
                {brand.shortName}
              </p>
              <p className="text-[9px] text-teal uppercase tracking-[0.32em] mt-1.5 font-semibold">
                Concierge Suite
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label} className={gi > 0 ? "mt-6" : ""}>
            {!isCollapsed && (
              <p className="text-[9px] text-ivory/30 uppercase tracking-[0.3em] font-semibold px-3 mb-3">
                {group.label}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    title={isCollapsed ? label : undefined}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium transition-all ${
                        isCollapsed ? "justify-center" : ""
                      } ${
                        isActive
                          ? "text-ocean bg-teal"
                          : "text-ivory/65 hover:text-ivory hover:bg-ivory/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="sidebar-active-pill"
                            className="absolute inset-0 bg-teal -z-0"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}
                        <Icon
                          className={`relative z-10 w-[17px] h-[17px] flex-none ${
                            isActive ? "text-ocean" : ""
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="relative z-10 truncate">
                            {label}
                          </span>
                        )}
                        {!isCollapsed && isActive && (
                          <ChevronRight className="relative z-10 ml-auto w-3.5 h-3.5" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / user card */}
      <div className="border-t border-ivory/8 p-3">
        {!isCollapsed ? (
          <div className="border border-ivory/8 bg-ivory/[0.03] p-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-teal/30 to-teal-dark/30 border border-teal/30 flex items-center justify-center text-teal text-xs font-semibold">
                {initials || "A"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-ivory truncate font-medium">
                  {admin?.name || "Administrator"}
                </p>
                <p className="text-[10px] text-ivory/45 truncate">
                  {admin?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLogoutConfirm(true)}
              className="mt-3 flex items-center justify-center gap-2 w-full border border-ivory/10 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-ivory/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setLogoutConfirm(true)}
            title="Sign out"
            className="flex items-center justify-center w-full p-3 text-ivory/55 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-ivory">
      {/* ─── Desktop sidebar ─── */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        className="hidden lg:flex relative shrink-0 bg-ocean text-ivory border-r border-ivory/5"
      >
        <SidebarContent isCollapsed={collapsed} />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="absolute top-20 -right-3 z-30 w-6 h-6 bg-ocean border border-ivory/15 text-ivory/70 hover:text-teal hover:border-teal/60 flex items-center justify-center transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="w-3 h-3" />
          ) : (
            <ChevronsLeft className="w-3 h-3" />
          )}
        </button>
      </motion.aside>

      {/* ─── Mobile drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-ocean/65 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-ocean text-ivory lg:hidden flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute top-5 right-4 z-10 text-ivory/55 hover:text-teal transition-colors"
              >
                <X size={18} />
              </button>
              <SidebarContent isCollapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main column ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-[72px] bg-white/85 backdrop-blur-xl border-b border-ocean/10 px-5 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center border border-ocean/15 text-ocean/70 hover:text-teal hover:border-teal/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ocean/45">
                <span>Admin</span>
                <ChevronRight size={10} />
                <span className="text-teal-dark font-semibold truncate">
                  {currentPage}
                </span>
              </div>
              <h1 className="font-serif text-xl lg:text-[22px] text-ocean leading-tight mt-1 truncate">
                {currentPage}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search (lg+) */}
            <div className="hidden xl:flex items-center gap-2 border border-ocean/15 bg-ivory/40 px-3 py-2 w-72">
              <Search className="w-3.5 h-3.5 text-ocean/45" />
              <input
                placeholder="Quick search…"
                className="bg-transparent text-sm text-ocean placeholder-ocean/35 outline-none flex-1"
              />
              <span className="text-[9px] uppercase tracking-[0.22em] text-ocean/35 border border-ocean/15 px-1.5 py-0.5">
                ⌘K
              </span>
            </div>

            {/* Notification */}
            <button
              className="relative w-9 h-9 flex items-center justify-center border border-ocean/15 text-ocean/70 hover:text-teal hover:border-teal/50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-teal rounded-full" />
            </button>

            {/* View site */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-ocean/55 hover:text-teal transition-colors border border-ocean/15 hover:border-teal/50 px-3 py-2"
            >
              View Site
              <ExternalLink size={11} />
            </Link>

            {/* Avatar */}
            <div className="hidden sm:flex items-center gap-2.5 border border-ocean/15 px-2.5 py-1.5">
              <div className="w-7 h-7 bg-gradient-to-br from-teal to-teal-dark text-ocean flex items-center justify-center text-[10px] font-semibold">
                {initials || "A"}
              </div>
              <div className="hidden md:block leading-tight pr-2">
                <p className="text-[11px] text-ocean font-medium truncate max-w-[120px]">
                  {admin?.name || "Admin"}
                </p>
                <p className="text-[9px] text-ocean/45 uppercase tracking-[0.2em]">
                  Signed in
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-5 lg:p-10 overflow-y-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Logout confirm modal */}
      <AnimatePresence>
        {logoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ocean/65 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLogoutConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white border border-ocean/10 p-7 shadow-[0_30px_80px_-30px_rgba(17,17,17,0.5)]"
            >
              <div className="w-12 h-12 bg-red-50 border border-red-200 flex items-center justify-center mb-5">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-serif text-xl text-ocean">
                Sign out of admin?
              </h3>
              <p className="text-sm text-ocean/60 mt-2 leading-relaxed">
                You'll need to sign in again to manage reservations, rooms, and
                payments.
              </p>
              <div className="mt-7 flex items-center justify-end gap-2">
                <button
                  onClick={() => setLogoutConfirm(false)}
                  className="px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-ocean/65 hover:text-ocean border border-ocean/15 hover:border-ocean/35 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] bg-ocean text-ivory hover:bg-ocean transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
