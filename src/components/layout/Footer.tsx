import Link from "next/link";
import { COMPANY_INFO } from "@/lib/design-tokens";
import { buildShopUrl } from "@/lib/shop-filters";
import { SERVICE_NAV_ITEMS } from "@/lib/navigation-config";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const FOOTER_INNER =
  "mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16";

const FOOTER_LINK_HOVER =
  "text-sm text-white/85 hover:text-[#8AC926] transition-colors break-words";

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com/tamtechtools",
    label: "Facebook",
    hover: "hover:bg-[#1877F2]",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    href: "https://instagram.com/tamtechtools",
    label: "Instagram",
    hover: "hover:bg-[#E4405F]",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    href: "https://tiktok.com/@tamtechtools",
    label: "TikTok",
    hover: "hover:bg-black",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  },
  {
    href: "https://x.com/tamtechtools",
    label: "X",
    hover: "hover:bg-black",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export default function Footer() {
  return (
    <footer className="w-full overflow-x-hidden -mt-1">
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0B7A94] via-[#0D98BA] to-[#0B8AA8] text-white">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#8AC926]/15 blur-3xl" />
        </div>

        <div className={`relative ${FOOTER_INNER} pt-10 pb-12 lg:pt-12 lg:pb-14`}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-5 xl:gap-x-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-3 min-w-0 max-w-full flex flex-col items-center text-center lg:items-start lg:text-left">
              <Link
                href="/"
                className="inline-flex w-full max-w-[300px] xl:max-w-[340px] rounded-xl bg-white p-1.5 sm:p-2 shadow-lg mx-auto lg:mx-0"
              >
                <img
                  src="/images/tamtech_logo_svg.svg"
                  alt="TAM TECH TOOLS LIMITED"
                  className="block w-full h-auto max-h-[100px] sm:max-h-[112px] md:max-h-[120px] lg:max-h-[112px] xl:max-h-[128px] object-contain object-center"
                />
              </Link>
              <p className="text-sm text-white/90 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Your one-stop solution for design, supply, and fixing in
                construction and interior design needs across East Africa.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <span className="text-xs text-white/70 uppercase tracking-wider shrink-0">
                  Follow Us
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-white/15 rounded-full ${social.hover} transition-colors border border-white/20 shrink-0`}
                      aria-label={social.label}
                    >
                      <svg
                        className="h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-w-0 max-w-full lg:col-span-2 text-center lg:text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8AC926] drop-shadow-sm">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Shop", href: "/shop" },
                  { label: "Services", href: "/services" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={FOOTER_LINK_HOVER}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 max-w-full lg:col-span-2 text-center lg:text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8AC926] drop-shadow-sm">
                Products
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href={buildShopUrl("EV")} className={FOOTER_LINK_HOVER}>
                    EV Bikes
                  </Link>
                </li>
                <li>
                  <Link
                    href={buildShopUrl("Materials")}
                    className={FOOTER_LINK_HOVER}
                  >
                    Building Materials
                  </Link>
                </li>
                <li>
                  <Link
                    href={buildShopUrl("Tools")}
                    className={FOOTER_LINK_HOVER}
                  >
                    Tools
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-0 max-w-full lg:col-span-2 text-center lg:text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8AC926] drop-shadow-sm">
                Services
              </h3>
              <ul className="mt-4 space-y-2">
                {SERVICE_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`${FOOTER_LINK_HOVER} leading-snug block`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 max-w-full sm:col-span-2 lg:col-span-3 xl:min-w-[220px] text-center lg:text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8AC926] drop-shadow-sm">
                Contact Us
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start justify-center lg:justify-start gap-2.5 group">
                  <MapPin className="h-4 w-4 text-[#8AC926] flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                  <span className="text-sm text-white/85 group-hover:text-[#8AC926] transition-colors leading-snug">
                    {COMPANY_INFO.address.short}
                  </span>
                </li>
                <li className="flex items-start justify-center lg:justify-start gap-2.5 group">
                  <Phone className="h-4 w-4 text-[#8AC926] flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                  <a
                    href={`tel:${COMPANY_INFO.phones.tollFree}`}
                    className="text-sm text-white/85 group-hover:text-[#8AC926] transition-colors leading-snug"
                  >
                    Toll-Free: {COMPANY_INFO.phones.tollFree}
                  </a>
                </li>
                <li className="flex items-start justify-center lg:justify-start gap-2.5 group">
                  <Mail className="h-4 w-4 text-[#8AC926] flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm text-white/85 group-hover:text-[#8AC926] transition-colors leading-snug"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </li>
                <li className="flex items-start justify-center lg:justify-start gap-2.5 group">
                  <Clock className="h-4 w-4 text-[#8AC926] flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                  <span className="text-sm text-white/85 group-hover:text-[#8AC926] transition-colors leading-snug">
                    Mon – Fri: 8AM – 5PM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#111827] text-white border-t border-gray-800">
        <div className={`${FOOTER_INNER} py-8`}>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8AC926] mb-4">
            Find Us on Google Maps
          </h4>
          <div className="grid md:grid-cols-3 gap-6 min-w-0">
            <div className="md:col-span-2 min-w-0 h-40 sm:h-44 md:h-48 lg:h-52 bg-gray-800 rounded-lg overflow-hidden ring-1 ring-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7888042362288!2d36.82750677473798!3d-1.3016282986860082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11006dc0386b%3A0x1b01e819d6015b49!2sTamTech%20Tools%20Limited!5e0!3m2!1sen!2sin!4v1775556634930!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TAM TECH TOOLS Location"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 min-w-0">
              <div className="flex items-start gap-3 group min-w-0">
                <MapPin className="h-5 w-5 text-[#8AC926] flex-shrink-0 mt-0.5 group-hover:text-[#0D98BA] transition-colors" />
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors min-w-0 break-words">
                  <p className="font-medium text-white group-hover:text-[#8AC926] transition-colors">
                    {COMPANY_INFO.name}
                  </p>
                  <p>{COMPANY_INFO.address.street}</p>
                  <p>{COMPANY_INFO.address.landmark}</p>
                  <p>{COMPANY_INFO.address.location}</p>
                </div>
              </div>
              <a
                href={COMPANY_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0D98BA] hover:text-[#8AC926] transition-colors text-sm font-medium"
              >
                Open in Google Maps
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-black border-t border-gray-800">
        <div className={`${FOOTER_INNER} py-5`}>
          <div className="max-w-5xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-500">
              Handcrafted by{" "}
              <a
                href="https://pivotsoftwareconsultants.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8AC926] hover:text-[#0D98BA] font-medium transition-colors"
              >
                PIVOT SOFT
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
