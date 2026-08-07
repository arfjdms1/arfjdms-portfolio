import { useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 1 }
    );

    const current = sentinelRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 h-0 w-full pointer-events-none" />
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-black font-extrabold font-mono text-sm group-hover:scale-105 transition-transform shadow-lg shadow-orange-500/10">
                a
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                arfjdms
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-orange-400 bg-orange-500/10"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`
                  }
                  end={item.href === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href="https://github.com/arfjdms1"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium border border-orange-500/20 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-200"
              >
                GitHub
              </a>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 -mr-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
            >
              <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-orange-400 bg-orange-500/10"
                          : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                      }`
                    }
                    end={item.href === "/"}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a
                  href="https://github.com/arfjdms1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-orange-400 border border-orange-500/20 bg-orange-500/5"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
