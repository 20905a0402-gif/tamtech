// TAM TECH TOOLS LIMITED - Design Tokens
// Primary: #0D98BA (Teal-Blue) | Action: #8AC926 (Safety Lime Green)

export const DESIGN_TOKENS = {
  colors: {
    primary: {
      teal: "#0D98BA",
      "teal-dark": "#0B7A94",
      "teal-light": "#E6F4F8",
    },
    action: {
      lime: "#8AC926",
      "lime-dark": "#6FA01E",
      "lime-light": "#F0F9E4",
    },
    surface: {
      white: "#FFFFFF",
      grey: "#FAFAFA",
      "grey-dark": "#F5F5F5",
      "grey-border": "#E5E5E5",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#4A4A4A",
      muted: "#6B7280",
      inverse: "#FFFFFF",
    },
    status: {
      success: "#8AC926",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#0D98BA",
    },
  },

  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  radius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
    whatsapp: 1600,
  },
} as const;

export const COMPANY_INFO = {
  name: "TAM TECH TOOLS LIMITED",
  shortName: "TAM TECH",
  tagline:
    "Your one-stop solution for design, supply, and fixing in construction and interior design needs.",
  introduction:
    "TAM TECH is a renowned company with a strong market presence and consistent growth across East Africa. Committed to delivering high-quality products and innovative solutions, we specialize in manufacturing, supply, and turnkey project execution for both domestic and industrial customers.",
  address: {
    street: "Industrial Area – Dunga Close",
    landmark: "Near Car & General Round About",
    location: "Off Dunga Road, Nairobi, Kenya",
    short: "Dunga Close, Nairobi",
  },
  poBox: "18701-00500",
  pinNo: "P052371012E",
  phones: {
    tollFree: "0800722211",
    whatsapp: "+254 733 959 383",
    secondary: "+254 731 959 383",
  },
  email: "tamtechtools@gmail.com",
  mapUrl: "https://g.co/kgs/b96KNWi",
  whatsappLink: "https://wa.me/254733959383",
  hours: "Mon – Fri: 8:00 AM – 5:00 PM | Sat: 8:00 AM – 1:00 PM",
} as const;

export const NAVIGATION = {
  main: [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/about", description: "About Us" },
    { label: "EV Bike", href: "/shop?category=EV%20Bikes" },
    { label: "Building Materials", href: "/shop?category=Building%20Materials" },
    { label: "Tools", href: "/shop?category=Tools" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
  shop: {
    categories: [
      {
        label: "EV Bikes",
        href: "/shop?category=EV%20Bikes",
        subItems: [
          { label: "Bikes", href: "/shop?category=EV%20Bikes&sub=Bikes" },
          { label: "Spares", href: "/shop?category=EV%20Bikes&sub=Spares" },
          {
            label: "Swapping Stations",
            href: "/shop?category=EV%20Bikes&sub=Swapping%20Stations",
          },
        ],
      },
      {
        label: "Building Materials",
        href: "/shop?category=Building%20Materials",
        subItems: [
          {
            label: "Aluminum",
            href: "/shop?category=Building%20Materials&sub=Aluminum",
          },
          {
            label: "Glass",
            href: "/shop?category=Building%20Materials&sub=Glass",
          },
          { label: "Wood", href: "/shop?category=Building%20Materials&sub=Wood" },
          {
            label: "Stainless Steel",
            href: "/shop?category=Building%20Materials&sub=Stainless%20Steel",
          },
          {
            label: "PVC/WPVC",
            href: "/shop?category=Building%20Materials&sub=PVC%2FWPVC",
          },
        ],
      },
      {
        label: "Tools",
        href: "/shop?category=Tools",
        subItems: [
          { label: "Hand", href: "/shop?category=Tools&sub=Hand" },
          { label: "Power", href: "/shop?category=Tools&sub=Power" },
          { label: "Bench", href: "/shop?category=Tools&sub=Bench" },
          { label: "Cordless", href: "/shop?category=Tools&sub=Cordless" },
        ],
      },
    ],
  },
  services: {
    items: [
      {
        label: "Aluminum Doors and Windows",
        href: "/services#aluminium",
      },
      { label: "Kitchens and Wardrobes", href: "/services#kitchen" },
      {
        label: "Shower Cubicles and Enclosures",
        href: "/services#shower",
      },
      {
        label: "SS Railings & Balustrades",
        href: "/services#railing",
      },
      { label: "Solar", href: "/services#solar" },
      { label: "Wood and PVC Doors", href: "/services#wood-pvc-doors" },
    ],
  },
} as const;

export const SUPABASE_CONFIG = {
  url:
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    "https://syktgnhsjspjbuihnvbs.supabase.co",
  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "sb_publishable_xsgtHk3FmMqUG_uhVMX7Sw_0ANuf0b6",
} as const;
