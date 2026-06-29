"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { ReactNode } from "react";

const DOT_PATTERN =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=";

/** Shallow wave — low amplitude so content is never clipped */
const WAVE_PATH =
  "M0,44 C360,44 480,36 720,36 C960,36 1080,44 1440,44 L1440,52 L0,52 Z";

type PageHeroProps = {
  variant?: "wave" | "compact";
  badge?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function PageHero({
  variant = "wave",
  badge,
  title,
  subtitle,
  children,
}: PageHeroProps) {
  if (variant === "compact") {
    return (
      <section className="relative bg-gradient-to-r from-[#0D98BA] to-[#0B7A94]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `url('${DOT_PATTERN}')` }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16 py-5 lg:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm lg:text-base text-white/80">{subtitle}</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0D98BA] to-[#0B7A94] min-h-[220px] sm:min-h-[240px] lg:min-h-[260px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#8AC926]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url('${DOT_PATTERN}')` }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16 py-10 sm:py-12 lg:py-14 pb-12 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-white"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <Star className="h-3.5 w-3.5 text-[#8AC926]" />
              <span className="text-xs sm:text-sm font-medium">{badge}</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-5 sm:mt-6">{children}</div>}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-5 pointer-events-none leading-[0]">
        <svg
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#FAFAFA]"
        >
          <path d={WAVE_PATH} />
        </svg>
      </div>
    </section>
  );
}
