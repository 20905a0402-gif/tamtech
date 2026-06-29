"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Store, Wrench, Filter, ArrowUpDown } from "lucide-react";
import { useShopNavStore } from "@/store/useShopNavStore";

const bottomNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: Store },
  { label: "Services", href: "/services", icon: Wrench },
];

const shopToolItems = [
  { label: "Filter", icon: Filter, action: "filter" as const },
  { label: "Sort", icon: ArrowUpDown, action: "sort" as const },
];

const HIDDEN_PATHS = ["/checkout", "/cart", "/order-success"];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [navVisible, setNavVisible] = useState(true);
  const [showShopTools, setShowShopTools] = useState(false);
  const lastScrollY = useRef(0);
  const onOpenFilters = useShopNavStore((s) => s.onOpenFilters);
  const onOpenSort = useShopNavStore((s) => s.onOpenSort);

  const isShopPage = pathname === "/shop" || pathname.startsWith("/shop/");
  const isProductPage = pathname.startsWith("/product/");
  const isHiddenPage =
    isProductPage || HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (isHiddenPage) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current + 4;
      const scrollingUp = currentY < lastScrollY.current - 4;
      const nearTop = currentY < 60;

      if (nearTop) {
        setNavVisible(true);
        setShowShopTools(false);
      } else if (scrollingDown) {
        setNavVisible(false);
      } else if (scrollingUp) {
        setNavVisible(true);
        if (isShopPage && currentY > 100) {
          setShowShopTools(true);
        } else {
          setShowShopTools(false);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHiddenPage, isShopPage]);

  if (isHiddenPage) return null;

  const showTools = isShopPage && showShopTools && navVisible;

  return (
    <motion.nav
      initial={false}
      animate={{ y: navVisible ? 0 : "100%" }}
      transition={{ type: "spring", damping: 26, stiffness: 320 }}
      className="fixed bottom-0 left-0 right-0 z-[1500] lg:hidden bg-white border-t border-gray-200 shadow-lg"
    >
      <AnimatePresence mode="wait">
        {showTools ? (
          <motion.div
            key="shop-tools"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-2 h-16"
          >
            {shopToolItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.action === "filter") onOpenFilters?.();
                    else onOpenSort?.();
                  }}
                  className="relative flex flex-col items-center justify-center h-full text-[#0D98BA]"
                >
                  <Icon className="h-5 w-5" />
                  <span className="mt-1 text-xs font-semibold">{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="main-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-3 h-16"
          >
            {bottomNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center h-full ${
                    isActive ? "text-[#0D98BA]" : "text-gray-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span
                    className={`mt-1 text-xs ${isActive ? "font-semibold" : ""}`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-[#0D98BA] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-safe-area-inset-bottom bg-white" />
    </motion.nav>
  );
}
