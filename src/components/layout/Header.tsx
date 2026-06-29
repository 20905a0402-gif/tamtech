"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  Heart,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { MAIN_NAVIGATION, type NavItem } from "@/lib/navigation-config";

const SEARCH_INPUT_CLASS =
  "w-full rounded-full border-2 border-[#0D98BA]/40 bg-white px-4 py-1.5 lg:py-2.5 pl-10 text-sm lg:text-[15px] text-gray-900 shadow-md shadow-[#0D98BA]/10 placeholder:text-gray-500 focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/25";

function useNavActive() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [pathname]);

  const category = searchParams.get("category");

  const hrefMatches = (href: string): boolean => {
    const [pathAndQuery, hashPart] = href.split("#");
    const [path, queryStr] = pathAndQuery.split("?");
    if (pathname !== path) return false;
    const expectedHash = hashPart ? `#${hashPart}` : "";
    if (expectedHash && hash !== expectedHash) return false;
    if (queryStr) {
      const expected = new URLSearchParams(queryStr);
      for (const [key, value] of expected.entries()) {
        if (searchParams.get(key) !== value) return false;
      }
    }
    return true;
  };

  const isActive = (item: NavItem): boolean => {
    switch (item.label) {
      case "Home":
        return pathname === "/";
      case "Profile":
        return pathname === "/about";
      case "Gallery":
        return pathname === "/gallery";
      case "Contact Us":
        return pathname === "/contact";
      case "Services":
        return pathname.startsWith("/services");
      case "EV Bike":
        return (
          pathname === "/shop" &&
          (category === "EV Bikes" || category === "EV Bike")
        );
      case "Building Materials":
        return pathname === "/shop" && category === "Building Materials";
      case "Tools":
        return pathname === "/shop" && category === "Tools";
      default:
        return false;
    }
  };

  const isDropdownChildActive = (item: NavItem): boolean => {
    if (!item.dropdown) return false;
    return item.dropdown.some((d) => hrefMatches(d.href));
  };

  const navLinkClass = (item: NavItem) => {
    const active = isActive(item) || isDropdownChildActive(item);
    return active
      ? "flex items-center gap-0.5 text-[11px] lg:text-xs xl:text-sm font-semibold text-[#0D98BA] border-b-2 border-[#0D98BA] pb-0.5 transition-colors whitespace-nowrap shrink-0 px-0.5 lg:px-1"
      : "flex items-center gap-0.5 text-[11px] lg:text-xs xl:text-sm font-medium text-gray-700 hover:text-[#0D98BA] transition-colors whitespace-nowrap shrink-0 px-0.5 lg:px-1";
  };

  const mobileLinkClass = (item: NavItem) => {
    const active = isActive(item) || isDropdownChildActive(item);
    return active
      ? "block rounded-lg px-3 py-2.5 text-base font-semibold text-[#0D98BA] bg-[#E6F4F8]"
      : "block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-[#E6F4F8] hover:text-[#0D98BA]";
  };

  const isItemActive = (item: NavItem) =>
    isActive(item) || isDropdownChildActive(item);

  return { navLinkClass, mobileLinkClass, isItemActive };
}

function CartBadge({
  count,
  color,
}: {
  count: number;
  color: "red" | "green";
}) {
  if (count <= 0) return null;
  const bg = color === "red" ? "bg-red-500" : "bg-[#8AC926]";
  return (
    <span
      className={`absolute -top-0.5 -right-0.5 flex h-4 min-w-4 px-0.5 items-center justify-center rounded-full ${bg} text-[9px] font-bold text-white ring-2 ring-white`}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useCartStore((state) => state.getWishlistCount());
  const { navLinkClass, mobileLinkClass, isItemActive } = useNavActive();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1100] w-full bg-white shadow-sm overflow-visible">
      {/* Desktop / tablet header (lg+) */}
      <div className="hidden lg:block border-b border-gray-100 overflow-visible">
        <div className="mx-auto w-full max-w-[2560px] px-3 md:px-5 lg:px-6 xl:px-10">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 lg:gap-4 xl:gap-6 min-h-[100px] py-1 overflow-visible">
            {/* Logo — fixed column, never overlapped */}
            <Link
              href="/"
              className="shrink-0 flex items-center w-[130px] lg:w-[150px] xl:w-[190px] 2xl:w-[210px]"
            >
              <img
                src="/images/tamtech_logo_svg.svg"
                alt="TAM TECH TOOLS LIMITED"
                className="h-[76px] lg:h-[88px] xl:h-[96px] 2xl:h-[100px] w-full object-contain object-left"
              />
            </Link>

            {/* Search + nav — constrained to middle column only */}
            <div className="min-w-0 flex justify-center px-2 lg:px-3 overflow-visible">
              <div className="w-full max-w-full lg:max-w-[min(680px,100%)] xl:max-w-[min(820px,100%)] flex flex-col items-stretch overflow-visible">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tools, materials, EV products..."
                      className={SEARCH_INPUT_CLASS}
                    />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0D98BA]" />
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[#0D98BA] px-3 py-1 text-[11px] xl:px-4 xl:py-1.5 xl:text-xs font-semibold text-white hover:bg-[#0B7A94] transition-colors shadow-sm"
                    >
                      Search
                    </button>
                  </div>
                </form>

                <div className="w-full border-t border-gray-100 mt-1.5 pt-1.5 pb-1 overflow-visible">
                  <nav className="flex justify-center overflow-visible">
                    <div className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 lg:gap-x-4 xl:gap-x-5 2xl:gap-x-6 px-1">
                      {MAIN_NAVIGATION.map((item) => (
                        <div
                          key={item.label}
                          className="relative shrink-0"
                          onMouseEnter={() =>
                            item.dropdown && setOpenDropdown(item.label)
                          }
                          onMouseLeave={() =>
                            item.dropdown && setOpenDropdown(null)
                          }
                        >
                          <Link href={item.href} className={navLinkClass(item)}>
                            {item.label}
                            {item.dropdown && (
                              <ChevronDown
                                className={`h-3 w-3 transition-transform ${openDropdown === item.label ? "rotate-180 text-[#0D98BA]" : ""}`}
                              />
                            )}
                          </Link>

                          {item.dropdown && (
                            <AnimatePresence>
                              {openDropdown === item.label && (
                                <motion.div
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute left-1/2 -translate-x-1/2 top-full z-50 mt-1 min-w-[200px] rounded-xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
                                >
                                  <div className="py-1.5">
                                    {item.dropdown.map((sub) => (
                                      <Link
                                        key={sub.label}
                                        href={sub.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6F4F8] hover:text-[#0D98BA] transition-colors"
                                        onClick={() => setOpenDropdown(null)}
                                      >
                                        {sub.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            {/* Cart & wishlist — fixed column, vertically centered */}
            <div className="shrink-0 flex items-center justify-center w-[64px] xl:w-[72px] gap-0 overflow-visible">
              <Link
                href="/wishlist"
                className="relative flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-[#E6F4F8] hover:text-[#0D98BA] transition-colors overflow-visible"
                aria-label="Wishlist"
              >
                <Heart className="h-6 w-6 xl:h-7 xl:w-7" strokeWidth={1.75} />
                {mounted && <CartBadge count={wishlistCount} color="red" />}
              </Link>
              <Link
                href="/cart"
                className="relative flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-[#F0F9E4] hover:text-[#6FA01E] transition-colors overflow-visible"
                aria-label="Cart"
              >
                <ShoppingCart
                  className="h-6 w-6 xl:h-7 xl:w-7"
                  strokeWidth={1.75}
                />
                {mounted && <CartBadge count={totalItems} color="green" />}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet header (below lg) */}
      <div className="lg:hidden border-b border-gray-100">
        <div className="mx-auto w-full max-w-[2560px] px-3 sm:px-5 md:px-6">
          <div className="flex items-center justify-between min-h-[80px] sm:min-h-[88px] md:min-h-[92px] gap-2 py-1">
            <Link href="/" className="flex-shrink min-w-0">
              <img
                src="/images/tamtech_logo_svg.svg"
                alt="TAM TECH TOOLS LIMITED"
                className="h-[68px] sm:h-[76px] md:h-[84px] w-auto max-w-[210px] sm:max-w-[240px] md:max-w-[270px] object-contain object-left"
              />
            </Link>

            <div className="flex items-center justify-end gap-0 shrink-0 overflow-visible">
              <Link
                href="/wishlist"
                className="relative flex items-center justify-center rounded-full p-2.5 text-gray-700 overflow-visible"
                aria-label="Wishlist"
              >
                <Heart className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
                {mounted && <CartBadge count={wishlistCount} color="red" />}
              </Link>
              <Link
                href="/cart"
                className="relative flex items-center justify-center rounded-full p-2.5 text-gray-700 overflow-visible"
                aria-label="Cart"
              >
                <ShoppingCart className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
                {mounted && <CartBadge count={totalItems} color="green" />}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center rounded-full p-2.5 text-gray-700"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-7 w-7 sm:h-8 sm:w-8" />
                ) : (
                  <Menu className="h-7 w-7 sm:h-8 sm:w-8" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="p-3 border-b border-gray-100">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className={SEARCH_INPUT_CLASS}
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0D98BA]" />
              </form>
            </div>
            <nav className="p-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
              {MAIN_NAVIGATION.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.label ? null : item.label
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium ${
                          isItemActive(item)
                            ? "text-[#0D98BA] bg-[#E6F4F8] font-semibold"
                            : "text-gray-700 hover:bg-[#E6F4F8]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="ml-3 border-l-2 border-[#0D98BA]/20 pl-3 mb-1">
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm font-semibold text-[#0D98BA]"
                          >
                            View All {item.label}
                          </Link>
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-[#E6F4F8] hover:text-[#0D98BA]"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={mobileLinkClass(item)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
