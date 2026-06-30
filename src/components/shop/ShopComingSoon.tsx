"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

type ShopComingSoonProps = {
  categoryName?: string;
};

export default function ShopComingSoon({ categoryName }: ShopComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex min-h-[50vh] items-center justify-center px-4 py-12 sm:py-16"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white px-6 py-10 sm:px-10 sm:py-12 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0D98BA]/15 to-[#8AC926]/15">
          <Package className="h-8 w-8 text-[#0D98BA]" strokeWidth={1.75} />
        </div>

        {categoryName && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0D98BA]">
            {categoryName}
          </p>
        )}

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
          Something Big is Arriving Soon!
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
          Our digital shelves are currently being stocked with our latest premium
          products. We are putting the finishing touches on everything to bring
          you the best experience possible.
        </p>

        <p className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0D98BA]/10 px-5 py-2.5 text-sm font-semibold text-[#0B7A94]">
          Launches in just a few days!
        </p>
      </div>
    </motion.div>
  );
}
