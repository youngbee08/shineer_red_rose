import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {  HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import navitems from "../../lib/navitems";
import { BiMenu } from "react-icons/bi";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="">
      <motion.div
        className="border-b border-secondary-dark/60 bg-white"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <nav className="app-container flex items-center gap-4 lg:h-16 h-20 py-2">
          <div className="flex items-center gap-3 lg:gap-4">
            <Link to="/" className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold text-tetiary lg:text-lg">
                RedRose by Olaw
              </span>
              <span className="text-xs text-neutral-soft">
                Affiliate business owner of Affluence Global
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center gap-10">
            {navitems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={[
                    "relative text-xs font-medium transition",
                    active
                      ? "text-primary"
                      : "text-neutral-dark hover:text-primary",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex justify-end">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="tel:+13175313547"
                className="hidden lg:inline-flex py-2 items-center justify-center rounded-[1.75rem] bg-primary px-8 text-base font-semibold text-white transition hover:brightness-110"
              >
                Call to Order
              </Link>
            </motion.div>
          </div>

          <div className="lg:hidden ml-auto w-10" aria-hidden="true" />
          <motion.button
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-3xl transition hover:bg-black/5 lg:hidden"
            aria-label="Open menu"
            whileTap={{ scale: 0.95 }}
          >
            <BiMenu className="text-2xl text-primary" />
          </motion.button>
        </nav>
      </motion.div>

      {/* Mobile menu - slides down from top */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            <motion.div
              className="absolute top-0 left-0 right-0 bg-white shadow-xl"
              initial={{ y: "-100%", opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1], // nice overshoot feel
              }}
            >
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-secondary-dark/60">
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-lg font-bold text-tetiary">
                    RedRose by Olaw
                  </span>
                  <span className="text-xs text-neutral-soft">
                    Affiliate business owner of Affluence Global
                  </span>
                </div>

                <motion.button
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-3xl transition hover:bg-black/5"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.95 }}
                >
                  <HiX className="text-2xl text-tetiary" />
                </motion.button>
              </div>

              {/* Nav items */}
              <div className="px-5 py-6 flex flex-col gap-2">
                {navitems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={[
                        "rounded-3xl px-5 py-3.5 text-base font-medium transition",
                        active
                          ? "bg-black/5 text-tetiary"
                          : "text-neutral-dark hover:bg-black/5",
                      ].join(" ")}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto p-5 border-t border-secondary-dark/60">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-3xl bg-primary px-5 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Call to Order
                </Link>

                <a
                  href="https://wa.me/13175313547?text=Hi%20there,%20I'd%20like%20to%20learn%20more."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full rounded-3xl bg-black/5 px-5 py-3.5 text-center text-sm font-semibold text-tetiary transition hover:bg-black/10"
                >
                  Message Us
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
