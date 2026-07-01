import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function NavDropdown({
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-full -translate-x-1/2 pt-5 z-50"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* arrow */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 w-3 h-3 rotate-45 bg-white/90 border-l border-t border-white/20 shadow-sm" />

          <div className="relative min-w-60 rounded-2xl overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_24px_60px_-12px_rgba(0,140,140,0.18),0_4px_20px_rgba(0,0,0,0.08)] py-3">
            {items.map((sub, i) => (
              <motion.div
                key={sub.to}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
              >
                <Link
                  to={sub.to}
                  className="group flex items-center gap-3 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 hover:text-teal hover:bg-teal-50/60 transition-all duration-200"
                >
                  <span className="h-px w-0 bg-teal transition-all duration-300 group-hover:w-4" />
                  {sub.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
