import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import navitems from "../../lib/navitems";
import { BiMenu } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [prevPath, setPrevPath] = useState(location.pathname);

  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/85 backdrop-blur-md shadow-md shadow-primary/5 py-1' : 'bg-white py-2'}`}>
      <motion.div
        className="w-full"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <nav className="app-container flex items-center justify-between lg:h-16 h-20">
          
          {/* LOGO AREA */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Link to="/" className="flex flex-col leading-tight group">
              <span className="font-display text-lg font-extrabold lg:text-xl tracking-tight text-neutral-dark group-hover:text-primary transition-colors">
                Red<span className="text-primary">Rose</span> by shineer
              </span>
              <span className="text-[10px] md:text-xs text-neutral-soft font-medium mt-0.5">
                Affiliate business owner of Affluence Global
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-2">
            {navitems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                    active
                      ? " text-primary"
                      : "text-neutral-soft hover:text-neutral-dark"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTION */}
          <div className="hidden lg:flex justify-end ml-4">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="tel:+13175313547"
                className="flex items-center gap-2 rounded-xl shadow-lg shadow-primary/20 bg-primary px-7 py-3 text-sm font-bold text-white transition-all hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90"
              >
                <FaPhoneAlt className="text-xs" />
                Call to Order
              </Link>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button
            onClick={() => setOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 transition hover:bg-primary/10 lg:hidden"
            aria-label="Open menu"
            whileTap={{ scale: 0.9 }}
          >
            <BiMenu className="text-3xl text-primary" />
          </motion.button>
        </nav>
      </motion.div>

      {/* MOBILE MENU FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-100 lg:hidden bg-black/40 backdrop-blur-sm shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            <motion.div
              className="absolute top-0 left-0 right-0 bg-white rounded-b-xl overflow-hidden shadow-2xl shadow-primary/10"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.4,
                ease: [0.25, 1, 0.3, 1],
              }}
            >
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between px-6 py-5 bg-neutral-50 border-b border-primary/5">
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-xl font-extrabold text-neutral-dark tracking-tight">
                     Red<span className="text-primary">Rose</span>
                  </span>
                  <span className="text-[10px] text-neutral-soft font-medium mt-1">
                    Affiliate business owner of Affluence Global
                  </span>
                </div>

                <motion.button
                  onClick={() => setOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 hover:bg-black/10 transition"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                >
                  <HiX className="text-2xl text-neutral-dark" />
                </motion.button>
              </div>

              {/* Nav items */}
              <div className="px-6 py-8 flex flex-col gap-3">
                {navitems.map((item, i) => {
                  const active = location.pathname === item.path;
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      key={item.name}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`block rounded-xl px-6 py-4 text-base font-bold transition-all ${
                          active
                            ? "bg-primary/10 text-primary border border-primary/10"
                            : "bg-neutral-50 text-neutral-dark "
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Actions */}
              <div className="p-6 bg-neutral-50 flex flex-col gap-3 border-t border-primary/5">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90"
                >
                  <FaPhoneAlt size={14} />
                  Call to Order
                </Link>

                <a
                  href="https://wa.me/13175313547?text=Hi%20there,%20I'd%20like%20to%20learn%20more."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-white border border-neutral-200 px-6 py-4 text-center text-base font-bold text-neutral-dark transition hover:bg-neutral-50 shadow-sm"
                >
                  Message Us on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
