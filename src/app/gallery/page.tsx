"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import PageCTA, { PageCTAButton } from "@/components/ui/PageCTA";
import { GALLERY_ITEMS, mediaPath } from "@/lib/media-assets";
import { COMPANY_INFO } from "@/lib/design-tokens";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered =
    filter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero
        badge="Our Work & Products"
        title="Project Gallery"
        subtitle="Browse TamTech products, fabrication projects, and recent installations — from Emtop tools and Spiro EV bikes to kitchens, solar, and more."
      >
        <Link
          href="/services#quote-form"
          className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-[#8AC926] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#6FA01E] transition-all shadow-lg"
        >
          Request a Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      {/* Filter tabs */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-[81px] sm:top-[89px] md:top-[93px] lg:top-[104px] z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === f.id
                    ? "bg-[#0D98BA] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-[#E6F4F8] hover:text-[#0D98BA]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-100 hover:border-[#0D98BA]/30"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={mediaPath(item.image)}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-[#E6F4F8] px-2.5 py-0.5 text-xs font-semibold text-[#0D98BA] mb-2 group-hover:bg-[#8AC926] group-hover:text-white transition-colors">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-[#0D98BA] group-hover:text-[#8AC926] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <PageCTA
        title="Inspired by Our Work?"
        subtitle="Let us bring the same quality and craftsmanship to your next project."
      >
        <PageCTAButton href={COMPANY_INFO.whatsappLink} external>
          Chat on WhatsApp
        </PageCTAButton>
        <PageCTAButton href="/services" variant="secondary">
          Explore Services
        </PageCTAButton>
      </PageCTA>
    </main>
  );
}
