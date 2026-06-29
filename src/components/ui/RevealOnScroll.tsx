"use client";

import { motion, type MotionProps } from "framer-motion";
import { MOTION_CONSTANTS, VIEWPORT_SETTINGS } from "@/lib/motion-constants";

type RevealOnScrollProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  ...props
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial={MOTION_CONSTANTS.scrollReveal.hidden}
      whileInView={MOTION_CONSTANTS.scrollReveal.visible}
      viewport={VIEWPORT_SETTINGS}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
