"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { COMPANY_INFO } from "@/lib/design-tokens";
import WhatsAppLogo from "./WhatsAppLogo";

export default function FloatingActions() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const hideWhatsApp = pathname.startsWith("/product/");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 bottom-[5rem] lg:bottom-6 z-[1600] flex flex-col items-center gap-2.5 w-14">
      {!hideWhatsApp && (
        <motion.a
          href={COMPANY_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex shrink-0 items-center justify-center h-14 w-14 rounded-full bg-[#8AC926] shadow-lg hover:bg-[#6FA01E] transition-colors"
        >
          <span className="absolute inset-0 rounded-full bg-[#8AC926] animate-ping opacity-20" />
          <WhatsAppLogo size={30} className="relative z-10 text-white" />
        </motion.a>
      )}

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="hidden lg:flex shrink-0 items-center justify-center h-9 w-9 rounded-full bg-[#0D98BA] shadow-md hover:bg-[#0B7A94] active:scale-95 transition-all"
            title="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
