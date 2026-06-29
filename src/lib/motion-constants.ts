// Motion constants for reveal-on-scroll animations
export const MOTION_CONSTANTS = {
  // Default reveal animation settings
  reveal: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1], // ease-out equivalent
  },
  // Stagger delays for multiple elements
  stagger: {
    default: 0.1,
    fast: 0.05,
    slow: 0.15,
  },
  // Scroll-triggered variants
  scrollReveal: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  // Container variants with stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  // Item variant for stagger children
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  // Fade variants
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  // Scale variants
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  // Slide from left
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  // Slide from right
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
} as const;

// Viewport settings for scroll triggers
export const VIEWPORT_SETTINGS = {
  once: true,
  amount: 0.2,
  margin: "-50px",
} as const;
