import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="">
      <section className="mt-5 border-t border-secondary-dark/60 bg-white">
        <div className="app-container py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-neutral-soft">
              © {year} RedRose by shineer. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/orente_orencious"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl border border-secondary-dark/70 flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <FaInstagram className="text-sm" />
              </a>

              <a
                href="https://www.facebook.com/share/17gcwcgYCE/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl border border-secondary-dark/70 flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <FaFacebookF className="text-sm" />
              </a>

              <a
                href="https://www.tiktok.com/@orencious"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl border border-secondary-dark/70 flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <FaTiktok className="text-sm" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
            <a
              href="https://zenithdevtech.name.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tetiary transition"
            >
              Built by Zenith Dev™
            </a>

            <Link to="/contact" className="hover:text-tetiary transition">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
